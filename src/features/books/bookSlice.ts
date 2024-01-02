import { apiSlice } from '../../features/api/apiSlice';
import { BooksParams, Results } from '../../types/book';

export interface Book {
  id: string;
  name: string;
  active: boolean;
  edition?: string;
  exemplary?: number;
  origin?: string;
  year?: number;
  publisher?: string;
  authors?: string[];
  deletedAt?: string;
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

function deleteBookMutation(book: Book) {
  return {
    url: `${endpointUrl}/${book.id}`,
    method: 'DELETE'
  }
}

function getBook({id}: { id: string }) {
  return `${endpointUrl}/${id}`
}

function createBookMutation(book: Book) {
  return {
    url: `${endpointUrl}`,
    body: book,
    method: 'POST'
  }
}

function updateBookMutation(book: Book) {
  return {
    url: `${endpointUrl}/${book.id}`,
    body: book,
    method: 'PUT'
  }
}

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: ({query, mutation}) => ({
    getBooks: query<Results, BooksParams>({
      query: getBooks,
      providesTags: ['Books']
    }),
    getBook: query<any, {id: string}>({
      query: getBook,
      providesTags: ['Books']
    }),
    deleteBook: mutation<any, {id: string}>({
      query: deleteBookMutation,
      invalidatesTags: ['Books']
    }),
    createBook: mutation<any, Book>({
      query: createBookMutation,
      invalidatesTags: ['Books']
    }),
    updateBook: mutation<any, Book>({
      query: updateBookMutation,
      invalidatesTags: ['Books']
    })
  })
})

export const  {
  useGetBooksQuery,
  useDeleteBookMutation,
  useCreateBookMutation,
  useUpdateBookMutation,
  useGetBookQuery
} = booksApiSlice
