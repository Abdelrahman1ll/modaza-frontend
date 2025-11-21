import { createContext, useState, useEffect, type ReactNode } from "react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import type { UserType } from "../types/UserType";

type AuthContextType = {
  user: UserType | null;
  setUser: (u: UserType | null) => void;
  logout: () => void;
  initializing: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
  initializing: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, _setUser] = useState<UserType | null>(null);
  const [initializing, setInitializing] = useState(true);

  const secretKey = import.meta.env.VITE_SECRET_KEY;

  const setUser = (u: UserType | null) => {
    _setUser(u);
    if (u) {
      const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify({ user: u }),
        secretKey
      ).toString();
      Cookies.set("user", encrypted, { secure: true, sameSite: "strict" });
    } else {
      Cookies.remove("user");
    }
  };

  const logout = () => {
    _setUser(null);
    Cookies.remove("user");
  };

  useEffect(() => {
    const encryptedUser = Cookies.get("user");
    if (encryptedUser) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUser, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        const parsed = JSON.parse(decrypted);
        if (parsed?.user) {
          _setUser(parsed.user);
        } else {
          _setUser(null);
        }
      } catch {
        _setUser(null);
      }
    } else {
      _setUser(null);
    }

    setInitializing(false);
  }, [secretKey]);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}
