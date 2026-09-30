import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatARS } from '@/data/catalog';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeFromCart, updateQuantity, clearCart, subtotal } =
    useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] bg-sage-600/30 backdrop-blur-sm animate-fade-in"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed right-0 top-0 z-[80] flex h-full w-full max-w-md flex-col bg-cream-50 shadow-soft-xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-sage-100 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-sage-500" />
            <h2 className="font-serif text-xl font-medium text-sage-600">
              Carrito
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="rounded-full p-2 text-sage-400 transition-colors hover:bg-sage-100"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-50">
                <ShoppingBag className="h-7 w-7 text-sage-300" />
              </div>
              <p className="text-sm font-medium text-sage-400">
                Tu carrito está vacío
              </p>
              <button
                onClick={closeCart}
                className="btn-secondary mt-2 text-xs"
              >
                Seguir explorando
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-4 rounded-2xl border border-sage-100 bg-cream-100 p-4"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-sage-50">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold text-sage-600">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-sage-300 transition-colors hover:text-terracotta-400"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-0.5 text-sm text-sage-400">
                      {formatARS(item.price)}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-1 rounded-full border border-sage-200 bg-cream-50">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="rounded-full p-1.5 text-sage-400 transition-colors hover:bg-sage-100"
                          aria-label="Restar"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold text-sage-600">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="rounded-full p-1.5 text-sage-400 transition-colors hover:bg-sage-100"
                          aria-label="Sumar"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-sage-600">
                        {formatARS(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-sage-100 px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-sage-400">Subtotal</span>
              <span className="font-serif text-2xl font-medium text-sage-600">
                {formatARS(subtotal)}
              </span>
            </div>
            <button
              onClick={() => {
                closeCart();
                document
                  .querySelector('#checkout')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary mt-4 w-full"
            >
              Finalizar compra
            </button>
            <button
              onClick={clearCart}
              className="mt-2 w-full text-center text-xs text-sage-400 transition-colors hover:text-terracotta-400"
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
