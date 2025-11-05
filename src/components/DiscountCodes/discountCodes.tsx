import { useState } from "react";
import { motion } from "framer-motion";

interface DiscountCode {
  id: number;
  code: string;
  discount: number;
  expiryDate: string;
  updatedAt?: string;
}

export default function DiscountCodes() {
  const [codes, setCodes] = useState<DiscountCode[]>([]);
  const [newCode, setNewCode] = useState("");
  const [newDiscount, setNewDiscount] = useState("");
  const [newExpiry, setNewExpiry] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddOrSave = () => {
    if (!newCode || !newDiscount || !newExpiry) return;

    if (editingId) {
      // تعديل موجود
      setCodes(
        codes.map((item) =>
          item.id === editingId
            ? {
                ...item,
                code: newCode.toUpperCase(),
                discount: Number(newDiscount),
                expiryDate: newExpiry,
                updatedAt: new Date().toLocaleString(),
              }
            : item
        )
      );
      setEditingId(null);
    } else {
      // إضافة جديد
      const newEntry: DiscountCode = {
        id: Date.now(),
        code: newCode.toUpperCase(),
        discount: Number(newDiscount),
        expiryDate: newExpiry,
        updatedAt: new Date().toLocaleString(),
      };
      setCodes([...codes, newEntry]);
    }

    setNewCode("");
    setNewDiscount("");
    setNewExpiry("");
  };

  const handleEdit = (item: DiscountCode) => {
    setEditingId(item.id);
    setNewCode(item.code);
    setNewDiscount(item.discount.toString());
    setNewExpiry(item.expiryDate);
  };

  const handleDelete = (id: number) => {
    setCodes(codes.filter((item) => item.id !== id));
    if (editingId === id) setEditingId(null);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen mt-16 px-4 mb-20">
      {/* فورم الإضافة/التعديل */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl shadow-xl p-8 w-full max-w-[700px] mb-8 bg-(--color-cornsilk)"
      >
        <h2 className="text-2xl font-bold text-(--color-dark) mb-4 text-center">
          {editingId ? "Edit Discount Code" : "Add Discount Code"}
        </h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            placeholder="Code"
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            className="border border-(--color-tiger) rounded-full px-4 py-3 text-center focus:ring-1 focus:ring-(--color-tiger) outline-none"
          />
          <input
            type="number"
            placeholder="Discount %"
            value={newDiscount}
            onChange={(e) => setNewDiscount(e.target.value)}
            className="border border-(--color-tiger) rounded-full px-4 py-3 text-center focus:ring-1 focus:ring-(--color-tiger) outline-none"
          />
          <input
            type="date"
            value={newExpiry}
            onChange={(e) => setNewExpiry(e.target.value)}
            className="border border-(--color-tiger) rounded-full px-4 py-3 text-center focus:ring-1 focus:ring-(--color-tiger) outline-none"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddOrSave}
          className="w-full py-3 rounded-full font-semibold bg-(--color-tiger) hover:bg-(--color-earth) text-white shadow-md transition-all"
        >
          {editingId ? "Save Changes" : "Add Discount Code"}
        </motion.button>
      </motion.div>

      {/* عرض الأكواد */}
      <div className="w-full max-w-[700px] flex flex-col gap-4">
        {codes.length === 0 ? (
          <p className="text-gray-500 text-center">No discount codes yet.</p>
        ) : (
          codes.map((item) => (
            <div
              key={item.id}
              className="bg-(--color-cornsilk) rounded-3xl shadow-xl p-6 flex flex-col gap-2 w-full"
            >
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-(--color-dark)">
                  {item.code}
                </p>

                {item.updatedAt && (
                  <p className="text-gray-500 text-sm text-right">
                    {item.updatedAt.split(",")[1]?.trim() || item.updatedAt}
                  </p>
                )}
              </div>
              <p className="text-lg text-(--color-tiger) font-semibold">
                {item.discount}% Off
              </p>
              <p className="text-gray-600 font-medium">
                Expiry Date:{" "}
                <span className="font-bold">{item.expiryDate}</span>
              </p>

              <div className="flex justify-between gap-4 mt-4">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-(--color-tiger) hover:text-(--color-earth)"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
