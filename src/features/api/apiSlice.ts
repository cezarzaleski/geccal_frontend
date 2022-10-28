import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { envVars } from '../../envVars';

export const baseUrl = envVars.BASE_URL

export const apiSlice = createApi({
  reducerPath: '',
  tagTypes: ['Publishers', 'Books'],
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: (builder) => ({})
})
