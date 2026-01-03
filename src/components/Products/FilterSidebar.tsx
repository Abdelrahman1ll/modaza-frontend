import { useState } from "react";

// --- Types ---
export interface ColorOption {
  name: string;
  class: string;
  value: string;
}

interface FilterDrawerProps {
  categories: string[];
  colors: ColorOption[];
  minPrice: number;
  maxPrice: number;

  // State
  selectedCats: string[];
  setSelectedCats: (cats: string[]) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  onClearAll: () => void;
}

// --- Icons (Internal) ---
const IconChevronDown = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);
const IconChevronUp = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
);
const IconFilter = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
);
const IconClose = () => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// --- Helper Component ---
const Accordion = ({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-(--color-pakistan) py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-medium text-gray-900 hover:text-(--color-tiger) transition-colors"
      >
        <span>{title}</span>
        {isOpen ? <IconChevronUp /> : <IconChevronDown />}
      </button>
      {isOpen && (
        <div className="mt-4 animate-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

export default function FilterSidebar({
  categories,
  colors,
  minPrice,
  maxPrice,
  selectedCats,
  setSelectedCats,
  selectedColors,
  setSelectedColors,
  priceRange,
  setPriceRange,
  onClearAll,
}: FilterDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = (
    item: string,
    list: string[],
    setList: (l: string[]) => void
  ) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Best Selling");

  const sortOptions = [
    { label: "Best Selling", value: "best-selling" },
    { label: "Price: High to Low", value: "price-high" },
    { label: "Price: Low to High", value: "price-low" },
    { label: "Newest Products", value: "newest" },
    { label: "Featured Products", value: "featured" },
  ];

  return (
    <div className="m-4 mb-8">
      {/* Trigger Button */}
      <div className="w-full mx-auto px-4 flex flex-col sm:flex-row sm:justify-between gap-2 mb-2">
        {/* Show Filters */}
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-(--color-cornsilk) text-(--color-pakistan) 
               px-4 py-2 sm:px-3 sm:py-2 border border-(--color-pakistan) rounded-sm 
               hover:bg-(--color-pakistan) hover:text-(--color-cornsilk) transition-colors cursor-pointer w-full sm:w-auto"
        >
          <IconFilter />
          <span>Show Filters</span>
        </button>

        {/* Best Selling */}
        <div className="flex justify-start w-full sm:w-auto">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="flex items-center justify-between w-full sm:w-48 bg-(--color-cornsilk) text-(--color-pakistan) 
                 px-4 py-2 sm:px-3 sm:py-2 border border-(--color-pakistan) rounded-sm 
                 hover:bg-(--color-pakistan) hover:text-(--color-cornsilk) transition-colors cursor-pointer"
          >
            <span>{selectedSort}</span>
            <svg
              className={`w-4 h-4 transition-transform ${
                sortOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {sortOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setSortOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-8 w-48 bg-(--color-cornsilk) rounded-md shadow-lg border border-gray-200 z-20 overflow-hidden">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSelectedSort(option.label);
                  setSortOpen(false);
                  // هنا تقدر تعمل الـ sorting logic
                  console.log("Sort by:", option.value);
                }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors
              ${
                selectedSort === option.label
                  ? "bg-(--color-tiger) text-(--color-cornsilk) font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Slide-over Drawer */}
      <div
        className={`fixed inset-0 z-50 flex transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black/25 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer Content */}
        <div
          className="relative w-full max-w-[300px] md:max-w-sm bg-(--color-cornsilk) p-6 shadow-xl overflow-y-auto h-full z-50 
  [&::-webkit-scrollbar]:hidden"
        >
          {" "}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">Filters</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <IconClose />
            </button>
          </div>
          <div className="space-y-6">
            <Accordion title="Category">
              <div className="space-y-2">
                {categories.map((cat) => (
                  <div key={cat} className="flex items-center">
                    <input
                      type="checkbox"
                      id={cat}
                      checked={selectedCats.includes(cat)}
                      onChange={() =>
                        toggleList(cat, selectedCats, setSelectedCats)
                      }
                      className="h-4 w-4 rounded border-gray-300"
                      style={{
                        accentColor: "var(--color-tiger)",
                      }}
                    />

                    <label
                      htmlFor={cat}
                      className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-(--color-tiger)"
                    >
                      {cat}
                    </label>
                  </div>
                ))}
              </div>
            </Accordion>

            <Accordion title="Price Range">
              <div className="space-y-4">
                <div className="relative h-8 flex items-center px-2">
                  {/* Track Background */}
                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gray-300 rounded-full pointer-events-none" />

                  {/* Active Track */}
                  <div
                    className="absolute h-1 bg-(--color-tiger) rounded-full pointer-events-none top-1/2 -translate-y-1/2"
                    style={{
                      left: `${
                        ((priceRange[0] - minPrice) / (maxPrice - minPrice)) *
                        100
                      }%`,
                      right: `${
                        100 -
                        ((priceRange[1] - minPrice) / (maxPrice - minPrice)) *
                          100
                      }%`,
                    }}
                  />

                  {/* Min Slider */}
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([
                        Math.min(Number(e.target.value), priceRange[1] - 10),
                        priceRange[1],
                      ])
                    }
                    style={{
                      zIndex: priceRange[0] > maxPrice - 100 ? "40" : "30",
                    }}
                    className="absolute w-full h-8 top-1/2 left-0 -translate-y-1/2 appearance-none cursor-pointer bg-transparent pointer-events-none 
          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-(--color-tiger)
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:cursor-grab
          [&::-webkit-slider-thumb]:hover:scale-125
          [&::-webkit-slider-thumb]:active:cursor-grabbing
          [&::-webkit-slider-thumb]:transition-transform
          [&::-moz-range-thumb]:pointer-events-auto
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-(--color-tiger)
          [&::-moz-range-thumb]:border-4
          [&::-moz-range-thumb]:border-white
          [&::-moz-range-thumb]:cursor-grab"
                  />

                  {/* Max Slider */}
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        Math.max(Number(e.target.value), priceRange[0] + 10),
                      ])
                    }
                    className="absolute w-full h-8 top-1/2 -translate-y-1/2 appearance-none cursor-pointer bg-transparent pointer-events-none z-20
          [&::-webkit-slider-thumb]:pointer-events-auto
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:w-5
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-(--color-tiger)
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white
          [&::-webkit-slider-thumb]:shadow-lg
          [&::-webkit-slider-thumb]:cursor-grab
          [&::-webkit-slider-thumb]:hover:scale-125
          [&::-webkit-slider-thumb]:active:cursor-grabbing
          [&::-webkit-slider-thumb]:transition-transform
          [&::-moz-range-thumb]:pointer-events-auto
          [&::-moz-range-thumb]:h-5
          [&::-moz-range-thumb]:w-5
          [&::-moz-range-thumb]:rounded-full
          [&::-moz-range-thumb]:bg-(--color-tiger)
          [&::-moz-range-thumb]:border-4
          [&::-moz-range-thumb]:border-white
          [&::-moz-range-thumb]:cursor-grab"
                  />
                </div>

                {/* Price Display */}
                <div className="flex items-center justify-center gap-3 text-sm">
                  <span className="font-semibold text-gray-700">
                    EGP {priceRange[0].toLocaleString()}
                  </span>
                  <span className="text-gray-400">—</span>
                  <span className="font-semibold text-gray-700">
                    EGP {priceRange[1].toLocaleString()}
                  </span>
                </div>
              </div>
            </Accordion>

            <Accordion title="Color">
              <div className="flex flex-col gap-4">
                {colors.map((c) => (
                  <div
                    key={c.value}
                    onClick={() =>
                      toggleList(c.value, selectedColors, setSelectedColors)
                    }
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    {/* دائرة اللون */}
                    <span
                      className={`w-6 h-6 rounded-full ${c.class} relative flex items-center justify-center`}
                      title={c.name}
                    >
                      {/* علامة الصح */}
                      {selectedColors.includes(c.value) && (
                        <svg
                          className="w-4 h-4 text-white drop-shadow-lg"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </span>
                    {/* اسم اللون */}
                    <span className="text-sm text-gray-700">{c.name}(0)</span>
                  </div>
                ))}
              </div>
            </Accordion>

            <button
              onClick={onClearAll}
              className="w-full mt-6 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-(--color-tiger) hover:text-(--color-cornsilk) transition-colors cursor-pointer"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
