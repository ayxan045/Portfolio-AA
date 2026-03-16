import emailjs from "@emailjs/browser";
import { useCallback, useState } from "react";
import { personalInfo } from "../../data/portfolioData";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

const EMAILJS_SERVICE_ID = "service_kjn4188";
const EMAILJS_TEMPLATE_ID = "template_zl3a5q8";
const EMAILJS_PUBLIC_KEY = "-B9aW2AFopX-SK_SW";

export default function Contact({ isActive, isBack, isOpen }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus("sending");

      try {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            from_name: form.name,
            from_email: form.email,
            subject: form.subject,
            message: form.message,
          },
          EMAILJS_PUBLIC_KEY,
        );
        setStatus("success");
        setForm(INITIAL_FORM);
        setTimeout(() => setStatus("idle"), 5000);
      } catch (err) {
        console.error(err);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    },
    [form],
  );

  const classes = [
    "contact",
    "section",
    isActive ? "active" : "",
    isBack ? "back-section" : "",
    isOpen ? "open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} id="contact">
      <div className="container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>Contact Me</h2>
          </div>
        </div>

        <h3 className="contact-title padd-15">Have You Any Questions?</h3>
        <h4 className="contact-sub-title padd-15">I'M AT YOUR SERVICES</h4>

        <div className="row">
          <div className="contact-info-item padd-15">
            <div className="icon">
              <i className="fa fa-phone" aria-hidden="true" />
            </div>
            <h4>Call Us On</h4>
            <p>
              <a href={`tel:${personalInfo.phone.replace(/\s/g, "")}`}>
                {personalInfo.phone}
              </a>
            </p>
          </div>
          <div className="contact-info-item padd-15">
            <div className="icon">
              <i className="fa fa-map-marker-alt" aria-hidden="true" />
            </div>
            <h4>Office</h4>
            <p>{personalInfo.city}</p>
          </div>
          <div className="contact-info-item padd-15">
            <div className="icon">
              <i className="fa fa-envelope" aria-hidden="true" />
            </div>
            <h4>Email</h4>
            <p>
              <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
            </p>
          </div>
        </div>

        <h3 className="contact-title padd-15">SEND ME AN EMAIL</h3>
        <h4 className="contact-sub-title padd-15">
          I'M VERY RESPONSIVE TO MESSAGES
        </h4>

        <div className="row">
          <div className="contact-form padd-15">
            {status === "sending" && (
              <p style={{ color: "var(--skin-color)", marginBottom: 16 }}>
                ⏳ Göndərilir...
              </p>
            )}
            {status === "success" && (
              <p style={{ color: "#37b182", marginBottom: 16 }}>
                ✓ Mesaj göndərildi! Tezliklə cavab verəcəm.
              </p>
            )}
            {status === "error" && (
              <p style={{ color: "#ec1839", marginBottom: 16 }}>
                ✗ Xəta baş verdi. Yenidən cəhd et.
              </p>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                <div className="form-item col-6 padd-15">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-item col-6 padd-15">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-item col-12 padd-15">
                  <div className="form-group">
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-item col-12 padd-15">
                  <div className="form-group">
                    <textarea
                      name="message"
                      className="form-control"
                      placeholder="Message"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="form-item col-12 padd-15">
                  <button
                    type="submit"
                    className="btn"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Göndərilir..." : "Send Message"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
