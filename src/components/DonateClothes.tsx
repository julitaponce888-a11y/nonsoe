import { useState, type FormEvent } from 'react';
import { Shirt, Scissors, Sparkles, Recycle, Heart, CheckCircle2, Loader2 } from 'lucide-react';
import { recycleSteps } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';

const iconMap: Record<string, typeof Shirt> = {
  Shirt,
  Scissors,
  Sparkles,
  Recycle,
};

const clothingTypes = ['Remeras', 'Pantalones', 'Buzos', 'Camperas', 'Vestidos', 'Remeritas/tops', 'Ropa de bebé', 'Otros textiles'];
const conditionOptions = ['Muy buen estado', 'Buen estado', 'Con pequeños detalles'];
const deliveryOptions = ['Llevarla a un punto de entrega', 'Coordinar retiro a domicilio'];

export default function DonateClothes() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name: '',
    phone: '',
    email: '',
    clothing_type: '',
    quantity: '',
    condition: '',
    delivery_method: '',
    location: '',
    notes: '',
  });

  const updateField = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase
        .from('donations')
        .insert({
          full_name: form.full_name,
          phone: form.phone,
          email: form.email || null,
          clothing_type: form.clothing_type,
          quantity: form.quantity,
          condition: form.condition,
          delivery_method: form.delivery_method,
          location: form.location,
          notes: form.notes || null,
        });

      if (insertError) throw insertError;
      setSubmitted(true);
    } catch {
      setError('No pudimos enviar tu donación. Probá de nuevo en unos minutos.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setForm({
      full_name: '', phone: '', email: '', clothing_type: '',
      quantity: '', condition: '', delivery_method: '', location: '', notes: '',
    });
  };

  const inputClass =
    'w-full rounded-xl border border-sage-200 bg-cream-50 px-4 py-3 text-sm text-sage-600 placeholder:text-sage-300 transition-colors focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200';
  const labelClass = 'block text-sm font-semibold text-sage-600 mb-1.5';
  const chipClass = (selected: boolean) =>
    `cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
      selected
        ? 'bg-terracotta-400 text-cream-50 shadow-soft'
        : 'bg-cream-50 text-sage-500 border border-sage-200 hover:border-terracotta-200'
    }`;

  return (
    <section id="otra-historia" className="bg-gradient-to-b from-terracotta-50 to-cream-100 py-20 lg:py-32">
      <div ref={ref} className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center ${visible ? 'is-visible' : ''} reveal`}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-terracotta-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terracotta-500">
            <Recycle className="h-3.5 w-3.5" />
            Sustentabilidad
          </span>
          <h2 className="mt-6 font-serif text-3xl font-medium text-sage-600 sm:text-4xl lg:text-5xl">
            Tu ropa puede tener otra historia.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-sage-500">
            Una prenda que ya no usás puede convertirse en algo nuevo. En MUNI
            buscamos recuperar textiles y transformarlos en muñecos únicos.
          </p>
        </div>

        {/* 4-step process */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {recycleSteps.map((step, idx) => {
            const Icon = iconMap[step.icon] ?? Shirt;
            return (
              <div
                key={step.number}
                className={`group relative flex flex-col items-center rounded-3xl border border-sage-100 bg-cream-50 p-6 text-center transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 ${
                  visible ? 'is-visible' : ''
                } reveal`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {idx < recycleSteps.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden h-px w-6 translate-x-full bg-sage-200 lg:block" />
                )}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-terracotta-50 transition-colors duration-300 group-hover:bg-terracotta-100">
                  <Icon className="h-6 w-6 text-terracotta-400" />
                </div>
                <span className="mt-4 font-serif text-3xl font-light text-sage-200">{step.number}</span>
                <h3 className="mt-2 font-serif text-base font-bold tracking-wide text-sage-600">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-sage-400">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Donation form */}
        <div className="mt-14 overflow-hidden rounded-4xl border border-sage-100 bg-cream-50 shadow-soft-lg" style={{ scrollMarginTop: '100px' }}>
          {submitted ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center lg:py-24">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-100">
                <CheckCircle2 className="h-10 w-10 text-sage-500" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-medium text-sage-600 sm:text-3xl">
                ¡Gracias por ayudar a crear un MUNI!
              </h3>
              <p className="mt-3 max-w-md text-base text-sage-500">
                Recibimos tu donación y nos pondremos en contacto con vos.
              </p>
              <button onClick={resetForm} className="btn-secondary mt-8 text-sm">
                CERRAR
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta-100">
                  <Heart className="h-5 w-5 text-terracotta-400" />
                </div>
                <h3 className="font-serif text-xl font-medium text-sage-600 sm:text-2xl">
                  Quiero donar mi ropa
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Nombre */}
                <div>
                  <label htmlFor="full_name" className={labelClass}>
                    Nombre y apellido *
                  </label>
                  <input
                    id="full_name"
                    type="text"
                    required
                    value={form.full_name}
                    onChange={(e) => updateField('full_name', e.target.value)}
                    placeholder="Tu nombre completo"
                    className={inputClass}
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Teléfono o WhatsApp *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="Ej: 261 123 4567"
                    className={inputClass}
                  />
                </div>

                {/* Email (opcional) */}
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="font-normal text-sage-300">(opcional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="tu@email.com"
                    className={inputClass}
                  />
                </div>

                {/* Cantidad */}
                <div>
                  <label htmlFor="quantity" className={labelClass}>
                    Cantidad aproximada de prendas *
                  </label>
                  <input
                    id="quantity"
                    type="text"
                    required
                    value={form.quantity}
                    onChange={(e) => updateField('quantity', e.target.value)}
                    placeholder="Ej: 5 a 10 prendas"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Tipo de ropa */}
              <div className="mt-5">
                <label className={labelClass}>¿Qué tipo de ropa querés donar? *</label>
                <div className="flex flex-wrap gap-2.5">
                  {clothingTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateField('clothing_type', type)}
                      className={chipClass(form.clothing_type === type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estado de la ropa */}
              <div className="mt-5">
                <label className={labelClass}>Estado de la ropa *</label>
                <div className="flex flex-wrap gap-2.5">
                  {conditionOptions.map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => updateField('condition', cond)}
                      className={chipClass(form.condition === cond)}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              {/* Método de entrega */}
              <div className="mt-5">
                <label className={labelClass}>¿Cómo preferís entregar la ropa? *</label>
                <div className="flex flex-wrap gap-2.5">
                  {deliveryOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => updateField('delivery_method', opt)}
                      className={chipClass(form.delivery_method === opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Localidad */}
                <div>
                  <label htmlFor="location" className={labelClass}>
                    Localidad o zona *
                  </label>
                  <input
                    id="location"
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => updateField('location', e.target.value)}
                    placeholder="Ej: Godoy Cruz, Mendoza"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Observaciones */}
              <div className="mt-5">
                <label htmlFor="notes" className={labelClass}>
                  Observaciones <span className="font-normal text-sage-300">(opcional)</span>
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  placeholder="Contanos algo más que quieras agregar sobre tu donación..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Error */}
              {error && (
                <p className="mt-4 rounded-xl bg-terracotta-50 px-4 py-3 text-sm text-terracotta-500">
                  {error}
                </p>
              )}

              {/* Submit */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-terracotta-400 px-6 py-4 text-base font-semibold text-cream-50 transition-all duration-300 hover:bg-terracotta-500 hover:shadow-soft-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      ENVIANDO...
                    </>
                  ) : (
                    <>
                      <Heart className="h-5 w-5" />
                      QUIERO DONAR
                    </>
                  )}
                </button>
              </div>

              <p className="mt-4 text-xs text-sage-400">
                Los textiles pasan por selección y acondicionamiento. Para componentes
                que requieren características específicas de seguridad, se utilizan
                materiales nuevos y certificados.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
