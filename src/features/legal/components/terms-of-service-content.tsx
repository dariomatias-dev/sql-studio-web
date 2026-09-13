import { Calendar, FileText } from "lucide-react";

const TermsOfServiceContent = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white pt-32 pb-24">
      <div className="pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 -translate-x-1/4 translate-y-1/2 rounded-full bg-[#00BCD4]/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <div className="mb-16 border-b border-slate-100 pb-12 text-center">
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00BCD4]/5 text-[#00BCD4] ring-1 ring-[#00BCD4]/20">
            <FileText className="h-6 w-6" />
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            Terms of Service
          </h1>

          <div className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-500">
            <Calendar className="h-4 w-4" />
            <span>Last Updated: November 30, 2025</span>
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
                License & Restrictions
              </h2>
              <p className="mb-4 leading-relaxed">
                You are granted a non-exclusive, non-transferable, revocable license to use the
                Application for your personal, non-commercial purposes.
              </p>
              <p className="leading-relaxed">
                You are not allowed to copy or modify the app, any part of the app, or our
                trademarks in any way. You are not allowed to attempt to extract the source code of
                the app, and you also shouldn&apos;t try to translate the app into other languages
                or make derivative versions. The app itself, and all the trademarks, copyright,
                database rights, and other intellectual property rights related to it, still belong
                to <strong className="text-slate-900">Dário Matias</strong>.
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
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00BCD4]" />
                  <span>Backing up your database files regularly.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00BCD4]" />
                  <span>Managing the integrity of your data.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00BCD4]" />
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
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00BCD4]" />
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#00BCD4] hover:underline"
                  >
                    Google Play Services
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900">
                Offline Functionality
              </h2>
              <p className="mb-4 leading-relaxed">
                The Application allows you to create and edit SQL databases without an internet
                connection. However, you acknowledge that you are responsible for any data charges
                incurred if you choose to download updates for the app via your mobile network.
              </p>
              <p className="leading-relaxed">
                Dário Matias cannot take responsibility for the app not working at full
                functionality if you don&apos;t have access to the internet solely for the purpose
                of downloading initial assets or critical updates.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Updates & Termination</h2>
              <p className="mb-4 leading-relaxed">
                Dário Matias is committed to ensuring that the app is as useful and efficient as
                possible. We reserve the right to make changes to the app at any time.
              </p>
              <p className="leading-relaxed">
                We may wish to stop providing the app, and may terminate use of it at any time
                without giving notice of termination to you. Upon termination, (a) the rights and
                licenses granted to you in these terms will end; (b) you must stop using the app,
                and (if needed) delete it from your device.
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
                  href="mailto:matiasdario75@gmail.com"
                  className="font-medium text-[#00BCD4] decoration-2 underline-offset-4 hover:text-[#00ACC1] hover:underline"
                >
                  matiasdario75@gmail.com
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
