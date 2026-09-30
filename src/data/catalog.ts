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
      'Botones y cierres',
      'Cordones para atar',
      'Velcro textil',
      'Materiales reutilizados',
      'Uso supervisado',
    ],
    elements: ['Tela reutilizada', 'Relleno suave', 'Botones', 'Cierres', 'Cordones', 'Velcro'],
    ageRange: '3+ años',
    image: '/images/plushies/1000226064.jpg',
    imageAlt: 'MUNI Abeja — muñeco sensorial amarillo y negro',
    accentColor: 'sage',
  },
  {
    id: 'ballena',
    name: 'Ballena',
    categoryId: 'relajacion',
    tagline: 'Un compañero con peso para acompañar la calma.',
    purpose:
      'Un muñeco con módulo de peso intercambiable, pensado para acompañar momentos de calma y regulación.',
    description:
      'La Ballena MUNI combina texturas suaves con un módulo de peso intercambiable. Su cuerpo amplio invita al abrazo y al descanso.',
    features: [
      'Módulo de peso intercambiable',
      'Texturas suaves',
      'Tamaño abrazable',
      'Materiales reutilizados',
      'Uso supervisado',
    ],
    elements: ['Tela reutilizada', 'Relleno suave', 'Módulo de peso', 'Velcro', 'Hilo'],
    ageRange: '3+ años',
    image: '/images/plushies/1000226212.jpg',
    imageAlt: 'MUNI Ballena — muñeco con peso para calma y regulación',
    accentColor: 'bluegray',
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
      'Texturas suaves',
      'Caparazón sensorial',
      'Velcro textil',
      'Materiales reutilizados',
      'Uso supervisado',
    ],
    elements: ['Tela reutilizada', 'Relleno suave', 'Velcro', 'Hilo'],
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
      'El Zorro MUNI ayuda a expresar lo que se siente con caras intercambiables, tarjetas de comunicación y actividades para explorar el abrazo y el espacio.',
    features: [
      'Caras intercambiables (3)',
      'Tarjetas de comunicación',
      'Velcro textil',
      'Materiales reutilizados',
      'Uso supervisado',
    ],
    elements: ['Tela reutilizada', 'Relleno suave', 'Caras intercambiables', 'Tarjetas de comunicación', 'Velcro'],
    ageRange: '3+ años',
    image: '/images/plushies/1000226212.jpg',
    imageAlt: 'MUNI Zorro — muñeco para expresar emociones',
    accentColor: 'lavender',
  },
];

// ============================================================
//  MODELO DE COSTOS — Datos reales del proyecto MUNI
//  Valores en ARS (pesos argentinos)
//  Fuente: CSV de costos del proyecto
// ============================================================

export interface MaterialCost {
  material: string;
  unit: string;
  unitPrice: number;
  quantity: number;
  amount: number;
}

export interface ProductCostBreakdown {
  productId: string;
  variableCost: number;
  materials: MaterialCost[];
}

export const productCosts: Record<string, ProductCostBreakdown> = {
  ballena: {
    productId: 'ballena',
    variableCost: 9520,
    materials: [
      { material: 'Tela reutilizada', unit: 'kg', unitPrice: 3500, quantity: 0.35, amount: 1225 },
      { material: 'Relleno', unit: 'kg', unitPrice: 8500, quantity: 0.40, amount: 3400 },
      { material: 'Velcro', unit: 'm', unitPrice: 2200, quantity: 0.20, amount: 440 },
      { material: 'Hilo', unit: 'carrete', unitPrice: 2500, quantity: 0.10, amount: 250 },
      { material: 'Módulo de peso', unit: 'módulo', unitPrice: 3500, quantity: 1.00, amount: 3500 },
      { material: 'Alcohol 70% / sanitizante', unit: 'L', unitPrice: 4100, quantity: 0.05, amount: 205 },
      { material: 'Embalaje simple', unit: 'unidad', unitPrice: 500, quantity: 1.00, amount: 500 },
    ],
  },
  tortuga: {
    productId: 'tortuga',
    variableCost: 5640,
    materials: [
      { material: 'Tela reutilizada', unit: 'kg', unitPrice: 3500, quantity: 0.30, amount: 1050 },
      { material: 'Relleno', unit: 'kg', unitPrice: 8500, quantity: 0.35, amount: 2975 },
      { material: 'Velcro', unit: 'm', unitPrice: 2200, quantity: 0.30, amount: 660 },
      { material: 'Hilo', unit: 'carrete', unitPrice: 2500, quantity: 0.10, amount: 250 },
      { material: 'Alcohol 70% / sanitizante', unit: 'L', unitPrice: 4100, quantity: 0.05, amount: 205 },
      { material: 'Embalaje simple', unit: 'unidad', unitPrice: 500, quantity: 1.00, amount: 500 },
    ],
  },
  zorro: {
    productId: 'zorro',
    variableCost: 10475,
    materials: [
      { material: 'Tela reutilizada', unit: 'kg', unitPrice: 3500, quantity: 0.28, amount: 980 },
      { material: 'Relleno', unit: 'kg', unitPrice: 8500, quantity: 0.30, amount: 2550 },
      { material: 'Velcro', unit: 'm', unitPrice: 2200, quantity: 0.45, amount: 990 },
      { material: 'Hilo', unit: 'carrete', unitPrice: 2500, quantity: 0.10, amount: 250 },
      { material: 'Tarjeta de comunicación', unit: 'unidad', unitPrice: 500, quantity: 1.00, amount: 500 },
      { material: 'Caras intercambiables', unit: 'unidad', unitPrice: 1500, quantity: 3.00, amount: 4500 },
      { material: 'Alcohol 70% / sanitizante', unit: 'L', unitPrice: 4100, quantity: 0.05, amount: 205 },
      { material: 'Embalaje simple', unit: 'unidad', unitPrice: 500, quantity: 1.00, amount: 500 },
    ],
  },
  abeja: {
    productId: 'abeja',
    variableCost: 8200,
    materials: [
      { material: 'Tela reutilizada', unit: 'kg', unitPrice: 3500, quantity: 0.25, amount: 875 },
      { material: 'Relleno', unit: 'kg', unitPrice: 8500, quantity: 0.28, amount: 2380 },
      { material: 'Velcro', unit: 'm', unitPrice: 2200, quantity: 0.25, amount: 550 },
      { material: 'Hilo', unit: 'carrete', unitPrice: 2500, quantity: 0.10, amount: 250 },
      { material: 'Botones', unit: 'unidad', unitPrice: 100, quantity: 4.00, amount: 400 },
      { material: 'Cierres', unit: 'unidad', unitPrice: 1200, quantity: 2.00, amount: 2400 },
      { material: 'Cordones', unit: 'm', unitPrice: 800, quantity: 0.80, amount: 640 },
      { material: 'Alcohol 70% / sanitizante', unit: 'L', unitPrice: 4100, quantity: 0.05, amount: 205 },
      { material: 'Embalaje simple', unit: 'unidad', unitPrice: 500, quantity: 1.00, amount: 500 },
    ],
  },
};

export interface FixedCost {
  concept: string;
  monthly: number;
}

export const fixedCosts: FixedCost[] = [
  { concept: 'Luz', monthly: 15000 },
  { concept: 'Agua', monthly: 5000 },
  { concept: 'Internet', monthly: 10000 },
];

export const fixedCostsTotal = 30000;

export interface OperationalCost {
  concept: string;
  monthly: number;
}

export const operationalCosts: OperationalCost[] = [
  { concept: 'Sueldo / mano de obra', monthly: 0 },
  { concept: 'Marketing y difusión', monthly: 10000 },
];

export const operationalCostsTotal = 10000;

export interface InitialInvestmentItem {
  item: string;
  amount: number;
}

export const initialInvestment: InitialInvestmentItem[] = [
  { item: 'Máquina de coser familiar', amount: 390000 },
  { item: 'Tijeras de confección', amount: 56000 },
  { item: 'Kit de agujas', amount: 8000 },
  { item: 'Cinta métrica / herramientas básicas', amount: 8000 },
];

export const initialInvestmentTotal = 462000;
export const aportePorIntegrante = 92400;

export const marginPercent = 65;
export const shippingHome = 3500;

const averageVariableCost = Math.round(
  Object.values(productCosts).reduce((sum, p) => sum + p.variableCost, 0) / Object.keys(productCosts).length
);

export function getProductionCost(productId: string): number {
  return productCosts[productId]?.variableCost ?? averageVariableCost;
}

export function getFinalPrice(productId: string): number {
  const cost = getProductionCost(productId);
  return Math.round((cost * (1 + marginPercent / 100)) / 100) * 100;
}

export function formatARS(amount: number): string {
  return 
 + amount.toLocaleString('es-AR');
}
