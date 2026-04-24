import { BrowserRouter, Routes, Route } from "react-router-dom";
import EternalGrowthLanding from "./components/EternalGrowthLanding";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EternalGrowthLanding />} />
        <Route path="/eternalgrowth" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
