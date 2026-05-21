import { useEffect, useRef, useState } from "react";
import { CreditCard } from "lucide-react";
import { usePostPaymentMutation } from "../../../redux/Payment/apiPayment";
import { motion, AnimatePresence } from "framer-motion";
// @ts-ignore
import "paymob-pixel";
// @ts-ignore
declare global {
  class Pixel {
    constructor(config: any);
    destroy?: () => void;
  }
}

const paymentCache = new Map<string, { clientSecret: string; publicKey: string }>();

interface PaymentData {
  amount: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  city: string;
}

export default function PaymobPayment({
  paymentData,
  onCardValidityChange,
  triggerPayRef,
  setIsPaying,
  handlePayment,
}: {
  paymentData: PaymentData;
  onCardValidityChange: (isValid: boolean) => void;
  triggerPayRef: React.MutableRefObject<(() => void) | null>;
  setIsPaying: () => void;
  handlePayment: () => void;
}) {
  const [postPayment, { isError: apiError }] = usePostPaymentMutation();

  const [clientSecret, setClientSecret] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const pixelRef = useRef<any>(null);
  const initRef = useRef(false);

  // ✅ refs للـ callbacks عشان نتجنب stale closures
  const handlePaymentRef = useRef(handlePayment);
  const setIsPayingRef = useRef(setIsPaying);
  const onCardValidityChangeRef = useRef(onCardValidityChange);

  useEffect(() => { handlePaymentRef.current = handlePayment; }, [handlePayment]);
  useEffect(() => { setIsPayingRef.current = setIsPaying; }, [setIsPaying]);
  useEffect(() => { onCardValidityChangeRef.current = onCardValidityChange; }, [onCardValidityChange]);

  // ✅ INIT PAYMENT — مرة واحدة بس
  useEffect(() => {
    if (initRef.current || !paymentData?.amount) return;
    initRef.current = true;

    const init = async () => {
      try {
        const key = JSON.stringify(paymentData);

        if (paymentCache.has(key)) {
          const cached = paymentCache.get(key)!;
          setClientSecret(cached.clientSecret);
          setPublicKey(cached.publicKey);
          setIsLoading(false);
          return;
        }

        const res = await postPayment(paymentData).unwrap();

        paymentCache.set(key, {
          clientSecret: res.clientSecret,
          publicKey: res.publicKey,
        });

        localStorage.setItem("orderPaymentId", JSON.stringify(res.orderPaymentId));

        setClientSecret(res.clientSecret);
        setPublicKey(res.publicKey);
        setIsLoading(false);
      } catch {
        setError("Unable to initialize payment.");
        setIsLoading(false);
        initRef.current = false; // ✅ خلّي إعادة المحاولة ممكنة لو فشل
      }
    };

    init();
  }, [paymentData, postPayment]);

  // ✅ PIXEL INIT — مع cleanup صح
  useEffect(() => {
    if (!clientSecret || !publicKey) return;

    // ✅ destroy الـ instance القديم لو موجود
    if (pixelRef.current?.destroy) {
      pixelRef.current.destroy();
    }

    const pixel = new Pixel({
      publicKey,
      clientSecret,
      paymentMethods: ["card"],
      elementId: "paymob-elements",
      cardNumber: ".card-number",
      cardExpiry: ".expiry",
      cardCvv: ".cvv",
      cardHolder: ".card-holder",
      disablePay: true,
      enableSpinner: false,
      redirect: false,

      customStyle: {
        Font_Family: "Cairo, sans-serif",
        Font_Size_Label: "18",
        Font_Size_Input_Fields: "18",
        Font_Size_Payment_Button: "16",
        Font_Weight_Label: 500,
        Font_Weight_Input_Fields: 500,
        Font_Weight_Payment_Button: 300,
        Color_Text: "#283618",
        Color_Text_Headings: "#283618",
        Color_Text_Payment_Button: "#FEFAE0",
        Color_Background_Input_Fields: "rgba(255, 255, 255, 0.5)",
        Color_Border_Input_Fields: "rgba(188, 108, 37, 0.3)",
        Color_Background_Payment_Button: "#BC6C25",
        Color_Primary: "#BC6C25",
        Radius_Border: "16",
        Color_Input_Fields: "rgba(255, 255, 255, 0.5)",
        Color_Border_Payment_Button: "rgba(188, 108, 37, 0.3)",
      },

      // ✅ استخدام refs بدل القيم المباشرة
      cardValidationChanged: (isValid: boolean) => {
        onCardValidityChangeRef.current(isValid);
      },

      afterPaymentComplete: async (response: any) => {
        console.log("Payment complete response:", response);
        try {
          await handlePaymentRef.current();
          setTimeout(() => setIsPayingRef.current(), 3000);
        } catch {
          setError("Order finalization failed.");
          setIsPayingRef.current();
        }
      },

      onPaymentCancel: () => {
        setError("Payment cancelled.");
        setIsPayingRef.current();
      },
    });

    pixelRef.current = pixel;

    // ✅ ربط الـ triggerPayRef هنا مباشرةً لإطلاق الدفع من الخارج
    triggerPayRef.current = () => {
      console.log("Triggering Paymob payment from outside...");
      window.dispatchEvent(new Event("payFromOutside"));
    };

    return () => {
      if (pixelRef.current?.destroy) {
        pixelRef.current.destroy();
      }
      pixelRef.current = null;
      triggerPayRef.current = null;
    };
  }, [clientSecret, publicKey]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="w-3 h-3 rounded-full bg-black animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error || apiError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-3xl">
        <p className="text-red-700 text-center font-bold">
          {error || "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key="payment"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-6 rounded-3xl bg-white/40 backdrop-blur-xl shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <CreditCard />
            <h2 className="text-xl font-bold">Card Payment</h2>
          </div>
          <div id="paymob-elements" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}