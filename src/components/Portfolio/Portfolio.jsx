import { useState } from "react";
// import { useProjects } from '../../hooks/useProjects';

function PortfolioCard({
  image,
  alt,
  title,
  description,
  technologies,
  githubLink,
  liveLink,
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="portfolio-item padd-15">
      <div
        className="portfolio-item-inner shadow-dark portfolioCard"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="portfolio-img">
          <img src={image} alt={alt} loading="lazy" />
        </div>

        <div className="overlay">
          <h4 className="overlayTitle">{title}</h4>
          <p className="overlayDesc">{description}</p>

          <div className="techList">
            {technologies.map((tech) => (
              <span key={tech} className="techBadge">
                {tech}
              </span>
            ))}
          </div>

          <div className="links">
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="btnGithub"
            >
              <i className="fab fa-github" /> GitHub
            </a>
            <a
              href={liveLink}
              target="_blank"
              rel="noreferrer"
              className="btnLive"
            >
              <i className="fa fa-external-link-alt" /> Live
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio({ isActive, isBack, isOpen, projects  }) {
  //  const { projects } = useProjects();
  const classes = [
    "portfolio",
    "section",
    isActive ? "active" : "",
    isBack ? "back-section" : "",
    isOpen ? "open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} id="portfolio">
      <div className="container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>Portfolio</h2>
          </div>
        </div>
        <div className="row">
          <div className="portfolio-heading padd-15">
            <h2>My Last Projects :</h2>
          </div>
        </div>
        <div className="row">
           {projects.map((item) => (  
            <PortfolioCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
