import { useState } from "react";
import { motion } from "framer-motion";

export default function AllUsersMessages() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSendMessage = async () => {
    if (!subject || !message) return;

    setLoading(true);
    setSuccess(false);
    setError("");

    // try {
    //   await fetch("/api/send-email", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       subject: subject,
    //       message: `<p>${message}</p>`,
    //     }),
    //   });

    //   setSuccess(true);
    //   setSubject("");
    //   setMessage("");
    // } catch (err) {
    //   console.error(err);
    //   setError("Failed to send message. Please try again.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="flex justify-center items-start min-h-screen px-4 pt-16 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className=" rounded-3xl shadow-xl p-8 w-full max-w-[600px] flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-(--color-dark) text-center">
          Send emails to all Customers
        </h2>

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="border border-(--color-tiger) rounded-2xl px-4 py-3 focus:ring-1 focus:ring-(--color-tiger) outline-none w-full"
        />

        <textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="border border-(--color-tiger) rounded-2xl px-4 py-3 focus:ring-1 focus:ring-(--color-tiger) outline-none resize-none w-full"
        />

        {success && (
          <p className="text-green-600 text-center font-medium">
            Message sent successfully!
          </p>
        )}

        {error && (
          <p className="text-red-600 text-center font-medium">{error}</p>
        )}

        <motion.button
          onClick={handleSendMessage}
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-full font-semibold bg-(--color-tiger) hover:bg-(--color-earth) text-white shadow-md transition-all disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message to All Customers"}
        </motion.button>
      </motion.div>
    </div>
  );
}
