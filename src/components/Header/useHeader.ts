import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { useGetCartQuery } from "../../redux/Cart/apiCart";
import { useContext, useEffect, useRef, useState } from "react";
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
  const [nameInput, setNameInput] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const initialized = useRef(false);
  const navigate = useNavigate();
  const [isSearchLocal, setIsSearchLocal] = useState(false);

  useEffect(() => {
    const value = localStorage.getItem("isSearch") === "true";
    setIsSearchLocal(value);
  }, []);
  const { openSignup } = useContext(SignupContext);

  // 👇 تحميل القيمة من URL وتحديثها عند أي تغيير
  useEffect(() => {
    const nameFromUrl = searchParams.get("name") || "";
    if (nameFromUrl !== nameInput) {
      setNameInput(nameFromUrl);
    }
  }, [searchParams]);

  // 👇 تحديث URL مع debounce
  useEffect(() => {
    if (!initialized.current) return;

    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (nameInput.trim()) {
        params.set("name", nameInput.trim());
      } else {
        params.delete("name");
      }

      // 👇 فقط نحدث إذا كان هناك فرق فعلي
      const currentName = searchParams.get("name") || "";
      if (currentName !== nameInput.trim()) {
        setSearchParams(params, { replace: true });
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [nameInput, setSearchParams]);

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
    nameInput,
    setNameInput,
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
