import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import URL from "../../api/baseUrl";

export const apiRefresh = createApi({
  reducerPath: "apiRefresh",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
  }),
  endpoints: (builder) => ({
    Refresh: builder.mutation({
      query: (data) => ({
        url: "/auth/refresh",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useRefreshMutation } = apiRefresh;
