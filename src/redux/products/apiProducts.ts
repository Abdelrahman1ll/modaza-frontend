import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";
export const ApiProducts = createApi({
  reducerPath: "apiProducts",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    GetProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),
    GetProductId: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductIdQuery } = ApiProducts;
