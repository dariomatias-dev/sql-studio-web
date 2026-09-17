import Link from "next/link";

import { APP_REPOSITORY_URL } from "@/shared/lib/site";

import type { Faq } from "./faq.types";

export const faqs: Faq[] = [
  {
    question: "What databases does SQL Studio support?",
    answer: (
      <>
        Currently, SQL Studio provides full support for{" "}
        <strong className="font-semibold text-slate-900">SQLite</strong> databases. We are
        continuously evaluating support for other database systems based on user feedback and
        roadmap priorities.
      </>
    ),
  },
  {
    question: "What practice databases are included?",
    answer: (
      <>
        SQL Studio comes with a catalog of pre-built databases covering common domains — e-commerce,
        banking, logistics, and more — each with its own schema and seed data, ready to query
        immediately. You can reset any of them back to their original state at any time.
      </>
    ),
  },
  {
    question: "Does SQL Studio need an internet connection?",
    answer: (
      <>
        No. SQL Studio is offline-first: every database lives locally on your device, and the app
        doesn&apos;t need a network connection to work.
      </>
    ),
  },
  {
    question: "What languages does SQL Studio support?",
    answer: (
      <>
        The app&apos;s interface is fully available in English, Portuguese (Brazil), and Spanish.
        You can switch between them from Settings.
      </>
    ),
  },
  {
    question: "Is SQL Studio available for iOS?",
    answer: <>Not yet. SQL Studio is currently available for Android only.</>,
  },
  {
    question: "How do I get access to SQL Studio right now?",
    answer: (
      <>
        SQL Studio is currently in closed beta on Google Play. Request access on our{" "}
        <Link
          href="/download"
          className="hover:text-brand font-semibold text-slate-900 transition-colors duration-300"
        >
          download page
        </Link>
        , and you&apos;ll get an invitation email once your account is approved as a tester.
      </>
    ),
  },
  {
    question: "Is SQL Studio open source?",
    answer: (
      <>
        Yes. The app&apos;s source code is available on{" "}
        <a
          href={APP_REPOSITORY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand font-semibold text-slate-900 transition-colors duration-300"
        >
          GitHub
        </a>{" "}
        under the MIT license.
      </>
    ),
  },
  {
    question: "Is SQL Studio free?",
    answer: (
      <>
        SQL Studio is completely free and offers all essential features at no additional cost. We
        believe in accessible tools for developers everywhere.
      </>
    ),
  },
  {
    question: "How do I report a bug or request a feature?",
    answer: (
      <>
        You can open an issue on the app&apos;s{" "}
        <a
          href={`${APP_REPOSITORY_URL}/issues`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-brand font-semibold text-slate-900 transition-colors duration-300"
        >
          GitHub repository
        </a>
        , use the &quot;Contact&quot; item in the app&apos;s Settings, or reach us through our{" "}
        <Link
          href="/contact"
          className="hover:text-brand font-semibold text-slate-900 transition-colors duration-300"
        >
          contact page
        </Link>
        .
      </>
    ),
  },
];
