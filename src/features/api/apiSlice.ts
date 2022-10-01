import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseUrl = 'http://localhost:3001'

export const apiSlice = createApi({
  reducerPath: '',
  tagTypes: ['Publishers', 'Books'],
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({})
})
