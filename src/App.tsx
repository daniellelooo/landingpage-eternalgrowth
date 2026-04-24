import EternalGrowthLanding from "./components/EternalGrowthLanding";
import AboutPage from "./pages/AboutPage";
import NewsPage from "./components/sections/News/NewsPage";
import NotFoundPage from "./pages/NotFoundPage";

const KNOWN_ROUTES = ["/", "/blog", "/blog/", "/eternalgrowth", "/eternalgrowth/"];

function App() {
  const pathname = window.location.pathname;

  if (pathname === "/blog" || pathname === "/blog/") {
    return <NewsPage />;
  }

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.slice("/blog/".length).replace(/\/+$/, "");
    return <NewsPage initialSlug={slug} />;
  }

  if (pathname === "/eternalgrowth" || pathname === "/eternalgrowth/") {
    return <AboutPage />;
  }

  if (pathname === "/" || pathname === "") {
    return <EternalGrowthLanding />;
  }

  if (!KNOWN_ROUTES.includes(pathname)) {
    return <NotFoundPage />;
  }

  return <EternalGrowthLanding />;
}

export default App;
