import { useEffect, useRef, useState } from "react";
import { usePostPaymentMutation } from "../../redux/Payment/apiPayment";

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

export default function PaymobIframe({
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
  const effectRan = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const [postPayment, { isError: apiError }] = usePostPaymentMutation();
  const [clientSecret, setClientSecret] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ================= Messages from iframe ================= */
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

      if (data.type === "CARD_VALID") {
        onCardValidityChange(data.isValid);
      }

      if (data.result === "SUCCESS") {
        await handlePayment();
        setIsPaying();
        onCardValidityChange(false);
      }

      if (data.result === "ERROR") {
        setIsPaying();
        onCardValidityChange(false);
        setError("Payment failed. Please try again.");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handlePayment, onCardValidityChange, setIsPaying]);

  /* ================= Init payment ================= */
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

  /* ================= Trigger pay from parent ================= */
  useEffect(() => {
    triggerPayRef.current = () => {
      const iframeWindow = iframeRef.current?.contentWindow;
      if (!iframeWindow) return;
      iframeWindow.dispatchEvent(new Event("payFromOutside"));
    };
  }, [triggerPayRef]);

  /* ================= Render ================= */
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="w-10 h-10 border-4 border-(--color-tiger)/20 border-t-(--color-tiger) rounded-full animate-spin" />
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
      <div className="bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 shadow-lg p-4">
        <iframe
          ref={iframeRef}
          key={clientSecret + publicKey}
          style={{ width: "100%", height: "420px", border: "none" }}
          srcDoc={`
<!DOCTYPE html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
  <script type="module" src="https://cdn.jsdelivr.net/npm/paymob-pixel@latest/main.js"></script>

  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Cairo', sans-serif;
      background: transparent;
      padding: 12px;
    }

    #paymob-elements {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .field-label {
      display: block;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 8px;
      color: #283618; /* var(--color-pakistan) */
    }

    /* Target the injected iframes */
    iframe {
      width: 100% !important;
      height: 48px !important;
      border-radius: 16px !important;
      border: 1px solid rgba(96, 108, 56, 0.3) !important; /* var(--color-earth)/30 */
      background: rgba(255, 255, 255, 0.5) !important;
      padding: 10px !important;
      transition: all 0.3s ease !important;
    }

    iframe:focus-within {
      border-color: #dda15e !important; /* var(--color-tiger) */
      box-shadow: 0 0 0 4px rgba(221, 161, 94, 0.1) !important;
      background: rgba(255, 255, 255, 0.8) !important;
    }
  </style>
</head>
<body>
  <div id="paymob-elements">
    <div>
      <label class="field-label">Card Number</label>
      <div class="card-number"></div>
    </div>
    
    <div class="row">
      <div>
        <label class="field-label">Expiry Date</label>
        <div class="expiry"></div>
      </div>
      <div>
        <label class="field-label">CVV / CVC</label>
        <div class="cvv"></div>
      </div>
    </div>
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

      disablePay: true,
      enableSpinner: true,
      redirect: true,
      redirectUrl: "${window.location.origin}/orders",

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
      if (btn) btn.click();
    });
  </script>
</body>
</html>
`}
        />
      </div>
    </div>
  );
}
