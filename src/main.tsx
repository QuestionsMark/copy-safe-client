import "@fontsource/inter/400.css";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App.tsx";
import "./index.css";
import { theme } from "./theme.tsx";

// biome-ignore lint/style/noNonNullAssertion: React needs this element. index.html must contain div with id "root".
createRoot(document.getElementById("root")!).render(
	<ThemeProvider theme={theme}>
		<Router>
			<CssBaseline />
			<SnackbarProvider
				maxSnack={3}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
				autoHideDuration={3000}
			>
				<App />
			</SnackbarProvider>
		</Router>
	</ThemeProvider>,
);
