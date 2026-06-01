import { useState } from "react";
import {
  Box, Paper, ToggleButtonGroup, ToggleButton,
  IconButton, Tooltip, Typography, Chip, Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlightIcon from "@mui/icons-material/Flight";
import { useFlightData } from "@/hooks/useFlightData";
import { DataInputDialog } from "@/components/dialogs/DataInputDialog";
import { VisualDisplay } from "@/components/layout/VisualDisplay";
import { TextDisplay } from "@/components/layout/TextDisplay";

enum ViewMode {
  Visual = "visual",
  Text = "text"
}

const App = () => {
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Visual);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { data, loading, error, sendFlightData } = useFlightData();

  const handleModeChange = (newMode: ViewMode) => {
    if (newMode) {
      setViewMode(newMode);
      console.log(`View mode changed to: ${newMode}`);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e8ecf3 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 750 }}>
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1.5, mb: 1 }}>
            <FlightIcon sx={{ color: "primary.main", fontSize: 28 }} />
            <Typography
              variant="h3"
              sx={{
                color: "text.primary",
                letterSpacing: "-0.02em",
              }}
            >
              Flight Director
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              letterSpacing: "0.15em",
              fontFamily: "'Roboto Mono', monospace",
              textTransform: "uppercase",
            }}
          >
            Monitor System
          </Typography>
        </Box>

        {error && (
          <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>
            Could not connect to server. Showing last known data.
          </Alert>
        )}

        <Paper
          elevation={0}
          sx={{
            height: 380,
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid rgba(0,0,0,0.06)",
            boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.03)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2.5,
              py: 1.5,
              borderBottom: "1px solid",
              borderColor: "divider",
              background: "#fafbfc",
            }}
          >
            <Chip
              size="small"
              label={loading ? "Loading" : "Live"}
              color={loading ? "warning" : "success"}
              sx={{
                height: 22,
                letterSpacing: "0.06em",
                fontWeight: 600,
              }}
            />

            <ToggleButtonGroup
              value={viewMode}
              exclusive
              onChange={(_event, value) => handleModeChange(value as ViewMode)}
              size="small"
              sx={{ gap: 2 }}
            >
              <ToggleButton value={ViewMode.Visual} sx={{ px: 1.5, py: 0.5, gap: 0.5 }}>
                <VisibilityIcon sx={{ fontSize: 14 }} />
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  Visual
                </Typography>
              </ToggleButton>

              <ToggleButton value={ViewMode.Text} sx={{ px: 1.5, py: 0.5, gap: 0.5 }}>
                <TextFieldsIcon sx={{ fontSize: 14 }} />
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  Text
                </Typography>
              </ToggleButton>
            </ToggleButtonGroup>

            <Tooltip title="Add flight data">
              <IconButton
                size="small"
                onClick={() => setDialogOpen(true)}
                sx={{
                  bgcolor: "#2563eb",
                  color: "white",
                  width: 30,
                  height: 30,
                  borderRadius: 2,
                  "&:hover": { bgcolor: "#1d4ed8" },
                }}
              >
                <AddIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", pt: 3 }}>
            {viewMode === ViewMode.Visual ? (
              <VisualDisplay data={data} />
            ) : (
              <TextDisplay data={data} />
            )}
          </Box>
        </Paper>
      </Box>

      <DataInputDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={sendFlightData}
        loading={loading}
        data={data}
      />
    </Box>
  );
};

export default App;