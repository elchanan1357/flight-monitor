import { FC } from "react";
import { Box, Paper, Typography } from "@mui/material";
import { FlightData } from "@/types/types";

interface FieldConfig {
  key: keyof FlightData;
  label: string;
  unit: string;
  color: string;
}
interface Props {
  data: FlightData | undefined;
}

const FIELDS: FieldConfig[] = [
  { key: "altitude", label: "Altitude", unit: "ft", color: "#2563eb" },
  { key: "hsi", label: "HSI", unit: "°", color: "#f97316" },
  { key: "adi", label: "ADI", unit: "", color: "#059669" },
];

export const TextDisplay: FC<Props> = ({ data }) => {
  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap", p: 3 }}>
      {FIELDS.map(({ key, label, unit, color }) => (
        <Paper
          key={key}
          elevation={0}
          sx={{
            px: 4,
            py: 3,
            minWidth: 130,
            textAlign: "center",
            borderRadius: 3,
            border: `1.5px solid ${color}18`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
            boxShadow: `0 8px 8px ${color}15`,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              letterSpacing: "0.12em",
              fontSize: "0.65rem",
              fontWeight: 500,
              textTransform: "uppercase",
            }}
          >
            {label}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color,
              fontFamily: "'Roboto Mono', monospace",
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            {data ? `${data[key]}${unit}` : "—"}
          </Typography>
        </Paper>
      ))}
    </Box>
  );
};
