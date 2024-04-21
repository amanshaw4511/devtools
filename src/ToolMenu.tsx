import {
  Paper,
  TextField,
  MenuList,
  MenuItem,
  ListItemText,
} from "@mui/material";
import { Config, configs as allConfigs } from "./transformer";
import { useState } from "react";

export type ToolMenuProps = {
  availableTools: Config[];
  selectedTool: Config;
  setAvailableTools: (tools: Config[]) => void;
  handleToolChange: (tool: Config) => void;
};

export const ToolMenu = ({
  availableTools,
  selectedTool,
  setAvailableTools,
  handleToolChange,
}: ToolMenuProps) => {
  const [searchText, setSearchText] = useState("");

  const handleToolsSearch = (searchText: string) => {
    setSearchText(searchText);
    setAvailableTools(
      allConfigs.filter((it) =>
        it.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      )
    );
  };

  const onConfigChange = async (_: any, newSelectedTool: Config | null) => {
    if (newSelectedTool === null) {
      return;
    }
    handleToolChange(newSelectedTool);
  };
  return (
    <Paper>
      <TextField
        label="Search Tools"
        value={searchText}
        onChange={(e) => handleToolsSearch(e.target.value)}
        fullWidth
      />
      <MenuList>
        {availableTools.map((tool) => (
          <MenuItem
            selected={tool.title === selectedTool.title}
            key={tool.title}
            onClick={() =>
              onConfigChange(
                null,
                availableTools.find((it) => it.title === tool.title) ?? null
              )
            }
          >
            <ListItemText>{tool.title}</ListItemText>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};
