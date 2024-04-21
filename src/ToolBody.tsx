import { Box, SxProps, Typography } from "@mui/material";

export type ToolBodyProps = {
  errorText: string;
  inputText: string;
  outputText: string;
  handleInputChange: (inputText: string) => void;
  handleOutputChange: (inputText: string) => void;
  sx?: SxProps;
};

export const ToolBody = ({
  inputText,
  outputText,
  errorText,
  handleInputChange,
  handleOutputChange,
  sx,
}: ToolBodyProps) => {
  return (
    <Box sx={sx}>
      <Typography variant="h5" pt={2} pb={1}>
        Input
      </Typography>
      <Typography color="red">{errorText}</Typography>
      <Box>
        <textarea
          rows={6}
          style={{ width: 500 }}
          onChange={(e) => handleInputChange(e.target.value)}
          value={inputText}
        />
      </Box>
      <Typography variant="h5" pt={2} pb={1}>
        Output
      </Typography>
      <Box>
        <textarea
          rows={6}
          style={{ width: 500 }}
          onChange={(e) => handleOutputChange(e.target.value)}
          value={outputText}
          disabled
        />
      </Box>
    </Box>
  );
};
