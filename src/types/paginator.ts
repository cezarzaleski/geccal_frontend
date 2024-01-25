export namespace Paginator {
	export interface Response<T> {
		items: T[];
		total: number;
		currentPage: number;
		lastPage: number;
		perPage: number;
	}

	export interface Params {
		page?: number;
		perPage?: number;
		search?: string;
		isActive?: boolean;
	}
}
