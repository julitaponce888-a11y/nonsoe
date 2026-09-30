// ============================================================
//  MUNI — Datos centrales de la marca
//  Editá este archivo para cambiar textos, FAQ, etc.
// ============================================================

// ---------- Categorías de experiencia ----------
export interface MuniCategory {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  accent: 'sage' | 'terracotta' | 'lavender' | 'bluegray';
  image: string;
}

export const muniCategories: MuniCategory[] = [
  {
    id: 'calma',
    name: 'MUNI CALMA',
    description: 'Texturas suaves y elementos pensados para una experiencia tranquila.',
    icon: 'Moon',
    accent: 'lavender',
    image: 'https://images.pexels.com/photos/4887107/pexels-photo-4887107.jpeg?auto=compress&cs=tinysrgb&h=600&w=500',
  },
  {
    id: 'explora',
    name: 'MUNI EXPLORA',
    description: 'Diferentes texturas, formas y detalles para descubrir mediante el tacto.',
    icon: 'Compass',
    accent: 'sage',
    image: 'https://images.pexels.com/photos/1974656/pexels-photo-1974656.jpeg?auto=compress&cs=tinysrgb&h=600&w=500',
  },
  {
    id: 'manipula',
    name: 'MUNI MANIPULA',
    description: 'Elementos que se pueden tocar, apretar, mover y explorar.',
    icon: 'Hand',
    accent: 'terracotta',
    image: 'https://images.pexels.com/photos/36780601/pexels-photo-36780601.jpeg?auto=compress&cs=tinysrgb&h=600&w=500',
  },
  {
    id: 'acompana',
    name: 'MUNI ACOMPAÑA',
    description: 'Un MUNI pensado para brindar una experiencia de confort y compañía.',
    icon: 'Heart',
    accent: 'bluegray',
    image: 'https://images.pexels.com/photos/38739419/pexels-photo-38739419.jpeg?auto=compress&cs=tinysrgb&h=600&w=500',
  },
  {
    id: 'personalizado',
    name: 'MUNI PERSONALIZADO',
    description: 'Elegí las características que querés y creá un MUNI único.',
    icon: 'Sparkles',
    accent: 'sage',
    image: 'https://images.pexels.com/photos/38238529/pexels-photo-38238529.jpeg?auto=compress&cs=tinysrgb&h=600&w=500',
  },
];

// ---------- Configurador ----------
export interface ConfigOption {
  id: string;
  label: string;
  priceModifier: number;
}

export interface ConfigStep {
  step: number;
  title: string;
  options: ConfigOption[];
}

export const configSteps: ConfigStep[] = [
  {
    step: 1,
    title: 'Elegí tu experiencia',
    options: [
      { id: 'calma', label: 'Calma', priceModifier: 0 },
      { id: 'explora', label: 'Exploración', priceModifier: 0 },
      { id: 'manipula', label: 'Manipulación', priceModifier: 0 },
      { id: 'acompana', label: 'Acompañamiento', priceModifier: 0 },
    ],
  },
  {
    step: 2,
    title: 'Elegí las texturas',
    options: [
      { id: 'suave', label: 'Suave', priceModifier: 0 },
      { id: 'rugosa', label: 'Rugosa', priceModifier: 0 },
      { id: 'esponjosa', label: 'Esponjosa', priceModifier: 0 },
      { id: 'relieve', label: 'Con relieve', priceModifier: 0 },
    ],
  },
  {
    step: 3,
    title: 'Elegí los estímulos',
    options: [
      { id: 'sin-sonido', label: 'Sin sonido', priceModifier: 0 },
      { id: 'sonido-suave', label: 'Sonido suave', priceModifier: 0 },
      { id: 'moviles', label: 'Elementos móviles', priceModifier: 0 },
    ],
  },
  {
    step: 4,
    title: '¿Querés reutilizar una prenda?',
    options: [
      { id: 'propia', label: 'Sí, quiero usar mi propia ropa', priceModifier: 0 },
      { id: 'muni', label: 'No, quiero textiles recuperados de MUNI', priceModifier: 0 },
    ],
  },
];

export const baseConfigPrice = 0; // Placeholder — se define cuando haya precios reales

// ---------- Proceso de reutilización ----------
export interface RecycleStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export const recycleSteps: RecycleStep[] = [
  {
    number: '1',
    title: 'RECUPERAMOS',
    description: 'Seleccionamos prendas y textiles que pueden tener una segunda vida.',
    icon: 'Shirt',
  },
  {
    number: '2',
    title: 'PREPARAMOS',
    description: 'Clasificamos y acondicionamos los materiales antes de utilizarlos.',
    icon: 'Scissors',
  },
  {
    number: '3',
    title: 'CREAMOS',
    description: 'Los textiles se convierten en un nuevo MUNI.',
    icon: 'Sparkles',
  },
  {
    number: '4',
    title: 'VOLVÉS A DARLE VALOR',
    description: 'Una prenda que ya no usabas se transforma en un nuevo objeto.',
    icon: 'Recycle',
  },
];

// ---------- ¿Por qué MUNI? ----------
export interface WhyMuniCard {
  title: string;
  description: string;
  icon: string;
}

export const whyMuniCards: WhyMuniCard[] = [
  {
    title: 'REUTILIZAR',
    description: 'Damos una nueva oportunidad a textiles que todavía pueden ser aprovechados.',
    icon: 'Recycle',
  },
  {
    title: 'CREAR',
    description: 'Transformamos materiales recuperados en productos únicos.',
    icon: 'Palette',
  },
  {
    title: 'ACOMPAÑAR',
    description: 'Diseñamos experiencias de juego que pueden adaptarse a diferentes preferencias.',
    icon: 'Heart',
  },
];

// ---------- Precios ----------
export interface PricingCard {
  id: string;
  name: string;
  description: string;
  price: string; // placeholder
  highlighted?: boolean;
  features: string[];
}

export const pricingCards: PricingCard[] = [
  {
    id: 'basico',
    name: 'MUNI BÁSICO',
    description: 'Un muñeco con texturas suaves, ideal para empezar a explorar.',
    price: '$XX.XXX',
    features: ['Texturas suaves', 'Materiales recuperados', 'Diseño simple'],
  },
  {
    id: 'sensorial',
    name: 'MUNI SENSORIAL',
    description: 'Diferentes texturas, estímulos y elementos para manipular.',
    price: '$XX.XXX',
    highlighted: true,
    features: ['Múltiples texturas', 'Elementos manipulables', 'Estímulos sonoros suaves', 'Materiales recuperados'],
  },
  {
    id: 'personalizado',
    name: 'MUNI PERSONALIZADO',
    description: 'Elegí las características y creá un MUNI único a tu manera.',
    price: '$XX.XXX',
    features: ['Experiencia a elección', 'Texturas a elección', 'Estímulos a elección', 'Posibilidad de prenda propia'],
  },
];

export const personalizacionPrenda = {
  name: 'PERSONALIZACIÓN CON TU PRENDA',
  description: 'Sumá una prenda propia para convertirla en parte de tu MUNI.',
  price: '$X.XXX',
};

// ---------- ¿Cómo lo recibís? ----------
export interface ReceiveStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export const receiveSteps: ReceiveStep[] = [
  {
    number: '1',
    title: 'PEDÍ',
    description: 'Elegí tu MUNI desde la web.',
    icon: 'MousePointerClick',
  },
  {
    number: '2',
    title: 'CREAMOS',
    description: 'Preparamos tu pedido.',
    icon: 'Scissors',
  },
  {
    number: '3',
    title: 'RETIRÁ',
    description: 'Podés retirarlo en un punto de entrega.',
    icon: 'Store',
  },
  {
    number: '4',
    title: 'RECIBÍ',
    description: 'También podés elegir envío a domicilio con costo adicional.',
    icon: 'Truck',
  },
];

// ---------- Impacto ----------
export interface ImpactMetric {
  value: string;
  label: string;
}

export const impactMetrics: ImpactMetric[] = [
  { value: 'XX', label: 'kg de textiles reutilizados' },
  { value: 'XX', label: 'prendas recuperadas' },
  { value: 'XX', label: 'MUNI creados' },
  { value: '100%', label: 'producción local' },
];

// ---------- FAQ ----------
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: '¿Qué es MUNI?',
    answer:
      'MUNI es una propuesta de muñecos sensoriales confeccionados principalmente a partir de textiles recuperados. Cada muñeco ofrece diferentes experiencias de exploración mediante texturas, movimiento, manipulación, sonido y otras características que pueden adaptarse a distintas preferencias.',
  },
  {
    question: '¿De qué materiales están hechos?',
    answer:
      'Los muñecos MUNI se confeccionan aprovechando prendas y retazos de ropa que ya no se utilizan. Los textiles pasan por un proceso de selección, lavado y acondicionamiento. Para componentes que requieren características específicas de seguridad, se utilizan materiales nuevos y certificados.',
  },
  {
    question: '¿Puedo usar una prenda propia?',
    answer:
      'Sí. Podés entregar una prenda que ya no utilizás para que parte de esa tela se incorpore a tu muñeco, siempre que el material sea apto para el proceso. La prenda pasa por el mismo proceso de selección y acondicionamiento.',
  },
  {
    question: '¿Puedo elegir las texturas?',
    answer:
      'Sí. En la sección "Creá tu MUNI" podés elegir la experiencia, las texturas, los estímulos y si querés reutilizar una prenda propia. Cada persona explora y siente de una manera diferente, por eso MUNI está pensado para adaptarse.',
  },
  {
    question: '¿Los MUNI son productos terapéuticos?',
    answer:
      'MUNI no reemplaza tratamientos ni está diseñado como producto médico. Es una propuesta de juego y exploración sensorial. No diagnostica, trata ni cura ninguna condición.',
  },
  {
    question: '¿Dónde puedo retirar mi pedido?',
    answer:
      'La propuesta está pensada para Mendoza. Disponemos de puntos de retiro que se coordinan al momento del pedido. Las direcciones exactas se confirmarán próximamente.',
  },
  {
    question: '¿Hacen envíos?',
    answer:
      'Sí, podés elegir envío a domicilio con costo adicional. El envío se coordina al momento del pedido dentro de Mendoza.',
  },
  {
    question: '¿Cómo se limpia un MUNI?',
    answer:
      'Cada superficie puede tener un método de limpieza recomendado. En general, se recomienda limpieza con paño húmedo y, cuando sea posible, lavado a mano con jabón suave. Incluimos instrucciones específicas con el producto.',
  },
];

// ---------- Nav links ----------
export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'MUNI', href: '#que-muni' },
  { label: 'Personalizá', href: '#crea-tu-muni' },
  { label: 'Sustentabilidad', href: 'otra-historia' },
  { label: 'Preguntas frecuentes', href: '#faq' },
  { label: 'Contacto', href: '#contacto' },
];

// ---------- Puntos de retiro ----------
export interface PickupPoint {
  id: string;
  name: string;
  address: string;
  hours: string;
}

export const pickupPoints: PickupPoint[] = [
  {
    id: 'mendoza-centro',
    name: 'Punto de retiro — Ciudad de Mendoza',
    address: 'Dirección a confirmar — Ciudad de Mendoza',
    hours: 'Lunes a viernes de 10:00 a 18:00 h',
  },
  {
    id: 'godoy-cruz',
    name: 'Punto de retiro — Godoy Cruz',
    address: 'Dirección a confirmar — Godoy Cruz',
    hours: 'Lunes a viernes de 09:00 a 17:00 h',
  },
];
