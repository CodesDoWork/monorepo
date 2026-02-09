package config

import (
	"fmt"
	"log/slog"
	"os/exec"
)

func reloadNginx() error {
    err := testConfig()
	if err != nil {
		return err
	}

    err = reloadConfig()
	if err != nil {
		return err
	}

    slog.Info("Nginx reloaded successfully")
    return nil
}

func testConfig() error {
	testCmd := exec.Command("nginx", "-t")
    if output, err := testCmd.CombinedOutput(); err != nil {
        return fmt.Errorf("nginx config test failed: %s", string(output))
    }

	return nil
}

func reloadConfig() error {
	reloadCmd := exec.Command("nginx", "-s", "reload")
    if output, err := reloadCmd.CombinedOutput(); err != nil {
        return fmt.Errorf("nginx reload failed: %s", string(output))
    }

	return nil
}
