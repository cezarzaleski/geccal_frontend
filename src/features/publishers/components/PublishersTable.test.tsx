import { GridFilterModel } from "@mui/x-data-grid";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { PublishersTable } from "./PublishersTable";

const Props = {
	data: {
		items: [
			{
				id: "1",
				name: "Teste",
				active: true,
				createdAt: new Date(),
			},
		],
		total: 10,
		currentPage: 1,
		lastPage: 1,
		perPage: 10,
	},
	perPage: 10,
	isFetching: false,
	rowsPerPage: [10, 20, 30],
	handleOnPageChange: (page: number) => {},
	handleFilterChange: (filterModel: GridFilterModel) => {},
	handleOnPageSizeChange: (perPage: number) => {},
	handleDelete: (id: string) => {},
};

describe("PublishersTable", () => {
	it("should render publisher table correctly", () => {
		const { asFragment } = render(<PublishersTable {...Props} />, {
			wrapper: BrowserRouter,
		});

		expect(asFragment()).toMatchSnapshot();
	});

	it("renders PublisherTable with loading", () => {
		const { asFragment } = render(<PublishersTable {...Props} isFetching />, {
			wrapper: BrowserRouter,
		});

		expect(asFragment()).toMatchSnapshot();
	});

	it("renders PublisherTable with empty data", () => {
		const data = {
			items: [],
			total: 0,
			currentPage: 0,
			lastPage: 0,
			perPage: 0,
		};
		const { asFragment } = render(<PublishersTable {...Props} data={data} />, {
			wrapper: BrowserRouter,
		});

		expect(asFragment()).toMatchSnapshot();
	});
});
