import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { useEffect } from "react";

export default function SearchInput({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handleScroll = () => {
      onClose();
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onClose]);

  return createPortal(
    <div
      className="
        fixed top-[70px] left-0 w-full flex justify-center z-40
        min-[1080px]:hidden
      "
    >
      <div className="relative w-11/12 max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-12 pr-12 py-2 rounded-full text-lg focus:outline-none shadow-lg"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "#000",
          }}
          autoFocus
        />
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2"
          size={22}
        />
        <X
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-black"
          size={22}
          onClick={onClose}
        />
      </div>
    </div>,
    document.body
  );
}
