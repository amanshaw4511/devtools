import { Container, Stack, Tooltip } from "@mui/material";
import "./App.css";
import { useState } from "react";
import { Config, configs as allConfigs, initReady } from "./transformer";
import { ToolMenu } from "./ToolMenu";
import { ToolBody } from "./ToolBody";
import { MaterialUISwitch } from "./MaterialUiSwitch";
import { ToolTitle } from "./ToolTitle";

type AppProps = {
  isDarkTheme: boolean;
  toggleDarkTheme: () => void;
};

const App = ({ isDarkTheme, toggleDarkTheme }: AppProps) => {
  const [availableTools, setAvailableTools] = useState<Config[]>(allConfigs);

  const [selectedTool, setSelectedTool] = useState<Config>(availableTools[0]);

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleToolChange = async (newSelectedTool: Config) => {
    setSelectedTool(newSelectedTool);
    onConfigOrInputChange(newSelectedTool, inputText);
  };

  const onConfigOrInputChange = async (
    newSelectedTool: Config,
    newInput: string,
  ) => {
    try {
      // Ensure WASM is initialized before invoking exported methods
      await initReady;
      setOutputText(await newSelectedTool.method(newInput));
      setErrorText("");
    } catch (e) {
      console.error(e);
      const message = e instanceof Error ? e.message : "Unexpected error";
      setErrorText(message);
    }
  };

  const handleInputChange = async (newInputText: string) => {
    setInputText(newInputText);
    onConfigOrInputChange(selectedTool, newInputText);
  };

  // No manual output editing; output is derived from input and selected tool

  return (
    <Container maxWidth="sm" sx={{ m: 4 }}>
      <Stack direction="row">
        <Stack direction="row" spacing={4}>
          <ToolMenu
            selectedTool={selectedTool}
            availableTools={availableTools}
            handleToolChange={handleToolChange}
            setAvailableTools={setAvailableTools}
            sx={{ minWidth: 300, minHeight: 600 }}
          />
          <Stack>
            <ToolTitle selectedToolTitle={selectedTool.title} />
            <ToolBody
              errorText={errorText}
              inputText={inputText}
              outputText={outputText}
              handleInputChange={handleInputChange}
            />
          </Stack>
        </Stack>

        <Tooltip title="Change Theme">
          <MaterialUISwitch
            sx={{ ml: 8 }}
            checked={isDarkTheme}
            onClick={toggleDarkTheme}
          />
        </Tooltip>
      </Stack>
    </Container>
  );
};

export default App;
