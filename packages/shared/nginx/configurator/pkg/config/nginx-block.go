package config

import "strings"

type NginxBlock struct {
	content   string
	subBlocks NginxBlocks
}

type NginxBlocks []NginxBlock

func (b NginxBlock) String(level int) string {
	tab := makeTab(level)
	if len(b.subBlocks) == 0 {
		return tab + b.content + ";"
	}

	subBlockStrings := make([]string, 0)
	for _, subBlock := range b.subBlocks {
		subBlockStrings = append(subBlockStrings, subBlock.String(level+1))
	}

	return "\n" + tab + b.content + " {\n" + strings.Join(subBlockStrings, "\n") + "\n" + tab + "}"
}

func (bs NginxBlocks) String(level int) string {
	lines := make([]string, 0)
	for _, block := range bs {
		lines = append(lines, block.String(level))
	}
	return strings.Join(lines, "\n")
}
