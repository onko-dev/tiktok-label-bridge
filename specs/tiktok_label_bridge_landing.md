# Tool Spec: TikTok Shop Label Bridge (Landing Page)
Date: 2026-02-20
Status: Draft
Priority: P0
Complexity: M

## 1. Problem
As of Jan 1, 2026, TikTok Shop merchants are mandated to use TikTok-generated labels. These labels are often provided in A4/Letter PDF format, but most high-volume merchants use 4x6 thermal printers. Merchants currently manually crop/rotate or use expensive monthly subscriptions.

**Goal:** Create a "Digital Toll Booth" landing page that solves this specific friction with zero-friction utility.

## 2. Conversion-Centered Design (CCD) Strategy
Following the "Design that Sells" research:
- **1:1 Attention Ratio:** The page has exactly one goal: "Transform my label."
- **Radical Focus:** No navigation bar. No footer links. No social icons.
- **Directional Cues:** Visual flow leads from "The Problem" (messy A4) directly to the "Drop Zone."
- **Trust Signals:** "Privacy First: No PII is stored. Processing happens in-browser."

## 3. Technical Stack
- **Framework:** Next.js (App Router) for speed and SEO.
- **Styling:** Tailwind CSS (Atomic utility classes).
- **UI Components:** Shadcn/UI (Radix Primitives for accessibility).
- **Processing:** `pdf-lib` + `canvas` for in-browser PDF manipulation (Zero-Server PII risk).

## 4. MVP Features (The "Digital Toll Booth")
- [ ] **Hero Section:** "TikTok Shop PDF -> 4x6 Thermal. Instant. Free. Secure."
- [ ] **Drop Zone:** Drag-and-drop area for TikTok Shipping PDFs.
- [ ] **Instant Preview:** Show the 4x6 crop before download.
- [ ] **One-Click Transform:** Auto-rotate, crop, and trigger download.
- [ ] **Trust Badge:** "GDPR/CCPA Compliant: Your data never leaves your computer."

## 5. Microcopy best practices
- **CTA:** "Transform My Label" (Action-oriented verb).
- **Empty State:** "Drop your TikTok PDF here to fix it."
- **Success State:** "Ready for your thermal printer."

## 6. GSM (Goals-Signals-Metrics)
- **Goal:** Drive utility adoption.
- **Signal:** PDF upload event.
- **Primary Metric:** Conversion Rate (Upload -> Download).
- **Guardrail Metric:** Error Rate (Invalid PDF format errors).

## 7. Next Steps
1. [ ] Finalize layout wireframe in `build/prototypes/tiktok-bridge/wireframe.md`.
2. [ ] Scaffold Next.js project via `code-builder`.
3. [ ] Implement PDF transformation logic.
