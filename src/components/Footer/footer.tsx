import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { useState } from "react";
import Signup from "../Signup/signup";
export default function Footer() {
  const [showSignup, setShowSignup] = useState(false);
  return (
    <footer className="bg-(--color-pakistan)  pt-14 pb-8 px-6 md:px-16  max-[1070px]:pb-18 mt-6">
      <div className="max-w-7xl mx-auto grid grid-cols-4 max-[1100px]:grid-cols-2 max-[800px]:grid-cols-1 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-(--color-cornsilk) mb-3">
            ModaZone
          </h2>
          <p className="text-sm leading-relaxed text-(--color-earth)">
            ModaZone is your go-to men’s fashion store, offering the latest
            styles with premium quality and affordable prices.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-(--color-cornsilk) mb-4">
            Categories
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#"
                className="text-(--color-earth) hover:text-(--color-cornsilk) transition"
              >
                T-Shirts
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-(--color-earth) hover:text-(--color-cornsilk) transition"
              >
                Pants
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-(--color-earth) hover:text-(--color-cornsilk) transition"
              >
                Jackets
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-(--color-earth) hover:text-(--color-cornsilk) transition"
              >
                Shoes
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-(--color-earth) hover:text-(--color-cornsilk) transition"
              >
                Accessories
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-(--color-cornsilk) mb-4">
            Policies
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="/sales-payment-policy"
                className="text-(--color-earth) hover:text-(--color-cornsilk) transition"
              >
                Sales & Payment Policy
              </a>
            </li>
            <li>
              <a
                href="/return-exchange-policy"
                className="text-(--color-earth) hover:text-(--color-cornsilk) transition"
              >
                Return & Exchange Policy
              </a>
            </li>
            <li>
              <a
                href="/privacy-policy"
                className="text-(--color-earth) hover:text-(--color-cornsilk) transition"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-conditions"
                className=" text-(--color-earth) hover:text-(--color-cornsilk) transition"
              >
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-(--color-cornsilk) mb-4">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2 text-(--color-earth)">
              <MdLocationOn size={18} /> Fayoum, Egypt
            </li>
            <li className="flex items-center gap-2 text-(--color-earth)">
              <MdPhone size={18} /> +20 100 234 5678
            </li>
            <li className="flex items-center gap-2 text-(--color-earth)">
              <MdEmail size={18} /> support@modazone.com
            </li>
          </ul>

          <div className="mt-6">
            <p className="text-sm mb-2 text-(--color-earth)">
              Subscribe to our newsletter:
            </p>
            <div className="flex ">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 text-sm rounded-l-md w-full bg-(--color-cornsilk) text-(--color-pakistan) border border-(--color-tiger) focus:outline-none"
                onChange={() => setShowSignup(true)}
                value={""}
              />
              <button
                className="bg-(--color-tiger) cursor-pointer hover:opacity-90 text-white px-4 rounded-r-md text-sm font-medium"
                onClick={() => setShowSignup(true)}
              >
                Subscribe
              </button>
              {showSignup && <Signup onClose={() => setShowSignup(false)} />}
            </div>
          </div>

          <div className="flex gap-4 mt-5 text-(--color-earth) ">
            <a href="#" className="hover:text-(--color-cornsilk)">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-(--color-cornsilk)">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-(--color-cornsilk)">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-(--color-cornsilk)">
              <FaTiktok size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t  border-(--color-earth) mt-10 pt-4 text-center text-sm text-(--color-earth)">
        © {new Date().getFullYear()} ModaZone | All Rights Reserved.
      </div>
    </footer>
  );
}
