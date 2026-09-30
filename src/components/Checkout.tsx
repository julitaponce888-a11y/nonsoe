import { useState } from 'react';
import { Check, ShoppingBag, Store, Truck, MapPin, Clock, CreditCard } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useReveal } from '@/hooks/useReveal';
import { pickupPoints } from '@/data/content';
import { pricingModel, formatARS } from '@/data/catalog';

type DeliveryMethod = 'pickup' | 'home';
type PaymentMethod = 'debito' | 'credito';

interface BuyerInfo {
  name: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

interface PaymentInfo {
  method: PaymentMethod;
  cardNumber: string;
  cvv: string;
  expiry: string;
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { ref, visible } = useReveal<HTMLDivElement>();

  const [step, setStep] = useState<'form' | 'confirm'>('form');
  const [orderId, setOrderId] = useState('');
  const [delivery, setDelivery] = useState<DeliveryMethod>('pickup');
  const [pickupId, setPickupId] = useState(pickupPoints[0]?.id ?? '');
  const [buyer, setBuyer] = useState<BuyerInfo>({
    name: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  });
  const [payment, setPayment] = useState<PaymentInfo>({
    method: 'debito',
    cardNumber: '',
    cvv: '',
    expiry: '',
  });

  const shippingCost = delivery === 'pickup' ? 0 : pricingModel.shippingHome;
  const total = subtotal + shippingCost;

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) {
      return digits.slice(0, 2) + '/' + digits.slice(2);
    }
    return digits;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'MUNI-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    setOrderId(id);
    setStep('confirm');
    clearCart();
  };

  const selectedPoint = pickupPoints.find((p) => p.id === pickupId);

  if (step === 'confirm') {
    return (
      <section id="checkout" className="bg-gradient-to-b from-cream-100 to-sage-50 py-20 lg:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:px-8">
          <div className="animate-scale-in rounded-4xl bg-cream-50 p-8 text-center shadow-soft-lg lg:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sage-100">
              <Check className="h-10 w-10 text-sage-600" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-medium text-sage-600">
              ¡Pedido realizado!
            </h2>
            <p className="mt-2 text-sm text-sage-400">
              Número de pedido:{' '}
              <span className="font-serif text-lg font-semibold text-terracotta-400">
                {orderId}
              </span>
            </p>

            <div className="mt-8 rounded-2xl bg-sage-50 p-6 text-left">
              {delivery === 'pickup' ? (
                <div className="flex items-start gap-3">
                  <Store className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage-500" />
                  <div>
                    <p className="text-sm font-semibold text-sage-600">
                      Retiro en local
                    </p>
                    <p className="mt-1 text-sm text-sage-400">
                      Tu pedido será enviado al punto de retiro seleccionado.
                      Te avisaremos cuando esté listo.
                    </p>
                    {selectedPoint && (
                      <div className="mt-3 rounded-xl bg-cream-50 p-3">
                        <p className="text-xs font-semibold text-sage-500">
                          {selectedPoint.name}
                        </p>
                        <p className="mt-0.5 text-xs text-sage-400">
                          {selectedPoint.address}
                        </p>
                        <p className="text-xs text-sage-400">
                          {selectedPoint.hours}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage-500" />
                  <div>
                    <p className="text-sm font-semibold text-sage-600">
                      Envío a domicilio
                    </p>
                    <p className="mt-1 text-sm text-sage-400">
                      Tu pedido será preparado para envío. Te contactaremos para
                      coordinar la entrega.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-start gap-3 border-t border-sage-100 pt-4">
                <CreditCard className="mt-0.5 h-5 w-5 flex-shrink-0 text-sage-500" />
                <div>
                  <p className="text-sm font-semibold text-sage-600">
                    Pago con {payment.method === 'debito' ? 'débito' : 'crédito'}
                  </p>
                  <p className="mt-1 text-sm text-sage-400">
                    Tarjeta terminada en {payment.cardNumber.replace(/\s/g, '').slice(-4)}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setStep('form');
                setBuyer({ name: '', lastName: '', phone: '', email: '', address: '' });
                setPayment({ method: 'debito', cardNumber: '', cvv: '', expiry: '' });
              }}
              className="btn-secondary mt-8"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="checkout" className="bg-gradient-to-b from-cream-100 to-sage-50 py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className={`text-center ${visible ? 'is-visible' : ''} reveal`}>
          <span className="inline-flex rounded-full bg-terracotta-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta-500">
            Checkout
          </span>
          <h2 className="mt-6 font-serif text-3xl font-medium text-sage-600 sm:text-4xl">
            Completá tu pedido.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sage-500">
            Prototipo demostrativo. No se procesan pagos reales.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-cream-50 p-12 text-center shadow-soft">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-50">
              <ShoppingBag className="h-7 w-7 text-sage-300" />
            </div>
            <p className="text-sm font-medium text-sage-400">
              Tu carrito está vacío.
            </p>
            <button
              onClick={() =>
                document.querySelector('#catalogo')?.scrollIntoView({ behavior: 'smooth' })
              }
              className="btn-secondary"
            >
              Ver muñecos
            </button>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr]">
            {/* Left — form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 1. Products */}
              <div className="rounded-3xl bg-cream-50 p-6 shadow-soft">
                <h3 className="flex items-center gap-2 font-serif text-lg font-medium text-sage-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-500 text-xs font-bold text-cream-50">1</span>
                  Tus productos
                </h3>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 border-b border-sage-50 pb-3 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-lg bg-sage-50">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-sage-600">{item.name}</p>
                          <p className="text-xs text-sage-400">Cantidad: {item.quantity}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-sage-600">
                        {formatARS(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2. Buyer info */}
              <div className="rounded-3xl bg-cream-50 p-6 shadow-soft">
                <h3 className="flex items-center gap-2 font-serif text-lg font-medium text-sage-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-500 text-xs font-bold text-cream-50">2</span>
                  Datos del comprador
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    placeholder="Nombre"
                    value={buyer.name}
                    onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
                    className="rounded-xl border border-sage-200 bg-cream-100 px-4 py-2.5 text-sm text-sage-600 outline-none transition-colors placeholder:text-sage-300 focus:border-sage-400 focus:bg-cream-50"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Apellido"
                    value={buyer.lastName}
                    onChange={(e) => setBuyer({ ...buyer, lastName: e.target.value })}
                    className="rounded-xl border border-sage-200 bg-cream-100 px-4 py-2.5 text-sm text-sage-600 outline-none transition-colors placeholder:text-sage-300 focus:border-sage-400 focus:bg-cream-50"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Teléfono"
                    value={buyer.phone}
                    onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
                    className="rounded-xl border border-sage-200 bg-cream-100 px-4 py-2.5 text-sm text-sage-600 outline-none transition-colors placeholder:text-sage-300 focus:border-sage-400 focus:bg-cream-50"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={buyer.email}
                    onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
                    className="rounded-xl border border-sage-200 bg-cream-100 px-4 py-2.5 text-sm text-sage-600 outline-none transition-colors placeholder:text-sage-300 focus:border-sage-400 focus:bg-cream-50"
                  />
                </div>
              </div>

              {/* 3. Delivery */}
              <div className="rounded-3xl bg-cream-50 p-6 shadow-soft">
                <h3 className="flex items-center gap-2 font-serif text-lg font-medium text-sage-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-500 text-xs font-bold text-cream-50">3</span>
                  Método de entrega
                </h3>

                <div className="mt-4 space-y-3">
                  {/* Pickup */}
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                      delivery === 'pickup'
                        ? 'border-sage-400 bg-sage-50'
                        : 'border-sage-100 hover:border-sage-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === 'pickup'}
                      onChange={() => setDelivery('pickup')}
                      className="mt-1 accent-sage-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm font-semibold text-sage-600">
                          <Store className="h-4 w-4" />
                          Retiro en local
                        </span>
                        <span className="text-sm font-bold text-sage-600">GRATIS</span>
                      </div>
                      {delivery === 'pickup' && (
                        <div className="mt-3 space-y-2">
                          {pickupPoints.map((point) => (
                            <label
                              key={point.id}
                              className={`flex cursor-pointer items-start gap-2 rounded-xl border p-3 transition-colors ${
                                pickupId === point.id
                                  ? 'border-sage-300 bg-cream-50'
                                  : 'border-sage-50 bg-cream-100 hover:border-sage-100'
                              }`}
                            >
                              <input
                                type="radio"
                                name="pickupPoint"
                                checked={pickupId === point.id}
                                onChange={() => setPickupId(point.id)}
                                className="mt-0.5 accent-sage-500"
                              />
                              <div className="text-xs">
                                <p className="font-semibold text-sage-600">{point.name}</p>
                                <p className="mt-0.5 flex items-center gap-1 text-sage-400">
                                  <MapPin className="h-3 w-3" /> {point.address}
                                </p>
                                <p className="flex items-center gap-1 text-sage-400">
                                  <Clock className="h-3 w-3" /> {point.hours}
                                </p>
                              </div>
                            </label>
                          ))}
                          <p className="rounded-lg bg-bluegray-50 px-3 py-2 text-xs text-bluegray-400">
                            Te avisaremos cuando tu pedido esté listo para retirar.
                          </p>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Home delivery */}
                  <label
                    className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-all duration-200 ${
                      delivery === 'home'
                        ? 'border-sage-400 bg-sage-50'
                        : 'border-sage-100 hover:border-sage-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === 'home'}
                      onChange={() => setDelivery('home')}
                      className="mt-1 accent-sage-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-sm font-semibold text-sage-600">
                          <Truck className="h-4 w-4" />
                          Envío a domicilio
                        </span>
                        <span className="text-sm font-bold text-sage-600">
                          {formatARS(pricingModel.shippingHome)}
                        </span>
                      </div>
                      {delivery === 'home' && (
                        <input
                          type="text"
                          required
                          placeholder="Dirección de envío"
                          value={buyer.address}
                          onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
                          className="mt-3 w-full rounded-xl border border-sage-200 bg-cream-100 px-4 py-2.5 text-sm text-sage-600 outline-none transition-colors placeholder:text-sage-300 focus:border-sage-400 focus:bg-cream-50"
                        />
                      )}
                    </div>
                  </label>
                </div>
              </div>

              {/* 4. Payment */}
              <div className="rounded-3xl bg-cream-50 p-6 shadow-soft">
                <h3 className="flex items-center gap-2 font-serif text-lg font-medium text-sage-600">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sage-500 text-xs font-bold text-cream-50">4</span>
                  Método de pago
                </h3>

                {/* Debit / Credit toggle */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayment({ ...payment, method: 'debito' })}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all duration-200 ${
                      payment.method === 'debito'
                        ? 'border-sage-400 bg-sage-50 text-sage-600'
                        : 'border-sage-100 text-sage-400 hover:border-sage-200'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Débito
                  </button>
                  <button
                    type="button"
                    onClick={() => setPayment({ ...payment, method: 'credito' })}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-all duration-200 ${
                      payment.method === 'credito'
                        ? 'border-sage-400 bg-sage-50 text-sage-600'
                        : 'border-sage-100 text-sage-400 hover:border-sage-200'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Crédito
                  </button>
                </div>

                {/* Card details */}
                <div className="mt-4 space-y-3">
                  <div className="relative">
                    <CreditCard className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sage-300" />
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      placeholder="Número de tarjeta"
                      value={payment.cardNumber}
                      onChange={(e) =>
                        setPayment({ ...payment, cardNumber: formatCardNumber(e.target.value) })
                      }
                      pattern="[\d ]{19}"
                      maxLength={19}
                      className="w-full rounded-xl border border-sage-200 bg-cream-100 py-2.5 pl-11 pr-4 text-sm text-sage-600 outline-none transition-colors placeholder:text-sage-300 focus:border-sage-400 focus:bg-cream-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      placeholder="Vencimiento (MM/AA)"
                      value={payment.expiry}
                      onChange={(e) =>
                        setPayment({ ...payment, expiry: formatExpiry(e.target.value) })
                      }
                      maxLength={5}
                      className="rounded-xl border border-sage-200 bg-cream-100 px-4 py-2.5 text-sm text-sage-600 outline-none transition-colors placeholder:text-sage-300 focus:border-sage-400 focus:bg-cream-50"
                    />
                    <input
                      type="text"
                      required
                      inputMode="numeric"
                      placeholder="CVV"
                      value={payment.cvv}
                      onChange={(e) =>
                        setPayment({
                          ...payment,
                          cvv: e.target.value.replace(/\D/g, '').slice(0, 4),
                        })
                      }
                      maxLength={4}
                      className="rounded-xl border border-sage-200 bg-cream-100 px-4 py-2.5 text-sm text-sage-600 outline-none transition-colors placeholder:text-sage-300 focus:border-sage-400 focus:bg-cream-50"
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button type="submit" className="btn-primary w-full text-base">
                Confirmar pedido
              </button>
            </form>

            {/* Right — summary */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-3xl bg-sage-500 p-6 text-cream-50 shadow-soft-lg">
                <h3 className="font-serif text-xl font-medium">Resumen</h3>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between text-sage-200">
                    <span>Subtotal</span>
                    <span>{formatARS(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sage-200">
                    <span>Envío</span>
                    <span>{shippingCost === 0 ? 'Gratis' : formatARS(shippingCost)}</span>
                  </div>
                  <div className="my-3 border-t border-sage-400" />
                  <div className="flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-serif text-2xl font-medium">
                      {formatARS(total)}
                    </span>
                  </div>
                </div>

                <div className="mt-5 space-y-2 border-t border-sage-400 pt-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-2 text-xs text-sage-200">
                      <div className="h-8 w-8 overflow-hidden rounded bg-sage-400">
                        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                      </div>
                      <span className="flex-1">{item.name} x{item.quantity}</span>
                      <span>{formatARS(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 rounded-xl bg-sage-400/50 px-4 py-3 text-xs text-sage-100">
                  Prototipo demostrativo. No se procesan pagos reales ni se
                  almacenan datos.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
