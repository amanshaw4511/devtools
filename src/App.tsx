import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import "./App.css";
import { useState } from "react";
import { Config, configs } from "./transformer";

function App() {
  const defaultConfg = configs[0];
  const [config, setConfig] = useState<Config>(defaultConfg);

  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [error, setError] = useState("");

  const onConfigChange = async (_: any, newConfig: Config | null) => {
    const finalConfig = newConfig ?? defaultConfg;
    setConfig(finalConfig);
    try {
      setToText(await finalConfig.method(fromText));
      setError("");
    } catch (e) {
      console.error(e);
      setError("error");
    }
  };

  const onFromChange = async (n: any) => {
    setFromText(n.target.value);
    try {
      setToText(await config.method(n.target.value));
      setError("");
    } catch (e) {
      console.error(e);
      setError("error");
    }
  };

  const onToChange = (event: any) => {
    setToText(event.target.value);
  };

  return (
    <Container maxWidth="sm" sx={{ m: 4 }}>
      <Autocomplete
        options={configs}
        getOptionLabel={(config) => config.title}
        value={config}
        onChange={onConfigChange}
        renderInput={(params) => <TextField sx={{ width: 500 }} {...params} />}
      />

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
    </Container>
  );
}

export default App;
