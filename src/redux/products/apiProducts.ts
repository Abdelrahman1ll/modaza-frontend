import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";
export const ApiProducts = createApi({
  reducerPath: "apiProducts",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    GetProducts: builder.query({
      query: (name) => ({
        url: "/products",
        method: "GET",
        params: { name },
      }),
    }),
    GetProductId: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
    PostProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),
    }),
    PatchProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductIdQuery,
  usePostProductMutation,
  usePatchProductMutation,
} = ApiProducts;
