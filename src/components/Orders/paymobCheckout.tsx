import { useEffect, useRef, useState } from "react";
import { usePostPaymentMutation } from "../../redux/Payment/apiPayment";
import PaymobPixel from "./PaymobPixel";

function PaymobCheckout({ paymentData, handlePayment }: any) {
  const effectRan = useRef(false);

  const [error, setError] = useState<string | null>(null);
  const [postPayment, { isLoading }] = usePostPaymentMutation();

  const [clientSecret, setClientSecret] = useState("");
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    if (effectRan.current) return;
    async function initPayment() {
      try {
        const res = await postPayment({ ...paymentData }).unwrap();
        setClientSecret(res.clientSecret);
        setPublicKey(res.publicKey);
      } catch (err) {
        setError("An error occurred. Please try again.");
      }
    }

    if (paymentData.amount > 0) initPayment();

    return () => {
      effectRan.current = true;
    };
  }, [paymentData]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-15 h-15 border-6 border-gray-300 border-t-(--color-tiger) rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-red-500 text-center p-5">{error}</p>;

  return (
   
      <div>
        <PaymobPixel
          publicKey={publicKey}
          clientSecret={clientSecret}
          handlePayment={handlePayment}
        />
      </div>
   
  );
}
export default PaymobCheckout;
