# EMSA-ECUSTA Digital Portal & Academy LMS

> **Architectural Charter & Repository Reference**
> Official digital portal, institutional archive, and clinical Learning Management System (LMS) for the **EMSA-ECUSTA Medical Students' Association**.

---

## 1. Mission Statement

The **EMSA-ECUSTA Digital Portal & Academy LMS** exists to serve medical students, student leadership, and clinical educators through a unified, resilient, and authoritative web platform. It combines:

- **Institutional Portal & Governance Directory:** Public-facing association identity, announcements, events, and transparent executive leadership records.
- **Retrospective Governance Continuity:** Structured support for an **Active Tenure** alongside **Historical Archive Batches**, preserving institutional memory without hardcoding cohort or tenure timelines into application code.
- **Academy LMS:** A distraction-free, clinical-grade learning environment for structured medical curricula, lecture resources, study modules, and academic progression.

---

## 2. Planned Core Tech Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | **Next.js 14 (App Router)** | Server-first React architecture, nested layouts, Server Actions, and route-level caching |
| **Language** | **TypeScript** | Strict static typing across UI components, domain models, and API contracts |
| **Styling** | **Tailwind CSS** | Utility-first styling mapped directly to institutional design tokens |
| **Database & Auth** | **PostgreSQL / Supabase** | Relational persistence, Row-Level Security (RLS), authentication, and asset storage |
| **Hosting & Edge** | **Vercel** | Continuous preview deployments, edge delivery, and production runtime |

---

## 3. Governance & Batch Model (Generic Scope)

To ensure long-term maintainability across leadership transitions, governance data is strictly decoupled from application source code:

- **Active Tenure:** Represents the currently serving student executive council, active committee mandates, and current operational announcements.
- **Historical Archive Batches:** Represents retrospective executive tenures and graduating/historical student batches, queryable through data-driven archive schemas configured in subsequent data phases.
- **Zero Hardcoded Calendar Years:** Routing, schema definitions, and UI labels must resolve tenures and batches dynamically from database records rather than fixed calendar constants.

---

## 4. Design System Tokens

The visual language balances academic heritage (deep midnight navy, brushed gold, and parchment) with clinical clarity. **Dark mode (`#050B14`) is the default canvas**, paired with a warm parchment light mode (`#FAF8F5`).

### Color Palette

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `brand/navy` | `#1B2A4A` | Primary institutional surfaces, cards, navigation headers |
| `brand/midnight` | `#0F1B33` | Elevated dark panels, modal surfaces, sidebar containers |
| `brand/midnight-deep` | `#050B14` | Deepest structural backdrop and dark-mode primary canvas |
| `brand/gold` | `#D4AF37` | Primary accent, active indicators, crests, ceremonial highlights |
| `brand/gold-hover` | `#C5A028` | Interactive hover/focus state for gold actions |
| `brand/gold-rule` | `#B8972A` | Hairline dividers, academic borders, and subtle ornamental rules |
| `brand/crimson` | `#9B1B30` | Medical/clinical emphasis, urgent alerts, destructive states |
| `bg/canvas` (Dark) | `#050B14` | **Dark mode default** application background |
| `bg/canvas` (Light) | `#FAF8F5` | **Light mode parchment** application background |

---

## 5. Local Typography Policy

To guarantee deterministic rendering, offline resilience, strict privacy compliance, and zero third-party font network latency:

- **Strictly Self-Hosted `.woff2` Assets:** All typography MUST be served locally from `/public/fonts/`.
- **Zero External Font CDNs:** External font stylesheets, third-party font CDNs, and runtime font network fetches are **strictly prohibited** across all layouts, stylesheets, and build configurations.

| Role | Typeface | Local Storage Path |
| :--- | :--- | :--- |
| **Formal Serif** | `EB Garamond` | `/public/fonts/eb-garamond/` |
| **Clinical Sans** | `Inter` | `/public/fonts/inter/` |

---

## 6. Roadmap: The 7 Development Phases

The platform is architected for incremental delivery across seven structured phases:

1. **Phase 1 — Foundation, Repository Hygiene & Tooling Setup**
   Establish Git hygiene, `.gitignore`, `.gitattributes`, architectural charter, Next.js 14 App Router scaffolding, TypeScript strict configuration, Tailwind token mapping, and local `.woff2` font integration.
2. **Phase 2 — Design System & Core UI Primitives**
   Implement the dark-first (`#050B14`) and parchment (`#FAF8F5`) theme architecture, accessible component primitives, typographic hierarchy (`EB Garamond` + `Inter`), and responsive navigation shell.
3. **Phase 3 — Database Architecture, Auth & Tenure Schema**
   Provision PostgreSQL / Supabase schemas, Row-Level Security (RLS) policies, role-based access control (students, faculty/educators, executive admins), and the generic **Active Tenure** / **Historical Archive Batches** data model.
4. **Phase 4 — Public Institutional Portal & Governance Archive**
   Build the association landing experience, news/events dispatches, committee pages, and the filterable directory for the Active Tenure and Historical Archive Batches.
5. **Phase 5 — Academy LMS Core & Curriculum Engine**
   Deliver structured course hierarchies, clinical modules, self-hosted/secure lecture materials, syllabus navigation, and student enrollment workflows.
6. **Phase 6 — Assessments, Progress Tracking & Administrative Console**
   Implement module completion tracking, formative quizzes/assessments, executive content publishing tools, and batch/tenure administration workflows.
7. **Phase 7 — Verification, Performance Hardening & Production Launch**
   Conduct end-to-end testing, accessibility (WCAG AA) and Lighthouse audits, security/RLS verification, zero-external-font verification, and Vercel production deployment.

---

## 7. Development Workflow & Git Conventions

### Line Endings & Binary Assets
- All text files enforce **LF (`\n`)** line endings via `.gitattributes` (`* text=auto eol=lf`).
- Binary assets (`.woff2`, `.webp`, `.png`, `.jpg`, `.ico`, `.pdf`) are explicitly flagged as `binary` in `.gitattributes` to prevent corruption across Windows, macOS, and Linux environments.

### Environment & Secret Hygiene
- Never commit `.env`, `.env.local`, `.env.*.local`, or `*.pem` / key files.
- Provide sanitized `.env.example` templates when environment variables are introduced in later phases.

### Branching & Commit Conventions
- `main`: Protected production-ready branch deployed via Vercel.
- `feat/<scope>`: New feature work (e.g., `feat/design-tokens`, `feat/lms-modules`).
- `fix/<scope>`: Targeted bug fixes.
- `chore/<scope>`: Tooling, documentation, or configuration updates.
- Follow **Conventional Commits** (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`) with concise, imperative subject lines.
