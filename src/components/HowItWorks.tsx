import { MousePointerClick, Scissors, Store, Truck } from 'lucide-react';
import { receiveSteps } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';

const iconMap: Record<string, typeof Store> = {
  MousePointerClick,
  Scissors,
  Store,
  Truck,
};

export default function HowItWorks() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="como-lo-recibis" className="bg-cream-50 py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className={`text-center ${visible ? 'is-visible' : ''} reveal`}>
          <h2 className="font-serif text-3xl font-medium text-sage-600 sm:text-4xl lg:text-5xl">
            ¿Cómo lo recibís?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sage-500">
            Pensado para Mendoza, Argentina.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {receiveSteps.map((step, idx) => {
            const Icon = iconMap[step.icon] ?? Store;
            return (
              <div
                key={step.number}
                className={`group flex flex-col items-center rounded-3xl border border-sage-100 bg-cream-100 p-6 text-center transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 ${
                  visible ? 'is-visible' : ''
                } reveal`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sage-100 transition-colors duration-300 group-hover:bg-sage-200">
                  <Icon className="h-6 w-6 text-sage-500" />
                </div>
                <span className="mt-4 font-serif text-3xl font-light text-sage-200">
                  {step.number}
                </span>
                <h3 className="mt-2 font-serif text-base font-bold tracking-wide text-sage-600">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sage-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-sage-400">
          El retiro en punto de entrega es sin costo. El envío a domicilio tiene
          costo adicional y se coordina al momento del pedido.
        </p>
      </div>
    </section>
  );
}
