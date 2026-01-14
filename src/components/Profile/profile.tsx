import { motion, AnimatePresence } from "framer-motion";
import { Gift, User, Mail, Phone, Calendar, BadgeCheck } from "lucide-react";
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
    reward,
  } = useProfile();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,var(--color-tiger-10),transparent),radial-gradient(circle_at_bottom_left,var(--color-pakistan-10),transparent)] p-4 md:p-8 flex items-start justify-center pt-24 md:mt-15">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white/60 backdrop-blur-2xl rounded-3xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        {/* Header Section */}
        <div className="relative h-32 bg-linear-to-r from-(--color-pakistan) to-(--color-tiger) p-6 flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center justify-center gap-3">
              {userData.firstName
                ? `${userData.firstName} ${userData.lastName}`
                : "Profile Details"}
              {progress === 100 && (
                <BadgeCheck className="text-white" size={24} />
              )}
            </h2>
            <p className="text-white/70 font-medium uppercase tracking-[0.2em] text-[10px] mt-1">
              Personalized shopping experience
            </p>
          </div>
        </div>

        <div className="p-6 md:p-10">
          {/* Progress Bar & Reward */}
          <div className="mb-10 space-y-5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-black text-(--color-pakistan) uppercase tracking-widest">
                Profile Completion
              </span>
              <span className="text-xs font-black text-(--color-tiger)">
                {progress}%
              </span>
            </div>
            <div className="relative h-2 w-full bg-(--color-pakistan)/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 1, ease: "circOut" }}
                className="absolute inset-y-0 left-0 bg-linear-to-r from-(--color-pakistan) to-(--color-tiger) rounded-full shadow-[0_0_15px_rgba(188,108,37,0.3)]"
              />
            </div>

            <AnimatePresence>
              {rewardVisible && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative overflow-hidden bg-linear-to-br from-green-50 to-emerald-50 border border-green-200/50 p-5 rounded-2xl shadow-sm flex items-start gap-4 group"
                >
                  <div className="p-2.5 bg-green-500 text-white rounded-xl shadow-lg group-hover:rotate-12 transition-transform capitalize">
                    <Gift size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-green-900 text-base">
                      Reward Unlocked!
                    </h4>
                    <p className="text-green-800/70 text-xs mt-1 leading-relaxed">
                      Congratulations! You've unlocked a{" "}
                      <span className="text-green-600 font-black">
                        {reward?.discount}% discount
                      </span>{" "}
                      with the code
                      <span className="mx-1.5 inline-block px-2 py-0.5 bg-green-100 border border-green-200 rounded text-green-700 font-mono font-bold">
                        {reward?.code}
                      </span>
                      on your first order 🎉
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSave} className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Personal Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-dotted border-(--color-pakistan)/10 pb-3">
                  <div className="p-2 bg-(--color-pakistan)/5 rounded-lg text-(--color-pakistan)">
                    <User size={18} />
                  </div>
                  <h3 className="text-lg font-black text-(--color-pakistan) uppercase tracking-wider">
                    Personal Info
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-(--color-pakistan)/40 uppercase tracking-widest ml-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={userData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full px-4 py-3 bg-white border border-(--color-pakistan)/10 rounded-xl focus:outline-none focus:border-(--color-tiger) transition-all font-bold text-(--color-pakistan) text-sm"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-[9px] font-black uppercase tracking-widest ml-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-(--color-pakistan)/40 uppercase tracking-widest ml-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={userData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 bg-white border border-(--color-pakistan)/10 rounded-xl focus:outline-none focus:border-(--color-tiger) transition-all font-bold text-(--color-pakistan) text-sm"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-[9px] font-black uppercase tracking-widest ml-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-(--color-pakistan)/40 uppercase tracking-widest ml-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="birthday"
                      value={
                        userData.birthday ? userData.birthday.split("T")[0] : ""
                      }
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-(--color-pakistan)/10 rounded-xl focus:outline-none focus:border-(--color-tiger) transition-all font-bold text-(--color-pakistan) pl-12 text-sm"
                    />
                    <Calendar
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-pakistan)/30"
                      size={18}
                    />
                  </div>
                  {errors.birthday && (
                    <p className="text-red-500 text-[9px] font-black uppercase tracking-widest ml-1">
                      {errors.birthday}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-dotted border-(--color-pakistan)/10 pb-3">
                  <div className="p-2 bg-(--color-pakistan)/5 rounded-lg text-(--color-pakistan)">
                    <Mail size={18} />
                  </div>
                  <h3 className="text-lg font-black text-(--color-pakistan) uppercase tracking-wider">
                    Contact Info
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-(--color-pakistan)/40 uppercase tracking-widest ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        disabled
                        className="w-full px-4 py-3 bg-(--color-pakistan)/5 border-transparent rounded-xl text-(--color-pakistan)/40 font-bold cursor-not-allowed pl-12 text-sm"
                      />
                      <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-pakistan)/20"
                        size={18}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-(--color-pakistan)/40 uppercase tracking-widest ml-1">
                      Phone Number
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        placeholder="+20 123 456 7890"
                        className="w-full px-4 py-3 bg-white border border-(--color-pakistan)/10 rounded-xl focus:outline-none focus:border-(--color-tiger) transition-all font-bold text-(--color-pakistan) pl-12 text-sm"
                      />
                      <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-(--color-pakistan)/30"
                        size={18}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-[9px] font-black uppercase tracking-widest ml-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Section */}
            <div className="pt-6 border-t border-(--color-pakistan)/10">
              <motion.button
                whileHover={!isLoading ? { scale: 1.01, y: -1 } : {}}
                whileTap={!isLoading ? { scale: 0.99 } : {}}
                disabled={isLoading}
                type="submit"
                className="w-full relative group overflow-hidden bg-(--color-pakistan) text-white font-black uppercase tracking-[0.2em] py-4 rounded-xl shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm"
              >
                <div className="absolute inset-0 bg-linear-to-r from-(--color-tiger) to-(--color-earth) opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </div>
              </motion.button>
              <p className="text-center text-[8px] font-black text-(--color-pakistan)/30 uppercase tracking-[0.3em] mt-4">
                Your data is securely encrypted & managed
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
