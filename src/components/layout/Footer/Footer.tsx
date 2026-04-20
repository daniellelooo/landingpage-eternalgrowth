import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

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
            onClick={() => navigate("/eternalgrowth")}
          >
            Nuestra historia →
          </button>
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
