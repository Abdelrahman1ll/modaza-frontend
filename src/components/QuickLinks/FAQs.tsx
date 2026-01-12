/**
 * FAQs: Frequently Asked Questions with accordion-style answers.
 * الأسئلة الشائعة: الأسئلة الأكثر شيوعاً مع إجابات بنظام القائمة المنسدلة.
 */
export default function FAQs() {
  return (
    <div className="max-w-5xl mx-auto p-6 md:p-12 rounded-2xl shadow-lg border border-(--color-earth) m-8 overflow-hidden">
      <h1
        className="text-3xl md:text-4xl font-extrabold mb-10 text-center"
        style={{ color: "var(--color-dark)" }}
      >
        FAQs
      </h1>

      {/* Shipping & Delivery */}
      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300">
          Shipping & Delivery | الشحن والتوصيل
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>• What if I received a wrong item or an item is missing?</li>
          <li>• ماذا لو استلمت منتجًا خاطئًا أو مفقودًا؟</li>
          <li>
            • We urge our customers to check items immediately to ensure they
            are correct and in good condition. Contact us immediately if there’s
            an issue.
          </li>
          <li>
            • نحث عملائنا على التحقق من المنتجات فور استلامها للتأكد من صحتها
            وحالتها الجيدة. اتصل بنا فورًا إذا كان هناك أي خطأ.
          </li>

          <li>• What if I entered the incorrect shipping address?</li>
          <li>• ماذا لو أدخلت عنوان شحن خاطئ؟</li>
          <li>
            • Contact us ASAP with your name, order number, and new address. If
            not yet shipped, we will update it.
          </li>
          <li>
            • يرجى التواصل معنا فورًا باسمك ورقم الطلب والعنوان الجديد. إذا لم
            يتم الشحن بعد، سنقوم بتحديثه.
          </li>

          <li>• How much is the shipping cost?</li>
          <li>• كم تكلفة الشحن؟</li>
          <li>
            • Shipping fees vary by region and are calculated at checkout.
          </li>
          <li>• رسوم الشحن تختلف حسب المنطقة ويتم حسابها عند الدفع.</li>

          <li>• How long does delivery take?</li>
          <li>• كم تستغرق مدة التوصيل؟</li>
          <li>
            • Delivery takes 3–7 working days across most regions of Egypt,
            excluding some governorates.
          </li>
          <li>
            • مدة التوصيل من 3 إلى 7 أيام عمل في معظم محافظات مصر، مع استثناء
            بعض المحافظات.
          </li>
        </ul>
      </section>

      {/* Exchange & Return */}
      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300">
          Exchange & Return | الاسترجاع والاستبدال
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>• Do you offer refunds?</li>
          <li>• هل تقدمون استرداد الأموال؟</li>
          <li>• Please contact us for refund policy details.</li>
          <li>• يرجى التواصل معنا لمعرفة سياسة الاسترداد.</li>

          <li>• How long after purchase can I request a refund?</li>
          <li>• كم المدة المتاحة لطلب الاسترداد بعد الشراء؟</li>
          <li>
            • Refund requests can be submitted within 7–14 days after purchase.
          </li>
          <li>• يمكن تقديم طلب الاسترداد خلال 7–14 يومًا بعد الشراء.</li>

          <li>
            • Who pays shipping costs for a refund when the order had free
            shipping?
          </li>
          <li>
            • من يتحمل رسوم الشحن عند الاسترداد إذا كان الطلب مجاني الشحن؟
          </li>
          <li>
            • Customer pays shipping costs when free shipping was applied.
          </li>
          <li>
            • يتحمل العميل رسوم الشحن في حالة الاسترداد للطلبات المجانية الشحن.
          </li>
        </ul>
      </section>

      {/* Promo Code */}
      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300">
          Promo Code | كود الخصم
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>• How can I apply the discount code?</li>
          <li>• كيف يمكنني استخدام كود الخصم؟</li>
          <li>
            • Enter your code at checkout under "Apply Discount Code" and click
            Apply.
          </li>
          <li>
            • أدخل كود الخصم عند الدفع تحت "تطبيق كود الخصم" ثم اضغط تطبيق.
          </li>
        </ul>
      </section>

      {/* Account */}
      <section className="mb-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300">
          Account | الحساب
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>• Can I complete my purchase without creating an account?</li>
          <li>• هل يمكنني إتمام الشراء بدون إنشاء حساب؟</li>
          <li>
            • No, you must create an account or log in to complete your
            purchase.
          </li>
          <li>
            • لا، يجب عليك إنشاء حساب أو تسجيل الدخول لإتمام عملية الشراء.
          </li>
        </ul>
      </section>

      {/* Orders */}
      <section className="">
        <h2 className="text-xl md:text-2xl font-bold mb-4 pb-2 border-b border-gray-300">
          Orders | الطلبات
        </h2>
        <ul className="space-y-3 text-gray-800 text-sm md:text-base font-semibold leading-relaxed">
          <li>• How do I make a purchase?</li>
          <li>• كيف أقوم بالشراء؟</li>
          <li>
            • Browse our shop, add items to cart, checkout, provide info, choose
            payment, and pay.
          </li>
          <li>
            • تصفح المتجر، أضف المنتجات إلى السلة، ادفع عند الدفع، أدخل بياناتك،
            اختر طريقة الدفع، وأتمم الدفع.
          </li>

          <li>• I am not comfortable with online orders. What do I do?</li>
          <li>• لست مرتاحًا للشراء أونلاين، ماذا أفعل؟</li>
          <li>
            • We offer Pay on Delivery. Inspect products before accepting. You
            only pay for delivery if you decline.
          </li>
          <li>
            • نوفر الدفع عند الاستلام. تحقق من المنتج قبل استلامه. تدفع فقط
            تكلفة التوصيل إذا رفضت المنتج.
          </li>
        </ul>
      </section>
    </div>
  );
}
