import { FC } from "react";
import { Box } from "@mui/material";
import { AltitudeGauge } from "../gauges/AltitudeGauge";
import { ADIGauge } from "../gauges/ADIGauge";
import { HSIGauge } from "../gauges/HSIGauge";
import { FlightData } from "@/types/types";

interface Props {
  data: FlightData | undefined;
}

export const VisualDisplay: FC<Props> = ({ data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        p: 3,
        flexWrap: "wrap",
      }}
    >
      <Box sx={{ height: 200, width: 80 }}>
        <AltitudeGauge value={data?.altitude ?? 0} />
      </Box>

      <HSIGauge value={data?.hsi ?? 0} />

      <ADIGauge value={data?.adi ?? 0} />
    </Box>
  );
};