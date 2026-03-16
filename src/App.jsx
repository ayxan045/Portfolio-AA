import { Routes, Route } from "react-router-dom";
import AdminPanel from "./components/admin/AdminPanel";
import { useProjects } from "./hooks/useProjects";
import { useCallback, useState } from "react";
// import './styles/index.css';
// import './css/main.css';

import { useActiveSection } from "./hooks/useActiveSection";
import { useTheme } from "./hooks/useTheme";

import About from "./components/About/About";
import Aside from "./components/Aside/Aside";
import Contact from "./components/Contact/Contact";
import Home from "./components/Home/Home";
import Portfolio from "./components/Portfolio/Portfolio";
import Services from "./components/Services/Services";
import StyleSwitcher from "./components/StyleSwitcher/StyleSwitcher";

export default function App() {
  const { isDark, toggleDark, skinColor, setSkinColor } = useTheme();
  const { activeSection, prevSection, navigateTo } = useActiveSection("home");
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const [asideOpen, setAsideOpen] = useState(false);
  const handleNavigate = useCallback(
    (sectionId) => {
      navigateTo(sectionId);
      if (window.innerWidth < 1200) {
        setAsideOpen(false);
      }
    },
    [navigateTo],
  );

  const handleHireMe = useCallback(() => {
    navigateTo("contact");
    if (window.innerWidth < 1200) {
      setAsideOpen(false);
    }
  }, [navigateTo]);

  const toggleAside = useCallback(() => setAsideOpen((prev) => !prev), []);

  const isBack = (sectionId) => sectionId === prevSection;

  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <AdminPanel
            projects={projects}
            addProject={addProject}
            updateProject={updateProject}
            deleteProject={deleteProject}
          />
        }
      />
      <Route
        path="/*"
        element={
          <div className="main-container">
            <Aside
              activeSection={activeSection}
              onNavigate={handleNavigate}
              isOpen={asideOpen}
              onToggle={toggleAside}
            />
            <div className="main-content">
              <Home
                isActive={activeSection === "home"}
                isBack={isBack("home")}
                isOpen={asideOpen}
              />
              <About
                isActive={activeSection === "about"}
                isBack={isBack("about")}
                isOpen={asideOpen}
                onHireMe={handleHireMe}
              />
              <Services
                isActive={activeSection === "services"}
                isBack={isBack("services")}
                isOpen={asideOpen}
              />
              <Portfolio
                isActive={activeSection === "portfolio"}
                isBack={isBack("portfolio")}
                isOpen={asideOpen}
                projects={projects}
              />
              <Contact
                isActive={activeSection === "contact"}
                isBack={isBack("contact")}
                isOpen={asideOpen}
              />
            </div>
            <StyleSwitcher
              isDark={isDark}
              onToggleDark={toggleDark}
              skinColor={skinColor}
              onSkinChange={setSkinColor}
            />
          </div>
        }
      />
    </Routes>
  );
}
