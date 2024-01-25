import {
	Action,
	PreloadedState,
	ThunkAction,
	combineReducers,
	configureStore,
} from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import { authorApiSlice } from "../features/authors/authorSlice";
import { evangelizandosApiSlice } from "../features/evangelizando/evangelizandoSlice";
import { publishersApiSlice } from "../features/publishers/publisherSlice";

const rootReducer = combineReducers({
	[apiSlice.reducerPath]: apiSlice.reducer,
	[publishersApiSlice.reducerPath]: publishersApiSlice.reducer,
	[authorApiSlice.reducerPath]: authorApiSlice.reducer,
	[evangelizandosApiSlice.reducerPath]: evangelizandosApiSlice.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		preloadedState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(apiSlice.middleware),
	});
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
