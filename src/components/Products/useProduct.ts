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
export default function useProduct() {
     const [currentImage, setCurrentImage] = useState<{ [key: number]: number }>(
    {}
  );
  const { data: products, isLoading } = useGetProductsQuery({});
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
  }, [data]);

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

  // Check if user is logged in
  const secretKey = import.meta.env.VITE_SECRET_KEY;

  const encryptedUser = Cookies.get("user");

  let user: { user: { role: string } } | null = null;
  if (encryptedUser) {
    const decryptedUser = CryptoJS.AES.decrypt(
      encryptedUser,
      secretKey
    ).toString(CryptoJS.enc.Utf8);

    user = JSON.parse(decryptedUser);
  }

  const nextImage = (id: number, total: number) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % total,
    }));
  };

  const prevImage = (id: number, total: number) => {
    setCurrentImage((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) === 0 ? total - 1 : (prev[id] || 0) - 1,
    }));
  };

  return {
    products,
    isLoading,
    isFav,
    handleToggleWishlist,
    currentImage,
    nextImage,
    prevImage,
    user,
  };
}