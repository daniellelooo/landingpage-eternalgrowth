export interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon?: JSX.Element;
  details?: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

export type SectionId = "hero" | "about" | "beneficios" | "servicios" | "paquetes" | "contacto";
