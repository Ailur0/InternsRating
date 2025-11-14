# InternsRating

InternsRating is a demo platform for managing internship programs end-to-end. It showcases distinct experiences for administrators, directors, and program managers while providing quick demo logins for exploration.

## Features

- **Role-aware login** – Pick an Admin, Director, or Manager card to autofill credentials and preview their journey.
- **Role-specific dashboard** – Each role lands on a tailored overview:
  - **Admin**: organization-wide metrics, people coverage, and pending reviews.
  - **Director**: manager oversight, intern score snapshots, and feedback gaps.
  - **Manager**: assigned interns, review completion tracking, and next-action cues.
- **Adaptive navigation** – Sidebar menus expose only the routes relevant to the signed-in role.
- **Intern insights** – Browse interns, review ratings, and monitor active periods using seeded mock data.

## Tech Stack

- React + TypeScript
- Vite build tooling
- shadcn/ui component primitives
- React Router for routing and guard logic
- Mock data stored locally for frictionless demos

## Getting Started

```bash
npm install
npm run dev
```

Open the app at the URL printed in the console (defaults to `http://localhost:5173`).

## Demo Accounts

Use the role cards on the login screen or the credentials below:

| Role      | Email                  | Password    |
|-----------|------------------------|-------------|
| Admin     | admin@company.com      | admin123    |
| Director  | director@company.com   | director123 |
| Manager   | manager@company.com    | manager123  |

## Project Structure Highlights

- `src/pages/Login.tsx` – Role cards and authentication entry point.
- `src/pages/Dashboard.tsx` – Role-specific dashboard metrics and sections.
- `src/components/AppSidebar.tsx` – Role-aware navigation menu.
- `src/lib/mockData.ts` – Seed data for users, interns, ratings, and rating periods.

## Roadmap Ideas

- Add mentor and intern-facing portals.
- Integrate real persistence (REST/GraphQL) and auth providers.
- Expand analytics with time-series insights and export tooling.