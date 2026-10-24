import React, { useState, useEffect, useContext } from "react";
import { Rate, Button, Input, Modal, message } from "antd";
import {
  StarFilled,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleFilled,
  CommentOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../../context/authContext";
import {
  getProductReviewsApi,
  createReviewApi,
  updateReviewApi,
  deleteReviewApi,
} from "../../services/reviewService";

const { TextArea } = Input;

export default function ProductReviews({
  productId,
  onStatsUpdate,
  isEmbedded = false,
}) {
  const { user } = useContext(AuthContext) || {};
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [editingReviewId, setEditingReviewId] = useState(null);

  const fetchReviews = async () => {
    if (!productId) return;
    try {
      setLoading(true);
      const res = await getProductReviewsApi(productId);
      if (res?.data?.success) {
        const data = res.data.data || {};
        const list = data.reviews || [];
        const avg = Number(data.averageRating) || 0;
        const total = Number(data.totalReviews) || 0;

        setReviews(list);
        setAverageRating(avg);
        setTotalReviews(total);

        if (onStatsUpdate) {
          onStatsUpdate({ averageRating: avg, totalReviews: total });
        }
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const userExistingReview = reviews.find(
    (r) =>
      (r.userId?._id || r.userId) === user?.id ||
      (r.userId?._id || r.userId) === user?._id,
  );

  const handleStartEdit = (rev) => {
    setEditingReviewId(rev._id);
    setRating(rev.rating);
    setReviewText(rev.review);
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setRating(5);
    setReviewText("");
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    if (!user) {
      message.warning("Please log in to submit a review");
      return;
    }

    if (!rating || rating < 1) {
      message.warning("Please choose a star rating");
      return;
    }

    if (!reviewText.trim()) {
      message.warning("Please write a review comment");
      return;
    }

    try {
      setSubmitting(true);

      if (editingReviewId) {
        const res = await updateReviewApi(editingReviewId, {
          rating,
          review: reviewText.trim(),
        });
        if (res?.data?.success) {
          message.success("Review updated successfully");
          handleCancelEdit();
          await fetchReviews();
        } else {
          message.error(res?.data?.message || "Failed to update review");
        }
      } else {
        const res = await createReviewApi(productId, {
          rating,
          review: reviewText.trim(),
        });
        if (res?.data?.success) {
          message.success("Thank you! Review submitted successfully.");
          setReviewText("");
          setRating(5);
          await fetchReviews();
        } else {
          message.error(res?.data?.message || "Failed to submit review");
        }
      }
    } catch (err) {
      console.error("Error saving review:", err);
      message.error(err?.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = (revId) => {
    Modal.confirm({
      title: "Delete Review",
      content: "Are you sure you want to remove your review?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const res = await deleteReviewApi(revId);
          if (res?.data?.success) {
            message.success("Review deleted");
            if (editingReviewId === revId) {
              handleCancelEdit();
            }
            await fetchReviews();
          } else {
            message.error(res?.data?.message || "Failed to delete review");
          }
        } catch (err) {
          message.error(
            err?.response?.data?.message || "Failed to delete review",
          );
        }
      },
    });
  };

  return (
    <div
      className={
        isEmbedded
          ? "flex! flex-col! gap-6!"
          : "bg-white! rounded-[28px]! border! border-[#ebebeb]! p-6! sm:p-8! shadow-[0_4px_24px_rgba(0,0,0,0.03)]! flex! flex-col! gap-6!"
      }
    >
      <div className="flex! flex-col! sm:flex-row! sm:items-center! justify-between! gap-4! pb-6! border-b! border-gray-100!">
        <div>
          <span className="text-[11px]! font-bold! text-[#5433eb]! uppercase! tracking-widest! block! mb-1!">
            Community Feedback
          </span>
          <h3 className="text-xl! sm:text-2xl! font-bold! text-[#1a1a1a]! m-0!">
            Customer Reviews
          </h3>
        </div>

        <div className="flex! items-center! gap-4! bg-[#faf8ff]! border! border-purple-100! rounded-2xl! px-5! py-3!">
          <div className="text-3xl! font-extrabold! text-[#5433eb]!">
            {averageRating > 0 ? averageRating.toFixed(1) : "5.0"}
          </div>
          <div className="flex! flex-col!">
            <Rate
              disabled
              allowHalf
              value={averageRating > 0 ? averageRating : 5}
              className="text-[#f59e0b]! text-sm!"
            />
            <span className="text-xs! text-gray-500! mt-0.5!">
              Based on {totalReviews}{" "}
              {totalReviews === 1 ? "verified review" : "verified reviews"}
            </span>
          </div>
        </div>
      </div>

      {user ? (
        (!userExistingReview || editingReviewId) && (
          <div className="bg-[#fcfbfc]! rounded-2xl! border! border-[#ebebeb]! p-5! sm:p-6! flex! flex-col! gap-4!">
            <div className="flex! items-center! justify-between!">
              <h4 className="text-sm! font-bold! text-[#1a1a1a]! m-0! flex! items-center! gap-2!">
                <CommentOutlined className="text-[#5433eb]!" />
                <span>
                  {editingReviewId ? "Edit Your Review" : "Write a Review"}
                </span>
              </h4>
              {editingReviewId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs! text-gray-500! hover:text-gray-800! cursor-pointer! bg-transparent! border-0!"
                >
                  Cancel
                </button>
              )}
            </div>

            <div className="flex! flex-col! sm:flex-row! sm:items-center! gap-3!">
              <span className="text-xs! text-gray-500! font-medium!">
                Your Rating:
              </span>
              <Rate
                value={rating}
                onChange={setRating}
                className="text-[#f59e0b]! text-base!"
              />
            </div>

            <TextArea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share details of your experience with materials, build quality, and everyday design..."
              className="rounded-xl! text-xs! sm:text-sm! border-[#ebebeb]! p-3! resize-none!"
            />

            <div className="flex! items-center! justify-end! gap-2!">
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={submitting}
                className="rounded-full! bg-[#5433eb]! hover:bg-[#4324d4]! text-xs! font-semibold! px-5! h-9! border-0!"
              >
                {editingReviewId ? "Update Review" : "Submit Review"}
              </Button>
            </div>
          </div>
        )
      ) : (
        <div className="bg-[#f9fafb]! rounded-2xl! border! border-gray-100! p-4! text-center! text-xs! text-gray-500!">
          Purchased this item?{" "}
          <a href="/login" className="font-bold! text-[#5433eb]! underline!">
            Sign in
          </a>{" "}
          to leave an official verified review.
        </div>
      )}

      <div className="flex! flex-col! gap-4!">
        {loading ? (
          <div className="py-8! text-center! text-gray-400! flex! items-center! justify-center! gap-2!">
            <LoadingOutlined className="animate-spin!" />
            <span>Loading reviews...</span>
          </div>
        ) : reviews.length === 0 ? (
          <div className="py-8! text-center! text-gray-400! text-xs!">
            No reviews yet for this product. Be the first to share your
            thoughts!
          </div>
        ) : (
          reviews.map((rev) => {
            const reviewerName = rev.userId
              ? `${rev.userId.firstName || ""} ${rev.userId.lastName || ""}`.trim() ||
              "Verified Buyer"
              : "Verified Buyer";
            const isAuthor =
              user &&
              ((rev.userId?._id || rev.userId) === user.id ||
                (rev.userId?._id || rev.userId) === user._id ||
                user.role === "admin");

            const reviewDate = rev.createdAt
              ? new Date(rev.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
              : "Recent";

            return (
              <div
                key={rev._id}
                className="p-4! sm:p-5! rounded-2xl! bg-[#fafafa]! border! border-[#f0f0f0]! flex! flex-col! gap-2.5!"
              >
                <div className="flex! items-center! justify-between! gap-2!">
                  <div className="flex! items-center! gap-2.5!">
                    <div className="w-8! h-8! rounded-full! bg-[#eee9ff]! text-[#5433eb]! font-bold! text-xs! flex! items-center! justify-center!">
                      {reviewerName.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className="flex! items-center! gap-1.5!">
                        <span className="text-xs! sm:text-sm! font-bold! text-[#1a1a1a]!">
                          {reviewerName}
                        </span>
                        <span className="inline-flex! items-center! gap-0.5! text-[10px]! font-semibold! text-emerald-700! bg-emerald-50! px-2! py-0.5! rounded-full!">
                          <CheckCircleFilled className="text-[9px]!" />
                          Verified
                        </span>
                      </div>
                      <span className="text-[11px]! text-gray-400!">
                        {reviewDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex! items-center! gap-2!">
                    <Rate
                      disabled
                      value={rev.rating}
                      className="text-[#f59e0b]! text-xs!"
                    />
                    {isAuthor && (
                      <div className="flex! items-center! gap-1! ml-2!">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(rev)}
                          className="text-gray-400! hover:text-[#5433eb]! text-xs! p-1! cursor-pointer! border-0! bg-transparent!"
                          title="Edit review"
                        >
                          <EditOutlined />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(rev._id)}
                          className="text-gray-400! hover:text-red-500! text-xs! p-1! cursor-pointer! border-0! bg-transparent!"
                          title="Delete review"
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs! sm:text-sm! text-gray-700! leading-relaxed! m-0! pt-1!">
                  {rev.review}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
