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
    desktopDropdownRef,
    mobileDropdownRef,
    toggleCountryDropdown,
  } = useHeader();
  const location = useLocation();

  return (
    <>
      {/* Desktop Header | ترويسة الحاسوب */}
      <header
        className="absolute top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-md shadow-sm py-3 px-6 max-[1180px]:hidden"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-cornsilk), transparent 20%)",
          borderBottom:
            "1px solid color-mix(in srgb, var(--color-dark), transparent 90%)",
        }}
      >
        <div className="w-full flex items-center justify-between gap-6 max-w-[1920px] mx-auto">
          <nav className="flex items-center gap-8 font-medium">
            <Link
              to="/"
              className="text-(--color-dark) hover:text-(--color-tiger) font-bold transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--color-tiger) transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/products"
              className="text-(--color-dark) hover:text-(--color-tiger) font-bold transition-colors duration-300 relative group"
            >
              All Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--color-tiger) transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              to="/contact-us"
              className="text-(--color-dark) hover:text-(--color-tiger) font-bold transition-colors duration-300 relative group"
            >
              Contact Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-(--color-tiger) transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>

          <Link
            to="/"
            className="transform hover:scale-105 transition-transform duration-300"
          >
            <span
              className="text-4xl font-bold drop-shadow-sm cursor-pointer text-(--color-dark)"
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

          <div className="flex items-center gap-6">
            <div className="relative md:block w-72">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white/60 focus:bg-white shadow-inner focus:shadow-md transition-all duration-300 outline-none"
                style={{
                  color: "var(--color-pakistan)",
                  border:
                    "1px solid color-mix(in srgb, var(--color-pakistan), transparent 80%)",
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
                className="absolute text-(--color-pakistan)/70 left-4 top-3"
                size={18}
              />
            </div>

            <div
              className="relative inline-block text-left"
              ref={desktopDropdownRef}
            >
              <span
                onClick={toggleCountryDropdown}
                className="inline-flex justify-center items-center px-4 py-2 bg-white/60 hover:bg-white text-(--color-dark) font-medium shadow-sm active:scale-95 transition-all duration-200 cursor-pointer rounded-full select-none"
                style={{
                  border:
                    "1px solid color-mix(in srgb, var(--color-pakistan), transparent 90%)",
                }}
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
                  width="18"
                  height="18"
                  className="w-4.5 h-4.5 rounded-full mr-2.5 object-cover shadow-sm"
                />
                <span className="text-sm">{selected.name}</span>
              </span>

              <AnimatePresence>
                {isOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-5 w-48 backdrop-blur-xl rounded-xl shadow-xl z-50 overflow-hidden py-1"
                    style={{
                      backgroundColor:
                        "color-mix(in srgb, var(--color-cornsilk), transparent 5%)",
                      border:
                        "1px solid color-mix(in srgb, var(--color-earth), transparent 80%)",
                    }}
                  >
                    {countries.map((country) => (
                      <li
                        key={country.name}
                        className="flex items-center px-3 py-1 cursor-pointer hover:bg-(--color-earth)/10 border-b border-black/5 last:border-0"
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
                          width="20"
                          height="20"
                          className="w-5 h-5 rounded-full mr-3 object-cover shadow-sm"
                        />
                        <span className="text-lg font-medium">
                          {country.name}
                        </span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-5 mr-1">
              {user ? (
                <UserMenu handleLogout={handleLogout} />
              ) : (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className="p-2 rounded-full hover:bg-white/50 transition-colors cursor-pointer text-(--color-dark) hover:text-(--color-primary)"
                    title="تسجيل الدخول"
                    onClick={() => openSignup()}
                    role="button"
                    aria-label="Login"
                    tabIndex={0}
                  >
                    <User size={22} strokeWidth={2} />
                  </div>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/wishlist"
                  className="block p-2 rounded-full hover:bg-white/50 transition-colors text-(--color-dark) hover:text-(--color-primary) relative"
                  title="قائمة المفضلة"
                >
                  <Heart
                    className="cursor-pointer"
                    size={22}
                    strokeWidth={2}
                    aria-label="View Wishlist"
                  />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/cart"
                  className="block p-2 rounded-full hover:bg-white/50 transition-colors text-(--color-dark) hover:text-(--color-primary) relative"
                  title="عربة التسوق"
                >
                  <ShoppingCart
                    size={22}
                    strokeWidth={2}
                    aria-label="View Shopping Cart"
                  />
                  <span
                    className="absolute top-0 right-0 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full bg-(--color-tiger) shadow-sm ring-2 ring-[--color-cornsilk]"
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
      <header
        className="sticky top-0 z-40 transition-all duration-300 backdrop-blur-md shadow-sm py-3 px-4 min-[1180px]:hidden"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-cornsilk), transparent 10%)",
          borderBottom:
            "1px solid color-mix(in srgb, var(--color-dark), transparent 95%)",
        }}
      >
        <div className="w-full flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-black/5 text-[--color-dark]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X size={24} aria-label="Close menu" />
            ) : (
              <Menu size={24} aria-label="Open menu" />
            )}
          </motion.button>

          {isMenuOpen && (
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 w-full h-full backdrop-blur-sm"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-4 left-4 h-[calc(100vh-2rem)] w-[80%] max-w-sm bg-(--color-cornsilk) shadow-2xl z-50 flex flex-col p-8 border border-white/20 rounded-3xl overflow-hidden"
              >
                <div className="mb-8 flex justify-between items-center">
                  <span
                    className="text-3xl font-bold text-(--color-dark)"
                    style={{ fontFamily: "'Dancing Script Local', cursive" }}
                  >
                    {BRAND_NAME}
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 hover:bg-black/5 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </div>

                <nav className="flex flex-col gap-4 font-medium">
                  <Link
                    to="/"
                    className="font-bold py-3 px-6 flex items-center bg-white/40 border border-white/20 rounded-2xl text-(--color-dark) shadow-sm hover:shadow-md hover:bg-white/60 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <House size={18} className="mr-3 opacity-70" />
                    Home
                  </Link>

                  <Link
                    to="/products"
                    className="font-bold py-3 px-6 flex items-center bg-white/40 border border-white/20 rounded-2xl text-(--color-dark) shadow-sm hover:shadow-md hover:bg-white/60 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Search size={18} className="mr-3 opacity-70" />
                    All Products
                  </Link>

                  <Link
                    to="/contact-us"
                    className="font-bold py-3 px-6 flex items-center bg-white/40 border border-white/20 rounded-2xl text-(--color-dark) shadow-sm hover:shadow-md hover:bg-white/60 transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={18} className="mr-3 opacity-70" />
                    Contact Us
                  </Link>
                </nav>
              </motion.div>
            </div>
          )}

          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <span
              className="text-3xl font-bold drop-shadow-sm cursor-pointer text-(--color-dark)"
              style={{
                fontFamily: "'Dancing Script Local', 'Pacifico', cursive",
                letterSpacing: ".8px",
              }}
            >
              {BRAND_NAME}
            </span>
          </Link>

          <div
            className="relative inline-block text-left"
            ref={mobileDropdownRef}
          >
            <span
              onClick={toggleCountryDropdown}
              className="inline-flex justify-center items-center p-2 rounded-full hover:bg-black/5 transition-colors"
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
                width="20"
                height="20"
                className="w-6 h-6 rounded-full object-cover shadow-sm ring-2 ring-white/50"
              />
            </span>

            <AnimatePresence>
              {isOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-14 right-0 w-44 bg-(--color-cornsilk)/95 backdrop-blur-xl rounded-xl shadow-xl border border-(--color-earth)/20 z-50 overflow-hidden py-1"
                >
                  {countries.map((country) => (
                    <li
                      key={country.name}
                      className="flex items-center px-3 py-1 cursor-pointer hover:bg-(--color-earth)/10 border-b border-black/5 last:border-0"
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
                        width="20"
                        height="20"
                        className="w-5 h-5 rounded-full mr-3 object-cover shadow-sm"
                      />
                      <span className="text-lg font-medium">
                        {country.name}
                      </span>
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
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 
             flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.12)] 
             border border-white/40 py-3 px-8 rounded-full w-[90%] max-w-sm
             backdrop-blur-xl min-[1180px]:hidden ring-1 ring-black/5"
      >
        <motion.div whileTap={{ scale: 0.9 }} className="relative">
          <div
            className={`p-2 rounded-full transition-all ${
              isSearch
                ? "bg-(--color-tiger) text-white shadow-lg shadow-(--color-tiger)/30"
                : "text-(--color-dark) hover:bg-black/5"
            }`}
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
              <X size={22} strokeWidth={2.5} />
            ) : (
              <Search size={22} strokeWidth={2.5} />
            )}
          </div>
        </motion.div>

        <motion.div whileTap={{ scale: 0.9 }}>
          <Link
            to="/cart"
            className="block p-2 rounded-full relative text-(--color-dark) hover:bg-black/5 transition-all"
            title="عربة التسوق"
          >
            <ShoppingCart size={24} strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full bg-(--color-tiger) shadow-md border-2 border-(--color-cornsilk)">
              {totalItems}
            </span>
          </Link>
        </motion.div>

        <motion.div whileTap={{ scale: 0.9 }}>
          <Link
            to="/wishlist"
            className="block p-2 rounded-full text-(--color-dark) hover:bg-black/5 transition-all"
            title="قائمة المفضلة"
          >
            <Heart size={24} strokeWidth={2.5} />
          </Link>
        </motion.div>

        {user ? (
          <UserMenu handleLogout={handleLogout} />
        ) : (
          <motion.div whileTap={{ scale: 0.9 }}>
            <div
              className="block p-2 rounded-full text-(--color-dark) hover:bg-black/5 transition-all cursor-pointer"
              title="تسجيل الدخول"
              onClick={() => openSignup()}
              role="button"
              aria-label="Login"
              tabIndex={0}
            >
              <User size={24} strokeWidth={2.5} />
            </div>
          </motion.div>
        )}

        <motion.div whileTap={{ scale: 0.9 }}>
          <Link
            to="/"
            className="block p-2 rounded-full text-(--color-dark) hover:bg-black/5 transition-all"
            title="الصفحة الرئيسية"
          >
            <House size={24} strokeWidth={2.5} />
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
