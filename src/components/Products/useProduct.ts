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

  const { data: products, isLoading } = useGetProductsQuery(name);
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
