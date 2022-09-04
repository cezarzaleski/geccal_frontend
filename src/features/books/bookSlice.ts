import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { apiSlice } from '../../features/api/apiSlice';
import { BooksParams, Results } from '../../types/book';

export interface Book {
  id: string;
  name: string;
  active: boolean;
  edition?: string;
  origin?: string;
  year?: number;
  publisherId?: string;
  authors?: string[];
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
}

const endpointUrl = '/books'
function parseQueryParams(params: BooksParams) {
  const query = new URLSearchParams()
  if (params?.page) query.append('page', params.page.toString())
  if (params?.perPage) query.append('perPage', params.perPage.toString())
  if (params?.search) query.append('filter', params.search.toString())
  if (params?.isActive) query.append('page', params.isActive.toString())
  return query
}

function getBooks({page = 1, perPage = 10, search = ''}) {
  const params = {page, perPage, search, isActive: true}
  return `${endpointUrl}?${parseQueryParams(params)}`
}

function deleteBookMutation(publisher: Book) {
  return {
    url: `${endpointUrl}/${publisher.id}`,
    method: 'DELETE'
  }
}
export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: ({query, mutation}) => ({
    getBooks: query<Results, BooksParams>({
      query: getBooks,
      providesTags: ['Books']
    }),
    deleteBook: mutation<any, {id: string}>({
      query: deleteBookMutation,
      invalidatesTags: ['Books']
    })
  })

})


const publisher: Book = {
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

const booksSlice = createSlice({
  name: 'publishers',
  initialState: initialState,
  reducers: {
    createBook(state, action) {
      state.push(action.payload)
    },
    updateBook(state, action) {
      const index = state.findIndex(
        publisher => publisher.id === action.payload.id
      )
      state[index] = action.payload
    },
    deleteBook(state, action) {
      const index = state.findIndex(
        publisher => publisher.id === action.payload.id
      )
      state.splice(index, 1)
    },
  }
})
export const selectBooksById = (state: RootState, id: string) => {
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

export default booksSlice.reducer
export const { createBook, updateBook } = booksSlice.actions
export const  {
  useGetBooksQuery,
  useDeleteBookMutation
} = booksApiSlice
