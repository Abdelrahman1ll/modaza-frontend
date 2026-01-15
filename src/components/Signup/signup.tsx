import { X } from "lucide-react";
import useSignup from "./useSignup";
import GoogleSignup from "./googleSignup";
import { motion, AnimatePresence, type Variants } from "framer-motion";

/**
 * Signup: User registration modal with email verification and Google login.
 * التسجيل: نافذة تسجيل المستخدم مع التحقق من البريد الإلكتروني وتسجيل جوجل.
 */
export default function Signup({ onClose }: { onClose: () => void }) {
  const {
    email,
    setEmail,
    showCodeInput,
    code,
    handleChange,
    handleKeyDown,
    handlePaste,
    handleVerifyCode,
    handleSignup,
    isLoading,
    isLoadingUser,
  } = useSignup(onClose as () => void);

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  const formVariants: Variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.1 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-50 p-4"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative p-6 sm:p-8 rounded-3xl shadow-2xl max-w-md w-full text-center bg-(--color-cornsilk) border border-white/20"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-(--color-pakistan) hover:bg-(--color-earth)/20 transition-colors cursor-pointer"
          title="الاغلاق"
        >
          <X size={20} />
        </motion.button>

        <AnimatePresence mode="wait">
          {!showCodeInput ? (
            <motion.div
              key="signup-form"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <form className="text-left" onSubmit={handleSignup}>
                <h2 className="text-3xl font-extrabold text-center mb-2 text-(--color-pakistan)">
                  Create Account
                </h2>
                <p className="text-sm text-center mb-8 text-(--color-dark)/70">
                  Join us today and start your journey
                </p>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold mb-1.5 ml-1 text-(--color-pakistan)"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-(--color-earth)/30 focus:border-(--color-tiger) focus:ring-2 focus:ring-(--color-tiger)/10 transition-all outline-none text-(--color-pakistan) bg-white/50"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <AnimatePresence>
                      {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
                        email.length > 0 && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="text-red-500 text-xs mt-1.5 ml-1"
                          >
                            Please enter a valid email address
                          </motion.p>
                        )}
                    </AnimatePresence>
                  </div>

                  <p className="text-xs text-(--color-dark)/80 leading-relaxed px-1">
                    We'll send a 6-digit verification code to your email to
                    confirm it's yours.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={!email || isLoading}
                    className={`w-full py-3.5 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center
                    ${
                      isLoading
                        ? "bg-(--color-earth)/70 cursor-not-allowed"
                        : "hover:shadow-xl cursor-pointer"
                    }`}
                    style={{
                      background: !isLoading
                        ? "linear-gradient(135deg, var(--color-tiger) 0%, var(--color-earth) 100%)"
                        : undefined,
                    }}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Send Verification Code"
                    )}
                  </motion.button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-(--color-pakistan)/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-(--color-cornsilk) px-2 text-(--color-dark)/50">
                        Or continue with
                      </span>
                    </div>
                  </div>

                  <GoogleSignup onClose={onClose} />
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="verify-form"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <form className="text-left" onSubmit={handleVerifyCode}>
                <h2 className="text-3xl font-extrabold text-center mb-2 text-(--color-pakistan)">
                  Check Your Email
                </h2>
                <p className="text-sm text-center mb-8 text-(--color-dark)/70">
                  We've sent a code to{" "}
                  <span className="font-semibold">{email}</span>
                </p>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="code"
                      className="block text-sm font-semibold mb-3 text-center text-(--color-pakistan)"
                    >
                      Enter 6-digit verification code
                    </label>

                    <div className="flex gap-2 justify-between mb-2">
                      {code.map((digit, i) => (
                        <motion.input
                          whileFocus={{ scale: 1.05 }}
                          key={i}
                          id={`code-${i}`}
                          type="text"
                          inputMode="numeric"
                          pattern="\d*"
                          autoComplete="one-time-code"
                          value={digit}
                          onChange={(e) => handleChange(e, i)}
                          onKeyDown={(e) => handleKeyDown(e, i)}
                          onPaste={handlePaste}
                          className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold border border-(--color-earth)/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-(--color-tiger) focus:border-transparent transition-all bg-white/50"
                        />
                      ))}
                    </div>

                    <AnimatePresence>
                      {!/^\d{6}$/.test(code.join("")) &&
                        code.join("").length !== 0 &&
                        code.join("").length !== 6 && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-red-500 text-xs text-center mt-2"
                          >
                            Please enter a valid 6-digit code
                          </motion.p>
                        )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={code.join("").length !== 6 || isLoadingUser}
                    className={`w-full py-3.5 rounded-2xl font-bold text-white shadow-lg transition-all flex items-center justify-center
                    ${
                      isLoadingUser
                        ? "bg-(--color-earth)/70 cursor-not-allowed"
                        : "hover:shadow-xl cursor-pointer"
                    }`}
                    style={{
                      background: !isLoadingUser
                        ? "linear-gradient(135deg, var(--color-tiger) 0%, var(--color-earth) 100%)"
                        : undefined,
                    }}
                  >
                    {isLoadingUser ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Verify & Sign Up"
                    )}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => window.location.reload()} // Simple fallback fallback if they want to restart
                    className="w-full text-xs text-(--color-dark)/60 hover:text-(--color-tiger) transition-colors text-center"
                  >
                    Didn't receive a code? Try again
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
