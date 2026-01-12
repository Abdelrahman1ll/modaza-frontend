import { useEffect, useRef, useState } from "react";
import { usePostPaymentMutation } from "../../redux/Payment/apiPayment";

// =========================
// 5123 4567 8901 2346
// 12 / 25  // بس الوقت خلص
// TEST ACCOUNT
// =========================

const paymentCache = new Map<
  string,
  { clientSecret: string; publicKey: string }
>();
/**
 * PaymobIframe: Secure integration for credit card payments using the Paymob gateway.
 * إطار الدفع (Paymob): تكامل آمن للمدفوعات عبر البطاقات الائتمانية باستخدام بوابة Paymob.
 */
export default function PaymobIframe({
  paymentData,
  onCardValidityChange,
  triggerPayRef,
  setIsPaying,
  handlePayment,
}: {
  paymentData: any;
  onCardValidityChange: (isValid: boolean) => void;
  triggerPayRef: React.MutableRefObject<(() => void) | undefined>;
  setIsPaying: () => void;
  handlePayment: () => void;
}) {
  const effectRan = useRef(false);
  const [postPayment, { isError: apiError }] = usePostPaymentMutation();
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // ========================
  // Listen for messages from iframe
  // ========================
  useEffect(() => {
    async function handleMessage(event: MessageEvent) {
      let data = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (data.type === "CARD_VALID") {
        onCardValidityChange(data.isValid);
      }

      if (data.result === "SUCCESS") {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        await handlePayment();
        setIsPaying();
        onCardValidityChange(false);
      } else if (data.result === "ERROR") {
        setIsPaying();
        onCardValidityChange(false);
        setError("An error occurred. Please try again.");
      }
    }

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  // ========================
  // Initialize payment
  // ========================
  useEffect(() => {
    if (effectRan.current) return;
    async function initPayment() {
      try {
        const cacheKey = JSON.stringify(paymentData);

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

        localStorage.setItem(
          "orderPaymentId",
          JSON.stringify(res.orderPaymentId)
        );

        setIsLoading(false);
      } catch (err) {
        setError("An error occurred. Please try again.");
        setIsLoading(false);
      }
    }

    if (paymentData?.amount > 0) initPayment();
    effectRan.current = true;
  }, [paymentData]);

  // ========================
  // Expose trigger function for external "Pay" button
  // ========================
  useEffect(() => {
    triggerPayRef.current = () => {
      if (!iframeRef.current) return;

      const iframeWindow = iframeRef.current.contentWindow;
      if (!iframeWindow) return;

      iframeWindow.dispatchEvent(new Event("payFromOutside"));
    };
  }, [triggerPayRef]);

  return (
    <div className="w-full h-full mb-4 relative">
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
        <div className="h-[300px] md:h-full w-full bg-(--color-earth)/10 rounded-lg shadow-sm border border-(--color-tiger) p-2 md:p-4 relative">
          <iframe
            ref={iframeRef}
            key={clientSecret + publicKey}
            srcDoc={`
              <html>
                <head>
                  <script type="module" src="https://cdn.jsdelivr.net/npm/paymob-pixel@latest/main.js"></script>
                </head>
                <body style="margin:0; padding:0;">
                  <div id="paymob-elements" style="height:100%; width:100%;"></div>
                  <script type="module">
                    const pixel = new Pixel({
                      publicKey: "${publicKey}",
                      clientSecret: "${clientSecret}",
                      paymentMethods: ["card"],
                      elementId: "paymob-elements",
                      redirect: true,
                      saveCard: true,
                      redirectUrl: "${window.location.origin}/orders",
                      disablePay: true,
                      enableSpinner: true,
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
                        Color_Background_Input_Fields: "#FEFAE0",
                        Color_Border_Input_Fields: "#BC6C25",
                        Color_Background_Payment_Button: "#BC6C25",
                        Color_Primary: "#BC6C25",
                        Radius_Border: "12",
                        Color_Input_Fields: "#FEFAE0",
                        Color_Border_Payment_Button: "#BC6C25",
                      },
                     cardValidationChanged: (isValid) => {
                        window.parent.postMessage({ type: "CARD_VALID", isValid }, "*");
                      },
                      onSuccess: (data) => {
                        window.parent.postMessage({
                          type: "PAYMENT_SUCCESS",
                          redirectUrl: data.redirectUrl || data.redirect_url,
                          orderId: data.order_id || data.orderId,
                          raw: data
                        }, "*");
                      },
                      onFailure: (error) => {
                        window.parent.postMessage({
                          type: "PAYMENT_FAILED",
                          error
                        }, "*");
                      }
                    });

                    window.addEventListener("payFromOutside", () => {
                      const payButton = document.querySelector("#paymob-elements button");
                      if (payButton) payButton.click();
                    });

                  

                  </script>
                </body>
              </html>
            `}
            style={{
              width: "100%",
              height: "298px",
              border: "none",
              borderRadius: "12px",
            }}
            onLoad={() => triggerPayRef.current?.()}
          />
        </div>
      )}
    </div>
  );
}
