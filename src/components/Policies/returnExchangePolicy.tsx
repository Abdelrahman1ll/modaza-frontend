export default function ReturnExchangePolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 rounded-2xl shadow-lg border border-(--color-earth) m-8 overflow-hidden">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: "var(--color-dark)" }}>
        سياسة الإرجاع والاستبدال
      </h1>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          1. نظرة عامة
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          نحرص على رضاكم الكامل عن مشترياتكم. إذا لم تكن راضيًا عن المنتج، يمكنك إرجاعه أو استبداله وفقًا للشروط التالية.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          2. شروط الإرجاع
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
          <li>يجب إرجاع المنتجات خلال 14 يومًا من استلامها.</li>
          <li>يجب أن تكون المنتجات غير مستخدمة وفي عبوتها الأصلية.</li>
          <li>يجب أن تكون الملصقات (Tags) موجودة على المنتج.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          3. سياسة الاستبدال
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm md:text-base">
          <li>يمكن الاستبدال خلال 14 يومًا من الشراء.</li>
          <li>إذا لم يكن الحجم أو المنتج المطلوب متاحًا، سيتم إصدار استرداد للمبلغ.</li>
          <li>يرجى التواصل مع فريق الدعم لطلب الاستبدال.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          4. استرداد الأموال
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          سيتم معالجة استرداد الأموال خلال 5–7 أيام عمل بعد استلام المنتج المُعاد. وسيتم إعادة المبلغ إلى طريقة الدفع الأصلية.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          5. تواصل معنا
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          لأي استفسارات بخصوص الإرجاع أو الاستبدال، يرجى مراسلتنا على البريد الإلكتروني: <span className="font-bold">support@example.com</span>.
        </p>
      </section>
    </div>
  );
}
