import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import URL from "../../api/baseUrl";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
export const apiUsers = createApi({
  reducerPath: "apiUsers",
  baseQuery: fetchBaseQuery({
    baseUrl: URL,
    prepareHeaders: (headers) => {
      const secretKey = import.meta.env.VITE_SECRET_KEY;
      const encryptedUser = Cookies.get("user");
      if (encryptedUser) {
        try {
          const decryptedUser = CryptoJS.AES.decrypt(
            encryptedUser,
            secretKey
          ).toString(CryptoJS.enc.Utf8);
          if (decryptedUser) {
            const user = JSON.parse(decryptedUser);
            headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
        } catch {
          toast.error("Error decrypting user");
        }
      }

      return headers;
    },
  }),
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
} = apiUsers;
