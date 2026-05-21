import { useGetCartQuery } from "../../../redux/Cart/apiCart";
import { useNavigate } from "react-router-dom";
import { usePostValidateDiscountCodeMutation } from "../../../redux/DiscountCodes/apiDiscountCodes";
import { useGetDeliveryQuery } from "../../../redux/Delivery/apiDelivery";
import {
  useGetUserOrdersQuery,
  usePostOrdersMutation,
} from "../../../redux/Orders/apiOrders";
import { toast } from "react-toastify";
import { useEffect, useRef, useState, useCallback, useContext } from "react";
import egyptGovernorates from "../../../data/egyptGovernorates.json";
import { AuthContext } from "../../../context/AuthContext";
import { EGYPTIAN_PHONE_REGEX } from "../../../utils/validators";
import { detectUserGovernorate } from "../../../utils/location";
import ttsMP3 from "/ttsMP3.com_VoiceText_2025-11-19_2-28-51.mp3";
import type { Variants } from "framer-motion";

/**
 * ==========================================================================================
 * HOOK: useCheckout
 * DESCRIPTION: Manages the complex multi-step checkout process, including address detection,
 *              promo codes, delivery calculations, and order submission.
 * ==========================================================================================
 */

// --- Constants: Delivery Groups ---
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
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- 1. Form Input States ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");

  // --- 2. Promo & Discount States ---
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // --- 3. UI & Navigation States ---
  const [paymentMethod, setPaymentMethod] = useState("");
  const [openSection, setOpenSection] = useState(""); // Which checkout section is expanded
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Governorate dropdown
  const [search, setSearch] = useState(""); // Search term for governorates
  const [saveAddress, setSaveAddress] = useState(false); // Should address be saved locally?
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // --- 4. Process & Payment States ---
  const [isCardValid, setIsCardValid] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const payRef = useRef<(() => void) | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Ref for governorate dropdown | مرجع لقائمة المحافظات

  // --- 5. Error Tracking ---
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    state: "",
    addressDetails: "",
    phone1: "",
    phone2: "",
    paymentMethod: "",
  });

  /**
   * SECTION: Data Fetching (Redux)
   */
  const { data, isLoading } = useGetCartQuery(undefined);
  const { data: delivery } = useGetDeliveryQuery(undefined);
  const [validateDiscountCode] = usePostValidateDiscountCodeMutation();
  const [postOrders, { isLoading: orderLoading }] = usePostOrdersMutation();
  const { refetch } = useGetUserOrdersQuery(undefined);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [deliveryFee, setDeliveryFee] = useState(0);
  const [rawDeliveryFee, setRawDeliveryFee] = useState(0);

  /**
   * SECTION: Form Validation
   */
  const checkIsValid = useCallback(() => {
    const isFirstNameValid = !!firstName;
    const isLastNameValid = !!lastName;
    const isStateValid = !!state;
    const isAddressValid = !!addressDetails;
    const isPhone1Valid = !!(phone1 && EGYPTIAN_PHONE_REGEX.test(phone1));
    const isPhone2Valid = !phone2 || EGYPTIAN_PHONE_REGEX.test(phone2);

    return (
      isFirstNameValid &&
      isLastNameValid &&
      isStateValid &&
      isAddressValid &&
      isPhone1Valid &&
      isPhone2Valid
    );
  }, [firstName, lastName, state, addressDetails, phone1, phone2]);

  const Validate = () => {
    const newErrors: typeof errors = { ...errors };
    if (!firstName) newErrors.firstName = "Please enter your first name";
    if (!lastName) newErrors.lastName = "Please enter your last name";
    if (!state) newErrors.state = "Please select your state or city";
    if (!addressDetails)
      newErrors.addressDetails = "Please enter address details";

    if (!phone1) {
      newErrors.phone1 = "Please enter your phone number";
    } else if (!EGYPTIAN_PHONE_REGEX.test(phone1)) {
      newErrors.phone1 = "Please enter a valid Egyptian phone number";
    }

    if (phone2 && !EGYPTIAN_PHONE_REGEX.test(phone2)) {
      newErrors.phone2 = "Please enter a valid Egyptian phone number";
    }

    setErrors(newErrors);
    return checkIsValid();
  };

  /**
   * SECTION: Location & Address Logic
   */

  // 1. Sync user email
  useEffect(() => {
    if (user) setEmail(user.email);
  }, [user]);

  // 2. Auto-Detect Location
  const handleAutoLocation = useCallback(async () => {
    setIsDetectingLocation(true);
    try {
      const result = await detectUserGovernorate();
      if (result && result.state) {
        setState(result.state);
        setErrors((prev) => ({ ...prev, state: "" }));
      }
    } finally {
      setIsDetectingLocation(false);
    }
  }, []);

  // 3. Load Saved Address from LocalStorage
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
      setSaveAddress(true);
    } else {
      handleAutoLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 4. Persistence Effect
  useEffect(() => {
    if (saveAddress) {
      const isValid = checkIsValid();
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
        }),
      );
    } else {
      localStorage.removeItem("checkoutAddress");
    }
  }, [
    saveAddress,
    checkIsValid,
    firstName,
    lastName,
    state,
    addressDetails,
    phone1,
    phone2,
  ]);

  /**
   * SECTION: Pricing & Calculations
   */
  const deliveryData = delivery?.deliveries?.find(
    (d: { id: number }) => d.id === 1,
  );
  const isFirstOrder: boolean = data?.carts?.thIsIsYourFirstOrder;
  const freeDelivery: boolean = deliveryData?.freeDelivery;

  const PROFILE: boolean = data?.carts?.user.PROFILE;
  const BIRTHDAY: boolean = data?.carts?.user.BIRTHDAY;
  const LIGHTMASTER: boolean = data?.carts?.user.LIGHTMASTER;

  const subtotal = data?.carts?.total || 0;
  const discountAmount = (subtotal * discount) / 100;
  const finalTotal = subtotal - discountAmount + deliveryFee;

  const filteredStates = egyptGovernorates.filter((gov) =>
    gov.toLowerCase().includes(search.toLowerCase()),
  );

  // Delivery Fee Calculation
  useEffect(() => {
    if (!deliveryData) return;

    let fee = 0;
    if (close.includes(state)) {
      fee = deliveryData.deliveryPriceClose;
    } else if (farAway.includes(state)) {
      fee = deliveryData.deliveryPriceFar;
    } else {
      fee = deliveryData.deliveryPriceClose;
    }

    setRawDeliveryFee(fee);
    setDeliveryFee(isFirstOrder || freeDelivery ? 0 : fee);
  }, [state, deliveryData, isFirstOrder, freeDelivery]);

  /**
   * SECTION: Payment & Order Actions
   */

  const applyDiscount = async () => {
    try {
      const response = await validateDiscountCode({ code: promoCode }).unwrap();

      if (response?.discountCode.code === "PROFILE" && PROFILE === false) {
        setDiscount(0);
        setErrorMsg("The PROFILE code has already been used");
        return;
      }
      if (response?.discountCode.code === "BIRTHDAY" && BIRTHDAY === false) {
        setDiscount(0);
        setErrorMsg("The BIRTHDAY code has already been used");
        return;
      }
      if (
        response?.discountCode.code === "LIGHTMASTER" &&
        LIGHTMASTER === false
      ) {
        setDiscount(0);
        setErrorMsg("The LIGHTMASTER code has already been used");
        return;
      }

      setDiscount(response?.discountCode?.discount);
      setCode(response?.discountCode?.code);
      setErrorMsg("");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      setErrorMsg(err?.data?.message || "Error applying discount");
    }
  };

  const handleSelectMethod = (method: string) => {
    setOpenSection((prev) => {
      const next = prev === method ? "" : method;
      setPaymentMethod(next);
      setErrors((e) => ({ ...e, paymentMethod: "" }));
      return next;
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
        paymentId:
          paymentMethod === "credit_card"
            ? Number(localStorage.getItem("orderPaymentId"))
            : 0,
      }).unwrap();

      setPaymentMethod("");
      setCode("");
      setIsOrderCompleted(true);
      toast.success("Order placed successfully");

      if (paymentMethod === "credit_card") {
        localStorage.removeItem("orderPaymentId");
      }

      setTimeout(() => navigate("/orders"), 500);

      try {
        audio.play().catch(() => {});
      } catch (e) {}

      refetch();
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      if (err?.data?.message?.includes("already used")) {
        setErrorMsg(err.data.message);
        setDiscount(0);
        setCode("");
        return;
      }
      toast.error(err?.data?.message || "Error placing order");
    }
  };

  /**
   * SECTION: Additional Utilities
   */
  const instapayLink = "https://ipn.eg/S/qkpfg201065217980/instapay/1DfXwF";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(instapayLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Auto-redirect if cart is empty
  useEffect(() => {
    if (!isLoading && !isOrderCompleted && data?.carts?.items.length === 0) {
      navigate("/cart");
    }
  }, [data, isLoading, navigate, isOrderCompleted]);

  /**
   * SECTION: UI Variants & Classes
   */
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardClasses =
    "p-4 md:p-6 sm:p-8 rounded-3xl shadow-xl bg-white/40 backdrop-blur-xl border border-white/60 hover:shadow-2xl transition-all duration-300";
  const labelClasses =
    "block text-sm font-bold mb-2 ml-1 text-(--color-pakistan)";
  const inputClasses =
    "w-full px-4 py-3 rounded-2xl border border-(--color-earth)/30 focus:border-(--color-tiger) focus:ring-4 focus:ring-(--color-tiger)/10 transition-all outline-none text-(--color-pakistan) bg-white/50 placeholder:text-(--color-dark)/40";

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
    setIsDropdownOpen,
    isDropdownOpen,
    search,
    saveAddress,
    setSaveAddress,
    email,
    isCardValid,
    setIsCardValid,
    setIsPaying,
    isPaying,
    payRef,
    isDetectingLocation,
    handleAutoLocation,
    rawDeliveryFee,
    freeDelivery,
    isOrderCompleted,
    instapayLink,
    handleCopyLink,
    isCopied,
    containerVariants,
    itemVariants,
    cardClasses,
    labelClasses,
    inputClasses,
    dropdownRef,
  };
}
