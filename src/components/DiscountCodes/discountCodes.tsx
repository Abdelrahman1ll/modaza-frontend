import { motion } from "framer-motion";
import type { DiscountCodeType } from "../../types/DiscountCodeType";
import useDiscountCodes from "./useDiscountCodes";

export default function DiscountCodes() {
  const {
    data,
    isLoading,
    isAdding,
    isEditing,
    isDeleting,
    newCode,
    newDiscount,
    newExpiry,
    handleAddOrSave,
    handleEdit,
    handleDelete,
    reviewFormRef,
    editingId,
    setNewCode,
    setNewDiscount,
    setNewExpiry,
    formatEndDateArabic,
  } = useDiscountCodes();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen mt-16 px-4 mb-20">
      {/* فورم الإضافة/التعديل */}
      <motion.div
        ref={reviewFormRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl shadow-xl p-8 w-full max-w-[700px] mb-8 bg-(--color-cornsilk)"
      >
        <h2 className="text-2xl font-bold text-(--color-dark) mb-8 text-center">
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
          disabled={isAdding || isEditing || isDeleting}
          className="w-full py-3 rounded-full font-semibold bg-(--color-tiger) hover:bg-(--color-earth) text-white shadow-md transition-all"
        >
          {editingId ? "Save Changes" : "Add Discount Code"}
        </motion.button>
      </motion.div>

      {/* عرض الأكواد */}
      <div className="w-full max-w-[700px] flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-(--color-cornsilk) rounded-3xl shadow-xl p-6 flex flex-col gap-4 w-full animate-pulse"
            >
              <div className="flex justify-between items-center">
                <div className="h-6 w-32 bg-gray-300 rounded"></div>
                <div className="h-4 w-20 bg-gray-300 rounded"></div>
              </div>

              <div className="h-5 w-24 bg-gray-300 rounded"></div>

              <div className="h-4 w-40 bg-gray-300 rounded"></div>

              <div className="flex justify-between gap-4 mt-4">
                <div className="h-4 w-12 bg-gray-300 rounded"></div>
                <div className="h-4 w-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))
        ) : data?.discountCodes.length === 0 ? (
          <p className="text-gray-500 text-center">No discount codes yet.</p>
        ) : (
          data?.discountCodes.map((item: DiscountCodeType) => (
            <div
              key={item?.id}
              className="bg-(--color-cornsilk) rounded-3xl shadow-xl p-6 flex flex-col gap-2 w-full"
            >
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-(--color-dark)">
                  {item?.code}
                </p>

                {item?.createdAt && (
                  <p className="text-gray-500 text-sm text-right">
                    {formatEndDateArabic(item?.createdAt)}
                  </p>
                )}
              </div>
              <p className="text-lg text-(--color-tiger) font-semibold">
                {item?.discount}% Off
              </p>
              <p className="text-gray-600 font-medium">
                Expiry Date:{" "}
                <span className="font-bold">
                  {formatEndDateArabic(item?.EndDate)}
                </span>
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
