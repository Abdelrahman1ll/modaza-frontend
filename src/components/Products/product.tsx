import { motion, type Variants } from "framer-motion";
import { PackageSearch, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import React, { memo } from "react";
import type { ProductType } from "../../types/ProductType";
import type { UserType } from "../../types/UserType";
import { getCloudinaryUrl, getCloudinarySrcSet } from "../../utils/cloudinary";
import useProduct from "./useProduct";

// Variants for staggered children animation
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Loading skeleton for the product list
 */
const ProductSkeleton = () => (
  <>
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="bg-transparent flex flex-col animate-pulse">
        <div className="w-full h-[460px] rounded-3xl bg-gray-200 mb-4" />
        <div className="flex justify-between mb-2">
          <div className="h-6 w-32 bg-gray-200 rounded"></div>
          <div className="flex flex-col items-end">
            <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="h-10 w-full bg-gray-200 rounded"></div>
        </div>
      </div>
    ))}
  </>
);

/**
 * Individual Product Card component
 */
const ProductCard = memo(
  ({
    product,
    isFav,
    isHovered,
    user,
    setHoveredIds,
    handleToggleWishlist,
  }: {
    product: ProductType;
    isFav: boolean;
    isHovered: boolean;
    user: UserType | null;
    setHoveredIds: React.Dispatch<
      React.SetStateAction<Record<number, boolean>>
    >;
    handleToggleWishlist: (id: number) => void;
  }) => {
    const isOutOfStock = product.stock === 0;

    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="group/card relative flex flex-col bg-transparent"
        onMouseEnter={() =>
          setHoveredIds((prev) => ({ ...prev, [product.id]: true }))
        }
        onMouseLeave={() =>
          setHoveredIds((prev) => ({ ...prev, [product.id]: false }))
        }
      >
        {/* Main Image Container with Depth Effect */}
        <div className="relative aspect-[3/4.2] w-full overflow-hidden rounded-[2.5rem] bg-gray-50 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/card:rounded-4xl">
          <Link
            to={`/products-details/${product.id}`}
            className="block h-full w-full"
          >
            <div className="relative h-full w-full overflow-hidden">
              {/* Primary Image */}
              <motion.img
                loading="lazy"
                src={getCloudinaryUrl(product.images[0], { width: 600 })}
                srcSet={getCloudinarySrcSet(product.images[0])}
                sizes="(max-width: 640px) 400px, 600px"
                alt={product.name}
                className="absolute inset-0 h-full w-full object-cover p-0"
                animate={{
                  scale: isHovered ? 1.15 : 1,
                  filter: isHovered ? "brightness(0.9)" : "brightness(1)",
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Secondary Image - Seamless Crossfade */}
              <motion.img
                src={getCloudinaryUrl(product.images[1] || product.images[0], {
                  width: 600,
                })}
                srcSet={getCloudinarySrcSet(
                  product.images[1] || product.images[0],
                )}
                sizes="(max-width: 640px) 400px, 600px"
                alt={`${product.name} alternate`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1.15 : 1.25,
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Floating "See Details" Glass Bar */}
              <div className="absolute inset-x-4 bottom-4 z-20 flex translate-y-8 items-center justify-center opacity-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/card:translate-y-0 group-hover/card:opacity-100">
                <div
                  className="w-full flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/40 py-3 text-sm font-bold text-gray-900 shadow-xl backdrop-blur-md"
                  aria-label="View Product Details"
                >
                  <span>Explore Details</span>
                  <PackageSearch size={16} />
                </div>
              </div>

              {/* Elegant Gradient Scrim */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
            </div>
          </Link>

          {/* Wishlist - Premium Glass Circle */}
          <motion.button
            onClick={() => handleToggleWishlist(product.id)}
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.85 }}
            className="absolute top-6 right-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:bg-white/40"
            aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={22}
              className={`transition-all duration-500 ${
                isFav
                  ? "fill-[#BC6C25] stroke-[#BC6C25] drop-shadow-[0_0_8px_rgba(188,108,37,0.4)]"
                  : "fill-transparent stroke-white"
              }`}
            />
          </motion.button>

          {/* Minimalist Vertical Discount Label */}
          {product.discountPercentage !== 0 && !isOutOfStock && (
            <div className="absolute top-6 left-6 z-30">
              <div className="flex items-center gap-2 rounded-full border border-(--color-tiger)/30 bg-white/95 px-3 py-1 text-[10px] font-black tracking-widest text-(--color-tiger) shadow-lg backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-tiger) opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-tiger)"></span>
                </span>
                {product.discountPercentage.toFixed(0)}% OFF
              </div>
            </div>
          )}

          {/* Out of Stock - Sophisticated Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[3px] pointer-events-none">
              <div className="overflow-hidden rounded-full border border-white/30 bg-white/10 px-8 py-3 shadow-2xl backdrop-blur-xl">
                <span className="text-sm font-black uppercase tracking-[0.2em] text-white">
                  Sold Out
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Boutique Typography Footer */}
        <div className="mt-6 flex flex-col items-center text-center px-4">
          <span className="mb-1 text-[10px] font-black uppercase tracking-[0.25em] text-[#BC6C25]/80">
            {typeof product.category === "object" && product.category !== null
              ? (product.category as unknown as { name: string }).name
              : product.category || "Modaza Collection"}
          </span>
          <h3 className="mb-2 text-lg font-bold tracking-tight text-gray-900 transition-colors duration-300 group-hover/card:text-(--color-tiger)">
            {product.name}
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xl font-black text-gray-900">
              {product.price.toLocaleString()}
              <span className="ml-1 text-[10px] uppercase opacity-50">EGP</span>
            </span>
            {product.discountPercentage !== 0 && (
              <span className="text-lg font-medium text-gray-400 line-through decoration-[#BC6C25]/40 decoration-wavy">
                {product.promotionalPrice.toLocaleString()} EGP
              </span>
            )}
          </div>

          {/* Rare Owner Actions */}
          {user && user.role !== "user" && (
            <Link to={`/edit-product/${product.id}`} className="mt-4 w-full">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 20px -10px rgba(188, 108, 37, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-2xl bg-linear-to-r from-(--color-tiger) to-(--color-earth) py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg transition-all"
              >
                Management Control
              </motion.button>
            </Link>
          )}
        </div>
      </motion.div>
    );
  },
);

ProductCard.displayName = "ProductCard";

/**
 * Product: Grid display of products with search and filter results.
 * المنتج: عرض شبكة المنتجات مع نتائج البحث والتصفية.
 */
export default function Product() {
  const {
    products,
    isLoading,
    isFav,
    handleToggleWishlist,
    hoveredIds,
    setHoveredIds,
    user,
    isError,
    isFetching,
  } = useProduct();

  const productList = Array.isArray(products)
    ? products
    : products?.products || [];

  return (
    <div className="m-4">
      <section className="w-full mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {isLoading && !isFetching ? (
            <ProductSkeleton />
          ) : productList.length === 0 || isError ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 bg-(--color-tiger)/10 rounded-full flex items-center justify-center mb-6">
                <PackageSearch size={40} className="text-(--color-tiger)" />
              </div>
              <p className="text-(--color-dark)/70 font-black uppercase tracking-widest text-xs">
                No products found
              </p>
            </div>
          ) : (
            productList.map((product: ProductType) => (
              <ProductCard
                key={product.id}
                product={product}
                isFav={isFav[product.id]}
                isHovered={hoveredIds[product.id] || false}
                user={user}
                setHoveredIds={setHoveredIds}
                handleToggleWishlist={handleToggleWishlist}
              />
            ))
          )}
        </motion.div>
      </section>
    </div>
  );
}
