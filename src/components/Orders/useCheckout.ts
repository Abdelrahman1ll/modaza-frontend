import { useGetCartQuery } from "../../redux/Cart/apiCart";
import { useNavigate } from "react-router-dom";
import { usePostValidateDiscountCodeMutation } from "../../redux/DiscountCodes/apiDiscountCodes";
import { useGetDeliveryQuery } from "../../redux/Delivery/apiDelivery";
import {
  useGetUserOrdersQuery,
  usePostOrdersMutation,
} from "../../redux/Orders/apiOrders";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import egyptGovernorates from "../../data/egyptGovernorates.json";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import ttsMP3 from "/ttsMP3.com_VoiceText_2025-11-19_2-28-51.mp3";
const audio = new Audio(ttsMP3);
const close = [
  "Cairo",
  "Giza",
  "Qalyubia",
  "Gharbia",
  "Monufia",
  "Dakahlia",
  "Sharqia",
  "Beheira",
  "Kafr El Sheikh",
  "Fayoum",
  "Beni Suef",
  "Ismailia",
  "Suez",
  "Damietta",
  "Port Said",
];
const farAway = [
  "Alexandria",
  "Matruh",
  "Red Sea",
  "New Valley",
  "North Sinai",
  "South Sinai",
  "Minya",
  "Asyut",
  "Sohag",
  "Qena",
  "Luxor",
  "Aswan",
];
export default function useCheckout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [email, setEmail] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openSection, setOpenSection] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    state: "",
    addressDetails: "",
    phone1: "",
    phone2: "",
    paymentMethod: "",
  });
  const secretKey = import.meta.env.VITE_SECRET_KEY;
  useEffect(() => {
    const encryptedUser = Cookies.get("user");
    if (encryptedUser) {
      const decryptedUser = CryptoJS.AES.decrypt(
        encryptedUser,
        secretKey
      ).toString(CryptoJS.enc.Utf8);

      const user = JSON.parse(decryptedUser);
      setEmail(user?.user?.email);
    }
  }, [secretKey]);

  const { data, isLoading } = useGetCartQuery({});
  const { data: delivery } = useGetDeliveryQuery({});
  const [validateDiscountCode] = usePostValidateDiscountCodeMutation();
  const [postOrders, { isLoading: orderLoading }] = usePostOrdersMutation();
  const { refetch } = useGetUserOrdersQuery({});
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const Validate = () => {
    const newErrors: typeof errors = { ...errors };
    if (!firstName) newErrors.firstName = "Please enter your first name";
    if (!lastName) newErrors.lastName = "Please enter your last name";
    if (!state) newErrors.state = "Please select your state or city";
    if (!addressDetails)
      newErrors.addressDetails = "Please enter address details";
    if (!phone1) {
      newErrors.phone1 = "Please enter your phone number";
    } else if (!/^01[0125][0-9]{8}$/.test(phone1)) {
      newErrors.phone1 = "Please enter a valid Egyptian phone number";
    }
    if (phone2 && !/^01[0125][0-9]{8}$/.test(phone2)) {
      newErrors.phone2 = "Please enter a valid Egyptian phone number";
    }

    setErrors(newErrors);

    const isValid = !(
      newErrors.firstName ||
      newErrors.lastName ||
      newErrors.state ||
      newErrors.addressDetails ||
      newErrors.phone1 ||
      newErrors.phone2
    );

    return isValid;
  };
  useEffect(() => {
    const saved = localStorage.getItem("checkoutAddress");
    if (saved) {
      const data = JSON.parse(saved);
      setFirstName(data.firstName || "");
      setLastName(data.lastName || "");
      setState(data.state || "");
      setAddressDetails(data.addressDetails || "");
      setPhone1(data.phone1 || "");
      setPhone2(data.phone2 || "");
      setSaveAddress(true); // لو فيه بيانات محفوظة → يكون مربع الاختيار مفعل
    }
  }, []);

  useEffect(() => {
    if (saveAddress) {
      const isValid = Validate();
      if (!isValid) return;
      localStorage.setItem(
        "checkoutAddress",
        JSON.stringify({
          firstName,
          lastName,
          state,
          addressDetails,
          phone1,
          phone2,
        })
      );
    } else {
      localStorage.removeItem("checkoutAddress");
    }
  }, [saveAddress, firstName, lastName, state, addressDetails, phone1, phone2]);

  const filteredStates = egyptGovernorates.filter((gov) =>
    gov.toLowerCase().includes(search.toLowerCase())
  );
  const deliveryData = delivery?.deliveries?.find((d: any) => d.id === 1);
  const isFirstOrder: boolean = data?.carts?.thIsIsYourFirstOrder;
  const freeDelivery: boolean = deliveryData?.freeDelivery;
  useEffect(() => {
    if (isFirstOrder || freeDelivery) {
      setDeliveryFee(0);
      return;
    }
    if (!deliveryData) return;
    if (close.includes(state)) {
      setDeliveryFee(deliveryData.deliveryPriceClose);
    } else if (farAway.includes(state)) {
      setDeliveryFee(deliveryData.deliveryPriceFar);
    } else {
      setDeliveryFee(deliveryData.deliveryPriceClose);
    }
  }, [state, deliveryData]);

  let total: number = data?.carts?.total;

  if (discount > 0) {
    if (errorMsg) {
      total = total;
    } else {
      total = total - (total * discount) / 100;
    }
  }
  const finalTotal: number = total + deliveryFee;

  const applyDiscount = async () => {
    try {
      const response = await validateDiscountCode({
        code: promoCode,
      }).unwrap();
      if (response?.discountCode.code === "PROFILE") {
        const isUsed = localStorage.getItem("usedProfile") === "true";
        if (isUsed) {
          setDiscount(0);
          setCode("");
          setErrorMsg("The PROFILE code has already been used");
          return;
        }
      }

      setDiscount(response?.discountCode?.discount);
      setCode(response?.discountCode?.code);

      setErrorMsg("");
    } catch (error: any) {
      setErrorMsg(error.data.message);
    }
  };

  const handleSelectMethod = (method: string) => {
    setOpenSection((prev) => {
      if (prev === method) {
        // لو ضغط على نفس الوسيلة → يقفل ومفيش وسيلة مختارة
        setPaymentMethod("");
        setErrors((e) => ({ ...e, paymentMethod: "" })); // امسح الخطأ
        return "";
      } else {
        // لو اختار وسيلة جديدة
        setPaymentMethod(method);
        setErrors((e) => ({ ...e, paymentMethod: "" })); // امسح الخطأ
        return method;
      }
    });
  };

  const handlePayment = async () => {
    const isValid = Validate();
    if (!isValid) return;
    if (!paymentMethod) {
      setErrors({ ...errors, paymentMethod: "Please select a payment method" });
      return;
    }

    if (data?.carts?.items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      await postOrders({
        cart: data?.carts?.id,
        discountCode: code ? code : null,
        addresses: {
          fullName: firstName,
          lastName: lastName,
          address: addressDetails,
          city: state,
          country: "Egypt",
          phone: phone1,
          phoneOptional: phone2,
        },
        paymentMethod: paymentMethod,
      }).unwrap();
      if (code && code === "PROFILE") {
        localStorage.setItem("usedProfile", "true");
      }

      setPaymentMethod("");
      setCode("");
      toast.success("Order placed successfully");
      audio.play();
      setTimeout(() => {
        navigate("/orders");
      }, 200);
      refetch();
    } catch (error: any) {
      if (error?.data?.message === "Discount code already used for PROFILE") {
        localStorage.setItem("usedProfile", "true");
        setErrorMsg("The PROFILE code has already been used");
        setDiscount(0);
        setCode("");
        return;
      } else if (
        error?.data?.message === "Discount code already used for BIRTHDAY"
      ) {
        setErrorMsg("The BIRTHDAY code has already been used");
        setDiscount(0);
        setCode("");
        return;
      }
      toast.error(error?.data?.message || "Error placing order");
    }
  };

  return {
    discount,
    errorMsg,
    openSection,
    errors,
    applyDiscount,
    handleSelectMethod,
    handlePayment,
    deliveryFee,
    finalTotal,
    setPromoCode,
    isLoading,
    orderLoading,
    paymentMethod,
    promoCode,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    state,
    setState,
    addressDetails,
    setAddressDetails,
    phone1,
    setPhone1,
    phone2,
    setPhone2,
    data,
    setErrors,
    navigate,
    isFirstOrder,
    filteredStates,
    setSearch,
    setOpen,
    open,
    search,
    saveAddress,
    setSaveAddress,
    email,
  };
}
