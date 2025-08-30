# Guía de Contribución

¡Gracias por tu interés en contribuir a EternalGrowth Landing Page! 🚀

## 🤝 Cómo Contribuir

### 1. Fork y Clone
```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/tu-usuario/landingpage-eternalgrowth.git
cd PrototipoLandingPage
```

### 2. Configurar el Entorno
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### 3. Crear una Branch
```bash
# Crear branch para tu feature
git checkout -b feature/nombre-de-tu-feature

# O para un bugfix
git checkout -b bugfix/descripcion-del-bug
```

### 4. Hacer Cambios
- Mantén el estilo de código consistente
- Añade comentarios donde sea necesario
- Testa tus cambios en diferentes navegadores
- Asegúrate de que sea responsive

### 5. Commit y Push
```bash
# Añadir cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: descripción de la nueva característica"

# Push a tu fork
git push origin feature/nombre-de-tu-feature
```

### 6. Pull Request
- Abre un PR desde tu fork al repositorio principal
- Describe claramente los cambios realizados
- Incluye screenshots si hay cambios visuales

## 📋 Tipos de Contribuciones

### 🎨 Mejoras Visuales
- Nuevos efectos CRT
- Optimizaciones de animaciones
- Mejoras en responsive design
- Nuevas paletas de colores

### ⚡ Mejoras de Performance
- Optimización de animaciones CSS
- Reducción de bundle size
- Mejoras en tiempo de carga

### 🔧 Nuevas Características
- Nuevos modos de visualización
- Configuraciones adicionales
- Nuevos hooks personalizados

### 🐛 Bug Fixes
- Corrección de errores
- Mejoras de compatibilidad
- Fixes de responsive

## 🎯 Estándares de Código

### TypeScript
- Usa tipos explícitos donde sea posible
- No uses `any` a menos que sea absolutamente necesario
- Nombra las interfaces con PascalCase

### CSS
- Usa nombres de clase descriptivos
- Prefiere CSS Grid/Flexbox sobre floats
- Mantén las animaciones fluidas (60fps)

### Componentes React
- Un componente por archivo
- Props tipadas con TypeScript
- Hooks personalizados para lógica reutilizable

## 🏷️ Convención de Commits

Usa el formato de [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(scope): descripción

feat(components): añadir nuevo efecto de glitch
fix(css): corregir problema de responsive en móviles
docs(readme): actualizar instrucciones de instalación
style(css): mejorar animación de scanlines
refactor(hooks): optimizar useTypewriter hook
```

### Tipos de Commit:
- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Cambios de estilo (formato, CSS)
- `refactor`: Refactoring de código
- `test`: Añadir o modificar tests
- `chore`: Tareas de mantenimiento

## 🎨 Guía de Estilo Visual

### Colores
- Púrpura primario: `#8B5CF6`
- Púrpura claro: `#C084FC`
- Negro: `#000`
- Usar transparencias para overlays

### Animaciones
- Duración máxima: 6s para animaciones largas
- Usar `ease-in-out` como easing predeterminado
- 60fps target para todas las animaciones

### Tipografía
- Font principal: Inter, Segoe UI, Roboto
- Usar `clamp()` para tamaños responsive
- Letter-spacing para estilo futurista

## 🔍 Review Process

1. **Automated Checks**: TypeScript compilation
2. **Visual Review**: Screenshots en diferentes dispositivos
3. **Performance Check**: Verificar que no impacte la performance
4. **Code Review**: Al menos un reviewer aprueba los cambios

## 🆘 ¿Necesitas Ayuda?

- 📖 Lee el README completo
- 🐛 Revisa los issues existentes
- 💬 Abre un issue para discutir ideas grandes
- 📧 Contacta al equipo para dudas específicas

## 📜 Código de Conducta

- Sé respetuoso con otros contribuidores
- Proporciona feedback constructivo
- Mantén discusiones técnicas enfocadas
- Respeta diferentes niveles de experiencia

---

¡Gracias por hacer EternalGrowth más increíble! 🌟
