import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

type ProtectedRouteProps = {
  children: React.ReactNode;
  roles: ("owner" | "admin")[];
};

export default function ProtectedRoute({
  children,
  roles,
}: ProtectedRouteProps) {
  const { user, initializing } = useContext(AuthContext);
  const location = useLocation();

  // إذا لسه بيتم التهيئة (قراءة الكوكي) فلا نفعل أي توجيه حتى النهاية
  if (initializing) {
    return null; // أو مكون Loading إذا تحب
  }

  // إذا ما فيه مستخدم بعد التهيئة
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // إذا دور المستخدم غير من الأدوار المصرّح بها
  if (!roles.includes(user.role as "owner" | "admin")) {
    return <Navigate to="/" replace />;
  }

  // كل الشروط مقبولة، عرض الأطفال
  return <>{children}</>;
}
