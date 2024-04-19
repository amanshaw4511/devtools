import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";
import { useState } from "react";
type Config = {
  title: string;
  method: (value: string) => string;
};
const configs: Config[] = [
  {
    title: "To upper case",
    method: (value: string) => value.toLocaleUpperCase(),
  },
  {
    title: "To lower case",
    method: (value: string) => value.toLocaleLowerCase(),
  },
  {
    title: "Base64 encode",
    method: (value: string) =>
      btoa(
        Array.from(new TextEncoder().encode(value), (byte) =>
          String.fromCodePoint(byte)
        ).join("")
      ),
  },
  {
    title: "Base64 decode",
    method: (value: string) =>
      new TextDecoder().decode(
        Uint8Array.from(atob(value), (m) => m.codePointAt(0))
      ),
  },
];

function App() {
  const defaultConfg = configs[0];
  const [config, setConfig] = useState<Config>(defaultConfg);

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");

  const onConfigChange = (_: any, newConfig: Config | null) => {
    const finalConfig = newConfig ?? defaultConfg;
    setConfig(finalConfig);
    setToText(finalConfig.method(fromText));
  };

  const onFromChange = (n: any) => {
    setFromText(n.target.value);
    setToText(config.method(n.target.value));
  };

  const onToChange = (event: any) => {
    setToText(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Autocomplete
        options={configs}
        getOptionLabel={(config) => config.title}
        value={config}
        onChange={onConfigChange}
        renderInput={(params) => <TextField {...params} />}
      />

      <Typography pt={2} pb={1}>
        From
      </Typography>
      <Box>
        <TextField
          multiline
          rows={4}
          onChange={onFromChange}
          value={fromText}
        />
      </Box>
      <Typography pt={2} pb={1}>
        To
      </Typography>
      <Box>
        <TextField multiline rows={4} onChange={onToChange} value={toText} />
      </Box>
    </Container>
  );
}

export default App;
