import { MessageSquare, Star, CheckCircle, XCircle, Clock } from "lucide-react";
import { getAllReviews } from "@/lib/actions";
import ReviewStatusSelect from "./ReviewStatusSelect";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function AdminReviewsPage() {
  const reviews = (await getAllReviews()) as any[];
  const pendingCount = reviews.filter((r) => r.status === "Pending").length;
  const approvedCount = reviews.filter((r) => r.status === "Approved").length;
  const rejectedCount = reviews.filter((r) => r.status === "Rejected").length;
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-[zinc-950] tracking-tighter uppercase">
            Review <span className="text-lime-600">Moderation</span>
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            label: "Pending Approval",
            total: pendingCount,
            icon: Clock,
            color: "text-lime-600",
            bg: "bg-lime-50",
          },
          {
            label: "Approved",
            total: approvedCount,
            icon: CheckCircle,
            color: "text-green-500",
            bg: "bg-green-50",
          },
          {
            label: "Rejected",
            total: rejectedCount,
            icon: XCircle,
            color: "text-red-500",
            bg: "bg-red-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                {stat.label}
              </p>
              <p className="text-3xl font-black text-[zinc-950]">
                {stat.total}
              </p>
            </div>
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg}`}
            >
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-900/5 overflow-hidden">
        <div className="p-8 border-b border-slate-50">
          <h2 className="text-xl font-black text-[zinc-950]">
            All Reviews
          </h2>
        </div>
        {reviews.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-[zinc-950] mb-2 uppercase">
              No reviews found
            </h3>
            <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm">
              When customers leave reviews, they will appear here for
              moderation.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead><tr className="border-b border-slate-100 bg-slate-50/50"><th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Date & Author</th><th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Target</th><th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Rating & Comment</th><th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th></tr></thead>
              <tbody>
                {reviews.map((review) => (
                  <tr
                    key={review._id}
                    className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors"
                  ><td className="p-6 align-top">
                      <p className="text-sm font-black text-[zinc-950] uppercase">
                        {review.userName}
                      </p>
                      <p className="text-xs text-slate-400 font-medium mb-1">
                        {review.userEmail}
                      </p>
                      <p className="text-[10px] font-black text-slate-400 tracking-widest">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </td><td className="p-6 align-top">
                      <p className="text-[10px] font-black uppercase tracking-widest text-lime-600 bg-lime-50 inline-block px-2 py-1 rounded-md mb-1">
                        {review.targetType}
                      </p>
                      <p
                        className="text-xs text-slate-500 truncate w-32"
                        title={review.targetId}
                      >
                        {review.targetId}
                      </p>
                    </td><td className="p-6 align-top max-w-sm">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < review.rating ? "fill-lime-600 text-lime-600" : "text-slate-200"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-slate-600 font-medium line-clamp-3">
                        "{review.comment}"
                      </p>
                    </td><td className="p-6 align-top">
                      <ReviewStatusSelect
                        reviewId={review._id}
                        initialStatus={review.status}
                      />
                    </td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
