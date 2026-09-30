import { Moon, Compass, Hand, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { muniCategories, type MuniCategory } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

const iconMap: Record<string, typeof Moon> = {
  Moon,
  Compass,
  Hand,
  Heart,
  Sparkles,
};

const accentClasses: Record<MuniCategory['accent'], { bg: string; text: string; border: string }> = {
  sage: { bg: 'bg-sage-50', text: 'text-sage-500', border: 'hover:border-sage-200' },
  terracotta: { bg: 'bg-terracotta-50', text: 'text-terracotta-500', border: 'hover:border-terracotta-200' },
  lavender: { bg: 'bg-lavender-50', text: 'text-lavender-500', border: 'hover:border-lavender-200' },
  bluegray: { bg: 'bg-bluegray-50', text: 'text-bluegray-400', border: 'hover:border-bluegray-200' },
};

export default function WhatMuni() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="que-muni" className="bg-cream-50 py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className={`text-center ${visible ? 'is-visible' : ''} reveal`}>
          <h2 className="font-serif text-3xl font-medium text-sage-600 sm:text-4xl lg:text-5xl">
            ¿Qué MUNI elegís?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-500">
            Cada MUNI ofrece una experiencia diferente. No hay uno mejor que
            otro: hay uno que se adapta a lo que buscás.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {muniCategories.map((cat, idx) => {
            const Icon = iconMap[cat.icon] ?? Sparkles;
            const accent = accentClasses[cat.accent];
            return (
              <div
                key={cat.id}
                className={`group flex flex-col overflow-hidden rounded-3xl border border-sage-100 bg-cream-100 transition-all duration-300 ${accent.border} hover:shadow-soft-lg hover:-translate-y-1 ${
                  visible ? 'is-visible' : ''
                } reveal`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-cream-200 to-beige-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cream-100/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent.bg}`}>
                    <Icon className={`h-5 w-5 ${accent.text}`} />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-medium text-sage-600">
                    {cat.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-sage-400">
                    {cat.description}
                  </p>
                  <button
                    onClick={() => scrollTo('#crea-tu-muni')}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-500 transition-colors hover:text-terracotta-400"
                  >
                    CONOCER
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
