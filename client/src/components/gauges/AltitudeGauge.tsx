import { FC } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  value: number;
}

export const AltitudeGauge: FC<Props> = ({ value  }) => {
  const boundedValue = Math.min(Math.max(value, 0), 3000);
  const heightPercent = (boundedValue / 3000) * 100;
  const ticks = [3000, 2000, 1000, 0];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%" }}>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          letterSpacing: "0.12em",
          fontWeight: 500,
          mb: 1,
          textTransform: "uppercase",
        }}
      >
        Altitude
      </Typography>

      <Box sx={{ display: "flex", flex: 1, gap: 1, width: "100%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "95%", pt: 0.8 }}>
          {ticks.map((t) => (
            <Typography
              key={t}
              variant="caption"
              sx={{ color: "text.secondary", fontSize: "0.55rem", lineHeight: 1 }}
            >
              {t}
            </Typography>
          ))}
        </Box>

        <Box
          sx={{
            flex: 1,
            position: "relative",
            background: "#f1f5f9",
            border: "1.5px solid #e2e8f0",
            borderRadius: 2,
            overflow: "hidden",
            minWidth: 24,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: `${heightPercent}%`,
              background: "linear-gradient(to top, #2563eb, #60a5fa)",
              transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: `${heightPercent}%`,
              left: 0,
              right: 0,
              height: "2px",
              background: "#0c41b4",
              transition: "bottom 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </Box>
      </Box>

      <Typography
        sx={{
          color: "primary.main",
          fontFamily: "'Roboto Mono', monospace",
          mt: 1,
          fontSize: "0.8rem",
          fontWeight: 700,
        }}
      >
        {boundedValue} ft
      </Typography>
    </Box>
  );
};