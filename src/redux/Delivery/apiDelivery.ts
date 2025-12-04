import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";

export const ApiDelivery = createApi({
  reducerPath: "apiDelivery",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDelivery: builder.query({
      query: () => "/delivery",
    }),
    postDelivery: builder.mutation({
      query: (data) => ({
        url: "/delivery",
        method: "POST",
        body: data,
      }),
    }),
    postFreeDelivery: builder.mutation({
      query: () => ({
        url: "/delivery/free-delivery",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetDeliveryQuery,
  usePostDeliveryMutation,
  usePostFreeDeliveryMutation,
} = ApiDelivery;
