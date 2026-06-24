/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 *  Real content for Eduard Stefoni, written in a clean professional voice.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Eduard Stefoni",
  role: "Full-Stack Developer",
  tagline: "I build production systems from front to back.",
  location: "Timișoara, Romania",
  available: true,
  email: "edystefoni2005@gmail.com",
  // Large statement paragraph in the About section (animated).
  about:
    "I'm a full-stack developer and Computer Engineering student at Politehnica Timișoara. I build systems end to end — clean .NET and Python APIs, React frontends, AI agents that do real work — and I care about the part most people skip: making them hold up well past the demo.",
  // Supporting paragraph.
  aboutSecondary:
    "I grew up in Reșița, the kind of kid who took things apart to see what was inside and didn't always get them back together. That curiosity never really left — it just moved into code. Somewhere along the way, getting a program to do exactly what I had pictured became the most satisfying puzzle I knew.",
  // Third paragraph — recent experience.
  aboutTertiary:
    "I recently wrapped up a developer traineeship at Netrom, which I earned through a competitive selection at LigaAC Labs — where I built layered ASP.NET Core backends and wired up LLM agents that reason over real data. I'm happiest in the messy middle of a project: system design, security, and the edge cases that separate something that runs from something you'd actually ship. Away from the editor, you'll find me on a football pitch, in the pool, or at the gym.",
} as const;

/** About-section portrait. Drop the image in /public and update `src`. */
export const aboutPhoto = {
  src: "/about.png",
  alt: "Eduard Stefoni",
} as const;

export const socials = [
  { label: "GitHub", handle: "@Eduardo11290", href: "https://github.com/Eduardo11290" },
  {
    label: "LinkedIn",
    handle: "/in/eduard-stefoni",
    href: "https://www.linkedin.com/in/eduard-stefoni",
  },
  { label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
] as const;

export const stats = [
  { value: "4", label: "Full-stack projects built" },
  { value: "IBM", label: "Full-Stack Cloud certified" },
  { value: "2024", label: "At Politehnica Timișoara" },
  { value: "∞", label: "Things left to build" },
] as const;

export type Project = {
  id: string;
  title: string;
  year: string;
  category: string;
  summary: string;
  stack: string[];
  href?: string;
  repo?: string;
  /** A tailwind gradient used as the visual placeholder for the project. */
  gradient: string;
  featured?: boolean;
  /** Long-form case study, shown in the project modal. */
  description?: string[];
  /** What the project taught you — closing note in the case study. */
  learned?: string;
};

export const projects: Project[] = [
  {
    id: "smart-shopping-assistant",
    title: "SmartShoppingAssistant",
    year: "2026",
    category: "AI · Full-Stack",
    summary:
      "An AI shopping assistant that builds your cart to fit a budget. My final project at Netrom LigaAC Labs — a 3-layer .NET backend and a React + TypeScript SPA, built around one principle: the AI proposes, deterministic C# decides.",
    stack: [
      "C#",
      "ASP.NET Core",
      "EF Core",
      "JWT / Identity",
      "Microsoft Agents AI",
      "OpenAI GPT-4o",
      "React",
      "TypeScript",
      "MUI",
    ],
    gradient: "from-[#bef264] via-[#a3e635] to-[#4d7c0f]",
    featured: true,
    description: [
      "My largest and most complete project, built over roughly three months as the final project of the LigaAC Labs program at Netrom. You give it a budget and a need; it assembles a basket of products that actually fits — powered by a multi-agent system on top of OpenAI GPT-4o.",
      "The core architectural decision: I never let the AI decide the money. An AssistantPlannerAgent (Microsoft Agents AI + GPT-4o) proposes relevant products, but the actual budget allocation is handled by a deterministic planner written in C#. That split gives me the model's creativity without handing it a financial decision I can't guarantee.",
      "Getting the multi-agent layer right was the real fight. Coordinating an LLM-driven agent with deterministic code means designing the contract between them carefully — the agent returns structured proposals, the C# planner validates and allocates, and every mismatch between what GPT-4o returns and what my types expect has to be handled, not hoped away. That back-and-forth taught me more about building with LLMs than any tutorial could.",
      'Underneath: ASP.NET Core in a 3-layer architecture, Entity Framework Core, and JWT / ASP.NET Identity auth. I wrote a full catalog seeder — 269 products across 21 categories — so the app had something realistic to reason over. The React + TypeScript + Vite + MUI frontend was redesigned into a custom "Market Editorial" design system: Newsreader serif, Hanken Grotesk, a chartreuse accent, hairline-bordered cards.',
    ],
    learned:
      "The most valuable lesson was where to draw the line between AI and deterministic code. It's tempting to let the model do everything — but for anything that has to be provably correct, like a budget, the AI proposes and the code decides. That changed how I approach every LLM feature since.",
  },
  {
    id: "autorent",
    title: "AutoRent Premium",
    year: "2025",
    category: "Full-Stack",
    summary:
      "A complete car-rental platform I built for my university OOP course. The brief was backend-only — design a clean .NET 8 Web API — but I already had a rough frontend lying around, so I rebuilt and redesigned it into a proper React + Vite SPA and deployed the whole thing for real.",
    stack: ["C#", "ASP.NET Core (.NET 8)", "React", "Vite", "MonsterASP"],
    href: "https://auto-rent-premium.vercel.app/",
    repo: "https://github.com/Eduardo11290/AutoRentPremium",
    gradient: "from-[#ff5e3a] via-[#ff8a63] to-[#ffb347]",
    featured: true,
    description: [
      "This started as an Object-Oriented Programming assignment at university: build a Web API on a solid OOP foundation. I took it further. I had an old frontend from before that I wasn't happy with, so I gave it a complete redesign — and the project ended up a full, deployed product instead of just an API exercise.",
      "The backend is an ASP.NET Core (.NET 8) Web API on a clean OOP foundation — an abstract Vehicle base, derived Car classes, Dependency Injection throughout, and a custom generic async FileService<T> that reads and writes JSON in place of a heavyweight database. You can browse a fleet by type (Electric, Sport, SUV), open detailed specs, and book a reservation end-to-end, with the total cost calculated from the dates and rates.",
      "Deployment was the real lesson. Putting it online over HTTP on Vercel + MonsterASP threw Mixed Content and CORS errors that never show up locally. I ended up re-architecting the hosting — integrating the React build directly into the .NET wwwroot and enabling HTTPS — to get one unified, working deployment.",
    ],
    learned:
      "This taught me the hard difference between code that works locally and code that works in production. Every CORS and Mixed Content error was a lesson in how the real web actually behaves once you leave localhost.",
  },
  {
    id: "dealership-review",
    title: "Car Dealership Review",
    year: "2025",
    category: "Auth · Full-Stack",
    summary:
      "A review platform where users sign up, browse dealerships, and leave authenticated reviews. Built to walk an auth flow end to end — Django REST + React, containerized with Docker so dev matches prod.",
    stack: ["React", "Django", "DRF", "Python", "Docker", "REST API"],
    href: "https://car-dealership-review-huzk.vercel.app/",
    repo: "https://github.com/Eduardo11290/CarDealershipReview",
    gradient: "from-[#6b6bff] via-[#8f7bff] to-[#c084fc]",
    featured: true,
    description: [
      "This was one of the final capstone projects of my IBM Full-Stack Cloud Developer certificate on Coursera. After I submitted it, I didn't just leave it there — I went back, polished it, and put it online. Walking an authentication flow end-to-end (registration, login, protected routes, token sessions) was something I wanted as a real, running thing rather than a graded exercise.",
      "The Django REST Framework backend manages users, dealerships, and reviews through a clean API. The React frontend handles dynamic routing, conditional rendering based on auth state, and a layout that holds up on desktop and mobile.",
      "The whole thing is containerized with Docker so the dev environment matches production exactly — no more 'works on my machine'.",
    ],
    learned:
      "This project made me understand authentication from both sides of the stack. Configuring CORS between separate frontend and backend services was harder than expected — and now I know exactly why it exists.",
  },
  {
    id: "securevault",
    title: "SecureVault",
    year: "2025",
    category: "Security · Ongoing",
    summary:
      "A high-security digital safe: AES-256-GCM encryption before files ever touch the disk, burn-after-reading share links, and Bcrypt PIN gating. Still in progress — and the project that pulled me toward security.",
    stack: ["FastAPI", "Python 3.13", "PostgreSQL", "Redis", "AES-256-GCM", "Docker"],
    repo: "https://github.com/Eduardo11290/secure-file-vault",
    gradient: "from-[#10b981] via-[#34d399] to-[#a7f3d0]",
    description: [
      "This is the project where security clicked for me. We started Computer Systems Security at university and I wanted to build something real around it instead of just studying it — so SecureVault is a work in progress that I keep coming back to as I learn more.",
      "Every uploaded file is encrypted with AES-256-GCM before it ever touches the disk — files are never stored in a readable form. Sharing runs on a strict burn-after-reading protocol: links die the moment they're used. Recipients can be required to enter a Bcrypt-hashed PIN before decryption, emails go out via the Resend API with embedded secure tokens, and every upload, share, download and delete lands in an immutable audit log.",
      "The core is the full token lifecycle: Generation → Delivery → Verification → PIN Authorization → Decryption → Invalidation. Even if an email is intercepted, the data stays useless without both the token and the secondary PIN. Built on FastAPI + PostgreSQL + Redis, containerized end to end.",
    ],
    learned:
      "Building this changed how I think about security — that it's about designing systems that anticipate failure, not just hiding endpoints. It's also the project that nudged me toward cybersecurity as a direction I want to keep going in.",
  },
];

export type SkillGroup = {
  label: string;
  title: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "01 — Frontend",
    title: "Interfaces & SPAs",
    items: ["React", "TypeScript", "JavaScript", "Vite", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    label: "02 — Backend",
    title: "APIs & services",
    items: [
      "ASP.NET Core (.NET 8)",
      "Django",
      "FastAPI",
      "Flask",
      "Python",
      "C#",
      "REST API",
    ],
  },
  {
    label: "03 — Tools",
    title: "Infra & ship",
    items: ["Git", "GitHub", "Docker", "PostgreSQL", "Redis", "Vercel", "Linux"],
  },
];

export type Certification = {
  title: string;
  issuer: string;
  description: string;
  items: string[];
  links: { label: string; url: string; primary?: boolean }[];
};

export const certifications: Certification[] = [
  {
    title: "IBM Full-Stack Cloud Developer",
    issuer: "Professional Certificate · Coursera · IBM",
    description:
      "A rigorous 12-course professional certificate covering the full spectrum of modern full-stack cloud development — the kind that fills the gaps between what you know and what you think you know.",
    items: [
      "React & Component Architecture",
      "Node.js & Express Backend",
      "Python & Django REST Framework",
      "Docker & Container Orchestration",
      "Microservices Architecture",
      "CI/CD Pipelines & Cloud Deployment",
      "Relational & NoSQL Databases",
      "RESTful API Design Principles",
    ],
    links: [
      {
        label: "View credential",
        url: "https://coursera.org/share/acb5bb3ffdb71acb512de956d7e81303",
        primary: true,
      },
      {
        label: "Credly profile",
        url: "https://www.credly.com/users/eduard-stefoni.93fbfd96",
      },
    ],
  },
];

export type SideProject = {
  title: string;
  blurb: string;
  tech: string[];
};

/**
 * The Lab — side projects, mostly games. Where it started, before software:
 * hand-built game loops, collision, sprites.
 */
export const sideProjects: SideProject[] = [
  {
    title: "Fighter Game",
    blurb:
      "A 1v1 fighter built from scratch — sprite animation, hitbox collision, health bars and win states, all hand-wired in Python.",
    tech: ["Python", "pygame"],
  },
  {
    title: "Space Dodge",
    blurb:
      "Survive as long as you can — dodge incoming obstacles while the pace keeps climbing. A quick reflex game I built to get comfortable with game loops and collision detection.",
    tech: ["Python", "pygame"],
  },
  {
    title: "Godot 2D Experiment",
    blurb:
      "My first attempt at a 2D game in a real engine. I shelved it when building websites and software pulled me in harder — but it's where I first got my hands dirty with Godot.",
    tech: ["Godot", "GDScript"],
  },
];

export const nav = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Lab", href: "#lab" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;
