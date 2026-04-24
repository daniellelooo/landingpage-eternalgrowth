import EternalGrowthLanding from "./components/EternalGrowthLanding";
import AboutPage from "./pages/AboutPage";
import NewsPage from "./components/sections/News/NewsPage";

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

  return <EternalGrowthLanding />;
}

export default App;
