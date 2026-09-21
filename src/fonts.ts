// Fuentes servidas desde la propia web en vez de Google Fonts. Mismas tres
// familias y mismos pesos que pedía el <link> anterior, así que el aspecto no
// cambia. Lo que cambia es que ya no hay que ir a otro servidor antes de pintar
// el texto: con la página generada en el build, el texto aparecía primero en
// Arial/Courier y saltaba al llegar las fuentes.
// Solo el subconjunto latino: cubre español completo (tildes, ñ, ¿, ¡).
import "@fontsource/space-grotesk/latin-400.css";
import "@fontsource/space-grotesk/latin-500.css";
import "@fontsource/space-grotesk/latin-600.css";
import "@fontsource/space-grotesk/latin-700.css";
import "@fontsource/jetbrains-mono/latin-300.css";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "@fontsource/jetbrains-mono/latin-600.css";
import "@fontsource/inter/latin-400.css";
import "@fontsource/inter/latin-500.css";
import "@fontsource/inter/latin-600.css";
import "@fontsource/inter/latin-700.css";
import "@fontsource/inter/latin-800.css";
