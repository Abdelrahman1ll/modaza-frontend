import { useRef, useState } from "react";
import {
  usePostEmailOrderDispatcherMutation,
  useGetEmailOrderDispatcherQuery,
  usePatchEmailOrderDispatcherMutation,
  useDeleteEmailOrderDispatcherMutation,
} from "../../redux/EmailOrderDispatcher/apiEmailOrderDispatcher";
import { toast } from "react-toastify";
import { formatEndDateArabic } from "../../utils/formatters";
import type { OrderEmail } from "../../types/OrderEmailType";
import { validateEmail } from "../../utils/validators";

export default function useEmailOrderDispatcher() {
  const reviewFormRef = useRef<HTMLDivElement>(null);
  const [postEmailOrderDispatcher] = usePostEmailOrderDispatcherMutation();
  const {
    data,
    isLoading: isLoading,
    refetch,
  } = useGetEmailOrderDispatcherQuery({});
  const [patchEmailOrderDispatcher] = usePatchEmailOrderDispatcherMutation();
  const [deleteEmailOrderDispatcher] = useDeleteEmailOrderDispatcherMutation();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });


  const handleSendEmail = async () => {
    setErrors({
      name: "",
      email: "",
    });


    // ===== VALIDATE NAME =====
    if (!customerName || customerName.trim() === "") {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      return;
    }

    // ===== VALIDATE EMAIL =====
    if (!customerEmail || customerEmail.trim() === "") {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }

    if (!validateEmail(customerEmail)) {
      setErrors((prev) => ({ ...prev, email: "Email is not valid" }));
      return;
    }

    try {
      await postEmailOrderDispatcher({
        name: customerName,
        email: customerEmail,
      }).unwrap();
      toast.success("Email sent successfully");
      refetch();
    } catch {
      toast.error("Error checking email");
    }
    setCustomerName("");
    setCustomerEmail("");
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteEmailOrderDispatcher(id).unwrap();
      toast.success("Order deleted successfully");
      refetch();
    } catch {
      toast.error("Error deleting order");
    }
  };

  const handleEdit = (order: OrderEmail) => {
    setEditingId(order.id);
    setCustomerName(order.name);
    setCustomerEmail(order.email);
    reviewFormRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSaveEdit = async () => {
    if (editingId) {
      await patchEmailOrderDispatcher({
        id: editingId,
        data: {
          name: customerName,
          email: customerEmail,
        },
      })
        .unwrap()
        .then(() => {
          toast.success("Order updated successfully");
          refetch();
        })
        .catch(() => {
          toast.error("Error updating order");
        });
    }
    setEditingId(null);
    setCustomerName("");
    setCustomerEmail("");
  };

  return {
    data,
    isLoading,
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    errors,
    handleSendEmail,
    handleDelete,
    handleEdit,
    handleSaveEdit,
    reviewFormRef,
    formatEndDateArabic,
    editingId,
  };
}
