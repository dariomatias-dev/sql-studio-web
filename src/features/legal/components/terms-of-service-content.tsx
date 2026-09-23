import { Calendar, FileText } from "lucide-react";

import { PageHeaderBackdrop } from "@/shared/components/page-header-backdrop";
import { APP_REPOSITORY_URL, SITE_EMAIL } from "@/shared/lib/site";

const TermsOfServiceContent = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white pt-32 pb-24">
      <PageHeaderBackdrop />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="mb-16 border-b border-slate-100 pb-12 text-center">
          <div className="bg-brand/5 text-brand ring-brand/20 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1">
            <FileText className="h-6 w-6" />
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Terms of Service
          </h1>

          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-500">
            <Calendar className="h-4 w-4" />
            <span>Last Updated: September 16, 2026</span>
          </div>
        </div>

        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
          <div className="mb-10 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm md:text-base">
            <p className="mb-0">
              By downloading or using the <strong className="text-slate-900">SQL Studio app</strong>
              , these terms will automatically apply to you – you should make sure therefore that
              you read them carefully before using the app.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900">
                Open Source License
              </h2>
              <p className="mb-4 leading-relaxed">
                SQL Studio&apos;s source code is open source and available on{" "}
                <a
                  href={APP_REPOSITORY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-cyan-700 decoration-2 underline-offset-4 hover:text-cyan-800 hover:underline"
                >
                  GitHub
                </a>{" "}
                under the{" "}
                <a
                  href={`${APP_REPOSITORY_URL}/blob/main/LICENSE`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-cyan-700 decoration-2 underline-offset-4 hover:text-cyan-800 hover:underline"
                >
                  MIT License
                </a>
                . You&apos;re free to view, use, modify, and redistribute the code under that
                license&apos;s terms. The SQL Studio name and app icon remain the property of{" "}
                <strong className="text-slate-900">Dário Matias</strong> and aren&apos;t covered by
                it.
              </p>
            </section>

            <section>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900">
                The App &quot;As Is&quot;
              </h2>
              <p className="leading-relaxed">
                SQL Studio is provided &quot;as is&quot;, without warranties of any kind, express or
                implied. Dário Matias makes no guarantee that the app will be error-free or
                uninterrupted, and isn&apos;t liable for damages arising from its use.
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
                  <strong>Important:</strong> Dário Matias cannot be held liable for any loss of
                  data, corruption of files, or inability to access your databases caused by device
                  failure, uninstallation of the app, or user error, as we have no access to your
                  data.
                </p>
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Third Party Services</h2>
              <p className="mb-4 leading-relaxed">
                The app does use third-party services that declare their Terms and Conditions,
                primarily for the purpose of application distribution and core system functionality
                (like Google Play Services).
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
                SQL Studio is currently in closed beta. Features, screens, and behavior may change,
                break, or be removed without notice while the app is in this stage. We may also stop
                providing the app or terminate your access to it at any time.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Changes to Terms</h2>
              <p className="mb-4 leading-relaxed">
                We may update our Terms and Conditions from time to time. Thus, you are advised to
                review this page periodically for any changes. We will notify you of any changes by
                posting the new Terms and Conditions on this page.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions or suggestions about the Terms and Conditions, do not
                hesitate to contact the Service Provider at{" "}
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

export default TermsOfServiceContent;
