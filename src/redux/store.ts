// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { apiUsers } from "../redux/users/apiUsers";
import { apiRefresh } from "./auth/apiRefresh";
export const store = configureStore({
  reducer: {
    [apiUsers.reducerPath]: apiUsers.reducer,
    [apiRefresh.reducerPath]: apiRefresh.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiUsers.middleware, apiRefresh.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
