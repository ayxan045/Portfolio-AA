import { personalInfo } from "../../data/portfolioData";
import { useTyped } from "../../hooks/useTyped";
import cvFile from "../../assets/public/AykhanAhmadov-CV.pdf";

export default function Home({ isActive, isBack, isOpen }) {
  const typedRef = useTyped(personalInfo.title);

  const classes = [
    "home",
    "section",
    isActive ? "active" : "",
    isBack ? "back-section" : "",
    isOpen ? "open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} id="home">
      <div className="container">
        <div className="row">
          <div className="home-info padd-15">
            <h3 className="hello">
              Hello, my name is{" "}
              <span className="name">{personalInfo.name}</span>
            </h3>
            <h3 className="my-profession">
              I&apos;m a <span className="typing" ref={typedRef} />
            </h3>
            <p>{personalInfo.bio}</p>
            <a href={cvFile} download className="btn">
              Download CV
            </a>
          </div>

          <div className="home-img padd-15">
            <div className="home-img-box">
              <div className="content">
                <img src={personalInfo.photo} alt={personalInfo.name} />
                <h2>{personalInfo.name}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
