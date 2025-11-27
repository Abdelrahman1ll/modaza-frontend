export default function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 rounded-2xl shadow-lg border border-(--color-earth) m-8 overflow-hidden">
      <h1
        className="text-3xl md:text-4xl font-extrabold mb-10 text-center"
        style={{ color: "var(--color-dark)" }}
      >
        Terms & Conditions
      </h1>

      {/* 1 */}
      <section className="mb-8">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          1. Acceptance of Terms | قبول الشروط
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • By using this website and purchasing its products, you agree to
            comply with these terms and all related policies.
          </li>
          <li>
            • باستخدامك لهذا الموقع وشراء المنتجات منه، فإنك توافق على الالتزام
            بهذه الشروط والأحكام وجميع السياسات المرتبطة.
          </li>
        </ul>
      </section>

      {/* 2 */}
      <section className="mb-8">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          2. User Account | حساب المستخدم
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • All provided information must be accurate and up to date. You are
            responsible for keeping your login data secure.
          </li>
          <li>
            • يجب أن تكون جميع المعلومات التي تقدمها دقيقة ومحدثة. أنت مسؤول عن
            الحفاظ على سرية بيانات الدخول الخاصة بك.
          </li>
        </ul>
      </section>

      {/* 3 */}
      <section className="mb-8">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          3. Products & Pricing | المنتجات والأسعار
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • We reserve the right to modify prices and offers at any time
            without prior notice. Displayed images may slightly differ from
            actual products.
          </li>
          <li>
            • نحتفظ بالحق في تعديل الأسعار والعروض في أي وقت دون إشعار مسبق. قد
            تختلف الصور المعروضة عن المنتجات الفعلية قليلاً.
          </li>
        </ul>
      </section>

      {/* 4 */}
      <section className="mb-8">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          4. Payment & Delivery | الدفع والتسليم
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • All payments must be made through authorized methods. Delivery
            times are estimated and not guaranteed precisely.
          </li>
          <li>
            • جميع المدفوعات يجب أن تتم عبر وسائل الدفع المصرح بها. نحن نسعى
            لتسليم المنتجات خلال المدة المحددة، ولكن لا يمكننا ضمان مواعيد دقيقة
            دائمًا.
          </li>
        </ul>
      </section>

      {/* 5 */}
      <section className="">
        <h2
          className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300"
          style={{ color: "var(--color-dark)" }}
        >
          5. User Responsibility | مسؤولية المستخدم
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>
            • You agree to use the website lawfully and not attempt any misuse,
            hacking, or violation of others' rights.
          </li>
          <li>
            • أنت توافق على استخدام الموقع بطريقة قانونية وعدم إساءة استخدامه أو
            محاولة اختراقه أو انتهاك حقوق الغير.
          </li>
        </ul>
      </section>
    </div>
  );
}
