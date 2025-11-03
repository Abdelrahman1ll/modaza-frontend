import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

export default function ReviewsProduct() {
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Ahmed Khaled",
      rating: 5,
      comment: "Excellent quality and fast delivery! Highly recommend 👌",
    },
    {
      id: 2,
      name: "Sara Mostafa",
      rating: 4,
      comment: "Nice product, but the size was a bit smaller.",
    },
  ]);

  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handleAddReview = () => {
    if (!newRating || !newComment.trim()) return;
    const newReview = {
      id: Date.now(),
      name: "New Customer",
      rating: newRating,
      comment: newComment,
    };
    setReviews([...reviews, newReview]);
    setNewRating(0);
    setNewComment("");
  };

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
            className="w-full mx-auto rounded-2xl shadow-lg p-6 md:p-10"
          >
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
              onClick={handleAddReview}
              className="w-full py-2 rounded-xl text-lg font-semibold transition-transform hover:scale-102 cursor-pointer"
              style={{
                backgroundColor: "var(--color-tiger)",
                color: "var(--color-cornsilk)",
              }}
            >
              Submit Review
            </button>

            {/* Reviews list */}
            <div className="mt-10 space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-xl border shadow-sm"
                  style={{
                    backgroundColor: "var(--color-cornsilk)",
                    borderColor: "var(--color-earth)",
                  }}
                >
                  <div
                    className="flex justify-end gap-1 mb-2 flex-row-reverse"
                    dir="rtl"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        color={
                          i < review.rating
                            ? "var(--color-tiger)"
                            : "var(--color-earth)"
                        }
                        fill={
                          i < review.rating
                            ? "var(--color-tiger)"
                            : "transparent"
                        }
                      />
                    ))}
                  </div>
                  <p
                    className="text-base leading-relaxed text-left"
                    style={{ color: "var(--color-pakistan)" }}
                  >
                    {review.comment}
                  </p>
                  <p
                    className="text-sm font-semibold mt-2 text-left"
                    style={{ color: "var(--color-dark)" }}
                  >
                    — {review.name}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}



























