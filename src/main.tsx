import React, { useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme();

const Main = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const toggleDarkTheme = () => setIsDarkTheme((isDark) => !isDark);

  const theme = useMemo(
    () => (isDarkTheme ? darkTheme : lightTheme),
    [isDarkTheme]
  );

  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <App isDarkTheme={isDarkTheme} toggleDarkTheme={toggleDarkTheme} />
        </CssBaseline>
      </ThemeProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
