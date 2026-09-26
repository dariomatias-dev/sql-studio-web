import { Shield } from "lucide-react";

import { SITE_EMAIL } from "@/shared/lib/site";

import { LegalLink } from "./legal-link";
import { LegalPageLayout } from "./legal-page-layout";

const PrivacyPolicyContent = () => {
  return (
    <LegalPageLayout
      icon={<Shield className="h-6 w-6" />}
      title="Privacy Policy"
      lastUpdated="September 16, 2026"
      intro={
        // prettier-ignore
        <>
          This privacy policy covers both the{" "}
          <strong className="text-slate-900">SQL Studio</strong> mobile app and this website,
          both created and operated by <strong className="text-slate-900">Dário Matias</strong>{" "}
          (&quot;we&quot;, &quot;us&quot;).
        </>
      }
    >
      <section>
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900">The App</h2>
        <p className="mb-4 leading-relaxed">
          SQL Studio does not collect, transmit, or share any data, and it does not require an
          internet connection to work. Every database you create or practice with (its schema, its
          data, your queries) stays entirely on your device. We have no server, no account system,
          and no way to see what you do in the app.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">This Website</h2>
        <p className="mb-4 leading-relaxed">
          This is a static website with no database or backend of our own. The only information it
          collects is what you choose to submit through its two forms:
        </p>
        <ul className="my-6 space-y-3 pl-2">
          {[
            "The contact form (/contact): your name, email address, subject, and message.",
            "The beta access form (/download): your Google Play email address.",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="bg-brand mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="leading-relaxed">
          Submitting either form sends that information directly from your browser to{" "}
          <LegalLink href="https://www.emailjs.com/legal/privacy-policy/">EmailJS</LegalLink>, a
          third-party email delivery service, which forwards it to our inbox. We don&apos;t store it
          anywhere ourselves; it&apos;s kept only in that inbox, for as long as needed to respond to
          you. This site does not use analytics or advertising of any kind. Our hosting provider,
          Vercel, may keep standard technical access logs (such as IP address and browser type) as
          part of normal web hosting operation.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Your Rights</h2>
        <p className="leading-relaxed">
          Since we don&apos;t store any data ourselves, there is nothing on our side to access,
          export, or delete. If you&apos;d like a message you sent us removed from our inbox, or
          have any other question about your data, contact us at{" "}
          <LegalLink href={`mailto:${SITE_EMAIL}`} external={false}>
            {SITE_EMAIL}
          </LegalLink>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Children&apos;s Privacy</h2>
        <p className="leading-relaxed">
          Neither the app nor this website is directed at children, and neither knowingly collects
          information from them. If you believe a child has provided personal information to us
          through the contact or beta access form, contact us at{" "}
          <LegalLink href={`mailto:${SITE_EMAIL}`} external={false}>
            {SITE_EMAIL}
          </LegalLink>{" "}
          so we can delete it.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Changes to This Policy</h2>
        <p className="leading-relaxed">
          This Privacy Policy may be updated from time to time, for example if the app or website
          starts collecting information it doesn&apos;t today. Any change will be reflected on this
          page with an updated &quot;Last Updated&quot; date.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions about this Privacy Policy, contact us at{" "}
          <LegalLink href={`mailto:${SITE_EMAIL}`} external={false}>
            {SITE_EMAIL}
          </LegalLink>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default PrivacyPolicyContent;
