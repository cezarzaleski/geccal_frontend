import { Box, ThemeProvider, Typography } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Layout } from "./components/Layout";
import { appTheme } from "./config/theme";
import { CreateBook } from "./features/books/CreateBook";
import { BookList } from "./features/books/ListBook";
import { BorrowCreating } from "./features/borrows/BorrowCreating";
import { PublisherCreate } from "./features/publishers/CreatePublisher";
import { PublisherEdit } from "./features/publishers/EditPublisher";
import { PublisherList } from "./features/publishers/ListPublisher";

function App() {
	return (
		<ThemeProvider theme={appTheme}>
			<SnackbarProvider
				maxSnack={3}
				autoHideDuration={2000}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<Box
					component="main"
					sx={{
						height: "100vh",
						backgroundColor: (theme) => theme.palette.grey[100],
					}}
				>
					<Header></Header>
					<Layout>
						<Routes>
							<Route path="/" element={<PublisherList />} />
							<Route path="/editoras" element={<PublisherList />} />
							<Route path="/editoras/criar" element={<PublisherCreate />} />
							<Route path="/editoras/editar/:id" element={<PublisherEdit />} />
							<Route path="/livros" element={<BookList />} />
							<Route path="/livros/criar" element={<CreateBook />} />
							<Route path="/livros/editar/:id" element={<PublisherEdit />} />
							<Route path="/emprestimos/criar" element={<BorrowCreating />} />
							<Route
								path="*"
								element={
									<Box sx={{ color: "black" }}>
										<Typography variant="h1">404</Typography>
										<Typography variant="h2">Page not found</Typography>
									</Box>
								}
							/>
						</Routes>
					</Layout>
				</Box>
			</SnackbarProvider>
		</ThemeProvider>
	);
}

export default App;
