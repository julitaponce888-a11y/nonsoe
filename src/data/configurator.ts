// ============================================================
//  MUNI — Datos del configurador "Diseñá tu Muni"
//  Estructura de pasos, opciones y categorías de tarjetas
// ============================================================

export interface ConfigOptionCard {
  id: string;
  label: string;
  description?: string;
  icon: string; // lucide icon name
  visual?: 'texture' | 'relief'; // for SVG-rendered visual previews
  visualPattern?: string; // pattern key for SVG
  warning?: string;
}

export interface ConfigStepDef {
  id: string;
  step: number;
  title: string;
  subtitle?: string;
  selectionType: 'single' | 'multiple';
  allowNone?: boolean;
  noneLabel?: string;
  options: ConfigOptionCard[];
  subOptions?: Record<string, ConfigOptionCard[]>;
  hasCounter?: boolean;
  needsPhotoUpload?: boolean;
  photoNote?: string;
  extraNote?: string;
  warnings?: string[];
}

export const configuratorSteps: ConfigStepDef[] = [
  {
    id: 'experiencia',
    step: 1,
    title: 'Elegí tu experiencia',
    subtitle: 'Seleccioná una opción principal',
    selectionType: 'single',
    options: [
      { id: 'calma', label: 'Calma', description: 'Elementos suaves y agradables al tacto.', icon: 'Moon' },
      { id: 'exploracion', label: 'Exploración', description: 'Diferentes texturas y relieves para explorar mediante el tacto.', icon: 'Compass' },
      { id: 'manipulacion', label: 'Manipulación', description: 'Elementos para abrir, cerrar, agarrar, mover y manipular.', icon: 'Hand' },
      { id: 'acompanamiento', label: 'Acompañamiento', description: 'Recursos destinados a la comunicación, expresión y acompañamiento.', icon: 'Heart' },
    ],
  },
  {
    id: 'texturas',
    step: 2,
    title: '¿Qué texturas querés incorporar?',
    subtitle: 'Podés elegir varias',
    selectionType: 'multiple',
    options: [
      { id: 'suave', label: 'Suave', icon: 'Feather', visual: 'texture', visualPattern: 'suave' },
      { id: 'lisa', label: 'Lisa', icon: 'Square', visual: 'texture', visualPattern: 'lisa' },
      { id: 'rugosa', label: 'Rugosa', icon: 'Grid3x3', visual: 'texture', visualPattern: 'rugosa' },
      { id: 'acanalada', label: 'Acanalada', icon: 'AlignJustify', visual: 'texture', visualPattern: 'acanalada' },
      { id: 'pelitos', label: 'Con pelitos', icon: 'Sparkles', visual: 'texture', visualPattern: 'pelitos' },
      { id: 'velcro', label: 'Velcro', icon: 'Grip', visual: 'texture', visualPattern: 'velcro' },
    ],
  },
  {
    id: 'relieves',
    step: 3,
    title: 'Elegí tus relieves',
    subtitle: 'Podés elegir varios',
    selectionType: 'multiple',
    options: [
      { id: 'lineas', label: 'Líneas', icon: 'Minus', visual: 'relief', visualPattern: 'lineas' },
      { id: 'puntos', label: 'Puntos', icon: 'Circle', visual: 'relief', visualPattern: 'puntos' },
      { id: 'ondas', label: 'Ondas', icon: 'Waves', visual: 'relief', visualPattern: 'ondas' },
      { id: 'espirales', label: 'Espirales', icon: 'Spiral', visual: 'relief', visualPattern: 'espirales' },
      { id: 'circulos', label: 'Círculos', icon: 'CircleDot', visual: 'relief', visualPattern: 'circulos' },
      { id: 'zigzag', label: 'Zigzag', icon: 'Zap', visual: 'relief', visualPattern: 'zigzag' },
    ],
  },
  {
    id: 'zona-apretar',
    step: 4,
    title: '¿Querés una zona para apretar?',
    selectionType: 'single',
    allowNone: true,
    noneLabel: 'Sin zona para apretar',
    options: [
      { id: 'blanda', label: 'Zona blanda', description: 'Parte suave y flexible para apretar y manipular.', icon: 'Cloud' },
      { id: 'crunchi', label: 'Crunchi', description: 'Material crujiente que produce un sonido suave al manipularlo.', icon: 'Volume2', warning: 'Disponible únicamente en modelos y edades en los que resulte adecuado y sujeto a requisitos de seguridad.' },
    ],
  },
  {
    id: 'motricidad',
    step: 5,
    title: 'Elegí elementos de motricidad',
    subtitle: 'Podés elegir varios',
    selectionType: 'multiple',
    options: [
      { id: 'velcro', label: 'Velcro', icon: 'Grip' },
      { id: 'cierres', label: 'Cierres', icon: 'Archive' },
      { id: 'botones', label: 'Botones', icon: 'Circle' },
      { id: 'cordones', label: 'Cordones para atar', icon: 'Lasso' },
      { id: 'otros', label: 'Otros elementos manipulables', icon: 'Hand' },
    ],
  },
  {
    id: 'comunicacion',
    step: 6,
    title: 'Elegí tus tarjetas de comunicación',
    subtitle: 'Las tarjetas se confeccionan en tela y se colocan sobre Muni mediante Velcro',
    selectionType: 'multiple',
    hasCounter: true,
    options: [
      { id: 'ayuda', label: 'Ayuda', icon: 'HelpCircle' },
      { id: 'agua', label: 'Agua', icon: 'Droplet' },
      { id: 'comer', label: 'Comer', icon: 'Utensils' },
      { id: 'dormir', label: 'Dormir', icon: 'Moon' },
      { id: 'bano', label: 'Ir al baño', icon: 'DoorOpen' },
      { id: 'descansar', label: 'Descansar', icon: 'Armchair' },
      { id: 'espacio', label: 'Necesito espacio', icon: 'Expand' },
      { id: 'feliz', label: 'Feliz', icon: 'Smile' },
      { id: 'triste', label: 'Triste', icon: 'Frown' },
      { id: 'enojado', label: 'Enojado', icon: 'Angry' },
      { id: 'miedo', label: 'Tengo miedo', icon: 'Ghost' },
      { id: 'jugar', label: 'Jugar', icon: 'Gamepad2' },
      { id: 'abrazar', label: 'Abrazar', icon: 'Heart' },
      { id: 'hablar', label: 'Hablar', icon: 'MessageCircle' },
      { id: 'si', label: 'Sí', icon: 'Check' },
      { id: 'no', label: 'No', icon: 'X' },
    ],
  },
  {
    id: 'peso',
    step: 7,
    title: '¿Querés que tu Muni tenga peso?',
    selectionType: 'single',
    subOptions: {
      'con-peso': [
        { id: 'baja', label: 'Carga baja', icon: 'Feather' },
        { id: 'media', label: 'Carga media', icon: 'Scale' },
        { id: 'alta', label: 'Carga alta', icon: 'Weight' },
      ],
    },
    warnings: [
      'Máximo 1,5 kg es el máximo contemplado para el prototipo.',
      'El peso específico deberá seleccionarse teniendo en cuenta las características del usuario y estará sujeto a evaluación y validación de seguridad.',
      'Muni no está diseñado como mecanismo de contención o restricción.',
    ],
    options: [
      { id: 'sin-peso', label: 'Sin peso', description: 'Versión estándar.', icon: 'Feather' },
      { id: 'con-peso', label: 'Con peso', description: 'Sistema de cargas intercambiables.', icon: 'Weight' },
    ],
  },
  {
    id: 'materiales',
    step: 8,
    title: '¿Querés reutilizar una prenda o tela?',
    selectionType: 'single',
    needsPhotoUpload: true,
    photoNote: 'Antes de utilizar cualquier prenda, Muni realizará una selección y revisión del material para determinar si es adecuado para el producto.',
    options: [
      { id: 'propia', label: 'Sí, quiero utilizar una prenda mía', description: 'Quiero enviar una prenda o tela para incorporarla a mi Muni.', icon: 'Shirt' },
      { id: 'muni', label: 'No, quiero textiles reutilizados de Muni', description: 'Quiero que Muni seleccione textiles reutilizados para mi muñeco.', icon: 'Recycle' },
    ],
  },
];

export const stepLabels = [
  'Experiencia',
  'Texturas',
  'Relieves',
  'Interacción',
  'Motricidad',
  'Comunicación',
  'Peso',
  'Materiales',
  'Resumen',
];

export const communicationCardGroups: { title: string; ids: string[] }[] = [
  { title: 'Necesidades', ids: ['ayuda', 'agua', 'comer', 'dormir', 'bano', 'descansar', 'espacio'] },
  { title: 'Emociones', ids: ['feliz', 'triste', 'enojado', 'miedo'] },
  { title: 'Acciones', ids: ['jugar', 'abrazar', 'hablar', 'si', 'no'] },
];

export interface MuniConfig {
  experience: string | null;
  textures: string[];
  reliefs: string[];
  squeezeZone: string | null;
  motorSkills: string[];
  communicationCards: string[];
  weight: string | null;
  weightLevel: string | null;
  textileSource: string | null;
  customGarmentDesc: string;
  photoFileName: string | null;
}

export const emptyConfig: MuniConfig = {
  experience: null,
  textures: [],
  reliefs: [],
  squeezeZone: null,
  motorSkills: [],
  communicationCards: [],
  weight: null,
  weightLevel: null,
  textileSource: null,
  customGarmentDesc: '',
  photoFileName: null,
};
