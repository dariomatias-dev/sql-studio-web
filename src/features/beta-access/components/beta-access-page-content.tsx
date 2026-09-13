"use client";

import emailjs from "@emailjs/browser";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useHeaderTransparency } from "@/features/layout";
import { PingIndicator } from "@/shared/components/ping-indicator";
import { GooglePlayIcon } from "@/shared/icons";

enum Status {
  Idle,
  Submitting,
  Success,
  Error,
}

const BetaAccessPageContent = () => {
  const { setEnabled } = useHeaderTransparency();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>(Status.Idle);

  useEffect(() => {
    setEnabled(false);
    return () => setEnabled(true);
  }, [setEnabled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(Status.Submitting);

    const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID as string;
    const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID as string;
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY as string;

    try {
      await emailjs.send(
        serviceID,
        templateID,
        {
          subject: "Beta Access Request",
          message: `Requesting beta access for Google Play email: ${email}`,
          email: email,
          name: "Beta Candidate",
        },
        publicKey,
      );

      setStatus(Status.Success);
    } catch (error) {
      console.error("Beta request failed:", error);
      setStatus(Status.Error);
      setTimeout(() => setStatus(Status.Idle), 4000);
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden bg-white pt-32 pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_40px]"></div>
      <div className="pointer-events-none absolute top-0 left-1/2 h-125 w-250 -translate-x-1/2 rounded-full bg-[#00BCD4]/5 blur-[130px]"></div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-6">
        <div className="mb-12 text-center">
          <div className="mb-8 inline-flex cursor-default items-center gap-2.5 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-1.5 shadow-sm">
            <PingIndicator size={8.5} color="#EAB308" glow={false} />

            <span className="text-xs font-bold tracking-wider text-yellow-700 uppercase">
              Closed Beta Access
            </span>
          </div>

          <h1 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Join the <br />
            <span className="bg-linear-to-r from-[#00BCD4] to-cyan-600 bg-clip-text text-transparent">
              Development Program
            </span>
          </h1>

          <p className="mx-auto max-w-lg text-lg leading-relaxed text-slate-500">
            SQL Studio is currently invite-only. To access the app on the Play Store, your email
            needs to be whitelisted in our testers database.
          </p>
        </div>

        <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/60 p-1 shadow-2xl shadow-slate-200/50 backdrop-blur-xl">
          <div className="relative overflow-hidden rounded-[1.4rem] border border-slate-100 bg-white p-8 md:p-10">
            <div className="absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-[#00BCD4]/30 to-transparent"></div>

            {status == Status.Success ? (
              <div className="animate-in fade-in zoom-in text-center duration-500">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 shadow-[0_0_30px_-10px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                </div>

                <h3 className="mb-3 text-2xl font-bold text-slate-900">Request Received</h3>
                <p className="mb-8 text-sm leading-relaxed text-slate-500">
                  You have been added to the waiting list. Please wait for an{" "}
                  <span className="font-bold text-slate-700">invitation email</span> within the next
                  24 hours.
                </p>

                <div className="mb-8 flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 text-left">
                  <div className="mt-0.5 h-4 min-w-1 rounded-full bg-[#00BCD4]"></div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    <strong className="mb-1 block text-slate-700">Important:</strong>
                    The Play Store link below will show an error (&quot;App not available&quot;)
                    until your email is officially approved in our console. Please wait for the
                    confirmation email.
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
                <div className="space-y-3">
                  <label
                    htmlFor="email"
                    className="ml-1 block text-sm font-semibold text-slate-700"
                  >
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
                    <div className="animate-in fade-in slide-in-from-top-2 flex items-center justify-center gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-red-600">
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

        <div className="mt-12 w-full border-t border-slate-200 pt-8">
          <h4 className="mb-6 text-center font-semibold text-slate-900">How it works</h4>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Submit Email",
                desc: "Enter your Google Play email above to join the list.",
              },
              {
                step: "02",
                title: "Wait for Invite",
                desc: "We'll enable access and notify you via email.",
              },
              {
                step: "03",
                title: "Download",
                desc: "Access the Play Store link to install the app.",
              },
            ].map((item, idx) => (
              <div key={idx} className="group flex flex-col items-center gap-2 text-center">
                <span className="mb-1 rounded-md border border-[#00BCD4]/20 bg-[#00BCD4]/10 px-2 py-1 text-xs font-bold text-[#00BCD4]">
                  Step {item.step}
                </span>
                <span className="text-sm font-bold text-slate-700">{item.title}</span>
                <span className="max-w-37.5 text-xs leading-relaxed text-slate-500">
                  {item.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaAccessPageContent;
