// ============================================================
//  MUNI — Catálogo de muñecos, categorías y modelo de costos
//
//  EDITAR AQUÍ:
//  - Precios y costos: editá los valores numéricos (en ARS)
//  - Imágenes: cambiá las URLs de "image" por fotos reales
//  - Textos: editá name, tagline, description, etc.
//  - Edades: editá ageRange en cada muñeco
// ============================================================

export interface Category {
  id: string;
  emoji: string;
  label: string;
  shortLabel: string;
  description: string;
}

export const categories: Category[] = [
  {
    id: 'sensoriales',
    emoji: '🧸',
    label: 'Sensoriales',
    shortLabel: 'Sensoriales',
    description: 'Exploración táctil y diferentes texturas.',
  },
  {
    id: 'aprendizaje',
    emoji: '🧠',
    label: 'Aprendizaje',
    shortLabel: 'Aprendizaje',
    description: 'Colores, números, formas y conceptos.',
  },
  {
    id: 'relajacion',
    emoji: '🌙',
    label: 'Relajación y descanso',
    shortLabel: 'Relajación',
    description: 'Pensado para acompañar rutinas de relajación.',
  },
  {
    id: 'atencion',
    emoji: '🎯',
    label: 'Atención y organización',
    shortLabel: 'Atención',
    description: 'Actividades para acompañar concentración y organización.',
  },
  {
    id: 'lectoescritura',
    emoji: '📖',
    label: 'Lectoescritura',
    shortLabel: 'Lectoescritura',
    description: 'Juegos y actividades con letras, sonidos y palabras.',
  },
  {
    id: 'accesibilidad',
    emoji: '👁️',
    label: 'Accesibilidad',
    shortLabel: 'Accesibilidad',
    description: 'Productos diseñados para explorarse mediante diferentes sentidos.',
  },
];

export interface Doll {
  id: string;
  name: string;
  categoryId: string;
  tagline: string;
  purpose: string;
  description: string;
  features: string[];
  elements: string[];
  ageRange: string; // EDITABLE
  image: string;
  imageAlt: string;
  accentColor: string; // tailwind color base name for theming the card
}

export const dolls: Doll[] = [
  {
    id: 'abeja',
    name: 'Abeja',
    categoryId: 'sensoriales',
    tagline: 'Un pequeño compañero para grandes momentos.',
    purpose:
      'Un pequeño compañero sensorial para explorar texturas, movimientos y actividades a través del juego.',
    description:
      'La Abeja MUNI acompaña momentos cotidianos con actividades integradas, texturas variadas y detalles pensados para estimular la motricidad fina.',
    features: [
      '6 texturas diferentes',
      'Materiales suaves y seguros',
      'Zonas de presión compresibles',
      'Diseño modular',
      'Uso supervisado',
    ],
    elements: ['Peluche suave', 'Superficie con relieve', 'Tejido textil', 'Zona acolchada', 'Elementos para manipular'],
    ageRange: '3+ años',
    image: '/images/plushies/1000226064.jpg',
    imageAlt: 'MUNI Abeja — muñeco sensorial amarillo y negro',
    accentColor: 'sage',
  },
  {
    id: 'tortuga',
    name: 'Tortuga',
    categoryId: 'relajacion',
    tagline: 'Un pequeño compañero para volver a la calma.',
    purpose:
      'Un compañero suave para acompañar la calma, la respiración y la autorregulación.',
    description:
      'La Tortuga MUNI invita a bajar el ritmo. Su caparazón sensorial combina texturas y una zona central pensada para apoyar las manos.',
    features: [
      'Colores contrastantes',
      'Elementos desplazables seguros',
      'Superficies con formas',
      'Números y letras en textil',
      'Uso supervisado',
    ],
    elements: ['Formas geométricas en tela', 'Bucle de cuentas seguras', 'Etiquetas de colores', 'Letras textiles'],
    ageRange: '4+ años',
    image: '/images/plushies/1000226210.jpg',
    imageAlt: 'MUNI Tortuga — muñeco sensorial suave y acolchado',
    accentColor: 'terracotta',
  },
  {
    id: 'zorro',
    name: 'Zorro',
    categoryId: 'atencion',
    tagline: 'Un compañero para expresar lo que sentís.',
    purpose:
      'Un compañero para reconocer emociones, comunicarse y encontrar calma a través del juego.',
    description:
      'El Zorro MUNI ayuda a expresar lo que se siente con expresiones intercambiables, tiras textiles y actividades para explorar el abrazo y el espacio.',
    features: [
      'Relleno de peso suave',
      'Peluche extra suave',
      'Superficie lavable',
      'Tamaño abrazable',
      'Uso supervisado',
    ],
    elements: ['Peluche de tacto suave', 'Zonas con peso distribuido', 'Tejido calido', 'Superficie lavable'],
    ageRange: '3+ años',
    image: '/images/plushies/1000226212.jpg',
    imageAlt: 'MUNI Zorro — muñeco para expresar emociones',
    accentColor: 'lavender',
  },
  {
    id: 'timo',
    name: 'Timo',
    categoryId: 'atencion',
    tagline: 'Concentrá tu energía.',
    purpose:
      'Un muñeco con elementos para manipular que acompañan la concentración y la organización de tareas.',
    description:
      'Timo es activo y enfocado. Incorpora elementos que se pueden mover, girar y ordenar, invitando a organizar secuencias y mantener las manos ocupadas durante actividades que requieren atención.',
    features: [
      'Elementos giratorios seguros',
      'Cierres y botones textiles',
      'Bucles de manipulación',
      'Secuencias de colores',
      'Uso supervisado',
    ],
    elements: ['Botones textiles', 'Cierres de tela', 'Bucle de cuentas', 'Elementos giratorios', 'Cordones seguros'],
    ageRange: '5+ años',
    image: '/images/plushies/1000226064.jpg',
    imageAlt: 'MUNI Timo — muñeco de atención y organización',
    accentColor: 'bluegray',
  },
  {
    id: 'lia',
    name: 'Lía',
    categoryId: 'lectoescritura',
    tagline: 'Las primeras palabras.',
    purpose:
      'Un muñeco que acerca letras, sonidos y palabras a través del juego táctil y visual.',
    description:
      'Lía es cuentan Historias. Incorpora letras en relieve, etiquetas con palabras simples y elementos que invitan a construir sílabas y nombrar lo que se toca. El acercamiento a la lectoescritura se da desde la exploración.',
    features: [
      'Letras en relieve',
      'Etiquetas con palabras',
      'Superficies con sílabas',
      'Colores por vocal',
      'Uso supervisado',
    ],
    elements: ['Letras textiles en relieve', 'Etiquetas con palabras simples', 'Bolsillos con letras', 'Colores por vocal'],
    ageRange: '5+ años',
    image: '/images/plushies/1000226210.jpg',
    imageAlt: 'MUNI Lía — muñeco de lectoescritura con letras y palabras',
    accentColor: 'terracotta',
  },
  {
    id: 'tacto',
    name: 'Tacto',
    categoryId: 'accesibilidad',
    tagline: 'Explorar con todos los sentidos.',
    purpose:
      'Un muñeco diseñado para poder explorarse mediante diferentes sentidos, incluyendo el tacto y el oído.',
    description:
      'Tacto es inclusivo. Su cuerpo combina texturas distinguibles al tacto, elementos que producen sonidos suaves y zonas con alto contraste visual. Está pensado para que cada niño encuentre su manera de interactuar.',
    features: [
      'Alto contraste visual',
      'Elementos sonoros suaves',
      'Texturas distinguibles',
      'Formas reconocibles al tacto',
      'Uso supervisado',
    ],
    elements: ['Crujidos suaves', 'Texturas de alto contraste', 'Relieves identificables', 'Elementos sonoros seguros'],
    ageRange: '3+ años',
    image: '/images/plushies/1000226212.jpg',
    imageAlt: 'MUNI Tacto — muñeco de accesibilidad multi-sensorial',
    accentColor: 'sage',
  },
];

// ============================================================
//  MODELO DE COSTOS — Todos los valores en ARS (pesos argentinos)
//
//  Estos valores son ESTIMACIONES EDITABLES basadas en costos
//  razonables de producción artesanal en Mendoza, Argentina.
//  No representan precios verificados de proveedores reales.
//  Reemplazá con valores reales cuando los consigas.
//
//  Última actualización: estimación editable (2026)
// ============================================================

export interface CostBreakdown {
  label: string;
  amount: number; // en ARS — EDITABLE
  description: string;
}

export interface PricingModel {
  costs: CostBreakdown[];
  marginPercent: number; // EDITABLE — margen de ganancia
  shippingHome: number; // EDITABLE — tarifa de envío a domicilio en ARS
}

export const pricingModel: PricingModel = {
  // Cada costo es una ESTIMACIÓN EDITABLE — reemplazar con valores reales de proveedores
  costs: [
    {
      label: 'Materiales y telas',
      amount: 8500,
      description: 'Telas, texturas, relleno y materiales textiles.',
    },
    {
      label: 'Confección y mano de obra',
      amount: 6000,
      description: 'Costura, armado y control de calidad.',
    },
    {
      label: 'Packaging y etiquetas',
      amount: 1200,
      description: 'Empaque, etiquetas e instrucciones.',
    },
    {
      label: 'Logística y comercial',
      amount: 1800,
    description: 'Costos de distribución, almacenamiento y comercialización.',
    },
  ],
  marginPercent: 65, // Margen de ganancia — EDITABLE
  shippingHome: 3500, // Envío a domicilio en Mendoza — EDITABLE
};

// Cálculo automático del costo total de producción
export function getProductionCost(model: PricingModel = pricingModel): number {
  return model.costs.reduce((sum, c) => sum + c.amount, 0);
}

// Cálculo automático del precio final con margen
export function getFinalPrice(model: PricingModel = pricingModel): number {
  const cost = getProductionCost(model);
  return Math.round((cost * (1 + model.marginPercent / 100)) / 100) * 100; // redondea a centenas
}

// Formatear como moneda argentina
export function formatARS(amount: number): string {
  return '$' + amount.toLocaleString('es-AR');
}
