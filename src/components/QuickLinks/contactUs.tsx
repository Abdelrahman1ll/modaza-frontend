import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { useForm, ValidationError } from "@formspree/react";
import { BRAND_EMAIL, BRAND_PHONE } from "../../BrandText";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [state, handleSubmit] = useForm("xldzgwvb");

  return (
    <div className="mt-10 max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-extrabold text-center mb-14 tracking-wide">
        Contact Us
      </h2>

      {/* SECTION 1 — FORM */}
      <div className=" shadow-lg rounded-2xl p-4 md:p-8 border border-gray-200 mb-8 md:mb-14">
        <h3 className="text-2xl font-bold mb-6 text-center text-(--color-pakistan)">
          Send Us a Message
        </h3>

        {state.succeeded ? (
          <p className="text-green-600 text-center text-xl font-semibold">
            Your message has been sent successfully! 🎉
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="border border-(--color-earth) focus:outline-none focus:ring-1 focus:ring-(--color-earth) p-3 rounded-lg text-(--color-pakistan)"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <ValidationError prefix="Name" field="name" errors={state.errors} />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className="border border-(--color-earth) focus:outline-none focus:ring-1 focus:ring-(--color-earth) p-3 rounded-lg text-(--color-pakistan)"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <p className="text-xs text-gray-500 mt-1">
              Please enter your valid email address so we can contact you.
            </p>
            <textarea
              name="message"
              placeholder="Your Message"
              className="border border-(--color-earth) p-3 rounded-lg h-32 focus:outline-none focus:ring-1 focus:ring-(--color-earth) text-(--color-pakistan)"
              required
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            ></textarea>
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-(--color-tiger) text-white py-3 rounded-lg font-semibold hover:opacity-90 transition duration-200"
            >
              {state.submitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        )}
      </div>

      {/* SECTION 2 — CONTACT INFO */}
      <div className="shadow-lg rounded-2xl p-4 md:p-8 border border-gray-200 bg-(--color-cornsilk)">
        <h3 className="text-2xl font-bold mb-6 text-center text-(--color-pakistan)">
          Our Contact Info
        </h3>
        <div className="grid grid-cols-1 gap-4 text-lg">
          <p className="flex items-center gap-2">
            <MdLocationOn className="text-(--color-pakistan)" size={20} />
            <span className="font-bold text-(--color-pakistan)">Address:</span>
            Egypt
          </p>
          <p className="flex items-center gap-2">
            <MdPhone className="text-(--color-pakistan)" size={20} />
            <span className="font-bold text-(--color-pakistan)">Phone:</span>
            +20 {BRAND_PHONE}
          </p>
          <p className="flex items-center gap-2">
            <MdEmail className="text-(--color-pakistan)" size={20} />
            <span className="font-bold text-(--color-pakistan)">Email:</span>
            {BRAND_EMAIL}
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4 mt-2 justify-center">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF
                className="text-(--color-tiger) hover:text-(--color-pakistan) transition"
                size={24}
              />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter
                className="text-(--color-tiger) hover:text-(--color-pakistan) transition"
                size={24}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram
                className="text-(--color-tiger) hover:text-(--color-pakistan) transition"
                size={24}
              />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok
                className="text-(--color-tiger) hover:text-(--color-pakistan) transition"
                size={24}
              />
            </a>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
