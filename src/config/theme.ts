import { createTheme } from "@mui/material";

export const appTheme = createTheme({
	palette: {
		mode: "light",
		primary: { main: "#6778df" }, // Indigo
		secondary: { main: "#e0e0e0" }, // Gray
		text: { primary: "#212121" }, // Dark Gray
	},
});
