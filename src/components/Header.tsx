import { IconButton, Stack, StackProps, Tooltip } from "@mui/material";
import { MaterialUISwitch } from "./MaterialUiSwitch";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useAppTheme } from "../context/theme-context";

export type HeaderProps = StackProps;

export const Header = (props: HeaderProps) => {
  const { theme, toggleTheme } = useAppTheme();
  return (
    <Stack
      {...props}
      spacing={1}
      sx={{
        justifyContent: "flex-end",
        mb: 2,
      }}
      direction="row"
    >
      <Tooltip title="Open GitHub">
        <IconButton
          aria-label="Open GitHub repository"
          component="a"
          href="https://github.com/amanshaw4511/devtools"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Change Theme">
        <MaterialUISwitch checked={theme === "dark"} onClick={toggleTheme} />
      </Tooltip>
    </Stack>
  );
};
