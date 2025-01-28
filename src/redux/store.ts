import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import globalSlice from "./slice/global";

// Define the root reducer
const rootReducer = combineReducers({
  global: globalSlice,
});

// Define the state type from rootReducer
export type AppState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<AppState> = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer<AppState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

// Infer the AppDispatch type from the store
export type AppDispatch = typeof store.dispatch;

// Infer the RootState type from the store
export type RootState = ReturnType<typeof store.getState>;
