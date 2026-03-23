"use client";

import { useState } from "react";

import { Star, MessageSquare } from "lucide-react";

import { createReview } from "@/lib/actions";
interface Review {
  _id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
interface ReviewSectionProps {
  targetId: string;
  targetType: "Product" | "BlogPost";
  initialReviews: Review[];
}

export default function ReviewSection({
  targetId,
  targetType,
  initialReviews,
}: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");

  const [errorMsg, setErrorMsg] = useState("");

  // Form state
  const [rating, setRating] = useState(5);

  const [userName, setUserName] = useState("");

  const [userEmail, setUserEmail] = useState("");

  const [comment, setComment] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    const reviewData = {
      targetId,
      targetType,
      userName,
      userEmail,
      rating,
      comment,
      status: "Pending",
    };
    try {
      const res = await createReview(reviewData);

      if (res.success) {
        setSuccessMsg(
          "Review submitted successfully! It will appear once approved by an administrator.",
        );
        setUserName("");
        setUserEmail("");
        setComment("");
        setRating(5);
      } else {
        setErrorMsg(res.message || "Failed to submit review.");
      }
    } catch (error) {
      setErrorMsg("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="mt-24 pt-24 border-t border-slate-200">
      {" "}
      <div className="flex flex-col md:flex-row gap-20">
        {" "}
        <div className="md:w-1/3 space-y-6">
          {" "}
          <h2 className="text-4xl font-black text-[zinc-950] tracking-tighter">
            Customer Reviews
          </h2>{" "}
          <p className="text-slate-500 font-medium">
            See what others are saying about this item, or share your own
            experience.
          </p>{" "}
          <div className="bg-lime-50 rounded-3xl p-8 border border-lime-100/50">
            {" "}
            <h3 className="text-xl font-black text-orange-900 mb-6">
              Write a Review
            </h3>{" "}
            <form onSubmit={handleSubmit} className="space-y-4">
              {" "}
              <div>
                {" "}
                <label className="text-[10px] font-black uppercase tracking-widest text-orange-700/70 ml-2">
                  Rating
                </label>{" "}
                <div className="flex gap-2 mt-1 px-2">
                  {" "}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      {" "}
                      <Star
                        className={`w-6 h-6 transition-all ${
                          rating >= star
                            ? "fill-lime-600 text-lime-600 scale-110"
                            : "text-lime-200 hover:text-orange-300"
                        }
`}
                      />{" "}
                    </button>
                  ))}
                </div>{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="text-[10px] font-black uppercase tracking-widest text-orange-700/70 ml-2">
                  Name
                </label>{" "}
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-lime-600 font-bold"
                  placeholder="Your Name"
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="text-[10px] font-black uppercase tracking-widest text-orange-700/70 ml-2">
                  Email
                </label>{" "}
                <input
                  type="email"
                  required
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-white border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-lime-600 font-bold"
                  placeholder="you@example.com"
                />{" "}
              </div>{" "}
              <div>
                {" "}
                <label className="text-[10px] font-black uppercase tracking-widest text-orange-700/70 ml-2">
                  Review
                </label>{" "}
                <textarea
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full bg-white border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-lime-600 font-medium h-24 resize-none"
                  placeholder="Share your thoughts..."
                ></textarea>{" "}
              </div>{" "}
              {successMsg && (
                <p className="text-sm font-bold text-green-600 bg-green-50 p-3 rounded-xl border border-green-100">
                  {successMsg}
                </p>
              )}
              {errorMsg && (
                <p className="text-sm font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                  {errorMsg}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary !py-4 shadow-xl shadow-lime-600/20 disabled:opacity-50"
              >
                {" "}
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>{" "}
            </form>{" "}
          </div>{" "}
        </div>{" "}
        <div className="md:w-2/3">
          {" "}
          {reviews.length === 0 ? (
            <div className="bg-slate-50/50 rounded-[3rem] p-16 text-center border-2 border-dashed border-slate-200 h-full flex flex-col items-center justify-center">
              {" "}
              <MessageSquare className="w-12 h-12 text-slate-300 mb-4" />{" "}
              <h3 className="text-xl font-black text-[zinc-950] mb-2 uppercase">
                No Reviews Yet
              </h3>{" "}
              <p className="text-slate-500 font-medium text-sm max-w-xs">
                Be the first to share your thoughts and help others make a
                decision.
              </p>{" "}
            </div>
          ) : (
            <div className="space-y-6">
              {" "}
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm"
                >
                  {" "}
                  <div className="flex items-center justify-between mb-4">
                    {" "}
                    <div>
                      {" "}
                      <p className="font-black text-[zinc-950] text-lg uppercase">
                        {review.userName}
                      </p>{" "}
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        {" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>{" "}
                    </div>{" "}
                    <div className="flex items-center gap-1">
                      {" "}
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-lime-600 text-lime-600"
                              : "text-slate-200"
                          }
`}
                        />
                      ))}
                    </div>{" "}
                  </div>{" "}
                  <p className="text-slate-600 font-medium leading-relaxed">
                    "{review.comment}"
                  </p>{" "}
                </div>
              ))}
            </div>
          )}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
