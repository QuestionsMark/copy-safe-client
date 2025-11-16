import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endpoints, useApi } from "../../hooks/useApi";

export const Share = () => {
	const { loading, run } = useApi(endpoints.getShare);
	const { id } = useParams();
	const [data, setData] = useState<{ text: string } | null>(null);

	const getShare = async (id: string) => {
		const { data } = await run(id);
		if (!data?.text) {
			enqueueSnackbar("Link, którego użyłeś jest niepoprawny lub został już użyty.", {
				variant: "error",
			});
			return;
		}
		setData(data);
		enqueueSnackbar("Tajna wiadomość skopiowana do schowka!", { variant: "success" });
	};

	const handleCopy = async () => {
		if (!data) return;

		await navigator.clipboard.writeText(data.text);
		enqueueSnackbar("Skopiowano do schowka!", { variant: "success" });
	};

	useEffect(() => {
		if (id) {
			getShare(id);
		}
	}, [id]);

	return (
		<Box
			sx={{
				minHeight: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				px: 2,
				background:
					"radial-gradient(circle at 30% 20%, rgba(110,110,255,0.2), transparent 50%), radial-gradient(circle at 70% 80%, rgba(180,90,255,0.2), transparent 50%)",
			}}
		>
			<Grid>
				<Typography
					variant="h5"
					sx={{ textAlign: "center", mb: 3, fontWeight: 700 }}
				>
					Your Secret Message
				</Typography>

				{loading ? (
					<Typography sx={{ opacity: 0.6, textAlign: "center" }}>Loading...</Typography>
				) : data ? (
					<Stack spacing={2}>
						<Box
							sx={{
								p: 2,
								borderRadius: "12px",
								backgroundColor: "rgba(255,255,255,0.07)",
								border: "1px solid rgba(255,255,255,0.15)",
								whiteSpace: "pre-wrap",
								fontSize: "1rem",
								lineHeight: 1.6,
								wordBreak: "break-word",
								maxWidth: 500,
							}}
						>
							{data.text}
						</Box>

						<IconButton
							onClick={handleCopy}
							sx={{
								alignSelf: "center",
								width: 48,
								height: 48,
								borderRadius: "12px",
								backgroundColor: "rgba(255,255,255,0.08)",
								border: "1px solid rgba(255,255,255,0.18)",
								transition: "0.2s",
								"&:hover": {
									backgroundColor: "rgba(255,255,255,0.14)",
								},
							}}
						>
							<ContentCopyIcon />
						</IconButton>
					</Stack>
				) : (
					<Typography sx={{ textAlign: "center", opacity: 0.7 }}>
						Nothing to display.
					</Typography>
				)}
			</Grid>
		</Box>
	);
};
