import { useEffect, useState } from "react";
import {
  education,
  experience,
  personalInfo,
  skills,
} from "../../data/portfolioData";

function TimelineItem({ date, title, description }) {
  return (
    <div className="timeline-item">
      <div className="circle-dot" />
      <h3 className="timeline-date">
        <i className="fa fa-calendar" aria-hidden="true" /> {date}
      </h3>
      <h4 className="timeline-title">{title}</h4>
      <p className="timeline-text">{description}</p>
    </div>
  );
}

function SkillBar({ name, percent, isActive }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setWidth(0); 
      return;
    }
    const timer = setTimeout(() => setWidth(percent), 500);
    return () => clearTimeout(timer);
  }, [isActive, percent]);

  return (
    <div className="skill-item padd-15">
      <h5>{name}</h5>
      <div className="progress">
        <div
          className="progress-in"
          style={{
            width: `${width}%`,
            transition: "width 1s ease-in-out",
          }}
        />
        <div className="skill-percent">{percent}%</div>
      </div>
    </div>
  );
}

export default function About({ isActive, isBack, isOpen, onHireMe }) {
  const classes = [
    "about",
    "section",
    isActive ? "active" : "",
    isBack ? "back-section" : "",
    isOpen ? "open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} id="about">
      <div className="container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>About Me</h2>
          </div>
        </div>

        <div className="row">
          <div className="about-content padd-15">
            <div className="row">
              <div className="about-text padd-15">
                <h3>
                  I&apos;m {personalInfo.name} and <span>Frontend Developer</span>
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos amet voluptas laboriosam repudiandae delectus
                  rerum nam, recusandae suscipit adipisci, porro illo. Eligendi
                  assumenda, qui quidem iste, aspernatur temporibus, obcaecati
                  repellendus ipsam itaque necessitatibus possimus eius saepe
                  optio nobis magni ipsum rem aperiam dolorum ullam laboriosam.
                </p>
              </div>
            </div> 

            <div className="row">
              <div className="personal-info padd-15">
                <div className="row">
                  <div className="info-item padd-15">
                    <p>
                      Birthday : <span>{personalInfo.birthday}</span>
                    </p>
                  </div>
                  <div className="info-item padd-15">
                    <p>
                      Age : <span>{personalInfo.age}</span>
                    </p>
                  </div>
                  <div className="info-item padd-15">
                    <p>
                      City : <span>{personalInfo.city}</span>
                    </p>
                  </div>
                  <div className="info-item padd-15">
                    <p>
                      Phone :{" "}
                      <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}>
                        {personalInfo.phone}
                      </a>
                    </p>
                  </div>
                  <div className="info-item padd-15">
                    <p>
                      Email :{" "}
                      <a
                        href={`mailto:${personalInfo.email}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {personalInfo.email}
                      </a>
                    </p>
                  </div>
                  
                  
                </div>
                <div className="row">
                  <div className="buttons padd-15">
                    <button className="btn hire-me" onClick={onHireMe}>
                      Hire Me
                    </button>
                  </div>
                </div>
              </div>

              <div className="skills padd-15">
                <div className="row">
                  {skills.map((skill) => (
                    <SkillBar key={skill.name} {...skill} isActive={isActive} />
                  ))}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="education padd-15">
                <h3 className="title">Education</h3>
                <div className="row">
                  <div className="timeline-box padd-15">
                    <div className="timeline shadow-dark">
                      {education.map((item) => (
                        <TimelineItem key={item.id} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="experience padd-15">
                <h3 className="title">Experience</h3>
                <div className="row">
                  <div className="timeline-box padd-15">
                    <div className="timeline shadow-dark">
                      {experience.map((item) => (
                        <TimelineItem key={item.id} {...item} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
