import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useGetCartQuery } from "../../redux/Cart/apiCart";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const countries = [
  { name: "Egypt", flag: "/eg.svg" },
  // { name: "Saudi", flag: "https://flagcdn.com/sa.svg" },
  // { name: "Morocco", flag: "https://flagcdn.com/ma.svg" },
  // { name: "Jordan", flag: "https://flagcdn.com/jo.svg" },
  // { name: "Kuwait", flag: "https://flagcdn.com/kw.svg" },
];
export default function useHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(countries[0]);
  const [showSignup, setShowSignup] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [name, setName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (name) {
        searchParams.set("name", name);
      } else {
        searchParams.delete("name");
      }
      setSearchParams(searchParams);
    }, 500);

    return () => clearTimeout(handler);
  }, [name]);

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

  const handleLogout = () => {
    Cookies.remove("user");
    return (window.location.href = "/");
  };

  const isUser = user?.user.role === "user";
  const { data: cart, refetch: refetchCart } = useGetCartQuery(
    {},
    { skip: !isUser }
  );

  useEffect(() => {
    if (isUser) {
      refetchCart();
    }
  }, [isUser, refetchCart]);

  const totalItems: number = cart?.carts?.items.length || 0;

  return {
    isMenuOpen,
    setIsMenuOpen,
    isSearch,
    setSearch,
    isOpen,
    setIsOpen,
    selected,
    setSelected,
    showSignup,
    setShowSignup,
    openMenu,
    setOpenMenu,
    name,
    setName,
    handleLogout,
    user,
    totalItems,
    countries,
  };
}
