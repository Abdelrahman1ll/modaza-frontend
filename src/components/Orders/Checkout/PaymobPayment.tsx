import { useEffect, useRef, useState } from "react";
import { CreditCard, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import { usePostPaymentMutation } from "../../../redux/Payment/apiPayment";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ==========================================================================================
 * COMPONENT: PaymobPayment
 * DESCRIPTION: Handles the Paymob iframe integration, payment status tracking, and 3DS redirects.
 * ==========================================================================================
 */

const paymentCache = new Map<
  string,
  { clientSecret: string; publicKey: string }
>();

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
  // --- Refs & States ---
  const effectRan = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [postPayment, { isError: apiError }] = usePostPaymentMutation();
  const [clientSecret, setClientSecret] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "processing" | "success" | "failed"
  >("idle");


  /**
   * SECTION: Payment Initialization
   * ACTION: Fetches clientSecret and publicKey from the backend or cache.
   */
  useEffect(() => {
    if (effectRan.current) return;

    const initPayment = async () => {
      try {
        const cacheKey = JSON.stringify(paymentData);
        if (paymentCache.has(cacheKey)) {
          const cached = paymentCache.get(cacheKey)!;
          setClientSecret(cached.clientSecret);
          setPublicKey(cached.publicKey);
          setIsLoading(false);
          return;
        }

        const res = await postPayment(paymentData).unwrap();

        setClientSecret(res.clientSecret);
        setPublicKey(res.publicKey);

        paymentCache.set(cacheKey, {
          clientSecret: res.clientSecret,
          publicKey: res.publicKey,
        });

        localStorage.setItem(
          "orderPaymentId",
          JSON.stringify(res.orderPaymentId),
        );

        setIsLoading(false);
      } catch {
        setError("Unable to initialize payment.");
        setIsLoading(false);
      }
    };

    if (paymentData?.amount > 0) initPayment();
    effectRan.current = true;
  }, [paymentData, postPayment]);


  /**
   * SECTION: Iframe Message Handling
   * ACTION: Listens for status updates from the Paymob Pixel SDK inside the iframe.
   */
  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      let data = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (data.type === "PAYMENT_STARTED") {
        setPaymentStatus("processing");
      }

      if (data.type === "CARD_VALID") {
        onCardValidityChange(data.isValid);
      }

      if (data.result === "SUCCESS") {
        try {
          await handlePayment();
          setPaymentStatus("success");
          onCardValidityChange(false);
          // Wait 3 seconds before clearing the checkout state so user can see success
          setTimeout(() => {
            setIsPaying();
          }, 3000);
        } catch {
          setPaymentStatus("failed");
          setError("Order finalization failed.");
        }
      }

      if (data.result === "ERROR") {
        setPaymentStatus("failed");
        setError(data.error?.message || "Payment failed. Please try again.");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handlePayment, onCardValidityChange, setIsPaying]);


  /**
   * SECTION: External Trigger
   * ACTION: Allows the parent component (Checkout) to trigger the payment button inside the iframe.
   */
  useEffect(() => {
    triggerPayRef.current = () => {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (!iframeWindow) return;
      setPaymentStatus("processing");
      iframeWindow.dispatchEvent(new Event("payFromOutside"));
    };
  }, [triggerPayRef]);


  /**
   * SECTION: Render Helpers
   */
  const renderLoadingDots = (size = "w-3 h-3") => (
    <div className="flex gap-2">
      {[...Array(4)].map((_, i) => (
        <span
          key={i}
          className={`${size} rounded-full bg-(--color-tiger) animate-dot`}
          style={{ animationDelay: `${i * 0.15}s` }}
        ></span>
      ))}
    </div>
  );


  /**
   * SECTION: Main Conditional Rendering
   */

  // --- 1. Initial Loading State ---
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        {renderLoadingDots()}
      </div>
    );
  }

  // --- 2. Error State (Initialization) ---
  if ((error && paymentStatus === "idle") || apiError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-3xl">
        <p className="text-red-700 text-center font-bold">
          {error || "Something went wrong"}
        </p>
      </div>
    );
  }

  // --- 3. Main Payment Flow ---
  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {/* State A: Idle / Form View */}
        {paymentStatus === "idle" ? (
          <motion.div
            key="payment-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-2 md:p-4 sm:p-6 rounded-3xl shadow-xl bg-white/40 backdrop-blur-xl border border-white/60 hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-2xl bg-(--color-pakistan)/5 text-(--color-pakistan)">
                <CreditCard size={24} />
              </div>
              <h2 className="text-2xl font-black text-(--color-pakistan)">
                Card Selection
              </h2>
            </div>

            <iframe
              ref={iframeRef}
              key={clientSecret + publicKey}
              style={{ width: "100%", height: "315px", border: "none" }}
              srcDoc={`
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <script type="module" src="https://cdn.jsdelivr.net/npm/paymob-pixel@latest/main.js"></script>
</head>
<body>
  <div id="paymob-elements">
    <label class="main-label">Card Information</label>
    <div class="field-container"><div class="card-number"></div></div>
    <div class="row">
      <div class="field-container"><div class="expiry"></div></div>
      <div class="field-container"><div class="cvv"></div></div>
    </div>
    <div class="field-container"><div class="card-holder"></div></div>
  </div>

  <script type="module">
    const pixel = new Pixel({
      publicKey: "${publicKey}",
      clientSecret: "${clientSecret}",
      paymentMethods: ["card"],
      elementId: "paymob-elements",
      cardNumber: ".card-number",
      cardExpiry: ".expiry",
      cardCvv: ".cvv",
      cardHolder: ".card-holder",
      disablePay: true,
      enableSpinner: false,
      redirect: true,
      redirectUrl: "${window.location.origin}/orders",
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
      cardValidationChanged: (isValid) => {
        window.parent.postMessage({ type: "CARD_VALID", isValid }, "*");
      },
      onSuccess: (data) => {
        window.parent.postMessage({ result: "SUCCESS", data }, "*");
      },
      onFailure: (error) => {
        window.parent.postMessage({ result: "ERROR", error }, "*");
      }
    });

    window.addEventListener("payFromOutside", () => {
      const btn = document.querySelector("#paymob-elements button");
      if (btn) {
        window.parent.postMessage({ type: "PAYMENT_STARTED" }, "*");
        btn.click();
      }
    });
  </script>
</body>
</html>
`}
            />
          </motion.div>
        ) : paymentStatus === "processing" ? (
          /* State B: Processing View */
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="flex flex-col items-center justify-center p-12 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl min-h-[350px]"
          >
            <div className="mb-8">{renderLoadingDots("w-4 h-4")}</div>
            <h2 className="text-3xl font-black text-(--color-pakistan) mb-3">
              Processing...
            </h2>
            <p className="text-(--color-pakistan)/60 font-bold text-center max-w-xs">
              Securely processing your payment. Please do not refresh the page.
            </p>
          </motion.div>
        ) : paymentStatus === "success" ? (
          /* State C: Success View */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl min-h-[350px]"
          >
            <div className="relative mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, stiffness: 200 }}
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
              >
                <CheckCircle2 size={56} className="text-white" />
              </motion.div>
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-green-500 rounded-full -z-10"
              />
            </div>
            <h2 className="text-3xl font-black text-(--color-pakistan) mb-3">
              Payment Success!
            </h2>
            <p className="text-(--color-pakistan)/60 font-bold text-center">
              Your order has been placed successfully.
            </p>
          </motion.div>
        ) : (
          /* State D: Failed View */
           <motion.div
            key="failed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 bg-white/40 backdrop-blur-xl border border-white/60 rounded-3xl shadow-xl min-h-[350px]"
          >
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-red-100/30">
              <XCircle size={56} className="text-red-500" />
            </div>
            <h2 className="text-3xl font-black text-(--color-pakistan) mb-3">
              Payment Failed
            </h2>
            <p className="text-(--color-pakistan)/60 font-bold text-center mb-10 max-w-xs">
              {error || "Something went wrong with your transaction."}
            </p>
            <button
              onClick={() => {
                setPaymentStatus("idle");
                setError(null);
                setIsPaying(); // This sets isPaying to false in parent to re-enable the button
              }}
              className="flex items-center gap-2 px-10 py-4 bg-(--color-tiger) text-white font-black rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              <RefreshCw size={20} />
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
