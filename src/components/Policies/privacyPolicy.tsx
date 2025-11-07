export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 rounded-2xl shadow-lg border border-(--color-earth) m-8 overflow-hidden">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: "var(--color-dark)" }}>
        سياسة الخصوصية
      </h1>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          1. جمع المعلومات
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          نحن نجمع المعلومات التي تقدمها لنا عند التسجيل أو إجراء عملية شراء أو التواصل معنا، بما في ذلك الاسم، البريد الإلكتروني، رقم الهاتف، وعنوان الشحن.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          2. استخدام المعلومات
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          نستخدم المعلومات لتحسين خدماتنا، معالجة الطلبات، التواصل مع العملاء، وإرسال العروض والتحديثات المتعلقة بالمنتجات والخدمات.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          3. حماية المعلومات
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          نحن نتخذ التدابير الأمنية المناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الاستخدام أو الكشف.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          4. مشاركة المعلومات
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          لن نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية دون موافقتك. قد نشاركها فقط مع شركائنا الموثوق بهم لأغراض معالجة الطلبات والشحن.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          5. تواصل معنا
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          لأي استفسارات بخصوص سياسة الخصوصية، يرجى مراسلتنا على البريد الإلكتروني: <span className="font-bold">support@example.com</span>.
        </p>
      </section>
    </div>
  );
}
