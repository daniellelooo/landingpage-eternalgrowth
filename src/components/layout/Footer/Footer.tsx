const Footer = () => {
  return (
    <footer className="footer" data-theme="dark">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">
              Eternal<span className="accent-serif">Growth</span>
            </h2>
            <p className="footer-tagline">
              Transformación digital para tu negocio
            </p>
            <button
              className="footer-about-link link-wipe"
              onClick={() => {
                window.location.href = "/eternalgrowth";
              }}
            >
              Nuestra historia
            </button>
          </div>

          <div className="footer-contact">
            <h3 className="footer-title micro-label">Contacto</h3>
            <div className="footer-links">
              <a
                className="footer-link link-wipe"
                href="mailto:eternalgrowth00@gmail.com"
              >
                eternalgrowth00@gmail.com
              </a>
              <a
                className="footer-link link-wipe"
                href="https://www.instagram.com/eternalgrowth__/"
                target="_blank"
                rel="noreferrer"
              >
                @eternalgrowth__
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 EternalGrowth — Medellín, Colombia. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
