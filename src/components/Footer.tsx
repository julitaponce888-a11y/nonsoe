import { useReveal } from '@/hooks/useReveal';

const footerLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'MUNI', href: '#que-muni' },
  { label: 'Personalizá', href: '#crea-tu-muni' },
  { label: 'Sustentabilidad', href: '#otra-historia' },
  { label: 'Preguntas frecuentes', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Footer() {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={ref} className="bg-sage-600 py-16">
      <div
        className={`mx-auto max-w-7xl px-6 lg:px-8 ${
          visible ? 'is-visible' : ''
        } reveal`}
      >
        <div className="flex flex-col items-center gap-8 text-center">
          {/* Brand */}
          <div>
            <p className="font-serif text-3xl font-medium tracking-tight text-cream-50">
              MUNI
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-sage-200">
              Jugar · Explorar · Sentir
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-sage-200 transition-colors hover:text-cream-50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="h-px w-full max-w-md bg-sage-400/40" />

          {/* Made in Mendoza */}
          <p className="text-sm text-sage-200">
            Hecho en Mendoza, Argentina.
          </p>
        </div>
      </div>
    </footer>
  );
}
