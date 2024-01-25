import { apiSlice } from "../../features/api/apiSlice";
import { AuthorParams, Results } from "../../types/author";

export interface Author {
	id: string;
	name: string;
	active: boolean;
	deletedAt?: string;
	createdAt: string;
	updatedAt: string;
}

const endpointUrl = "/authors";
function parseQueryParams(params: AuthorParams) {
	const query = new URLSearchParams();
	if (params?.page) query.append("page", params.page.toString());
	if (params?.perPage) query.append("perPage", params.perPage.toString());
	if (params?.search) query.append("filter", params.search.toString());
	if (params?.isActive) query.append("page", params.isActive.toString());
	return query;
}

function getAuthors({ page = 1, perPage = 10, search = "" }) {
	const params = { page, perPage, search, isActive: true };
	return `${endpointUrl}?${parseQueryParams(params)}`;
}

function deleteAuthorMutation(author: Author) {
	return {
		url: `${endpointUrl}/${author.id}`,
		method: "DELETE",
	};
}

function createAuthorMutation(author: Author) {
	return {
		url: `${endpointUrl}`,
		body: author,
		method: "POST",
	};
}

function updatePublisherMutation(author: Author) {
	return {
		url: `${endpointUrl}/${author.id}`,
		body: author,
		method: "PUT",
	};
}

function getPublisher({ id }: { id: string }) {
	return `${endpointUrl}/${id}`;
}
export const authorApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getAuthors: query<Results, AuthorParams>({
			query: getAuthors,
			providesTags: ["Authors"],
		}),
		getAuthor: query<any, { id: string }>({
			query: getPublisher,
			providesTags: ["Authors"],
		}),
		deleteAuthor: mutation<any, { id: string }>({
			query: deleteAuthorMutation,
			invalidatesTags: ["Authors"],
		}),
		createAuthor: mutation<any, Author>({
			query: createAuthorMutation,
			invalidatesTags: ["Authors"],
		}),
		updateAuthor: mutation<any, Author>({
			query: updatePublisherMutation,
			invalidatesTags: ["Authors"],
		}),
	}),
});

export const {
	useGetAuthorsQuery,
	useDeleteAuthorMutation,
	useCreateAuthorMutation,
	useUpdateAuthorMutation,
	useGetAuthorQuery,
} = authorApiSlice;
