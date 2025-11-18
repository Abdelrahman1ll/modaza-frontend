import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function SearchInput({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (name) {
        searchParams.set("name", name);
      } else {
        searchParams.delete("name");
      }
      setSearchParams(searchParams);
    }, 500);

    return () => clearTimeout(handler);
  }, [name]);

  return createPortal(
    <div
      className="
        fixed top-24 left-0 w-full flex justify-center z-40
        min-[1080px]:hidden
      "
    >
      <div className="relative w-11/12 max-w-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-12 pr-12 py-2 rounded-full text-lg focus:outline-none shadow-lg opacity-90"
          style={{
            backgroundColor: "var(--color-dark)",
            color: "#000",
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
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
