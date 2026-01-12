import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";
import { useForm, ValidationError } from "@formspree/react";
import { BRAND_EMAIL, BRAND_PHONE } from "../../BrandText";

/**
 * ContactUs: Form and information for user inquiries and support.
 * اتصل بنا: نموذج ومعلومات لاستفسارات المستخدمين والدعم.
 */
export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [state, handleSubmit] = useForm("xldzgwvb");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-20 mt-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
        {/* Left Column: Contact Information */}
        <div className="flex flex-col justify-center space-y-6 md:space-y-10 order-2 lg:order-1">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl md:text-5xl font-extrabold text-(--color-pakistan) mb-3 md:mb-6 tracking-tight">
              Get in Touch
            </h2>
            <p className="text-sm md:text-lg text-gray-600 leading-relaxed">
              We'd love to hear from you. Reach out to us directly or fill out
              the form.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:gap-8">
            {/* Phone */}
            <div className="flex items-center space-x-2  p-2 md:p-4 rounded-xl bg-transparent border md:border-0 border-gray-100">
              <div className="shrink-0 bg-(--color-earth)/10 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full text-(--color-earth)">
                <MdPhone className="text-lg md:text-2xl" />
              </div>
              <div className="grow">
                <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">
                  Phone
                </p>
                <p className="text-base md:text-xl font-semibold text-(--color-pakistan) font-mono">
                  {BRAND_PHONE}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-4 p-2 md:p-4 rounded-xl bg-transparent border md:border-0 border-gray-100">
              <div className="shrink-0 bg-(--color-earth)/10 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full text-(--color-earth)">
                <MdEmail className="text-lg md:text-2xl" />
              </div>
              <div className="grow">
                <p className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-wider">
                  Email
                </p>
                <p className="text-base md:text-xl font-semibold text-(--color-pakistan) break-all">
                  {BRAND_EMAIL}
                </p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="text-center lg:text-left">
            <p className="text-xs md:text-sm font-semibold text-(--color-pakistan) mb-3 md:mb-5">
              Follow Us
            </p>
            <div className="flex justify-center lg:justify-start space-x-3 md:space-x-4">
              {[
                { Icon: FaFacebookF, label: "Facebook" },
                { Icon: FaInstagram, label: "Instagram" },
                { Icon: FaTwitter, label: "Twitter" },
                { Icon: FaTiktok, label: "TikTok" },
              ].map(({ Icon, label }, index) => (
                <a
                  key={index}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full text-(--color-pakistan) hover:bg-(--color-tiger) hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Icon className="text-lg md:text-xl" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: The Form */}
        <div className="bg-(--color-cornsilk) shadow-lg md:shadow-2xl rounded-2xl md:rounded-3xl p-5 md:p-12 border border-gray-100 relative overflow-hidden order-1 lg:order-2">
          {/* Decorative circle - Hidden on mobile to save space/reduce clutter */}
          <div className="hidden md:block absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-(--color-earth)/10 rounded-full blur-3xl pointer-events-none"></div>

          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-8 text-(--color-pakistan)">
            Send Us a Message
          </h3>

          {state.succeeded ? (
            <div className="flex flex-col items-center justify-center h-full py-10 space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl">
                🎉
              </div>
              <p className="text-green-700 text-center text-xl md:text-2xl font-bold">
                Message Sent!
              </p>
              <p className="text-gray-500 text-center text-sm md:text-base">
                We'll get back to you as soon as possible.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 md:gap-6 relative z-10"
            >
              <div className="space-y-1 md:space-y-2">
                <label
                  htmlFor="name"
                  className="text-xs md:text-sm font-semibold text-gray-700 ml-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-(--color-earth) focus:ring-4 focus:ring-(--color-earth)/20 p-3 md:p-4 rounded-xl transition-all duration-200 outline-none text-(--color-pakistan) text-sm md:text-base"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
                <ValidationError
                  prefix="Name"
                  field="name"
                  errors={state.errors}
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="space-y-1 md:space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs md:text-sm font-semibold text-gray-700 ml-1"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-(--color-earth) focus:ring-4 focus:ring-(--color-earth)/20 p-3 md:p-4 rounded-xl transition-all duration-200 outline-none text-(--color-pakistan) text-sm md:text-base"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="space-y-1 md:space-y-2">
                <label
                  htmlFor="message"
                  className="text-xs md:text-sm font-semibold text-gray-700 ml-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="How can we help?"
                  className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-(--color-earth) focus:ring-4 focus:ring-(--color-earth)/20 p-3 md:p-4 rounded-xl transition-all duration-200 outline-none text-(--color-pakistan) h-32 md:h-40 resize-none text-sm md:text-base"
                  required
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full bg-(--color-tiger) text-white font-bold text-base md:text-lg py-3 md:py-4 rounded-xl hover:shadow-lg hover:opacity-95 transform hover:-translate-y-0.5 transition-all duration-200 mt-2"
              >
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
