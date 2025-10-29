import { motion } from "framer-motion";
import { ShoppingCart, User, Search, X, Menu, House } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearch, setSearch] = useState(false);
  return (
    <>
      <header className="shadow-md py-4 px-6 max-[810px]:hidden">
        <div className="container mx-auto flex items-center justify-between gap-6">
          <nav className="flex items-center gap-6 font-medium">
            <Link
              to="/"
              className="font-bold transition"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text)")
              }
            >
              Home
            </Link>
            <Link
              to="/about"
              className="font-bold transition"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text)")
              }
            >
              About
            </Link>
            <Link
              to="/contact"
              className="font-bold transition"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-text)")
              }
            >
              Contact
            </Link>
          </nav>

          <Link to="/">
            <h1
              className="text-2xl font-bold drop-shadow-lg cursor-pointer"
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
                className="w-full pl-10 pr-4 py-2 rounded-full focus:border focus:outline-none"
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "#000",
                }}
              />
              <Search className="absolute left-3 top-2.5" size={18} />
            </div>

            <div className="flex items-center gap-8 mr-2">
              <motion.div
                whileHover={{ scale: 1.2, y: -4 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to="/login"
                  className="transition"
                  title="تسجيل الدخول"
                  style={{ background: "none" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text)")
                  }
                >
                  <User size={24} />
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
                    className="absolute -top-1.5 -right-2.5 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full bg-black"
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

      <header className="shadow-md py-4 px-6 min-[810px]:hidden">
        <div className="container mx-auto flex items-center justify-between gap-6">
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
            <div className="fixed top-16 left-0 h-full bg-(--color-light) w-2/3 shadow-lg z-50 flex flex-col p-6 transition-transform duration-300">
              <nav className="flex flex-col gap-4 font-medium">
                <Link
                  to="/"
                  className="font-bold py-2 px-6 flex justify-center border border-gray-300 rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text)")
                  }
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  className="font-bold py-2 px-6 flex justify-center border border-gray-300 rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text)")
                  }
                >
                  About
                </Link>

                <Link
                  to="/contact"
                  className="font-bold py-2 px-6 flex justify-center border border-gray-300 rounded-full"
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--color-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--color-text)")
                  }
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}

          <Link to="/">
            <h1
              className="text-2xl font-bold drop-shadow-lg cursor-pointer"
              style={{
                fontFamily: "'Playfair Display', serif",
                letterSpacing: "1px",
              }}
            >
              ModaZone
            </h1>
          </Link>
        </div>
      </header>

      <header
        className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50 
             bg-(--color-light) flex items-center justify-between shadow-lg 
             border border-(--color-text) py-3 px-6 rounded-full w-[90%] 
             backdrop-blur-md bg-opacity-90 min-[810px]:hidden"
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
        {isSearch && (
          <div className="fixed -top-140 left-0 right-0 z-55">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-full focus:border focus:outline-none"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "#000",
              }}
            />
            <Search className="absolute left-3 top-2.5" size={18} />
          </div>
        )}

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
            // onMouseEnter={(e) =>
            //   (e.currentTarget.style.color = "var(--color-primary)")
            // }
            // onMouseLeave={(e) =>
            //   (e.currentTarget.style.color = "var(--color-text)")
            // }
          >
            <ShoppingCart size={24} />
            <span
              className="absolute -top-1.5 -right-2.5 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full bg-black"
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
            to="/login"
            className="transition"
            title="تسجيل الدخول"
            style={{ background: "none" }}
            // onMouseEnter={(e) =>
            //   (e.currentTarget.style.color = "var(--color-primary)")
            // }
            // onMouseLeave={(e) =>
            //   (e.currentTarget.style.color = "var(--color-text)")
            // }
          >
            <User size={24} />
          </Link>
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
            // onMouseEnter={(e) =>
            //   (e.currentTarget.style.color = "var(--color-primary)")
            // }
            // onMouseLeave={(e) =>
            //   (e.currentTarget.style.color = "var(--color-text)")
            // }
          >
            <House size={24} />
          </Link>
        </motion.div>
      </header>
    </>
  );
}
