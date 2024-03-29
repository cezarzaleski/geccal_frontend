import { Box, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { Book } from "../books/book";
import { useGetBooksQuery } from "../books/bookSlice";
import { Evangelizando } from "../evangelizando/evangelizando";
import { useGetEvangelizandosQuery } from "../evangelizando/evangelizandoSlice";
import {Borrow, BorrowForm} from "./components/BorrowForm";

export const BorrowCreating = () => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [borrow, setBorrow] = useState<Borrow>({
		id: "",
		bookId: "",
		evangelizandoId: "",
		borrowAt: dayjs().format("YYYY-MM-DD"),
	});

	const { data: books } = useGetBooksQuery({
		perPage: 999999,
		search: "",
		page: 0,
	});

	const { data: evangelizandos } = useGetEvangelizandosQuery({
		perPage: 999999,
		search: "",
		page: 0,
	});

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	const handleChange = (name: string, value: string | number | Array<string> | Array<number>) => {
		setBorrow({ ...borrow, [name]: value });
	};

	return (
		<Box>
			<Paper>
				<Box p={2}>
					<Box mb={2}>
						<Typography variant="h4">Emprestar Livro</Typography>
					</Box>
				</Box>
				<Box p={2}>
					<BorrowForm
						borrow={borrow}
						books={books?.items as Array<Book.Entity>}
						evangelizandos={
							evangelizandos?.items as Array<Evangelizando.Borrow>
						}
						isDisabled={isDisabled}
						isLoading={false}
						handleSubmit={handleSubmit}
						handleChange={handleChange}
					/>
				</Box>
			</Paper>
		</Box>
	);
};
