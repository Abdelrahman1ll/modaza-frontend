import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import {
  useDeleteWishlistMutation,
  useGetWishlistQuery,
  usePostWishlistMutation,
} from "../../redux/wishlist/apiWishlist";
import { toast } from "react-toastify";
import { useGetCartQuery, usePostCartMutation } from "../../redux/Cart/apiCart";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useGetProductIdQuery } from "../../redux/products/apiProducts";
import type { ProductType } from "../../types/ProductType";
import { SignupContext } from "../Signup/SignupContext";
export default function useProductDetail() {
  const { id } = useParams();
  const { data: products, isLoading } = useGetProductIdQuery(id);
  const { openSignup } = useContext(SignupContext);

  const product: ProductType = products?.product;
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [isFav, setIsFav] = useState(false);
  const [postWishlist] = usePostWishlistMutation();
  const { data, refetch } = useGetWishlistQuery({});
  const [deleteWishlist] = useDeleteWishlistMutation();
  const [postCart] = usePostCartMutation();
  const { refetch: refetchCart } = useGetCartQuery({});

  useEffect(() => {
    if (data?.wishlist) {
      const exist = data?.wishlist.some(
        (item: any) => String(item.product.id) === String(id)
      );
      setIsFav(exist);
    }
  }, [data, id]);

  const handleToggleWishlist = async () => {
    try {
      if (isFav) {
        const wishlistItem = data?.wishlist?.find(
          (item: any) => String(item.product.id) === String(id)
        );

        if (!wishlistItem) {
          toast.info("Item already removed from wishlist");
          setIsFav(false);
          return;
        }

        await deleteWishlist(wishlistItem.id).unwrap();
        setIsFav(false);
        refetch();
      } else {
        await postWishlist({ product: Number(id) }).unwrap();
        setIsFav(true);
        refetch();
      }
    } catch {
      toast.error("Failed to toggle favorite");
    }
  };
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const mainImage =
    product?.images && product.images.length > 0
      ? product.images[currentIndex]
      : "";

  const handleNext = () => {
    if (!product?.images?.length) return;
    setCurrentIndex((prevIndex: number) =>
      prevIndex === product?.images?.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    if (!product?.images?.length) return;
    setCurrentIndex((prevIndex: number) =>
      prevIndex === 0 ? product?.images?.length - 1 : prevIndex - 1
    );
  };

  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => Math.min(prev + 1, 10)); // أقصى 10
  const decrease = () => setQuantity((prev) => Math.max(prev - 1, 1)); // أدنى 1

  const percentstock =
    Math.min((product?.stock / product?.total_stock) * 100, 100) || 0;
  const getColor = () => {
    if (percentstock > 60) return "var(--color-tiger)"; // أخضر
    if (percentstock > 30) return "var(--color-dark)"; // برتقالي
    return "#A80000"; // أحمر
  };

  const [errors, setErrors] = useState({
    selectedSize: null,
    quantity: null,
    id: null,
  });

  const addToCart = async () => {
    const secretKey = import.meta.env.VITE_SECRET_KEY;
    const encryptedUser = Cookies.get("user");

    // التحقق من تسجيل الدخول
    if (encryptedUser) {
      try {
        const decryptedUser = CryptoJS.AES.decrypt(
          encryptedUser,
          secretKey
        ).toString(CryptoJS.enc.Utf8);

        const user = JSON.parse(decryptedUser);

        if (!user) {
          openSignup();
          return;
        }
        if (user && user.user.role !== "user") {
          toast.error("I'm not allowed to admin");
          return;
        }
      } catch {
        openSignup();
        return;
      }
    } else {
      openSignup();
      return;
    }
    let newErrors: any = {
      selectedSize: null,
      quantity: null,
      id: null,
    };

    if (!selectedSize) newErrors.selectedSize = "Please select a size";
    if (!id) newErrors.id = "Invalid product";
    if (!quantity || quantity === 0)
      newErrors.quantity = "Quantity must be greater than 0";

    // لو في أي Error وقف
    if (newErrors.selectedSize || newErrors.quantity || newErrors.id) {
      setErrors(newErrors);
      return;
    }
    try {
      await postCart({
        product: Number(id),
        quantity: quantity,
        sizes: selectedSize,
      }).unwrap();
      refetchCart();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add item to cart");
    }
  };

  return {
    product,
    isFav,
    handleToggleWishlist,
    mainImage,
    handleNext,
    handlePrev,
    quantity,
    increase,
    decrease,
    percentstock,
    getColor,
    errors,
    addToCart,
    selectedSize,
    setSelectedSize,
    isLoading,
    setCurrentIndex,
  };
}
