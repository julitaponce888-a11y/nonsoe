import { useReveal } from '@/hooks/useReveal';
import { dolls } from '@/data/catalog';

export default function Hero() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const numa = dolls.find((d) => d.id === 'numa') ?? dolls[0];

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-b from-cream-50 via-cream-100 to-cream-50 pt-32 pb-20 lg:pt-40 lg:pb-36"
    >
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-sage-100 opacity-30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-terracotta-100 opacity-20 blur-3xl" />

      <div
        ref={ref}
        className={`relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 ${
          visible ? 'animate-fade-up' : 'opacity-0'
        }`}
      >
        {/* Left */}
        <div className="flex flex-col gap-6">
          <h1 className="font-serif text-5xl font-medium leading-tight text-sage-600 sm:text-6xl lg:text-7xl">
            MUNI
          </h1>
          <p className="font-serif text-xl italic text-terracotta-400 sm:text-2xl">
            Jugar. Explorar. Sentir.
          </p>
          <p className="max-w-md text-lg leading-relaxed text-sage-500">
            Muñecos sensoriales creados a partir de textiles recuperados,
            pensados para explorar, manipular y sentir de una manera única.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => scrollTo('#que-muni')}
              className="btn-primary text-base"
            >
              CONOCÉ LOS MUNI
            </button>
            <button
              onClick={() => scrollTo('#crea-tu-muni')}
              className="btn-secondary text-base"
            >
              CREÁ TU MUNI
            </button>
          </div>

          {/* Small indicators */}
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              'Textiles recuperados',
              'Texturas y estímulos',
              'Hecho en Mendoza',
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-sage-100 bg-cream-50 px-4 py-2 text-xs font-semibold text-sage-500"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Right — image */}
        <div className="relative">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-4xl bg-gradient-to-br from-sage-50 to-cream-200 shadow-soft-xl">
            <img
              src={numa.image}
              alt={numa.imageAlt}
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-sage-600/10 to-transparent" />
          </div>

          {/* Floating badges */}
          <div className="absolute -left-4 top-1/4 hidden animate-float rounded-2xl bg-cream-50/95 px-4 py-3 shadow-soft-lg backdrop-blur-sm sm:block">
            <p className="text-xs font-medium text-sage-400">Hecho con</p>
            <p className="text-sm font-semibold text-sage-600">
              telas recuperadas
            </p>
          </div>
          <div className="absolute -right-2 bottom-8 hidden animate-float rounded-2xl bg-cream-50/95 px-4 py-3 shadow-soft-lg backdrop-blur-sm [animation-delay:1.5s] sm:block">
            <p className="text-xs font-medium text-sage-400">Cada MUNI</p>
 <p className="text-sm font-semibold text-sage-600">es único</p>
          </div>
        </div>
      </div>
    </section>
  );
}
