# 🌟 EternalGrowth Landing Page

<div align="center">
  <img src="./src/assets/logo.jpeg" alt="EternalGrowth Logo" width="200"/>
  
  **Una landing page cyberpunk con efectos CRT y animaciones futuristas**
  
  [![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-7.1.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-ISC-green?style=for-the-badge)](./LICENSE)
</div>

---

## 📖 Descripción

EternalGrowth es una landing page moderna con estética cyberpunk que presenta:

- 🎨 **Diseño futurista** con efectos CRT auténticos
- ⚡ **Animaciones fluidas** y transiciones suaves
- 📱 **Diseño responsive** para todos los dispositivos
- 🖥️ **Efectos de monitor retro** (scanlines, glitch, glow)
- ⌨️ **Efecto typewriter** con frases dinámicas
- 🌈 **Colores cyberpunk** con paleta púrpura neón

## ✨ Características

### 🎯 Efectos Visuales

- **Scanlines animadas** que simulan monitores CRT
- **Horizontal sweep** con efectos de barrido
- **Capa de ruido** para textura auténtica
- **Glow effects** con resplandor neón
- **Glitch effects** en el logo principal
- **Animación de pulsación** en el logo de fondo

### 🔧 Características Técnicas

- **Hooks personalizados** para typewriter y glitch effects
- **Configuración modular** de frases
- **CSS animations** optimizadas
- **TypeScript** para type safety
- **Componentes reutilizables**

### 🖼️ Modo Wallpaper

- **Versión sin texto** para usar como fondo de pantalla
- **HTML estático** independiente incluido
- **Optimizado** para diferentes resoluciones

## 🚀 Instalación y Uso

### Prerequisitos

- Node.js >= 18
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/daniellelooo/landingpage-eternalgrowth.git

# Navegar al directorio
cd PrototipoLandingPage

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor en http://localhost:3000

# Producción
npm run build        # Construye para producción
npm run preview      # Previsualiza build de producción

# Calidad de código
npm run lint         # Verifica tipos TypeScript
```

## 🎮 Modos de Uso

### 1. Landing Page Completa

```
http://localhost:3000/
```

Muestra la página completa con logo, texto typewriter y todos los efectos.

### 2. Modo Wallpaper

```
http://localhost:3000/?mode=wallpaper
```

Solo muestra el fondo con efectos, sin texto - perfecto para wallpapers.

### 3. HTML Estático

```
wallpaper.html
```

Archivo independiente que puedes abrir directamente en cualquier navegador.

## 📁 Estructura del Proyecto

```
PrototipoLandingPage/
├── 📄 index.html              # HTML principal
├── 📄 wallpaper.html          # Versión wallpaper estática
├── 📄 package.json            # Dependencias y scripts
├── 📄 vite.config.ts          # Configuración Vite
├── 📄 tsconfig.json           # Configuración TypeScript
└── src/
    ├── 📄 App.tsx             # Componente principal con routing
    ├── 📄 main.tsx            # Punto de entrada
    ├── 📄 index.css           # Estilos globales
    ├── assets/
    │   └── 🖼️ logo.jpeg       # Logo de EternalGrowth
    ├── components/
    │   ├── 📄 EternalGrowthLanding.tsx    # Landing principal
    │   ├── 📄 EternalGrowthLanding.css    # Estilos principales
    │   ├── 📄 WallpaperBackground.tsx     # Componente wallpaper
    │   └── 📄 WallpaperBackground.css     # Estilos wallpaper
    ├── config/
    │   └── 📄 phrases.ts      # Frases del typewriter
    └── hooks/
        ├── 📄 useTypewriter.ts    # Hook para efecto typewriter
        └── 📄 useGlitchEffect.ts  # Hook para efecto glitch
```

## 🎨 Personalización

### Modificar Frases del Typewriter

Edita el archivo `src/config/phrases.ts`:

```typescript
export const TYPEWRITER_PHRASES = [
  "Tu nueva frase aquí...",
  "Otra frase creativa...",
  // Añade más frases
];
```

### Ajustar Colores

Los colores principales están en variables CSS:

- Púrpura primario: `#8B5CF6`
- Púrpura claro: `#C084FC`
- Negro: `#000`

### Modificar Velocidad de Animaciones

Ajusta los tiempos en los keyframes CSS:

- Scanlines: `0.1s`
- Horizontal sweep: `3s`
- Typewriter: Configurable en el hook

## 🛠️ Tecnologías Utilizadas

- **React 19.1.1** - Biblioteca de UI
- **TypeScript 5.9.2** - Type safety
- **Vite 7.1.3** - Build tool y dev server
- **CSS3** - Animaciones y efectos
- **SVG** - Efectos de ruido

## 📱 Responsividad

El diseño se adapta a:

- 📱 **Móviles** (320px+)
- 📟 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Pantallas grandes** (1920px+)
- 📺 **Ultra-wide** (21:9+)

## 🎯 Casos de Uso

### Para Desarrolladores

- Landing page de proyectos tech
- Portfolio con estética cyberpunk
- Páginas de "Coming Soon"

### Para Wallpapers

- Fondo de pantalla animado
- Screensaver personalizado
- Ambiente de trabajo futurista

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- Inspirado en la estética cyberpunk y retro-futurismo
- Efectos CRT basados en monitores vintage
- Paleta de colores inspirada en temas cyberpunk

---

<div align="center">
  <p>Hecho con ❤️ para el futuro</p>
  <p><strong>EternalGrowth</strong> - Donde la tecnología encuentra el arte</p>
</div>
