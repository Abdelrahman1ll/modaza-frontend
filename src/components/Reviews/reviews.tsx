import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import type { ReviewType } from "../../types/ReviewsType";
import useReviews from "./useReviews";

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
  return (
    <section className="py-10 px-4 ">
      {/* Main toggle button */}
      <div className="w-full flex justify-center">
        <button
          onClick={() => setShowReviews(!showReviews)}
          className="w-full md:w-[98%] lg:w-[98%] py-2 text-xl border border-(--color-tiger) rounded-full font-bold shadow-md transition-transform hover:scale-102 cursor-pointer"
          style={{
            color: "var(--color-tiger)",
          }}
        >
          {showReviews ? "Hide Reviews" : "Add Your Review"}
        </button>
      </div>

      <AnimatePresence>
        {showReviews && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full mx-auto rounded-2xl shadow-lg p-4"
          >
            <div ref={reviewFormRef}>
              {/* Rating section */}
              <div className="mb-6">
                <label
                  className="block mb-4 text-lg font-semibold text-left"
                  style={{ color: "var(--color-dark)" }}
                >
                  Choose your rating:
                </label>
                <div className="flex gap-3 flex-row-reverse" dir="rtl">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={32}
                      className="cursor-pointer transition-transform hover:scale-110"
                      onClick={() => setNewRating(i + 1)}
                      onMouseEnter={() => setHoverRating(i + 1)}
                      onMouseLeave={() => setHoverRating(0)}
                      color={
                        i < (hoverRating || newRating)
                          ? "var(--color-tiger)"
                          : "#ccc"
                      }
                      fill={
                        i < (hoverRating || newRating)
                          ? "var(--color-tiger)"
                          : "transparent"
                      }
                    />
                  ))}
                </div>
              </div>

              {/* Comment input */}
              <div className="mb-6">
                <label
                  className="block mb-2 text-lg font-semibold text-left"
                  style={{ color: "var(--color-dark)" }}
                >
                  Your opinion:
                </label>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  name="comment"
                  rows={4}
                  className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-(--color-tiger) text-base"
                  style={{
                    borderColor: "var(--color-earth)",
                    color: "var(--color-pakistan)",
                  }}
                  placeholder="Write your review here..."
                />
              </div>

              {/* Submit button */}
              <button
                onClick={handleSubmitReview}
                className="w-full py-2 rounded-xl text-lg font-semibold transition-transform hover:scale-102 cursor-pointer"
                style={{
                  backgroundColor: "var(--color-tiger)",
                  color: "var(--color-cornsilk)",
                }}
              >
                {editingReview ? "Update Review" : "Submit Review"}
              </button>
            </div>

            {/* Reviews list */}
            <div className="mt-4 space-y-6">
              {reviewsData?.review.map((review: ReviewType) => (
                <motion.div
                  key={review?.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl border shadow-sm"
                  style={{
                    backgroundColor: "var(--color-cornsilk)",
                    borderColor: "var(--color-earth)",
                  }}
                >
                  <div className="flex bg-(--color-earth)/10 border border-(--color-earth)/30 p-1 rounded-xl justify-between items-center mb-2">
                    {/* نجوم التقييم */}
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          color={
                            i < review?.rating
                              ? "var(--color-tiger)"
                              : "var(--color-earth)"
                          }
                          fill={
                            i < review?.rating
                              ? "var(--color-tiger)"
                              : "transparent"
                          }
                        />
                      ))}
                    </div>

                    {/* أي عنصر جانبي */}
                    <div className="text-sm font-semibold text-gray-600">
                      {review?.createdAt &&
                        new Date(review?.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <p
                      className="text-base leading-relaxed text-left"
                      style={{ color: "var(--color-pakistan)" }}
                    >
                      {review?.comment}
                    </p>
                    <p
                      className="text-sm font-semibold text-left"
                      style={{ color: "var(--color-dark)" }}
                    >
                      — {review?.user?.firstName} {review?.user?.lastName}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-3 justify-between">
                    <button
                      onClick={() => handleEditReview(review)}
                      className="px-3 py-1 bg-(--color-tiger) text-white rounded-lg hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="px-3 py-1 bg-(--color-tiger) text-white rounded-lg hover:text-red-600 transition-colors cursor-pointer"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
