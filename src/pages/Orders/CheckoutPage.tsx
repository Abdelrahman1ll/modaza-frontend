import { useEffect } from "react";
import PromoBar from "../../components/Header/PromoBar";
import Checkout from "../../components/Orders/Checkout";
import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { loadStripe } from "@stripe/stripe-js";
import { useInitStripePaymentMutation } from "../../redux/Payment/apiPayment";
// import { useGetStripeKeyQuery } from "../../redux/Payment/apiPayment";

const stripePromise = loadStripe(
  "pk_test_51SsSxTRoStTjc2YwZbmuw2yUuP6QYZix6tmGeDgXTLky8TaFfHKlM3bDyVUCqFLKnck5BLRHU11A4mSInhHOu12s00fAhWs2xB",
);

export default function CheckoutPage() {
  // const { data: stripeKey } = useGetStripeKeyQuery({});

  // مثال لما يجب أن يحدث داخل CheckoutPage
  const [initPayment] = useInitStripePaymentMutation();

  // عند تحميل الصفحة أو اكتمال بيانات المستخدم
  useEffect(() => {
   const data = initPayment({
      amount: 1000,
      email: "test@example.com",
      first_name: "test",
      last_name: "test",
      city: "egp",
      phone_number: "0123456789",
    });
    console.log(data)
  }, []);

  // ثم تمرير data.clientSecret إلى الـ Provider

  return (
    <div>
      <PromoBar />

      <CheckoutProvider
        stripe={stripePromise}
        options={{
          // هذا الشكل الصحيح للـ Client Secret (للتجربة فقط)
          clientSecret:
            "pi_3MtwfL2eZvKYlo2C1pZ9CcYm_secret_m0wbaxvdx89k1q7v18p2v1d7v",
        }}
      >
        <Checkout />
      </CheckoutProvider>
    </div>
  );
}
