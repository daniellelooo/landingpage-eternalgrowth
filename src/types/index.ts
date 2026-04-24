import type { ReactNode } from "react";

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon?: ReactNode;
  details?: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: ReactNode;
}

export type SectionId =
  | "hero"
  | "about"
  | "beneficios"
  | "servicios"
  | "paquetes"
  | "blog"
  | "contacto";
