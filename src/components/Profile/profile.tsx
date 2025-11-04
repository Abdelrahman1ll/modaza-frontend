import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Save, CheckCircle2, Gift } from "lucide-react";

export default function Profile() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "abdo@example.com",
    phone: "",
    birthDate: "",
  });

  const [progress, setProgress] = useState(20);
  const [saved, setSaved] = useState(false);
  const [rewardVisible, setRewardVisible] = useState(false);

  useEffect(() => {
    let filled = 0;
    if (userData.firstName) filled += 1;
    if (userData.lastName) filled += 1;
    if (userData.phone) filled += 1;
    if (userData.birthDate) filled += 1;

    const completion = 20 + filled * 20;
    setProgress(completion);

    // إظهار رسالة الخصم إذا اكتمل الملف بنسبة 100%
    if (completion === 100) setRewardVisible(true);
    else setRewardVisible(false);
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Data:", userData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=" shadow-lg rounded-2xl p-8 w-full max-w-5xl"
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
        {rewardVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-6 bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg"
          >
            <Gift size={20} />
            Congratulations! You’ve unlocked a <span className="font-bold">10% discount</span> on your first order 🎉
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
                </div>

                <div>
                  <label className="block mb-1 font-medium text-(--color-pakistan)">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={userData.birthDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg border-(--color-earth) focus:outline-none focus:ring-2 focus:ring-(--color-tiger)"
                  />
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
                </div>
              </div>
            </div>
          </div>

          {/* زر الحفظ */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-(--color-tiger) text-white font-semibold py-2 rounded-lg shadow-md hover:bg-(--color-earth) transition"
          >
            <Save size={18} />
            Save Changes
          </motion.button>

          {/* إشعار الحفظ */}
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center gap-2 mt-3 text-green-600 font-medium"
            >
              <CheckCircle2 size={20} />
              Changes saved successfully!
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
