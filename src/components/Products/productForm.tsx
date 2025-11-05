import { motion } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Size {
  size: string;
  length: string;
  width: string;
  stock: string;
}

interface Product {
  id?: number;
  name: string;
  price: string;
  promoPrice: string;
  category: string;
  description: string;
  color: string;
  stock: string;
  wholesalePrice: string;
  packagingCost: string;
  marketingCost: string;
  images: string[];
  sizes: Size[];
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Classic Hoodie",
    price: '700',
    promoPrice: '600',
    category: "Hoodies",
    description: "Warm and comfortable hoodie for casual wear.",
    color: "Black",
    stock: '20',
    wholesalePrice: '500',
    packagingCost: '50',
    marketingCost: '30',
    images: ["/photo-1495385794356-15371f348c31.jpeg"],
    sizes: [
      { size: "M", length: "60", width: "50", stock: "5" },
      { size: "L", length: "65", width: "55", stock: "10" },
    ],
  },
  {
    id: 2,
    name: "Street Jacket",
    price: '900',
    promoPrice: '800',
    category: "Jackets",
    description: "Stylish street jacket with soft lining.",
    color: "Gray",
    stock: '15',
    wholesalePrice: '650',
    packagingCost: '70',
    marketingCost: '40',
    images: ["/premium_photo-1667520043080-53dcca77e2aa.jpeg"],
    sizes: [{ size: "XL", length: "70", width: "60", stock: "5" }],
  },
];

export default function ProductForm({ mode }: { mode: "add" | "edit" }) {
  const { id } = useParams();
  const [formData, setFormData] = useState<Product>({
    name: "",
    price: "",
    promoPrice: "",
    category: "",
    description: "",
    color: "",
    stock: "",
    wholesalePrice: "",
    packagingCost: "",
    marketingCost: "",
    images: [],
    sizes: [{ size: "", length: "", width: "", stock: "" }],
  });

  useEffect(() => {
    if (mode === "edit" && Number(id)) {
      // بدل البحث هنا ممكن تستخدم API حقيقي
      const found = mockProducts.find((p) => p.id === Number(id));
      if (found) setFormData(found);
      else console.warn("Product not found!");
    }
  }, [mode, Number(id)]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "number" ? Number(value) : value,
    }));
  };

  const handleSizeChange = (
    index: number,
    field: keyof Size,
    value: string
  ) => {
    const updated = [...formData.sizes];
    updated[index][field] = value;
    setFormData({ ...formData, sizes: updated });
  };

  const addSizeField = () =>
    setFormData((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", length: "", width: "", stock: "" }],
    }));

  const removeSizeField = (index: number) => {
    const updated = formData.sizes.filter((_, i) => i !== index);
    setFormData({ ...formData, sizes: updated });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedSizes = formData.sizes.map((s) => ({
      ...s,
      length: Number(s.length) || 0,
      width: Number(s.width) || 0,
      stock: Number(s.stock) || 0,
    }));

    const finalData = { ...formData, sizes: formattedSizes };
    console.log(
      mode === "add" ? "🆕 New Product:" : "✏️ Updated Product:",
      finalData
    );
  };

  return (
    <div className="min-h-screen flex justify-center items-start py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl p-6 rounded-3xl shadow-xl border border-(--color-tiger)"
      >
        <h2 className="text-3xl font-bold text-(--color-pakistan) mb-8 text-center">
          {mode === "add" ? "Add New Product" : "Edit Product"}
        </h2>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <section>
            <h3 className="text-lg font-semibold text-(--color-dark) mb-3">
              Basic Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Product Name", name: "name", type: "text" },
                { label: "Price", name: "price", type: "number" },
                {
                  label: "Promotional Price",
                  name: "promoPrice",
                  type: "number",
                },
                { label: "Category", name: "category", type: "text" },
              ].map((input) => (
                <div key={input.name} className="flex flex-col">
                  <label className="text-sm font-medium text-(--color-dark) mb-1">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    name={input.name}
                    min={input.type === "number" ? 0 : undefined}
                    value={formData[input.name as keyof Product] as any}
                    placeholder={input.label}
                    onChange={handleChange}
                    className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col mt-4">
              <label className="text-sm font-medium text-(--color-dark) mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description..."
                className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
              />
            </div>
          </section>

          {/* Details */}
          <section>
            <h3 className="text-lg font-semibold text-(--color-dark) mb-3">
              Product Details
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Color", name: "color" },
                { label: "All Stock", name: "stock" },
                { label: "Wholesale Price", name: "wholesalePrice" },
              ].map((input) => (
                <div key={input.name} className="flex flex-col">
                  <label className="text-sm font-medium text-(--color-dark) mb-1">
                    {input.label}
                  </label>
                  <input
                    type={input.name == "color" ? "text" : "number"}
                    name={input.name}
                    value={formData[input.name as keyof Product] as any}
                    placeholder={input.label}
                    onChange={handleChange}
                    className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Costs */}
          <section>
            <h3 className="text-lg font-semibold text-(--color-dark) mb-3">
              Additional Costs
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "Packaging Cost", name: "packagingCost" },
                { label: "Marketing Cost", name: "marketingCost" },
              ].map((input) => (
                <div key={input.name} className="flex flex-col">
                  <label className="text-sm font-medium text-(--color-dark) mb-1">
                    {input.label}
                  </label>
                  <input
                    type="number"
                    name={input.name}
                    min="0"
                    value={formData[input.name as keyof Product] as any}
                    onChange={handleChange}
                    placeholder={input.label}
                    className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Images */}
          <div className="p-4 bg-(--color-cornsilk) rounded-2xl shadow-md">
            <h2 className="text-lg font-bold text-[--color-pakistan] mb-3">
              Upload Product Images
            </h2>
            <label className="inline-flex items-center gap-2 bg-(--color-tiger) text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-(--color-earth) transition mb-4">
              <PlusCircle size={18} />
              Add Images
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>

            <div className="grid grid-cols-3 gap-4">
              {formData.images.map((src, index) => (
                <div
                  key={index}
                  className="relative border border-(--color-earth) rounded-xl overflow-hidden shadow-sm"
                >
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-(--color-tiger) text-white rounded-full p-1 hover:bg-(--color-earth)"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <section>
            <h3 className="text-lg font-semibold text-(--color-dark) mb-3">
              Sizes
            </h3>
            {formData.sizes.map((size, index) => (
              <div
                key={index}
                className="grid md:grid-cols-5 gap-3 mb-2 items-end"
              >
                {[
                  { label: "Size (S, M...)", field: "size" },
                  { label: "Length", field: "length" },
                  { label: "Width", field: "width" },
                  { label: "Stock", field: "stock" },
                ].map((input) => (
                  <div key={input.field} className="flex flex-col">
                    <label className="text-sm font-medium text-(--color-dark) mb-1">
                      {input.label}
                    </label>
                    <input
                      type={input.field === "size" ? "text" : "number"}
                      min={input.field !== "size" ? 0 : undefined}
                      value={(size as any)[input.field]}
                      placeholder={input.label}
                      onChange={(e) =>
                        handleSizeChange(
                          index,
                          input.field as keyof Size,
                          e.target.value
                        )
                      }
                      className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => removeSizeField(index)}
                  className="text-red-500 text-sm hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSizeField}
              className="text-sm text-(--color-tiger) hover:underline"
            >
              + Add another size
            </button>
          </section>

          {/* Submit */}
          <div className="flex w-full pt-4">
            <button
              type="submit"
              className="w-full bg-(--color-tiger) hover:bg-(--color-earth) text-white font-semibold px-10 py-3 rounded-2xl shadow-md transition duration-200"
            >
              {mode === "add" ? "Save Product" : "Update Product"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
