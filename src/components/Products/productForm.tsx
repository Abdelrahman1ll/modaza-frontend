import { motion } from "framer-motion";
import { PlusCircle, X } from "lucide-react";
import type { ProductSizeType } from "../../types/ProductType";
import useProductForm, {
  type ErrorProductType,
  type SizeErrorType,
} from "./useProductForm";

export default function ProductForm({ mode }: { mode: "add" | "edit" }) {
  const {
    formData,
    errors,
    addSizeField,
    removeSizeField,
    handleSizeChange,
    handleImageUpload,
    removeImage,
    handleSubmit,
    handleChange,
    isLoadingPatch,
    isLoadingPost,
    categories,
    isLoadingCategory,
    isErrorCategory,
    openCategory,
    setOpenCategory,
    nameCategory,
    setNameCategory,
    colors,
    isLoadingColors,
    isErrorColors,
    openColors,
    setOpenColors,
    nameColors,
    setNameColors,
  } = useProductForm(mode);

  return (
    <div className="min-h-screen flex justify-center items-start py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-4xl p-2 md:p-6 rounded-3xl shadow-xl border border-(--color-tiger)"
      >
        <h2 className="text-3xl font-bold text-(--color-pakistan) mb-8 text-center">
          {mode === "add" ? "Add New Product" : "Edit Product"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <section>
            <h3 className="text-lg font-semibold text-(--color-dark) mb-3">
              Basic Information
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Product Name", name: "name", type: "text" },
                { label: "Price", name: "price", type: "number" },
                {
                  label: "Promotional Price",
                  name: "promotionalPrice",
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
                    value={
                      formData[input.name as keyof ErrorProductType] as any
                    }
                    placeholder={input.label}
                    onChange={handleChange}
                    className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
                  />
                  {errors[input.name as keyof ErrorProductType] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[input.name as keyof ErrorProductType] as string}
                    </p>
                  )}
                </div>
              ))}

              {/* Category للقسم */}
              <div className="flex flex-col relative">
                <label className="text-sm font-medium text-(--color-dark) mb-1">
                  Category
                </label>
                <div
                  className="p-2 rounded-xl border border-(--color-earth) cursor-pointer 
             bg-(--color-cornsilk) flex items-center justify-between"
                  onClick={() => setOpenCategory(!openCategory)}
                >
                  <span>{nameCategory || "Select Category"}</span>

                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openCategory ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {openCategory && (
                  <div className="absolute top-full mt-2 w-full bg-(--color-cornsilk) border rounded-xl shadow-lg z-50 p-2">
                    {isLoadingCategory ? (
                      <p className="text-center text-sm text-(--color-dark)">
                        Loading categories...
                      </p>
                    ) : isErrorCategory ? (
                      <p className="text-center text-sm text-red-500">
                        Failed to load categories. Please try again.
                      </p>
                    ) : (
                      <div className="max-h-52 overflow-y-auto">
                        {categories?.categories?.map((cate: any) => (
                          <div
                            key={cate.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                            onClick={() => {
                              handleChange({
                                target: {
                                  name: "category",
                                  value: cate.id,
                                } as any,
                              } as any);
                              setNameCategory(cate.name);
                              setOpenCategory(false);
                            }}
                          >
                            {cate.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {errors.category && (
                  <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col mt-2 md:mt-4">
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
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description}
                </p>
              )}
            </div>
          </section>

          {/* Details */}
          <section>
            <h3 className="text-lg font-semibold text-(--color-dark) mb-3">
              Product Details
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { label: "All Stock", name: "stock" },
                { label: "Wholesale Price", name: "wholesalePrice" },
              ].map((input) => (
                <div key={input.name} className="flex flex-col">
                  <label className="text-sm font-medium text-(--color-dark) mb-1">
                    {input.label}
                  </label>
                  <input
                    type="number"
                    name={input.name}
                    value={
                      formData[input.name as keyof ErrorProductType] as any
                    }
                    placeholder={input.label}
                    onChange={handleChange}
                    className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
                  />
                  {errors[input.name as keyof ErrorProductType] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[input.name as keyof ErrorProductType] as string}
                    </p>
                  )}
                </div>
              ))}

              {/* Colors للقسم */}
              <div className="flex flex-col relative md:col-span-1 col-span-2">
                <label className="text-sm font-medium text-(--color-dark) mb-1">
                  Colors
                </label>
                <div
                  className="p-2 rounded-xl border border-(--color-earth) cursor-pointer 
             bg-(--color-cornsilk) flex items-center justify-between"
                  onClick={() => setOpenColors(!openColors)}
                >
                  <span>{nameColors || "Select Color"}</span>

                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openCategory ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {openColors && (
                  <div className="absolute top-full mt-2 w-full bg-(--color-cornsilk) border rounded-xl shadow-lg z-50 p-2">
                    {isLoadingColors ? (
                      <p className="text-center text-sm text-(--color-dark)">
                        Loading colors...
                      </p>
                    ) : isErrorColors ? (
                      <p className="text-center text-sm text-red-500">
                        Failed to load colors. Please try again.
                      </p>
                    ) : (
                      <div className="max-h-52 overflow-y-auto">
                        {colors?.colors?.map((cate: any) => (
                          <div
                            key={cate.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                            onClick={() => {
                              handleChange({
                                target: {
                                  name: "colors",
                                  value: cate.id,
                                } as any,
                              } as any);
                              setNameColors(cate.name);
                              setOpenColors(false);
                            }}
                          >
                            {cate.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {errors.category && (
                  <p className="text-red-600 text-sm mt-1">{errors.category}</p>
                )}
              </div>
            </div>
          </section>

          {/* Costs */}
          <section>
            <h3 className="text-lg font-semibold text-(--color-dark) mb-3">
              Additional Costs
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Packaging Cost", name: "packagingCost" },
                { label: "Marketing Cost", name: "marketingCosts" },
              ].map((input) => (
                <div key={input.name} className="flex flex-col">
                  <label className="text-sm font-medium text-(--color-dark) mb-1">
                    {input.label}
                  </label>
                  <input
                    type="number"
                    name={input.name}
                    min="0"
                    value={
                      formData[input.name as keyof ErrorProductType] as any
                    }
                    onChange={handleChange}
                    placeholder={input.label}
                    className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
                  />
                  {errors[input.name as keyof ErrorProductType] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors[input.name as keyof ErrorProductType] as string}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Images */}
          <div className="p-2 bg-(--color-cornsilk) rounded-2xl shadow-md">
            <h2 className="text-lg font-bold text-[--color-pakistan] mb-3">
              Upload Product Images
            </h2>
            <label className="inline-flex items-center gap-2 bg-(--color-tiger) text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-(--color-earth) transition mb-2">
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
            {errors?.viewPhotos && errors?.viewPhotos.length > 0 && (
              <p className="text-red-500 text-xs mt-1">
                {errors?.viewPhotos[0]}
              </p>
            )}

            <div className="grid grid-cols-3 gap-4">
              {formData?.viewPhotos.map((src, index) => (
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
            {formData?.sizes.map((size, index) => (
              <div
                key={index}
                className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-2 items-end"
              >
                {["size", "length", "width", "stock"].map((field) => (
                  <div key={field} className="flex flex-col">
                    <label className="text-sm font-medium text-(--color-dark) mb-1">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "size" ? "text" : "number"}
                      min={field !== "size" ? 0 : undefined}
                      value={(size as any)[field]}
                      placeholder={field}
                      onChange={(e) =>
                        handleSizeChange(
                          index,
                          field as keyof ProductSizeType,
                          e.target.value
                        )
                      }
                      className="border border-(--color-earth) rounded-xl px-4 py-2 focus:ring-1 focus:ring-(--color-tiger) outline-none bg-(--color-cornsilk)"
                    />
                    {errors?.sizes?.[index]?.[field as keyof SizeErrorType] && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors?.sizes[index][field as keyof SizeErrorType]}
                      </p>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => removeSizeField(index)}
                  className="text-red-500 text-sm border border-red-500 rounded-xl px-4 py-2 hover:underline md:col-span-1 col-span-2"
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
              disabled={isLoadingPost || isLoadingPatch}
              style={{
                backgroundColor:
                  isLoadingPost || isLoadingPatch
                    ? "var(--color-earth)"
                    : "var(--color-tiger)",
                cursor:
                  isLoadingPost || isLoadingPatch ? "not-allowed" : "pointer",
              }}
              className="w-full text-white font-semibold px-10 py-3 rounded-2xl shadow-md transition duration-200 hover:opacity-90"
            >
              {isLoadingPost || isLoadingPatch
                ? "Processing..."
                : mode === "add"
                ? "Save Product"
                : "Update Product"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
