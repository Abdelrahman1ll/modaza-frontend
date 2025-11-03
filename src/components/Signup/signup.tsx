import { X } from "lucide-react";
import { useState } from "react";

export default function Signup({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState<string>("");
  const [showCodeInput, setShowCodeInput] = useState<boolean>(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up with email:", email);
    setShowCodeInput(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < code.length - 1) {
        const nextInput = document.getElementById(
          `code-${index + 1}`
        ) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);

      if (index > 0) {
        const prevInput = document.getElementById(
          `code-${index - 1}`
        ) as HTMLInputElement;
        prevInput?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").slice(0, 6);
    const newCode = pasteData.split("");
    setCode((prev) => {
      const updated = [...prev];
      for (let i = 0; i < updated.length; i++) {
        updated[i] = newCode[i] || "";
      }
      return updated;
    });

    // وضع التركيز على آخر مربع تم لصقه
    const lastIndex = Math.min(newCode.length, code.length - 1);
    const lastInput = document.getElementById(
      `code-${lastIndex}`
    ) as HTMLInputElement;
    lastInput?.focus();
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Verifying code:", code.join(""));
    onClose();
  };

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
          <form className="text-left" onSubmit={handleSignup}>
            <h2 className="text-3xl font-bold flex justify-center mb-6 text-(--color-pakistan)">
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

            <p className="text-xs mb-8 text-(--color-dark)">
              We will send you a verification message to confirm your email
              address.
            </p>

            <button
              type="submit"
              className="w-full py-2 rounded-xl font-semibold text-white transition bg-(--color-tiger) hover:bg-(--color-earth) cursor-pointer"
            >
              Sign Up
            </button>
          </form>
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

            <p className="text-xs mb-8 text-(--color-dark) text-center">
              Didn’t receive the code?{" "}
              <button
                type="button"
                className="text-(--color-tiger) hover:text-(--color-earth) font-medium transition underline cursor-pointer"
                onClick={() => alert("Code resent!")}
              >
                Resend
              </button>
            </p>

            <button
              type="submit"
              className="w-full py-2 rounded-xl font-semibold text-white transition bg-(--color-tiger) hover:bg-(--color-earth) cursor-pointer"
            >
              Verify Code
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
