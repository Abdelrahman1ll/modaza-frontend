import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../auth/baseQueryWithReauth";
export const ApiUsers = createApi({
  reducerPath: "apiUsers",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    UsersCheckEmail: builder.mutation({
      query: (data: { email: string }) => ({
        url: "/users/check-email",
        method: "POST",
        body: data,
      }),
    }),

    PostUsers: builder.mutation({
      query: (data: { email: string; code: number }) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
    }),

    UsersSignupGoogle: builder.mutation({
      query: (data) => ({
        url: "/users/signup-google",
        method: "POST",
        body: data,
      }),
    }),

    GetUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),

    PatchUsersById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    PatchUsersOwnerById: builder.mutation({
      query: ({ data, id }) => ({
        url: `/users/owner/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  usePatchUsersByIdMutation,
  usePatchUsersOwnerByIdMutation,
  usePostUsersMutation,
  useUsersCheckEmailMutation,
  useUsersSignupGoogleMutation,
} = ApiUsers;
