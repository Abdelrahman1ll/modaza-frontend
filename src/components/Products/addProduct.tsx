import { motion } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    promoPrice: 0,
    category: "",
    description: "",
    color: "",
    stock: 0,
    wholesalePrice: 0,
    packagingCost: 0,
    marketingCost: 0,
  });

  const [sizes, setSizes] = useState<
    { size: string; length: number; width: number; stock: number }[]
  >([{ size: "", length: 0, width: 0, stock: 0 }]);

  const [images, setImages] = useState<string[]>([]);

  // تحديث القيم العادية
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: e.target.type === "number" ? Number(value) : value,
    }));
  };

  // تحديث المقاسات
  const handleSizeChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const updated = [...sizes];
    (updated[index] as any)[field] =
      typeof value === "string" && field !== "size" ? Number(value) : value;
    setSizes(updated);
  };

  const addSizeField = () =>
    setSizes((prev) => [...prev, { size: "", length: 0, width: 0, stock: 0 }]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      images,
      sizes,
    };
    console.log("📦 Product Data:", finalData);
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
          Add New Product
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
                onChange={handleChange}
                placeholder="Enter product description..."
                className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
              />
            </div>
          </section>

          {/* Product Details */}
          <section>
            <h3 className="text-lg font-semibold text-(--color-dark) mb-3">
              Product Details
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: "Color", name: "color", type: "text" },
                { label: "All Stock", name: "stock", type: "number" },
                {
                  label: "Wholesale Price",
                  name: "wholesalePrice",
                  type: "number",
                },
              ].map((input) => (
                <div key={input.name} className="flex flex-col">
                  <label className="text-sm font-medium text-(--color-dark) mb-1">
                    {input.label}
                  </label>
                  <input
                    type={input.type}
                    name={input.name}
                    min={input.type === "number" ? 0 : undefined}
                    placeholder={input.label}
                    onChange={handleChange}
                    className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Additional Costs */}
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
                    placeholder={input.label}
                    onChange={handleChange}
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
              {images.map((src, index) => (
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
            {sizes.map((size, index) => (
              <div key={index} className="grid md:grid-cols-4 gap-3 mb-2">
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
                        handleSizeChange(index, input.field, e.target.value)
                      }
                      className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
                    />
                  </div>
                ))}
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
              Save Product
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
