# 02 — Design System, Color Tokens & Local Typography Policy

> **Document Scope:** Authoritative visual tokens, dark/light semantic surface mappings, and strict local font hosting rules for **EMSA-ECUSTA Digital Portal & Academy LMS**.

---

## 1. Aesthetic Philosophy

The EMSA-ECUSTA visual identity merges **academic medical heritage** (midnight navy, brushed ceremonial gold, and warm parchment) with **clinical precision** (high-contrast typography, restrained surface elevation, and distraction-free reading layouts).

- **Default Theme:** Dark mode (`#050B14`) is the canonical default canvas across the portal and Academy LMS.
- **Secondary Theme:** Light mode parchment (`#FAF8F5`) provides an editorial, paper-like reading surface for extended clinical study and printable certificate previews.

---

## 2. Brand Primitive Palette

All semantic UI tokens must derive exclusively from the approved brand primitives below. **Do not introduce ad-hoc hex values or alter these color codes.**

| Primitive Token | Hex Value | Visual Role |
| :--- | :--- | :--- |
| `brand/navy` | `#1B2A4A` | Primary institutional surfaces, structural cards, header chrome |
| `brand/midnight` | `#0F1B33` | Elevated dark surfaces, modals, Academy player sidebars |
| `brand/midnight-deep` | `#050B14` | Deepest structural backdrop and dark-mode root canvas |
| `brand/gold` | `#D4AF37` | Primary ceremonial accent, active badges, official seals, primary CTAs |
| `brand/gold-hover` | `#C5A028` | Hover, active, and focus-ring accent state for gold controls |
| `brand/gold-rule` | `#B8972A` | Hairline academic dividers, certificate borders, card rules |
| `brand/crimson` | `#9B1B30` | Clinical emphasis, urgent notices, revocation/error alerts |

---

## 3. Semantic Theme Tokens

Semantic tokens decouple component styling from raw primitives so dark and light modes remain consistent and WCAG AA accessible.

### 3.1 Surface & Canvas Tokens

| Semantic Token | Dark Mode (Default) | Light Mode (Parchment) | Usage |
| :--- | :--- | :--- | :--- |
| `bg/canvas` | `#050B14` (`brand/midnight-deep`) | `#FAF8F5` (Warm Parchment) | Root page background |
| `bg/surface` | `#0F1B33` (`brand/midnight`) | `#FFFFFF` | Primary cards, course modules, forms |
| `bg/surface-elevated` | `#1B2A4A` (`brand/navy`) | `#F3EFE6` | Dropdowns, popovers, active sidebar items |
| `bg/surface-inset` | `#081020` | `#EDE8DC` | Code blocks, input wells, progress tracks |

### 3.2 Typography & Foreground Tokens

| Semantic Token | Dark Mode (Default) | Light Mode (Parchment) | Usage |
| :--- | :--- | :--- | :--- |
| `text/primary` | `#F4F1EA` | `#0F1B33` (`brand/midnight`) | Headings, primary body prose |
| `text/secondary` | `#CBD5E1` | `#334155` | Supporting descriptions, table labels |
| `text/muted` | `#8A99B3` | `#64748B` | Timestamps, metadata captions, breadcrumbs |
| `text/accent` | `#D4AF37` (`brand/gold`) | `#9E7B16` | Ceremonial labels, active section markers |
| `text/on-gold` | `#050B14` (`brand/midnight-deep`) | `#050B14` | High-contrast label inside solid gold buttons |
| `text/danger` | `#F87171` | `#9B1B30` (`brand/crimson`) | Validation errors, revoked badge text |

### 3.3 Border & Status Tokens

| Semantic Token | Dark Mode (Default) | Light Mode (Parchment) | Usage |
| :--- | :--- | :--- | :--- |
| `border/subtle` | `rgba(212, 175, 55, 0.16)` | `rgba(27, 42, 74, 0.14)` | Card frames, table rows, layout seams |
| `border/strong` | `#B8972A` (`brand/gold-rule`) | `#B8972A` (`brand/gold-rule`) | Certificate frames, active focus borders |
| `status/verified` | `#10B981` | `#047857` | Eligible student, valid credential, passed review |
| `status/warning` | `#D4AF37` (`brand/gold`) | `#B45309` | Pending eligibility, changes requested |
| `status/danger` | `#9B1B30` (`brand/crimson`) | `#9B1B30` (`brand/crimson`) | Revoked credential, rejected submission |

---

## 4. Tailwind & CSS Custom Property Mapping Reference

When Phase 1 tooling is configured, semantic tokens are exposed via CSS custom properties in the root stylesheet and mapped to Tailwind utility classes:

```css
/* Conceptual reference — implemented in Phase 1 */
:root {
  --bg-canvas: #050b14;
  --bg-surface: #0f1b33;
  --bg-surface-elevated: #1b2a4a;
  --brand-gold: #d4af37;
  --brand-gold-hover: #c5a028;
  --brand-gold-rule: #b8972a;
  --brand-crimson: #9b1b30;
  --text-primary: #f4f1ea;
  --border-subtle: rgba(212, 175, 55, 0.16);
}

[data-theme="light"] {
  --bg-canvas: #faf8f5;
  --bg-surface: #ffffff;
  --bg-surface-elevated: #f3efe6;
  --text-primary: #0f1b33;
  --border-subtle: rgba(27, 42, 74, 0.14);
}
```

---

## 5. Local Typography Policy (Zero External CDN)

EMSA-ECUSTA enforces a **strictly self-hosted local font policy** to ensure deterministic academic typography, zero third-party tracking/network dependencies, and instant rendering in low-connectivity clinical environments.

### 5.1 Prohibited Patterns
- **ZERO** external font CDN `<link>` tags or `@import` statements.
- **ZERO** `next/font/google` imports anywhere in the codebase.
- **ZERO** runtime network requests to external font servers.

### 5.2 Approved Local Font Binaries

All typography must load exclusively from `.woff2` binaries committed under `/public/fonts/` using local `@font-face` declarations or `next/font/local`:

| Typographic Role | Family Name | Local Binary Directory | Intended Usage |
| :--- | :--- | :--- | :--- |
| **Formal Serif** | `EB Garamond` | `/public/fonts/eb-garamond/` | Institutional crests, page titles, certificate headings, editorial quotes |
| **Clinical Sans** | `Inter` | `/public/fonts/inter/` | Body copy, LMS lesson text, forms, tables, verification metadata, UI controls |

### 5.3 Typographic Scale & Pairing Rules
- **Display & Ceremonial Headings:** `EB Garamond` (`600` / `700`), tight tracking (`-0.015em`), paired with `brand/gold-rule` underlines where appropriate.
- **Clinical Body & LMS Reading:** `Inter` (`400` / `500` / `600`), generous line height (`1.65`) and constrained measure (`65ch–72ch`) inside `/academy/learn/[courseSlug]`.
- **Tabular & Cryptographic Identifiers:** `Inter` with `font-variant-numeric: tabular-nums` (or system monospace fallback for raw SHA-256 hex digests in `/verify/[certificateId]`).

