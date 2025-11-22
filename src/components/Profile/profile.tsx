import { motion } from "framer-motion";
import { Save, Gift } from "lucide-react";
import useProfile from "./useProfile";

export default function Profile() {
  const {
    userData,
    handleChange,
    handleSave,
    progress,
    errors,
    isLoading,
    rewardVisible,
    isUsed,
    reward,
  } = useProfile();

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=" shadow-lg rounded-2xl p-4 w-full max-w-5xl"
      >
        <h2 className="text-3xl font-bold text-(--color-pakistan) mb-8 text-center">
          Profile Information
        </h2>

        {/* شريط التقدم */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-4 bg-(--color-tiger) rounded-full"
          />
        </div>
        <p className="text-sm text-center text-gray-600 mb-4">
          Profile Completion: <span className="font-bold">{progress}%</span>
        </p>

        {/* عرض مكافأة الخصم */}
        {rewardVisible && !isUsed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="
                    flex flex-col sm:flex-row items-center justify-center 
                       text-center sm:text-left flex-wrap
                     bg-green-100 text-green-700 font-medium 
                         py-3 px-4 rounded-lg mb-4
                            gap-1 sm:gap-2 leading-snug
                       "
          >
            <Gift size={22} className="text-green-700 mb-1 sm:mb-0" />
            <p className="text-sm sm:text-base">
              Congratulations! You’ve unlocked a{" "}
              <span className="font-bold">{reward?.discount}% discount</span>{" "}
              with the code{" "}
              <span className="font-bold underline">{reward?.code}</span> on
              your first order 🎉
            </p>
          </motion.div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* قسم البيانات الشخصية */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-pakistan) mb-3 border-b pb-1">
                Personal Information
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full p-2 border rounded-lg border-(--color-earth) focus:outline-none focus:ring-2 focus:ring-(--color-tiger)"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full p-2 border rounded-lg border-(--color-earth) focus:outline-none focus:ring-2 focus:ring-(--color-tiger)"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={
                      userData.birthday ? userData.birthday.split("T")[0] : ""
                    }
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg border-(--color-earth) focus:outline-none focus:ring-2 focus:ring-(--color-tiger)"
                  />
                  {errors.birthday && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.birthday}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* قسم بيانات التواصل */}
            <div>
              <h3 className="text-lg font-semibold text-(--color-pakistan) mb-3 border-b pb-1">
                Contact Information
              </h3>
              <div className="space-y-5">
                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    disabled
                    className="w-full p-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full p-2 border rounded-lg border-(--color-earth) focus:outline-none focus:ring-2 focus:ring-(--color-tiger)"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* زر الحفظ */}
          <motion.button
            whileHover={!isLoading ? { scale: 1.03 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            disabled={isLoading}
            type="submit"
            className={`w-full flex items-center justify-center gap-2 text-white font-semibold py-2 rounded-lg shadow-md transition
             ${
               isLoading
                 ? "bg-(--color-earth) cursor-not-allowed opacity-90"
                 : "bg-(--color-tiger) hover:bg-(--color-earth) cursor-pointer"
             }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
