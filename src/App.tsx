import {
  Box,
  Container,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";
import { useState } from "react";
import { Config, configs as allConfigs } from "./transformer";

function App() {
  const [availableTools, setAvailableTools] = useState<Config[]>(allConfigs);

  const defaultTool = availableTools[0];
  const [selectedTool, setSelectedTool] = useState<Config>(defaultTool);

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");

  const onConfigChange = async (_: any, newConfig: Config | null) => {
    const finalSelectedTool = newConfig ?? defaultTool;
    setSelectedTool(finalSelectedTool);
    try {
      setToText(await finalSelectedTool.method(fromText));
      setError("");
    } catch (e) {
      console.error(e);
      setError("error");
    }
  };

  const onFromChange = async (n: any) => {
    setFromText(n.target.value);
    try {
      setToText(await selectedTool.method(n.target.value));
      setError("");
    } catch (e) {
      console.error(e);
      setError("error");
    }
  };

  const onToChange = (event: any) => {
    setToText(event.target.value);
  };

  const handleToolsSearch = (searchText: string) => {
    setSearchText(searchText);
    setAvailableTools(
      allConfigs.filter((it) =>
        it.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      )
    );
  };

  return (
    <Container maxWidth="sm" sx={{ m: 4 }}>
      <Stack direction="row" spacing={2}>
        <Box sx={{ minWidth: 300, minHeight: 600 }}>
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
                      availableTools.find((it) => it.title === tool.title) ??
                        null
                    )
                  }
                >
                  <ListItemText>{tool.title}</ListItemText>
                </MenuItem>
              ))}
            </MenuList>
          </Paper>
        </Box>
        <Box>
          <Typography variant="h5" pt={2} pb={1}>
            Input <Typography color="red">{error}</Typography>
          </Typography>
          <Box>
            <textarea
              rows={4}
              style={{ width: 500 }}
              onChange={onFromChange}
              value={fromText}
            />
          </Box>
          <Typography variant="h5" pt={2} pb={1}>
            Output
          </Typography>
          <Box>
            <textarea
              rows={4}
              style={{ width: 500 }}
              onChange={onToChange}
              value={toText}
            />
          </Box>
        </Box>
      </Stack>
    </Container>
  );
}

export default App;
