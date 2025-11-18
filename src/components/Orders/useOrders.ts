import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import {
  useGetOwnerOrdersQuery,
  useGetAdminOrdersQuery,
  useGetUserOrdersQuery,
} from "../../redux/Orders/apiOrders";
import { toast } from "react-toastify";
export default function useOrders() {
  function formatEndDateArabic(dateString: string) {
    const date = new Date(dateString);

    return (
      date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }) +
      " " +
      date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  const encryptedUser = Cookies.get("user");

  let role = "";
  if (encryptedUser) {
    try {
      const decryptedUser = CryptoJS.AES.decrypt(
        encryptedUser,
        secretKey
      ).toString(CryptoJS.enc.Utf8);

      const user = JSON.parse(decryptedUser);
      role = user.user.role;
    } catch {
      toast.error("Invalid user data");
    }
  }

  // استدعاء كل الـ hooks — لازم يكون برا الشروط
  const { data: ownerOrders, isLoading: isOwnerOrdersLoading } =
    useGetOwnerOrdersQuery({}, { skip: role !== "owner" });
  const { data: userOrders, isLoading: isUserOrdersLoading } =
    useGetUserOrdersQuery({}, { skip: role !== "user" });
  const { data: adminOrders, isLoading: isAdminOrdersLoading } =
    useGetAdminOrdersQuery({}, { skip: role !== "admin" });

  // تحديد الـ orders بناء على الـ role
  let orders: any[] = [];
  let isLoading: boolean = false;
  if (role === "owner") {
    orders = ownerOrders?.orders || [];
    isLoading = isOwnerOrdersLoading;
  } else if (role === "user") {
    orders = userOrders?.orders || [];
    isLoading = isUserOrdersLoading;
  } else if (role === "admin") {
    orders = adminOrders?.orders || [];
    isLoading = isAdminOrdersLoading;
  } else if (encryptedUser) {
    toast.error("You are not authorized to view this page.");
  }
  return { orders, isLoading, formatEndDateArabic };
}
