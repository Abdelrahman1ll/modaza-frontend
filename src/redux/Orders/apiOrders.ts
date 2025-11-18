import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";

export const ApiOrders = createApi({
  reducerPath: "apiOrders",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    postOrders: builder.mutation({
      query: (data) => ({
        url: "/orders",
        method: "POST",
        body: data,
      }),
    }),
    getOwnerOrders: builder.query({
      query: () => ({
        url: "/orders/owner",
        method: "GET",
      }),
    }),
    getDashboardOrders: builder.query({
      query: () => ({
        url: "/orders/dashboard",
        method: "GET",
      }),
    }),
    getAdminOrders: builder.query({
      query: () => ({
        url: "/orders/admin",
        method: "GET",
      }),
    }),
    getUserOrders: builder.query({
      query: () => ({
        url: "/orders/user",
        method: "GET",
      }),
    }),
    patchIsPaidOrders: builder.mutation({
      query: (id) => ({
        url: `/orders/isPaid/${id}`,
        method: "PATCH",
      }),
    }),
    patchIsConfirmedOrders: builder.mutation({
      query: (id) => ({
        url: `/orders/isConfirmed/${id}`,
        method: "PATCH",
      }),
    }),
    patchIsShippedOrders: builder.mutation({
      query: (id) => ({
        url: `/orders/isShipped/${id}`,
        method: "PATCH",
      }),
    }),
    patchIsCanceledOrders: builder.mutation({
      query: (id) => ({
        url: `/orders/isCanceled/${id}`,
        method: "PATCH",
      }),
    }),
    patchIsDeliveredOrders: builder.mutation({
      query: (id) => ({
        url: `/orders/isDelivered/${id}`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  usePostOrdersMutation,
  useGetOwnerOrdersQuery,
  useGetDashboardOrdersQuery,
  useGetAdminOrdersQuery,
  useGetUserOrdersQuery,
  usePatchIsPaidOrdersMutation,
  usePatchIsConfirmedOrdersMutation,
  usePatchIsShippedOrdersMutation,
  usePatchIsCanceledOrdersMutation,
  usePatchIsDeliveredOrdersMutation,
} = ApiOrders;
