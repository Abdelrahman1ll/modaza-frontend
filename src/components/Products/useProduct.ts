import { useGetProductsQuery } from "../../redux/products/apiProducts";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import {
  useDeleteWishlistMutation,
  useGetWishlistQuery,
  usePostWishlistMutation,
} from "../../redux/wishlist/apiWishlist";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useProduct() {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "";
  const category = searchParams.get("category") || "";
  const color = searchParams.get("color") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sortPrice = searchParams.get("sortPrice") || "";
  const bestSelling = searchParams.get("bestSelling") || "";
  const [hoveredIds, setHoveredIds] = useState<{ [key: string]: boolean }>({});

  const secretKey = import.meta.env.VITE_SECRET_KEY;
  const encryptedUser = Cookies.get("user");
  let user: any = null;
  if (encryptedUser) {
    const decryptedUser = CryptoJS.AES.decrypt(
      encryptedUser,
      secretKey
    ).toString(CryptoJS.enc.Utf8);

    user = JSON.parse(decryptedUser);
  }

  const isUser = user?.user.role === "user";

  // ✅ بناء الـ query string مع كل الـ parameters
  const buildQueryString = () => {
    const params = new URLSearchParams();

    if (name) params.append("name", name);
    if (category) params.append("category", category);
    if (color) params.append("color", color);
    if (minPrice) params.append("minPrice", minPrice);
    if (maxPrice) params.append("maxPrice", maxPrice);
    if (sortPrice) params.append("sortPrice", sortPrice);
    if (bestSelling) params.append("bestSelling", bestSelling);

    return params.toString() ? `?${params.toString()}` : "";
  };

  const { data: products, isLoading } = useGetProductsQuery(
    `/products${buildQueryString()}`
  );
  const [isFav, setIsFav] = useState<{ [key: number]: boolean }>({});
  const [postWishlist] = usePostWishlistMutation();
  const { data, refetch } = useGetWishlistQuery({});
  const [deleteWishlist] = useDeleteWishlistMutation();

  useEffect(() => {
    if (data?.wishlist) {
      const favStatus: { [key: number]: boolean } = {};
      data.wishlist.forEach((item: any) => {
        favStatus[item.product.id] = true;
      });
      setIsFav(favStatus);
    }
  }, [data, isUser]);

  const handleToggleWishlist = async (productId: number) => {
    try {
      const wishlistItem = data?.wishlist?.find(
        (item: any) => String(item.product.id) === String(productId)
      );

      if (wishlistItem) {
        await deleteWishlist(wishlistItem.id).unwrap();
        setIsFav((prev) => ({ ...prev, [productId]: false }));
      } else {
        await postWishlist({ product: Number(productId) }).unwrap();
        setIsFav((prev) => ({ ...prev, [productId]: true }));
      }

      refetch();
    } catch {
      toast.error("Failed to toggle favorite");
    }
  };

  return {
    products,
    isLoading,
    isFav,
    handleToggleWishlist,
    hoveredIds,
    setHoveredIds,
    user,
  };
}
