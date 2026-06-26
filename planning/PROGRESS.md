# CareerOS — Progress Tracker

> **Living document.** Update this whenever a feature moves between states.
> Last updated: 2026-06-27
>
> Legend: ✅ Done · 🟡 In progress · ⬜ Not started · 🔍 Needs review

---

## Snapshot

| Area      | Status | Notes                                              |
| --------- | ------ | -------------------------------------------------- |
| Backend   | 🟡 ~80% | All 13 modules scaffolded with routes/service/controller; needs review + testing |
| Frontend  | 🟡 ~15% | Routing, layouts, sidebar, auth flow done; feature pages are placeholders |
| Database  | ✅      | Prisma schema in place (`backend/prisma/schema.prisma`) |
| Auth      | 🟡      | Backend + FE login/register hooks done; needs end-to-end verification |
| Deploy    | ✅      | API live on Render (https://careereos.onrender.com/) |

---

## Backend (`backend/src/modules`)

Each module has `*.routes.ts`, `*.service.ts`, `*.controller.ts`, `*.schema.ts`.

| Module        | Status | Left to do                            |
| ------------- | ------ | ------------------------------------- |
| auth          | 🔍     | E2E verify register/login/refresh     |
| users         | 🔍     | Review profile update + avatar upload |
| companies     | 🔍     | Review                                |
| applications  | 🔍     | Review                                |
| interviews    | 🔍     | Review                                |
| tasks         | 🔍     | Review                                |
| contacts      | 🔍     | Review                                |
| notes         | 🔍     | Review                                |
| documents     | 🔍     | Review (Cloudinary upload)            |
| goals         | 🔍     | Review                                |
| notifications | 🔍     | No `*.schema.ts` — confirm intentional |
| activity      | 🔍     | No `*.schema.ts` — confirm intentional |
| dashboard     | 🔍     | No `*.schema.ts` — confirm intentional |

**Cross-cutting / infra**
- ✅ Prisma client, JWT lib, Cloudinary, mailer, activity logger
- ✅ `authenticate` middleware, `errorHandler` middleware
- ⬜ Automated tests (none present)
- ⬜ API documentation / shared types for frontend

---

## Frontend (`client/src`)

**Done**
- ✅ Routing (`routes.tsx`), `AuthLayout`, `DashboardLayout`, `ProtectedRoute`
- ✅ Sidebar navigation (`app-sidebar.tsx`, `constants/sidebar.ts`)
- ✅ Error / NotFound pages
- ✅ Auth: Login + Register pages with `useLogin` / `useRegister` hooks
- ✅ Auth-aware axios client + token storage (commit d3013ce)
- 🟡 Dashboard module hook (`useDashboard.ts`) — page still placeholder

**Feature pages — all placeholders (one-line stubs)**

| Page         | Status | API ready? |
| ------------ | ------ | ---------- |
| Dashboard    | ⬜     | ✅          |
| Applications | ⬜     | ✅          |
| Pipeline     | ⬜     | ✅ (applications) |
| Calendar     | ⬜     | ✅ (interviews/tasks) |
| Tasks        | ⬜     | ✅          |
| Goals        | ⬜     | ✅          |
| Notes        | ⬜     | ✅          |
| Documents    | ⬜     | ✅          |
| Contacts     | ⬜     | ✅          |
| Companies    | ⬜     | ✅          |
| Settings     | ⬜     | partial    |
| Profile      | ⬜     | ✅ (users)  |

**Frontend infra not yet started**
- ⬜ TanStack Query setup for data fetching across feature pages
- ⬜ Shared API types (ideally generated from backend schemas)
- ⬜ Reusable data-table / form components
- ⬜ Toast / error-state UX

---

## Roadmap alignment (`ROADMAP.md`)

- **V1** (Auth, Dashboard, Applications, Companies, Tasks) → backend done, **frontend is the gap**
- **V2** (Kanban/Pipeline, Interviews, Contacts, Notes) → backend done, frontend pending
- **V3** (Goals, Analytics, Notifications, Timeline/Activity) → backend done, frontend pending

---

## Immediate next steps

1. Verify auth flow end-to-end against the live API.
2. Wire TanStack Query + the auth-aware axios client into a first real page (Dashboard).
3. Build out V1 frontend pages (Applications → Companies → Tasks) against existing endpoints.
4. Add shared request/response types between backend and frontend.
5. Backend review pass per CLAUDE.md (architecture, naming, TS, performance).

---

## How to update this file

- Flip status icons as work moves; bump **Last updated**.
- Keep one row per module/page so diffs stay readable.
- Log larger decisions/tradeoffs in `planning/DECISIONS.md`.
