import "./NotFoundPage.css";

const NotFoundPage = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-content">
        <p className="notfound-code">404</p>
        <h1 className="notfound-title">Página no encontrada</h1>
        <p className="notfound-desc">
          La página que buscas no existe o fue movida.
        </p>
        <button
          className="notfound-btn"
          onClick={() => { window.location.href = "/"; }}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
