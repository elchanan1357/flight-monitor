import { ThemeProvider, CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import App from "./App";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#2563eb",
            light: "#60a5fa",
            dark: "#1d4ed8",
        },
        secondary: {
            main: "#7c3aed",
            light: "#a78bfa",
            dark: "#5b21b6",
        },
        background: {
            default: "#f5f7fa",
            paper: "#ffffff",
        },
        success: {
            main: "#059669",
        },
        warning: {
            main: "#d97706",
        },
        error: {
            main: "#dc2626",
        },
        text: {
            primary: "#1e293b",
            secondary: "#64748b",
        },
        divider: "rgba(0,0,0,0.08)",
    },
    typography: {
        fontFamily: "'DM Sans', 'Roboto Mono', sans-serif",
        body2: { fontFamily: "'Roboto Mono', monospace" },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 10,
                    textTransform: "none",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        borderRadius: 10,
                        backgroundColor: "#f8fafc",
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#93c5fd",
                        },
                    },
                },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    borderRadius: 16,
                    boxShadow: "0 25px 60px rgba(0,0,0,0.12)",
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    borderRadius: "10px !important",
                    textTransform: "none",
                },
            },
        },
    },
});

const ThemeApp = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    );
};

export default ThemeApp;