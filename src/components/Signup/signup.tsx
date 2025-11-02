import { X } from "lucide-react";

export default function SignupEmail({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.3)] backdrop-blur-sm z-50">
      <div className="p-6 m-2 rounded-2xl shadow-2xl max-w-md w-full text-center transition bg-(--color-cornsilk) text-(--color-pakistan)">
        <button
          onClick={onClose}
          className="flex justify-end text-(--color-pakistan) hover:text-(--color-tiger) transition cursor-pointer"
          title="إغلاق"
        >
          <X size={22} />
        </button>

        <h2 className="text-3xl font-bold mb-6 text-(--color-pakistan)">
          Sign Up
        </h2>

        <form
          className="text-left"
          onSubmit={(e) => {
            e.preventDefault();
            const email = (
              e.currentTarget.elements.namedItem("email") as HTMLInputElement
            ).value;
            console.log("Email submitted:", email);
          }}
        >
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2 ml-1 text-(--color-pakistan)"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full px-4 py-2 rounded-lg border border-(--color-earth) focus:outline-none focus:ring-1 focus:ring-(--color-earth) mb-4 text-(--color-pakistan) bg-white"
            placeholder="you@example.com"
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
      </div>
    </div>
  );
}
