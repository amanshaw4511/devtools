import { Box, Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { useState } from "react";
import { Config, configs as allConfigs } from "./transformer";
import { ToolMenu } from "./ToolMenu";

function App() {
  const [availableTools, setAvailableTools] = useState<Config[]>(allConfigs);

  const [selectedTool, setSelectedTool] = useState<Config>(availableTools[0]);

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [error, setError] = useState("");

  const hanleToolChange = async (newSelectedTool: Config) => {
    setSelectedTool(newSelectedTool);
    onConfigOrInputChange(newSelectedTool, fromText);
  };

  const onConfigOrInputChange = async (
    newSelectedTool: Config,
    newInput: string
  ) => {
    try {
      setToText(await newSelectedTool.method(newInput));
      setError("");
    } catch (e) {
      console.error(e);
      setError("error");
    }
  };

  const onFromChange = async (n: any) => {
    setFromText(n.target.value);
    onConfigOrInputChange(selectedTool, n.target.value);
  };

  const onToChange = (event: any) => {
    setToText(event.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ m: 4 }}>
      <Stack direction="row" spacing={2}>
        <Box sx={{ minWidth: 300, minHeight: 600 }}>
          <ToolMenu
            selectedTool={selectedTool}
            availableTools={availableTools}
            handleToolChange={hanleToolChange}
            setAvailableTools={setAvailableTools}
          />
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
