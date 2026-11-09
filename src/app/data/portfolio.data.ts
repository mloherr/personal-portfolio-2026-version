/**
 * Contenido del portfolio. Todo lo que está entre corchetes en mayúsculas es
 * un dato pendiente de María y se muestra tal cual en la página.
 */

export const PENDING_URL = '[URL PENDIENTE]';

/** Devuelve la URL si es un enlace real; null si sigue siendo un placeholder. */
export function liveUrl(url: string): string | null {
  return /^(https?:|mailto:)/.test(url) && !url.includes('[') ? url : null;
}

export interface Profile {
  name: string;
  /** Apellido usado en el prompt del hero. Pendiente de confirmar. */
  promptHost: string;
  role: string;
  focus: string;
  intro: string;
  email: string;
  github: string;
  linkedin: string;
  year: number;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  url: string;
}

export interface StackGroup {
  label: string;
  items: string[];
}

export interface Lab {
  date: string;
  platform: string;
  name: string;
  category: string;
  writeupUrl: string;
}

export type TimelineKind = 'TRABAJO' | 'FORMACIÓN' | 'CERTIFICACIÓN';

export interface TimelineEntry {
  period: string;
  kind: TimelineKind;
  title: string;
  detail: string;
  highlights?: string[];
}

export const PROFILE: Profile = {
  name: 'María',
  promptHost: 'maria@lopez', // [CONFIRMAR APELLIDO]
  role: 'Desarrolladora full-stack',
  focus: '→ Application Security',
  intro:
    'Dos años construyendo aplicaciones web. Ahora llevo esa experiencia hacia la seguridad de aplicaciones: desarrollo, auditorías de accesibilidad y pentesting web.',
  email: 'mailto:[TU EMAIL]',
  github: 'https://github.com/[TU USUARIO]',
  linkedin: 'https://www.linkedin.com/in/[TU PERFIL]',
  year: 2026,
};

export const PROJECTS: Project[] = [
  {
    title: 'Haiku Generator',
    description:
      'Web app que genera haikus de forma aleatoria, con front y back desarrollados por mí.',
    tags: ['React', 'Node.js', 'Sass', 'MySQL'],
    url: PENDING_URL,
  },
  {
    title: 'Quiz de accesibilidad web',
    description:
      'Quiz interactivo de tipo swipe para aprender buenas prácticas de accesibilidad web.',
    tags: ['[STACK]', 'a11y'],
    url: PENDING_URL,
  },
  {
    title: 'Localizador de comida vegana',
    description: 'App para encontrar locales con opciones veganas. [DESCRIPCIÓN BREVE]',
    tags: ['[STACK]'],
    url: PENDING_URL,
  },
];

export const STACK: StackGroup[] = [
  { label: 'Frontend', items: ['Angular', 'React', 'JavaScript', 'Sass'] },
  { label: 'Backend', items: ['Node.js', 'MySQL', '[AÑADIR]'] },
  { label: 'Seguridad y a11y', items: ['Kali Linux', 'Auditoría a11y', '[HERRAMIENTAS]'] },
];

/** Solo writeups de máquinas retiradas. Filas reales pendientes. */
export const LABS: Lab[] = Array.from({ length: 3 }, () => ({
  date: '[FECHA]',
  platform: '[PLATAFORMA]',
  name: '[NOMBRE DEL LAB]',
  category: '[CATEGORÍA]',
  writeupUrl: PENDING_URL,
}));

export const TIMELINE: TimelineEntry[] = [
  {
    period: 'EN CURSO',
    kind: 'FORMACIÓN',
    title: 'Máster en ciberseguridad',
    detail: '[CENTRO]. Orientado a seguridad de aplicaciones y pentesting web.',
  },
  {
    period: 'DIC 2025',
    kind: 'CERTIFICACIÓN',
    title: 'Angular Junior',
    detail: 'certificates.dev',
  },
  {
    period: 'SEP 2024 → ACTUALIDAD',
    kind: 'TRABAJO',
    title: 'Desarrolladora frontend junior',
    detail: 'Viewnext · proyecto de telecomunicaciones para Orange · teletrabajo',
    highlights: [
      'Desarrollo frontend con Angular.',
      'Auditorías de accesibilidad web.',
      '[AÑADE UN LOGRO CONCRETO]',
    ],
  },
  {
    period: '2024',
    kind: 'FORMACIÓN',
    title: 'Bootcamp full-stack',
    detail: 'Adalab',
  },
];

export const NAV_LINKS = [
  { href: '#proyectos', label: '/proyectos' },
  { href: '#stack', label: '/stack' },
  { href: '#labs', label: '/labs' },
  { href: '#experiencia', label: '/experiencia' },
  { href: '#contacto', label: '/contacto' },
];
