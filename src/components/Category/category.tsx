import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, PackageSearch } from "lucide-react";
import {
  useGetCategoryQuery,
  usePostCategoryMutation,
  usePatchCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/category/apiCategory";
import { toast } from "react-toastify";

export default function Category() {
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useGetCategoryQuery({});
  const [postCategory] = usePostCategoryMutation();
  const [patchCategory] = usePatchCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      editId
        ? await patchCategory({ id: editId, data: { name } }).unwrap()
        : await postCategory({ name }).unwrap();

      setName("");
      setEditId(null);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add category");
    }
  };

  const handleEdit = (cat: any) => {
    setName(cat.name);
    setEditId(cat.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory(id).unwrap();
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  /* ===================== Loading Skeleton ===================== */
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-12 p-4 grid gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  /* ===================== Error ===================== */
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <PackageSearch size={80} className="text-red-500 mb-4" />
        <p className="text-gray-500 text-lg">Failed to load categories</p>
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
        <h1 className="text-3xl font-bold text-[--color-dark]">Categories</h1>
        <p className="text-gray-500 mt-1">Manage your product categories</p>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
    flex flex-col sm:flex-row
    gap-3 mb-8
    bg-(--color-cornsilk) p-4 rounded-2xl shadow
  "
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="
      w-full sm:flex-1
      px-4 py-3 rounded-full border
      focus:outline-none
      focus:ring-1 focus:ring-(--color-tiger)
    "
        />

        <button
          type="submit"
          className="
      w-full sm:w-auto
      flex items-center justify-center gap-2
      px-6 py-3 rounded-full
      bg-(--color-tiger) text-white font-semibold
      hover:bg-(--color-tiger)/80 transition
    "
        >
          <Plus size={18} />
          {editId ? "Update" : "Add"}
        </button>
      </motion.form>

      {/* Empty State */}
      {categories?.categories?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <PackageSearch
            size={90}
            className="text-(--color-tiger) mb-6 animate-bounce"
          />
          <p className="text-gray-500 text-lg">No categories found</p>
        </div>
      )}

      {/* Categories List */}
      <div className="grid gap-4">
        {categories?.categories?.map((cat: any, index: number) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 rounded-2xl bg-(--color-cornsilk) shadow hover:shadow-lg transition"
          >
            <span className="text-lg font-medium text-[--color-dark]">
              {cat.name}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(cat)}
                className="p-2 rounded-full border hover:bg-gray-100 transition"
              >
                <Edit size={18} />
              </button>

              <button
                onClick={() => handleDelete(cat.id)}
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
