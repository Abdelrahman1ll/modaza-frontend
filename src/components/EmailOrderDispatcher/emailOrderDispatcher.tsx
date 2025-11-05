import { useState } from "react";

interface Order {
  id: number;
  name: string;
  email: string;
}

export default function EmailOrderDispatcher() {
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSendEmail = () => {
    if (!customerName || !customerEmail) {
      setError("يرجى ملء جميع الحقول.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    const newOrder: Order = {
      id: Date.now(),
      name: customerName,
      email: customerEmail,
    };

    setOrders([...orders, newOrder]);
    setCustomerName("");
    setCustomerEmail("");
    setSuccess(true);
    setLoading(false);
  };

  const handleDelete = (id: number) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  const handleEdit = (order: Order) => {
    setEditingId(order.id);
    setCustomerName(order.name);
    setCustomerEmail(order.email);
  };

  const handleSaveEdit = () => {
    if (editingId === null) return;

    setOrders(
      orders.map((o) =>
        o.id === editingId
          ? { ...o, name: customerName, email: customerEmail }
          : o
      )
    );
    setEditingId(null);
    setCustomerName("");
    setCustomerEmail("");
  };

  return (
    <div className="mt-16 flex flex-col items-center justify-center  p-4">
      <div className="p-4 max-w-md w-full border border-(--color-tiger) rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-(--color-dark) mb-6 text-center">
          Send Order to Delivery
        </h2>

        <input
          type="text"
          placeholder="Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full p-3 mb-3 border border-(--color-tiger) rounded-full text-center focus:ring-1 focus:ring-(--color-tiger) outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={customerEmail}
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="w-full p-3 mb-3 border border-(--color-tiger) rounded-full text-center focus:ring-1 focus:ring-(--color-tiger) outline-none"
        />

        {editingId ? (
          <button
            onClick={handleSaveEdit}
            className="w-full py-3 rounded-full font-semibold bg-(--color-tiger) hover:bg-(--color-earth) text-white shadow-md transition-all mb-3"
          >
            Save Edit
          </button>
        ) : (
          <button
            onClick={handleSendEmail}
            disabled={loading}
            className="w-full py-3 rounded-full font-semibold bg-(--color-tiger) hover:bg-(--color-earth) text-white shadow-md transition-all mb-3"
          >
            {loading ? "Sending..." : "Add Order"}
          </button>
        )}

        {success && (
          <p className="text-green-600 mt-2 text-center font-semibold">
            تم إضافة الطلب!
          </p>
        )}
        {error && (
          <p className="text-red-600 mt-2 text-center font-semibold">{error}</p>
        )}
      </div>

      <div className="mt-6 w-full max-w-md flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="p-4 border border-(--color-tiger) rounded-2xl shadow-md bg-(--color-cornsilk)"
          >
            <p className="font-bold text-(--color-dark)">Name: {order.name}</p>
            <p className="text-(--color-tiger)">Email: {order.email}</p>
            <div className="flex justify-between gap-3 mt-2">
              <button
                onClick={() => handleEdit(order)}
                className="text-(--color-tiger) font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(order.id)}
                className="text-red-600 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
