import { useEffect, useRef, useState } from "react";
import { usePostPaymentMutation } from "../../redux/Payment/apiPayment";
declare global {
  interface Window {
    Pixel: any;
  }
}

const paymentCache = new Map<
  string,
  { clientSecret: string; publicKey: string }
>();

function PaymobCheckout({ paymentData }: any) {
  const effectRan = useRef(false);
  const [postPayment, { isError: apiError }] = usePostPaymentMutation();
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const pixelRef = useRef<any>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (effectRan.current) return;
    async function initPayment() {
      try {
        const cacheKey = JSON.stringify(paymentData);

        // 🔥 1) CHECK CACHE FIRST
        if (paymentCache.has(cacheKey)) {
          const cached = paymentCache.get(cacheKey)!;
          setClientSecret(cached.clientSecret);
          setPublicKey(cached.publicKey);
          setIsLoading(false);
          return;
        }

        const res = await postPayment({ ...paymentData }).unwrap();
        setClientSecret(res.clientSecret);
        setPublicKey(res.publicKey);

        paymentCache.set(cacheKey, {
          clientSecret: res.clientSecret,
          publicKey: res.publicKey,
        });
      } catch (err) {
        setError("An error occurred. Please try again.");
        setIsLoading(false);
      }
    }

    if (paymentData?.amount > 0) initPayment();

    effectRan.current = true;
  }, [paymentData]);

  useEffect(() => {
    if (!publicKey || !clientSecret) return;

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/paymob-pixel@latest/main.js";
    script.type = "module";
    script.async = true;

    script.onload = () => {
      intervalRef.current = window.setInterval(() => {
        if (!window.Pixel) return;

        // وجدنا Pixel -> نوقف الانتظار
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        try {
          const instance = new window.Pixel({
            publicKey,
            clientSecret,
            paymentMethods: ["card"],
            disablePay: true,
            elementId: "paymob-elements",
            forceIframe: true,
            iframeMode: true,
            redirect: false,
            openInNewTab: false,
            resizeObserver: true,
            displayMode: "embedded",
            enableSpinner: true,
            onLoadingStart: () => setIsLoading(true),
            onLoadingEnd: () => setIsLoading(false),

            customStyle: {
              /* ====== FONT ====== */
              Font_Family: "Cairo, sans-serif",
              Font_Size_Label: "18",
              Font_Size_Input_Fields: "18",
              Font_Size_Payment_Button: "16",

              Font_Weight_Label: 500,
              Font_Weight_Input_Fields: 500,
              Font_Weight_Payment_Button: 300,

              /* ===== COLORS ===== */
              Color_Text: "#283618",
              Color_Text_Headings: "#283618",
              Color_Text_Payment_Button: "#FEFAE0",

              Color_Background_Input_Fields: "#FEFAE0",
              Color_Border_Input_Fields: "#BC6C25",
              Color_Background_Payment_Button: "#BC6C25",
              Color_Primary: "#BC6C25",

              /* ===== BORDER ===== */
              Radius_Border: "12",
            },
          });

          pixelRef.current = instance;

          setIsLoading(false);
        } catch (err) {
          setError("Payment system loading failed");
          setIsLoading(false);
        }
      }, 50);
    };

    script.onerror = () => {
      setError("Payment script failed to load");
      setIsLoading(false);
    };

    document.body.appendChild(script);
  }, [publicKey, clientSecret, postPayment]);

  return (
    <div className="w-full h-full mb-4">
      {/* عرض حالة التحميل */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-15 h-15 border-6 border-gray-300 border-t-(--color-tiger) rounded-full animate-spin"></div>
        </div>
      ) : error || apiError ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-2">
          <p className="text-red-800 text-center font-medium">
            {error || "An error occurred. Please try again."}
          </p>
        </div>
      ) : (
        <div
          id="paymob-elements"
          className="h-[250px] md:h-full w-full bg-(--color-earth)/10 rounded-lg shadow-sm border border-(--color-tiger) p-1 md:p-4"
          style={{
            overflow: "hidden",
            position: "relative",
          }}
        ></div>
      )}
    </div>
  );
}
export default PaymobCheckout;
