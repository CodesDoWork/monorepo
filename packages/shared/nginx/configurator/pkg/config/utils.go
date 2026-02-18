package config

import (
	"maps"
	"shared-nginx-configurator/pkg/watcher"
	"slices"
	"strings"
)

func makeTab(level int) string {
	return strings.Repeat(" ", 4*level)
}

func sortedKeysByLength[T any](m map[string]T) []string {
	keys := slices.Collect(maps.Keys(m))
	slices.SortFunc(keys, func(s1 string, s2 string) int { return len(s2) - len(s1) })
	return keys
}

func sortedByNames(containers map[string]watcher.NginxContainer) []watcher.NginxContainer {
	values := slices.Collect(maps.Values(containers))
	slices.SortFunc(values, func(c1 watcher.NginxContainer, c2 watcher.NginxContainer) int {
		return strings.Compare(c1.Name, c2.Name)
	})
	return values
}
