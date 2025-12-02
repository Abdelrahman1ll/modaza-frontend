import { useEffect, useState } from "react";
import axios from "axios";
import { usePostPaymentMutation } from "../../redux/Payment/apiPayment";

function PaymobCheckout({ paymentData }: any) {
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [postPayment, { isLoading }] = usePostPaymentMutation();
  useEffect(() => {
    async function initPayment() {
      try {
        const res = await postPayment({ ...paymentData }).unwrap();
        setPaymentUrl(res.clientSecret);
        localStorage.setItem("paymentId", res.paymentId);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError("There were communication errors");
        } else {
          setError("An unexpected error occurred.");
        }
      }
    }

    if (paymentData.amount > 0) initPayment();
  }, [paymentData]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-18 h-18 border-6 border-gray-300 border-t-(--color-tiger) rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="text-red-500 text-center p-5">{error}</p>;

  if (!paymentUrl)
    return <p className="text-center p-5">No payment link available</p>;

  return (
    <div className="w-full min-h-[400px] mb-2.5">
      <iframe
        src={paymentUrl}
        className="w-full h-[400px] border-none rounded-2xl"
        title="Paymob Payment"
        allowFullScreen
      />
    </div>
  );
}

export default PaymobCheckout;



