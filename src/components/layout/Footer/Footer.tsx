import { SocialLink } from "../../../types";

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Email",
    url: "mailto:eternalgrowth00@gmail.com",
    icon: (
      <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
  {
    name: "@eternalgrowth__",
    url: "https://www.instagram.com/eternalgrowth__/",
    icon: (
      <svg className="footer-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer id="contacto" className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2 className="footer-logo">EternalGrowth</h2>
          <p className="footer-tagline">
            Transformación digital para tu negocio
          </p>
        </div>

        <div className="footer-contact">
          <h3 className="footer-title">Contáctanos</h3>
          <div className="footer-links">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                className="footer-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
                {link.name === "Email"
                  ? "eternalgrowth00@gmail.com"
                  : link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2025 EternalGrowth. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
