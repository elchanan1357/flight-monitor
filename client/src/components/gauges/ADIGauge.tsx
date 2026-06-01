import { FC } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  value: number;
}

export const ADIGauge: FC<Props> = ({ value }) => {
  const boundedValue = Math.min(Math.max(value, -100), 100);

  const getFillColor = () => {
    if (boundedValue === 0) return "#10b981";
    if (boundedValue === 100) return "#2563eb";
    return "white";
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          letterSpacing: "0.12em",
          mb: 1,
          textTransform: "uppercase",
        }}
      >
        ADI
      </Typography>

      <Box
        sx={{
          width: 148,
          height: 148,
          borderRadius: "50%",
          backgroundColor: getFillColor(),
          border: "1.5px solid #cccccc",
          mt: 1,
          transition: "background-color 0.8s cubic-bezier(0.4,0,0.2,1)",
        }}
      />

      <Typography
        sx={{
          color: boundedValue === 0 ? "success.main" : "primary.main",
          fontFamily: "'Roboto Mono', monospace",
          fontSize: "0.8rem",
          fontWeight: 700,
          mt: 1,
        }}
      >
        {boundedValue > 0 ? "+" : ""}{boundedValue}
      </Typography>
    </Box>
  );
};