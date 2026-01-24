import { useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Loader2,
  CreditCard,
  Smartphone,
  Wallet,
  Truck,
  ShoppingCart,
  ChevronDown,
  Info,
  ShieldCheck,
  Tag,
  MapPin,
} from "lucide-react";
import type { CartItemType } from "../../types/CartType";
import useCheckout from "./useCheckout";
import { BRAND_PHONE } from "../../BrandText";
import PaymobPayment from "./PaymobPayment";
import { Link } from "react-router-dom";
/**
 * Checkout: Multi-step process for shipping info, payment, and order completion.
 * الدفع: عملية متعددة الخطوات لبيانات الشحن والدفع وإتمام الطلب.
 */
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
    setIsDropdownOpen,
    isDropdownOpen,
    search,
    saveAddress,
    setSaveAddress,
    email,
    isCardValid,
    setIsCardValid,
    setIsPaying,
    isPaying,
    payRef,
    isDetectingLocation,
    handleAutoLocation,
    rawDeliveryFee,
    freeDelivery,
  } = useCheckout();

  /**
   * Automatically redirects the user to the cart page if the cart becomes empty.
   * يقوم تلقائياً بتوجيه المستخدم لصفحة السلة إذا أصبحت السلة فارغة.
   */
  useEffect(() => {
    if (!isLoading && data?.carts?.items.length === 0) {
      navigate("/cart");
    }
  }, [data, isLoading, navigate]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardClasses =
    "p-4 md:p-6 sm:p-8 rounded-3xl shadow-xl bg-white/40 backdrop-blur-xl border border-white/60 hover:shadow-2xl transition-all duration-300";
  const labelClasses =
    "block text-sm font-bold mb-2 ml-1 text-(--color-pakistan)";
  const inputClasses =
    "w-full px-4 py-3 rounded-2xl border border-(--color-earth)/30 focus:border-(--color-tiger) focus:ring-4 focus:ring-(--color-tiger)/10 transition-all outline-none text-(--color-pakistan) bg-white/50 placeholder:text-(--color-dark)/40";

  return (
    <div className="min-h-screen p-4 sm:p-8 md:p-12 mb-10 bg-(--color-cornsilk)/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-(--color-tiger)/10 text-(--color-tiger) text-xs font-bold uppercase tracking-widest mb-4">
            <ShieldCheck size={14} /> Secure Checkout
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-(--color-pakistan) tracking-tight">
            Checkout
          </h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8 items-start"
        >
          {/* Main Form Column */}
          <div className="lg:col-span-7 space-y-8">
            {/* Shipping Address Card */}
            <motion.div variants={itemVariants} className={cardClasses}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-2xl bg-(--color-pakistan)/5 text-(--color-pakistan)">
                  <Truck size={24} />
                </div>
                <h2 className="text-2xl font-black text-(--color-pakistan)">
                  Shipping Details
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-6">
                <div className="flex flex-col">
                  <label className={labelClasses}>First Name</label>
                  <input
                    type="text"
                    placeholder="e.g. John"
                    className={inputClasses}
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      setErrors((prev) => ({ ...prev, firstName: "" }));
                    }}
                  />
                  <AnimatePresence>
                    {errors?.firstName && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-xs font-bold mt-2 ml-1"
                      >
                        {errors?.firstName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col">
                  <label className={labelClasses}>Last Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Doe"
                    className={inputClasses}
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      setErrors((prev) => ({ ...prev, lastName: "" }));
                    }}
                  />
                  <AnimatePresence>
                    {errors?.lastName && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-xs font-bold mt-2 ml-1"
                      >
                        {errors?.lastName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col">
                  <label className={labelClasses}>Country</label>
                  <input
                    type="text"
                    className={`${inputClasses} cursor-not-allowed`}
                    value="Egypt"
                    readOnly
                  />
                </div>

                <div className="flex flex-col relative">
                  <div className="flex items-center justify-between">
                    <label className={labelClasses + " mb-0"}>
                      <span className="hidden sm:inline">State / City</span>
                      <span className="sm:hidden">State</span>
                    </label>
                    <button
                      type="button"
                      onClick={handleAutoLocation}
                      disabled={isDetectingLocation}
                      className="text-[10px] font-black uppercase tracking-widest text-(--color-tiger) hover:text-(--color-pakistan) transition-colors flex items-center gap-1 whitespace-nowrap"
                    >
                      {isDetectingLocation ? (
                        <Loader2 size={10} className="animate-spin" />
                      ) : (
                        <MapPin size={10} />
                      )}
                      <span className="hidden sm:inline">Detect Location</span>
                      <span className="sm:hidden">Detect</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    disabled={isDetectingLocation}
                    className={`${inputClasses} flex items-center justify-between text-left ${
                      isDetectingLocation ? "opacity-50 cursor-wait" : ""
                    }`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span
                      className={
                        state
                          ? "text-(--color-pakistan)"
                          : "text-(--color-dark)/40"
                      }
                    >
                      {isDetectingLocation
                        ? "Detecting..."
                        : state || "Select State"}
                    </span>
                    {isDetectingLocation ? (
                      <Loader2
                        size={18}
                        className="animate-spin text-(--color-tiger)"
                      />
                    ) : (
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${
                          isDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute top-full left-0 right-0 mt-3 p-3 rounded-2xl bg-white/90 backdrop-blur-2xl border border-white shadow-2xl z-50 overflow-hidden"
                      >
                        <input
                          type="text"
                          placeholder="Search city..."
                          className="w-full p-3 mb-3 bg-white/50 rounded-xl border border-(--color-earth)/20 outline-none focus:border-(--color-tiger) transition-all"
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          autoFocus
                        />

                        <div className="max-h-64 overflow-y-auto space-y-1 custom-scrollbar">
                          {filteredStates.map((gov: string) => (
                            <button
                              key={gov}
                              type="button"
                              className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-bold ${
                                state === gov
                                  ? "bg-(--color-tiger) text-white"
                                  : "hover:bg-(--color-tiger)/10 text-(--color-pakistan)"
                              }`}
                              onClick={() => {
                                setState(gov);
                                setIsDropdownOpen(false);
                                setSearch("");
                                setErrors((prev) => ({ ...prev, state: "" }));
                              }}
                            >
                              {gov}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.state && (
                    <p className="text-red-500 text-xs font-bold mt-2 ml-1">
                      {errors.state}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col mt-2 md:mt-6">
                <label className={labelClasses}>Detailed Address</label>
                <textarea
                  placeholder="Street name, building number, apartment, etc."
                  rows={3}
                  className={`${inputClasses} resize-none`}
                  value={addressDetails}
                  onChange={(e) => {
                    setAddressDetails(e.target.value);
                    setErrors((prev) => ({ ...prev, addressDetails: "" }));
                  }}
                />
                <AnimatePresence>
                  {errors.addressDetails && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-xs font-bold mt-2 ml-1"
                    >
                      {errors.addressDetails}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              <div className="grid grid-cols-2 gap-2 md:gap-6 mt-2 md:mt-6">
                <div className="flex flex-col">
                  <label className={labelClasses}>Primary Phone</label>
                  <input
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    className={inputClasses}
                    value={phone1}
                    onChange={(e) => {
                      setPhone1(e.target.value);
                      setErrors((prev) => ({ ...prev, phone1: "" }));
                    }}
                  />
                  {errors.phone1 && (
                    <p className="text-red-500 text-xs font-bold mt-2 ml-1">
                      {errors.phone1}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label className={labelClasses}>Phone (Optional)</label>
                  <input
                    type="tel"
                    placeholder="Alternative number"
                    className={inputClasses}
                    value={phone2}
                    onChange={(e) => {
                      setPhone2(e.target.value);
                      setErrors((prev) => ({ ...prev, phone2: "" }));
                    }}
                  />
                  {errors.phone2 && (
                    <p className="text-red-500 text-xs font-bold mt-2 ml-1">
                      {errors.phone2}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex items-center">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={saveAddress}
                      onChange={(e) => setSaveAddress(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-12 h-6 bg-white/50 border border-(--color-earth)/30 rounded-full peer-checked:bg-(--color-tiger) transition-all duration-300"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-6 shadow-sm"></div>
                  </div>
                  <span className="text-sm font-bold text-(--color-pakistan) group-hover:text-(--color-tiger) transition-colors">
                    Save this address for your next order
                  </span>
                </label>
              </div>
            </motion.div>

            {/* Payment Card */}
            <motion.div variants={itemVariants} className={cardClasses}>
              <div className="flex items-center gap-3 mb-4 md:mb-8">
                <div className="p-2.5 rounded-2xl bg-(--color-pakistan)/5 text-(--color-pakistan)">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-2xl font-black text-(--color-pakistan)">
                  Payment Method
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                {[
                  {
                    id: "credit_card",
                    title: "Card",
                    subtitle: "Visa / Mastercard",
                    icon: <CreditCard size={20} />,
                  },
                  {
                    id: "vodafone_cash",
                    title: "E-Wallet",
                    subtitle: "Vodafone / Orange / Etisalat",
                    icon: <Wallet size={20} />,
                  },
                  {
                    id: "instaPay",
                    title: "InstaPay",
                    subtitle: "Instant Bank Transfer",
                    icon: <Smartphone size={20} />,
                  },
                  {
                    id: "cash_on_delivery",
                    title: "Cash on Delivery",
                    subtitle: "Pay when you receive",
                    icon: <Truck size={20} />,
                  },
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      if (isPaying || data?.carts?.items.length === 0) return;
                      handleSelectMethod(m.id);
                    }}
                    className={`relative flex items-center gap-4 p-5 rounded-3xl border-2 text-left transition-all duration-300 ${
                      paymentMethod === m.id
                        ? "border-(--color-tiger) bg-(--color-tiger)/5"
                        : "border-white/40 bg-white/20 hover:border-white/80 hover:bg-white/40"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-2xl transition-colors ${
                        paymentMethod === m.id
                          ? "bg-(--color-tiger) text-white shadow-lg shadow-(--color-tiger)/20"
                          : "bg-white/60 text-(--color-pakistan)"
                      }`}
                    >
                      {m.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-(--color-pakistan)">
                        {m.title}
                      </h4>
                      <p className="text-xs font-bold text-(--color-pakistan)/50">
                        {m.subtitle}
                      </p>
                    </div>
                    {paymentMethod === m.id && (
                      <motion.div
                        layoutId="active-payment"
                        className="absolute -top-2 -right-2 w-6 h-6 bg-(--color-tiger) rounded-full flex items-center justify-center text-white shadow-lg"
                      >
                        <ShieldCheck size={14} />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {openSection === "instaPay" ||
                openSection === "vodafone_cash" ? (
                  <motion.div
                    key="wallet-info"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-6 rounded-3xl bg-white/30 border border-white/60 overflow-hidden"
                  >
                    <div className="flex items-center gap-2 text-(--color-pakistan) font-black mb-4">
                      <Smartphone className="text-(--color-tiger)" size={20} />
                      Payment Number
                    </div>
                    <div className="relative group">
                      <div className="p-4 bg-white/60 border-2 border-(--color-tiger) rounded-2xl font-black text-(--color-pakistan) text-center text-2xl tracking-[0.2em] shadow-inner mb-6 transition-all group-hover:bg-white">
                        {BRAND_PHONE}
                      </div>
                      <button
                        onClick={() =>
                          navigator.clipboard.writeText(BRAND_PHONE)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-(--color-tiger)/10 text-(--color-tiger) hover:bg-(--color-tiger) hover:text-white transition-all text-xs font-bold"
                      >
                        Copy
                      </button>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/40 border border-white/60">
                      <div className="flex items-center gap-2 text-sm font-black text-(--color-pakistan) mb-3">
                        <Info size={16} className="text-(--color-tiger)" />{" "}
                        Important Notes
                      </div>
                      <ul className="space-y-3 text-sm font-bold text-(--color-pakistan)/70 list-none ml-1">
                        <li className="flex gap-2">
                          <span className="text-(--color-tiger)">•</span>
                          Transfer only to the exact number shown above.
                        </li>
                        <li className="flex gap-2">
                          <span className="text-(--color-tiger)">•</span>
                          Verification is manual; we will contact you shortly
                          after transfer.
                        </li>
                        <li className="flex gap-2">
                          <span className="text-(--color-tiger)">•</span>
                          Payment number must match one of the numbers in your
                          shipping address.
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                ) : null}

                {openSection === "credit_card" ? (
                  <motion.div
                    key="card-info"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 mb-4"
                  >
                    {!firstName || !lastName || !email || !phone1 || !state ? (
                      <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 text-amber-700 text-sm font-bold flex items-center gap-2">
                        <Info size={16} /> Please complete your shipping address
                        first.
                      </div>
                    ) : (
                      <PaymobPayment
                        paymentData={{
                          amount: finalTotal,
                          first_name: firstName,
                          last_name: lastName,
                          email: email,
                          phone_number: phone1,
                          city: state,
                        }}
                        setIsPaying={() => setIsPaying(false)}
                        onCardValidityChange={(v) => setIsCardValid(v)}
                        triggerPayRef={payRef}
                        handlePayment={handlePayment}
                      />
                    )}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {errors.paymentMethod && (
                <div className="mt-4 p-4 rounded-2xl bg-red-100/50 border border-red-200 text-red-600 text-sm font-bold">
                  {errors.paymentMethod}
                </div>
              )}
            </motion.div>
          </div>

          {/* Checkout Summary Column */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div variants={itemVariants} className={cardClasses}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-2xl bg-(--color-pakistan)/5 text-(--color-pakistan)">
                  <ShoppingCart size={24} />
                </div>
                <h2 className="text-2xl font-black text-(--color-pakistan)">
                  Order Summary
                </h2>
              </div>

              {isLoading ? (
                <div className="space-y-6">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-4 animate-pulse">
                      <div className="w-24 h-24 bg-white/50 rounded-2xl" />
                      <div className="flex-1 space-y-3 py-1">
                        <div className="h-4 bg-white/50 rounded w-2/3" />
                        <div className="h-3 bg-white/50 rounded w-1/3" />
                        <div className="h-4 bg-white/50 rounded w-1/4 mt-4" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : data?.carts?.items.length === 0 ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-20 h-20 bg-(--color-tiger)/10 text-(--color-tiger) rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart size={32} />
                  </div>
                  <p className="text-lg font-black text-(--color-pakistan)">
                    Your cart is empty
                  </p>
                  <button
                    onClick={() => navigate("/products")}
                    className="px-8 py-3 rounded-full bg-(--color-tiger) text-white font-black hover:bg-(--color-tiger)/90 transition-all shadow-lg hover:shadow-xl"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {data?.carts?.items.map((item: CartItemType) => (
                    <div
                      key={item.id}
                      className="group flex gap-4 p-3 rounded-3xl bg-white/30 border border-transparent hover:border-white hover:bg-white/50 transition-all duration-300"
                    >
                      <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl shadow-sm group-hover:shadow-md transition-all">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                        {item.product.discountPercentage && (
                          <span className="absolute top-1 left-1 bg-(--color-tiger) text-white text-[10px] font-black px-1.5 py-0.5 rounded-lg">
                            {item.product.discountPercentage}% OFF
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0 py-1">
                        <div className="flex justify-between items-start gap-2 mb-1">
                          <h3 className="text-sm font-black text-(--color-pakistan) truncate">
                            {item.product.name}
                          </h3>
                          <span className="text-xs font-black px-2 py-0.5 bg-white/80 rounded-full text-(--color-pakistan)">
                            ×{item.quantity}
                          </span>
                        </div>
                        <p className="text-xs font-bold text-(--color-pakistan)/50 mb-3">
                          Size: {item.sizes.size} • {item.sizes.length}×
                          {item.sizes.width}cm
                        </p>
                        <p className="text-sm font-black text-(--color-tiger)">
                          EGP {item.product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-10 pt-8 border-t border-white/60 space-y-6">
                {/* Promo Code section */}
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-pakistan)/40"
                      />
                      <input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo Code"
                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-(--color-earth)/30 focus:border-(--color-tiger) transition-all outline-none bg-white/40 font-bold text-sm"
                      />
                    </div>
                    <button
                      onClick={applyDiscount}
                      className="px-6 py-3 rounded-2xl text-white font-black hover:opacity-90 transition-all shadow-md active:scale-95"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-tiger) 0%, var(--color-earth) 100%)",
                      }}
                    >
                      Apply
                    </button>
                  </div>
                  <AnimatePresence>
                    {errorMsg && (
                      <motion.p
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-red-500 text-xs font-bold ml-1"
                      >
                        {errorMsg}
                      </motion.p>
                    )}
                    {discount > 0 && (
                      <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-green-600 text-xs font-bold flex items-center gap-2 ml-1"
                      >
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-ping" />
                        Discount applied: {discount}% OFF 🎉
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-bold text-(--color-pakistan)/60">
                    <span>Subtotal</span>
                    <span className="text-lg font-black text-(--color-pakistan)">
                      EGP {(data?.carts?.total || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm font-bold text-(--color-pakistan)/60">
                    <div className="flex items-center gap-2">
                      <span>Delivery</span>
                      {isFirstOrder && (
                        <span className="px-2 py-0.5 bg-green-100/50 text-green-600 rounded-full text-[10px] uppercase font-black tracking-widest">
                          First Order
                        </span>
                      )}
                    </div>
                    {isFirstOrder || freeDelivery ? (
                      <div className="flex items-center gap-2">
                        {rawDeliveryFee > 0 && (
                          <span className="text-sm font-bold text-(--color-pakistan)/40 line-through">
                            EGP {rawDeliveryFee.toLocaleString()}
                          </span>
                        )}
                        <span className="text-lg font-black text-green-600">
                          FREE
                        </span>
                      </div>
                    ) : (
                      <span className="text-lg font-black text-(--color-pakistan)">
                        EGP {(deliveryFee || 0).toLocaleString()}
                      </span>
                    )}
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between items-center text-sm font-bold text-green-600/80">
                      <span>Promo Discount</span>
                      <span className="text-lg font-black">
                        -EGP{" "}
                        {(
                          (data?.carts?.total || 0) *
                          (discount / 100)
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}

                  <div className="pt-4 border-t-2 border-dashed border-white flex justify-between items-center text-(--color-pakistan)">
                    <div>
                      <span className="text-sm font-black uppercase tracking-widest opacity-60">
                        Total Amount
                      </span>
                    </div>
                    <span className="text-4xl font-black text-(--color-tiger)">
                      EGP {(finalTotal || 0).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Submit Button (Desktop) */}
                <div className="pt-4">
                  {paymentMethod === "credit_card" ? (
                    <button
                      disabled={!isCardValid || isPaying}
                      onClick={() => {
                        setIsPaying(true);
                        payRef.current?.();
                      }}
                      className="w-full py-5 rounded-3xl text-white font-black text-xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-70 transform active:scale-[0.98]"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-tiger) 0%, var(--color-earth) 100%)",
                      }}
                    >
                      {isPaying ? (
                        <Loader2 className="animate-spin w-6 h-6 mx-auto" />
                      ) : (
                        <span>
                          Pay EGP {(finalTotal || 0).toLocaleString()}
                        </span>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handlePayment}
                      disabled={orderLoading || data?.carts?.items.length === 0}
                      className="w-full py-5 rounded-3xl text-white font-black text-xl shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-70 transform active:scale-[0.98]"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-tiger) 0%, var(--color-earth) 100%)",
                      }}
                    >
                      {orderLoading ? (
                        <Loader2 className="animate-spin w-6 h-6 mx-auto" />
                      ) : (
                        "Complete Order"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto mt-20 pt-8 border-t border-(--color-earth)/20 text-center"
        >
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-bold text-(--color-pakistan)/60 mb-8">
            <Link
              to="/shipping-delivery"
              className="hover:text-(--color-tiger) transition-colors"
            >
              Shipping & Delivery
            </Link>
            <Link
              to="/return-exchange-policy"
              className="hover:text-(--color-tiger) transition-colors"
            >
              Return Policy
            </Link>
            <Link
              to="/privacy-policy"
              className="hover:text-(--color-tiger) transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-conditions"
              className="hover:text-(--color-tiger) transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>
          <p className="text-xs font-bold text-(--color-pakistan)/40">
            Powered by Paymob & Secure Gateway
          </p>
        </motion.div>
      </div>
    </div>
  );
}
