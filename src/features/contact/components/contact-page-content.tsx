"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  AtSign,
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare,
  Send,
  User,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { GithubIcon, LinkedinIcon } from "@/shared/icons";
import type { EmailData } from "@/shared/lib/email";
import { sendEmail } from "@/shared/lib/email";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Invalid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

enum SubmitStatus {
  Idle,
  Success,
  Error,
}

const ContactPageContent = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(SubmitStatus.Idle);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "General Inquiry",
      message: "",
    },
  });

  const onSubmit = async (value: FormData) => {
    setSubmitStatus(SubmitStatus.Idle);

    try {
      const data: EmailData = {
        email: value.email,
        subject: value.subject,
        message: `${value.name}: ${value.message}`,
      };

      await sendEmail(data);

      setSubmitStatus(SubmitStatus.Success);

      reset();

      setTimeout(() => setSubmitStatus(SubmitStatus.Idle), 5000);
    } catch {
      setSubmitStatus(SubmitStatus.Error);
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-white pt-32 pb-24">
      <div className="pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 -translate-x-1/4 translate-y-1/2 rounded-full bg-[#00BCD4]/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center md:mb-20">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00BCD4]/5 text-[#00BCD4] ring-1 ring-[#00BCD4]/20">
            <MessageSquare className="h-6 w-6" />
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Get in Touch
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-500">
            Have a question, found a bug, or want to suggest a feature? We&apos;d love to hear from
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="space-y-10">
            <div>
              <h3 className="mb-4 text-2xl font-bold text-slate-900">
                Let&apos;s start a conversation
              </h3>
              <p className="mb-8 leading-relaxed text-slate-600">
                Since SQL Studio is an offline-first app tailored for developers, your feedback is
                crucial for future updates. Whether it&apos;s a technical issue or a feature
                request, reach out directly.
              </p>

              <div className="flex flex-col gap-6 rounded-2xl border border-slate-100 bg-slate-50 p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-[#00BCD4] shadow-sm">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-slate-900">Email Support</p>
                    <a
                      href="mailto:matiasdario75@gmail.com"
                      className="text-slate-600 transition-colors hover:text-[#00BCD4]"
                    >
                      matiasdario75@gmail.com
                    </a>
                  </div>
                </div>

                <div className="h-px w-full bg-slate-200" />

                <div className="flex gap-4">
                  <a
                    href="https://github.com/dariomatias-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#00BCD4]"
                  >
                    <GithubIcon className="h-5 w-5" />
                    GitHub Profile
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dariomatias-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-[#00BCD4]"
                  >
                    <LinkedinIcon className="h-5 w-5" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#00BCD4]/10 bg-[#00BCD4]/5 p-6">
              <h4 className="mb-2 font-semibold text-slate-900">Reporting a Bug?</h4>
              <p className="text-sm leading-relaxed text-slate-600">
                Please include your device model and Android version to help us resolve the issue
                faster.
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] sm:p-8 md:p-10">
            <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-bl-full bg-slate-50 transition-transform group-hover:scale-110" />

            <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      {...register("name")}
                      type="text"
                      id="name"
                      className={`w-full rounded-xl border bg-slate-50 py-3 pr-4 pl-12 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/50 focus:outline-none ${
                        errors.name
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-slate-200"
                      }`}
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <div className="relative">
                    <AtSign className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      className={`w-full rounded-xl border bg-slate-50 py-3 pr-4 pl-12 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/50 focus:outline-none ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                          : "border-slate-200"
                      }`}
                      placeholder="you@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-slate-700">
                  Subject
                </label>
                <select
                  {...register("subject")}
                  id="subject"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/50 focus:outline-none"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Feedback">Feedback</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  className={`w-full resize-none rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 transition-all placeholder:text-slate-400 focus:border-[#00BCD4] focus:ring-2 focus:ring-[#00BCD4]/50 focus:outline-none ${
                    errors.message
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-slate-200"
                  }`}
                  placeholder="How can we help you?"
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 font-bold text-white transition-all duration-300 hover:bg-[#00BCD4] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <span>Sending...</span>
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {submitStatus == SubmitStatus.Success && (
                  <div className="animate-in fade-in slide-in-from-top-2 flex items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-emerald-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Message sent successfully!</span>
                  </div>
                )}

                {submitStatus == SubmitStatus.Error && (
                  <div className="animate-in fade-in slide-in-from-top-2 flex items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-red-600">
                    <AlertCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Failed to send. Please try again.</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPageContent;
