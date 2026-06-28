# Eduard Stefoni — Portfolio

Live: **[my-portfolio-lyart-iota-86.vercel.app](https://my-portfolio-lyart-iota-86.vercel.app)**

A full-stack personal portfolio — not just a static page, but a real product with its own API: a contact form that emails me, a recommendations wall visitors can post to, lightweight visit analytics, and an authenticated admin dashboard to manage all of it. Built to also double as a live example of how I structure a small full-stack system end to end.

---

## Stack

**Frontend** — React 19 · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · React Router · Three.js
Deployed on **Vercel**.

**Backend** — ASP.NET Core (.NET 10) · Entity Framework Core · SQL Server
Deployed on **MonsterASP.NET**, 3-layer architecture (`Api` / `BusinessLogic` / `DataAccess`).

**Email** — [Resend](https://resend.com) for contact-form notifications.

---

## Architecture

```
src/                      React + TypeScript frontend (Vite)
├── components/           Reusable UI (incl. shadcn/ui primitives)
├── sections/             Landing page sections (Hero, Work, About, Lab, Certifications...)
├── pages/AdminPage.tsx   Authenticated dashboard (messages, recommendations, analytics)
├── data/content.ts       Single source of truth for all portfolio content
└── api/                  Typed fetch wrappers around the backend API

BackEnd/
├── Portfolio.Api/            Controllers, API-key auth filter, Program.cs wiring
├── Portfolio.BusinessLogic/  Services, DTOs, mappers, Resend email integration
└── Portfolio.DataAccess/     EF Core DbContext, entities, repositories
```

The backend follows a strict separation: **`Api`** only knows about HTTP, **`BusinessLogic`** holds the actual rules (validation, mapping, sending email), and **`DataAccess`** is the only layer that talks to the database. Each layer only depends on the one below it.

## API surface

| Endpoint | Method | Auth | Purpose |
|---|---|---|---|
| `/api/Contact` | `POST` | Public | Submit a contact message (triggers a Resend email) |
| `/api/Contact` | `GET` | Admin | List all messages |
| `/api/Recommendations` | `GET` | Public | List recommendations |
| `/api/Recommendations` | `POST` | Public | Submit a recommendation |
| `/api/Recommendations/{id}` | `DELETE` | Admin | Remove a recommendation |
| `/api/Analytics` | `POST` | Public | Track a page view |
| `/api/Analytics/summary` | `GET` | Admin | Aggregate visitor stats |

Admin routes are gated behind a single shared key, checked against an `X-Api-Key` header (`Portfolio.Api/Security/ApiKeyAttribute.cs`) — no user accounts needed for a one-person dashboard.

## Admin dashboard

`/admin` on the live site — a password-style gate (the API key itself, stored in `localStorage` after first login) unlocks a dashboard showing:
- Visitor counts (all-time / 30-day / 7-day) and top pages
- All submitted recommendations, with delete
- All contact messages

## Notable decisions

- **Email sending never breaks the contact form.** `EmailService` treats Resend calls as best-effort — if the API key is missing or Resend is down, the message still saves; the failure is just logged.
- **CORS is configuration-driven**, not hardcoded, so the same backend can serve a local dev frontend and the production Vercel deployment by just changing `Cors:Origins`.
- **Content is data, not markup.** Every section of the site reads from `src/data/content.ts`, so updating a project, a bio paragraph, or a stat doesn't touch any component code.

## Running locally

```bash
# Frontend
npm install
npm run dev

# Backend
cd BackEnd/Portfolio.Api
dotnet run
```

The frontend expects the API at `VITE_API_URL` (defaults to `http://localhost:5071` if unset — see `src/api/client.ts`). The backend needs a SQL Server connection string in `ConnectionStrings:PortfolioContext` and, optionally, a Resend API key in `Resend:ApiKey` to send real emails.

---

**Eduard Stefoni** — Computer Engineering student, Politehnica Timișoara · [GitHub](https://github.com/Eduardo11290)