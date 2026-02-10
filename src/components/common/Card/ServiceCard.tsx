import { ServiceCard as ServiceCardType } from "../../../types";

const ServiceCard = ({ title, description }: ServiceCardType) => {
  return (
    <div className="service-card">
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-description">{description}</p>
      <div className="service-card-glow"></div>
    </div>
  );
};

export default ServiceCard;
