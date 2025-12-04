import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    Pixel: any;
  }
}

interface PaymobPixelProps {
  publicKey: string;
  clientSecret: string;
  handlePayment: () => Promise<void>;
}

function PaymobPixel({
  publicKey,
  clientSecret,
  handlePayment,
}: PaymobPixelProps) {
  const pixelRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!publicKey || !clientSecret) {
      setError("Missing Paymob publicKey or clientSecret");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/paymob-pixel@latest/main.js";

    script.type = "module";
    script.async = true;

    script.onload = () => {
      const wait = setInterval(() => {
        if (!window.Pixel) return;
        clearInterval(wait);

        try {
          const instance = new window.Pixel({
            publicKey,
            clientSecret,
            paymentMethods: ["card"],
            elementId: "paymob-elements",

            disablePay: true,
            forceIframe: true,
            iframeMode: true,
            openInNewTab: false,

            redirect: false,

            displayMode: "embedded",

            resizeObserver: true,
            afterPaymentComplete: async () => {
              await handlePayment();
            },

            onSuccess: () => {
              setError(null);
            },

            onError: () => {
              setError("An error occurred in the payment process.");
            },

            customStyle: {
              Font_Family: "Cairo, sans-serif",
              Font_Size_Label: "18",
              Font_Size_Input_Fields: "18",
              Font_Size_Payment_Button: "16",
              Font_Weight_Label: 400,
              Font_Weight_Input_Fields: 400,
              Font_Weight_Payment_Button: 600,
              Color_Border_Input_Fields: "#BC6C25",
              Radius_Border: "12",
              Color_Primary: "#BC6C25",
              Color_Text: "#283618",
              Color_Text_Headings: "#283618",
              Color_Text_Payment_Button: "#fff",
              Color_Background_Payment_Button: "#BC6C25",
              Color_Background_Input_Fields: "#BC6C25",
            },
          });


          pixelRef.current = instance;
          setIsLoading(false);
        } catch (err) {
          setError("Payment system loading failed");
          setIsLoading(false);
        }

        script.onerror = () => {
          setError("Payment script failed to load");
          setIsLoading(false);
        };

        document.body.appendChild(script);

        return () => {
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
        };
      }, 50);
    };

    script.onerror = () => {
      setError("Payment script failed to load");
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [publicKey, clientSecret, handlePayment]);

  return (
    <div className="w-full h-[360px] md:h-[350px]">
      {/* عرض حالة التحميل */}
      {isLoading && (
        <div className="flex items-center justify-center p-8 bg-(--color-earth)/10 rounded-lg">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-(--color-tiger) border-t-transparent rounded-full animate-spin"></div>
            <p className="text-(--color-tiger) text-center font-medium">
              <div className="flex items-center justify-center h-64">
                <div className="w-15 h-15 border-6 border-(--color-tiger) border-t-(--color-tiger) rounded-full animate-spin"></div>
              </div>
            </p>
          </div>
        </div>
      )}

      {/* عرض الأخطاء */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-2">
          <p className="text-red-800 text-center font-medium">{error}</p>
        </div>
      )}

      {/* الحاوية الرئيسية للدفع */}
      <div
        id="paymob-elements"
        className="min-h-[300px] w-full bg-(--color-earth)/10 rounded-lg shadow-sm border border-(--color-tiger) p-4"
        style={{
          overflow: "hidden",
          position: "relative",
        }}
      ></div>
    </div>
  );
}

export default PaymobPixel;
