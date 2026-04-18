import EternalGrowthLanding from "./components/EternalGrowthLanding";
import NewsPage from "./components/sections/News/NewsPage";

function App() {
  if (window.location.pathname === "/news" || window.location.pathname === "/news/") {
    return <NewsPage />;
  }

  return <EternalGrowthLanding />;
}

export default App;
