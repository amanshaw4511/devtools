import { Container, Stack, Tooltip, IconButton } from "@mui/material";
import "./App.css";
import { useState } from "react";
import { Config, configs as allConfigs, initReady } from "./transformer";
import { ToolMenu } from "./ToolMenu";
import { ToolBody } from "./ToolBody";
import { MaterialUISwitch } from "./MaterialUiSwitch";
import GitHubIcon from "@mui/icons-material/GitHub";
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
    <Container
      maxWidth={false}
      sx={{ px: { xs: 2, md: 4 }, py: 2, minHeight: "100vh" }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        alignItems="flex-start"
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ flexGrow: 1, width: 1, minWidth: 0 }}
        >
          <ToolMenu
            selectedTool={selectedTool}
            availableTools={availableTools}
            handleToolChange={handleToolChange}
            setAvailableTools={setAvailableTools}
            sx={{
              width: { xs: "100%", md: 320 },
              maxHeight: { md: "calc(100vh - 120px)" },
              overflow: "auto",
              flexShrink: 0,
            }}
          />
          <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
            <ToolTitle selectedToolTitle={selectedTool.title} />
            <ToolBody
              errorText={errorText}
              inputText={inputText}
              outputText={outputText}
              handleInputChange={handleInputChange}
            />
          </Stack>
        </Stack>
        <IconButton
          aria-label="Open GitHub repository"
          component="a"
          href="https://github.com/amanshaw4511/devtools"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            alignSelf: { xs: "flex-end", md: "flex-start" },
            mr: { md: 1, xs: 0 },
          }}
        >
          <GitHubIcon />
        </IconButton>
        <Tooltip title="Change Theme">
          <MaterialUISwitch
            sx={{ alignSelf: { xs: "flex-end", md: "flex-start" } }}
            checked={isDarkTheme}
            onClick={toggleDarkTheme}
          />
        </Tooltip>
      </Stack>
    </Container>
  );
};

export default App;
