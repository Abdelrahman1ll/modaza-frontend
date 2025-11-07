export default function SalesPaymentPolicy() {
  return (
    <div className="min-h-screen py-12 px-4 ">
      <div className="max-w-4xl mx-auto  rounded-2xl shadow-lg border border-(--color-earth) overflow-hidden">
        {/* Header */}
        <header className="px-6 py-8 sm:flex sm:items-center sm:justify-between">
          <div>
            <h1
              className="text-2xl sm:text-3xl font-stretch-90% mb-1"
              style={{ color: "var(--color-pakistan)" }}
            >
              سياسة البيع والدفع
            </h1>
            <p className="text-sm text-gray-600">
              الشروط والأحكام المتعلقة بعمليات الشراء والدفع في متجر الملابس
            </p>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-(--color-earth) hover:bg-(--color-tiger) text-(--color-cornsilk) font-medium shadow-sm transition"
            >
              طباعة الصفحة
            </button>
            <a
              href="#contact"
              className="inline-block px-3 py-2 rounded-lg border border-(--color-earth) text-(--color-pakistan) hover:bg-(--color-earth) hover:text-(--color-cornsilk) transition"
            >
              تواصل معنا
            </a>
          </div>
        </header>

        <main className="px-6 pb-10 space-y-6">
          {/* Overview */}
          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--color-dark)" }}>
              1. نظرة عامة
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              مرحبًا بكم في متجرنا لبيع الملابس. توضح هذه الصفحة القواعد والشروط
              المطبقة عند إتمام عمليات الشراء والدفع. بإجراء عملية الشراء توافق على
              الالتزام بهذه الشروط.
            </p>
          </section>

          {/* Prices & Promotions */}
          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--color-dark)" }}>
              2. الأسعار والعروض
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 leading-relaxed">
              <li>الأسعار معروضة بالعملة المحلية وقد تشمل ضريبة القيمة المضافة حيثما ينطبق.</li>
              <li>نحتفظ بالحق في تعديل الأسعار في أي وقت؛ السعر المطبق هو الموجود عند تأكيد الطلب.</li>
              <li>العروض والخصومات تكون لفترة محدودة أو حتى نفاد الكمية، وتطبق الشروط المعلنة لكل عرض.</li>
            </ul>
          </section>

          {/* Payment Methods */}
          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--color-dark)" }}>
              3. طرق الدفع المتاحة
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              نتيح عدة طرق دفع لتسهيل عملية الشراء:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-2">
              <li>بطاقات الائتمان / الخصم (Visa, MasterCard) عبر بوابات دفع آمنة.</li>
              <li>الدفع عند الاستلام (Cash on Delivery) — قد تُطبق رسوم إضافية حسب المنطقة.</li>
              <li>التحويل البنكي أو المحافظ الإلكترونية إذا كانت متاحة.</li>
            </ul>
            <p className="text-xs text-gray-500 mt-2">
              تأكد من صحة بيانات الدفع قبل الإرسال. المتجر غير مسؤول عن الأخطاء في إدخال بيانات الدفع.
            </p>
          </section>

          {/* Order Confirmation */}
          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--color-dark)" }}>
              4. تأكيد الطلب واستلام الفاتورة
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              بعد إتمام الدفع بنجاح ستصلك رسالة تأكيد عبر البريد الإلكتروني تحتوي على
              تفاصيل الطلب والفاتورة. إذا لم يصلك تأكيد خلال 24 ساعة، يرجى التواصل معنا.
            </p>
          </section>

          {/* Cancellation & Returns */}
          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--color-dark)" }}>
              5. الإلغاء والاسترجاع
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 leading-relaxed">
              <li>يمكن إلغاء الطلب قبل الشحن دون رسوم.</li>
              <li>بعد الشحن: يمكن استرجاع المنتج خلال 14 يومًا من الاستلام بشرط أن يكون غير مستخدم وبحالته الأصلية.</li>
              <li>لا تغطي سياسة الاسترجاع الأضرار الناتجة عن الاستخدام الخاطئ أو التعديلات على المنتج.</li>
              <li>يُسترد المبلغ لنفس طريقة الدفع خلال 5–10 أيام عمل بعد فحص المنتج.</li>
            </ul>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--color-dark)" }}>
              6. أمان المعاملات
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              نستخدم تشفير SSL وتقنيات حماية قياسية لحماية بياناتك ومعلومات الدفع.
              لا نشارك بيانات الدفع مع أطراف ثالثة بدون موافقة صريحة منك.
            </p>
          </section>

          {/* Shipping */}
          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--color-dark)" }}>
              7. الشحن والتوصيل
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              مدة التوصيل تتباين حسب المنطقة ومخزون المنتج — سنعرض تقدير المدة عند إتمام الطلب.
              قد تُفرض رسوم شحن إضافية للطلبات خارج نطاق التوصيل المجاني.
            </p>
          </section>

          {/* Contact */}
          <section id="contact" className="pt-2">
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--color-dark)" }}>
              8. تواصل معنا
            </h2>

            <div className="bg-(--color-cornsilk) p-4 rounded-lg border border-(--color-earth)">
              <p className="text-sm text-gray-700">
                لأي استفسارات حول الدفع أو الشحن أو سياسة الإرجاع، تواصل معنا عبر:
              </p>
              <ul className="mt-2 text-sm text-gray-700 list-none space-y-1">
                <li><strong>البريد الإلكتروني:</strong> <a href="mailto:support@yourstore.com" className="text-(--color-pakistan)">support@yourstore.com</a></li>
                <li><strong>الهاتف:</strong> <a href="tel:+201234567890" className="text-(--color-pakistan)">(+20) 123-456-7890</a></li>
                <li><strong>ساعات العمل:</strong> السبت-الخميس 9:00 - 18:00</li>
              </ul>
            </div>
          </section>

          {/* Footer / small notes */}
          <section className="text-xs text-gray-500">
            <p>
              يحق للمتجر تعديل هذه السياسة من وقت لآخر. ستطبق النسخة المنشورة على الموقع اعتباراً من تاريخ النشر.
            </p>
            <p className="mt-2">آخر تحديث: 2025-11-06</p>
          </section>
        </main>
      </div>
    </div>
  );
}
