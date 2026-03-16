# Case Study Guidelines

Reference for editing, writing, or reviewing the 6 portfolio case studies.
These are principles, not strict rules — use judgment when a case study has unique needs.

---

## Goal

Each case study should:
- Tell a compelling story a hiring manager can follow in under 3 minutes
- Answer two unspoken interview questions: *"How do you work cross-functionally?"* and *"How do you push back / advocate for users?"*
- Be copy-pasteable as presentation notes (text-first structure)

---

## Canonical Section Order

Keep sections in roughly this order. Not all sections are required for every case study.

1. **The Problem** — What was broken and why it mattered
2. **The Solution** — What was shipped (with visuals)
3. **Impact & Outcomes** — Metrics block
4. **Research & Discovery** — How you built understanding and what it changed
5. **Process section(s)** — Key decisions, concepts explored, validation (1–3 of these)
6. **Cross-Team / Dependencies** — How you navigated external teams or constraints
7. **Key Takeaway** — One push-back or advocacy story, told in 3 acts

---

## Section-Level Rules

### The Problem
- 2–3 sentences max, then a list or visual
- Should make the stakes clear — business impact, user pain, or both

### The Solution
- Lead with what shipped, not how you got there
- Let visuals carry the weight; keep prose tight

### Impact & Outcomes
- Always use the `metrics` block format
- Fill in all placeholders before publishing — no `[x]%` in production

### Research & Discovery
- 3–5 bullets max
- Quantify where possible (e.g., "8 interviews" not "several interviews")
- **Each bullet should state what was done AND how it informed a POV or decision.** Don't just list the activity — connect it to an outcome, a pivot, or a principle that shaped the design direction. This is where design thinking shows up, not just design doing.
  - Weak: "Conducted 8 user interviews"
  - Strong: "Conducted 8 user interviews — surfaced that leaderboards and the Give flow were most valued, which led us to preserve those rather than redesign from scratch"

### Cross-Team / Dependencies (formerly "Backend Dependency" / "Handling Dependencies")
- Frame as a *design leadership* story, not an engineering footnote
- Lead with what YOU did: how you drove alignment, unblocked the team, or made the call
- Name the dependency but spend more words on your response to it

### Key Takeaway
- Answer ONE of these questions, not both:
  - "How do you push back?" (conflict/advocacy story)
  - "How do you work cross-functionally?" (if not already covered in Dependencies)
- Use the 3-act structure: **Situation → My stance → How it resolved**
- Bold subheadings are encouraged for scannability
- Max 2 sub-stories; ideally just 1

---

## Tone & Voice

- Direct, confident, first-person
- Use `==highlight==` markup for the most important phrase in any paragraph (1 per paragraph max)
- Avoid hedging language ("I think", "sort of", "kind of")
- Avoid over-explaining the obvious — trust the reader
- No em dashes (—). Rewrite sentences to flow naturally without them

---

## What to Cut

- Engineering-only details that don't show design thinking
- Redundant sections (e.g., Overview + Problem that say the same thing)
- Multiple push-back stories crammed into one Takeaway — pick the sharpest one
- Sections that trail off without a conclusion or design decision
- Research bullets that only log activity without connecting to a decision

---

## Per-Case-Study Notes

| # | Title | Strongest story | Watch out for |
|---|---|---|---|
| P1 | Rewards Infrastructure ($12.3M ARR) | Table pattern fight (Takeaway) | Backend Dependency reads like eng notes — reframe |
| P2 | Recognition Redesign (150% increase) | Mandatory message advocacy | Takeaway has 3 stories — trim to 1–2 |
| P3 | Gift Card Redemption ($700K gap) | Build vs. reskin trade-off | Fill in `[x]%` metrics; merge Overview+Problem+Opportunity |
| P4 | Smart Insights (6 clicks → 1) | Tightest case study — model for others | Takeaway could be slightly shorter |
| P5 | Touchscreen Display | Physical testing insights | Color system section is engineering detail — consider trimming |
| P6 | Performance Enterprise Strategy | Stakeholder facilitator shift | Takeaway has 2 unrelated stories; HMW can fold into Overview |

---

## Full Content Backup

All original text (pre-edit) is preserved in:
`/Users/yositayeerong/portfolio/case-study-backup.txt`
