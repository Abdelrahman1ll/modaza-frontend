import { useState } from "react";
import {
  useUsersCheckEmailMutation,
  usePostUsersMutation,
} from "../../redux/users/apiUsers";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import ttsMP3 from "../../../public/ttsMP3.com_VoiceText_2025-11-19_3-39-49.mp3";

const audio = new Audio(ttsMP3);
export default function useSignup(onClose: () => void) {
  const [email, setEmail] = useState<string>("");
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [checkEmail, { isLoading }] = useUsersCheckEmailMutation();
  const [postUser, { isLoading: isLoadingUser }] = usePostUsersMutation();
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await checkEmail({ email }).unwrap();
      if (response) {
        await localStorage.setItem("email", email);
        setEmail("");
        setShowCodeInput(true);
        console.log(response);
      }
    } catch {
      toast.error("Error checking email");
      setShowCodeInput(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        const nextInput = document.getElementById(
          `code-${index + 1}`
        ) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);

      if (index > 0) {
        const prevInput = document.getElementById(
          `code-${index - 1}`
        ) as HTMLInputElement;
        prevInput?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").slice(0, 6);
    const newCode = pasteData.split("");
    setCode((prev) => {
      const updated = [...prev];
      for (let i = 0; i < updated.length; i++) {
        updated[i] = newCode[i] || "";
      }
      return updated;
    });

    // وضع التركيز على آخر مربع تم لصقه
    const lastIndex = Math.min(newCode.length, code.length - 1);
    const lastInput = document.getElementById(
      `code-${lastIndex}`
    ) as HTMLInputElement;
    lastInput?.focus();
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = code.join("");
    const numericCode = Number(enteredCode);
    if (isNaN(numericCode) || enteredCode.length !== 6)
      return toast.error("Invalid code");
    const emailStorage = localStorage.getItem("email");
    if (!emailStorage) return toast.error("Email not found");

    try {
      const response = await postUser({
        email: emailStorage,
        code: numericCode,
      }).unwrap();

      if (response) {
        const secretKey = import.meta.env.VITE_SECRET_KEY;
        const encryptedUser = CryptoJS.AES.encrypt(
          JSON.stringify(response),
          secretKey
        ).toString();
        Cookies.set("user", encryptedUser, {
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
          secure: import.meta.env.VITE_NODE_ENV === "production" ? true : false,
          sameSite: "strict",
          path: "/",
        });

        toast.success("Signup successfully");
        audio.play();
        onClose();
        setCode(["", "", "", "", "", ""]);
        localStorage.removeItem("email");
      }
    } catch {
      toast.error("Invalid code");
    }
  };

  return {
    email,
    setEmail,
    showCodeInput,
    code,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleVerifyCode,
    handleSignup,
    isLoading,
    isLoadingUser,
  };
}
