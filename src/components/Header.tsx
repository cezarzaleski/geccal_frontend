import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import React from "react";

export function Header() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography component="div" sx={{ flexGrow: 1 }}>
						<Typography variant="h6">Biblioteca Infantil</Typography>
						<Typography variant="subtitle1">
							Departamento de Infância e Juventude
						</Typography>
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
