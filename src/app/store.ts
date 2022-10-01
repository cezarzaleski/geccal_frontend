import { Action, combineReducers, configureStore, PreloadedState, ThunkAction } from '@reduxjs/toolkit';
import publishersReducer, { publishersApiSlice } from '../features/publishers/publisherSlice';
import { apiSlice } from '../features/api/apiSlice';


const rootReducer = combineReducers({
  publishers: publishersReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
  [publishersApiSlice.reducerPath]: publishersApiSlice.reducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
  })
}

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  RootState,
  unknown,
  Action<string>>;
