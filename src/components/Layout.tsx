import { Box, Container } from "@mui/material";
import React, { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
	return (
		<Box>
			<Container
				maxWidth="lg"
				sx={{
					mt: 4,
					mb: 4,
				}}
			>
				{children}
			</Container>
		</Box>
	);
}
