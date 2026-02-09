package config

import (
	"maps"
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

func sortedKeys[T any](m map[string]T) []string {
	keys := slices.Collect(maps.Keys(m))
	slices.Sort(keys)
	return keys
}