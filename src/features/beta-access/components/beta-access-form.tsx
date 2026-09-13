"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { NoJsWarning } from "@/shared/components/no-js-warning";
import { GooglePlayIcon } from "@/shared/icons";
import { sendEmail } from "@/shared/lib/email";

enum Status {
  Idle,
  Submitting,
  Success,
  Error,
}

export const BetaAccessForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(Status.Idle);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => clearTimeout(resetTimeoutRef.current);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(Status.Submitting);

    try {
      await sendEmail({
        email,
        subject: "Beta Access Request",
        message: `Requesting beta access for Google Play email: ${email}`,
      });

      setStatus(Status.Success);
    } catch (error) {
      console.error("Beta request failed:", error);
      setStatus(Status.Error);
      resetTimeoutRef.current = setTimeout(() => setStatus(Status.Idle), 4000);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/60 p-1 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
      <div className="relative overflow-hidden rounded-[1.4rem] border border-slate-100 bg-white p-8 md:p-10">
        <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-[#00BCD4]/30 to-transparent"></div>

        {status == Status.Success ? (
          <div role="status" className="animate-in fade-in zoom-in text-center duration-500">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </div>

            <h3 className="mb-3 text-2xl font-bold text-slate-900">Request Received</h3>
            <p className="mb-8 text-sm leading-relaxed text-slate-500">
              You have been added to the waiting list. Please wait for an{" "}
              <span className="font-bold text-slate-700">invitation email</span> within the next 24
              hours.
            </p>

            <div className="mb-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
              <div className="mt-0.5 h-4 min-w-1 rounded-full bg-[#00BCD4]"></div>
              <p className="text-xs leading-relaxed text-slate-500">
                <strong className="mb-1 block text-slate-700">Important:</strong>
                The Play Store link below will show an error (&quot;App not available&quot;) until
                your email is officially approved in our console. Please wait for the confirmation
                email.
              </p>
            </div>

            <Link
              href="https://play.google.com/"
              target="_blank"
              className="group relative inline-flex w-full items-center justify-center gap-3 rounded-xl bg-slate-900 px-6 py-4 text-base font-bold text-white shadow-xl shadow-slate-200 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-800"
            >
              <GooglePlayIcon className="text-xl text-[#00BCD4]" />
              <span>Open in Play Store</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={(e) => void handleSubmit(e)} className="space-y-8">
            <NoJsWarning />

            <div className="space-y-3">
              <label htmlFor="email" className="ml-1 block text-sm font-semibold text-slate-700">
                Google Play Email Address
              </label>
              <div className="group relative">
                <div className="absolute -inset-0.5 rounded-xl bg-linear-to-r from-[#00BCD4] to-cyan-400 opacity-0 blur-sm transition duration-500 group-focus-within:opacity-100"></div>
                <div className="relative flex items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all focus-within:border-white focus-within:bg-white">
                  <div className="pr-3 pl-4 text-slate-400">
                    <Mail className="h-5 w-5" />
                  </div>

                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-account@gmail.com"
                    className="w-full bg-transparent px-4 py-4 font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>
              <p className="ml-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="h-1 w-1 rounded-full bg-[#00BCD4]"></span>
                Must match the account logged in on your Android device.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                disabled={status == Status.Submitting}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-slate-900 py-4 font-bold text-white shadow-lg shadow-slate-200 transition-all duration-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <div className="absolute top-0 -left-full h-full w-full skew-x-[-25deg] animate-[shine_2s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent"></div>

                {status == Status.Submitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Join Beta Waitlist</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {status === Status.Error && (
                <div
                  role="alert"
                  className="animate-in fade-in slide-in-from-top-2 flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-red-600"
                >
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    Failed to send request. Please try again.
                  </span>
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
