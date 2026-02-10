import { ServiceCard as ServiceCardType } from "../../../types";
import ServiceCard from "../../common/Card/ServiceCard.tsx";

const SERVICES: ServiceCardType[] = [
  {
    title: "Desarrollo Web",
    description:
      "Creación de páginas web modernas y funcionales para tu negocio.",
  },
  {
    title: "Automatización",
    description:
      "Implementación de herramientas para optimizar procesos y ahorrar tiempo.",
  },
  {
    title: "Capacitación Digital",
    description:
      "Formación en tecnología y marketing digital para equipos y emprendedores.",
  },
  {
    title: "Consultoría",
    description:
      "Asesoría personalizada para la transformación digital de tu empresa.",
  },
  {
    title: "Marketing Digital",
    description:
      "Estrategias de marketing digital para aumentar la visibilidad y atraer clientes.",
  },
  {
    title: "Rebranding",
    description:
      "Renovación de la imagen y comunicación de tu marca para destacar en el mercado.",
  },
];

const Services = () => {
  return (
    <section id="servicios" className="services-section">
      <div className="services-container">
        <h2 className="services-title">Nuestros Servicios</h2>
        <div className="services-list">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
