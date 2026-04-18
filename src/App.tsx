import EternalGrowthLanding from "./components/EternalGrowthLanding";
import NewsPage from "./components/sections/News/NewsPage";

function App() {
  const pathname = window.location.pathname;

  if (pathname === "/news" || pathname === "/news/") {
    return <NewsPage />;
  }

  if (pathname.startsWith("/news/")) {
    const slug = pathname.slice("/news/".length).replace(/\/+$/, "");
    return <NewsPage initialSlug={slug} />;
  }

  return <EternalGrowthLanding />;
}

export default App;
