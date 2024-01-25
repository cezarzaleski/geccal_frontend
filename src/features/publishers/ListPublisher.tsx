import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PublishersTable } from "./components/PublishersTable";
import {
	useDeletePublisherMutation,
	useGetPublishersQuery,
} from "./publisherSlice";

export const PublisherList = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [rowsPerPage] = useState([10, 50, 100]);
	const [page, setPage] = useState(1);
	const [perPage, setPerPage] = useState(10);
	const [search, setSearch] = useState("");

	const options = { perPage, search, page };

	const { data, isFetching, error } = useGetPublishersQuery(options);
	const [deletePublisher, deletePublisherStatus] = useDeletePublisherMutation();
	async function handleDeletePublisher(id: string) {
		await deletePublisher({ id });
	}

	function handleOnPageChange(page: number) {
		setPage(page + 1);
	}

	function handleOnPageSizeChange(pearPage: number) {
		setPerPage(pearPage);
	}

	function handleFilterChange(filterModel: GridFilterModel) {
		let search = "";
		if (filterModel.quickFilterValues?.length) {
			search = filterModel.quickFilterValues.join("");
		}
		return setSearch(search);
	}

	useEffect(() => {
		if (deletePublisherStatus.isSuccess) {
			enqueueSnackbar("Editora removida com sucesso!", { variant: "success" });
		}
		if (deletePublisherStatus.error) {
			enqueueSnackbar("Editora não removida", { variant: "error" });
		}
	}, [deletePublisherStatus]);

	if (error) {
		return <Typography>Erro ao carregar as editoras</Typography>;
	}

	return (
		<Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
			<Box display="flex" justifyContent="flex-end">
				<Button
					variant="contained"
					color="secondary"
					component={Link}
					to="/editoras/criar"
					style={{ marginBottom: "1rem" }}
				>
					Nova Editora
				</Button>
			</Box>
			<PublishersTable
				data={data}
				isFetching={isFetching}
				perPage={perPage}
				rowsPerPage={rowsPerPage}
				handleDelete={handleDeletePublisher}
				handleOnPageChange={handleOnPageChange}
				handleOnPageSizeChange={handleOnPageSizeChange}
				handleFilterChange={handleFilterChange}
			/>
		</Box>
	);
};
