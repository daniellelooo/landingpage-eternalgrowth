import type { ReactNode } from "react";

export interface NavItem {
  id: string;
  label: string;
  icon?: string;
  // Página aparte (no una sección de la home): se pinta como enlace real para
  // que Google lo siga.
  href?: string;
}

export interface ServiceCard {
  title: string;
  description: string;
  icon?: ReactNode;
  details?: string[];
  // Página propia del servicio, cuando existe.
  href?: string;
  linkLabel?: string;
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
  | "portafolio"
  | "contacto";
