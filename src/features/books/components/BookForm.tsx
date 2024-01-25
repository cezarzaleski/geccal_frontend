import {
	Autocomplete,
	Box,
	Button,
	FormControl,
	Grid,
	TextField,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AutoCompleteCustom } from "../../../components/AutoCompleteCustom";
import { Book } from "../../../features/books/book";
import { Author } from "../../../types/author";
import { Publisher } from "../../../types/publisher";

type Props = {
	book: Book.New;
	authors: Author[];
	publishers?: Publisher[];
	isDisabled?: boolean;
	isLoading?: boolean;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function BookForm({
	book,
	authors,
	publishers,
	isDisabled = false,
	isLoading = false,
	handleSubmit,
	handleChange,
}: Props) {
	const [errors, setErrors] = React.useState<{ [key: string]: string }>({});

	const validate = () => {
		let tempErrors = { ...errors };
		tempErrors = book?.name
			? { ...tempErrors, name: "" }
			: { ...tempErrors, name: "Campo obrigatório" };
		tempErrors = book?.origin
			? { ...tempErrors, origin: "" }
			: { ...tempErrors, origin: "Campo obrigatório" };
		tempErrors = book?.year
			? { ...tempErrors, year: "" }
			: { ...tempErrors, year: "Campo obrigatório" };
		tempErrors = book?.publisher
			? { ...tempErrors, publisher: "" }
			: { ...tempErrors, publisher: "Campo obrigatório" };
		tempErrors =
			book?.authors && book.authors.length > 0
				? { ...tempErrors, authors: "" }
				: { ...tempErrors, authors: "Campo obrigatório" };
		setErrors(tempErrors);
		return Object.values(tempErrors).every((value) => value === "");
	};

	const handleSubmitWithValidation = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validate()) {
			handleSubmit(e);
		}
	};

	const handleChangeWithValidation = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		handleChange(e);
		const tempErrors = { ...errors };
		tempErrors[e.target.name] = e.target.value ? "" : "Campo obrigatório";
		setErrors(tempErrors);
	};

	function getYears() {
		const years = [];
		const now = new Date();
		const start = now.getFullYear();
		for (let i = start; i >= 1988; i--) {
			years.push({
				id: "" + i,
				name: "" + i,
			});
		}
		return years;
	}

	function origins() {
		return [
			{ name: "Aquisição Geccal", id: "aquisition" },
			{ name: "Confecção Geccal", id: "confection" },
			{ name: "Doação", id: "donation" },
			{ name: "Sem Informação", id: "no-information" },
		];
	}

	return (
		<form onSubmit={handleSubmitWithValidation}>
			<Grid item xs={12}>
				<Box mb={2}>
					<FormControl fullWidth>
						<TextField
							disabled={isDisabled}
							value={book?.name}
							inputProps={{
								"data-testid": "name",
							}}
							error={!!errors.name}
							helperText={errors.name}
							onChange={handleChangeWithValidation}
							name="name"
							label="Nome"
						/>
					</FormControl>
				</Box>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Box mb={2}>
						<FormControl fullWidth>
							<TextField
								disabled={isDisabled}
								value={book?.edition}
								onChange={handleChange}
								name="edition"
								inputProps={{
									"data-testid": "edition",
								}}
								label="Número da Edição"
							/>
						</FormControl>
					</Box>
				</Grid>
				<Grid item xs={6}>
					<Box mb={2}>
						<FormControl fullWidth>
							<AutoCompleteCustom
								name="year"
								label="Ano"
								isLoading={isLoading}
								isDisabled={isDisabled}
								handleChange={handleChangeWithValidation}
								values={book?.year ? [book.year] : []}
								options={getYears()}
								error={!!errors.year}
								helperText={errors.year}
							/>
						</FormControl>
					</Box>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Box mb={2}>
						<FormControl fullWidth>
							<AutoCompleteCustom
								name="origin"
								label="Origem"
								isLoading={isLoading}
								isDisabled={isDisabled}
								handleChange={handleChangeWithValidation}
								values={book?.origin ? [book.origin] : []}
								options={origins()}
								error={!!errors.origin}
								helperText={errors.origin}
							/>
						</FormControl>
					</Box>
				</Grid>
				<Grid item xs={6}>
					<Box mb={2}>
						<FormControl fullWidth>
							<Autocomplete
								disablePortal
								freeSolo
								loading={isLoading}
								onInputChange={(_, value: string) => {
									// A new option has been entered
									handleChangeWithValidation({
										target: { name: "publisher", value },
									} as any);
								}}
								onChange={(_, value: Publisher | string) => {
									if (typeof value === "string") {
										// A new option has been entered
										handleChangeWithValidation({
											target: { name: "publisher", value },
										} as any);
									} else {
										// An existing option has been selected
										handleChangeWithValidation({
											target: { name: "publisher", value: value?.id },
										} as any);
									}
								}}
								renderOption={(props, option: any) => (
									<li {...props} key={option.id}>
										{option.name}
									</li>
								)}
								options={publishers || []}
								disabled={isDisabled || !publishers}
								getOptionLabel={(option) => {
									if (typeof option === "string") return option;
									return option.name;
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Editora"
										data-testid="publisher"
										error={!!errors.publisher}
										helperText={errors.publisher}
									/>
								)}
							/>
						</FormControl>
					</Box>
				</Grid>
			</Grid>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Box mb={2}>
						<FormControl fullWidth>
							<Autocomplete
								disablePortal
								noOptionsText={"Nenhum autor encontrado"}
								multiple
								freeSolo
								loading={isLoading}
								onChange={(_, value: any) => {
									let authors = [];
									if (value && value.length)
										authors = value.map((it: { id: any }) => it.id);
									handleChangeWithValidation({
										target: { name: "authors", value: authors },
									} as any);
								}}
								renderOption={(props, option: any) => (
									<li {...props} key={option.id}>
										{option.name}
									</li>
								)}
								options={authors || []}
								disabled={isDisabled || !authors}
								getOptionLabel={(option) => {
									if (typeof option === "string") return option;
									return option.name;
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Autores"
										data-testid="authors"
										error={!!errors.authors}
										helperText={errors.authors}
									/>
								)}
							/>
						</FormControl>
					</Box>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Box display="flex" gap={2}>
					<Button
						variant="contained"
						component={Link}
						to="/livros"
						color="secondary"
					>
						Voltar
					</Button>
					<Button type="submit" variant="contained" disabled={isDisabled}>
						Salvar
					</Button>
				</Box>
			</Grid>
		</form>
	);
}
