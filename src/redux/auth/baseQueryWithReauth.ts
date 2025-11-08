import { toast } from "react-toastify";
import {
  fetchBaseQuery,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import URL from "../../api/baseUrl";

const secretKey = import.meta.env.VITE_SECRET_KEY;

const baseQuery = fetchBaseQuery({
  baseUrl: URL,
  prepareHeaders: (headers) => {
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
      } catch (error) {
        console.error("Error decrypting user:", error);
        toast.error("Error decrypting user");
      }
    }

    return headers;
  },
});

export const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error as FetchBaseQueryError).status === 401) {
    const encryptedUser = Cookies.get("user");
    if (!encryptedUser) return result;
    const decryptedUser = CryptoJS.AES.decrypt(
      encryptedUser,
      secretKey
    ).toString(CryptoJS.enc.Utf8);

    const user = JSON.parse(decryptedUser);
    const refreshToken = user.refreshToken;

    if (!refreshToken) return result;
    if (refreshToken) {
      try {
        const refreshResponse: any = await baseQuery(
          {
            url: "/auth/refresh",
            method: "POST",
            body: { refreshToken: refreshToken },
          },
          api,
          extraOptions
        );
        if (refreshResponse) {
          const newAccessToken = refreshResponse.data.accessToken;
          const encryptedUser = Cookies.get("user");
          if (encryptedUser) {
            const decryptedUser = CryptoJS.AES.decrypt(
              encryptedUser,
              secretKey
            ).toString(CryptoJS.enc.Utf8);
            if (decryptedUser) {
              const user = JSON.parse(decryptedUser);
              user.accessToken = newAccessToken;
              const encryptedUser = CryptoJS.AES.encrypt(
                JSON.stringify(user),
                secretKey
              ).toString();
              Cookies.set("user", encryptedUser, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
                secure: import.meta.env.VITE_NODE_ENV === "production",
                sameSite: "strict",
                path: "/",
              });
            }
          }

          // إعادة تنفيذ الطلب الأصلي بعد تحديث التوكن
          result = await baseQuery(args, api, extraOptions);
        }
      } catch (error) {
        toast.error("Session expired. Please login again.");
        console.error(error);
      }
    }
  }

  return result;
};
