import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import {
  useGetOwnerOrdersQuery,
  useGetAdminOrdersQuery,
  useGetUserOrdersQuery,
} from "../../redux/Orders/apiOrders";
import { toast } from "react-toastify";
import type { OrderType } from "../../types/OrderType";
import { useParams } from "react-router-dom";
import { CheckCircle2, Package, Truck } from "lucide-react";

type StepKey = "isConfirmed" | "isShipped" | "isDelivered";

type SpecialStep = {
  label: string;
  icon: React.ComponentType<any>;
  key: StepKey;
  color: string;
  active?: boolean;
};
export default function useOrderDetails() {
  const { id } = useParams<{ id: string }>();
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
  const { data: ownerOrders, refetch: refetchOwnerOrders } =
    useGetOwnerOrdersQuery({}, { skip: role !== "owner" });
  const { data: userOrders, refetch: refetchUserOrders } =
    useGetUserOrdersQuery({}, { skip: role !== "user" });
  const { data: adminOrders, refetch: refetchAdminOrders } =
    useGetAdminOrdersQuery({}, { skip: role !== "admin" });

  // تحديد الـ orders بناء على الـ role
  let orders: OrderType[] = [];
  let refetchOrders: () => void = () => {};

  if (role === "owner") {
    orders = ownerOrders?.orders || [];
    refetchOrders = refetchOwnerOrders;
  } else if (role === "user") {
    orders = userOrders?.orders || [];
    refetchOrders = refetchUserOrders;
  } else if (role === "admin") {
    orders = adminOrders?.orders || [];
    refetchOrders = refetchAdminOrders;
  } else if (encryptedUser) {
    toast.error("You are not authorized to view this page.");
  }

  const order = orders.find((order) => order?.id === Number(id));

  const specialSteps: SpecialStep[] = [
    {
      label: "Confirmed",
      icon: CheckCircle2,
      key: "isConfirmed",
      color: "#2196F3",
      active: order?.isConfirmed,
    },
    {
      label: "Shipped",
      icon: Package,
      key: "isShipped",
      color: "#FF9800",
      active: order?.isShipped,
    },
    {
      label: "Delivered",
      icon: Truck,
      key: "isDelivered",
      color: "#16a34a",
      active: order?.isDelivered,
    },
  ];

  // Get LAST active step
  const lastActiveIndex = [...specialSteps]
    .reverse()
    .findIndex((step: SpecialStep) => order?.[step.key] === true);

  const actualIndex =
    lastActiveIndex === -1 ? -1 : specialSteps.length - 1 - lastActiveIndex;

  return {
    order,
    specialSteps,
    actualIndex,
    formatEndDateArabic,
    refetchOrders,
    role,
  };
}
