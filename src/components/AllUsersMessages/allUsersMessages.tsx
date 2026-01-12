import { useState } from "react";
import { motion } from "framer-motion";
import { useSendEmailMutation } from "../../redux/Email/apiEmail";
import { toast } from "react-toastify";

export default function AllUsersMessages() {
  const [sendEmail, { isLoading }] = useSendEmailMutation();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSendMessage = async () => {
    if (!subject || !message) {
      setError("Please enter a subject and message.");
      return;
    }

    setSuccess(false);
    setError("");

    try {
      await sendEmail({ subject, message }).unwrap();
      setSuccess(true);
      setMessage("");
      setSubject("");
      toast.success("Email sent successfully!");
    } catch {
      toast.error("Failed to send email. Please try again.");
    }
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

        <div className="flex flex-col gap-2">
          <label className="text-(--color-dark) font-semibold ml-2">
            Subject
          </label>
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border border-(--color-tiger) rounded-2xl px-4 py-3 focus:ring-1 focus:ring-(--color-tiger) outline-none w-full text-(--color-dark) placeholder:text-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-(--color-dark) font-semibold ml-2">
            Message
          </label>
          <textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="border border-(--color-tiger) rounded-2xl px-4 py-3 focus:ring-1 focus:ring-(--color-tiger) outline-none resize-none w-full text-(--color-dark) placeholder:text-gray-500"
          />
        </div>

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
          disabled={isLoading || !subject || !message}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 rounded-full font-semibold bg-(--color-tiger) hover:bg-(--color-earth) text-white shadow-md transition-all disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send Message to All Customers"}
        </motion.button>
      </motion.div>
    </div>
  );
}
