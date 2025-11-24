import type { NavItem, ExperienceItem, ProjectItem, SkillCategory, CertificationItem, LeadershipItem } from './types';
import { Trophy, Users, Flag, Medal } from 'lucide-react';

export const SOCIAL_LINKS = {
  github: "https://github.com/ShreyasPathe",
  linkedin: "https://www.linkedin.com/in/shreyas-pathe/",
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=patheshreyas7@gmail.com"
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', to: 'about' },
  { label: 'Experience', to: 'experience' },
  { label: 'Projects', to: 'projects' },
  { label: 'Skills', to: 'skills' },
  { label: 'Certifications', to: 'certifications' },
  { label: 'Contact', to: 'contact' },
];

export const ABOUT_TEXT = "I am a technology enthusiast and an IT Engineer with a strong passion for building modern, scalable, and user-friendly digital experiences. I specialize in full stack development using the MERN stack and love crafting seamless, tech-driven solutions with a focus on performance, design, and usability. I love building conversion-friendly websites and have extensive experience building Shopify and WordPress based solutions alongside custom web applications. I enjoy working on challenging problems, learning new technologies, and creating products that make an impact.";

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    title: "Website Development Intern",
    company: "The Work Journals",
    period: "Aug 2025 – Nov 2025",
    description: [
      "Built and launched 6+ production-ready websites leveraging PHP, Shopify Liquid, and WordPress, with complete ownership of development, deployment, and hosting infrastructure.",
      "Delivered end-to-end web solutions for global clients, including BareNue (women’s lingerie brand, ₹1L+ monthly sales via website), KlearProp (Mumbai-based brokerage, 10,000+ website visitors, multiple leads converted via website), TheTurquoiseWeddings (Canada-based complete wedding planners), and VJCC Culinary Arts (Dubai-based culinary institute), from concept to live deployment.",
      "Collaborated directly with clients for requirement gathering, UI/UX refinement, and performance tuning, providing ongoing technical support and issue resolution to ensure scalability, reliability, and 100% client satisfaction."
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    title: "AI Finance Dashboard",
    category: "Next.js & AI",
    description: "A modern full-stack personal finance dashboard with AI-based receipt scanning via Google Gemini API, secure Auth (Clerk), and dynamic data visualization.",
    tags: ["Next.js 15", "Supabase", "Gemini AI", "Inngest"],
    image: "/images/financeai64.png",
    liveUrl: "https://financeai64.xyz" 
  },
  {
    title: "Edemy LMS",
    category: "Full Stack",
    description: "A comprehensive Learning Management System for creating and consuming courses, featuring Stripe payments and Cloudinary media management.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    image: "/images/edemy.png",
    liveUrl: "https://lms-edemy-8xy7.vercel.app"
  },
  {
    title: "BareNue",
    category: "Shopify",
    description: "Women's lingerie brand platform driving ₹1L+ monthly sales. Built with custom Shopify Liquid modules for a seamless shopping experience.",
    tags: ["Shopify", "Liquid", "E-Commerce"],
    image: "/images/barenue.png",
    liveUrl: "https://barenue.in"
  },
  {
    title: "KlearProp",
    category: "WordPress",
    description: "Mumbai-based real estate brokerage platform handling 10,000+ visitors. optimized for lead generation and high-performance.",
    tags: ["WordPress", "PHP", "Lead Gen"],
    image: "/images/klearprop.png",
    liveUrl: "https://klearprop.com"
  },
  {
    title: "The Turquoise Weddings",
    category: "WordPress",
    description: "International wedding planner portfolio for clients in Europe, Canada, and India, featuring a visually rich custom theme.",
    tags: ["WordPress", "Design", "Portfolio"],
    image: "/images/turquoise.png",
    liveUrl: "https://theturquoiseweddings.com"
  },
  {
    title: "VJCC Culinary Arts",
    category: "Shopify",
    description: "Dubai-based culinary institute platform acting as a hybrid e-commerce store for courses and merchandise.",
    tags: ["Shopify", "Education", "Web Design"],
    image: "/images/vjcc.png",
    liveUrl: "https://vjccculinaryarts.com"
  }
];

export const SKILLS_DATA: SkillCategory[] = [
  {
    title: "Core Stack",
    skills: ["MERN Stack", "React.js", "Node.js", "TypeScript", "Next.js", "Redux"]
  },
  {
    title: "GenAI & Automation",
    skills: ["Chatbot Integration", "RAG Pipelines", "LLM APIs (Gemini/OpenAI)", "LangChain", "AI Agents"]
  },
  {
    title: "Languages & Scripting",
    skills: ["JavaScript (ES6+)", "Python", "HTML5", "CSS3", "C++", "SQL"]
  },
  {
    title: "CMS & E-Commerce",
    skills: ["WordPress", "Shopify Liquid", "WooCommerce", "PHP"]
  },
  {
    title: "Backend & Databases",
    skills: ["MongoDB", "Express.js", "Prisma", "Firebase", "REST APIs", "GraphQL"]
  },
  {
    title: "DevOps & Cloud Hosting",
    skills: ["AWS", "Hostinger", "GoDaddy", "Docker", "Vercel", "CI/CD Pipelines"]
  },
  {
    title: "Testing & Security",
    skills: ["Selenium", "JIRA", "Burp Suite", "OWASP Top 10", "Manual Testing"]
  },
  {
    title: "Tools & Management",
    skills: ["JIRA", "Git & GitHub", "Postman", "Agile/Scrum", "Figma", "VS Code"]
  }
];

/* ----------- FIX: EXTENDED TYPE TO INCLUDE logoBgColor ----------- */
export type CertificationItemExtended = CertificationItem & {
  logoBgColor: string;
};
/* ---------------------------------------------------------------- */

export const CERTIFICATIONS_DATA: CertificationItemExtended[] = [
  {
    name: "Full Stack Web Developer Bootcamp",
    issuer: "GeeksforGeeks",
    image: "https://cdn.simpleicons.org/geeksforgeeks/2F8D46",
    credentialUrl: "https://media.geeksforgeeks.org/courses/certificates/8b0c2ce2a23613a7d5c82ec72952edf1.pdf",
    logoBgColor: 'white'
  },
  {
    name: "Data Fundamentals",
    issuer: "IBM",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
    credentialUrl: "https://www.credly.com/badges/de74ace5-1096-4290-9b80-0940520b0ee2/linked_in_profile",
    logoBgColor: 'white'
  },
  {
    name: "Automation Testing",
    issuer: "GeeksforGeeks",
    image: "https://cdn.simpleicons.org/geeksforgeeks/2F8D46",
    credentialUrl: "https://media.geeksforgeeks.org/courses/certificates/a4eccd5c1ad05736b8470949420ae595.pdf",
    logoBgColor: 'white'
  },
  {
    name: "AWS Knowledge: Cloud Essentials",
    issuer: "AWS",
    image: "https://img.icons8.com/color/480/amazon-web-services.png",
    credentialUrl: "https://www.credly.com/badges/f120eb6b-fb5f-4041-ad9b-f9157708b024/linked_in_profile",
    logoBgColor: 'white'
  },
  {
    name: "Project Management Foundations",
    issuer: "LinkedIn",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
    credentialUrl: "https://www.linkedin.com/learning/certificates/95717d386dce390fcefc23e95aa33757297876cbe5382e100e2d429e8502f55c",
    logoBgColor: 'white'
  },
  {
    name: "Business Analysis & Process Management",
    issuer: "Coursera",
    image: "https://cdn.simpleicons.org/coursera/0056D2",
    credentialUrl: "https://www.coursera.org/account/accomplishments/verify/U8R8O8PBK6ND",
    logoBgColor: 'white'
  }
];

export const LEADERSHIP_DATA: LeadershipItem[] = [
  {
    role: "Technical Lead",
    organization: "College Tech Club",
    description: "Led a team of 20+ students to organize technical workshops and hackathons. Managed the club's digital presence and technical infrastructure.",
    highlight: "Leadership",
    icon: Users
  },
  {
    role: "Campus Ambassador",
    organization: "TechFest 2024",
    description: "Represented the college at national level events, coordinating with 50+ participating institutions and managing logistics for 500+ attendees.",
    highlight: "Outreach",
    icon: Flag
  },
  {
    role: "Hackathon Winner",
    organization: "National Codeathon",
    description: "Secured 1st place among 100+ teams by developing an innovative solution for smart city traffic management using IoT and Machine Learning.",
    highlight: "Achievement",
    icon: Trophy
  },
  {
    role: "Sports Captain",
    organization: "College Badminton Team",
    description: "Led the college team to state-level semi-finals. Organized inter-departmental tournaments and managed team training schedules.",
    highlight: "Teamwork",
    icon: Medal
  }
];
