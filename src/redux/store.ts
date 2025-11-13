import { configureStore } from "@reduxjs/toolkit";
import { ApiUsers } from "../redux/users/apiUsers";
import { ApiProducts } from "./products/apiProducts";
import { ApiReviews } from "./reviews/apiReviews";
export const store = configureStore({
  reducer: {
    [ApiUsers.reducerPath]: ApiUsers.reducer,
    [ApiProducts.reducerPath]: ApiProducts.reducer,
    [ApiReviews.reducerPath]: ApiReviews.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ApiUsers.middleware,
      ApiProducts.middleware,
      ApiReviews.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
