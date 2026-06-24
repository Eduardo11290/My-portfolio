# Portfolio — Backend

ASP.NET Core (.NET 10) Web API for the portfolio site. Same clean 3-layer
architecture as SmartShoppingAssistant.

## Stack
- **.NET 10** Web API (C#)
- **EF Core 10** + **SQLite** (single-file DB, zero setup)
- **Resend** for the contact email (via HTTP)
- OpenAPI document at `/openapi/v1.json` (Development only)

## Projects
```
Portfolio.Api            Controllers, Program.cs, appsettings, ApiKey filter
Portfolio.BusinessLogic  DTOs, Mappers, Services (+ Interfaces), EmailService
Portfolio.DataAccess     Entities, Configurations, PortfolioDbContext, Repositories
```

Flow per feature: **Controller → Service → Repository → EF Core (SQLite)**.
The SQLite schema is created automatically on first run (`EnsureCreated()`),
so no migration step is needed to get going.

## Run
```bash
cd BackEnd
dotnet run --project Portfolio.Api
```
Then open the OpenAPI doc (Development) at `http://localhost:<port>/openapi/v1.json`.
The DB file `portfolio.db` is created next to the API on first run.

## API
| Method | Route | Access | Purpose |
|--------|-------|--------|---------|
| POST | `/api/contact` | public | Submit a contact message (saves + emails the owner) |
| GET | `/api/contact` | **admin** | List received messages |
| GET | `/api/recommendations` | public | List **approved** recommendations |
| POST | `/api/recommendations` | public | Submit a recommendation (stored unapproved) |
| GET | `/api/recommendations/all` | **admin** | List all (pending + approved) |
| PATCH | `/api/recommendations/{id}/approve` | **admin** | Approve one |
| DELETE | `/api/recommendations/{id}` | **admin** | Delete one |
| POST | `/api/analytics` | public | Record a page/section view |
| GET | `/api/analytics/summary` | **admin** | Visitor stats |

**Admin** endpoints require the header `X-Api-Key: <Admin:ApiKey>`.

## Configuration
Set these in `appsettings.Development.json` (gitignored) or via user-secrets:
- `Admin:ApiKey` — the admin key for the protected endpoints.
- `Resend:ApiKey` — your Resend key (leave empty to disable email; contact still saves).
- `Resend:From` / `Resend:To` — sender (verified domain or `onboarding@resend.dev`) and your inbox.
- `Cors:Origins` — allowed frontend origins (defaults to `http://localhost:5173`).

> Real secrets: prefer `dotnet user-secrets set "Resend:ApiKey" "..."` over committing them.

## Follow-ups
- **Security advisory (NU1903):** EF Core's transitive `SQLitePCLRaw.lib.e_sqlite3 2.1.11`
  has a known issue — bump it with a direct `PackageReference` to a patched version
  once NuGet is reachable.
- Add formal EF migrations (`dotnet tool install -g dotnet-ef` → `dotnet ef migrations add Initial`)
  instead of `EnsureCreated()` if you want versioned schema changes.
