import { useState, type ComponentType } from 'react';
import {
  Moon, Compass, Hand, Heart, Feather, Square, Grid3x3, AlignJustify,
  Sparkles, Grip, Minus, Circle, Waves, Zap, CircleDot, Cloud, Volume2,
  Archive, Lasso, HelpCircle, Droplet, Utensils, DoorOpen, Armchair,
  Expand, Smile, Frown, Angry, Ghost, Gamepad2, MessageCircle, Check, X,
  Weight, Scale, Shirt, Recycle, ChevronLeft, ChevronRight, ArrowRight,
  ArrowLeft, CheckCircle2, Loader2, Image as ImageIcon, Sparkle,
} from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { supabase } from '@/lib/supabase';
import {
  configuratorSteps, stepLabels, communicationCardGroups,
  emptyConfig, type MuniConfig, type ConfigOptionCard,
} from '@/data/configurator';
import { TextureVisual, ReliefVisual } from './ConfiguratorVisuals';

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Moon, Compass, Hand, Heart, Feather, Square, Grid3x3, AlignJustify,
  Sparkles, Grip, Minus, Circle, Waves, Zap, CircleDot, Cloud, Volume2,
  Archive, Lasso, HelpCircle, Droplet, Utensils, DoorOpen, Armchair,
  Expand, Smile, Frown, Angry, Ghost, Gamepad2, MessageCircle, Check, X,
  Weight, Scale, Shirt, Recycle, ImageIcon,
  Spiral: Sparkle,
  Shoelace: Lasso,
};

function getIcon(name: string): ComponentType<{ className?: string }> {
  return iconMap[name] ?? Sparkles;
}

function OptionCard({
  option,
  selected,
  onClick,
  compact,
}: {
  option: ConfigOptionCard;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  const Icon = getIcon(option.icon);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all duration-200 ${
        selected
          ? 'border-sage-500 bg-sage-50 shadow-soft'
          : 'border-sage-100 bg-cream-50 hover:border-sage-300 hover:shadow-soft'
      } ${compact ? 'min-w-[110px] flex-1' : 'flex-1'}`}
    >
      {selected && (
        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sage-500 text-cream-50">
          <Check className="h-3 w-3" />
        </span>
      )}
      {option.visual === 'texture' && option.visualPattern && (
        <TextureVisual pattern={option.visualPattern} />
      )}
      {option.visual === 'relief' && option.visualPattern && (
        <ReliefVisual pattern={option.visualPattern} />
      )}
      {!option.visual && (
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${
            selected ? 'bg-sage-200 text-sage-600' : 'bg-sage-100 text-sage-400'
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
      )}
      <span className={`text-sm font-semibold ${selected ? 'text-sage-600' : 'text-sage-500'}`}>
        {option.label}
      </span>
      {option.description && (
        <span className="text-xs leading-relaxed text-sage-400">{option.description}</span>
      )}
      {option.warning && (
        <span className="mt-1 rounded-lg bg-terracotta-50 px-2 py-1.5 text-[11px] leading-tight text-terracotta-500">
          {option.warning}
        </span>
      )}
    </button>
  );
}

export default function Configurator() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<MuniConfig>(emptyConfig);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contact, setContact] = useState({ name: '', phone: '', email: '' });

  const totalSteps = configuratorSteps.length; // 8 config steps + 1 summary

  const toggleSingle = (key: keyof MuniConfig, value: string) => {
    setConfig((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const toggleMultiple = (key: keyof MuniConfig, value: string) => {
    setConfig((prev) => {
      const arr = prev[key] as string[];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: document.getElementById('configurador')?.offsetTop ?? 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: document.getElementById('configurador')?.offsetTop ?? 0, behavior: 'smooth' });
    }
  };

  const getLabel = (stepId: string, optionId: string): string => {
    const step = configuratorSteps.find((s) => s.id === stepId);
    if (!step) return optionId;
    const opt = step.options.find((o) => o.id === optionId);
    return opt?.label ?? optionId;
  };

  const getSummary = () => {
    const items: { label: string; value: string }[] = [];

    if (config.experience) {
      items.push({ label: 'Experiencia', value: getLabel('experiencia', config.experience) });
    }
    if (config.textures.length > 0) {
      items.push({ label: 'Texturas', value: config.textures.map((t) => getLabel('texturas', t)).join(' + ') });
    }
    if (config.reliefs.length > 0) {
      items.push({ label: 'Relieves', value: config.reliefs.map((r) => getLabel('relieves', r)).join(' + ') });
    }
    if (config.squeezeZone) {
      const sz = config.squeezeZone === 'ninguna' ? 'Sin zona para apretar' : getLabel('zona-apretar', config.squeezeZone);
      items.push({ label: 'Zona para apretar', value: sz });
    }
    if (config.motorSkills.length > 0) {
      items.push({ label: 'Motricidad', value: config.motorSkills.map((m) => getLabel('motricidad', m)).join(' + ') });
    }
    if (config.communicationCards.length > 0) {
      items.push({ label: 'Tarjetas', value: config.communicationCards.map((c) => getLabel('comunicacion', c)).join(' + ') });
    }
    if (config.weight) {
      const w = getLabel('peso', config.weight);
      const lvl = config.weightLevel ? ` (${getLabel('peso', config.weightLevel)})` : '';
      items.push({ label: 'Peso', value: w + lvl });
    }
    if (config.textileSource) {
      const ts = getLabel('materiales', config.textileSource);
      items.push({ label: 'Material', value: ts });
    }

    return items;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const { error: insertError } = await supabase.from('muni_configurations').insert({
        experience: config.experience,
        textures: config.textures.length > 0 ? config.textures : null,
        reliefs: config.reliefs.length > 0 ? config.reliefs : null,
        squeeze_zone: config.squeezeZone,
        motor_skills: config.motorSkills.length > 0 ? config.motorSkills : null,
        communication_cards: config.communicationCards.length > 0 ? config.communicationCards : null,
        weight: config.weight,
        weight_level: config.weightLevel,
        textile_source: config.textileSource,
        custom_garment_desc: config.customGarmentDesc || null,
        contact_name: contact.name || null,
        contact_phone: contact.phone || null,
        contact_email: contact.email || null,
      });

      if (insertError) throw insertError;
      setSubmitted(true);
    } catch {
      setError('No pudimos enviar tu solicitud. Probá de nuevo en unos minutos.');
    } finally {
      setSubmitting(false);
    }
  };

  const isLastConfigStep = currentStep === configuratorSteps.length - 1;
  const isSummary = currentStep === totalSteps;

  const renderStep = () => {
    if (isSummary) {
      return <SummaryStep config={config} getSummary={getSummary} />;
    }

    const step = configuratorSteps[currentStep];

    return (
      <div className="animate-fade-in">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-500 text-sm font-bold text-cream-50">
            {step.step}
          </span>
          <div>
            <h3 className="font-serif text-xl font-medium text-sage-600">{step.title}</h3>
            {step.subtitle && (
              <p className="text-sm text-sage-400">{step.subtitle}</p>
            )}
          </div>
        </div>

        {/* Communication cards — grouped */}
        {step.id === 'comunicacion' ? (
          <div className="space-y-6">
            {communicationCardGroups.map((group) => (
              <div key={group.title}>
                <p className="mb-3 text-sm font-bold uppercase tracking-wider text-sage-400">
                  {group.title}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {step.options
                    .filter((opt) => group.ids.includes(opt.id))
                    .map((opt) => {
                      const selected = config.communicationCards.includes(opt.id);
                      const Icon = getIcon(opt.icon);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleMultiple('communicationCards', opt.id)}
                          className={`flex items-center gap-2 rounded-xl border-2 px-3 py-3 text-sm font-medium transition-all duration-200 ${
                            selected
                              ? 'border-sage-500 bg-sage-50 text-sage-600'
                              : 'border-sage-100 bg-cream-50 text-sage-500 hover:border-sage-300'
                          }`}
                        >
                          {selected ? (
                            <Check className="h-4 w-4 shrink-0 text-sage-500" />
                          ) : (
                            <Icon className="h-4 w-4 shrink-0 text-sage-300" />
                          )}
                          {opt.label}
                        </button>
                      );
                    })}
                </div>
              </div>
            ))}
            <div className="rounded-xl bg-sage-50 px-4 py-3 text-center text-sm font-semibold text-sage-500">
              {config.communicationCards.length} tarjeta{config.communicationCards.length !== 1 ? 's' : ''} seleccionada{config.communicationCards.length !== 1 ? 's' : ''}
            </div>
          </div>
        ) : (
          /* Generic option grid */
          <div className={`grid gap-3 ${step.options.length > 4 ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-4'}`}>
            {step.options.map((opt) => {
              let selected = false;
              let onClick: () => void;

              if (step.selectionType === 'single') {
                const key = step.id === 'experiencia' ? 'experience'
                  : step.id === 'zona-apretar' ? 'squeezeZone'
                  : step.id === 'peso' ? 'weight'
                  : step.id === 'materiales' ? 'textileSource'
                  : 'experience';
                selected = (config[key] as string) === opt.id;
                onClick = () => toggleSingle(key, opt.id);
              } else {
                const key = step.id === 'texturas' ? 'textures'
                  : step.id === 'relieves' ? 'reliefs'
                  : step.id === 'motricidad' ? 'motorSkills'
                  : 'textures';
                selected = (config[key] as string[]).includes(opt.id);
                onClick = () => toggleMultiple(key, opt.id);
              }

              return (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  selected={selected}
                  onClick={onClick}
                />
              );
            })}

            {/* "None" option for single-select with allowNone */}
            {step.selectionType === 'single' && step.allowNone && (
              <OptionCard
                option={{
                  id: 'ninguna',
                  label: step.noneLabel ?? 'Ninguna',
                  icon: 'X',
                }}
                selected={config.squeezeZone === 'ninguna'}
                onClick={() => toggleSingle('squeezeZone', 'ninguna')}
              />
            )}
          </div>
        )}

        {/* Weight sub-options */}
        {step.id === 'peso' && config.weight === 'con-peso' && step.subOptions?.['con-peso'] && (
          <div className="mt-6 animate-fade-in">
            <p className="mb-3 text-sm font-semibold text-sage-500">
              Elegí el nivel de carga:
            </p>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {step.subOptions['con-peso'].map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  selected={config.weightLevel === opt.id}
                  onClick={() => setConfig((prev) => ({ ...prev, weightLevel: prev.weightLevel === opt.id ? null : opt.id }))}
                />
              ))}
            </div>
          </div>
        )}

        {/* Material — garment description + photo upload */}
        {step.id === 'materiales' && config.textileSource === 'propia' && (
          <div className="mt-6 animate-fade-in space-y-4">
            <div>
              <label htmlFor="garment-desc" className="block text-sm font-semibold text-sage-600 mb-2">
                ¿Qué prenda o tela querés reutilizar?
              </label>
              <input
                id="garment-desc"
                type="text"
                value={config.customGarmentDesc}
                onChange={(e) => setConfig((prev) => ({ ...prev, customGarmentDesc: e.target.value }))}
                placeholder="Ej: una camiseta de algodón azul..."
                className="w-full rounded-xl border border-sage-200 bg-cream-50 px-4 py-3 text-sm text-sage-600 placeholder:text-sage-300 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-sage-600 mb-2">
                Adjuntar foto
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-sage-200 bg-cream-50 px-4 py-4 text-sm text-sage-400 transition-colors hover:border-sage-300 hover:bg-sage-50">
                <ImageIcon className="h-5 w-5 text-sage-300" />
                <span>
                  {config.photoFileName ? config.photoFileName : 'Hacé clic para subir una foto...'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setConfig((prev) => ({ ...prev, photoFileName: file.name }));
                    }
                  }}
                />
              </label>
            </div>
            {step.photoNote && (
              <p className="rounded-xl bg-terracotta-50 px-4 py-3 text-xs leading-relaxed text-terracotta-500">
                {step.photoNote}
              </p>
            )}
          </div>
        )}

        {/* Warnings */}
        {step.warnings && step.warnings.length > 0 && (
          <div className="mt-6 space-y-2">
            {step.warnings.map((w, i) => (
              <p key={i} className="rounded-xl bg-terracotta-50 px-4 py-3 text-xs leading-relaxed text-terracotta-500">
                {w}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="configurador"
      className="bg-gradient-to-b from-lavender-50 to-cream-100 py-20 lg:py-32"
      style={{ scrollMarginTop: '80px' }}
    >
      <div ref={ref} className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center ${visible ? 'is-visible' : ''} reveal`}>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sage-500">
            <Sparkle className="h-3.5 w-3.5" />
            MUNI
          </span>
          <h2 className="mt-6 font-serif text-3xl font-medium text-sage-600 sm:text-4xl lg:text-5xl">
            Personalizá tu Muni
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-sage-500">
            Creá un Muni pensado para vos. Elegí las características, texturas y elementos que querés incorporar a tu muñeco.
          </p>
        </div>

        {/* Progress indicator */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium">
          {stepLabels.map((label, idx) => {
            const stepIdx = idx;
            const isActive = stepIdx === currentStep;
            const isDone = stepIdx < currentStep;
            return (
              <div key={label} className="flex items-center gap-1.5">
                {idx > 0 && <span className="text-sage-200">→</span>}
                <span
                  className={`rounded-full px-3 py-1.5 transition-all duration-200 ${
                    isActive
                      ? 'bg-sage-500 text-cream-50 shadow-soft'
                      : isDone
                      ? 'bg-sage-200 text-sage-600'
                      : 'bg-sage-50 text-sage-400'
                  }`}
                >
                  {idx + 1}. {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Main card */}
        <div className="mt-8 overflow-hidden rounded-4xl border border-sage-100 bg-cream-50 shadow-soft-lg">
          {submitted ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center lg:py-24">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sage-100">
                <CheckCircle2 className="h-10 w-10 text-sage-500" />
              </div>
              <h3 className="mt-6 font-serif text-2xl font-medium text-sage-600">
                ¡Recibimos tu solicitud!
              </h3>
              <p className="mt-3 max-w-md text-base text-sage-500">
                Gracias por diseñar tu Muni. Nos pondremos en contacto con vos para coordinar los detalles.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setConfig(emptyConfig);
                  setContact({ name: '', phone: '', email: '' });
                  setShowContactForm(false);
                  setCurrentStep(0);
                }}
                className="btn-secondary mt-8 text-sm"
              >
                DISEÑAR OTRO MUNI
              </button>
            </div>
          ) : (
            <>
              <div className="p-6 sm:p-8 lg:p-10">
                {renderStep()}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between border-t border-sage-100 px-6 py-5 sm:px-8 lg:px-10">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-sage-500 transition-colors hover:bg-sage-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Atrás
                </button>

                {isSummary ? (
                  !showContactForm ? (
                    <button
                      onClick={() => setShowContactForm(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-sage-500 px-6 py-3 text-sm font-semibold text-cream-50 transition-all duration-300 hover:bg-sage-600 hover:shadow-soft-lg active:scale-95"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      Ver mi Muni
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="inline-flex items-center gap-2 rounded-full bg-terracotta-400 px-6 py-3 text-sm font-semibold text-cream-50 transition-all duration-300 hover:bg-terracotta-500 hover:shadow-soft-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          ENVIANDO...
                        </>
                      ) : (
                        <>
                          <Heart className="h-4 w-4" />
                          Solicitar mi Muni personalizado
                        </>
                      )}
                    </button>
                  )
                ) : (
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 rounded-full bg-sage-500 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-all duration-300 hover:bg-sage-600 hover:shadow-soft active:scale-95"
                  >
                    Continuar
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Contact form — appears on summary after "Ver mi Muni" */}
              {isSummary && showContactForm && !submitted && (
                <div className="border-t border-sage-100 px-6 py-6 sm:px-8 lg:px-10">
                  <h4 className="mb-4 font-serif text-lg font-medium text-sage-600">
                    Dejanos tus datos para contactarte
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="cfg-name" className="block text-sm font-semibold text-sage-600 mb-1.5">
                        Nombre y apellido
                      </label>
                      <input
                        id="cfg-name"
                        type="text"
                        value={contact.name}
                        onChange={(e) => setContact((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Tu nombre"
                        className="w-full rounded-xl border border-sage-200 bg-cream-50 px-4 py-3 text-sm text-sage-600 placeholder:text-sage-300 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="cfg-phone" className="block text-sm font-semibold text-sage-600 mb-1.5">
                        Teléfono o WhatsApp
                      </label>
                      <input
                        id="cfg-phone"
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => setContact((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Ej: 261 123 4567"
                        className="w-full rounded-xl border border-sage-200 bg-cream-50 px-4 py-3 text-sm text-sage-600 placeholder:text-sage-300 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="cfg-email" className="block text-sm font-semibold text-sage-600 mb-1.5">
                        Email <span className="font-normal text-sage-300">(opcional)</span>
                      </label>
                      <input
                        id="cfg-email"
                        type="email"
                        value={contact.email}
                        onChange={(e) => setContact((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="tu@email.com"
                        className="w-full rounded-xl border border-sage-200 bg-cream-50 px-4 py-3 text-sm text-sage-600 placeholder:text-sage-300 focus:border-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-200"
                      />
                    </div>
                  </div>
                  {error && (
                    <p className="mt-4 rounded-xl bg-terracotta-50 px-4 py-3 text-sm text-terracotta-500">
                      {error}
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================
//  Summary step — shows a visual representation + all selections
// ============================================================
function SummaryStep({ config, getSummary }: { config: MuniConfig; getSummary: () => { label: string; value: string }[] }) {
  const items = getSummary();

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sage-500 text-sm font-bold text-cream-50">
          <Check className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-serif text-2xl font-medium text-sage-600">Así será tu Muni</h3>
          <p className="text-sm text-sage-400">Revisá todas las opciones que elegiste</p>
        </div>
      </div>

      {/* Visual representation */}
      <div className="mb-8 flex flex-col items-center rounded-3xl bg-gradient-to-br from-sage-50 to-lavender-50 p-8">
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-cream-50 shadow-soft-lg">
          <Sparkles className="h-12 w-12 text-sage-400" />
          {/* Selected texture badges around the circle */}
          {config.textures.slice(0, 4).map((_, i) => {
            const angle = (i / 4) * 2 * Math.PI;
            const x = Math.cos(angle) * 60;
            const y = Math.sin(angle) * 60;
            return (
              <div
                key={i}
                className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-sage-200 text-sage-600 shadow-soft"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <Check className="h-4 w-4" />
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-sm font-semibold text-sage-500">Tu Muni personalizado</p>
      </div>

      {/* Selections list */}
      {items.length === 0 ? (
        <p className="rounded-xl bg-sage-50 px-4 py-6 text-center text-sm text-sage-400">
          Todavía no elegiste ninguna característica. Volvé atrás para personalizar tu Muni.
        </p>
      ) : (
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border border-sage-100 bg-cream-50 px-4 py-3"
            >
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-sage-400">{item.label}:</span>
                <span className="text-sm font-medium text-sage-600">{item.value}</span>
              </div>
              <Check className="h-4 w-4 text-sage-500" />
            </div>
          ))}
        </div>
      )}

      {config.customGarmentDesc && (
        <div className="mt-4 rounded-xl bg-terracotta-50 px-4 py-3 text-sm text-terracotta-500">
          <span className="font-semibold">Prenda a reutilizar:</span> {config.customGarmentDesc}
        </div>
      )}
    </div>
  );
}
