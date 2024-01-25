import { Paginator } from "../../types/paginator";
import { apiSlice } from "../api/apiSlice";
import { Evangelizando } from "./evangelizando";

const endpointUrl = "/evangelizandos";
function getEvangelizandos() {
	return `${endpointUrl}`;
}

export const evangelizandosApiSlice = apiSlice.injectEndpoints({
	endpoints: ({ query, mutation }) => ({
		getEvangelizandos: query<
			Paginator.Response<Evangelizando.Borrow>,
			Paginator.Params
		>({
			query: getEvangelizandos,
			providesTags: ["Evangelizandos"],
		}),
	}),
});

export const { useGetEvangelizandosQuery } = evangelizandosApiSlice;
