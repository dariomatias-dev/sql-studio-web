import { Minus, Plus } from "lucide-react";

import { faqs } from "@/constants/faqs";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

export const FaqSection = () => {
  return (
    <section id="faq" className="relative overflow-hidden bg-white px-4 py-24 md:py-32">
      <div className="pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50 opacity-60 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 -translate-x-1/4 translate-y-1/2 rounded-full bg-[#00BCD4]/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-16 text-center md:mb-20">
          <span className="mb-3 block text-xs font-bold tracking-wider text-[#00BCD4] uppercase">
            Common Questions
          </span>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
            We&apos;ve got answers.
          </h2>
          <p className="mx-auto max-w-xl text-lg font-light text-slate-500">
            Everything you need to know about the app. Didn&apos;t find the answer you were looking
            for? Contact our support team.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs.map((item, index) => (
            <AccordionItem
              key={`item-${index}`}
              value={`item-${index}`}
              className="border-b border-slate-100 py-2 last:border-0"
            >
              <AccordionTrigger className="group flex w-full items-center justify-between py-6 text-left hover:no-underline [&>svg]:hidden">
                <span className="pr-8 text-lg font-medium text-slate-700 transition-colors duration-300 group-hover:text-[#00BCD4] md:text-xl">
                  {item.question}
                </span>

                <div className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                  <Plus className="absolute h-5 w-5 text-slate-400 transition-all duration-300 group-hover:text-[#00BCD4] group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
                  <Minus className="absolute h-5 w-5 -rotate-90 text-[#00BCD4] opacity-0 transition-all duration-300 group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="animate-in slide-in-from-top-2 fade-in pr-12 pb-8 text-base leading-relaxed text-slate-500 duration-300">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
