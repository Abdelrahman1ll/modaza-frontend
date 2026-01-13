import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Palette } from "lucide-react";
import { SkeletonList } from "../Skeleton";
import {
  useGetColorsQuery,
  usePostColorMutation,
  usePatchColorMutation,
  useDeleteColorMutation,
} from "../../redux/color/apiColor";
import { toast } from "react-toastify";

interface ColorType {
  id: number;
  name: string;
  color: string;
}

/**
 * Color: Administrative interface for managing product color options.
 * الألوان: واجهة إدارية لإدارة خيارات ألوان المنتجات.
 */
export default function Color() {
  const { data: colors, isLoading, error, refetch } = useGetColorsQuery({});
  const [postColor] = usePostColorMutation();
  const [patchColor] = usePatchColorMutation();
  const [deleteColor] = useDeleteColorMutation();

  const colorInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [color, setColor] = useState("#000000");

  /* ===================== Submit ===================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !color) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      if (editId) {
        await patchColor({ id: editId, data: { name, color } }).unwrap();
      } else {
        await postColor({ name, color }).unwrap();
      }

      setName("");
      setEditId(null);
      setColor("#000000");
      refetch();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to save color");
    }
  };

  /* ===================== Edit ===================== */
  const handleEdit = (colorItem: ColorType) => {
    setName(colorItem.name);
    setEditId(colorItem.id);
    setColor(colorItem.color);
  };

  /* ===================== Delete ===================== */
  const handleDelete = async (id: number) => {
    try {
      await deleteColor(id).unwrap();
      refetch();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to delete color");
    }
  };

  /* ===================== Loading ===================== */
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-12 p-4">
        <SkeletonList count={5} />
      </div>
    );
  }

  /* ===================== Error ===================== */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Palette size={80} className="text-red-500 mb-4" />
        <p className="text-gray-500 text-lg">Failed to load colors</p>
      </div>
    );
  }

  /* ===================== UI ===================== */
  return (
    <div className="max-w-4xl mx-auto mt-12 p-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl font-bold">Colors</h1>
        <p className="text-gray-500 mt-1">Manage product colors</p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col sm:flex-row items-center gap-3 mb-8 bg-(--color-cornsilk) p-4 rounded-2xl shadow"
      >
        {/* حاوية الاسم + اللون للشاشات الصغيرة */}
        <div className="flex w-full gap-3 items-center">
          {/* اسم اللون */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Color name"
            className="flex-1 px-4 py-3 rounded-full border focus:outline-none focus:ring-1 focus:ring-(--color-tiger)"
          />

          {/* زر اختيار اللون */}
          <div>
            <button
              type="button"
              onClick={() => colorInputRef.current?.click()}
              className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:border-[--color-tiger] flex items-center justify-center cursor-pointer transition-all shadow-sm hover:shadow-md relative overflow-hidden group"
              style={{ backgroundColor: color }}
              title="Pick color"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
              <svg
                className="w-5 h-5 text-white drop-shadow-md"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </button>

            <input
              ref={colorInputRef}
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="absolute w-2 h-2 opacity-0"
            />
          </div>
        </div>

        {/* زر الإضافة أو التعديل */}
        <button
          type="submit"
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-(--color-tiger) text-white font-semibold hover:bg-(--color-tiger)/80 transition"
        >
          <Plus size={18} />
          {editId ? "Update" : "Add"}
        </button>
      </motion.form>

      {/* Empty State */}
      {colors?.colors?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Palette
            size={90}
            className="text-(--color-tiger) mb-6 animate-bounce"
          />
          <p className="text-gray-500 text-lg">No colors found</p>
        </div>
      )}

      {/* List */}
      <div className="grid gap-4">
        {colors?.colors?.map((colorItem: ColorType, index: number) => (
          <motion.div
            key={colorItem.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-(--color-cornsilk) shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: colorItem.color }}
              />
              <span className="text-lg font-medium text-[--color-dark]">
                {colorItem.name}
              </span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(colorItem)}
                className="p-2 rounded-full border hover:bg-gray-100 transition"
              >
                <Edit size={18} />
              </button>

              <button
                onClick={() => handleDelete(colorItem.id)}
                className="p-2 rounded-full border text-red-500 hover:bg-red-50 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
