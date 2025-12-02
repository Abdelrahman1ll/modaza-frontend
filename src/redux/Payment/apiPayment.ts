import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    PostPayment: builder.mutation({
      query: (data) => ({
        url: "/payment/init-payment",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { usePostPaymentMutation } = paymentApi;
