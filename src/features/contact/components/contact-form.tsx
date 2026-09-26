"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, AtSign, CheckCircle, Loader2, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { HoneypotField } from "@/shared/components/honeypot-field";
import { NoJsWarning } from "@/shared/components/no-js-warning";
import type { EmailData } from "@/shared/lib/email";
import { sendEmail } from "@/shared/lib/email";
import { useSpamGuard } from "@/shared/lib/spam-guard";

import { FieldError } from "./field-error";
import { fieldBorderClass } from "../lib/field-border-class";
import { schema, type FormData } from "../lib/schema";

enum SubmitStatus {
  Idle,
  Success,
  Error,
}

export const ContactForm = () => {
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(SubmitStatus.Idle);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { honeypotRef, isSpam } = useSpamGuard();

  useEffect(() => {
    return () => clearTimeout(resetTimeoutRef.current);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
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

    if (isSpam()) {
      setSubmitStatus(SubmitStatus.Success);
      reset();
      resetTimeoutRef.current = setTimeout(() => setSubmitStatus(SubmitStatus.Idle), 5000);
      return;
    }

    try {
      const data: EmailData = {
        email: value.email,
        subject: value.subject,
        message: `${value.name}: ${value.message}`,
      };

      await sendEmail(data);

      setSubmitStatus(SubmitStatus.Success);

      reset();

      resetTimeoutRef.current = setTimeout(() => setSubmitStatus(SubmitStatus.Idle), 5000);
    } catch {
      setSubmitStatus(SubmitStatus.Error);
    }
  };

  const onInvalid = (invalidFields: Partial<Record<keyof FormData, unknown>>) => {
    const firstInvalidField = Object.keys(invalidFields)[0] as keyof FormData | undefined;
    if (firstInvalidField) setFocus(firstInvalidField);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] sm:p-8 md:p-10">
      <div className="absolute top-0 right-0 -z-10 h-32 w-32 rounded-bl-full bg-slate-50 transition-transform group-hover:scale-110" />

      <form onSubmit={(e) => void handleSubmit(onSubmit, onInvalid)(e)} className="space-y-6">
        <NoJsWarning message="This form requires JavaScript to be enabled in your browser to submit." />
        <HoneypotField inputRef={honeypotRef} />

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
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={`focus:border-brand focus:ring-brand/50 w-full rounded-xl border bg-slate-50 py-3 pr-4 pl-12 text-slate-900 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${fieldBorderClass(!!errors.name)}`}
                placeholder="Your name"
              />
            </div>
            <FieldError id="name-error" message={errors.name?.message} />
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
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`focus:border-brand focus:ring-brand/50 w-full rounded-xl border bg-slate-50 py-3 pr-4 pl-12 text-slate-900 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${fieldBorderClass(!!errors.email)}`}
                placeholder="you@example.com"
              />
            </div>
            <FieldError id="email-error" message={errors.email?.message} />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium text-slate-700">
            Subject
          </label>
          <select
            {...register("subject")}
            id="subject"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className={`focus:border-brand focus:ring-brand/50 w-full rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 transition-all focus:ring-2 focus:outline-none ${fieldBorderClass(!!errors.subject)}`}
          >
            <option value="General Inquiry">General Inquiry</option>
            <option value="Bug Report">Bug Report</option>
            <option value="Feature Request">Feature Request</option>
            <option value="Feedback">Feedback</option>
          </select>
          <FieldError id="subject-error" message={errors.subject?.message} />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            {...register("message")}
            id="message"
            rows={5}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`focus:border-brand focus:ring-brand/50 w-full resize-none rounded-xl border bg-slate-50 px-4 py-3 text-slate-900 transition-all placeholder:text-slate-400 focus:ring-2 focus:outline-none ${fieldBorderClass(!!errors.message)}`}
            placeholder="How can we help you?"
          ></textarea>
          <FieldError id="message-error" message={errors.message?.message} />
        </div>

        <div className="flex flex-col gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="group hover:bg-brand inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-4 font-bold text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70"
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
            <div
              role="status"
              className="animate-in fade-in slide-in-from-top-2 flex items-center justify-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 p-3 text-emerald-600"
            >
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Message sent successfully!</span>
            </div>
          )}

          {submitStatus == SubmitStatus.Error && (
            <div
              role="alert"
              className="animate-in fade-in slide-in-from-top-2 flex items-center justify-center gap-2 rounded-lg border border-red-100 bg-red-50 p-3 text-red-600"
            >
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Failed to send. Please try again.</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
