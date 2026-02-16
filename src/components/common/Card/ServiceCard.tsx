import { ServiceCard as ServiceCardType } from "../../../types";

const ServiceCard = ({
  title,
  description,
  icon,
  details,
}: ServiceCardType) => {
  const detailsContent = (
    <>
      <p className="service-card-description">{description}</p>
      {details && details.length > 0 && (
        <ul className="service-card-details">
          {details.map((detail, index) => (
            <li key={index}>{detail}</li>
          ))}
        </ul>
      )}
    </>
  );

  return (
    <div className="service-card">
      {icon && (
        <div className="service-card-icon-wrapper">
          <div className="service-card-icon">{icon}</div>
        </div>
      )}
      <h3 className="service-card-title">{title}</h3>
      <div className="service-card-content">{detailsContent}</div>
      <details className="card-details">
        <summary className="card-summary">Mas informacion</summary>
        <div className="card-details-content">{detailsContent}</div>
      </details>
      <div className="service-card-glow"></div>
    </div>
  );
};

export default ServiceCard;
