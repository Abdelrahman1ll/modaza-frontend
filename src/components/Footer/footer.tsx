import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-(--color-dark) text-(--color-light) pt-14 pb-8 px-6 md:px-16  max-[1070px]:pb-18 mt-6">
      <div className="max-w-7xl mx-auto grid grid-cols-4 max-[1100px]:grid-cols-2 max-[800px]:grid-cols-1 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-(--color-primary) mb-3">
            ModaZone
          </h2>
          <p className="text-sm leading-relaxed text-gray-400">
            ModaZone is your go-to men’s fashion store, offering the latest
            styles with premium quality and affordable prices.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-(--color-primary) mb-4">
            Categories
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-(--color-primary) transition">
                T-Shirts
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-(--color-primary) transition">
                Pants
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-(--color-primary) transition">
                Jackets
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-(--color-primary) transition">
                Shoes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-(--color-primary) transition">
                Accessories
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-(--color-primary) mb-4">
            Policies
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-(--color-primary) transition">
                Sales & Payment Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-(--color-primary) transition">
                Return & Exchange Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-(--color-primary) transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-(--color-primary) transition">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-(--color-primary) mb-4">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MdLocationOn size={18} /> Fayoum, Egypt
            </li>
            <li className="flex items-center gap-2">
              <MdPhone size={18} /> +20 100 234 5678
            </li>
            <li className="flex items-center gap-2">
              <MdEmail size={18} /> support@modazone.com
            </li>
          </ul>

          <div className="mt-6">
            <p className="text-sm mb-2 text-gray-400">
              Subscribe to our newsletter:
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 text-sm rounded-l-md w-full bg-(--color-light) text-(--color-dark) border border-(--color-primary) focus:outline-none"
              />
              <button className="bg-(--color-primary) hover:opacity-90 text-(--color-dark) px-4 rounded-r-md text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-5 text-gray-400">
            <a href="#" className="hover:text-(--color-primary)">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-(--color-primary)">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-(--color-primary)">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-(--color-primary)">
              <FaTiktok size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ModaZone | All Rights Reserved.
      </div>
    </footer>
  );
}
