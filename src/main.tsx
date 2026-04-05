import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AppThemeProvider } from "./context/theme-context.tsx";
import { StrictMode } from "react";

const Main = () => {
  return (
    <StrictMode>
      <AppThemeProvider>
        <App />
      </AppThemeProvider>
    </StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
