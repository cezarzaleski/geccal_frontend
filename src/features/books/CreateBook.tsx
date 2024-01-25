import { Box, Paper, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Book } from "../../features/books/book";
import { useCreateBookMutation } from "../../features/books/bookSlice";
import { Author } from "../../types/author";
import { Publisher } from "../../types/publisher";
import { useGetAuthorsQuery } from "../authors/authorSlice";
import { useGetPublishersQuery } from "../publishers/publisherSlice";
import { BookForm } from "./components/BookForm";

export const CreateBook = () => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [createBook, status] = useCreateBookMutation();
	const options = { perPage: 99999, search: "", page: 1 };
	const { data: dataAuthors } = useGetAuthorsQuery(options);
	const { data: dataPublishers } = useGetPublishersQuery(options);
	let authors: Author[] = [];
	let publishers: Publisher[] = [];
	if (dataAuthors) authors = dataAuthors.items;
	if (dataPublishers) publishers = dataPublishers.items;
	const { enqueueSnackbar } = useSnackbar();
	const [book, setBook] = useState<Book.New>({
		name: "",
		edition: "",
		year: 0,
		origin: "",
		publisher: "",
		authors: [],
	});
	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		await createBook(book);
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setBook({ ...book, [name]: value });
	};
	useEffect(() => {
		if (status.isSuccess) {
			enqueueSnackbar("Livro cadastrado com sucesso", { variant: "success" });
			setIsDisabled(true);
		}
		if (status.error) {
			enqueueSnackbar("Erro ao cadastrar livro", { variant: "error" });
		}
	}, [enqueueSnackbar, status.error, status.isSuccess]);

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Cadastro de livro</Typography>
					</Box>
				</Box>
				<Box p={2}>
					<BookForm
						authors={authors}
						publishers={publishers}
						book={book}
						isDisabled={isDisabled}
						isLoading={false}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
					></BookForm>
				</Box>
			</Paper>
		</Box>
	);
};
