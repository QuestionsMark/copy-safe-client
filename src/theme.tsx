import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	palette: {
		mode: "dark",
		background: {
			default: "#0f0f0f",
			paper: "#181818",
		},
		primary: {
			main: "#6f8bff",
		},
		text: {
			primary: "#ffffff",
		},
	},

	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: "12px",
					padding: "10px 22px",
					textTransform: "none",
					fontWeight: 600,
					fontSize: "1rem",
					backdropFilter: "blur(8px)",
				},
			},
			variants: [
				{
					props: { variant: "ghost" },
					style: {
						background: "rgba(255, 255, 255, 0.06)",
						border: "1px solid rgba(255, 255, 255, 0.15)",
						transition: "0.3s ease",
						"&:hover": {
							background: "rgba(255, 255, 255, 0.12)",
							borderColor: "rgba(255, 255, 255, 0.25)",
						},
					},
				},
			],
		},
	},

	typography: {
		fontFamily: "Inter, sans-serif",
	},
});
