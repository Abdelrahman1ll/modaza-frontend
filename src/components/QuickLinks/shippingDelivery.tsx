export default function ShippingDelivery() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 rounded-2xl shadow-lg border border-(--color-earth) m-8 overflow-hidden space-y-12">
      {/* English Section */}
      <div>
        <h1
          className="text-3xl md:text-4xl font-extrabold mb-8 text-center"
          style={{ color: "var(--color-dark)" }}
        >
          Shipping & Delivery
        </h1>

        <ul className="space-y-4 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • We offer nationwide shipping across all governorates in Egypt.
          </li>

          <li>
            • Standard Shipping: Shipping to most governorates is available at a
            flat rate of 60 EGP.
          </li>

          <li>
            • Southern Governorates & South Sinai: For Upper Egypt, Sharm El
            Sheikh, and other southern areas, the shipping fee is 80 EGP.
          </li>

          <li>• Delivery usually takes 3–7 working days.</li>
        </ul>
      </div>

      {/* Arabic Section */}
      <div dir="rtl" className="text-right">
        <h1
          className="text-3xl md:text-4xl font-extrabold mb-8 text-center"
          style={{ color: "var(--color-dark)" }}
        >
          الشحن والتوصيل
        </h1>

        <ul className="space-y-4 text-gray-700 text-sm md:text-base font-semibold leading-relaxed">
          <li>• نوفر خدمة الشحن إلى جميع محافظات جمهورية مصر العربية.</li>

          <li>
            • الشحن القياسي: الشحن لمعظم المحافظات متاح بسعر ثابت قدره 60 جنيهًا
            مصريًا.
          </li>

          <li>
            • محافظات الجنوب وسيناء الجنوبية: للشحن إلى صعيد مصر وشرم الشيخ
            والمناطق الجنوبية الأخرى، تكون رسوم الشحن 80 جنيهًا مصريًا.
          </li>

          <li>• تستغرق مدة التوصيل عادة من 3 إلى 7 أيام عمل.</li>
        </ul>
      </div>
    </div>
  );
}
