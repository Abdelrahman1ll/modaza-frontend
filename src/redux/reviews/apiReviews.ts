import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";

export const ApiReviews = createApi({
  reducerPath: "apiReviews",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    PostReviews: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
    }),
    GetReviews: builder.query({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "GET",
      }),
    }),
    PatchReviews: builder.mutation({
      query: ({ data, id }) => ({
        url: `/reviews/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    DeleteReviews: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  usePostReviewsMutation,
  useGetReviewsQuery,
  usePatchReviewsMutation,
  useDeleteReviewsMutation,
} = ApiReviews;
