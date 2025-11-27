import { motion } from "framer-motion";
import { useState } from "react";
import {
  useGetDeliveryQuery,
  usePostDeliveryMutation,
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
      </motion.div>
    </div>
  );
}
