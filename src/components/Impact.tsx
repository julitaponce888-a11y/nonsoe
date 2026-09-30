import { Recycle, Shirt, Sparkles, MapPin } from 'lucide-react';
import { impactMetrics } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

const icons = [Recycle, Shirt, Sparkles, MapPin];

export default function Impact() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="impacto" className="bg-gradient-to-b from-sage-50 to-cream-100 py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className={`text-center ${visible ? 'is-visible' : ''} reveal`}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sage-500">
            <Recycle className="h-3.5 w-3.5" />
            Impacto
          </span>
          <h2 className="mt-6 font-serif text-3xl font-medium text-sage-600 sm:text-4xl lg:text-5xl">
            Cada MUNI cuenta.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {impactMetrics.map((metric, idx) => {
            const Icon = icons[idx] ?? Recycle;
            return (
              <div
                key={metric.label}
                className={`group flex flex-col items-center rounded-3xl border border-sage-100 bg-cream-50 p-8 text-center transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 ${
                  visible ? 'is-visible' : ''
                } reveal`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 transition-colors duration-300 group-hover:bg-terracotta-100">
                  <Icon className="h-6 w-6 text-sage-500 transition-colors group-hover:text-terracotta-400" />
                </div>
                <p className="mt-4 font-serif text-4xl font-light text-sage-500 transition-colors group-hover:text-terracotta-400">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-sage-400">
                  {metric.label}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-sage-400">
          Los indicadores se completarán con datos reales a medida que el
          proyecto crezca. Por ahora son placeholders.
        </p>
      </div>
    </section>
  );
}
