package watcher

import (
	"context"
	"log/slog"
	"strings"

	"github.com/moby/moby/api/types/events"
	"github.com/moby/moby/client"
)

type NginxContainer struct {
	ID     string
	Name   string
	Labels map[string]string
}

func WatchContainers(containerChannel chan<- map[string]NginxContainer) {
	creatorChannel := make(chan NginxContainer)
	destroyerChannel := make(chan NginxContainer)

	containers := make(map[string]NginxContainer)
	containerChannel <- containers

	go watchDocker(creatorChannel, destroyerChannel)
	for {
		select {
		case c := <-creatorChannel:
			containers[c.ID] = c
			slog.Info("Container created", "ID", c.ID, "name", c.Name, "labels", c.Labels)
			containerChannel <- containers
		case c := <-destroyerChannel:
			delete(containers, c.ID)
			slog.Info("Container destroyed", "name", c.Name)
			containerChannel <- containers
		}
	}
}

func watchDocker(creatorChannel chan<- NginxContainer, destroyerChannel chan<- NginxContainer) {
	apiClient, clientErr := client.New(client.FromEnv)
	if clientErr != nil {
		panic(clientErr)
	}
	defer apiClient.Close()

	config := getConfigFromEnv()
	ctx := context.Background()
	loadCurrentState(config, apiClient, ctx, creatorChannel)

	filters := make(client.Filters).Add("type", "container")
	events := apiClient.Events(ctx, client.EventsListOptions{Filters: filters})
	slog.Info("Watching Docker events...")
	for {
		select {
		case err := <-events.Err:
			slog.Error("error in reading docker events", "error", err)
		case msg := <-events.Messages:
			if isInStack(config.DockerStack, msg.Actor.Attributes) {
				go onContainerEvent(&msg, creatorChannel, destroyerChannel)
			}
		case <-ctx.Done():
			slog.Info("Exiting Watcher service ...")
			return
		}
	}
}

func loadCurrentState(
	config *Config,
	apiClient client.APIClient,
	ctx context.Context,
	creatorChannel chan<- NginxContainer,
) {
	res, err := apiClient.ContainerList(ctx, client.ContainerListOptions{All: true})
	if err != nil {
		panic(err)
	}

	for _, container := range res.Items {
		nginxLabels := getNginxLabels(container.Labels)
		if len(nginxLabels) == 0 {
			continue
		}

		if !isInStack(config.DockerStack, container.Labels) {
			continue
		}

		creatorChannel <- NginxContainer{
			ID:     container.ID,
			Name:   getName(container.Names[0], container.Labels),
			Labels: nginxLabels,
		}
	}
}

func isInStack(stack string, labels map[string]string) bool {
	return stack == "" || labels["com.docker.compose.project"] == stack
}

func onContainerEvent(
	msg *events.Message,
	creatorChannel chan<- NginxContainer,
	destroyerChannel chan<- NginxContainer,
) {
	event := msg.Action
	container := NginxContainer{
		ID:     msg.Actor.ID,
		Name:   getName(msg.Actor.Attributes["name"], msg.Actor.Attributes),
		Labels: getNginxLabels(msg.Actor.Attributes),
	}

	if len(container.Labels) == 0 {
		return
	}

	switch event {
	case "create":
		creatorChannel <- container
	case "destroy":
		destroyerChannel <- container
	}
}

func getName(name string, labels map[string]string) string {
	serviceName := labels["com.docker.compose.service"]
	if serviceName == "" {
		serviceName = strings.ReplaceAll(name, "/", "")
	}
	return serviceName
}

func getNginxLabels(labels map[string]string) map[string]string {
	nginxLabels := make(map[string]string)
	for k, v := range labels {
		if strings.HasPrefix(k, "nginx.") {
			nginxLabels[k] = v
		}
	}
	return nginxLabels
}
