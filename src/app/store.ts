import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import publishersReducer, { publishersApiSlice } from '../features/publishers/publisherSlice';
import { apiSlice } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    publishers: publishersReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [publishersApiSlice.reducerPath]: publishersApiSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
