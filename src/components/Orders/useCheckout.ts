import { useGetCartQuery } from "../../redux/Cart/apiCart";
import { useNavigate } from "react-router-dom";
import { usePostUserDiscountCodesMutation } from "../../redux/DiscountCodes/apiDiscountCodes";
import { useGetDeliveryQuery } from "../../redux/Delivery/apiDelivery";
import { usePostOrdersMutation } from "../../redux/Orders/apiOrders";
import { toast } from "react-toastify";
import { useState } from "react";
export default function useCheckout() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [state, setState] = useState("");
  const [addressDetails, setAddressDetails] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [code, setCode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [openSection, setOpenSection] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    state: "",
    addressDetails: "",
    phone1: "",
    phone2: "",
    paymentMethod: "",
  });

  const { data, isLoading } = useGetCartQuery({});
  const { data: delivery } = useGetDeliveryQuery({});
  const [postUserDiscountCodes] = usePostUserDiscountCodesMutation();
  const [postOrders, { isLoading: orderLoading }] = usePostOrdersMutation();

  const deliveryFee: number = delivery?.deliveries[0]?.deliveryPrice;
  let total: number = data?.carts?.total;
  if (discount > 0) {
    total = total - (total * discount) / 100;
  }
  const finalTotal: number = total + deliveryFee;

  const applyDiscount = async () => {
    try {
      const response = await postUserDiscountCodes({
        code: promoCode,
      }).unwrap();
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
    if (!paymentMethod)
      newErrors.paymentMethod = "Please select a payment method";

    setErrors(newErrors);

    if (
      newErrors.firstName ||
      newErrors.lastName ||
      newErrors.state ||
      newErrors.addressDetails ||
      newErrors.phone1 ||
      newErrors.phone2 ||
      newErrors.paymentMethod
    ) {
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
      setFirstName("");
      setLastName("");
      setState("");
      setAddressDetails("");
      setPhone1("");
      setPhone2("");
      setPaymentMethod("");
      setCode("");
      toast.success("Order placed successfully");
      setTimeout(() => {
        navigate("/orders");
      }, 2000);
    } catch {
      toast.error("Error placing order");
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
  };
}
