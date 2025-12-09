import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useGetCartQuery } from "../../redux/Cart/apiCart";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SignupContext } from "../Signup/SignupContext";

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
  const [openMenu, setOpenMenu] = useState(false);
  const [name, setName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const [isSearchLocal, setIsSearchLocal] = useState(false);



  useEffect(() => {
    const value = localStorage.getItem("isSearch") === "true";
    setIsSearchLocal(value);
  }, []);
  const { openSignup } = useContext(SignupContext);

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
    localStorage.removeItem("usedProfile10");
    setTimeout(() => {
      window.location.href = "/";
    }, 100);
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
    openMenu,
    setOpenMenu,
    name,
    setName,
    handleLogout,
    user,
    totalItems,
    countries,
    openSignup,
    isSearchLocal,
    navigate,
    setIsSearchLocal,
  };
}
