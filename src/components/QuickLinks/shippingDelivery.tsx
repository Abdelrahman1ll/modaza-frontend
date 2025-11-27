export default function ShippingDelivery() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 rounded-2xl shadow-lg border border-(--color-earth) m-8 overflow-hidden">
      <h1
        className="text-3xl md:text-4xl font-extrabold mb-10 text-center"
        style={{ color: "var(--color-dark)" }}
      >
        Shipping & Delivery
      </h1>

      <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
        <li>• We offer nationwide shipping across all governorates.</li>
        <li>• نوفر الشحن إلى جميع محافظات الجمهورية.</li>

        <li>
          • Standard Shipping: Shipping to most governorates is available at a
          flat rate of 60 EGP.
        </li>
        <li>
          • الشحن القياسي: الشحن لمعظم المحافظات متاح بسعر ثابت 60 جنيهًا.
        </li>

        <li>
          • Southern Governorates and South Sinai: For locations in Upper Egypt,
          Sharm El Sheikh, and other southern cities, the shipping fee is 80
          EGP.
        </li>
        <li>
          • المحافظات الجنوبية وسيناء الجنوبية: للشحن إلى صعيد مصر، شرم الشيخ،
          والمدن الجنوبية الأخرى، رسوم الشحن هي 80 جنيهًا.
        </li>

        <li>• Delivery takes 3–7 working days.</li>
        <li>• مدة التوصيل من 3 إلى 7 أيام عمل.</li>
      </ul>
    </div>
  );
}
