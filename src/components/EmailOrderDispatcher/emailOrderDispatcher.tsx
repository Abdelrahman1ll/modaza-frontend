import type { OrderEmail } from "../../types/OrderEmailType";
import useEmailOrderDispatcher from "./useEmailOrderDispatcher";

export default function EmailOrderDispatcher() {
  const {
    data,
    isLoading,
    customerName,
    setCustomerName,
    customerEmail,
    setCustomerEmail,
    errors,
    handleSendEmail,
    handleDelete,
    handleEdit,
    handleSaveEdit,
    reviewFormRef,
    formatEndDateArabic,
    editingId,
  } = useEmailOrderDispatcher();

  return (
    <div className="mt-16 flex flex-col items-center justify-center  p-4">
      <div
        ref={reviewFormRef}
        className="p-4 max-w-3xl w-full border border-(--color-tiger) rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-(--color-dark) mb-6 text-center">
          Send Order to Delivery
        </h2>

        {/* NAME FIELD */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-(--color-dark) font-semibold ml-2">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full p-3 border border-(--color-tiger) rounded-full text-center 
                 focus:ring-1 focus:ring-(--color-tiger) outline-none text-(--color-dark) placeholder:text-gray-500"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mb-2 text-center">{errors.name}</p>
        )}

        {/* EMAIL FIELD */}
        <div className="flex flex-col gap-2 mb-2">
          <label className="text-(--color-dark) font-semibold ml-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="w-full p-3 border border-(--color-tiger) rounded-full text-center 
                 focus:ring-1 focus:ring-(--color-tiger) outline-none text-(--color-dark) placeholder:text-gray-500"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mb-2 text-center">
            {errors.email}
          </p>
        )}

        {/* BUTTONS */}
        {editingId ? (
          <button
            onClick={handleSaveEdit}
            disabled={isLoading}
            className="w-full py-3 rounded-full font-semibold 
                 bg-(--color-tiger) hover:bg-(--color-earth) 
                 text-white shadow-md transition-all mb-1 mt-6"
          >
            Save Edit
          </button>
        ) : (
          <button
            onClick={handleSendEmail}
            disabled={isLoading}
            className="w-full py-3 rounded-full font-semibold 
                 bg-(--color-tiger) hover:bg-(--color-earth) 
                 text-white shadow-md transition-all mb-1 mt-6"
          >
            Add Order
          </button>
        )}
      </div>

      <div className="mt-6 w-full max-w-3xl flex flex-col gap-4">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="p-4 border border-(--color-tiger) rounded-2xl shadow-md bg-(--color-cornsilk) animate-pulse"
            >
              {/* Name & Date */}
              <div className="flex justify-between items-center mb-3">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-3 w-20 bg-gray-300 rounded"></div>
              </div>

              {/* Email */}
              <div className="h-3 w-40 bg-gray-300 rounded mb-4"></div>

              {/* Buttons */}
              <div className="flex justify-between gap-3 mt-2">
                <div className="h-4 w-10 bg-gray-300 rounded"></div>
                <div className="h-4 w-12 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))
        ) : data?.dispatchers.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center py-10">
            <p className="text-gray-500 text-lg font-medium">No Emails found</p>
          </div>
        ) : (
          data?.dispatchers.map((order: OrderEmail) => (
            <div
              key={order.id}
              className="p-4 border border-(--color-tiger) rounded-2xl shadow-md bg-(--color-cornsilk)"
            >
              <div className="flex justify-between">
                <p className="font-bold text-(--color-dark)">
                  Name: {order?.name}
                </p>
                {order?.dispatchedAt && (
                  <p className="text-gray-500 text-sm text-right">
                    {formatEndDateArabic(order?.dispatchedAt)}
                  </p>
                )}
              </div>

              <p className="text-(--color-tiger)">Email: {order?.email}</p>
              <div className="flex justify-between gap-3 mt-2">
                <button
                  onClick={() => handleEdit(order)}
                  className="text-(--color-tiger) hover:text-(--color-tiger)/80 font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(order?.id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
