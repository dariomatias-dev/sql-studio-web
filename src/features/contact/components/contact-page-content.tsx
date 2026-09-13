import { Mail, MessageSquare } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/shared/icons";

import { ContactForm } from "./contact-form";

const ContactPageContent = () => {
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

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactPageContent;
