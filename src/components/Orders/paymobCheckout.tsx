import { useEffect, useState } from "react";
import axios from "axios";
import URL from "../../api/baseUrl";

function PaymobCheckout({ amount }: { amount: number }) {
  const [paymobToken, setPaymobToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // iframe ID من Paymob Dashboard
  const IFRAME_ID = import.meta.env.VITE_IFRAME_ID;

  useEffect(() => {
    async function initPayment() {
      try {
        setLoading(true);
        const resp = await axios.post(
          `${URL}/payment/create-session`,
          { amount }
        );
        console.log("Payment token received:", resp.data.token);
        setPaymobToken(resp.data.token);
        setLoading(false);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error("Payment Error:", err.response?.data);
          setError("فشل في إنشاء جلسة الدفع");
        }
        setLoading(false);
      }
    }

    if (amount > 0) {
      initPayment();
    }
  }, [amount]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>جاري تحميل صفحة الدفع...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
        {error}
      </div>
    );
  }

  if (!paymobToken) {
    return <div>لا يوجد token للدفع</div>;
  }

  return (
    <div style={{ width: "100%", minHeight: "350px" }}>
      <h3 style={{ textAlign: "center" }}>إتمام الدفع - {amount} جنيه</h3>
      <iframe
        src={`https://accept.paymob.com/api/acceptance/iframes/${IFRAME_ID}?payment_token=${paymobToken}`}
        width="100%"
        height="350px"
        style={{ border: "none" }}
        title="Paymob Payment"
      />
    </div>
  );
}

export default PaymobCheckout;