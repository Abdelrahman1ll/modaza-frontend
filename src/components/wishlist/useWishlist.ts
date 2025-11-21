import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  useDeleteWishlistMutation,
  useGetWishlistQuery,
  usePostWishlistMutation,
} from "../../redux/wishlist/apiWishlist";
export default function UseWishlist() {
  const [postWishlist] = usePostWishlistMutation();
  const { data, refetch, isLoading } = useGetWishlistQuery({});
  const [deleteWishlist] = useDeleteWishlistMutation();
  const [isFav, setIsFav] = useState<{ [key: number]: boolean }>({});
  const [currentImage, setCurrentImage] = useState<{ [key: number]: number }>(
    {}
  );

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
    handleToggleWishlist,
    isFav,
    isLoading,
    currentImage,
    nextImage,
    prevImage,
    user,
    data,
  };
}
