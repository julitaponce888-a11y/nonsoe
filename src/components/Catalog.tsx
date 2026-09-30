import { useState, useMemo } from 'react';
import { ShoppingBag, Eye, Check, Search, X } from 'lucide-react';
import { dolls, categories, getFinalPrice, formatARS, type Doll } from '@/data/catalog';
import { useCart } from '@/context/CartContext';
import { useReveal } from '@/hooks/useReveal';

interface CatalogProps {
  onSelectDoll: (doll: Doll) => void;
}

export default function Catalog({ onSelectDoll }: CatalogProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredDolls = useMemo(() => {
    let result = dolls;
    if (activeCategory !== 'todos') {
      result = result.filter((d) => d.categoryId === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.purpose.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.tagline.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (doll: Doll) => {
    addToCart({
      id: doll.id,
      name: doll.name,
      price: getFinalPrice(doll.id),
      image: doll.image,
    });
  };

  const getCatLabel = (categoryId: string) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? `${cat.emoji} ${cat.shortLabel}` : '';
  };

  return (
    <section id="catalogo" className="bg-cream-100 py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center ${visible ? 'is-visible' : ''} reveal`}>
          <span className="inline-flex rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sage-500">
            Nuestra colección
          </span>
          <h2 className="mt-6 font-serif text-3xl font-medium text-sage-600 sm:text-4xl lg:text-5xl">
            Elegí tu MUNI.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-500">
            Cada muñeco tiene su propio nombre, personalidad y función.
            Buscá por nombre o filtrá según lo que necesitás.
          </p>
        </div>

        {/* Search bar */}
        <div className="mx-auto mt-8 max-w-md">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sage-300" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar muñeco por nombre o función..."
              className="w-full rounded-full border border-sage-200 bg-cream-50 py-3 pl-11 pr-10 text-sm text-sage-600 outline-none transition-colors placeholder:text-sage-300 focus:border-sage-400 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-sage-300 transition-colors hover:bg-sage-100 hover:text-sage-500"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category filters */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => setActiveCategory('todos')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeCategory === 'todos'
                ? 'bg-sage-500 text-cream-50 shadow-soft'
                : 'bg-cream-50 text-sage-500 border border-sage-100 hover:border-sage-200'
            }`}
          >
            Todos
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-sage-500 text-cream-50 shadow-soft'
                  : 'bg-cream-50 text-sage-500 border border-sage-100 hover:border-sage-200'
              }`}
            >
              <span className="mr-1.5">{cat.emoji}</span>
              {cat.shortLabel}
            </button>
          ))}
        </div>

        {/* No results */}
        {filteredDolls.length === 0 && (
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-50">
              <Search className="h-7 w-7 text-sage-300" />
            </div>
            <p className="text-sm font-medium text-sage-400">
              No encontramos muñecos con esa búsqueda.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('todos');
              }}
              className="btn-secondary text-xs"
            >
              Ver todos
            </button>
          </div>
        )}

        {/* Product grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDolls.map((doll, idx) => {
            const cat = categories.find((c) => c.id === doll.categoryId);
            return (
              <div
                key={doll.id}
                className={`group flex flex-col overflow-hidden rounded-3xl border border-sage-100 bg-cream-50 transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 ${
                  visible ? 'is-visible' : ''
                } reveal`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {/* Image */}
                <div
                  className="relative aspect-[4/5] cursor-pointer overflow-hidden bg-gradient-to-br from-cream-200 to-beige-100"
                  onClick={() => onSelectDoll(doll)}
                >
                  <img
                    src={doll.image}
                    alt={doll.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sage-600/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {cat && (
                    <span className="absolute left-3 top-3 rounded-full bg-cream-50/90 px-3 py-1 text-xs font-semibold text-sage-500 backdrop-blur-sm">
                      {cat.emoji} {cat.shortLabel}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-serif text-2xl font-medium text-sage-600">
                      {doll.name}
                    </h3>
                    <span className="font-serif text-lg font-medium text-terracotta-400">
                      {formatARS(getFinalPrice(doll.id))}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-medium italic text-sage-400">
                    "{doll.tagline}"
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-sage-400">
                    {doll.purpose}
                  </p>

                  {/* Quick features */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {doll.features.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1 rounded-full bg-sage-50 px-2.5 py-1 text-[11px] font-medium text-sage-500"
                      >
                        <Check className="h-3 w-3" />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Age */}
                  <p className="mt-3 text-xs text-sage-400">
                    Edad recomendada: {doll.ageRange}
                  </p>

                  {/* Actions */}
                  <div className="mt-5 flex gap-2.5">
                    <button
                      onClick={() => handleAddToCart(doll)}
                      className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-sage-500 px-4 py-2.5 text-xs font-semibold text-cream-50 transition-all duration-300 hover:bg-sage-600 active:scale-95"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      Agregar
                    </button>
                    <button
                      onClick={() => onSelectDoll(doll)}
                      className="flex items-center justify-center gap-1.5 rounded-full border border-sage-200 px-4 py-2.5 text-xs font-semibold text-sage-500 transition-all duration-300 hover:bg-sage-50 active:scale-95"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Ver detalles
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer */}
        <p className="mx-auto mt-10 max-w-xl text-center text-xs text-sage-400">
          Los precios se calculan automáticamente a partir del modelo de costos real del proyecto.
          Margen de ganancia aplicado: 65%.
        </p>
      </div>
    </section>
  );
}
