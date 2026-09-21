import { Analytics } from "@vercel/analytics/react";
import EternalGrowthLanding from "./components/EternalGrowthLanding";
import AboutPage from "./pages/AboutPage";
import NewsPage from "./components/sections/News/NewsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { NEWS_BASE_PATH, getNewsBySlug } from "./data/news";
import { SERVICIOS_BASE_PATH, getServicioBySlug } from "./data/servicios";
import ServicioPage from "./pages/ServicioPage";
import { normalizePath } from "./seo/meta";

interface AppProps {
  // El build le pasa la ruta al generar el HTML de cada página; en el
  // navegador sale de la barra de direcciones.
  pathname?: string;
}

const renderPage = (path: string) => {
  if (path === "/") return <EternalGrowthLanding />;
  if (path === "/eternalgrowth") return <AboutPage />;
  if (path === NEWS_BASE_PATH) return <NewsPage />;

  if (path.startsWith(`${SERVICIOS_BASE_PATH}/`)) {
    const servicio = getServicioBySlug(path.slice(SERVICIOS_BASE_PATH.length + 1));
    return servicio ? <ServicioPage servicio={servicio} /> : <NotFoundPage />;
  }

  if (path.startsWith(`${NEWS_BASE_PATH}/`)) {
    const slug = path.slice(NEWS_BASE_PATH.length + 1);
    return getNewsBySlug(slug) ? <NewsPage initialSlug={slug} /> : <NotFoundPage />;
  }

  return <NotFoundPage />;
};

function App({ pathname }: AppProps) {
  const path = normalizePath(pathname ?? window.location.pathname);

  return (
    <>
      {renderPage(path)}
      <Analytics />
    </>
  );
}

export default App;
