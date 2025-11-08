import { configureStore } from "@reduxjs/toolkit";
import { apiUsers } from "../redux/users/apiUsers";
export const store = configureStore({
  reducer: {
    [apiUsers.reducerPath]: apiUsers.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiUsers.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
