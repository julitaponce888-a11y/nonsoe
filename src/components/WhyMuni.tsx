import { Recycle, Palette, Heart } from 'lucide-react';
import { whyMuniCards } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

const iconMap: Record<string, typeof Recycle> = {
  Recycle,
  Palette,
  Heart,
};

export default function WhyMuni() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="por-que-muni" className="bg-sage-50 py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className={`text-center ${visible ? 'is-visible' : ''} reveal`}>
          <h2 className="font-serif text-3xl font-medium text-sage-600 sm:text-4xl lg:text-5xl">
            ¿Por qué MUNI?
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {whyMuniCards.map((card, idx) => {
            const Icon = iconMap[card.icon] ?? Heart;
            return (
              <div
                key={card.title}
                className={`group rounded-3xl border border-sage-100 bg-cream-50 p-8 text-center transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 ${
                  visible ? 'is-visible' : ''
                } reveal`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-100 transition-colors duration-300 group-hover:bg-sage-200">
                  <Icon className="h-6 w-6 text-sage-500" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold tracking-wide text-sage-600">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sage-400">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
