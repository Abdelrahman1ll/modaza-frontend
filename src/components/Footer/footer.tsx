import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa6";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { useContext } from "react";
import { SignupContext } from "../../context/SignupContext";
import { Link } from "react-router-dom";
import { BRAND_EMAIL, BRAND_NAME, BRAND_PHONE } from "../../BrandText";
import { motion } from "framer-motion";

/**
 * Footer: Site footer with brand info, quick links, and social media.
 * التذييل: ذيل الموقع يحتوي على معلومات العلامة التجارية، الروابط السريعة، ووسائل التواصل.
 */
export default function Footer() {
  const { openSignup } = useContext(SignupContext);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-(--color-pakistan)/90 backdrop-blur-md pt-20 pb-10 px-6 md:px-16 mt-12 overflow-hidden border-t border-(--color-cornsilk)/10">
      {/* Decorative background element */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-(--color-tiger)/5 blur-[100px] rounded-full -translate-y-1/2" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10"
      >
        <motion.div variants={itemVariants} className="space-y-6">
          <div>
            <h2 className="text-3xl font-extrabold text-(--color-cornsilk) tracking-tight mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-(--color-tiger) rounded-full mr-1" />
              {BRAND_NAME}
            </h2>
            <p className="text-sm leading-relaxed text-(--color-earth)/90 font-medium max-w-xs">
              Elevating contemporary fashion with premium quality and timeless
              designs. We blend comfort with refined aesthetics to reflect your
              unique identity.
            </p>
          </div>
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-(--color-cornsilk) font-semibold hover:text-(--color-tiger) transition-colors duration-300"
          >
            <span className="underline underline-offset-4 decoration-1 decoration-(--color-tiger)/50 group-hover:decoration-(--color-tiger)">
              Discover Our Collection
            </span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-lg font-bold text-(--color-cornsilk) uppercase tracking-wider flex items-center gap-2">
            Explore
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              "About Us",
              "Contact Us",
              "FAQs",
              "Shipping & Delivery",
              "Secure Payment",
              "Shipping in Egypt",
            ].map((item) => (
              <li key={item}>
                <a
                  href={`/${item
                    .toLowerCase()
                    .replace(/ & /g, "-")
                    .replace(/ /g, "-")}`}
                  className="text-(--color-earth) hover:text-(--color-cornsilk) hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-lg font-bold text-(--color-cornsilk) uppercase tracking-wider">
            Resources
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              { name: "Sales & Payment Policy", path: "/sales-payment-policy" },
              {
                name: "Return & Exchange Policy",
                path: "/return-exchange-policy",
              },
              { name: "Privacy Policy", path: "/privacy-policy" },
              { name: "Terms & Conditions", path: "/terms-conditions" },
            ].map((policy) => (
              <li key={policy.name}>
                <a
                  href={policy.path}
                  className="text-(--color-earth) hover:text-(--color-cornsilk) hover:translate-x-1 inline-block transition-all duration-300"
                >
                  {policy.name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-6">
          <h3 className="text-lg font-bold text-(--color-cornsilk) uppercase tracking-wider">
            Stay Connected
          </h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 text-(--color-earth) group cursor-pointer">
              <div className="p-2 rounded-lg bg-(--color-cornsilk)/5 group-hover:bg-(--color-tiger)/20 transition-colors">
                <MdLocationOn size={18} className="text-(--color-tiger)" />
              </div>
              <span className="group-hover:text-(--color-cornsilk) transition-colors">
                Cairo, Egypt
              </span>
            </li>
            <li className="flex items-center gap-3 text-(--color-earth) group">
              <div className="p-2 rounded-lg bg-(--color-cornsilk)/5 group-hover:bg-(--color-tiger)/20 transition-colors">
                <MdPhone size={18} className="text-(--color-tiger)" />
              </div>
              <a
                href={`https://wa.me/2${BRAND_PHONE}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group-hover:text-(--color-cornsilk) transition-colors"
              >
                +2{BRAND_PHONE}
              </a>
            </li>
            <li className="flex items-center gap-3 text-(--color-earth) group">
              <div className="p-2 rounded-lg bg-(--color-cornsilk)/5 group-hover:bg-(--color-tiger)/20 transition-colors">
                <MdEmail size={18} className="text-(--color-tiger)" />
              </div>
              <a
                href={`mailto:${BRAND_EMAIL}`}
                className="group-hover:text-(--color-cornsilk) transition-colors hover:underline"
              >
                {BRAND_EMAIL}
              </a>
            </li>
          </ul>

          <div className="space-y-4 pt-4">
            <p className="text-xs font-semibold text-(--color-earth) uppercase tracking-tight">
              Join Our Newsletter
            </p>
            <div className="flex group">
              <input
                id="newsletter-email"
                type="email"
                placeholder="email@example.com"
                className="flex-1 p-3 text-sm rounded-l-xl bg-(--color-cornsilk)/5 text-(--color-cornsilk) border border-(--color-cornsilk)/10 focus:border-(--color-tiger)/50 focus:outline-none transition-all"
                onChange={() => openSignup()}
                value={""}
              />
              <button
                className="bg-(--color-tiger) hover:bg-(--color-tiger)/90 text-white px-6 rounded-r-xl text-sm font-bold transition-all active:scale-95"
                onClick={() => openSignup()}
              >
                Join
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            {[
              { icon: FaFacebookF, label: "Facebook" },
              { icon: FaInstagram, label: "Instagram" },
              { icon: FaTwitter, label: "Twitter" },
              { icon: FaTiktok, label: "TikTok" },
            ].map((social, idx) => (
              <a
                key={idx}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-(--color-cornsilk)/5 text-(--color-earth) hover:bg-(--color-tiger) hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg"
                aria-label={`Follow us on ${social.label}`}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto border-t border-(--color-cornsilk)/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-(--color-earth)/60">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-(--color-cornsilk)">
            {BRAND_NAME.toUpperCase()}
          </span>
          . ALL RIGHTS RESERVED.
        </p>
        <div className="flex gap-6">
          <Link
            to="/secure-payment"
            className="hover:text-(--color-cornsilk) transition-colors"
          >
            SECURE PAYMENT
          </Link>
          <Link
            to="/shipping-in-egypt"
            className="hover:text-(--color-cornsilk) transition-colors"
          >
            SHIPPING IN EGYPT
          </Link>
        </div>
      </div>
    </footer>
  );
}
