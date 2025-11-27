export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl m-8 mx-auto p-4 md:p-12 rounded-2xl shadow-lg border border-(--color-earth) overflow-hidden">
      <h1
        className="text-3xl md:text-4xl font-extrabold mb-10 text-center"
        style={{ color: "var(--color-dark)" }}
      >
        Privacy Policy
      </h1>

      {/* 1 */}
      <section className="mb-8">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          1. Information Collection | جمع المعلومات
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • We collect information you provide when registering, purchasing,
            or contacting us, including name, email, phone number, and shipping
            address.
          </li>
          <li>
            • نحن نجمع المعلومات التي تقدمها لنا عند التسجيل أو إجراء عملية شراء
            أو التواصل معنا، بما في ذلك الاسم، البريد الإلكتروني، رقم الهاتف،
            وعنوان الشحن.
          </li>
        </ul>
      </section>

      {/* 2 */}
      <section className="mb-8">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          2. Use of Information | استخدام المعلومات
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • We use the information to improve our services, process orders,
            communicate with customers, and send offers and updates.
          </li>
          <li>
            • نستخدم المعلومات لتحسين خدماتنا، معالجة الطلبات، التواصل مع
            العملاء، وإرسال العروض والتحديثات المتعلقة بالمنتجات والخدمات.
          </li>
        </ul>
      </section>

      {/* 3 */}
      <section className="mb-8">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          3. Data Protection | حماية المعلومات
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • We implement appropriate security measures to protect your
            personal data from unauthorized access or disclosure.
          </li>
          <li>
            • نحن نتخذ التدابير الأمنية المناسبة لحماية معلوماتك الشخصية من
            الوصول غير المصرح به أو الاستخدام أو الكشف.
          </li>
        </ul>
      </section>

      {/* 4 */}
      <section className="">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          4. Sharing Information | مشاركة المعلومات
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • We do not share your personal data with third parties for
            marketing without your consent, except with trusted partners for
            order processing and delivery.
          </li>
          <li>
            • لن نشارك معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية دون
            موافقتك، وقد نشاركها فقط مع شركائنا الموثوق بهم لأغراض معالجة
            الطلبات والشحن.
          </li>
        </ul>
      </section>
    </div>
  );
}
