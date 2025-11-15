import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";

export const ApiCart = createApi({
  reducerPath: "apiCart",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/carts",
    }),
    getOwnerCart: builder.query({
      query: () => "/carts/owner",
    }),
    postCart: builder.mutation({
      query: (data) => ({
        url: "/carts",
        method: "POST",
        body: data,
      }),
    }),
    patchCart: builder.mutation({
      query: ({ data, id }) => ({
        url: `/carts/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCart: builder.mutation({
      query: (id) => ({
        url: `/carts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});


export const {
  useGetCartQuery,
  useGetOwnerCartQuery,
  usePostCartMutation,
  usePatchCartMutation,
  useDeleteCartMutation,
} = ApiCart;
