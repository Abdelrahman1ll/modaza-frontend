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
import { Link, useLocation } from "react-router-dom";
import SearchInput from "./search";
import useHeader from "./useHeader";
import { BRAND_NAME } from "../../BrandText";
import UserMenu from "./UserMenu";

/**
 * Header Component: Main navigation bar for desktop and mobile.
 * مكون الترويسة: شريط التنقل الرئيسي للحاسوب والهاتف.
 */
export default function Header() {
  const {
    isMenuOpen,
    setIsMenuOpen,
    isSearch,
    setSearch,
    isOpen,
    setIsOpen,
    selected,
    setSelected,
    nameInput,
    setNameInput,
    handleLogout,
    user,
    totalItems,
    countries,
    openSignup,
    isSearchLocal,
    navigate,
    setIsSearchLocal,
    dropdownRef,
  } = useHeader();
  const location = useLocation();

  return (
    <>
      {/* Desktop Header | ترويسة الحاسوب */}
      <header className="shadow-md py-4 px-6 max-[1180px]:hidden">
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
              All Products
            </Link>
            <Link
              to="/contact-us"
              className="font-bold transition"
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--color-tiger)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--color-dark)")
              }
            >
              Contact Us
            </Link>
          </nav>

          <Link to="/">
            <span
              className="text-4xl font-bold drop-shadow-lg cursor-pointer"
              style={{
                fontFamily: "'Dancing Script Local', cursive",
                letterSpacing: ".8px",
                minWidth: "150px", // Prevent shift if font loads late
                display: "inline-block",
              }}
            >
              {BRAND_NAME}
            </span>
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
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onFocus={() => {
                  if (location.pathname !== "/products") {
                    navigate("/products");
                  }
                }}
              />
              <Search
                className="absolute text-(--color-pakistan) left-3 top-2.5"
                size={20}
              />
            </div>

            <div className="relative inline-block text-left" ref={dropdownRef}>
              <span
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-center items-center px-2 py-1 bg-(--color-dark) text-white font-medium shadow-md focus:outline-none cursor-pointer rounded-full"
                role="button"
                aria-label="Select country"
                aria-expanded={isOpen}
                tabIndex={0}
              >
                <img
                  src={selected.flag}
                  alt={`Flag of ${selected.name}`}
                  loading="lazy"
                  decoding="async"
                  width="16"
                  height="16"
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
                          alt={`Flag of ${country.name}`}
                          loading="lazy"
                          decoding="async"
                          width="16"
                          height="16"
                          className="w-4 h-4 rounded-full mr-2 object-cover"
                        />
                        {country.name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-8 mr-2">
              {user ? (
                <UserMenu handleLogout={handleLogout} />
              ) : (
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
                    onClick={() => openSignup()}
                    role="button"
                    aria-label="Login"
                    tabIndex={0}
                  >
                    <User size={24} />
                  </div>
                </motion.div>
              )}

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
                  <Heart
                    className="cursor-pointer"
                    size={24}
                    aria-label="View Wishlist"
                  />
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
                  <ShoppingCart size={24} aria-label="View Shopping Cart" />
                  <span
                    className="absolute -top-1.5 -right-2.5 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full bg-(--color-tiger)"
                    title="Number of items in cart"
                    aria-label={`${totalItems} items in cart`}
                  >
                    {totalItems}
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Top Mobile Header | ترويسة الهاتف العلوية */}
      <header className="shadow-md py-4 px-1 min-[1180px]:hidden">
        <div className="w-full flex items-center justify-between gap-6">
          <motion.div
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              className="text-xl cursor-pointer test-(--color-text)"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <X size={26} aria-label="Close menu" />
              ) : (
                <Menu size={26} aria-label="Open menu" />
              )}
            </button>
          </motion.div>
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 w-full h-full"
                onClick={() => setIsMenuOpen(false)}
              />
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
                    All Products
                  </Link>

                  <Link
                    to="/contact-us"
                    className="font-bold py-2 px-6 flex justify-center border border-gray-300 rounded-full"
                    onClick={() => setIsMenuOpen(false)}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--color-tiger)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--color-dark)")
                    }
                  >
                    Contact Us
                  </Link>
                </nav>
              </div>
            </>
          )}

          <Link to="/">
            <span
              className="text-3xl font-bold drop-shadow-lg cursor-pointer"
              style={{
                fontFamily: "'Dancing Script Local', 'Pacifico', cursive",
                letterSpacing: ".8px",
              }}
            >
              {BRAND_NAME}
            </span>
          </Link>

          <div className="relative inline-block text-left" ref={dropdownRef}>
            <span
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex justify-center items-center px-2 py-1 bg-(--color-dark) text-white font-medium shadow-md focus:outline-none cursor-pointer rounded-full"
              role="button"
              aria-label="Select country"
              aria-expanded={isOpen}
              tabIndex={0}
            >
              <img
                src={selected.flag}
                alt={`Flag of ${selected.name}`}
                loading="lazy"
                decoding="async"
                width="16"
                height="16"
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
                        alt={`Flag of ${country.name}`}
                        loading="lazy"
                        decoding="async"
                        width="16"
                        height="16"
                        className="w-4 h-4 rounded-full mr-2 object-cover"
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

      {/* Floating Bottom Mobile Header | ترويسة الهاتف العائمة السفلية */}
      <header
        className="fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50 
             flex items-center justify-between shadow-lg 
             border border-(--color-text) py-3 px-6 rounded-full w-[90%] 
             backdrop-blur-md bg-opacity-90 min-[1180px]:hidden"
      >
        <motion.div
          whileHover={{ scale: 1.2, y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div
            className="cursor-pointer"
            onClick={() => {
              setSearch(!isSearch);
              setIsSearchLocal(!isSearchLocal);
              localStorage.removeItem("isSearch");
            }}
            role="button"
            aria-label={isSearch ? "Close search" : "Open search"}
            tabIndex={0}
          >
            {isSearch ? (
              <X size={22} aria-label="Close search" />
            ) : (
              <Search size={22} aria-label="Open search" />
            )}
          </div>
        </motion.div>

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
            <ShoppingCart size={24} aria-label="View Shopping Cart" />
            <span
              className="absolute -top-1.5 -right-2.5 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full bg-(--color-tiger)"
              title="Number of items in cart"
              aria-label={`${totalItems} items in cart`}
            >
              {totalItems}
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
            <Heart size={24} aria-label="View Wishlist" />
          </Link>
        </motion.div>

        {user ? (
          <UserMenu handleLogout={handleLogout} />
        ) : (
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
              onClick={() => openSignup()}
              role="button"
              aria-label="Login"
              tabIndex={0}
            >
              <User size={24} aria-label="Login or View Account" />
            </div>
          </motion.div>
        )}

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
            <House size={24} aria-label="Back to Home" />
          </Link>
        </motion.div>
      </header>

      {(isSearch || isSearchLocal) && (
        <SearchInput
          setSearch={setSearch}
          setIsSearchLocal={setIsSearchLocal}
        />
      )}
    </>
  );
}
