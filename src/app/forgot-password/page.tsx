import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Reset Your Password — FamilyFans Account | FamilyFans",
  description:
    "Forgot your FamilyFans password? Enter your email address and we'll send you a secure link to reset your password instantly.",
  robots: { index: false, follow: false },
};
export default function ForgotPasswordPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16">
      {" "}
      <div className="w-full max-w-md space-y-8">
        {" "}
        <div className="text-center">
          {" "}
          <Link
            href="/"
            className="text-xl font-bold"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            FamilyFans
          </Link>{" "}
          <h1
            className="text-2xl font-bold mt-6 mb-2"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Forgot your password?
          </h1>{" "}
          <p className="text-sm text-[var(--muted-text)]">
            No worries. Enter your email and we'll send a reset link.
          </p>{" "}
        </div>{" "}
        <form className="space-y-4">
          {" "}
          <div className="space-y-1.5">
            {" "}
            <label htmlFor="email" className="text-sm font-medium">
              Email address
            </label>{" "}
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="w-full px-4 py-2.5 rounded-md border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--foreground)] transition-colors"
            />{" "}
          </div>{" "}
          <button type="submit" className="btn-primary w-full py-3">
            Send Reset Link
          </button>{" "}
        </form>{" "}
        <p className="text-center text-sm text-[var(--muted-text)]">
          {" "}
          Remembered it?{""}{" "}
          <Link
            href="/login"
            className="font-semibold text-[var(--foreground)] hover:underline"
          >
            Back to sign in
          </Link>{" "}
        </p>{" "}
      </div>{" "}
    </div>
  );
}
