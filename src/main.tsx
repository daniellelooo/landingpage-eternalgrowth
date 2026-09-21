import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./fonts";
import "./index.css";

const container = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// En producción el HTML ya viene con el contenido de la página (prerender):
// se hidrata. En desarrollo el contenedor llega vacío y se renderiza normal.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
