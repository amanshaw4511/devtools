import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React, { ReactNode, useContext, useMemo } from "react";

type Theme = "light" | "dark";
type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
};
const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const lightTheme = createTheme();

export type AppThemeProviderProps = {
  children: ReactNode;
};

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const [theme, setTheme] = React.useState<Theme>("dark");

  const toggleTheme = () =>
    setTheme((curr) => (curr == "dark" ? "light" : "dark"));
  const value: ThemeContextValue = { theme, toggleTheme };

  const muiTheme = useMemo(
    () => (theme === "dark" ? darkTheme : lightTheme),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
