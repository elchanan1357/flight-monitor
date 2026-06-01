import { FC } from "react";
import { Box, Typography } from "@mui/material";

interface Props {
  value: number;
}

export const HSIGauge: FC<Props> = ({ value }) => {
  const boundedValue = Math.min(Math.max(value, 0), 360);
  const x = 90;
  const y = 90;
  const radius = 68;
  const topOffset = 36;
  const cardinals = [
    { label: "0", deg: 0 },
    { label: "180", deg: 90 },
    { label: "90", deg: 180 },
    { label: "270", deg: 270 }
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography
        variant="caption"
        sx={{
          color: "text.secondary",
          letterSpacing: "0.12em",
          mb: 0.5,
          textTransform: "uppercase",
        }}
      >
        HSI
      </Typography>

      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle cx={x} cy={y} r={radius + 6} fill="#f8fafc" stroke="#eff1f4" strokeWidth="1.5" />

        <g style={{ transform: `rotate(${-boundedValue}deg)`, transformOrigin: `${x}px ${y}px`, transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)" }}>
          {cardinals.map(({ label, deg }) => (
            <text
              key={`cardinal-${deg}`}
              x={x}
              y={topOffset}
              textAnchor="middle"
              fontSize="9"
              fontFamily="'DM Sans', sans-serif"
              fontWeight="700"
              transform={`rotate(${deg}, ${x}, ${y}) rotate(${-deg + boundedValue}, ${x}, ${topOffset - 3})`}
            >
              {label}
            </text>
          ))}
        </g>

        <marker
          id="arrowhead"
          markerWidth="6"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 6 3, 0 6" fill="#f97316" />
        </marker>
        <line
          x1={x} y1={y + 20}
          x2={x} y2={y - radius + 40}
          stroke="#f97316"
          strokeWidth="2.5"
          markerEnd="url(#arrowhead)"
        />
      </svg>

      <Typography
        sx={{
          color: "primary.main",
          fontFamily: "'Roboto Mono', monospace",
          fontSize: "0.8rem",
          fontWeight: 700,
          mt: -1,
        }}
      >
        {boundedValue}°
      </Typography>
    </Box>
  );
};