export interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: JSX.Element;
}

export type SectionId = "hero" | "about" | "servicios" | "contacto";
