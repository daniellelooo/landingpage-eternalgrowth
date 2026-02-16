import { useState } from "react";
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
  { label: "Automatizacion", value: "Automatizacion" },
  { label: "Consultoria", value: "Consultoria" },
  { label: "Marketing Digital", value: "Marketing Digital" },
  { label: "Otro", value: "Otro" },
];

const CONTACT_METHOD_OPTIONS = [
  { label: "Email", value: "email" },
  { label: "WhatsApp", value: "whatsapp" },
  { label: "Llamada", value: "llamada" },
];

type SubmitStatus = "idle" | "loading" | "success" | "error";

const Contact = () => {
  const [countryCode, setCountryCode] = useState("+57");
  const [serviceValue, setServiceValue] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus("loading");
    setSubmitMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("request-failed");
      }

      setSubmitStatus("success");
      setSubmitMessage(
        "Recibimos tu informacion. Te enviaremos un correo de confirmacion.",
      );
      event.currentTarget.reset();
      setCountryCode("+57");
      setServiceValue("");
      setContactMethod("email");
    } catch (error) {
      setSubmitStatus("error");
      setSubmitMessage(
        "No pudimos enviar tu solicitud. Intenta nuevamente en unos minutos.",
      );
    }
  };

  return (
    <section id="contacto" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Hablemos de Tu Proyecto</h2>
          <p className="contact-subtitle">
            Cuentanos lo que necesitas y prepararemos una propuesta a la medida.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-grid">
            <label className="contact-field">
              <span>Nombre completo</span>
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
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
              <span>Telefono</span>
              <div className="contact-phone">
                <CustomSelect
                  name="telefono_pais"
                  label="Codigo de pais"
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

            <label className="contact-field">
              <span>Empresa</span>
              <input
                type="text"
                name="empresa"
                placeholder="Nombre de tu empresa"
                autoComplete="organization"
                required
              />
            </label>

            <CustomSelect
              name="servicio"
              label="Servicio de interes"
              options={SERVICE_OPTIONS}
              value={serviceValue}
              placeholder="Selecciona una opcion"
              required
              onChange={setServiceValue}
            />

            <CustomSelect
              name="contacto_preferido"
              label="Metodo de contacto preferido"
              options={CONTACT_METHOD_OPTIONS}
              value={contactMethod}
              onChange={setContactMethod}
            />
          </div>

          <label className="contact-field contact-field-full">
            <span>Descripcion del servicio que deseas contratar</span>
            <textarea
              name="descripcion_servicio"
              rows={4}
              placeholder="Describe el servicio o proyecto que necesitas"
              required
            />
          </label>

          <label className="contact-field contact-field-full">
            <span>Descripcion de tu empresa</span>
            <textarea
              name="descripcion_empresa"
              rows={4}
              placeholder="Cuentanos sobre tu empresa, industria y objetivos"
              required
            />
          </label>

          <div className="contact-actions">
            <button
              type="submit"
              className="hero-cta-primary contact-submit"
              disabled={submitStatus === "loading"}
            >
              Enviar solicitud
            </button>
            <p className="contact-hint">
              Te enviaremos un correo de confirmacion al recibir tu solicitud.
            </p>
            {submitMessage && (
              <p
                className={`contact-status contact-status-${submitStatus}`}
                role="status"
              >
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
