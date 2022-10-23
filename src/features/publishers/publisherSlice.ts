import { apiSlice } from '../../features/api/apiSlice';
import { PublisherParams, Results } from '../../types/publisher';

export interface Publisher {
  id: string;
  name: string;
  active: boolean;
  deletedAt?: string;
  createdAt: string;
  updatedAt: string;
}

const endpointUrl = '/publishers'
function parseQueryParams(params: PublisherParams) {
  const query = new URLSearchParams()
  if (params?.page) query.append('page', params.page.toString())
  if (params?.perPage) query.append('perPage', params.perPage.toString())
  if (params?.search) query.append('filter', params.search.toString())
  if (params?.isActive) query.append('page', params.isActive.toString())
  return query
}

function getPublishers({page = 1, perPage = 10, search = ''}) {
  const params = {page, perPage, search, isActive: true}
  return `${endpointUrl}?${parseQueryParams(params)}`
}

function deletePublisherMutation(publisher: Publisher) {
  return {
    url: `${endpointUrl}/${publisher.id}`,
    method: 'DELETE'
  }
}

function createPublisherMutation(publisher: Publisher) {
  return {
    url: `${endpointUrl}`,
    body: publisher,
    method: 'POST'
  }
}

function updatePublisherMutation(publisher: Publisher) {
  return {
    url: `${endpointUrl}/${publisher.id}`,
    body: publisher,
    method: 'PUT'
  }
}

function getPublisher({id}: { id: string }) {
  return `${endpointUrl}/${id}`
}
export const publishersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({query, mutation}) => ({
    getPublishers: query<Results, PublisherParams>({
      query: getPublishers,
      providesTags: ['Publishers']
    }),
    getPublisher: query<any, {id: string}>({
      query: getPublisher,
      providesTags: ['Publishers']
    }),
    deletePublisher: mutation<any, {id: string}>({
      query: deletePublisherMutation,
      invalidatesTags: ['Publishers']
    }),
    createPublisher: mutation<any, Publisher>({
      query: createPublisherMutation,
      invalidatesTags: ['Publishers']
    }),
    updatePublisher: mutation<any, Publisher>({
      query: updatePublisherMutation,
      invalidatesTags: ['Publishers']
    })
  })
})

export const  {
  useGetPublishersQuery,
  useDeletePublisherMutation,
  useCreatePublisherMutation,
  useUpdatePublisherMutation,
  useGetPublisherQuery
} = publishersApiSlice
