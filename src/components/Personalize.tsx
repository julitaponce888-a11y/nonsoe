import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { configSteps, baseConfigPrice } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

export default function Personalize() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [selections, setSelections] = useState<Record<number, string>>({});

  const toggleOption = (step: number, optionId: string) => {
    setSelections((prev) => ({ ...prev, [step]: optionId }));
  };

  const allStepsCompleted = configSteps.every((s) => selections[s.step]);

  const getSelectedLabels = () => {
    return configSteps.map((s) => {
      const opt = s.options.find((o) => o.id === selections[s.step]);
      return opt?.label ?? '';
    });
  };

  return (
    <section id="crea-tu-muni" className="bg-gradient-to-b from-cream-100 to-lavender-50 py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className={`text-center ${visible ? 'is-visible' : ''} reveal`}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-lavender-500">
            <Sparkles className="h-3.5 w-3.5" />
            Personalizá
          </span>
          <h2 className="mt-6 font-serif text-3xl font-medium text-sage-600 sm:text-4xl lg:text-5xl">
            Creá un MUNI a tu manera.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-500">
            Cada persona explora y siente de una manera diferente. Elegí las
            características que más te gusten.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 space-y-6">
          {configSteps.map((step, idx) => (
            <div
              key={step.step}
              className={`rounded-3xl border border-lavender-100 bg-cream-50 p-6 ${
                visible ? 'is-visible' : ''
              } reveal`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lavender-200 text-sm font-bold text-lavender-500">
                  {step.step}
                </span>
                <h3 className="font-serif text-lg font-medium text-sage-600">
                  {step.title}
                </h3>
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5">
                {step.options.map((opt) => {
                  const selected = selections[step.step] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => toggleOption(step.step, opt.id)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                        selected
                          ? 'bg-sage-500 text-cream-50 shadow-soft'
                          : 'bg-cream-100 text-sage-500 border border-sage-100 hover:border-sage-200'
                      }`}
                    >
                      {selected && <Check className="h-3.5 w-3.5" />}
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Preview card */}
        <div
          className={`mt-8 overflow-hidden rounded-4xl bg-gradient-to-br from-sage-500 to-sage-600 p-8 text-cream-50 shadow-soft-lg ${
            visible ? 'is-visible' : ''
          } reveal`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-sage-200">
                Tu selección
              </p>
              <h3 className="mt-2 font-serif text-3xl font-medium">TU MUNI</h3>
              <div className="mt-4 space-y-2">
                {configSteps.map((s, i) => (
                  <div key={s.step} className="flex items-center gap-2 text-sm">
                    <span className="text-sage-200">{s.title}:</span>
                    <span className="font-medium text-cream-50">
                      {getSelectedLabels()[i] || '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-3 rounded-3xl bg-sage-600/40 p-6">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-cream-50/10">
                <Sparkles className="h-10 w-10 text-cream-50/80" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-sage-200">
                Precio estimado
              </p>
              <p className="font-serif text-3xl font-medium">
                {baseConfigPrice > 0 ? `$${baseConfigPrice.toLocaleString('es-AR')}` : '$XX.XXX'}
              </p>
              <button
                onClick={() =>
                  document.querySelector('#precios')?.scrollIntoView({ behavior: 'smooth' })
                }
                disabled={!allStepsCompleted}
                className="btn-terracotta mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                QUIERO MI MUNI
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-sage-200">
            Prototipo demostrativo. La selección no genera un pedido real.
          </p>
        </div>
      </div>
    </section>
  );
}
