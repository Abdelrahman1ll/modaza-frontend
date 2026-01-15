import { useEffect, useRef, useState } from "react";
import { useGetCategoryQuery } from "../../redux/category/apiCategory";
import { useGetColorsQuery } from "../../redux/color/apiColor";
import { useSearchParams, type URLSearchParamsInit } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/products/apiProducts";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ChevronDown, X, Check } from "lucide-react";

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Best Selling", value: "best-selling" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Price: Low to High", value: "price-low" },
];

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
    <div className="border-b border-(--color-pakistan)/20 py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between font-bold text-(--color-pakistan) hover:text-(--color-tiger) transition-colors group"
      >
        <span className="text-sm uppercase tracking-wider">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-(--color-tiger)"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/**
 * FilterSidebar: A slide-over drawer component for filtering products by category, price, and color.
 * شريط التصفية الجانبي: مكون درج ينسحب لتصفية المنتجات حسب الفئة، السعر، واللون.
 */
export default function FilterSidebar() {
  const MIN_PRICE = 0;

  const [searchParams, setSearchParams] = useSearchParams();
  const initialized = useRef(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [sortOpen, setSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Featured");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [maxPrice, setMaxPrice] = useState(0);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current || maxPrice === 0) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const value = Math.round(percentage * (maxPrice - MIN_PRICE) + MIN_PRICE);

    const distMin = Math.abs(value - priceRange[0]);
    const distMax = Math.abs(value - priceRange[1]);

    if (distMin < distMax) {
      // Moves closer to min
      const newMin = Math.min(value, priceRange[1] - 10);
      setPriceRange([newMin, priceRange[1]]);
    } else {
      // Moves closer to max
      const newMax = Math.max(value, priceRange[0] + 10);
      setPriceRange([priceRange[0], newMax]);
    }
  };

  /* ================= API ================= */
  const { data } = useGetCategoryQuery({});
  const category = data?.categories || [];

  const { data: colorData } = useGetColorsQuery({});
  const colorsList = colorData?.colors || [];

  const { data: productsData } = useGetProductsQuery("/products");

  /* ================= Compute max price ================= */
  useEffect(() => {
    const products = productsData?.products || [];
    if (!products.length || maxPrice) return;

    const computed = Math.max(
      ...products.map((p: { price: number | string }) => Number(p.price))
    );
    setMaxPrice(computed);
    if (priceRange[1] === 0) {
      setPriceRange([MIN_PRICE, computed]);
    }
  }, [productsData?.products, maxPrice, priceRange]);

  /* ================= Read from URL ================= */
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const colorParam = searchParams.get("color");
    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");
    const sortParam = searchParams.get("sortPrice");
    const bestSelling = searchParams.get("bestSelling");

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

    if (bestSelling) {
      setSelectedSort("Best Selling");
    }

    initialized.current = true;
  }, [maxPrice, searchParams]);

  /* ================= Write to URL ================= */
  useEffect(() => {
    if (!initialized.current) return;
    const params: Record<string, string | number | boolean> = {};

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

    if (selectedSort === "Best Selling") {
      params.bestSelling = true;
    }

    if (selectedSort === "Price: High to Low") {
      params.sortPrice = "desc";
    } else if (selectedSort === "Price: Low to High") {
      params.sortPrice = "asc";
    }

    const name = searchParams.get("name");
    if (name) {
      params.name = name;
    }

    setSearchParams(params as unknown as URLSearchParamsInit);
  }, [
    selectedCats,
    selectedColors,
    priceRange,
    selectedSort,
    setSearchParams,
    searchParams,
    maxPrice,
  ]);

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
    setSelectedSort("Featured");
  };

  /* ================= UI ================= */
  return (
    <div className="m-4 mb-8">
      {/* Trigger Buttons */}
      <div className="w-full mx-auto px-4">
        <div className="flex flex-row items-center justify-between gap-3 mb-8">
          {/* Filter Drawer Trigger */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-between gap-3 px-5 py-3 bg-white/60 backdrop-blur-md rounded-2xl 
                 border border-(--color-tiger)/20 shadow-lg shadow-(--color-pakistan)/5
                 hover:bg-white transition-all cursor-pointer font-bold group"
          >
            <div className="flex items-center gap-3">
              <SlidersHorizontal
                size={18}
                className="text-(--color-tiger) group-hover:rotate-12 transition-transform"
              />
              <span className="text-sm">Filters</span>
            </div>
          </motion.button>

          {/* Sort Select Dropdown */}
          <div
            className="relative flex-1 sm:flex-none sm:w-64"
            ref={dropdownRef}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSortOpen(!sortOpen)}
              className="w-full flex items-center justify-between gap-4 px-5 py-3 bg-white/60 backdrop-blur-md rounded-2xl 
                   border border-(--color-tiger)/20 shadow-lg shadow-(--color-pakistan)/5
                   hover:bg-white transition-all cursor-pointer font-bold group"
            >
              <span className="text-sm truncate flex-1 text-left">
                {selectedSort}
              </span>
              <motion.div
                animate={{ rotate: sortOpen ? 180 : 0 }}
                className="text-(--color-tiger)"
              >
                <ChevronDown size={18} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {sortOpen && (
                <>
                  {/* Backdrop for handling click outside */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-10"
                    onClick={() => setSortOpen(false)}
                  />

                  {/* Menu */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="absolute right-0 top-full mt-2 w-full min-w-[200px] bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-(--color-tiger)/20 z-100 overflow-hidden py-1.5"
                  >
                    {sortOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ x: 5 }}
                        onClick={() => {
                          setSelectedSort(option.label);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-all flex items-center justify-between group
                      ${
                        selectedSort === option.label
                          ? "bg-(--color-tiger) text-white font-bold"
                          : "text-(--color-pakistan) hover:bg-(--color-tiger)/5"
                      }`}
                      >
                        <span>{option.label}</span>
                        {selectedSort === option.label && <Check size={14} />}
                      </motion.button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide-over Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-(--color-pakistan)/40 backdrop-blur-sm transition-opacity"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-[320px] md:max-w-sm bg-white/90 backdrop-blur-2xl p-6 shadow-2xl h-full z-50 overflow-y-auto scrollbar-hide border-r border-(--color-tiger)/10"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black text-(--color-pakistan) flex items-center gap-2">
                    Filters
                    <SlidersHorizontal
                      size={20}
                      className="text-(--color-tiger)"
                    />
                  </h2>
                  <p className="text-xs text-(--color-pakistan)/40 uppercase tracking-widest font-bold mt-1">
                    Refine your search
                  </p>
                </div>
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-(--color-tiger)/10 text-(--color-tiger) rounded-xl hover:bg-(--color-tiger) hover:text-white transition-colors shadow-sm"
                >
                  <X size={20} />
                </motion.button>
              </div>

              <div className="space-y-4">
                <Accordion title="Category">
                  <div className="space-y-3 px-1">
                    {category.map((cat: { id: string; name: string }) => (
                      <div key={cat.id} className="flex items-center group">
                        <div className="relative flex items-center">
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
                            className="peer h-5 w-5 rounded-md border-2 border-(--color-pakistan)/20 appearance-none 
                                    checked:bg-(--color-tiger) checked:border-(--color-tiger) transition-all cursor-pointer"
                          />
                          <Check
                            size={14}
                            className="absolute left-0.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                            strokeWidth={4}
                          />
                        </div>

                        <label
                          htmlFor={cat.id}
                          className="ml-3 text-sm font-bold text-(--color-pakistan)/70 cursor-pointer group-hover:text-(--color-tiger) transition-colors"
                        >
                          {cat.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </Accordion>

                <Accordion title="Price Range">
                  <div className="space-y-6 pt-2 pb-4 px-3">
                    <div
                      ref={sliderRef}
                      onClick={handleTrackClick}
                      className="relative h-2 flex items-center cursor-pointer touch-none"
                    >
                      {/* Track Background */}
                      <div className="absolute left-0 right-0 h-1.5 bg-(--color-pakistan)/10 rounded-full" />

                      {/* Active Track */}
                      <motion.div
                        className="absolute h-1.5 bg-(--color-tiger) rounded-full shadow-[0_0_10px_rgba(188,108,37,0.3)]"
                        style={{
                          left: `${
                            ((priceRange[0] - MIN_PRICE) /
                              (maxPrice - MIN_PRICE)) *
                            100
                          }%`,
                          right: `${
                            100 -
                            ((priceRange[1] - MIN_PRICE) /
                              (maxPrice - MIN_PRICE)) *
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
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent bubbling to track click
                          setPriceRange([
                            Math.min(
                              Number(e.target.value),
                              priceRange[1] - 10
                            ),
                            priceRange[1],
                          ]);
                        }}
                        style={{
                          zIndex: priceRange[0] > maxPrice - 100 ? "40" : "30",
                        }}
                        className="absolute w-full h-2 appearance-none cursor-pointer bg-transparent pointer-events-none 
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-4
              [&::-webkit-slider-thumb]:border-(--color-tiger)
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:hover:scale-125
              [&::-webkit-slider-thumb]:transition-transform
              [&::-moz-range-thumb]:pointer-events-auto
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-4
              [&::-moz-range-thumb]:border-(--color-tiger)"
                      />

                      {/* Max Slider */}
                      <input
                        type="range"
                        min={MIN_PRICE}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent bubbling to track click
                          setPriceRange([
                            priceRange[0],
                            Math.max(
                              Number(e.target.value),
                              priceRange[0] + 10
                            ),
                          ]);
                        }}
                        className="absolute w-full h-2 appearance-none cursor-pointer bg-transparent pointer-events-none z-20
              [&::-webkit-slider-thumb]:pointer-events-auto
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border-4
              [&::-webkit-slider-thumb]:border-(--color-tiger)
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:hover:scale-125
              [&::-webkit-slider-thumb]:transition-transform
              [&::-moz-range-thumb]:pointer-events-auto
              [&::-moz-range-thumb]:h-4
              [&::-moz-range-thumb]:w-4
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border-4
              [&::-moz-range-thumb]:border-(--color-tiger)"
                      />
                    </div>

                    {/* Price Display */}
                    <div className="flex items-center justify-between px-2">
                      <div className="bg-(--color-pakistan)/5 px-3 py-1 rounded-lg border border-(--color-pakistan)/10 flex flex-col items-center">
                        <span className="text-[10px] uppercase font-black text-(--color-pakistan)/40">
                          Min
                        </span>
                        <span className="text-sm font-black text-(--color-pakistan)">
                          {priceRange[0]}{" "}
                          <span className="text-[10px]">EGP</span>
                        </span>
                      </div>
                      <div className="h-px w-4 bg-(--color-pakistan)/20 mt-2" />
                      <div className="bg-(--color-tiger)/5 px-3 py-1 rounded-lg border border-(--color-tiger)/10 flex flex-col items-center">
                        <span className="text-[10px] uppercase font-black text-(--color-tiger)/40">
                          Max
                        </span>
                        <span className="text-sm font-black text-(--color-tiger)">
                          {priceRange[1]}{" "}
                          <span className="text-[10px]">EGP</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Accordion>

                <Accordion title="Color">
                  <div className="grid grid-cols-2 gap-3 px-1 py-1">
                    {colorsList.map(
                      (c: { name: string; color: string; id: string }) => (
                        <motion.div
                          key={c.id}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            toggleList(
                              String(c.id),
                              selectedColors,
                              setSelectedColors
                            )
                          }
                          className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all border-2
                                ${
                                  selectedColors.includes(String(c.id))
                                    ? "bg-(--color-tiger)/5 border-(--color-tiger) shadow-sm"
                                    : "bg-(--color-pakistan)/5 border-transparent hover:border-(--color-pakistan)/10"
                                }`}
                        >
                          <div
                            className="w-6 h-6 rounded-full relative flex items-center justify-center shadow-inner"
                            style={{ backgroundColor: c.color }}
                          >
                            {selectedColors.includes(String(c.id)) && (
                              <Check
                                size={14}
                                className="text-white drop-shadow-md"
                                strokeWidth={4}
                              />
                            )}
                          </div>
                          <span
                            className={`text-[13px] font-bold ${
                              selectedColors.includes(String(c.id))
                                ? "text-(--color-tiger)"
                                : "text-(--color-pakistan)/70"
                            }`}
                          >
                            {c.name}
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>
                </Accordion>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClearAll}
                  className="w-full mt-8 py-4 px-4 text-(--color-cornsilk) rounded-2xl text-sm font-black uppercase tracking-widest shadow-lg shadow-(--color-pakistan)/20 transition-all cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--color-tiger) 0%, var(--color-earth) 100%)",
                  }}
                >
                  Clear All Filters
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
