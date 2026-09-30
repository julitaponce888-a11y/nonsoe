import { useReveal } from '@/hooks/useReveal';

export default function FinalCTA() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="contacto"
      className="bg-gradient-to-b from-cream-100 to-sage-50 py-20 lg:py-32"
    >
      <div ref={ref} className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <div
          className={`overflow-hidden rounded-4xl bg-gradient-to-br from-sage-500 to-sage-600 p-12 text-center shadow-soft-xl lg:p-16 ${
            visible ? 'is-visible' : ''
          } reveal`}
        >
          <h2 className="font-serif text-5xl font-medium text-cream-50 sm:text-6xl">
            MUNI
          </h2>
          <p className="mt-3 font-serif text-xl italic text-sage-200 sm:text-2xl">
            Jugar. Explorar. Sentir.
          </p>
          <p className="mt-8 font-serif text-2xl font-medium text-cream-50 sm:text-3xl">
            ¿Cuál va a ser tu MUNI?
          </p>
          <button
            onClick={() => scrollTo('#crea-tu-muni')}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-cream-50 px-8 py-3.5 text-base font-semibold text-sage-600 transition-all duration-300 hover:bg-cream-100 hover:shadow-soft-lg active:scale-95"
          >
            CREÁ TU MUNI
          </button>
        </div>
      </div>
    </section>
  );
}
