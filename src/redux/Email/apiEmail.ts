import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";

export const ApiEmail = createApi({
  reducerPath: "apiEmail",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    sendEmail: builder.mutation({
      query: (data) => ({
        url: "/email",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSendEmailMutation } = ApiEmail;
