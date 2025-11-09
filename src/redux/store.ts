import { configureStore } from "@reduxjs/toolkit";
import { ApiUsers } from "../redux/users/apiUsers";
import { ApiProducts } from "./products/apiProducts";
export const store = configureStore({
  reducer: {
    [ApiUsers.reducerPath]: ApiUsers.reducer,
    [ApiProducts.reducerPath]: ApiProducts.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiUsers.middleware, ApiProducts.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
