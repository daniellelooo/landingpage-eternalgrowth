import { useEffect, useState } from "react";
import CustomSelect from "../../common/Select";

const COUNTRY_OPTIONS = [
  { label: "CO +57", value: "+57" },
  { label: "MX +52", value: "+52" },
  { label: "US +1", value: "+1" },
  { label: "ES +34", value: "+34" },
  { label: "AR +54", value: "+54" },
  { label: "CL +56", value: "+56" },
  { label: "PE +51", value: "+51" },
];

const SERVICE_OPTIONS = [
  { label: "Desarrollo Web", value: "Desarrollo Web" },
  { label: "Automatización con n8n", value: "Automatizacion" },
  { label: "Marketing Digital", value: "Marketing Digital" },
  { label: "Consultoría y Diagnóstico", value: "Consultoria" },
  { label: "Paquete Semilla", value: "Paquete Semilla" },
  { label: "Paquete Escala", value: "Paquete Escala" },
  { label: "Paquete Impulso", value: "Paquete Impulso" },
  { label: "Paquete Universidad", value: "Paquete Universidad" },
  { label: "No sé, necesito orientación", value: "Orientacion" },
];

type SubmitStatus = "idle" | "loading" | "success" | "error";
const NEWS_CTA_STORAGE_KEY = "eternalgrowth_news_cta";

const Contact = () => {
  const [countryCode, setCountryCode] = useState("+57");
  const [serviceValue, setServiceValue] = useState("");
  const [messageValue, setMessageValue] = useState("");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const stored = window.localStorage.getItem(NEWS_CTA_STORAGE_KEY);

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as {
        descripcion_servicio?: string;
        servicio?: string;
      };

      if (parsed.servicio) {
        setServiceValue(parsed.servicio);
      }

      if (parsed.descripcion_servicio) {
        setMessageValue(parsed.descripcion_servicio);
      }
    } catch {
      // Ignore invalid stored data.
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitStatus("loading");
    setSubmitMessage("");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("request-failed");

      setSubmitStatus("success");
      setSubmitMessage("¡Listo! Te escribiremos muy pronto para coordinar tu diagnóstico.");
      form.reset();
      setCountryCode("+57");
      setServiceValue("");
      setMessageValue("");
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.");
    }
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">
            Agenda tu <span className="contact-title-accent">Diagnóstico Gratuito</span>
          </h2>
          <p className="contact-subtitle">
            30 minutos para entender tu negocio y mostrarte exactamente qué
            necesitas. Sin compromiso, sin tecnicismos.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Honeypot */}
          <input type="text" name="website" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

          <div className="contact-grid">
            <label className="contact-field">
              <span>Tu nombre</span>
              <input
                type="text"
                name="nombre"
                placeholder="Juan Gómez"
                autoComplete="name"
                required
              />
            </label>

            <label className="contact-field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                placeholder="tucorreo@empresa.com"
                autoComplete="email"
                required
              />
            </label>

            <div className="contact-field">
              <span>WhatsApp / Teléfono</span>
              <div className="contact-phone">
                <CustomSelect
                  name="telefono_pais"
                  label="Código de país"
                  options={COUNTRY_OPTIONS}
                  value={countryCode}
                  onChange={setCountryCode}
                  className="compact"
                  hideLabel
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="300 000 0000"
                  autoComplete="tel"
                />
              </div>
            </div>

            <CustomSelect
              name="servicio"
              label="¿Qué te interesa?"
              options={SERVICE_OPTIONS}
              value={serviceValue}
              placeholder="Selecciona una opción"
              required
              onChange={setServiceValue}
            />
          </div>

          <label className="contact-field contact-field-full">
            <span>Cuéntanos brevemente sobre tu negocio</span>
            <textarea
              name="mensaje"
              rows={4}
              placeholder="¿A qué se dedica tu negocio? ¿Qué problema quieres resolver?"
              value={messageValue}
              onChange={(event) => setMessageValue(event.target.value)}
              required
            />
          </label>

          <div className="contact-actions">
            <button
              type="submit"
              className="hero-cta-primary contact-submit"
              disabled={submitStatus === "loading"}
            >
              {submitStatus === "loading" ? "Enviando..." : "Agendar diagnóstico gratuito"}
            </button>
            <p className="contact-hint">
              Te confirmaremos por email en menos de 24 horas.
            </p>
            {submitMessage && (
              <p className={`contact-status contact-status-${submitStatus}`} role="status">
                {submitMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
