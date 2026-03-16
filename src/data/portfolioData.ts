import type {
  PersonalInfo,
  Skill,
  TimelineItem,
  Service,
  PortfolioItem,
  SkinColor,
  NavItem,
} from "../types";

import profilePhoto from "../assets/images/AykhanAhmadov.jpeg";
import portfolio1 from "../assets/images/portfolio/20170308151602.jpg";
import portfolio2 from "../assets/images/portfolio/34e4f89145a25072f7f427c7e3bf67eeba358684.jpg";
import portfolio3 from "../assets/images/portfolio/5739e3027778e.jpeg";
import portfolio4 from "../assets/images/portfolio/Logos-Website-Graphic-Design-Product-Design-Naming-More-crowdspring-2-917x556.jpg";
import portfolio5 from "../assets/images/portfolio/page-destination-conception-sites-web-dessin-anime_52683-70880.webp";
import portfolio6 from "../assets/images/portfolio/wcorg_homepage_hero_screen1_EN.jpg";

// Personal Info
export const personalInfo: PersonalInfo = {
  name: "Aykhan Ahmadov",
  title: ["Web Developer", "Front-end Developer"],
  bio: "I'm a web front-end developer with extensive experience for over 1 years. My expertise is to create and build websites.",
  birthday: "26 Oct 1997",
  age:
    new Date().getFullYear() -
    1997 -
    (new Date() < new Date(new Date().getFullYear(), 9, 26) ? 1 : 0),
  email: "aykhanahmadov777@gmail.com",
  phone: "+994 77 737 97 37",
  city: "Baku",
  photo: profilePhoto,
};

// Skills
export const skills: Skill[] = [
  { name: "HTML", percent: 85 },
  { name: "CSS", percent: 80 },
  { name: "Bootstrap", percent: 50 },
  { name: "Tailwindcss", percent: 30 },
  { name: "JS", percent: 46 },
  { name: "React", percent: 36 },
];

// Education
export const education: TimelineItem[] = [
  {
    id: 1,
    date: "2015 - 2019",
    title: "MDU",
    description: "İnformasiya texnologiyaları və sistemləri mühəndisliyi",
  },
  {
    id: 2,
    date: "07.2022 - 10.2022",
    title: "SOCIAL INNOVATION LAB",
    description: "Front-end Web Development",
  },
];

// Experience
export const experience: TimelineItem[] = [
  {
    id: 1,
    date: "03.2024 - 08.2024",
    title: "AZERBAIJAN DIGITAL ARTS SCHOOL",
    description: "Front-end Developer",
  },
];

// Services
export const services: Service[] = [
  {
    id: 1,
    icon: "fa fa-mobile-alt",
    title: "Web Design",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 2,
    icon: "fa fa-laptop-code",
    title: "Web Development",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 3,
    icon: "fa fa-palette",
    title: "UI/UX Design",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 4,
    icon: "fa fa-code",
    title: "Frontend Code",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 5,
    icon: "fa fa-search",
    title: "SEO",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
  {
    id: 6,
    icon: "fa fa-bullhorn",
    title: "Marketing",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  },
];

// Portfolio Items
export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    image: portfolio1,
    alt: "Project 1",
    title: "E-Commerce Website",
    description:
      "Modern bir e-ticarət saytı. HTML, CSS və JavaScript ilə hazırlanmışdır.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubLink: "https://github.com",
    liveLink: "https://example.com",
  },
  {
    id: 2,
    image: portfolio2,
    alt: "Project 2",
    title: "Portfolio Website",
    description: "Şəxsi portfolio saytı. React ilə hazırlanmışdır.",
    technologies: ["React", "CSS"],
    githubLink: "https://github.com",
    liveLink: "https://example.com",
  },
  {
    id: 3,
    image: portfolio3,
    alt: "Project 3",
    title: "Restaurant Landing Page",
    description: "Restoran üçün landing page. Responsive dizayn.",
    technologies: ["HTML", "CSS", "Bootstrap"],
    githubLink: "https://github.com",
    liveLink: "https://example.com",
  },
  {
    id: 4,
    image: portfolio4,
    alt: "Project 4",
    title: "Logo Design",
    description: "Müxtəlif brendlər üçün logo dizaynları.",
    technologies: ["Figma", "Adobe XD"],
    githubLink: "https://github.com",
    liveLink: "https://example.com",
  },
  {
    id: 5,
    image: portfolio5,
    alt: "Project 5",
    title: "Animated Website",
    description: "CSS animasiyaları ilə hazırlanmış müasir sayt.",
    technologies: ["HTML", "CSS", "JavaScript"],
    githubLink: "https://github.com",
    liveLink: "https://example.com",
  },
  {
    id: 6,
    image: portfolio6,
    alt: "Project 6",
    title: "WordPress Site",
    description: "WordPress əsaslı korporativ sayt.",
    technologies: ["WordPress", "PHP", "CSS"],
    githubLink: "https://github.com",
    liveLink: "https://example.com",
  },
];

// Theme Skins
export const skinColors: SkinColor[] = [
  { id: "color-1", value: "#ec1839" },
  { id: "color-2", value: "#fa5b0f" },
  { id: "color-3", value: "#37b182" },
  { id: "color-4", value: "#1854b4" },
  { id: "color-5", value: "#57534D" },
];

// Nav Items
export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "fa fa-home" },
  { id: "about", label: "About", icon: "fa fa-user" },
  { id: "services", label: "Services", icon: "fa fa-list" },
  { id: "portfolio", label: "Portfolio", icon: "fa fa-briefcase" },
  { id: "contact", label: "Contact", icon: "fa fa-comments" },
];
