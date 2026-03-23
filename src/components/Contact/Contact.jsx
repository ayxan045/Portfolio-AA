
import emailjs from "@emailjs/browser";
import { useCallback, useState } from "react";
import { personalInfo } from "../../data/portfolioData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const INITIAL_FORM = { name: "", email: "", subject: "", message: "" };

const EMAILJS_SERVICE_ID = "service_kjn4188";
const EMAILJS_TEMPLATE_ID = "template_zl3a5q8";
const EMAILJS_PUBLIC_KEY = "-B9aW2AFopX-SK_SW";

export default function Contact({ isActive, isBack, isOpen }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState("idle");
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const newErrors = {};
      if (!form.name.trim()) newErrors.name = true;
      if (!form.email.trim() || !emailRegex.test(form.email))
        newErrors.email = true;
      if (!form.message.trim()) newErrors.message = true;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        toast.error("Zəhmət olmasa bütün məcburi sahələri düzgün doldurun.");
        return;
      }

      setErrors({});
      setStatus("sending");
      const loadingToast = toast.info("⏳ Göndərilir...", { autoClose: false });

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
        toast.dismiss(loadingToast);
        toast.success("Mesaj göndərildi! Tezliklə cavab verəcəm.");
        setForm(INITIAL_FORM);
      } catch (err) {
        console.error(err);
        toast.dismiss(loadingToast);
        toast.error("✗ Xəta baş verdi. Yenidən cəhd et.");
      } finally {
        setStatus("idle");
      }
    },
    [form],
  );

  const classes = [
    "contact",
    "section",
    isActive && "active",
    isBack && "back-section",
    isOpen && "open",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes} id="contact">
      <ToastContainer />
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
                      style={errors.name ? { border: "1px solid #ec1839" } : {}}
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
                      style={
                        errors.email ? { border: "1px solid #ec1839" } : {}
                      }
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
                      style={
                        errors.message ? { border: "1px solid #ec1839" } : {}
                      }
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
