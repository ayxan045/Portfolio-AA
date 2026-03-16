import { services } from "../../data/portfolioData";

function ServiceCard({ icon, title, description }) {
  return (
    <div className="service-item padd-15">
      <div className="service-item-inner">
        <div className="icon">
          <i className={`fa ${icon}`} aria-hidden="true" />
        </div>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function Services({ isActive, isBack, isOpen }) {
  const classes = [
    "service",
    "section",
    isActive ? "active" : "",
    isBack ? "back-section" : "",
    isOpen ? "open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} id="services">
      <div className="container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>Services</h2>
          </div>
        </div>
        <div className="row">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
