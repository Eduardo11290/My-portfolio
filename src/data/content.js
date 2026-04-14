// ─────────────────────────────────────────────
// content.js — Single source of truth for all
// text, links, and lists. Components only render.
// ─────────────────────────────────────────────

export const nav = {
  brand: 'Eduard Stefoni',
  links: [
    { label: 'Home',        to: 'home' },
    { label: 'About',       to: 'about' },
    { label: 'Skills',      to: 'skills' },
    { label: 'Projects',    to: 'projects' },
    { label: 'Reviews',     to: 'reviews' },
    { label: 'Contact',     to: 'contact' },
  ],
}

export const hero = {
  label: 'Full Stack Developer',
  h1: ['BUILDING', 'THE WEB', 'FORWARD.'],
  body: 'Computer Engineering student at Politehnica Timișoara, passionate about building scalable full-stack applications that work in production — not just on localhost.',
  cta: { label: 'View Projects', to: 'projects' },
  currently: 'Currently: Studying @ Politehnica Timișoara · Open to internships',
  stats: [
    { label: 'PROJECTS DEPLOYED', value: '3+' },
    { label: 'CERTIFIED',          value: 'IBM ✓' },
  ],
}

export const about = {
  label: 'About Me',
  h2: ['I don\'t just write code;', 'I build systems.'],
  paragraphs: [
    "It all started out of pure curiosity — I wanted to see my ideas come to life on a screen. My first steps into programming were in game development with Python. I still remember the hours spent perfecting the mechanics of a Street Fighter-style combat engine, or tweaking the dodge physics in Space Dodge until they felt just right. Those projects were my playground, where I genuinely learned what logic and algorithms mean — and discovered the very specific joy of squashing a bug that seemed impossible.",
    "Over time, though, I felt the pull toward building something with a broader real-world impact. That's how I found software development. I made the leap from game loops to full-stack architectures — from simple academic console apps to production-ready systems where security and scalability aren't afterthoughts. Today, as a Computer Engineering student at Politehnica Timișoara, I try to bridge academic rigour with what the industry actually demands.",
    "Code isn't the only thing that shapes how I think. Sport has always been my anchor. Five years of football taught me how to communicate fast and move as a team. Three years of swimming built a kind of resilience — the ability to stay calm under pressure — a lesson that turns out to be surprisingly useful during long debugging sessions. And for the past three years, the gym has been where I push past my limits daily, much like I try to do with every project I ship. I genuinely believe a good engineer needs not just a sharp mind, but the discipline of an athlete.",
  ],
  terminal: [
    { cmd: '$ whoami',         out: 'Eduard Stefoni — Full Stack Developer & Tech Enthusiast' },
    { cmd: '$ origin',         out: 'From Reșița to Timișoara, Romania' },
    { cmd: '$ status',         out: 'Constantly evolving. Open to internships & freelance' },
    { cmd: '$ education',      out: 'B.Sc. Computer Engineering @ Politehnica Timișoara, 2024–present' },
    { cmd: '$ personal_stack', out: 'Football (5y) · Swimming (3y) · Fitness (3y+)' },
    { cmd: '$ current_mission',out: 'Mastering Secure Architectures & Scalable Web Apps' },
    { cmd: '$ certifications', out: 'IBM Full-Stack Cloud Developer ✓' },
  ],
}

export const skills = {
  label: 'Technologies',
  h2: 'Skills & Stack',
  groups: [
    {
      name: 'Frontend',
      items: [
        { name: 'React.js',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
        { name: 'HTML5',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg' },
        { name: 'CSS3',           icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg' },
        { name: 'JavaScript',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Vite',           icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
        { name: 'Tailwind CSS',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
      ],
    },
    {
      name: 'Backend',
      items: [
        { name: 'FastAPI',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-plain.svg' },
        { name: 'ASP.NET Core',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-plain.svg' },
        { name: 'Django',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
        { name: 'Python',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg' },
        { name: 'C#',             icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-plain.svg' },
        { name: 'REST API',       icon: null },
      ],
    },
    {
      name: 'Tools & Platforms',
      items: [
        { name: 'Git',            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg' },
        { name: 'GitHub',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
        { name: 'Docker',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg' },
        { name: 'PostgreSQL',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-plain.svg' },
        { name: 'Redis',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-plain.svg' },
        { name: 'Linux',          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-plain.svg' },
      ],
    },
  ],
}

export const projects = [
  {
    id: 0,
    size: 'featured',      // 8 cols — the headline project
    number: '01 / SECURITY & BACKEND',
    title: 'Secure File Vault',
    description: 'A high-security digital safe for sensitive document management. Files never touch the server in readable form — everything is encrypted at rest with AES-256-GCM. Share documents via single-use "burn-after-reading" links, locked behind MFA (TOTP) and JWT-authenticated sessions. Rate-limiting via Redis. Full audit trail for every action.',
    badges: ['FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'React.js'],
    live:   'https://github.com/Eduardo11290/SecureVault',
    github: 'https://github.com/Eduardo11290/SecureVault',
    gradient: 'radial-gradient(circle at 25% 55%, rgba(35,16,67,0.8) 0%, transparent 55%), radial-gradient(circle at 80% 25%, rgba(82,66,103,0.5) 0%, transparent 55%)',
    accentColor: 'rgba(211, 188, 249, 0.2)',
    featured: true,
  },
  {
    id: 1,
    size: 'large',         // 8 cols
    number: '02 / FULL-STACK WEB APP',
    title: 'AutoRent Premium',
    description: 'A complete car rental management platform built with .NET 8 Web API and a React SPA frontend. Features RESTful APIs with Dependency Injection, an asynchronous JSON-based repository pattern, and a unified deployment — React build served directly from the .NET wwwroot, eliminating CORS issues entirely.',
    badges: ['C#', 'ASP.NET Core (.NET 8)', 'React.js', 'Vite', 'Git'],
    live:   'https://auto-rent-premium.vercel.app/',
    github: 'https://github.com/Eduardo11290/AutoRentPremium',
    gradient: 'radial-gradient(circle at 30% 60%, rgba(45, 27, 77, 0.6) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(82, 66, 103, 0.35) 0%, transparent 55%)',
    accentColor: 'rgba(211, 188, 249, 0.15)',
  },
  {
    id: 2,
    size: 'vertical',      // 4 cols
    number: '03 / FULL-STACK WEB APP',
    title: 'Car Dealership Review',
    description: 'Full-stack platform for browsing dealerships and submitting authenticated reviews. React frontend with dynamic routing, Django REST backend, containerized with Docker.',
    badges: ['React.js', 'Django', 'Python', 'Docker', 'Git'],
    live:   'https://car-dealership-review-huzk.vercel.app/',
    github: 'https://github.com/Eduardo11290/CarDealershipReview',
    gradient: 'radial-gradient(circle at 70% 30%, rgba(82, 66, 103, 0.5) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(45, 27, 77, 0.4) 0%, transparent 55%)',
    accentColor: 'rgba(211, 188, 249, 0.1)',
  },
]

export const certifications = {
  label: 'Credentials',
  h2: 'Certifications',
  card: {
    title: 'IBM Full-Stack Cloud Developer',
    issuer: 'Professional Certificate · Coursera · IBM',
    description: 'A rigorous, 12-course program that went well beyond basic web development. I mastered microservices architecture — designing and deploying decoupled services that communicate via REST and messaging queues. I worked hands-on with CI/CD pipelines using GitHub Actions and OpenShift, and dug deep into cloud security principles: container hardening, secrets management, and zero-trust access patterns on IBM Cloud and Kubernetes.',
    credential: 'https://coursera.org/share/acb5bb3ffdb71acb512de956d7e81303',
    credly:      'https://www.credly.com/users/eduard-stefoni.93fbfd96',
  },
}

export const recommendations = {
  label: 'Kind Words',
  h2: 'Recommendations',
  placeholder: {
    title: 'System under construction.',
    message: 'My custom feedback backend is coming soon. In the meantime, feel free to reach out!',
    cta: { label: 'Get In Touch', to: 'contact' },
  },
}

export const contact = {
  label: 'Get In Touch',
  h2: "Let's Work Together.",
  subtitle: "I'm currently open to internship opportunities and freelance projects. Whether you have a question or just want to say hi — my inbox is open.",
  email: 'edystefoni2005@gmail.com',
  links: [
    { label: 'Email',    href: 'mailto:edystefoni2005@gmail.com',                      icon: 'Mail' },
    { label: 'GitHub',   href: 'https://github.com/Eduardo11290',                      icon: 'Github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eduard-stefoni',           icon: 'Linkedin' },
  ],
}

export const footer = {
  copy: '© 2026 Stefoni Eduard. All rights reserved.',
  links: [
    { label: 'GitHub',   href: 'https://github.com/Eduardo11290' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/eduard-stefoni' },
    { label: 'Email',    href: 'mailto:edystefoni2005@gmail.com' },
  ],
}
