import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  usePatchProductMutation,
  usePostProductMutation,
} from "../../redux/products/apiProducts";
import { toast } from "react-toastify";
import type { ProductSizeType } from "../../types/ProductType";

export interface SizeErrorType {
  size: string;
  length: string;
  width: string;
  stock: string;
}
export type ErrorProductType = {
  name: string;
  description: string;
  price: string;
  promotionalPrice: string;
  category: string;
  stock: string;
  wholesalePrice: string;
  packagingCost: string;
  marketingCosts: string;
  sizes: SizeErrorType[];
  colors: string;
  viewPhotos: string[]; // عرض صور المنتج اللي في السيرفر واللي في الاضافة
  removedImages: string[]; // صور محذوفة من السيرفر
  additionImages: string[]; // صور جديدة للمنتج
};
export default function useProductForm(mode: "add" | "edit") {
  const [postProduct, { isLoading: isLoadingPost }] = usePostProductMutation();
  const [patchProduct, { isLoading: isLoadingPatch }] =
    usePatchProductMutation();
  const { data: products } = useGetProductsQuery({});
  const { id } = useParams();
  const [formData, setFormData] = useState<ErrorProductType>({
    name: "",
    description: "",
    price: "",
    promotionalPrice: "",
    category: "",
    stock: "",
    wholesalePrice: "",
    packagingCost: "",
    marketingCosts: "",
    sizes: [{ size: "", length: "", width: "", stock: "" }],
    colors: "",
    viewPhotos: [],
    removedImages: [],
    additionImages: [],
  });

  const [errors, setErrors] = useState<ErrorProductType>({
    name: "",
    description: "",
    price: "",
    promotionalPrice: "",
    category: "",
    stock: "",
    wholesalePrice: "",
    packagingCost: "",
    marketingCosts: "",
    sizes: [{ size: "", length: "", width: "", stock: "" }],
    colors: "",
    viewPhotos: [],
    removedImages: [],
    additionImages: [],
  });

  useEffect(() => {
    if (mode === "edit" && Number(id)) {
      const found = products?.products?.find(
        (p: { id: number }) => p.id === Number(id)
      );

      if (found)
        setFormData({
          ...found,
          viewPhotos: found.images || [], // ✅ نضيف الصور القديمة للعرض
          additionImages: [], // ✅ نبدأ فاضية
          removedImages: [], // ✅ نبدأ فاضية
        });
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
    field: keyof ProductSizeType,
    value: string
  ) => {
    const updated = [...formData.sizes];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, sizes: updated });
  };

  const addSizeField = () =>
    setFormData((prev: any) => ({
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

    const newFiles = Array.from(files);
    const previews = newFiles.map((file) => URL.createObjectURL(file));

    setFormData((prev: any) => ({
      ...prev,
      additionImages: [...(prev.additionImages || []), ...newFiles],
      viewPhotos: [...(prev.viewPhotos || []), ...previews],
    }));
  };

  const removeImage = (index: number) => {
    const safeView = formData?.viewPhotos || [];
    const safeAdditions = formData?.additionImages || [];

    const removedPhoto = safeView[index];

    // هل الصورة دي من السيرفر ولا من الصور الجديدة؟
    const isServerImage = safeView.some((img) => removedPhoto.includes(img));

    if (isServerImage) {
      setFormData((prev: any) => ({
        ...prev,
        removedImages: [...(prev.removedImages || []), removedPhoto],
        viewPhotos: safeView.filter((_, i) => i !== index),
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        additionImages: safeAdditions.filter((_, i) => i !== index),
        viewPhotos: safeView.filter((_, i) => i !== index),
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = { ...errors };
    let isValid = true;

    if (formData.viewPhotos.length < 1) {
      isValid = false;
      newErrors.viewPhotos = ["At least one image is required."];
    }

    if (formData.name.trim().length < 3) {
      isValid = false;
      newErrors.name = "Name must be at least 3 characters long.";
    }

    if (formData.description.trim().length < 8) {
      isValid = false;
      newErrors.description = "Description must be at least 8 characters long.";
    }

    if (formData.category.trim().length < 3) {
      isValid = false;
      newErrors.category = "Category must be at least 3 characters long.";
    }

    if (formData.colors.trim().length < 3) {
      isValid = false;
      newErrors.colors = "Color must be at least 3 characters long.";
    }

    if (Number(formData.price) < 1) {
      isValid = false;
      newErrors.price = "Price must be at least 1.";
    }

    if (Number(formData.promotionalPrice) < 1) {
      isValid = false;
      newErrors.promotionalPrice = "Promotional price must be at least 1.";
    }

    if (Number(formData.promotionalPrice) <= Number(formData.price)) {
      isValid = false;
      newErrors.promotionalPrice =
        "Promotional price must be less than the regular price.";
    }

    if (Number(formData.stock) < 1) {
      isValid = false;
      newErrors.stock = "Stock must be at least 1.";
    }

    if (Number(formData.wholesalePrice) < 1) {
      isValid = false;
      newErrors.wholesalePrice = "Wholesale price must be at least 1.";
    }

    if (Number(formData.packagingCost) < 1) {
      isValid = false;
      newErrors.packagingCost = "Packaging cost must be at least 1.";
    }

    if (Number(formData.marketingCosts) < 1) {
      isValid = false;
      newErrors.marketingCosts = "Marketing costs must be at least 1.";
    }

    let sizeErrors: SizeErrorType[] = [];
    if (formData.sizes.length < 1) {
      isValid = false;
      sizeErrors.push({
        size: "At least one size is required.",
        length: "",
        width: "",
        stock: "",
      });
    } else {
      sizeErrors = formData.sizes.map((s) => {
        const err: SizeErrorType = {
          size: "",
          length: "",
          width: "",
          stock: "",
        };
        if (!s.size) err.size = "Size is required.";
        if (!s.length || Number(s.length) <= 0)
          err.length = "Length is required.";
        if (!s.width || Number(s.width) <= 0) err.width = "Width is required.";
        if (!s.stock || Number(s.stock) <= 0) err.stock = "Stock is required.";
        return err;
      });

      const hasErrors = sizeErrors.some(
        (err) => err.size || err.length || err.width || err.stock
      );
      if (hasErrors) isValid = false;
    }

    newErrors.sizes = sizeErrors;

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", String(formData.price));
    formDataToSend.append(
      "promotionalPrice",
      String(formData.promotionalPrice)
    );
    formDataToSend.append("category", formData.category);
    formDataToSend.append("stock", String(formData.stock));
    formDataToSend.append("wholesalePrice", String(formData.wholesalePrice));
    formDataToSend.append("packagingCost", String(formData.packagingCost));
    formDataToSend.append("marketingCosts", String(formData.marketingCosts));
    formDataToSend.append("colors", formData.colors);

    formDataToSend.append("sizes", JSON.stringify(formData.sizes));

    for (let i = 0; i < formData.additionImages.length; i++) {
      formDataToSend.append("images", formData.additionImages[i]);
    }

    if (mode === "edit") {
      if (formData.removedImages.length > 0) {
        formDataToSend.append(
          "removedImages",
          formData.removedImages.join(",")
        );
      }
    }

    try {
      if (mode === "add") {
        await postProduct(formDataToSend).unwrap();
        toast.success("Product added successfully!");

        setFormData({
          name: "",
          description: "",
          price: "",
          promotionalPrice: "",
          category: "",
          stock: "",
          wholesalePrice: "",
          packagingCost: "",
          marketingCosts: "",
          colors: "",
          sizes: [{ size: "", length: "", width: "", stock: "" }],
          viewPhotos: [],
          additionImages: [],
          removedImages: [],
        });
        setErrors({
          name: "",
          description: "",
          price: "",
          promotionalPrice: "",
          category: "",
          stock: "",
          wholesalePrice: "",
          packagingCost: "",
          marketingCosts: "",
          colors: "",
          sizes: [{ size: "", length: "", width: "", stock: "" }],
          viewPhotos: [],
          additionImages: [],
          removedImages: [],
        });
      } else if (mode === "edit") {
        await patchProduct({ id, data: formDataToSend }).unwrap();

        toast.success("Product updated successfully!");
        setFormData({
          name: "",
          description: "",
          price: "",
          promotionalPrice: "",
          category: "",
          stock: "",
          wholesalePrice: "",
          packagingCost: "",
          marketingCosts: "",
          colors: "",
          sizes: [{ size: "", length: "", width: "", stock: "" }],
          viewPhotos: [],
          additionImages: [],
          removedImages: [],
        });
        setErrors({
          name: "",
          description: "",
          price: "",
          promotionalPrice: "",
          category: "",
          stock: "",
          wholesalePrice: "",
          packagingCost: "",
          marketingCosts: "",
          colors: "",
          sizes: [{ size: "", length: "", width: "", stock: "" }],
          viewPhotos: [],
          additionImages: [],
          removedImages: [],
        });
      }
    } catch {
      toast.error("Error adding product. Please try again.");
    }
  };

  return {
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
  };
}
