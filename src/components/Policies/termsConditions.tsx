export default function TermsConditions() {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 rounded-2xl shadow-lg border border-(--color-earth) m-8 overflow-hidden">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: "var(--color-dark)" }}>
        الشروط والأحكام
      </h1>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          1. قبول الشروط
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          باستخدامك لهذا الموقع وشراء المنتجات منه، فإنك توافق على الالتزام بهذه الشروط والأحكام وجميع السياسات المرتبطة.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          2. حساب المستخدم
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          يجب أن تكون جميع المعلومات التي تقدمها دقيقة ومحدثة. أنت مسؤول عن الحفاظ على سرية بيانات الدخول الخاصة بك.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          3. المنتجات والأسعار
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          نحتفظ بالحق في تعديل الأسعار والعروض في أي وقت دون إشعار مسبق. قد تختلف الصور المعروضة عن المنتجات الفعلية قليلاً.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          4. الدفع والتسليم
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          جميع المدفوعات يجب أن تتم عبر وسائل الدفع المصرح بها. نحن نسعى لتسليم المنتجات خلال المدة المحددة، ولكن لا يمكننا ضمان مواعيد دقيقة دائمًا.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          5. مسؤولية المستخدم
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          أنت توافق على استخدام الموقع بطريقة قانونية وعدم إساءة استخدامه أو محاولة اختراقه أو انتهاك حقوق الغير.
        </p>
      </section>

      <section>
        <h2 className="text-xl md:text-2xl font-semibold mb-3 pb-1 border-b border-gray-300" style={{ color: "var(--color-dark)" }}>
          6. تواصل معنا
        </h2>
        <p className="text-gray-700 text-sm md:text-base">
          لأي استفسارات بخصوص الشروط والأحكام، يرجى مراسلتنا على البريد الإلكتروني: <span className="font-bold">support@example.com</span>.
        </p>
      </section>
    </div>
  );
}
