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
  }),
});

export const { useGetDeliveryQuery, usePostDeliveryMutation } = ApiDelivery;
