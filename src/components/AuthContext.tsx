import { createContext, useState, useEffect, type ReactNode } from "react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

export const AuthContext = createContext({ user: null });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const secretKey = import.meta.env.VITE_SECRET_KEY;
    const encryptedUser = Cookies.get("user");
    let parsedUser: any = null;
    if (encryptedUser) {
      try {
        const decryptedUser = CryptoJS.AES.decrypt(
          encryptedUser,
          secretKey
        ).toString(CryptoJS.enc.Utf8);

        parsedUser = JSON.parse(decryptedUser);

        setUser(parsedUser?.user?.role);
      } catch {
        setUser(null);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
