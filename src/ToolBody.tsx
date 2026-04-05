import { Box, SxProps, Typography } from "@mui/material";

export type ToolBodyProps = {
  errorText: string;
  inputText: string;
  outputText: string;
  handleInputChange: (inputText: string) => void;
  sx?: SxProps;
};

export const ToolBody = ({
  inputText,
  outputText,
  errorText,
  handleInputChange,
  sx,
}: ToolBodyProps) => {
  return (
    <Box sx={sx}>
      <Typography variant="h5" pt={2} pb={1}>
        Input
      </Typography>
      <Typography color="error">{errorText}</Typography>
      <Box>
        <textarea
          rows={12}
          style={{ width: "100%", fontSize: 16, lineHeight: 1.5 }}
          onChange={(e) => handleInputChange(e.target.value)}
          value={inputText}
        />
      </Box>
      <Typography variant="h5" pt={2} pb={1}>
        Output
      </Typography>
      <Box>
        <textarea
          rows={12}
          style={{ width: "100%", fontSize: 16, lineHeight: 1.5 }}
          value={outputText}
          disabled
        />
      </Box>
    </Box>
  );
};
