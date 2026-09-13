import type { Faq } from "@/@types/faq";

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
        We value your feedback! You can report bugs or request features directly through the{" "}
        <a
          href="/contact"
          className="font-semibold text-slate-900 transition-colors duration-300 hover:text-[#00BCD4]"
        >
          &quot;Contact&quot;
        </a>{" "}
        section in the app settings, or by visiting our dedicated support page.
      </>
    ),
  },
  {
    question: "Does SQL Studio provide practice databases?",
    answer: (
      <>
        Yes, SQL Studio comes pre-loaded with several example databases. These include ready-to-use
        tables and populated data, making it perfect for beginners to practice queries immediately.
      </>
    ),
  },
];
