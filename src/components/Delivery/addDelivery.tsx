import { motion } from "framer-motion";
import { useState } from "react";
import {
  useGetDeliveryQuery,
  usePostDeliveryMutation,
  usePostFreeDeliveryMutation,
} from "../../redux/Delivery/apiDelivery";
import { toast } from "react-toastify";

export default function DeliveryPrice() {
  const [priceClose, setPriceClose] = useState("");
  const [priceFar, setPriceFar] = useState("");

  const [postDelivery, { isLoading }] = usePostDeliveryMutation();
  const { data, refetch } = useGetDeliveryQuery({});

  const delivery = data?.deliveries.find((d: any) => d.id === 1);

  const handleAddDelivery = async () => {
    if (!priceClose || Number(priceClose) <= 0) {
      toast.error("Please enter a valid close delivery price");
      return;
    }

    if (!priceFar || Number(priceFar) <= 0) {
      toast.error("Please enter a valid far delivery price");
      return;
    }

    try {
      await postDelivery({
        deliveryPriceClose: Number(priceClose),
        deliveryPriceFar: Number(priceFar),
      }).unwrap();

      refetch();
      setPriceClose("");
      setPriceFar("");
      toast.success("Delivery prices updated successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update delivery prices");
    }
  };

  const [postFreeDelivery] = usePostFreeDeliveryMutation({});
  const [openPanel, setOpenPanel] = useState(false);

  const handleFreeDelivery = async () => {
    try {
      await postFreeDelivery({}).unwrap();
      toast.success("Free Delivery Activated!");
      refetch();
    } catch (err) {
      toast.error("Failed to activate free delivery");
    }
  };

  return (
    <div className="flex justify-center px-4 mt-20 mb-10">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl rounded-2xl shadow-xl p-6 sm:p-8 bg-(--color-cornsilk)"
      >
        <h2 className="text-2xl font-bold text-(--color-dark) mb-2 text-center">
          Delivery Pricing
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Set shipping prices for near and far cities
        </p>

        {/* Current Prices */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-(--color-cornsilk) rounded-2xl p-4 text-center shadow">
            <p className="text-sm text-gray-500 mb-1">Near Areas</p>
            <p className="text-2xl font-bold text-(--color-dark)">
              {delivery?.deliveryPriceClose || 0} EGP
            </p>
          </div>

          <div className="bg-(--color-cornsilk) rounded-2xl p-4 text-center shadow">
            <p className="text-sm text-gray-500 mb-1">Far Areas</p>
            <p className="text-2xl font-bold text-(--color-dark)">
              {delivery?.deliveryPriceFar || 0} EGP
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="number"
            value={priceClose}
            onChange={(e) => setPriceClose(e.target.value)}
            placeholder="Enter near delivery price"
            className="w-full border border-(--color-tiger) rounded-full px-4 py-3 text-center focus:outline-none focus:ring-1 focus:ring-(--color-tiger) transition"
          />

          <input
            type="number"
            value={priceFar}
            onChange={(e) => setPriceFar(e.target.value)}
            placeholder="Enter far delivery price"
            className="w-full border border-(--color-tiger) rounded-full px-4 py-3 text-center focus:outline-none focus:ring-1 focus:ring-(--color-tiger) transition"
          />
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddDelivery}
          disabled={isLoading}
          className="w-full mt-6 py-3 rounded-full font-semibold bg-(--color-tiger) hover:bg-(--color-earth) text-white shadow-md transition-all"
        >
          {isLoading ? "Saving..." : "Save Prices"}
        </motion.button>

        <div className="mt-10">
          {/* زرار فتح قسم الخيارات */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpenPanel(!openPanel)}
            className="
      w-full py-3 rounded-xl font-semibold
      bg-(--color-tiger) text-white shadow-lg
      flex items-center justify-center gap-2
      transition-colors duration-300
    "
          >
            {openPanel ? "Hide Delivery Options" : "More Delivery Settings"}

            {/* السهم المتحرك */}
            <motion.span
              animate={{ rotate: openPanel ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              ▼
            </motion.span>
          </motion.button>

          {/* القسم المنزلق */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: openPanel ? "auto" : 0,
              opacity: openPanel ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div
              className="
      mt-4 p-6 rounded-2xl shadow-xl border
      bg-(--color-cornsilk)
      flex flex-col items-center gap-4
    "
            >
              <h3 className="text-xl font-bold text-(--color-dark) text-center">
                Free Delivery Option
              </h3>

              {/* حالة FreeDelivery */}
              {delivery?.freeDelivery ? (
                <div className="text-center p-4 bg-green-50 rounded-xl w-full">
                  <p className="text-green-700 font-bold text-lg flex items-center justify-center gap-2">
                    ✓ Free Delivery is Enabled
                  </p>
                  <p className="text-(--color-pakistan) mt-1 text-sm">
                    All customers now get free shipping on all orders.
                  </p>
                </div>
              ) : (
                <div className="text-center p-4 bg-red-50 rounded-xl w-full">
                  <p className="text-red-600 font-bold text-lg flex items-center justify-center gap-2">
                    ✕ Free Delivery is Disabled
                  </p>
                  <p className="text-(--color-dark) mt-1 text-sm">
                    Customers will be charged normal delivery fees.
                  </p>
                </div>
              )}

              {/* زرار التفعيل */}

              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 15px rgba(188,108,37,0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFreeDelivery}
                className="
            w-full py-3 rounded-xl font-bold text-white
            bg-linear-to-r from-(--color-earth) to-(--color-tiger)
            shadow-lg mt-2 transition-all
          "
              >
                Activate Free Delivery
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
