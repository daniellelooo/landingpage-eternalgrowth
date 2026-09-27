import { ProyectoPortafolio, dominioDe, imagenesDe } from "../../../data/portafolio";

interface MockupProyectoProps {
  proyecto: ProyectoPortafolio;
  // Ancho con el que se pinta cada captura, para que el navegador elija el
  // archivo justo (atributo `sizes`).
  tamanoEscritorio: string;
  tamanoCelular: string;
  // Solo la primera captura visible de la página se carga con prioridad.
  prioritaria?: boolean;
}

// Captura de escritorio en una ventana sobria, con la del celular encima.
// Los tres cuadritos de la barra son el píxel del logo, no los botones de macOS.
const MockupProyecto = ({
  proyecto,
  tamanoEscritorio,
  tamanoCelular,
  prioritaria = false,
}: MockupProyectoProps) => {
  const imagenes = imagenesDe(proyecto);
  const carga = prioritaria ? "eager" : "lazy";

  return (
    <div className="mockup">
      <div className="mockup-escritorio">
        <div className="mockup-barra" aria-hidden="true">
          <span className="mockup-pixeles">
            <span className="pixel" />
            <span className="pixel" />
            <span className="pixel" />
          </span>
          <span className="mockup-url">{dominioDe(proyecto.url)}</span>
        </div>
        <img
          className="mockup-captura"
          src={imagenes.escritorio.src}
          srcSet={imagenes.escritorio.srcSet}
          sizes={tamanoEscritorio}
          alt={proyecto.alt}
          width={1440}
          height={900}
          loading={carga}
          fetchPriority={prioritaria ? "high" : undefined}
          decoding="async"
        />
      </div>
      <div className="mockup-celular" aria-hidden="true">
        <img
          className="mockup-captura"
          src={imagenes.celular.src}
          srcSet={imagenes.celular.srcSet}
          sizes={tamanoCelular}
          alt=""
          width={390}
          height={844}
          loading={carga}
          decoding="async"
        />
      </div>
    </div>
  );
};

export default MockupProyecto;
