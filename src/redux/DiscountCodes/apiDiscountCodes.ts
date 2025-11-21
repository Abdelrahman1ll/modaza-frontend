import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";

export const ApiDiscountCodes = createApi({
  reducerPath: "apiDiscountCodes",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    GetDiscountCodes: builder.query({
      query: () => ({
        url: "/discount-codes",
        method: "GET",
      }),
    }),
    PostValidateDiscountCode: builder.mutation({
      query: (data) => ({
        url: "/discount-codes/user",
        method: "POST",
        body: data,
      }),
    }),
    PostDiscountCodes: builder.mutation({
      query: (data) => ({
        url: "/discount-codes",
        method: "POST",
        body: data,
      }),
    }),
    PatchDiscountCodes: builder.mutation({
      query: ({ data, id }) => ({
        url: `/discount-codes/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    DeleteDiscountCodes: builder.mutation({
      query: (id) => ({
        url: `/discount-codes/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetDiscountCodesQuery,
  usePostDiscountCodesMutation,
  usePatchDiscountCodesMutation,
  useDeleteDiscountCodesMutation,
  usePostValidateDiscountCodeMutation,
} = ApiDiscountCodes;
