import { ServiceCard as ServiceCardType } from "../../../types";

const ServiceCard = ({
  title,
  description,
  icon,
  details,
}: ServiceCardType) => {
  return (
    <div className="service-card">
      {icon && <div className="service-card-icon">{icon}</div>}
      <h3 className="service-card-title">{title}</h3>
      <p className="service-card-description">{description}</p>
      {details && details.length > 0 && (
        <ul className="service-card-details">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      )}
      <div className="service-card-glow"></div>
    </div>
  );
};

export default ServiceCard;
