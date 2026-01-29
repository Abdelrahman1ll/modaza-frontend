import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  User,
  Search,
  X,
  Menu,
  House,
  Heart,
  ChevronDown,
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
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleCountryDropdown}
                className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-300 select-none border border-white/40 shadow-[0_4px_12px_rgba(0,0,0,0.05)] ${
                  isOpen
                    ? "bg-white shadow-md border-(--color-tiger)/20"
                    : "bg-white/40 backdrop-blur-md hover:bg-white/80"
                }`}
                aria-label="Select country"
                aria-expanded={isOpen}
              >
                <div className="relative">
                  <img
                    src={selected.flag}
                    alt={selected.name}
                    className="w-5 h-5 rounded-full object-cover shadow-sm ring-1 ring-black/5"
                  />
                  {isOpen && (
                    <motion.div
                      layoutId="active-indicator"
                      className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-(--color-tiger) rounded-full border border-white"
                    />
                  )}
                </div>
                <span className="text-sm font-black text-(--color-pakistan) tracking-tight">
                  {selected.name}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    size={14}
                    className="text-(--color-pakistan)/40"
                  />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute right-0 mt-5 w-56 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white z-50 overflow-hidden p-2"
                  >
                    <div className="px-3 py-2 border-b border-black/5 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-(--color-pakistan)/40">
                        Choose Style Domain
                      </span>
                    </div>
                    {countries.map((country, idx) => (
                      <motion.button
                        key={country.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: idx * 0.05 },
                        }}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all duration-200 group ${
                          selected.name === country.name
                            ? "bg-(--color-tiger) text-white shadow-lg shadow-(--color-tiger)/20"
                            : "hover:bg-(--color-tiger)/5 text-(--color-pakistan)"
                        }`}
                        onClick={() => {
                          setSelected(country);
                          setIsOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={country.flag}
                            alt={country.name}
                            className={`w-6 h-6 rounded-full object-cover shadow-sm ring-1 ${
                              selected.name === country.name
                                ? "ring-white/20"
                                : "ring-black/5"
                            }`}
                          />
                          <span className="text-sm font-bold tracking-tight">
                            {country.name}
                          </span>
                        </div>
                        {selected.name === country.name && (
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
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
                  aria-label="View Wishlist"
                >
                  <Heart className="cursor-pointer" size={22} strokeWidth={2} />
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
                  aria-label={`View Shopping Cart, ${totalItems} items`}
                >
                  <ShoppingBag size={22} strokeWidth={2} />
                  <span
                    className="absolute top-0 right-0 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full bg-(--color-tiger) shadow-sm ring-2 ring-[--color-cornsilk]"
                    title="Number of items in cart"
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
        className="sticky top-0 z-40 transition-all duration-300 backdrop-blur-lg shadow-md py-3 px-4 min-[1180px]:hidden"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-cornsilk), transparent 15%)",
          borderBottom:
            "1px solid color-mix(in srgb, var(--color-dark), transparent 92%)",
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
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleCountryDropdown}
              className={`flex items-center justify-center p-1.5 rounded-full transition-all duration-300 ring-1 ${
                isOpen
                  ? "bg-white shadow-lg ring-(--color-tiger)/20"
                  : "bg-white/40 ring-black/5"
              }`}
              aria-label="Select country"
              aria-expanded={isOpen}
            >
              <img
                src={selected.flag}
                alt={selected.name}
                className="w-6 h-6 rounded-full object-cover shadow-sm"
              />
            </motion.button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute top-14 right-0 w-48 bg-white/90 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white z-50 overflow-hidden p-2"
                >
                  <div className="px-3 py-2 border-b border-black/5 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-(--color-pakistan)/40 text-left block">
                      Region
                    </span>
                  </div>
                  {countries.map((country, i) => (
                    <button
                      key={i}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 ${
                        selected.name === country.name
                          ? "bg-(--color-tiger) text-white shadow-lg shadow-(--color-tiger)/20 font-bold"
                          : "hover:bg-(--color-tiger)/5 text-(--color-pakistan)"
                      }`}
                      onClick={() => {
                        setSelected(country);
                        setIsOpen(false);
                      }}
                    >
                      <img
                        src={country.flag}
                        alt={country.name}
                        className={`w-5 h-5 rounded-full object-cover shadow-sm ring-1 ${
                          selected.name === country.name
                            ? "ring-white/20"
                            : "ring-black/5"
                        }`}
                      />
                      <span className="text-sm">{country.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Floating Bottom Mobile Header | ترويسة الهاتف العائمة السفلية */}
      <header
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 
             flex items-center justify-between shadow-2xl shadow-black/20
             border border-white/50 py-3 px-8 rounded-full w-[90%] max-w-sm
             backdrop-blur-xl min-[1180px]:hidden ring-1 ring-black/5"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-cornsilk)/10, transparent 20%)",
        }}
      >
        <motion.div whileTap={{ scale: 0.9 }} className="relative">
          <div
            className={`p-2 rounded-full transition-all ${
              isSearch
                ? "bg-(--color-tiger) text-white shadow-lg shadow-(--color-tiger)/30"
                : "text-(--color-dark) hover:bg-(--color-tiger)/30 hover:shadow-md transition-all"
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
            className="block p-2 rounded-full relative text-(--color-dark) hover:bg-(--color-tiger)/30 hover:shadow-md transition-all"
            title="عربة التسوق"
          >
            <ShoppingBag size={24} strokeWidth={2.5} />
            <span className="absolute -top-1 -right-1 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full bg-(--color-tiger) shadow-md border-2 border-(--color-cornsilk)">
              {totalItems}
            </span>
          </Link>
        </motion.div>

        <motion.div whileTap={{ scale: 0.9 }}>
          <Link
            to="/wishlist"
            className="block p-2 rounded-full text-(--color-dark) hover:bg-(--color-tiger)/30 hover:shadow-md transition-all"
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
              className="block p-2 rounded-full text-(--color-dark) hover:bg-(--color-tiger)/30 hover:shadow-md transition-all cursor-pointer"
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
            className="block p-2 rounded-full text-(--color-dark) hover:bg-(--color-tiger)/30 hover:shadow-md transition-all"
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
