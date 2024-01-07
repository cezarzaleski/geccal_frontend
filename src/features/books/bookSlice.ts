import { apiSlice } from '../../features/api/apiSlice';
import { Paginator } from '../../types/paginator';
import { Book } from './book';

const endpointUrl = '/books'
function parseQueryParams(params: Paginator.Params) {
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

function deleteBookMutation(book: Book.Entity) {
  return {
    url: `${endpointUrl}/${book.id}`,
    method: 'DELETE'
  }
}

function getBook({id}: { id: string }) {
  return `${endpointUrl}/${id}`
}

function createBookMutation(book: Book.New) {
  return {
    url: `${endpointUrl}`,
    body: book,
    method: 'POST'
  }
}

function updateBookMutation(book: Book.Entity) {
  return {
    url: `${endpointUrl}/${book.id}`,
    body: book,
    method: 'PUT'
  }
}

export const booksApiSlice = apiSlice.injectEndpoints({
  endpoints: ({query, mutation}) => ({
    getBooks: query<Paginator.Response<Book.Entity>, Paginator.Params>({
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
    createBook: mutation<any, Book.New>({
      query: createBookMutation,
      invalidatesTags: ['Books']
    }),
    updateBook: mutation<any, Book.Entity>({
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
