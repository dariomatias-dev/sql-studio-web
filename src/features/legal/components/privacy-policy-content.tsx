import { Calendar, Shield } from "lucide-react";

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
            <span>Last Updated: November 20, 2025</span>
          </div>
        </div>

        <div className="prose prose-slate prose-lg max-w-none text-slate-600">
          <div className="mb-10 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm md:text-base">
            <p className="mb-0">
              This privacy policy applies to the{" "}
              <strong className="text-slate-900">SQL Studio app</strong> (hereby referred to as
              &quot;Application&quot;) for mobile devices that was created by
              <strong className="text-slate-900"> Dário Matias</strong> (hereby referred to as
              &quot;Service Provider&quot;) as a Free service. This service is intended for use
              &quot;AS IS&quot;.
            </p>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900">
                Information Collection and Use
              </h2>
              <p className="mb-4 leading-relaxed">
                The Application collects information when you download and use it. This information
                may include information such as:
              </p>
              <ul className="my-6 space-y-3 pl-2">
                {[
                  "Your device's Internet Protocol address (e.g. IP address)",
                  "The pages of the Application that you visit, the time and date of your visit, the time spent on those pages",
                  "The time spent on the Application",
                  "The operating system you use on your mobile device",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#00BCD4]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mb-4 rounded-xl border border-slate-100 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
                The Application does not gather precise information about the location of your
                mobile device.
              </p>
              <p className="mb-4 leading-relaxed">
                The Service Provider may use the information you provided to contact you from time
                to time to provide you with important information, required notices and marketing
                promotions.
              </p>
              <p className="leading-relaxed">
                For a better experience, while using the Application, the Service Provider may
                require you to provide us with certain personally identifiable information. The
                information that the Service Provider request will be retained by them and used as
                described in this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Third Party Access</h2>
              <p className="mb-4 leading-relaxed">
                Only aggregated, anonymized data is periodically transmitted to external services to
                aid the Service Provider in improving the Application and their service. The Service
                Provider may share your information with third parties in the ways that are
                described in this privacy statement.
              </p>
              <p className="mb-4 leading-relaxed">
                The Service Provider may disclose User Provided and Automatically Collected
                Information:
              </p>
              <ul className="my-6 space-y-3 pl-2">
                <li className="flex items-start gap-3">
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>
                    As required by law, such as to comply with a subpoena, or similar legal process;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>
                    When they believe in good faith that disclosure is necessary to protect their
                    rights, protect your safety or the safety of others, investigate fraud, or
                    respond to a government request;
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                  <span>
                    With their trusted services providers who work on their behalf, do not have an
                    independent use of the information we disclose to them, and have agreed to
                    adhere to the rules set forth in this privacy statement.
                  </span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Opt-Out Rights</h2>
              <p className="leading-relaxed">
                You can stop all collection of information by the Application easily by uninstalling
                it. You may use the standard uninstall processes as may be available as part of your
                mobile device or via the mobile application marketplace or network.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Data Retention Policy</h2>
              <p className="leading-relaxed">
                The Service Provider will retain User Provided data for as long as you use the
                Application and for a reasonable time thereafter. If you&apos;d like them to delete
                User Provided Data that you have provided via the Application, please contact them
                at{" "}
                <a
                  href="mailto:matiasdario75@gmail.com"
                  className="font-medium text-[#00BCD4] decoration-2 underline-offset-4 hover:text-[#00ACC1] hover:underline"
                >
                  matiasdario75@gmail.com
                </a>{" "}
                and they will respond in a reasonable time.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Children</h2>
              <p className="mb-4 leading-relaxed">
                The Service Provider does not use the Application to knowingly solicit data from or
                market to children under the age of 13.
              </p>
              <p className="leading-relaxed">
                The Service Provider does not knowingly collect personally identifiable information
                from children. The Service Provider encourages all children to never submit any
                personally identifiable information through the Application and/or Services. The
                Service Provider encourage parents and legal guardians to monitor their
                children&apos;s Internet usage and to help enforce this Policy by instructing their
                children never to provide personally identifiable information through the
                Application and/or Services without their permission. If you have reason to believe
                that a child has provided personally identifiable information to the Service
                Provider through the Application and/or Services, please contact the Service
                Provider (
                <a
                  href="mailto:matiasdario75@gmail.com"
                  className="font-medium text-[#00BCD4] decoration-2 underline-offset-4 hover:text-[#00ACC1] hover:underline"
                >
                  matiasdario75@gmail.com
                </a>
                ) so that they will be able to take the necessary actions. You must also be at least
                16 years of age to consent to the processing of your personally identifiable
                information in your country (in some countries we may allow your parent or guardian
                to do so on your behalf).
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Security</h2>
              <p className="leading-relaxed">
                The Service Provider is concerned about safeguarding the confidentiality of your
                information. The Service Provider provides physical, electronic, and procedural
                safeguards to protect information the Service Provider processes and maintains.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Changes</h2>
              <p className="mb-4 leading-relaxed">
                This Privacy Policy may be updated from time to time for any reason. The Service
                Provider will notify you of any changes to the Privacy Policy by updating this page
                with the new Privacy Policy. You are advised to consult this Privacy Policy
                regularly for any changes, as continued use is deemed approval of all changes.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Your Consent</h2>
              <p className="leading-relaxed">
                By using the Application, you are consenting to the processing of your information
                as set forth in this Privacy Policy now and as amended by us.
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-slate-900">Contact Us</h2>
              <p className="leading-relaxed">
                If you have any questions regarding privacy while using the Application, or have
                questions about the practices, please contact the Service Provider via email at{" "}
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

export default PrivacyPolicyContent;
