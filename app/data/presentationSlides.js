/**
 * Presentation slide sequence for P1 + P2 + P3 interview presentation.
 *
 * Each slide has:
 *   type        — "intro" | "agenda" | "transition" | "content" | "wrapup"
 *   mode        — "both" | "45only"  (which timing version shows this slide)
 *   title       — slide heading (optional for content slides)
 *   notes       — speaker notes shown in presenter panel
 *   ...         — type-specific fields (see each section)
 *
 * Content slides use `blocks` — same schema as case study data blocks.
 * The renderer strips images/carousels automatically (slides are text-first).
 */

export const presentationSlides = [
  // ─────────────────────────────────────────────
  // INTRO
  // ─────────────────────────────────────────────
  {
    id: "intro",
    type: "intro",
    mode: "both",
    name: "Yosi Tayeer-Ong",
    role: "Senior Product Designer",
    tagline: "Recognition & Rewards at Paylocity",
    subtitle: "A 3-part story: unifying a legacy product, building 0→1 infrastructure, and closing a competitive gap.",
    notes:
      "Introduce yourself briefly. Frame the arc: these three case studies are all the same product line, shipped sequentially. You owned the design end-to-end across all three. Set the expectation for timing at the start.",
  },

  // ─────────────────────────────────────────────
  // AGENDA
  // ─────────────────────────────────────────────
  {
    id: "agenda",
    type: "agenda",
    mode: "both",
    title: "Today's agenda",
    items: [
      {
        number: "01",
        label: "Recognition Redesign",
        description: "Drove a 150% increase in recognition sent by unifying a legacy product",
      },
      {
        number: "02",
        label: "Rewards Infrastructure",
        description: "Designing a 0→1 money movement experience — $21.9M ARR",
      },
      {
        number: "03",
        label: "Gift Card Redemption",
        description: "Closing a $500K competitive sales gap with a pragmatic build decision",
      },
    ],
    notes:
      "Walk through the three case studies briefly. Mention that they build on each other chronologically. If interviewer has a time constraint, offer to go deeper on whichever one is most relevant to the role.",
  },

  // ─────────────────────────────────────────────
  // CASE STUDY 1 — Recognition Redesign (P2)
  // ─────────────────────────────────────────────
  {
    id: "cs1-transition",
    type: "transition",
    mode: "both",
    number: "01",
    label: "Recognition Redesign",
    stat: "150% increase in recognition sent",
    notes: "Brief pause. Set up the context: Recognition was a legacy feature scattered across the product. This was the foundation everything else was built on.",
  },
  {
    id: "cs1-problem",
    type: "content",
    mode: "both",
    title: "The Problem",
    image: "/casestudy/RRredesign/ESSLegacy.png",
    imageCaption: "Legacy Recognition feed in HR & Payroll",
    caseStudy: "recognition",
    sectionTitle: "The Problem",
    blocks: [
      {
        type: "paragraph",
        content:
          "Paylocity's Recognition tool was a legacy feature scattered across multiple areas of the suite, with several visual variations, built on different tech stacks, and not easy to find or use.\n\nWhen Paylocity decided to launch a brand-new Rewards product, it created the opportunity to finally fix Recognition too — combining both into a unified, standalone Recognition & Rewards experience.",
      },
      {
        type: "container",
        items: [
          { icon: "alert", description: "Multiple visual variations across the product, built on different tech stacks" },
          { icon: "trending-down", description: "Hard to find and use — low adoption and engagement" },
          { icon: "zap", description: "Rewards launch created the opportunity to fix Recognition at the same time" },
        ],
      },
    ],
    notes:
      "Key thing to land: this wasn't just a redesign — the Rewards launch created a forcing function to finally unify a fragmented experience. Frame it as the right moment to do the right thing.",
  },
  {
    id: "cs1-research",
    type: "content",
    mode: "45only",
    title: "Research & Discovery",
    image: "/casestudy/RRredesign/wires.png",
    imageCaption: "Cross-integration opportunity mapping",
    caseStudy: "recognition",
    sectionTitle: "Research & Discovery",
    blocks: [
      {
        type: "table",
        description: "The following activities helped me formulate a UX point-of-view.",
        headers: ["Activities", "Learnings"],
        rows: [
          {
            col1: "Conducted ==8 interviews== with internal Recognition users",
            col2: [
              "Users valued the leaderboard, feed, and Give flow — preserve and improve, don't reinvent",
              "Hard to find the right badge; hard to confirm the right person",
            ],
          },
          {
            col1: "Mapped ==cross-integration opportunities== across the platform",
            col2: [
              "Identified natural surfaces for Give Recognition to appear without users hunting for it",
              "Became key talking points when pitching to exec for funding",
            ],
          },
          {
            col1: "Performed ==competitive analysis== of recognition tools",
            col2: [
              "Established what good looks like for recognition products",
              "Informed layout decisions for both the landing page and Give Recognition flow",
            ],
          },
        ],
      },
    ],
    notes:
      "Highlight the research-to-decision link: 8 interviews told us to preserve, not reinvent. That decision saved months of work and kept us shipping. Cross-integration mapping directly influenced exec buy-in.",
  },
  {
    id: "cs1-solution",
    type: "content",
    mode: "both",
    title: "The Solution",
    image: "/casestudy/RRredesign/landingpage.png",
    imageCaption: "Net-new Recognition & Rewards landing page",
    caseStudy: "recognition",
    sectionTitle: "The Solution",
    blocks: [
      {
        type: "list",
        items: [
          "Unified, design-system compliant Recognition experience with a net-new landing page and redesigned Give Recognition flow",
          "AI message refinement and AI-generated recognition summaries to help employees surface achievements",
          "Plug-and-play Give Recognition experience — surfaceable across the platform at meaningful moments",
          "Cross-integrated with LMS, Community, Home, Calendar, and AI + Recommendation teams",
        ],
      },
      {
        type: "metrics",
        metrics: [
          { value: "$21.9M", label: "ARR generated" },
          { value: "150%", label: "Increase in Recognition Sent" },
          { value: "110%", label: "Increase in Comments" },
        ],
      },
    ],
    notes:
      "Briefly call out the AI decision: we could have done fully AI-generated messages, but we pushed back to preserve authenticity. Land on the metric — 150% increase in recognition sent. That's the headline.",
  },
  {
    id: "cs1-validation",
    type: "content",
    mode: "45only",
    title: "Design Validation",
    image: "/casestudy/RRredesign/usabilitytest.png",
    imageCaption: "Three rounds of usability testing",
    caseStudy: "recognition",
    sectionTitle: "Design Validation",
    blocks: [
      {
        type: "table",
        description: "Three rounds of usability testing across the major surfaces.",
        headers: ["Round", "Learnings"],
        rows: [
          {
            col1: "==8 usability tests== on landing page structure",
            col2: [
              "Give Recognition CTA was easy to find — placement confirmed",
              "Widget prioritization exercise informed page hierarchy",
            ],
          },
          {
            col1: "==160+ usability tests== on Give Recognition (desktop)",
            col2: [
              "Overall structure, preview concept, and mandatory message all validated",
              "Search field confusion led to added clarity in final design",
            ],
          },
          {
            col1: "==10 usability tests== on Give Recognition (mobile)",
            col2: [
              "Single-step flow chosen — badge was clear and editable inline",
              "Layout mirrored the recognition post closely enough to remove preview CTA entirely",
            ],
          },
        ],
      },
    ],
    notes:
      "The 160+ tests number always lands well. It signals rigor. The key decision: mandatory message. This came from data — usage was unlikely to drop. That's how you align product and leadership on a decision they resist.",
  },
  {
    id: "cs1-takeaway",
    type: "content",
    mode: "both",
    title: "Key Takeaway",
    image: "/casestudy/RRredesign/giverecognition.png",
    imageCaption: "Redesigned Give Recognition flow",
    caseStudy: "recognition",
    sectionTitle: "Key Takeaway",
    blocks: [
      {
        type: "highlight",
        content:
          "This project reiterated that ==I don't have to be the loudest voice in the room== to drive meaningful outcomes. I continuously leveraged user interviews and survey data to advocate for design decisions I believed in.\n\n**AI generated messages:** Product initially proposed fully AI-generated recognition messages. I pushed back to preserve authenticity. Recognition reinforces behavior and relationships — automating that entirely would weaken its intent. We landed on AI-powered text refinement: keeping recognition personal and human.\n\n**Personalized messages:** Recognition originally did not require a message. I advocated for making it mandatory, framing recognition as a culture-building tool. After surveying 160+ users, data showed usage was unlikely to drop. I used these findings to align product and leadership.",
      },
    ],
    notes:
      "Two push-back stories here. If time is tight, pick the mandatory message story — it's cleaner, the data is concrete, and it directly answers 'how do you advocate for users?' If they push on AI, the AI refinement story is your backup.",
  },

  // ─────────────────────────────────────────────
  // CASE STUDY 2 — Rewards Infrastructure (P1)
  // ─────────────────────────────────────────────
  {
    id: "cs2-transition",
    type: "transition",
    mode: "both",
    number: "02",
    label: "Rewards Infrastructure",
    stat: "$21.9M ARR",
    notes:
      "Bridge from P2: now that Recognition was unified, Paylocity needed a rewards infrastructure to back it. This is the 0→1 story — real money moving through the product.",
  },
  {
    id: "cs2-problem",
    type: "content",
    mode: "both",
    title: "The Problem",
    image: "/cover/rewards-management.png",
    imageCaption: "Rewards Management — 0 to 1",
    caseStudy: "rewards-management",
    sectionTitle: "The Problem",
    blocks: [
      {
        type: "paragraph",
        content:
          "Companies were using Paylocity's Recognition feature to give kudos to employees, but relied on separate tools to reward them. This created a fragmented experience across admins, managers, and employees.",
      },
      {
        type: "container",
        items: [
          { icon: "trending-down", description: "Multiple logins across tools reduced manager adoption of employee rewards" },
          { icon: "dollar-sign", description: "Admins had to manually upload reward earnings to Paylocity for taxation" },
          { icon: "database", description: "Admins manually uploaded employee data to external reward tools" },
          { icon: "x-octagon", description: "Employees had low trust in unfamiliar external reward platforms" },
        ],
      },
    ],
    notes:
      "Frame the stakes: this isn't just a UX problem. Manual uploads for taxation, fragmented logins, low employee trust — all of these are retention and adoption risks. Paylocity already had payroll infrastructure, which made native rewards uniquely powerful.",
  },
  {
    id: "cs2-research",
    type: "content",
    mode: "45only",
    title: "Research & Discovery",
    image: "/casestudy/rewards/wires.png",
    imageCaption: "Extensive wireframes for the Rewards experience",
    caseStudy: "rewards-management",
    sectionTitle: "Research & Discovery",
    blocks: [
      {
        type: "table",
        description: "Research that shaped the product direction.",
        headers: ["Activities", "Learnings"],
        rows: [
          {
            col1: "Analyzed ==500+ survey responses== from Recognition users",
            col2: [
              "Clients wanted Rewards natively integrated — fewer logins, simplified taxation, less manual work",
            ],
          },
          {
            col1: "Ran ==6 customer interviews== + ==1 internal stakeholder interview==",
            col2: [
              "Companies of different sizes run rewards very differently — direct allocation vs. manager routing",
              "The tool needed to be flexible enough to meet most models without heavy configuration",
            ],
          },
          {
            col1: "Conducted ==competitive analysis== of reward platforms",
            col2: [
              "Uncovered a range of funding models: pre-pay, pay-as-you-go, post-pay",
              "Defined table-stakes features and what was realistic for MVP vs. future",
            ],
          },
        ],
      },
    ],
    notes:
      "The 500 survey responses is a strong signal of scale. But the 6 interviews surfaced the nuance: company size changes the entire model. That insight directly drove the flexible allocation design.",
  },
  {
    id: "cs2-solution",
    type: "content",
    mode: "both",
    title: "The Solution",
    image: "/casestudy/rewards/overview.png",
    imageCaption: "Program & wallets overview",
    caseStudy: "rewards-management",
    sectionTitle: "The Solution",
    blocks: [
      {
        type: "paragraph",
        content:
          "A simple, auditable money movement experience where funds flow from company accounts through Give wallets to employees' Redeem wallets, with ==tax implications handled throughout==.\n\nTo accommodate how differently companies structure rewards, ==I designed for flexibility==. Rewards can flow from admins directly to employees or through managers as intermediaries, with allocation methods that flex: customize per manager, split evenly, or split per direct report.",
      },
      {
        type: "metrics",
        metrics: [
          { value: "$21.9M", label: "ARR generated" },
          { value: "$8.2M", label: "Total redeemed" },
          { value: "90%", label: "YoY increase in R&R clients" },
        ],
      },
    ],
    notes:
      "The wallet model (company → Give → Redeem) is intuitive but took real design work to land. Emphasize the flexibility: one product that works for a 50-person company and a 5,000-person company. That's the design challenge.",
  },
  {
    id: "cs2-constraints",
    type: "content",
    mode: "45only",
    title: "Constraints & Trade-offs",
    image: "/casestudy/rewards/manageboost.png",
    imageCaption: "Fund distribution to boost wallets",
    caseStudy: "rewards-management",
    sectionTitle: "Constraints & Trade-offs",
    blocks: [
      {
        type: "highlight",
        content:
          "**Constraint:** Large datasets (500+ employees) weren't loading properly in tables.\n\n**Decision:** We limited Reward Givers to managers instead of enabling peer-to-peer, and simplified wallet management to avoid bulk-loading all employee wallets.\n\n**Trade-off:** We optimized for speed to market. Peer-to-peer rewards and broader program types are scoped for post-MVP.",
      },
    ],
    notes:
      "This slide shows product judgment: knowing when to cut scope without killing the core value. Peer-to-peer was a nice-to-have for MVP. The core job — managers rewarding employees — still shipped.",
  },
  {
    id: "cs2-takeaway",
    type: "content",
    mode: "both",
    title: "Key Takeaway",
    image: "/casestudy/rewards/transactionhistory.png",
    imageCaption: "Transaction history",
    caseStudy: "rewards-management",
    sectionTitle: "Key Takeaway",
    blocks: [
      {
        type: "highlight",
        content:
          "I learned to ==leverage the credibility of others== when I'm the only one advocating for users in a room of engineers.\n\n**The situation:** The engineering team heavily pushed for a 'build up' table pattern for the main use case of allocating money from the company wallet to managers' Give wallets — driven by tech constraints.\n\n**My stance:** This pattern wasn't consistent with Paylocity's platform or industry norms. Imagine landing on a key experience and seeing an empty table you have to build up from scratch.\n\n**How it resolved:** I brought in the design system team and my UX team to champion the industry-standard table experience. We landed at a compromise for MVP: only allowing managers to boost, which removed the need for the problematic build-up pattern entirely.",
      },
    ],
    notes:
      "This is the strongest push-back story in all three case studies. The 'leverage other people's credibility' insight is mature and resonates with senior interviewers. Make sure to land the resolution — it wasn't just a complaint, it was a design-led solution.",
  },

  // ─────────────────────────────────────────────
  // CASE STUDY 3 — Gift Card Redemption (P3)
  // ─────────────────────────────────────────────
  {
    id: "cs3-transition",
    type: "transition",
    mode: "both",
    number: "03",
    label: "Gift Card Redemption",
    stat: "$500K sales gap closed",
    notes:
      "Bridge from P1: Rewards was live with cash redemption. But a gap emerged post-launch. This is a fast-follow story about product judgment and pragmatic design decisions under constraints.",
  },
  {
    id: "cs3-problem",
    type: "content",
    mode: "both",
    title: "The Problem",
    image: "/casestudy/RRredesign/cashredemption.png",
    imageCaption: "Cash-only redemption experience (MVP)",
    caseStudy: "rewards-catalog",
    sectionTitle: "The Problem",
    blocks: [
      {
        type: "paragraph",
        content:
          "Recognition & Rewards launched with cash-only redemption. This made sense for Paylocity since we already had payroll infrastructure and employee bank details on file. But over time, three problems emerged.",
      },
      {
        type: "container",
        items: [
          { icon: "ban", title: "Paper Check Exclusion", description: "Cash redemption required direct deposit. Roughly 7% of employees couldn't use the feature at all." },
          { icon: "globe", title: "No International Support", description: "No support for non-USD currencies, limiting international scale." },
          { icon: "trending-down", title: "$500K Sales Gap", description: "HR admins expected gift card parity with established reward providers. Some companies refused to switch without it." },
        ],
      },
    ],
    notes:
      "The $500K number is sales data — this wasn't a hypothetical. Deals were being lost. That gives the project urgency and a clear success metric. The 7% exclusion is also a strong equity angle if the interviewer cares about inclusion.",
  },
  {
    id: "cs3-tradeoff",
    type: "content",
    mode: "both",
    title: "Build vs. Reskin",
    image: "/casestudy/giftcard/rewardscatalog-multisteps.png",
    imageCaption: "Multi-step redemption flow (Tango reskin)",
    caseStudy: "rewards-catalog",
    sectionTitle: "Build Options and Trade-Offs",
    blocks: [
      {
        type: "paragraph",
        content:
          "The biggest decision: build our own redemption flow, or reskin Tango's existing experience.",
      },
      {
        type: "comparison",
        options: [
          {
            label: "Option A: Build our own flow",
            items: [
              { type: "pro", text: "Users see their claim code immediately — fewer steps." },
              { type: "pro", text: "Full control over the experience and future iteration." },
              { type: "con", text: "Longer development time; delays go-to-market timeline." },
              { type: "con", text: "Higher engineering risk building from scratch with a new API." },
            ],
          },
          {
            label: "Option B: Reskin Tango's experience",
            items: [
              { type: "pro", text: "Faster launch, lower engineering lift, reduced delivery risk." },
              { type: "pro", text: "Tried-and-true flow that Tango users already understand." },
              { type: "con", text: "Tedious multi-step process: copy security code, open link, paste, retrieve code." },
              { type: "con", text: "Less control over UX — dependent on Tango's implementation." },
            ],
          },
        ],
      },
    ],
    notes:
      "This slide is about product judgment. Interviewers want to see that you can make a pragmatic call. We chose Option B — speed to market — and then focused design energy on making the constrained experience as clear as possible. That's the right call for a fast-follow feature.",
  },
  {
    id: "cs3-solution",
    type: "content",
    mode: "both",
    title: "The Solution",
    image: "/casestudy/giftcard/rewardscatalog.png",
    imageCaption: "Gift card catalog — 25 most-redeemed options",
    caseStudy: "rewards-catalog",
    sectionTitle: "The Solution",
    blocks: [
      {
        type: "highlight",
        content:
          "A curated ==gift card catalog of the 25 most-redeemed options==, available on both desktop and mobile. Users can browse, select, and purchase gift cards entirely within Paylocity, with transaction history to retrieve codes anytime.",
      },
      {
        type: "metrics",
        metrics: [
          { value: "$500K", label: "Sales Gap Closed" },
          { value: "$290K", label: "Redeemed in gift cards" },
          { value: "13%", label: "Of redemptions are gift cards" },
        ],
      },
    ],
    notes:
      "The 25-card constraint was intentional — not a limitation. Starting small let us learn Tango's API and manage risk. Post-launch, the 13% redemption share tells us users are actually using it. That validates the decision to ship fast over ship perfect.",
  },
  {
    id: "cs3-takeaway",
    type: "content",
    mode: "both",
    title: "Key Takeaway",
    image: "/casestudy/giftcard/rewardscatalog-details.png",
    imageCaption: "Gift card detail view with denomination selection",
    caseStudy: "rewards-catalog",
    sectionTitle: "Key Takeaway",
    blocks: [
      {
        type: "highlight",
        content:
          "Sometimes the right call is getting a working solution into users' hands rather than waiting for the ideal one. ==Gift card redemption closed a real gap== for users who couldn't benefit from cash-only rewards.\n\nThe experience wasn't perfect by design standards, but it was functional and on-brand. My focus shifted to making the multi-step Tango flow as clear and bearable as possible through strong visual hierarchy and content.\n\nPost-launch, user behavior and feedback will inform when and how to expand the catalog beyond the initial 25 options.",
      },
    ],
    notes:
      "This takeaway shows maturity: knowing when 'good enough and shipped' beats 'perfect and delayed.' It's a different kind of advocacy story — advocating for the user who gets excluded if we wait too long.",
  },

  // ─────────────────────────────────────────────
  // WRAP-UP
  // ─────────────────────────────────────────────
  {
    id: "wrapup",
    type: "wrapup",
    mode: "both",
    title: "Across all three projects",
    themes: [
      {
        label: "Design as leverage",
        description: "Used data, credibility-sharing, and cross-team alignment to move decisions — not just design craft.",
      },
      {
        label: "Pragmatic scoping",
        description: "Consistently chose speed to market with intentional trade-offs over waiting for perfect conditions.",
      },
      {
        label: "End-to-end ownership",
        description: "Solo or lead designer across all three — from research to launch to post-launch iteration.",
      },
    ],
    closing: "Questions?",
    notes:
      "Synthesize the arc: Recognition gave us the foundation, Rewards built the infrastructure, Gift Cards closed the gap. All three show the same muscle: design judgment + user advocacy + cross-functional leadership. Open it up for questions.",
  },
];

/**
 * Returns slides filtered by timing mode.
 * @param {"25" | "45"} mode
 */
export function getSlides(mode) {
  if (mode === "45") return presentationSlides;
  return presentationSlides.filter((s) => s.mode !== "45only");
}
