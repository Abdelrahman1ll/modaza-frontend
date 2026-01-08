import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  User,
  ShoppingBag,
  LayoutDashboard,
  Users,
  Plus,
  LogOut,
} from "lucide-react";

export default function UserMenu({ user, handleLogout }: any) {
  const avatarRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);

  // إغلاق القائمة عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        openMenu &&
        menuRef.current &&
        avatarRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenu]);

  return (
    <div className="relative">
      {/* زر الـ avatar */}
      <motion.div
        className="w-10 h-10 flex items-center justify-center rounded-full bg-(--color-tiger) text-(--color-cornsilk) font-bold text-2xl shadow-md cursor-pointer select-none"
        onClick={() => setOpenMenu(!openMenu)}
        ref={avatarRef}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        title="حسابي"
      >
        {user?.user?.email.charAt(0).toUpperCase() || "A"}
      </motion.div>

      {/* القائمة المنسدلة */}
      {openMenu && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`absolute right-0 mt-6 w-52 bg-(--color-cornsilk) text-(--color-pakistan) shadow-lg rounded-xl overflow-hidden border border-(--color-earth) z-50
                ${
                  user?.user.role === "owner"
                    ? "max-[1180px]:-top-132"
                    : "max-[1180px]:-top-42"
                }
            `}
        >
          <Link
            to="/profile"
            className="group flex items-center gap-2 px-4 py-2 transition hover:bg-(--color-tiger) hover:text-(--color-cornsilk)"
            onClick={() => setOpenMenu(false)}
          >
            <User
              size={18}
              className="text-(--color-tiger) group-hover:text-(--color-cornsilk)"
            />{" "}
            <span>Profile</span>
          </Link>

          <Link
            to="/orders"
            className="group flex items-center gap-2 px-4 py-2 transition hover:bg-(--color-tiger) hover:text-(--color-cornsilk)"
            onClick={() => setOpenMenu(false)}
          >
            <ShoppingBag
              size={18}
              className="text-(--color-tiger) group-hover:text-(--color-cornsilk)"
            />{" "}
            <span>My Orders</span>
          </Link>
          {user?.user.role === "owner" && (
            <div>
              {[
                { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
                { to: "/all-users", label: "All Users", icon: Users },
                { to: "/add-product", label: "Add Product", icon: Plus },
                { to: "/category", label: "Add Category", icon: Plus },
                { to: "/color", label: "Add Color", icon: Plus },
                { to: "/add-delivery", label: "Add Delivery", icon: Plus },
                { to: "/discount-codes", label: "Discount Codes", icon: Plus },
                {
                  to: "/all-users-messages",
                  label: "Send Message All...",
                  icon: Plus,
                },
                {
                  to: "/email-order-dispatcher",
                  label: "Email Order",
                  icon: Plus,
                },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group flex items-center gap-2 px-4 py-2 transition hover:bg-(--color-tiger) hover:text-(--color-cornsilk)"
                  onClick={() => setOpenMenu(false)}
                >
                  <item.icon
                    size={18}
                    className="text-(--color-tiger) group-hover:text-(--color-cornsilk)"
                  />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              handleLogout();
              setOpenMenu(false);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-left transition hover:bg-(--color-tiger) hover:text-(--color-cornsilk)"
          >
            <LogOut size={18} className="text-[#A80000]" />
            <span>Log Out</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
