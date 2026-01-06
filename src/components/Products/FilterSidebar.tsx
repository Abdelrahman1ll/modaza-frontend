import { useEffect, useRef, useState } from "react";
import { useGetCategoryQuery } from "../../redux/category/apiCategory";
import { useGetColorsQuery } from "../../redux/color/apiColor";
import { useSearchParams } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/products/apiProducts";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Best Selling", value: "best-selling" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Price: Low to High", value: "price-low" },
];

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

export default function FilterSidebar() {
  const MIN_PRICE = 0;

  const [searchParams, setSearchParams] = useSearchParams();
  const initialized = useRef(false);

  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);

  /* ================= API ================= */
  const { data } = useGetCategoryQuery({});
  const category = data?.categories || [];

  const { data: colorData } = useGetColorsQuery({});
  const colorsList = colorData?.colors || [];

  const { data: productsData } = useGetProductsQuery("/products");
  const products = productsData?.products || [];

  /* ================= Compute max price ================= */
  useEffect(() => {
    if (!products.length || maxPrice) return;

    const computed = Math.max(...products.map((p: any) => Number(p.price)));
    setMaxPrice(computed);
    if (priceRange[1] === 0) {
      setPriceRange([MIN_PRICE, computed]);
    }
  }, [products, maxPrice]);

  /* ================= Read from URL ================= */
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const colorParam = searchParams.get("color");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const sortParam = searchParams.get("sortPrice");

    if (categoryParam) {
      setSelectedCats(categoryParam.split(","));
    }

    if (colorParam) {
      setSelectedColors(colorParam.split(","));
    }

    if (minPriceParam || maxPriceParam) {
      setPriceRange([
        minPriceParam ? Number(minPriceParam) : MIN_PRICE,
        maxPriceParam ? Number(maxPriceParam) : maxPrice,
      ]);
    }

    if (sortParam) {
      if (sortParam === "asc") {
        setSelectedSort("Price: Low to High");
      } else if (sortParam === "desc") {
        setSelectedSort("Price: High to Low");
      }
    }

    initialized.current = true;
  }, []);

  /* ================= Write to URL ================= */
  useEffect(() => {
    if (!initialized.current) return;
    const params: any = {};

    if (selectedCats.length > 0) {
      params.category = selectedCats.join(",");
    }

    if (selectedColors.length > 0) {
      params.color = selectedColors.join(",");
    }

    if (priceRange[0] !== 0 || priceRange[1] !== maxPrice) {
      params.minPrice = priceRange[0];
      params.maxPrice = priceRange[1];
    }

    if (selectedSort === "Price: High to Low") {
      params.sortPrice = "desc";
    } else if (selectedSort === "Price: Low to High") {
      params.sortPrice = "asc";
    }

    setSearchParams(params);
  }, [selectedCats, selectedColors, priceRange, selectedSort, setSearchParams]);

  /* ================= Helpers ================= */
  const toggleList = (
    item: string,
    list: string[],
    setList: (l: string[]) => void
  ) => {
    setList(
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item]
    );
  };

  const handleClearAll = () => {
    setSelectedCats([]);
    setSelectedColors([]);
    setPriceRange([MIN_PRICE, maxPrice]);
  };

  /* ================= UI ================= */
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
                {category.map((cat: { id: string; name: string }) => (
                  <div key={cat.id} className="flex items-center">
                    <input
                      type="checkbox"
                      id={cat.id}
                      checked={selectedCats.includes(String(cat.id))}
                      onChange={() =>
                        toggleList(
                          String(cat.id),
                          selectedCats,
                          setSelectedCats
                        )
                      }
                      className="h-4 w-4 rounded border-gray-300"
                      style={{
                        accentColor: "var(--color-tiger)",
                      }}
                    />

                    <label
                      htmlFor={cat.id}
                      className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-(--color-tiger)"
                    >
                      {cat.name}
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
                        ((priceRange[0] - MIN_PRICE) / (maxPrice - MIN_PRICE)) *
                        100
                      }%`,
                      right: `${
                        100 -
                        ((priceRange[1] - MIN_PRICE) / (maxPrice - MIN_PRICE)) *
                          100
                      }%`,
                    }}
                  />

                  {/* Min Slider */}
                  <input
                    type="range"
                    min={MIN_PRICE}
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
                    min={MIN_PRICE}
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
                {colorsList.map(
                  (c: { name: string; color: string; id: string }) => (
                    <div
                      key={c.id}
                      onClick={() =>
                        toggleList(
                          String(c.id),
                          selectedColors,
                          setSelectedColors
                        )
                      }
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      {/* دائرة اللون */}
                      <span
                        className={`w-6 h-6 rounded-full relative flex items-center justify-center`}
                        style={{ backgroundColor: c.color }}
                        title={c.name}
                      >
                        {/* علامة الصح */}
                        {selectedColors.includes(String(c.id)) && (
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
                      <span className="text-sm text-gray-700 hover:text-(--color-tiger)">
                        {c.name}
                      </span>
                    </div>
                  )
                )}
              </div>
            </Accordion>

            <button
              onClick={handleClearAll}
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
