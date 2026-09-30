import { Check, Sparkles } from 'lucide-react';
import { pricingCards, personalizacionPrenda } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function Pricing() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="precios" className="bg-cream-100 py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className={`text-center ${visible ? 'is-visible' : ''} reveal`}>
          <h2 className="font-serif text-3xl font-medium text-sage-600 sm:text-4xl lg:text-5xl">
            Encontrá tu MUNI.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sage-500">
            Tres opciones pensadas para diferentes necesidades. Los precios se
            definirán próximamente.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pricingCards.map((card, idx) => (
            <div
              key={card.id}
              className={`group flex flex-col rounded-4xl border p-8 transition-all duration-300 hover:-translate-y-1 ${
                card.highlighted
                  ? 'border-sage-400 bg-sage-500 text-cream-50 shadow-soft-lg'
                  : 'border-sage-100 bg-cream-50 hover:shadow-soft-lg'
              } ${visible ? 'is-visible' : ''} reveal`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <h3 className={`font-serif text-xl font-bold tracking-wide ${card.highlighted ? 'text-cream-50' : 'text-sage-600'}`}>
                {card.name}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${card.highlighted ? 'text-sage-200' : 'text-sage-400'}`}>
                {card.description}
              </p>
              <p className={`mt-6 font-serif text-4xl font-medium ${card.highlighted ? 'text-cream-50' : 'text-terracotta-400'}`}>
                {card.price}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {card.features.map((f) => (
                  <li key={f} className={`flex items-center gap-2 text-sm ${card.highlighted ? 'text-sage-200' : 'text-sage-400'}`}>
                    <Check className={`h-4 w-4 flex-shrink-0 ${card.highlighted ? 'text-sage-300' : 'text-sage-300'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => scrollTo('#crea-tu-muni')}
                className={`mt-6 w-full rounded-full py-3 text-sm font-semibold transition-all duration-300 active:scale-95 ${
                  card.highlighted
                    ? 'bg-cream-50 text-sage-600 hover:bg-cream-100'
                    : 'bg-sage-500 text-cream-50 hover:bg-sage-600'
                }`}
              >
                QUIERO MI MUNI
              </button>
            </div>
          ))}
        </div>

        {/* Personalización con tu prenda */}
        <div
          className={`mt-6 flex flex-col items-center justify-between gap-4 rounded-3xl border border-terracotta-100 bg-terracotta-50 p-6 text-center sm:flex-row sm:text-left ${
            visible ? 'is-visible' : ''
          } reveal`}
          style={{ transitionDelay: '350ms' }}
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-terracotta-100">
              <Sparkles className="h-6 w-6 text-terracotta-400" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold tracking-wide text-sage-600">
                {personalizacionPrenda.name}
              </h3>
              <p className="mt-1 text-sm text-sage-400">
                {personalizacionPrenda.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-serif text-2xl font-medium text-terracotta-400">
              {personalizacionPrenda.price}
            </span>
            <span className="text-xs text-sage-400">precio adicional</span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-sage-400">
          Precios calculados a partir del modelo de costos real del proyecto.
          Margen de ganancia aplicado: 65%. Envío a domicilio: $3.500.
        </p>
      </div>
    </section>
  );
}
