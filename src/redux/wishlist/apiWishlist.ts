import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";

export const ApiWishlist = createApi({
  reducerPath: "apiWishlist",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    GetWishlist: builder.query({
      query: () => ({
        url: "/wishlist/user",
        method: "GET",
      }),
    }),
    PostWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist",
        method: "POST",
        body: data,
      }),
    }),
    DeleteWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
    }),
    GetOwnerWishlist: builder.query({
      query: () => ({
        url: "/wishlist/owner",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetWishlistQuery,
  usePostWishlistMutation,
  useDeleteWishlistMutation,
  useGetOwnerWishlistQuery,
} = ApiWishlist;
