declare module "*.jpeg" {
  const content: string;
  export default content;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  // Solo en la rama diseno/hero: qué concepto de hero sale por defecto.
  readonly VITE_HERO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
