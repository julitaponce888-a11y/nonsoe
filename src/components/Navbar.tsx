import { useEffect, useState } from 'react';
import { Menu, X, ShoppingBag, Recycle } from 'lucide-react';
import { navLinks } from '@/data/content';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream-50/90 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('#inicio');
          }}
          className="flex items-center gap-3 leading-none"
        >
          <img
            src="/images/logo.jpg"
            alt="Logo MUNI"
            className="h-11 w-11 rounded-full object-cover ring-2 ring-sage-200"
          />
          <span className="flex flex-col">
            <span className="font-serif text-2xl font-medium tracking-tight text-sage-600">
              MUNI
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sage-400">
              Jugar · Explorar · Sentir
            </span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-sm font-medium text-sage-500 transition-colors hover:text-terracotta-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            className="relative rounded-full p-2 text-sage-500 transition-colors hover:bg-sage-100 hover:text-sage-600"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta-400 text-[11px] font-bold text-cream-50">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('#otra-historia')}
            className="hidden items-center gap-1.5 rounded-full border border-sage-200 bg-cream-50 px-4 py-2.5 text-sm font-semibold text-sage-600 transition-all duration-300 hover:bg-sage-50 hover:shadow-soft active:scale-95 sm:inline-flex"
          >
            <Recycle className="h-4 w-4" />
            Donar ropa
          </button>

          <button
            onClick={() => handleNavClick('#precios')}
            className="hidden rounded-full bg-terracotta-400 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-all duration-300 hover:bg-terracotta-500 hover:shadow-soft-lg active:scale-95 sm:inline-flex"
          >
            Comprar
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full p-2 text-sage-500 transition-colors hover:bg-sage-100 lg:hidden"
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="animate-fade-in border-t border-sage-100 bg-cream-50 lg:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-sage-500 transition-colors hover:bg-sage-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex gap-2">
              <button
                onClick={() => handleNavClick('#otra-historia')}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-sage-200 bg-cream-50 px-4 py-3 text-sm font-semibold text-sage-600"
              >
                <Recycle className="h-4 w-4" />
                Donar ropa
              </button>
              <button
                onClick={() => handleNavClick('#precios')}
                className="flex-1 rounded-full bg-terracotta-400 px-5 py-3 text-sm font-semibold text-cream-50"
              >
                Comprar
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
