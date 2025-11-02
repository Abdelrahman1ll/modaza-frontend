import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  User,
  Search,
  X,
  Menu,
  House,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import SearchInput from "./search";
import SignupEmail from "../Signup/signup";

const countries = [
  { name: "Egypt", flag: "/eg.svg" },
  // { name: "Saudi", flag: "https://flagcdn.com/sa.svg" },
  // { name: "Morocco", flag: "https://flagcdn.com/ma.svg" },
  // { name: "Jordan", flag: "https://flagcdn.com/jo.svg" },
  // { name: "Kuwait", flag: "https://flagcdn.com/kw.svg" },
];
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearch, setSearch] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(countries[0]);
  const [showSignup, setShowSignup] = useState(false);
  return (
    <>
      <header className="shadow-md py-4 px-6 max-[1080px]:hidden">
        <div className="w-full flex items-center justify-between gap-6">
          <nav className="flex items-center gap-6 font-medium">
            <Link
              to="/"
              className="font-bold transition"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-tiger)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-dark)")
              }
            >
              Home
            </Link>
            <Link
              to="/products"
              className="font-bold transition"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-tiger)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-dark)")
              }
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="font-bold transition"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-tiger)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-dark)")
              }
            >
              Contact
            </Link>
          </nav>

          <Link to="/">
            <h1
              className="text-3xl font-bold drop-shadow-lg cursor-pointer"
              style={{
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "1px",
              }}
            >
              ModaZone
            </h1>
          </Link>

          <div className="flex items-center gap-8">
            <div className="relative md:block w-64">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10  py-2 rounded-full focus:border focus:outline-none"
                style={{
                  color: "var(--color-pakistan)",
                }}
              />
              <Search
                className="absolute text-(--color-pakistan) left-3 top-2.5"
                size={20}
              />
            </div>

            <div className="relative inline-block text-left">
              <span
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-center items-center px-2 py-1 bg-(--color-dark) text-white font-medium shadow-md focus:outline-none cursor-pointer rounded-full"
              >
                <img
                  src={selected.flag}
                  alt={selected.name}
                  className="w-4 h-4 rounded-full mr-2 object-cover"
                />
                {selected.name}
              </span>

              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute mt-2 w-40 bg-(--color-cornsilk) rounded-lg shadow-lg z-50 overflow-hidden"
                  >
                    {countries.map((country) => (
                      <li
                        key={country.name}
                        className="flex items-center px-4 py-2 cursor-pointer hover:bg-(--color-earth)"
                        onClick={() => {
                          setSelected(country);
                          setIsOpen(false);
                        }}
                      >
                        <img
                          src={country.flag}
                          alt={country.name}
                          className="w-5 h-5 rounded-full mr-2 object-cover"
                        />
                        {country.name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-8 mr-2">
              <motion.div
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div
                  className="transition cursor-pointer"
                  title="تسجيل الدخول"
                  style={{ background: "none" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text)")
                  }
                  onClick={() => setShowSignup(true)}
                >
                  <User size={24} />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/wishlist"
                  className="transition relative "
                  title="قائمة المفضلة"
                  style={{ background: "none" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text)")
                  }
                >
                  <Heart className="cursor-pointer" size={24} />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/cart"
                  className="transition relative "
                  title="عربة التسوق"
                  style={{ background: "none" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text)")
                  }
                >
                  <ShoppingCart size={24} />
                  <span
                    className="absolute -top-1.5 -right-2.5 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full bg-(--color-tiger)"
                    title="عدد المنتجات في العربة"
                  >
                    2
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      <header className="shadow-md py-4 px-6 min-[1080px]:hidden">
        <div className="w-full flex items-center justify-between gap-6">
          <motion.div
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              className="text-xl cursor-pointer test-(--color-text)"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </motion.div>
          {isMenuOpen && (
            <div className="fixed top-24 left-0 h-full bg-(--color-cornsilk) w-2/3 shadow-lg z-50 flex flex-col p-6 transition-transform duration-300">
              <nav className="flex flex-col gap-4 font-medium">
                <Link
                  to="/"
                  className="font-bold py-2 px-6 flex justify-center border border-gray-300 rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-tiger)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-dark)")
                  }
                >
                  Home
                </Link>

                <Link
                  to="/products"
                  className="font-bold py-2 px-6 flex justify-center border border-gray-300 rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-tiger)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-dark)")
                  }
                >
                  Shop Now
                </Link>

                <Link
                  to="/contact"
                  className="font-bold py-2 px-6 flex justify-center border border-gray-300 rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-tiger)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-dark)")
                  }
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}

          <Link to="/">
            <h1
              className="text-3xl font-bold drop-shadow-lg cursor-pointer"
              style={{
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "1px",
              }}
            >
              ModaZone
            </h1>
          </Link>

          <div className="relative inline-block text-left">
            <span
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex justify-center items-center px-2 py-1 bg-(--color-dark) text-white font-medium shadow-md focus:outline-none cursor-pointer rounded-full"
            >
              <img
                src={selected.flag}
                alt={selected.name}
                className="w-4 h-4 rounded-full mr-2 object-cover"
              />
              {selected.name}
            </span>

            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute mt-1 right-0 w-40 bg-(--color-cornsilk) rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  {countries.map((country) => (
                    <li
                      key={country.name}
                      className="flex items-center px-4 py-2 cursor-pointer hover:bg-(--color-earth)"
                      onClick={() => {
                        setSelected(country);
                        setIsOpen(false);
                      }}
                    >
                      <img
                        src={country.flag}
                        alt={country.name}
                        className="w-5 h-5 rounded-full mr-2 object-cover"
                      />
                      {country.name}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      <header
        className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50 
             bg-(--color-light) flex items-center justify-between shadow-lg 
             border border-(--color-text) py-3 px-6 rounded-full w-[90%] 
             backdrop-blur-md bg-opacity-90 min-[1080px]:hidden"
      >
        <motion.div
          whileHover={{ scale: 1.2, y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="cursor-pointer" onClick={() => setSearch(!isSearch)}>
            {isSearch ? <X size={22} /> : <Search size={22} />}
          </div>
        </motion.div>

        {isSearch && <SearchInput onClose={() => setSearch(false)} />}

        <motion.div
          whileHover={{ scale: 1.2, y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/cart"
            className="transition relative"
            title="عربة التسوق"
            style={{ background: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
          >
            <ShoppingCart size={24} />
            <span
              className="absolute -top-1.5 -right-2.5 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full bg-(--color-tiger)"
              title="عدد المنتجات في العربة"
            >
              2
            </span>
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2, y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/wishlist"
            className="transition relative"
            title="عربة التسوق"
            style={{ background: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
          >
            <Heart size={24} />
          </Link>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2, y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div
            className="transition cursor-pointer"
            title="تسجيل الدخول"
            style={{ background: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
            onClick={() => setShowSignup(true)}
          >
            <User size={24} />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2, y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/"
            className="transition"
            title="الصفحة الرئيسية"
            style={{ background: "none" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
          >
            <House size={24} />
          </Link>
        </motion.div>
      </header>

      {showSignup && <SignupEmail onClose={() => setShowSignup(false)} />}
    </>
  );
}
