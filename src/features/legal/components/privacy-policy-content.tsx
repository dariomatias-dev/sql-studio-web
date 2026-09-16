import { Calendar, Shield } from "lucide-react";

import { SITE_EMAIL } from "@/shared/lib/site";

const PrivacyPolicyContent = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white pt-32 pb-24">
      <div className="pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 -translate-x-1/4 translate-y-1/2 rounded-full bg-[#00BCD4]/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="mb-16 border-b border-slate-100 pb-12 text-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00BCD4]/5 text-[#00BCD4] ring-1 ring-[#00BCD4]/20">
            <Shield className="h-6 w-6" />
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Privacy Policy
          </h1>

          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-500">
            <Calendar className="h-4 w-4" />
            <span>Last Updated: September 16, 2026</span>
          </div>
        </div>

        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
          <div className="mb-10 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm md:text-base">
            <p className="mb-0">
              This privacy policy covers both the{" "}
              <strong className="text-slate-900">SQL Studio</strong> mobile app and this website,
              both created and operated by <strong className="text-slate-900">Dário Matias</strong>{" "}
              (&quot;we&quot;, &quot;us&quot;).
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900">
                The App
              </h2>
              <p className="mb-4 leading-relaxed">
                SQL Studio does not collect, transmit, or share any data, and it does not require an
                internet connection to work. Every database you create or practice with — its
                schema, its data, your queries — stays entirely on your device. We have no server,
                no account system, and no way to see what you do in the app.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">This Website</h2>
              <p className="mb-4 leading-relaxed">
                This is a static website with no database or backend of our own. The only
                information it collects is what you choose to submit through its two forms:
              </p>
              <ul className="my-6 space-y-3 pl-2">
                {[
                  "The contact form (/contact): your name, email address, subject, and message.",
                  "The beta access form (/download): your Google Play email address.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00BCD4]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="leading-relaxed">
                Submitting either form sends that information directly from your browser to{" "}
                <a
                  href="https://www.emailjs.com/legal/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-cyan-700 decoration-2 underline-offset-4 hover:text-cyan-800 hover:underline"
                >
                  EmailJS
                </a>
                , a third-party email delivery service, which forwards it to our inbox. We
                don&apos;t store it anywhere ourselves; it&apos;s kept only in that inbox, for as
                long as needed to respond to you. This site does not use analytics or advertising of
                any kind. Our hosting provider, Vercel, may keep standard technical access logs
                (such as IP address and browser type) as part of normal web hosting operation.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Your Rights</h2>
              <p className="leading-relaxed">
                Since we don&apos;t store any data ourselves, there is nothing on our side to
                access, export, or delete. If you&apos;d like a message you sent us removed from our
                inbox, or have any other question about your data, contact us at{" "}
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="font-medium text-cyan-700 decoration-2 underline-offset-4 hover:text-cyan-800 hover:underline"
                >
                  {SITE_EMAIL}
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Children&apos;s Privacy</h2>
              <p className="leading-relaxed">
                Neither the app nor this website is directed at children, and neither knowingly
                collects information from them. If you believe a child has provided personal
                information to us through the contact or beta access form, contact us at{" "}
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="font-medium text-cyan-700 decoration-2 underline-offset-4 hover:text-cyan-800 hover:underline"
                >
                  {SITE_EMAIL}
                </a>{" "}
                so we can delete it.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Changes to This Policy</h2>
              <p className="leading-relaxed">
                This Privacy Policy may be updated from time to time, for example if the app or
                website starts collecting information it doesn&apos;t today. Any change will be
                reflected on this page with an updated &quot;Last Updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions about this Privacy Policy, contact us at{" "}
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="font-medium text-cyan-700 decoration-2 underline-offset-4 hover:text-cyan-800 hover:underline"
                >
                  {SITE_EMAIL}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyContent;
