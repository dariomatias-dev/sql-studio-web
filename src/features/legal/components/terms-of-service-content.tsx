import { FileText } from "lucide-react";

import { APP_REPOSITORY_URL, SITE_EMAIL } from "@/shared/lib/site";

import { LegalLink } from "./legal-link";
import { LegalPageLayout } from "./legal-page-layout";

const TermsOfServiceContent = () => {
  return (
    <LegalPageLayout
      icon={<FileText className="h-6 w-6" />}
      title="Terms of Service"
      lastUpdated="September 16, 2026"
      intro={
        <>
          By downloading or using the <strong className="text-slate-900">SQL Studio app</strong>,
          these terms will automatically apply to you – you should make sure therefore that you read
          them carefully before using the app.
        </>
      }
    >
      <section>
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900">
          Open Source License
        </h2>
        <p className="mb-4 leading-relaxed">
          SQL Studio&apos;s source code is open source and available on{" "}
          <LegalLink href={APP_REPOSITORY_URL}>GitHub</LegalLink> under the{" "}
          <LegalLink href={`${APP_REPOSITORY_URL}/blob/main/LICENSE`}>MIT License</LegalLink>.
          You&apos;re free to view, use, modify, and redistribute the code under that license&apos;s
          terms. The SQL Studio name and app icon remain the property of{" "}
          <strong className="text-slate-900">Dário Matias</strong> and aren&apos;t covered by it.
        </p>
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900">
          The App &quot;As Is&quot;
        </h2>
        <p className="leading-relaxed">
          SQL Studio is provided &quot;as is&quot;, without warranties of any kind, express or
          implied. Dário Matias makes no guarantee that the app will be error-free or uninterrupted,
          and isn&apos;t liable for damages arising from its use.
        </p>
      </section>

      <section>
        <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900">
          Local Data Responsibility
        </h2>
        <p className="mb-4 leading-relaxed">
          SQL Studio operates entirely <strong className="text-slate-900">offline</strong> and
          locally on your device. We do not provide cloud storage, backup services, or data
          synchronization.
        </p>
        <p className="mb-4 leading-relaxed">You are solely responsible for:</p>
        <ul className="my-6 space-y-3 pl-2">
          <li className="flex items-start gap-3">
            <div className="bg-brand mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
            <span>Backing up your database files regularly.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="bg-brand mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
            <span>Managing the integrity of your data.</span>
          </li>
          <li className="flex items-start gap-3">
            <div className="bg-brand mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
            <span>Ensuring the physical and digital security of your device.</span>
          </li>
        </ul>

        <div className="rounded-xl border border-yellow-100 bg-yellow-50/50 p-4 text-sm leading-relaxed text-slate-700">
          <p className="mb-0">
            <strong>Important:</strong> Dário Matias cannot be held liable for any loss of data,
            corruption of files, or inability to access your databases caused by device failure,
            uninstallation of the app, or user error, as we have no access to your data.
          </p>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Third Party Services</h2>
        <p className="mb-4 leading-relaxed">
          The app does use third-party services that declare their Terms and Conditions, primarily
          for the purpose of application distribution and core system functionality (like Google
          Play Services).
        </p>
        <p className="mb-4 leading-relaxed">
          Link to Terms and Conditions of third-party service providers used by the app:
        </p>
        <ul className="my-6 space-y-3 pl-2">
          <li className="flex items-start gap-3">
            <div className="bg-brand mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full" />
            <a
              href="https://policies.google.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-cyan-700 hover:underline"
            >
              Google Play Services
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Beta Status</h2>
        <p className="leading-relaxed">
          SQL Studio is currently in closed beta. Features, screens, and behavior may change, break,
          or be removed without notice while the app is in this stage. We may also stop providing
          the app or terminate your access to it at any time.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Changes to Terms</h2>
        <p className="mb-4 leading-relaxed">
          We may update our Terms and Conditions from time to time. Thus, you are advised to review
          this page periodically for any changes. We will notify you of any changes by posting the
          new Terms and Conditions on this page.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-slate-900">Contact Us</h2>
        <p className="leading-relaxed">
          If you have any questions or suggestions about the Terms and Conditions, do not hesitate
          to contact the Service Provider at{" "}
          <LegalLink href={`mailto:${SITE_EMAIL}`} external={false}>
            {SITE_EMAIL}
          </LegalLink>
          .
        </p>
      </section>
    </LegalPageLayout>
  );
};

export default TermsOfServiceContent;
