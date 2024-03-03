import { Box, Button, FormControl, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AutoCompleteCustom } from '../../../components/AutoCompleteCustom';
import { Book } from '../../books/book';
import { Evangelizando } from '../../evangelizando/evangelizando';

dayjs.locale('pt-br');

export type Borrow = {
	id: string;
	bookId: string;
	evangelizandoId: string;
	borrowAt: string;
};

type Props = {
	borrow: Borrow;
	books: Book.Entity[];
	evangelizandos: Evangelizando.Borrow[];
	isDisabled?: boolean;
	isLoading?: boolean;
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	handleChange: (name: string, value: string | number | Array<string> | Array<number>) => void;
};

export function BorrowForm({
	books,
	borrow,
	evangelizandos,
	isDisabled = false,
	isLoading = false,
	handleSubmit,
	handleChange,
}: Props) {
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	const handleChangeWithValidationAutocomplete = (name: string, value: string | Array<string>) => {
		handleChange(name, value);
	}

	const setBorrowAt = (date: Dayjs | null) => {
		const value = date ? date?.format('YYYY-MM-DD') : '';
		handleChange('borrowAt', value);
		const tempErrors = { ...errors };
		tempErrors.borrowAt = date ? '' : 'Campo obrigatório';
		setErrors(tempErrors);
	};

	const validate = () => {
		let tempErrors = { ...errors };
		tempErrors = borrow?.bookId
			? { ...tempErrors, bookId: '' }
			: { ...tempErrors, bookId: 'Campo obrigatório' };
		tempErrors = borrow?.evangelizandoId
			? { ...tempErrors, evangelizandoId: '' }
			: { ...tempErrors, evangelizandoId: 'Campo obrigatório' };
		tempErrors = borrow?.borrowAt
			? { ...tempErrors, borrowAt: '' }
			: { ...tempErrors, borrowAt: 'Campo obrigatório' };
		setErrors(tempErrors);
		return Object.values(tempErrors).every((value) => value === '');
	};

	const handleSubmitWithValidation = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (validate()) {
			handleSubmit(e);
		}
	};

	const booksToOption = () => {
		return books?.map((book: Book.Entity) => {
			return {
				id: book.id,
				name: `${book.name} - ${book.exemplary}`,
			};
		});
	};

	const evangelizandosToOption = () => {
		return evangelizandos?.map((evangelizando: Evangelizando.Borrow) => {
			return {
				id: evangelizando.id,
				name: `${evangelizando.name} - ${evangelizando.class.name}`,
			};
		});
	};

	return (
		<form onSubmit={handleSubmitWithValidation}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Box mb={2}>
						<FormControl fullWidth>
							<AutoCompleteCustom
								name='evangelizandoId'
								label='Evangelizando'
								isLoading={isLoading}
								isDisabled={isDisabled}
								values={borrow.evangelizandoId}
								options={evangelizandosToOption()}
								handleChange={handleChangeWithValidationAutocomplete}
								error={!!errors.evangelizandoId}
								helperText={errors.evangelizandoId}
							/>
						</FormControl>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box mb={2}>
						<FormControl fullWidth>
							<AutoCompleteCustom
								name='bookId'
								label='Livro'
								isLoading={isLoading}
								isDisabled={isDisabled}
								values={borrow.bookId}
								options={booksToOption()}
								handleChange={handleChangeWithValidationAutocomplete}
								error={!!errors.bookId}
								helperText={errors.bookId}
							/>
						</FormControl>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box mb={2}>
						<FormControl fullWidth>
							<LocalizationProvider
								dateAdapter={AdapterDayjs}
								dateLibInstance={dayjs}
							>
								<DatePicker
									label='Data de Empréstimo'
									value={dayjs(borrow.borrowAt)}
									onChange={(newDate: Dayjs | null) => setBorrowAt(newDate)}
									slotProps={{
										textField: {
											helperText: errors.borrowAt,
											error: !!errors.borrowAt,
										},
									}}
								/>
							</LocalizationProvider>
						</FormControl>
					</Box>
				</Grid>
			</Grid>
			<Grid item xs={12}>
				<Box display='flex' gap={2}>
					<Button
						variant='contained'
						component={Link}
						to='/emprestimos'
						color='secondary'
					>
						Voltar
					</Button>
					<Button type='submit' variant='contained' disabled={isDisabled}>
						Salvar
					</Button>
				</Box>
			</Grid>
		</form>
	);
}
