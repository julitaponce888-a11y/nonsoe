import { Heart, Users, Palette, Scissors, Sparkles } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';

const creators = [
  {
    name: 'Julieta Ponce',
    role: 'Diseño y concepto',
    icon: Sparkles,
  },
  {
    name: 'Uma Siklosi',
    role: 'Producción y confección',
    icon: Scissors,
  },
  {
    name: 'Guillermina Torrico',
    role: 'Desarrollo de producto',
    icon: Palette,
  },
  {
    name: 'Giuliana Guerrero',
    role: 'Investigación y contenido',
    icon: Heart,
  },
  {
    name: 'Álvaro Gómez',
    role: 'Modelo de negocio',
    icon: Users,
  },
];

export default function Creators() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section id="creadores" className="bg-cream-50 py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className={`text-center ${visible ? 'is-visible' : ''} reveal`}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-lavender-500">
            <Users className="h-3.5 w-3.5" />
            Quiénes somos
          </span>
          <h2 className="mt-6 font-serif text-3xl font-medium text-sage-600 sm:text-4xl lg:text-5xl">
            Los creadores de MUNI.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-500">
            Un equipo que combina diseño, educación, producción y propósito para
            dar vida a cada muñeco.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {creators.map((creator, idx) => {
            const Icon = creator.icon;
            return (
              <div
                key={creator.name}
                className={`group flex flex-col items-center rounded-3xl border border-sage-100 bg-cream-100 p-8 text-center transition-all duration-300 hover:border-lavender-200 hover:shadow-soft-lg hover:-translate-y-1 ${
                  visible ? 'is-visible' : ''
                } reveal`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-lavender-50 transition-colors duration-300 group-hover:bg-lavender-100">
                  <Icon className="h-7 w-7 text-lavender-400" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-medium text-sage-600">
                  {creator.name}
                </h3>
                <p className="mt-1 text-sm text-sage-400">{creator.role}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
