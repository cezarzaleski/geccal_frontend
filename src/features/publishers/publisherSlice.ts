import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { apiSlice } from '../../features/api/apiSlice';
import { PublisherParams, Results } from '../../types/publisher';

export interface Publisher {
  id: string;
  name: string;
  active: boolean;
  deletedAt: null | string;
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
export const publishersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({query, mutation}) => ({
    getPublishers: query<Results, PublisherParams>({
      query: getPublishers,
      providesTags: ['Publishers']
    }),
    deletePublisher: mutation<any, {id: string}>({
      query: deletePublisherMutation,
      invalidatesTags: ['Publishers']
    })
  })

})


const publisher: Publisher = {
  id: "1",
  name: "Name",
  active: true,
  deletedAt: null,
  createdAt: "2022-08-15T10:59:09+0000",
  updatedAt: "2022-08-15T10:59:09+0000"
}

export const initialState = [
  publisher,
  {...publisher, id: '2', name: 'Name'},
  {...publisher, id: '3', name: 'teste'},
  {...publisher, id: '4', name: 'batata'}
]

const publishersSlice = createSlice({
  name: 'publishers',
  initialState: initialState,
  reducers: {
    createPublisher(state, action) {
      state.push(action.payload)
    },
    updatePublisher(state, action) {
      const index = state.findIndex(
        publisher => publisher.id === action.payload.id
      )
      state[index] = action.payload
    },
    deletePublisher(state, action) {
      const index = state.findIndex(
        publisher => publisher.id === action.payload.id
      )
      state.splice(index, 1)
    },
  }
})
export const selectPublishersById = (state: RootState, id: string) => {
  const publisher = state.publishers.find(it => it.id == id)
  if (!publisher) return {
    id: '',
    name: '',
    active: true,
    deletedAt: null,
    createdAt: '',
    updatedAt: ''
  }
  return publisher
}

export default publishersSlice.reducer
export const { createPublisher, updatePublisher } = publishersSlice.actions
export const  {
  useGetPublishersQuery,
  useDeletePublisherMutation
} = publishersApiSlice
