import { Container, Stack, Tooltip } from "@mui/material";
import "./App.css";
import { useState } from "react";
import { Config, configs as allConfigs } from "./transformer";
import { ToolMenu } from "./ToolMenu";
import { ToolBody } from "./ToolBody";
import { MaterialUISwitch } from "./MaterialUiSwitch";
import { ToolTitle } from "./ToolTittle";

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

  const hanleToolChange = async (newSelectedTool: Config) => {
    setSelectedTool(newSelectedTool);
    onConfigOrInputChange(newSelectedTool, inputText);
  };

  const onConfigOrInputChange = async (
    newSelectedTool: Config,
    newInput: string
  ) => {
    try {
      setOutputText(await newSelectedTool.method(newInput));
      setErrorText("");
    } catch (e) {
      console.error(e);
      setErrorText("Error");
    }
  };

  const handleInputChange = async (newInputText: string) => {
    setInputText(newInputText);
    onConfigOrInputChange(selectedTool, newInputText);
  };

  const hanldeOutputChange = (newOutputText: string) => {
    setOutputText(newOutputText);
  };

  return (
    <Container maxWidth="sm" sx={{ m: 4 }}>
      <Stack direction="row">
        <Stack direction="row" spacing={4}>
          <ToolMenu
            selectedTool={selectedTool}
            availableTools={availableTools}
            handleToolChange={hanleToolChange}
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
              handleOutputChange={hanldeOutputChange}
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
