import { X, ShoppingBag, Check } from 'lucide-react';
import { categories, getFinalPrice, formatARS, type Doll } from '@/data/catalog';
import { useCart } from '@/context/CartContext';

interface ProductDetailProps {
  doll: Doll | null;
  onClose: () => void;
}

export default function ProductDetail({ doll, onClose }: ProductDetailProps) {
  const { addToCart } = useCart();

  if (!doll) return null;

  const cat = categories.find((c) => c.id === doll.categoryId);
  const price = getFinalPrice();

  const handleAddToCart = () => {
    addToCart({
      id: doll.id,
      name: doll.name,
      price: price,
      image: doll.image,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-sage-600/30 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="animate-scale-in max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-4xl bg-cream-50 shadow-soft-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden bg-gradient-to-br from-cream-200 to-beige-100">
            <img
              src={doll.image}
              alt={doll.imageAlt}
              className="h-full w-full object-cover"
            />
            {cat && (
              <span className="absolute left-4 top-4 rounded-full bg-cream-50/90 px-4 py-1.5 text-xs font-semibold text-sage-500 backdrop-blur-sm">
                {cat.emoji} {cat.label}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col p-6 lg:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-medium text-sage-600">
                  {doll.name}
                </h2>
                <p className="mt-1 text-sm font-medium italic text-sage-400">
                  “{doll.tagline}”
                </p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 text-sage-400 transition-colors hover:bg-sage-100"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-sage-500">
              {doll.description}
            </p>

            {/* Features */}
            <div className="mt-5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-sage-400">
                Características
              </h3>
              <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {doll.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-sm text-sage-500"
                  >
                    <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-sage-100">
                      <Check className="h-2.5 w-2.5 text-sage-500" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Elements */}
            <div className="mt-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-sage-400">
                Texturas y elementos
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {doll.elements.map((el) => (
                  <span
                    key={el}
                    className="rounded-full bg-sage-50 px-2.5 py-1 text-[11px] font-medium text-sage-500"
                  >
                    {el}
                  </span>
                ))}
              </div>
            </div>

            {/* Age + Price */}
            <div className="mt-5 flex items-center justify-between rounded-2xl bg-sage-50 px-5 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-sage-400">
                  Edad recomendada
                </p>
                <p className="text-sm font-semibold text-sage-600">
                  {doll.ageRange}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-medium uppercase tracking-wider text-sage-400">
                  Precio
                </p>
                <p className="font-serif text-2xl font-medium text-sage-600">
                  {formatARS(price)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-5 flex gap-3">
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1"
              >
                <ShoppingBag className="h-4 w-4" />
                Agregar al carrito
              </button>
            </div>

            <p className="mt-3 text-xs text-sage-400">
              Uso supervisado por un adulto. Este producto no reemplaza la
              evaluación ni el acompañamiento profesional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
