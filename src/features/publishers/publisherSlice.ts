import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { apiSlice } from '../../features/api/apiSlice';
import { Results } from '../../types/publisher';

export interface Publisher {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  deleted_at: null | string;
  created_at: string;
  updated_at: string;
}

const endpointUrl = '/publishers'
function deletePublisherMutation(publisher: Publisher) {
  return {
    url: `${endpointUrl}/${publisher.id}`,
    method: 'DELETE'
  }
}
export const publishersApiSlice = apiSlice.injectEndpoints({
  endpoints: ({query, mutation}) => ({
    getPublishers: query<Results, void>({
      query: () => `${endpointUrl}`,
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
  description: "description",
  is_active: true,
  deleted_at: null,
  created_at: "2022-08-15T10:59:09+0000",
  updated_at: "2022-08-15T10:59:09+0000"
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

export const selectPublishers = (state: RootState) => state.publishers
export const selectPublishersById = (state: RootState, id: string) => {
  const publisher = state.publishers.find(it => it.id == id)
  if (!publisher) return {
    id: '',
    name: '',
    description: '',
    is_active: true,
    deleted_at: null,
    created_at: '',
    updated_at: ''
  }
  return publisher
}

export default publishersSlice.reducer
export const { createPublisher, updatePublisher, deletePublisher } = publishersSlice.actions
export const  {
  useGetPublishersQuery,
  useDeletePublisherMutation
} = publishersApiSlice
