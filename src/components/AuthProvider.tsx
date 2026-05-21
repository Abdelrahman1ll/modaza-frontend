import { useState, useEffect, type ReactNode } from "react";
import Cookies from "js-cookie";
import type { UserType } from "../types/UserType";
import {
  AuthContext,
  type AuthData,
  type SetUserPayload,
} from "../context/AuthContext";
import { getMockUser } from "../mock-data/staticData";


/**
 * AuthProvider component that wraps the application and provides the auth state.
 * مكون مزود المصادقة الذي يحيط بالتطبيق ويوفر حالة المصادقة.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, _setUser] = useState<UserType | null>(null);
  const [initializing, setInitializing] = useState(true);

  // SECURITY NOTE: We removed the CryptoJS "encryption" because VITE_SECRET_KEY is
  // bundled into the production static files and is publicly accessible.
  // Using it for encryption on the frontend provides a false sense of security.
  // RECOMMENDATION: Move token storage to httpOnly cookies set by the backend.

  /**
   * Sets the user state and persists it to an encrypted cookie.
   * It handles full login responses (user + tokens) and partial user profile updates.
   * وظيفة تحديث بيانات المستخدم وتخزينها مشفرة في الكوكيز.
   * تتعامل مع استجابة تسجيل الدخول الكاملة وتحديثات الملف الشخصي الجزئية.
   */
  const setUser = (data: SetUserPayload) => {
    if (!data) {
      _setUser(null);
      Cookies.remove("user");
      return;
    }

    // Check if it's a full auth response or just a user object
    // التحقق مما إذا كانت هذه استجابة كاملة للمصادقة أم مجرد بيانات مستخدم
    const isFullResponse = !!(
      data &&
      typeof data === "object" &&
      "accessToken" in data &&
      "user" in data
    );
    const userData = isFullResponse
      ? (data as AuthData).user
      : (data as UserType);

    _setUser(userData);

    // Prepare cookie data
    // تجهيز البيانات لحفظها في الكوكيز
    let cookieData: SetUserPayload;
    if (isFullResponse) {
      cookieData = data;
    } else {
      // If updating user only, merge with existing cookie to preserve tokens
      // في حالة تحديث بيانات المستخدم فقط، نقوم بدمجها مع البيانات الحالية للحفاظ على التوكنز
      const rawUser = Cookies.get("user");
      if (rawUser) {
        try {
          const existing = JSON.parse(rawUser);
          cookieData = { ...existing, user: userData };
        } catch {
          cookieData = { user: userData };
        }
      } else {
        cookieData = { user: userData };
      }
    }

    // Securely save to cookies
    // Note: HttpOnly cannot be set from JS, but we use SameSite=Strict and Secure for some protection.
    Cookies.set("user", JSON.stringify(cookieData), {
      expires: 90,
      secure: import.meta.env.VITE_NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  };

  /**
   * Clears the user state and removes authentication cookies.
   * وظيفة تسجيل الخروج، تقوم بمسح حالة المستخدم وحذف الكوكيز وتفريغ التخزين المحلي.
   */
  const logout = () => {
    _setUser(null);
    Cookies.remove("user");
    localStorage.clear();
  };

  /**
   * Effect hook to initialize the auth state from cookies on application load.
   */
  useEffect(() => {
    const rawUser = Cookies.get("user");
    if (rawUser) {
      try {
        const parsed = JSON.parse(rawUser);
        if (parsed?.user) {
          _setUser(parsed.user);
        } else if (parsed?.role) {
          _setUser(parsed);
        } else {
          _setUser(null);
        }
      } catch (error) {
        console.error("Failed to parse auth cookie:", error);
        _setUser(null);
      }
    } else {
      /* 
         Original Code: _setUser(null);
         English: This code was originally here; we replaced it with a mock data function 
         to allow the site to run without a backend server (e.g., on GitHub Pages).
         Arabic: هذا الكود كان موجوداً في الأصل؛ قمنا باستبداله بوظيفة بيانات وهمية (Mock) 
         للسماح للموقع بالعمل بدون سيرفر خلفي (مثلاً على GitHub Pages).
      */
     
      // _setUser(null); 

      // --- Static Mock User (for GitHub Pages / No Backend) ---
      if (import.meta.env.PROD || !import.meta.env.VITE_APP_API_URL) {
        _setUser(getMockUser());
      } else {
        _setUser(null);
      }
    }



    setInitializing(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}
