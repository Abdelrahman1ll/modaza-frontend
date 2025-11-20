import { motion } from "framer-motion";
import { useState } from "react";
import {
  useGetDeliveryQuery,
  usePostDeliveryMutation,
} from "../../redux/Delivery/apiDelivery";
import { toast } from "react-toastify";
export default function DeliveryPrice() {
  const [price, setPrice] = useState("");
  const [postDelivery, { isLoading }] = usePostDeliveryMutation();
  const { data, refetch } = useGetDeliveryQuery({});
  const delivery = data?.deliveries.find((delivery: any) => delivery.id === 1);
  const handleAddDelivery = async () => {
    if (!price || Number(price) <= 0) {
      toast.error("Delivery price already set");
      return;
    }
    try {
      await postDelivery({
        deliveryPrice: Number(price),
      }).unwrap();
      refetch();
      setPrice("");
      toast.success("Delivery price added successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add delivery price");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start px-4 mt-20 mb-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md md:max-w-lg lg:max-w-xl rounded-2xl shadow-xl p-6 sm:p-8 text-center"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-(--color-dark) mb-3">
          Set Delivery Price
        </h2>

        <p className="text-gray-500 mb-6 text-sm sm:text-base">
          This price will be applied to all future orders.
        </p>

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter delivery price"
          className="w-full border border-(--color-tiger) rounded-full px-4 py-3 text-center focus:outline-none focus:ring-1 focus:ring-(--color-tiger) transition text-base sm:text-lg"
        />

        <div className="bg-(--color-cornsilk) text-(--color-dark) rounded-2xl px-4 py-3 mt-4">
          <p className="text-2xl sm:text-3xl font-bold">
            {delivery?.deliveryPrice || 0} EGP
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddDelivery}
          disabled={isLoading}
          className="w-full mt-6 py-3 rounded-full font-semibold bg-(--color-tiger) hover:bg-(--color-earth) text-white shadow-md transition-all text-base sm:text-lg"
        >
          Save Price
        </motion.button>
      </motion.div>
    </div>
  );
}
