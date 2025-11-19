import { X } from "lucide-react";
import useSignup from "./useSignup";
import GoogleSignup from "./googleSignup";

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] backdrop-blur-sm z-50">
      <div className="p-6 m-2 rounded-2xl shadow-2xl max-w-md w-full text-center transition bg-(--color-cornsilk) text-(--color-pakistan)">
        <button
          onClick={onClose}
          className="flex justify-end text-(--color-pakistan) hover:text-(--color-tiger) transition cursor-pointer w-full"
          title="الاغلاق"
        >
          <X size={22} />
        </button>

        {!showCodeInput ? (
          <div>
            <form className="text-left" onSubmit={handleSignup}>
              <h2 className="text-3xl font-bold flex justify-center mb-4 text-(--color-pakistan)">
                Sign Up
              </h2>

              <label
                htmlFor="email"
                className="block text-sm font-medium mb-2 ml-1 text-(--color-pakistan)"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 rounded-lg border border-(--color-earth) focus:outline-none focus:ring-1 focus:ring-(--color-earth) mb-4 text-(--color-pakistan) bg-white"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
                email.length > 0 && (
                  <p className="text-red-500 text-xs mb-4">
                    Please enter a valid email address
                  </p>
                )}

              <p className="text-xs mb-8 text-(--color-dark)">
                We will send you a verification message to confirm your email
                address.
              </p>

              <button
                type="submit"
                disabled={!email || isLoading}
                className={`w-full py-2 rounded-xl mb-4 font-semibold text-white transition flex items-center justify-center
              ${
                isLoading
                  ? "bg-(--color-earth) cursor-not-allowed"
                  : "bg-(--color-tiger) hover:bg-(--color-earth) cursor-pointer"
              }`}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Sign Up"
                )}
              </button>
              {/* Sign Up with Google button */}
              <GoogleSignup onClose={onClose} />
            </form>
          </div>
        ) : (
          <form className="text-left" onSubmit={handleVerifyCode}>
            <h2 className="text-3xl font-bold flex justify-center mb-6 text-(--color-pakistan)">
              Verify Your Code
            </h2>

            <label
              htmlFor="code"
              className="block text-sm font-medium mb-2 ml-1 text-(--color-pakistan)"
            >
              Verification Code
            </label>

            <div className="flex gap-2 justify-center mb-4">
              {code.map((digit, i) => (
                <input
                  key={i}
                  id={`code-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl border rounded-lg focus:outline-none focus:ring-2 focus:ring-(--color-earth)"
                />
              ))}
            </div>

            {!/^\d{6}$/.test(code.join("")) && code.join("").length !== 6 && (
              <p className="text-red-500 text-xs mb-4 ml-8">
                Please enter a valid 6-digit code
              </p>
            )}

            <button
              type="submit"
              disabled={code.join("").length !== 6 || isLoadingUser}
              className={`w-full py-2 rounded-xl font-semibold text-white transition flex items-center justify-center
              ${
                isLoadingUser
                  ? "bg-(--color-earth) cursor-not-allowed"
                  : "bg-(--color-tiger) hover:bg-(--color-earth) cursor-pointer"
              }`}
            >
              {isLoadingUser ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Verify Code"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
