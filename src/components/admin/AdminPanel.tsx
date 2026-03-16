import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { PortfolioItem } from "../../types";

interface AdminPanelProps {
  projects: PortfolioItem[];
  addProject: (project: Omit<PortfolioItem, "id">) => void;
  updateProject: (id: string, data: Omit<PortfolioItem, "id">) => void;
  deleteProject: (id: string) => void;
}

const EMPTY_FORM = {
  title: "",
  description: "",
  technologies: "",
  githubLink: "",
  liveLink: "",
  image: "",
  alt: "",
};

type FormState = typeof EMPTY_FORM;

const ADMIN_PASSWORD = "admin123";

export default function AdminPanel({
  projects,
  addProject,
  updateProject,
  deleteProject,
}: AdminPanelProps) {
  const navigate = useNavigate();

  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState(false);

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleLogin = useCallback(() => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  }, [password]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const validate = (f: FormState): boolean => {
    if (!f.title.trim()) {
      setFormError("Başlıq boş ola bilməz");
      return false;
    }
    if (!f.description.trim()) {
      setFormError("Açıqlama boş ola bilməz");
      return false;
    }
    if (!f.technologies.trim()) {
      setFormError("Texnologiyalar boş ola bilməz");
      return false;
    }
    if (!f.githubLink.trim()) {
      setFormError("GitHub linki boş ola bilməz");
      return false;
    }
    if (!f.liveLink.trim()) {
      setFormError("Live linki boş ola bilməz");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate(form)) return;

      const data: Omit<PortfolioItem, "id"> = {
        title: form.title.trim(),
        description: form.description.trim(),
        technologies: form.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        githubLink: form.githubLink.trim(),
        liveLink: form.liveLink.trim(),
        image: form.image.trim() || "https://placehold.co/600x400",
        alt: form.title.trim(),
      };

      if (editId) {
        updateProject(editId, data);
        setEditId(null);
      } else {
        addProject(data);
      }

      setForm(EMPTY_FORM);
      setShowForm(false);
    },
    [form, editId, addProject, updateProject],
  );

  const handleEdit = useCallback((project: PortfolioItem) => {
    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      githubLink: project.githubLink,
      liveLink: project.liveLink,
      image: project.image,
      alt: project.alt,
    });
    setEditId(project.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleCancel = useCallback(() => {
    setForm(EMPTY_FORM);
    setEditId(null);
    setFormError("");
    setShowForm(false);
  }, []);

  if (!authed) {
    return (
      <div className="admin-loginWrapper">
        <div className="admin-loginBox">
          <h2 className="admin-loginTitle">Admin Panel</h2>
          <input
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="admin-loginInput"
          />
          {authError && <p className="admin-error">Şifrə yanlışdır</p>}
          <button onClick={handleLogin} className="admin-btnPrimary">
            Daxil ol
          </button>
          <button onClick={() => navigate("/")} className="admin-btnSecondary">
            ← Geri qayıt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      <header className="admin-header">
        <h1 className="admin-headerTitle">
          <i className="fa fa-cog"></i> Admin Panel
        </h1>
        <div className="admin-headerActions">
          <button
            className="admin-btnPrimary"
            onClick={() => {
              setShowForm(true);
              setEditId(null);
              setForm(EMPTY_FORM);
            }}
          >
            <i className="fa fa-plus"></i> Yeni Layihə
          </button>
          <button className="admin-btnSecondary" onClick={() => navigate("/")}>
            ← Sayta qayıt
          </button>
        </div>
      </header>

      {showForm && (
        <div className="admin-formCard">
          <h3 className="admin-formTitle">
            {editId ? "Layihəni Redaktə Et" : "Yeni Layihə Əlavə Et"}
          </h3>
          {formError && <p className="admin-error">{formError}</p>}
          <form onSubmit={handleSubmit} className="admin-form">
            <div className="admin-formRow">
              <div className="admin-formGroup">
                <label>Layihə adı *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Məs: E-Commerce Website"
                  className="admin-input"
                />
              </div>
              <div className="admin-formGroup">
                <label>
                  Texnologiyalar * <span>(vergüllə ayır)</span>
                </label>
                <input
                  name="technologies"
                  value={form.technologies}
                  onChange={handleChange}
                  placeholder="Məs: React, TypeScript, CSS"
                  className="admin-input"
                />
              </div>
            </div>

            <div className="admin-formGroup">
              <label>Açıqlama *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Layihə haqqında qısa məlumat..."
                className="admin-textarea"
                rows={3}
              />
            </div>

            <div className="admin-formRow">
              <div className="admin-formGroup">
                <label>GitHub linki *</label>
                <input
                  name="githubLink"
                  value={form.githubLink}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="admin-input"
                />
              </div>
              <div className="admin-formGroup">
                <label>Live demo linki *</label>
                <input
                  name="liveLink"
                  value={form.liveLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="admin-input"
                />
              </div>
            </div>

            <div className="admin-formGroup">
              <label>
                Şəkil URL{" "}
                <span>(boş buraxsanız placeholder istifadə olunur)</span>
              </label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className="admin-input"
              />
            </div>

            <div className="admin-formActions">
              <button type="submit" className="admin-btnPrimary">
                {editId ? (
                  <>
                    <i className="fa fa-save"></i> Yadda saxla
                  </>
                ) : (
                  <>
                    <i className="fa fa-plus"></i> Əlavə et
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="admin-btnSecondary"
              >
                Ləğv et
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="admin-tableCard">
        <h3 className="admin-tableTitle">
          Layihələr <span>({projects.length})</span>
        </h3>
        {projects.length === 0 ? (
          <p className="admin-empty">Heç bir layihə yoxdur.</p>
        ) : (
          <div className="admin-tableWrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Şəkil</th>
                  <th>Ad</th>
                  <th>Texnologiyalar</th>
                  <th>Linklər</th>
                  <th>Əməliyyatlar</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <img
                        src={project.image}
                        alt={project.alt}
                        className="admin-thumb"
                      />
                    </td>
                    <td>
                      <strong>{project.title}</strong>
                      <p className="admin-desc">{project.description}</p>
                    </td>
                    <td>
                      <div className="admin-techList">
                        {project.technologies.map((t) => (
                          <span key={t} className="admin-techBadge">
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="admin-linkList">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-github"></i> GitHub
                        </a>
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-external-link-alt"></i> Live
                        </a>
                      </div>
                    </td>
                    <td>
                      <div className="admin-actions">
                        <button
                          onClick={() => handleEdit(project)}
                          className="admin-btnEdit"
                        >
                          <i className="fa fa-edit"></i> Redaktə
                        </button>
                        {deleteConfirmId === project.id ? (
                          <div className="admin-confirmBox">
                            <span>Əminsiniz?</span>
                            <button
                              onClick={() => {
                                deleteProject(project.id);
                                setDeleteConfirmId(null);
                              }}
                              className="admin-btnDelete"
                            >
                              Bəli
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(null)}
                              className="admin-btnSecondary"
                            >
                              Xeyr
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirmId(project.id)}
                            className="admin-btnDelete"
                          >
                            <i className="fa fa-trash"></i> Sil
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
