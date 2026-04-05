import { Typography } from "@mui/material";

type ToolTitleProps = { selectedToolTitle: string };

export const ToolTitle = ({ selectedToolTitle }: ToolTitleProps) => {
  return <Typography variant="h2">{selectedToolTitle}</Typography>;
};
