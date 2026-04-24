const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">EternalGrowth</h2>
          <p className="footer-tagline">
            Transformación digital para tu negocio
          </p>
          <button
            className="footer-about-link"
            onClick={() => { window.location.href = "/eternalgrowth"; }}
          >
            Nuestra historia →
          </button>
        </div>

        <div className="footer-contact">
          <h3 className="footer-title">Contacto</h3>
          <div className="footer-links">
            <a className="footer-link" href="mailto:eternalgrowth00@gmail.com">
              <svg
                className="footer-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
                <polyline points="22,8 12,13 2,8" />
              </svg>
              eternalgrowth00@gmail.com
            </a>
            <a
              className="footer-link"
              href="https://www.instagram.com/eternalgrowth__/"
              target="_blank"
              rel="noreferrer"
            >
              <svg
                className="footer-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37a4 4 0 1 1-2.34-2.34" />
                <circle cx="17.5" cy="6.5" r="1" />
              </svg>
              @eternalgrowth__
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2026 EternalGrowth. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
