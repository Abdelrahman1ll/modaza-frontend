export default function SalesPaymentPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 rounded-2xl shadow-lg border border-(--color-earth) m-8 overflow-hidden">
      <h1
        className="text-3xl md:text-4xl font-extrabold mb-10 text-center"
        style={{ color: "var(--color-dark)" }}
      >
        Sales & Payment Policy
      </h1>

      {/* 1 */}
      <section className="mb-8">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          1. Overview | نظرة عامة
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • This policy outlines the terms related to sales and payment when
            purchasing from our clothing store.
          </li>
          <li>
            • توضح هذه السياسة الشروط المتعلقة بعمليات البيع والدفع عند الشراء
            من متجر الخاص بنا.
          </li>
        </ul>
      </section>

      {/* 2 */}
      <section className="mb-8">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          2. Prices & Offers | الأسعار والعروض
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • Prices are displayed in local currency and may include applicable
            taxes. Offers are subject to availability.
          </li>
          <li>
            • الأسعار معروضة بالعملة المحلية وقد تشمل الضرائب المطبقة. العروض
            تخضع للتوفر وقد تكون لفترة محدودة.
          </li>
        </ul>
      </section>

      {/* 3 */}
      <section className="mb-8">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          3. Payment Methods | طرق الدفع
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • We offer secure payment methods including bank cards, cash on
            delivery, and Instapay or Vodafone Cash when available.
          </li>
          <li>
            • نوفر وسائل دفع آمنة تشمل البطاقات البنكية، الدفع عند الاستلام،
            وإنستاباي وفودافون كاش عند توفرها.
          </li>
        </ul>
      </section>

      {/* 4 */}
      <section className="">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          4. Order Confirmation | تأكيد الطلب
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-extrabold leading-relaxed">
          <li>
            • You can view your order details, including products, order status,
            and payment method, directly from your Order page on the website.
          </li>
          <li>
            • يمكنك عرض تفاصيل طلبك، بما في ذلك المنتجات، حالة الطلب، وطريقة
            الدفع، مباشرة من صفحة الطلب في الموقع.
          </li>
        </ul>
      </section>
    </div>
  );
}
