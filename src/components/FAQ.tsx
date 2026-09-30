import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { faqItems } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function FAQ() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-cream-100 py-20 lg:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-3xl px-6 lg:px-8 ${
          visible ? 'is-visible' : ''
        } reveal`}
      >
        <div className="text-center">
          <h2 className="font-serif text-3xl font-medium text-sage-600 sm:text-4xl">
            Preguntas frecuentes.
          </h2>
        </div>

        <div className="mt-12 space-y-3">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-2xl border border-sage-100 bg-cream-50 transition-shadow duration-300 hover:shadow-soft"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-sage-600 sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 flex-shrink-0 text-sage-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 text-sm leading-relaxed text-sage-400">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
