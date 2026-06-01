import { FC, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, Box, Typography, Alert, CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { FlightData } from "@/types/types";

interface FieldConfig {
  name: keyof Omit<FlightData, "_id" | "createdAt" | "updatedAt">;
  label: string;
  min: number;
  max: number;
  unit: string;
}
interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<FlightData, "_id" | "createdAt" | "updatedAt">) => Promise<void>;
  loading: boolean;
  data: FlightData | undefined;
}
type FormState = Record<string, string>;

const FIELDS: FieldConfig[] = [
  { name: "altitude", label: "Altitude", min: 0, max: 3000, unit: "ft" },
  { name: "hsi", label: "HSI", min: 0, max: 360, unit: "°" },
  { name: "adi", label: "ADI", min: -100, max: 100, unit: "" },
];
const defaultForm: FormState = { altitude: "", hsi: "", adi: "" };

export const DataInputDialog: FC<Props> = ({ open, onClose, onSubmit, loading, data }) => {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): Partial<FormState> => {
    const newErrors: Partial<FormState> = {};
    FIELDS.forEach(({ name, min, max }) => {
      const val = Number(form[name]);
      if (form[name] === "" || isNaN(val)) {
        newErrors[name] = "Required";
      } else if (val < min || val > max) {
        newErrors[name] = `Must be between ${min} and ${max}`;
      }
    });
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    setSubmitError(null);
  };

  const handleSubmit = async () => {
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      console.warn("Form validation failed", validation);
      return;
    }
    try {
      await onSubmit({
        altitude: Number(form.altitude),
        hsi: Number(form.hsi),
        adi: Number(form.adi),
      });
      handleClose();
    } catch (err) {
      const messageError = err instanceof Error ? err.message : "Failed to submit";
      setSubmitError(messageError);
      console.error("Dialog submit error", messageError);
    }
  };

  const handleClose = () => {
    setForm(defaultForm);
    setErrors({});
    setSubmitError(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      disableEnforceFocus
      disableRestoreFocus
    >
      <DialogTitle sx={{ color: "text.primary", pb: 1 }}>
        Input Flight Data
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {submitError}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {FIELDS.map(({ name, label, min, max, unit }) => (
            <Box key={name} sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
              <Typography
                sx={{
                  minWidth: 70,
                  color: "text.secondary",
                  fontSize: 14,
                  pt: 1,
                }}
              >
                {label}:
              </Typography>
              <TextField
                name={name}
                value={form[name]}
                onChange={handleChange}
                error={!!errors[name]}
                helperText={errors[name] || `${min} – ${max}${unit}`}
                type="number"
                size="small"
                fullWidth
                placeholder={data?.[name] !== undefined ? String(data[name]) : ""}
                slotProps={{ htmlInput: { min, max } }}
              />
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2.5, pt: 1, gap: 1 }}>
        <Button onClick={handleClose} color="inherit" size="small" variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          size="small"
          disabled={loading}
          endIcon={loading ? <CircularProgress size={14} color="inherit" /> : <SendIcon />}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};