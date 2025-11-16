import ShareIcon from "@mui/icons-material/Share";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { endpoints, useApi } from "../../hooks/useApi";

export const Home = () => {
	const [value, setValue] = useState("");
	const { run, loading } = useApi(endpoints.share);

	const handleShare = async () => {
		const { data, error } = await run(value);
		if (!data?.url) {
			enqueueSnackbar(`Błąd: ${error}`, { variant: "error" });
			return;
		}
		setValue("");
		enqueueSnackbar("Link skopiowany do schowka!", { variant: "success" });
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				textAlign: "center",
				px: 2,
				background:
					"radial-gradient(circle at 30% 20%, rgba(110,110,255,0.2), transparent 50%), radial-gradient(circle at 70% 80%, rgba(180,90,255,0.2), transparent 50%)",
			}}
		>
			<Typography
				variant="h4"
				component="h1"
				sx={{
					mb: 4,
					fontWeight: 700,
					letterSpacing: "0.5px",
				}}
			>
				Share your Passwords safely!
			</Typography>

			<Stack
				direction={{ xs: "column", sm: "row" }}
				spacing={2}
				sx={{ width: "100%", maxWidth: 500 }}
			>
				<TextField
					fullWidth
					placeholder="Paste your text here..."
					value={value}
					onChange={e => setValue(e.target.value)}
					sx={{
						input: { color: "#fff" },
						"& .MuiOutlinedInput-root": {
							borderRadius: "12px",
							backgroundColor: "rgba(255,255,255,0.05)",
							backdropFilter: "blur(8px)",
							"& fieldset": {
								borderColor: "rgba(255,255,255,0.15)",
							},
							"&:hover fieldset": {
								borderColor: "rgba(255,255,255,0.25)",
							},
							"&.Mui-focused fieldset": {
								borderColor: "#6f8bff",
							},
						},
					}}
				/>

				<Button
					variant="ghost"
					size="large"
					startIcon={<ShareIcon />}
					disabled={!value || loading}
					onClick={handleShare}
					sx={{ whiteSpace: "nowrap" }}
				>
					{loading ? "Sharing..." : "Share"}
				</Button>
			</Stack>
		</Box>
	);
};
