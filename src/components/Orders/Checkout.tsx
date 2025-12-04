import { motion } from "framer-motion";
import {
  Loader2,
  CreditCard,
  Smartphone,
  Wallet,
  Truck,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import type { CartItemType } from "../../types/CartType";
import useCheckout from "./useCheckout";
import PaymobCheckout from "./paymobCheckout";
export default function Checkout() {
  const {
    discount,
    errorMsg,
    openSection,
    errors,
    applyDiscount,
    handleSelectMethod,
    handlePayment,
    deliveryFee,
    finalTotal,
    setPromoCode,
    isLoading,
    orderLoading,
    paymentMethod,
    promoCode,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    state,
    setState,
    addressDetails,
    setAddressDetails,
    phone1,
    setPhone1,
    phone2,
    setPhone2,
    data,
    setErrors,
    navigate,
    isFirstOrder,
    filteredStates,
    setSearch,
    setOpen,
    open,
    search,
    saveAddress,
    setSaveAddress,
    email,
  } = useCheckout();
  return (
    <div className="min-h-screen  p-4 sm:p-6 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-(--color-dark) mb-6"
      >
        Checkout
      </motion.h1>

      {/* Address Section */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Products Column */}
        <div className="lg:col-span-1 p-4 rounded-2xl shadow bg-(--color-cornsilk)">
          <h2 className="text-xl font-bold text-(--color-dark) mb-4">
            Your Items
          </h2>

          {isLoading ? (
            <div className="flex flex-col gap-6">
              {[1, 2].map((_, idx) => (
                <div
                  key={idx}
                  className="flex max-[490px]:flex-col md:flex-row items-center gap-4 p-4 rounded-xl shadow animate-pulse bg-(--color-earth)/20"
                >
                  <div className="relative w-32 h-32 bg-(--color-earth)/40 rounded-xl" />

                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between">
                      <div className="w-1/3 h-4 bg-(--color-earth)/40 rounded" />
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-(--color-earth)/40 rounded-full" />
                        <div className="w-6 h-4 bg-(--color-earth)/40 rounded" />
                        <div className="w-6 h-6 bg-(--color-earth)/40 rounded-full" />
                      </div>
                    </div>

                    <div className="w-1/4 h-4 bg-(--color-earth)/40 rounded mt-2" />

                    <div className="p-2 bg-(--color-earth)/30 rounded-xl border border-(--color-earth)/40 w-full max-[470px]:w-full mt-2">
                      <div className="w-1/2 h-3 bg-(--color-earth)/40 rounded mb-1" />
                      <div className="w-1/3 h-3 bg-(--color-earth)/40 rounded" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : data?.carts?.items.length === 0 ? (
            <div className="flex flex-col items-center py-10">
              <ShoppingCart size={60} className="text-(--color-tiger) mb-4" />
              <p className="text-xl font-bold text-(--color-dark)">
                Your cart is empty
              </p>
              <button
                onClick={() => navigate("/products")}
                className="mt-4 px-6 py-2 rounded-full bg-(--color-tiger) text-white font-semibold hover:bg-(--color-earth) transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {data?.carts?.items.map((item: CartItemType) => (
                <div
                  key={item.id}
                  className="flex max-[490px]:flex-col md:flex-row items-center gap-4 p-4 rounded-xl shadow bg-(--color-cornsilk)/10"
                >
                  <div className="relative w-32 h-32">
                    {/* صورة المنتج */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />

                    {/* نسبة الخصم */}
                    {item.product.discountPercentage && (
                      <span className="absolute -top-1 -left-1 bg-(--color-tiger) text-white text-xs font-bold px-1 py-1 rounded-lg shadow-lg">
                        {item.product.discountPercentage}%
                      </span>
                    )}
                  </div>

                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between">
                      <h3 className="text-lg font-bold text-(--color-dark)">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center p-0.5 gap-2 bg-(--color-earth)/10 rounded-full border border-(--color-earth)/30">
                        <button
                          className="w-6 h-6 flex items-center justify-center text-white rounded-full transition"
                          style={{ backgroundColor: "var(--color-tiger)" }}
                        >
                          <Minus size={14} />
                        </button>
                        <span
                          className="text-lg font-semibold"
                          style={{ color: "var(--color-dark)" }}
                        >
                          {item?.quantity}
                        </span>
                        <button className="w-6 h-6 flex items-center justify-center text-white rounded-full transition bg-(--color-tiger)">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <p className="text-(--color-pakistan) font-bold text-md mb-2">
                      {item.product.price} EGP
                    </p>

                    <div className="p-2 bg-(--color-earth)/10 rounded-xl border border-(--color-earth)/30 w-fit max-[470px]:w-full">
                      <p className="text-sm text-(--color-pakistan)">
                        <span className="font-semibold text-(--color-tiger)">
                          Size: {item?.sizes?.size}
                        </span>
                        <span className="ml-2 text-(--color-dark)">
                          (
                          <span className="font-medium text-(--color-pakistan)">
                            Length:
                          </span>{" "}
                          {item?.sizes.length} cm —{" "}
                          <span className="font-medium text-(--color-pakistan)">
                            Width:
                          </span>{" "}
                          {item?.sizes.width} cm)
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary Column */}
        <div className="p-4 rounded-2xl shadow bg-(--color-cornsilk)">
          <h2 className="text-xl font-bold text-(--color-dark) mb-4">
            Shipping Address
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* الاسم الأول للعميل */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-(--color-dark)">
                First Name
              </label>
              <input
                type="text"
                placeholder="First Name"
                className="p-3 rounded-xl border border-(--color-earth) outline-none w-full"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setErrors((prev) => ({ ...prev, firstName: "" }));
                }}
              />
              {errors?.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors?.firstName}</p>
              )}
            </div>

            {/* الاسم الثاني للعميل */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-(--color-dark)">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className="p-3 rounded-xl border border-(--color-earth) outline-none w-full"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setErrors((prev) => ({ ...prev, lastName: "" }));
                }}
                required
              />
              {errors?.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors?.lastName}</p>
              )}
            </div>

            {/* الدولة */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-(--color-dark)">
                Country
              </label>
              <input
                type="text"
                placeholder="Country"
                className="p-3 rounded-xl border border-(--color-earth) outline-none w-full "
                value="Egypt"
                readOnly
              />
            </div>

            {/* المحافظة أو الولاية */}

            <div className="flex flex-col relative">
              <label className="mb-1 font-semibold text-(--color-dark)">
                State / City
              </label>

              <div
                className="p-3 rounded-xl border border-(--color-earth) cursor-pointer bg-white"
                onClick={() => setOpen(!open)}
              >
                {state || "Select State"}
              </div>

              {open && (
                <div className="absolute top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-50 p-2">
                  <input
                    type="text"
                    placeholder="Search state..."
                    className="p-2 mb-2 w-full border rounded-lg outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />

                  <div className="max-h-52 overflow-y-auto">
                    {filteredStates.map((gov) => (
                      <div
                        key={gov}
                        className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                        onClick={() => {
                          setState(gov);
                          setOpen(false);
                          setSearch("");
                          setErrors((prev: any) => ({ ...prev, state: "" }));
                        }}
                      >
                        {gov}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {errors.state && (
                <p className="text-red-600 text-sm mt-1">{errors.state}</p>
              )}
            </div>
          </div>

          {/* تفاصيل العنوان بالكامل */}
          <div className="flex flex-col mt-3">
            <label className="mb-1 font-semibold text-(--color-dark)">
              Address Details
            </label>
            <textarea
              placeholder="Street, Building, etc."
              className="w-full p-3 rounded-xl border border-(--color-earth) outline-none"
              value={addressDetails}
              required
              onChange={(e) => {
                setAddressDetails(e.target.value);
                setErrors((prev) => ({ ...prev, addressDetails: "" }));
              }}
            />
            {errors.addressDetails && (
              <p className="text-red-600 text-sm mt-1">
                {errors.addressDetails}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            {/* الرقم الأول للتواصل */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-(--color-dark)">
                Phone
              </label>
              <input
                type="text"
                placeholder="Phone"
                className="p-3 rounded-xl border border-(--color-earth) outline-none w-full"
                value={phone1}
                required
                onChange={(e) => {
                  setPhone1(e.target.value);
                  setErrors((prev) => ({ ...prev, phone1: "" }));
                }}
              />
              {errors.phone1 && (
                <p className="text-red-600 text-sm mt-1">{errors.phone1}</p>
              )}
            </div>

            {/* الرقم الثاني للتواصل */}
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-(--color-dark)">
                Phone (Optional)
              </label>
              <input
                type="text"
                placeholder="Phone"
                className="p-3 rounded-xl border border-(--color-earth) outline-none w-full"
                value={phone2}
                required
                onChange={(e) => {
                  setPhone2(e.target.value);
                  setErrors((prev) => ({ ...prev, phone2: "" }));
                }}
              />
              {errors.phone2 && (
                <p className="text-red-600 text-sm mt-1">{errors.phone2}</p>
              )}
            </div>
          </div>

          {/* لي حفظ البيانات العنوان */}
          <div className="flex items-center gap-2 mt-3">
            <input
              type="checkbox"
              checked={saveAddress}
              onChange={(e) => setSaveAddress(e.target.checked)}
              className="w-5 h-5 accent-(--color-tiger) cursor-pointer"
            />
            <label className="font-semibold text-(--color-dark)">
              Save this address for next time
            </label>
          </div>

          <h2 className="text-xl font-bold text-(--color-dark) mb-4 mt-6">
            Order Summary
          </h2>

          <div className="flex justify-between text-lg mb-2">
            <span className="text-(--color-dark)">Subtotal</span>
            <span className="font-bold text-(--color-pakistan)">
              {data?.carts?.total || 0} EGP
            </span>
          </div>

          <div className="flex justify-between text-lg mb-2">
            <span className="text-(--color-dark)">Delivery Fee</span>
            {isFirstOrder ? (
              <span className="font-bold text-green-600 flex items-center gap-2 animate-pulse">
                🎁 FREE
                <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  First Order
                </span>
              </span>
            ) : (
              <span className="font-bold text-(--color-pakistan)">
                ({state}) {deliveryFee} EGP
              </span>
            )}
          </div>

          <hr className="my-3 border-(--color-earth)" />

          {/* Promo Code */}
          <h3 className="text-lg font-bold text-(--color-dark) mb-2">
            Discount Code
          </h3>

          <div className="flex flex-col sm:flex-row gap-2 mb-3 w-full">
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code"
              className="flex-1 p-3 rounded-xl border border-(--color-earth) outline-none w-full"
            />

            <button
              onClick={applyDiscount}
              className="px-4 py-3 rounded-xl bg-(--color-tiger) text-white font-semibold hover:bg-(--color-tiger)/80 transition w-full sm:w-auto"
            >
              Apply
            </button>
          </div>

          {errorMsg && <p className="text-red-600 text-sm mb-2">{errorMsg}</p>}

          {discount > 0 && (
            <p className="text-green-600 animate-pulse font-semibold mb-3">
              Discount applied: {discount}% 🎉
            </p>
          )}

          <hr className="my-3 border-(--color-earth)" />

          <div className="flex justify-between text-xl font-bold mb-4">
            <span className="text-(--color-dark)">Total</span>
            <span className="text-(--color-tiger)">{finalTotal || 0} EGP</span>
          </div>
          <hr className="my-3 border-(--color-earth)" />

          {/* Payment */}
          <h3 className="text-lg font-bold text-(--color-dark) mb-3">
            Select Payment Method:
          </h3>

          {[
            {
              id: "credit_card",
              labelAr: "الدفع بالفيزا",
              labelEn: "Visa / Card",
              icon: <CreditCard />,
            },
            {
              id: "vodafone_cash",
              labelAr: "فودافون كاش",
              labelEn: "Vodafone Cash",
              icon: <Wallet />,
            },
            {
              id: "instaPay",
              labelAr: "إنستابي",
              labelEn: "InstaPay",
              icon: <Smartphone />,
            },
            {
              id: "cash_on_delivery",
              labelAr: "الدفع عند الاستلام",
              labelEn: "Cash on Delivery",
              icon: <Truck />,
            },
          ].map((m) => (
            <div key={m.id} className="w-full">
              {/* زرار اختيار وسيلة الدفع */}
              <button
                onClick={() => handleSelectMethod(m.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition mb-2 ${
                  paymentMethod === m.id
                    ? "border-(--color-tiger) bg-(--color-tiger)/10"
                    : "border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  {m.icon}
                  <span>
                    {m.labelAr} — {m.labelEn}
                  </span>
                </div>
              </button>

              {/* القسم الذي يظهر تحت زرار الدفع */}
              {openSection === m.id &&
                (m.id === "instaPay" || m.id === "vodafone_cash") && (
                  <div className="p-4 bg-(--color-earth)/10 border border-(--color-earth) rounded-xl mb-3">
                    {/* رقم الدفع */}
                    <p className="text-(--color-pakistan) font-semibold mb-2">
                      رقم الدفع — Payment Number:
                    </p>

                    <p className="p-3 bg-white border-2 border-(--color-tiger) rounded-xl font-bold text-(--color-dark) text-center text-lg tracking-wider">
                      01065217980
                    </p>

                    {/* ملاحظات مهمة */}
                    <div className="mt-3 text-sm">
                      <p className="text-(--color-pakistan) font-semibold">
                        ⚠ ملاحظات مهمة:
                      </p>
                      <ul className="list-disc ml-5 text-(--color-dark)">
                        <li>سيتم تأكيد الطلب بعد مراجعة عملية الدفع يدويًا.</li>
                        <li>
                          رقم الهاتف الذي ستدفع منه يجب أن يكون واحد من الرقمين
                          الموجودين في عنوانك.
                        </li>
                        <li>قم بالتحويل على رقم الدفع الموضح فقط.</li>
                        <li>بعد التحويل، سنتواصل معك لتأكيد الطلب.</li>
                      </ul>

                      <p className="text-(--color-pakistan) font-semibold mt-2">
                        ⚠ Important Notes:
                      </p>
                      <ul className="list-disc ml-5 text-(--color-dark)">
                        <li>
                          Your order will be confirmed after manual payment
                          verification.
                        </li>
                        <li>
                          The phone number you pay from must match one of the
                          two numbers in your address.
                        </li>
                        <li>
                          Please transfer only to the shown payment number.
                        </li>
                        <li>
                          After the transfer, we will contact you to confirm
                          your order.
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

              {openSection === m.id && m.id === "credit_card" && (
                <>
                  {!firstName || !lastName || !email || !phone1 || !state ? (
                    <div className="p-4 bg-red-100 border border-red-300 rounded-xl mb-3 text-red-700">
                      Please enter your address.
                    </div>
                  ) : (
                    <PaymobCheckout
                      paymentData={{
                        amount: finalTotal,
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        phone_number: phone1,
                        city: state,
                        paymentId: data?.carts?.paymentId,
                      }}
                      handlePayment={handlePayment}
                    />
                  )}
                </>
              )}
            </div>
          ))}

          {errors.paymentMethod && (
            <div className="p-4 bg-red-100 border border-red-300 rounded-xl mb-3 text-red-700">
              {errors.paymentMethod}
            </div>
          )}

          {paymentMethod === "credit_card" ? (
            <button
              disabled={orderLoading}
              onClick={() => {
                window.dispatchEvent(new Event("payFromOutside"));

              }}
              className="mt-4 w-full h-12 bg-(--color-tiger) hover:bg-(--color-tiger)/80 text-white rounded-xl text-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {orderLoading ? (
                <Loader2 className="animate-spin w-5 h-5 mx-auto" />
              ) : (
                "Pay now"
              )}
            </button>
          ) : (
            <button
              disabled={orderLoading}
              onClick={handlePayment}
              className="mt-4 w-full h-12 bg-(--color-tiger) hover:bg-(--color-tiger)/80 text-white rounded-xl text-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {orderLoading ? (
                <Loader2 className="animate-spin w-5 h-5 mx-auto" />
              ) : (
                "Complete Order"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
