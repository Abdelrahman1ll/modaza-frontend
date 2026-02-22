import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Facebook,
  Instagram,
  Twitter,
  CircleDot,
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";
import { BRAND_EMAIL, BRAND_PHONE } from "../../BrandText";

/**
 * ContactUs: Form and information for user inquiries and support.
 * اتصل بنا: نموذج ومعلومات لاستفسارات المستخدمين والدعم.
 */
export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [state, handleSubmit] = useForm("xldzgwvb");

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 md:p-10 mt-10 md:mt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl flex flex-col lg:flex-row gap-10 lg:gap-16"
      >
        {/* Left Column: Contact Information */}
        <div className="flex-1 space-y-10 py-6">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-(--color-tiger) block"
            >
              Contact Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-black text-(--color-pakistan) tracking-tight leading-[1.1]"
            >
              Let’s Start a
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-(--color-tiger) to-(--color-earth)">
                Conversation
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 font-medium max-w-md leading-relaxed"
            >
              We’re here to help you find your unique style. Reach out to our
              boutique experts for any inquiries.
            </motion.p>
          </div>

          <div className="space-y-6">
            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-6 p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 bg-(--color-tiger)/5 text-(--color-tiger) rounded-2xl flex items-center justify-center group-hover:bg-(--color-tiger) group-hover:text-white transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  Call Us Anywhere
                </p>
                <p className="text-xl font-bold text-(--color-pakistan) font-mono">
                  {BRAND_PHONE}
                </p>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-6 p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-14 h-14 bg-(--color-pakistan)/5 text-(--color-pakistan) rounded-2xl flex items-center justify-center group-hover:bg-(--color-pakistan) group-hover:text-white transition-all">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                  Email Our Boutique
                </p>
                <p className="text-xl font-bold text-(--color-pakistan) break-all">
                  {BRAND_EMAIL}
                </p>
              </div>
            </motion.div>
          </div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-4 pt-4"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-(--color-pakistan)/40">
              Follow The Trend
            </span>
            <div className="h-px w-10 bg-(--color-pakistan)/10" />
            <div className="flex gap-2">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 flex items-center justify-center border border-gray-100 rounded-full text-(--color-pakistan) hover:border-(--color-tiger) hover:text-(--color-tiger) transition-all"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Glassmorphic Form Container */}
        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white/70 backdrop-blur-2xl p-8 md:p-12 rounded-[2.5rem] border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden h-full flex flex-col justify-center"
          >
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-(--color-tiger)/5 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-(--color-pakistan)/5 rounded-full blur-3xl -z-10" />

            <AnimatePresence mode="wait">
              {state.succeeded ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center space-y-6 py-10"
                >
                  <div className="w-24 h-24 bg-green-500 text-white rounded-4xl flex items-center justify-center shadow-2xl rotate-12">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black text-(--color-pakistan)">
                      Message Sent!
                    </h3>
                    <p className="text-gray-500 font-medium max-w-xs">
                      Thank you for reaching out. Our team will get back to you
                      shortly.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="form">
                  <h3 className="text-2xl font-black text-(--color-pakistan) mb-8 flex items-center gap-3">
                    <CircleDot className="text-(--color-tiger)" size={20} />
                    Send Inquiries
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-(--color-pakistan)/40 uppercase tracking-widest ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-5 py-4 bg-white/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-(--color-tiger) focus:bg-white transition-all font-bold text-(--color-pakistan) text-sm shadow-sm"
                      />
                      <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                        className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-1"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-(--color-pakistan)/40 uppercase tracking-widest ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-5 py-4 bg-white/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-(--color-tiger) focus:bg-white transition-all font-bold text-(--color-pakistan) text-sm shadow-sm"
                      />
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                        className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-1"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-(--color-pakistan)/40 uppercase tracking-widest ml-1">
                        Message Detail
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        placeholder="How can we assist you today?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-5 py-4 bg-white/50 border border-gray-100 rounded-2xl focus:outline-none focus:border-(--color-tiger) focus:bg-white transition-all font-bold text-(--color-pakistan) text-sm shadow-sm resize-none"
                      />
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                        className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-1"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={state.submitting}
                      className="group w-full relative overflow-hidden text-white font-black uppercase tracking-[0.2em] py-5 rounded-2xl shadow-xl transition-all disabled:opacity-70 text-[10px]"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-tiger) 0%, var(--color-earth) 100%)",
                      }}
                    >
                      <div className="relative z-10 flex items-center justify-center gap-3">
                        {state.submitting ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            Send Message
                            <Send
                              size={14}
                              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                            />
                          </>
                        )}
                      </div>
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
