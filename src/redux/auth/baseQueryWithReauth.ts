import { toast } from "react-toastify";
import {
  fetchBaseQuery,
  type FetchArgs,
  type FetchBaseQueryError,
  type BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import URL from "../../api/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const rawUser = Cookies.get("user");
    if (rawUser) {
      try {
        const user = JSON.parse(rawUser);
        if (user.accessToken) {
          headers.set("Authorization", `Bearer ${user.accessToken}`);
        }
      } catch {
        // Silently fail or log error
      }
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    const rawUser = Cookies.get("user");
    if (!rawUser) return result;

    try {
      const user = JSON.parse(rawUser);
      const refreshToken = user.refreshToken;

      if (!refreshToken) return result;

      const refreshResponse = (await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken: refreshToken },
        },
        api,
        extraOptions
      )) as { data: { accessToken: string } };

      if (refreshResponse?.data?.accessToken) {
        const newAccessToken = refreshResponse.data.accessToken;
        
        // Update the user object in the cookie with the new access token
        const updatedUser = { ...user, accessToken: newAccessToken };
        
        Cookies.set("user", JSON.stringify(updatedUser), {
          expires: 90,
          secure: import.meta.env.VITE_NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });

        // Retry the original request
        result = await baseQuery(args, api, extraOptions);
      }
    } catch (error) {
      toast.error("Session expired. Please login again.");
      // Optional: Redirect to login or logout
    }
  }

  return result;
};
