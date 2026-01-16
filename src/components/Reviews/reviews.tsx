import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquarePlus, X, Edit3, Trash2 } from "lucide-react";
import type { ReviewType } from "../../types/ReviewsType";
import useReviews from "./useReviews";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

/**
 * Reviews: Interface for viewing and managing product reviews/ratings.
 * المراجعات: واجهة لعرض وإدارة تقييمات ومراجعات المنتجات.
 */
export default function Reviews() {
  const {
    reviewsData,
    handleDeleteReview,
    handleEditReview,
    handleSubmitReview,
    newRating,
    setNewRating,
    newComment,
    setNewComment,
    hoverRating,
    setHoverRating,
    showReviews,
    setShowReviews,
    reviewFormRef,
    editingReview,
  } = useReviews();

  const { user } = useContext(AuthContext);

  return (
    <section className="py-8 px-4 relative overflow-hidden">
      {/* Main toggle button */}
      <div className="w-full flex justify-center mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowReviews(!showReviews)}
          className="group relative px-8 py-4 rounded-full bg-white/80 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_40px_rgba(188,108,37,0.2)] transition-all duration-300"
        >
          <div className="absolute inset-0 rounded-full bg-linear-to-r from-(--color-tiger) via-(--color-earth) to-(--color-tiger) opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
          <div className="absolute inset-0 rounded-full border border-(--color-tiger)/20 group-hover:border-(--color-tiger)/50 transition-colors duration-300" />

          <div className="relative flex items-center gap-3">
            <div
              className={`p-2 rounded-full transition-colors duration-300 ${
                showReviews
                  ? "bg-red-50 text-red-500"
                  : "bg-(--color-tiger)/10 text-(--color-tiger)"
              }`}
            >
              {showReviews ? <X size={18} /> : <MessageSquarePlus size={18} />}
            </div>

            <div className="flex flex-col items-start">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                {showReviews ? "Close Panel" : "Customer Reviews"}
              </span>
              <span className="text-sm font-black text-(--color-pakistan) group-hover:text-(--color-tiger) transition-colors">
                {showReviews
                  ? "Hide Reviews & Form"
                  : "Read Reviews or Write One"}
              </span>
            </div>
          </div>
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        {showReviews && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="w-full max-w-4xl mx-auto overflow-hidden"
          >
            <div
              ref={reviewFormRef}
              className="bg-white/60 backdrop-blur-xl rounded-4xl border border-white/50 shadow-[0_20px_40px_rgba(0,0,0,0.05)] p-6 md:p-10 mb-10"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-(--color-pakistan) mb-2">
                  {editingReview ? "Update Review" : "Write a Review"}
                </h3>
                <p className="text-sm font-medium text-(--color-earth)">
                  Share your thoughts with our community
                </p>
              </div>

              {/* Rating section */}
              <div className="mb-8 flex flex-col items-center">
                <div className="flex gap-2 flex-row-reverse" dir="rtl">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Star
                        size={36}
                        className="cursor-pointer transition-colors duration-200"
                        onClick={() => setNewRating(i + 1)}
                        onMouseEnter={() => setHoverRating(i + 1)}
                        onMouseLeave={() => setHoverRating(0)}
                        color={
                          i < (hoverRating || newRating)
                            ? "var(--color-tiger)"
                            : "#e5e7eb"
                        }
                        fill={
                          i < (hoverRating || newRating)
                            ? "var(--color-tiger)"
                            : "transparent"
                        }
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-400 mt-3 uppercase tracking-widest">
                  Tap to Rate
                </span>
              </div>

              {/* Comment input */}
              <div className="mb-8">
                <div className="relative group">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    name="comment"
                    rows={4}
                    className="w-full bg-white/50 border border-gray-200 rounded-2xl p-5 outline-none focus:border-(--color-tiger) focus:ring-1 focus:ring-(--color-tiger)/20 transition-all text-(--color-pakistan) placeholder:text-gray-400 font-medium resize-none shadow-sm group-hover:bg-white/80"
                    placeholder="What did you like about this product?"
                  />
                  <div className="absolute bottom-4 right-4 text-[10px] font-black uppercase text-gray-300 pointer-events-none">
                    Markdown Supported
                  </div>
                </div>
              </div>

              {/* Submit button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={handleSubmitReview}
                className="w-full py-4 rounded-xl text-white font-black uppercase tracking-[0.2em] text-sm shadow-xl transition-all relative overflow-hidden group"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-tiger) 0%, var(--color-earth) 100%)",
                }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                {editingReview ? "Submit Changes" : "Post Review"}
              </motion.button>
            </div>

            {/* Reviews list */}
            <div className="space-y-6">
              <AnimatePresence>
                {reviewsData?.review.map((review: ReviewType, idx: number) => (
                  <motion.div
                    key={review?.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: { delay: idx * 0.1 },
                    }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative mt-8"
                  >
                    {/* Date Tag - Outside Top Right */}
                    <div className="absolute -top-6 right-0 mb-1 bg-white/50 backdrop-blur-sm px-3 py-1 rounded-full text-[12px] font-bold text-(--color-pakistan) uppercase tracking-wider z-0">
                      {review?.createdAt &&
                        new Date(review?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                    </div>

                    <div className="group relative bg-white/40 backdrop-blur-md rounded-2xl p-3 border border-white/60 transition-all hover:bg-white/60 z-10">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-2">
                        {/* User Info */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-linear-to-br from-(--color-cornsilk) to-white border border-(--color-earth)/20 flex items-center justify-center text-(--color-pakistan) font-black text-lg">
                            {review?.user?.firstName?.charAt(0)}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-(--color-pakistan)">
                              {review?.user?.firstName} {review?.user?.lastName}
                            </h4>
                            <div className="flex gap-0.5 mt-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={12}
                                  color={
                                    i < review?.rating
                                      ? "var(--color-tiger)"
                                      : "#e5e7eb"
                                  }
                                  fill={
                                    i < review?.rating
                                      ? "var(--color-tiger)"
                                      : "transparent"
                                  }
                                  strokeWidth={0}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-base text-gray-700 leading-relaxed pl-13 mb-2 font-medium">
                        {review?.comment}
                      </p>

                      {/* Actions */}
                      {user?.id === review?.user?.id && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditReview(review)}
                            className="p-2 rounded-lg text-gray-400 hover:text-(--color-tiger) bg-gray-50 hover:bg-(--color-tiger)/10 transition-all"
                            title="Edit Review"
                          >
                            <Edit3 size={18} strokeWidth={2.5} />
                          </button>
                          <button
                            onClick={() => handleDeleteReview(review.id)}
                            className="p-2 rounded-lg text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 transition-all"
                            title="Delete Review"
                          >
                            <Trash2 size={18} strokeWidth={2.5} />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {reviewsData?.review?.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10 opacity-50"
                >
                  <Star size={48} className="mx-auto mb-4 text-gray-300" />
                  <p className="text-sm font-bold text-gray-400">
                    No reviews yet. Be the first!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
