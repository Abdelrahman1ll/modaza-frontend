import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";

export const ApiEmailOrderDispatcher = createApi({
  reducerPath: "apiEmailOrderDispatcher",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    PostEmailOrderDispatcher: builder.mutation({
      query: (data) => ({
        url: "/email-order-dispatcher",
        method: "POST",
        body: data,
      }),
    }),
    GetEmailOrderDispatcher: builder.query({
      query: () => ({
        url: "/email-order-dispatcher",
        method: "GET",
      }),
    }),
    PatchEmailOrderDispatcher: builder.mutation({
      query: ({ data, id }) => ({
        url: `/email-order-dispatcher/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    DeleteEmailOrderDispatcher: builder.mutation({
      query: (id) => ({
        url: `/email-order-dispatcher/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  usePostEmailOrderDispatcherMutation,
  useGetEmailOrderDispatcherQuery,
  usePatchEmailOrderDispatcherMutation,
  useDeleteEmailOrderDispatcherMutation,
} = ApiEmailOrderDispatcher;
