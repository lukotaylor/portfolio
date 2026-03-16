export const rewardsCatalog = {
  title: "Closed a $500K competitive sales gap by launching gift card redemption",
  vimeoId: "1173154720",
  vimeoAspect: "4:3",
  images: [
    "/casestudy/giftcard/cover.png",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&h=450&fit=crop",
    "https://images.unsplash.com/photo-1561070791821-3f44a563fa4c?w=800&h=450&fit=crop",
    "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=450&fit=crop",
  ],
  teamSummary: "==Solo designer== for desktop working alongside 2 PMs, 12 Engs, and 2 QAs. ==Lead designer== for mobile working alongside 3 rotating designers.",
  sections: [

    {
      title: "The Problem",
      blocks: [
        {
          type: "paragraph",
          content:
            "Recognition & Rewards launched with cash-only redemption for MVP. This made sense for Paylocity since we already had payroll infrastructure and employee bank details on file. But over time, three problems emerged.",
        },
        {
          type: "container",
          items: [
            {
              icon: "ban",
              title: "Paper Check Exclusion",
              description: "Cash redemption required direct deposit. Roughly 7% of Paylocity employees still receive paper checks and couldn't use the feature at all.",
            },
            {
              icon: "globe",
              title: "No International Support",
              description: "The system didn't support non-USD currencies, limiting the product from scaling internationally.",
            },
            {
              icon: "trending-down",
              title: "$500K Sales Gap",
              description: "HR admins expected gift card parity with established rewards providers. Some companies refused to switch to Paylocity without it.",
            },
          ],
        },
        {
          type: "device-compare",
          desktop: { src: "/casestudy/RRredesign/cashredemption.png" },
          mobile: { src: "/casestudy/RRredesign/mobile/cashredemption.png" },
          caption: "Cash-only redemption experience (MVP)",
        },
      ],
    },
    {
      title: "The Solution",
      blocks: [
        {
          type: "highlight",
          content:
            "A curated ==gift card catalog of the 25 most-redeemed options==, available on both desktop and mobile. Users can browse, select, and purchase gift cards entirely within Paylocity, with transaction history to retrieve codes anytime.",
        },
        {
          type: "carousel",
          sideBySide: true,
          thumbnails: true,
          mobileAlign: "flex-end",
          images: [
            { src: "/casestudy/giftcard/rewardscatalog.png", caption: "Gift card catalog — 25 most-redeemed options curated from Tango's 3,000+ brand library" },
            { src: "/casestudy/giftcard/rewardscatalog-details.png", caption: "Gift card detail view with denomination selection" },
            { src: "/casestudy/giftcard/rewardscatalog-redeeming.png", caption: "Redeeming a gift card with security code retrieval" },
            { src: "/casestudy/giftcard/rewardscatalog-multisteps.png", caption: "Multi-step redemption flow reskinned from Tango's existing experience" },
            { src: "/casestudy/giftcard/rewardscatalog-activity.png", caption: "Transaction history to retrieve gift card codes anytime" },
          ],
          mobileImages: [
            { src: "/casestudy/giftcard/mobile/rewardscatalog.png" },
            { src: "/casestudy/giftcard/mobile/rewardscatalog-details.png" },
            { src: "/casestudy/giftcard/mobile/rewardscatalog-redeeming.png" },
            { src: "/casestudy/giftcard/mobile/rewardscatalog-multisteps.png" },
            { src: "/casestudy/giftcard/mobile/rewardscatalog-activity.png" },
          ],
        },
      ],
    },
    {
      title: "Impact & Outcomes",
      blocks: [
        {
          type: "metrics",
          metrics: [
            { value: "$500K", label: "Sales Gap Closed" },
            { value: "$290K", label: "Redeemed in gift cards" },
            { value: "13%", label: "Of redemptions are gift cards", footnote: "Gift cards launched Jan 2025, 10 months after cash redemption launched (Mar 2024)" },
          ],
        },
      ],
    },
    {
      title: "Finding the Right Partner",
      blocks: [
        {
          type: "paragraph",
          content:
            "The team evaluated gift card integration partners and selected ==Tango Card==. Here is why they were the right fit:",
        },
        {
          type: "container",
          items: [
            {
              icon: "dollar-sign",
              title: "Free Integration",
              description: "A low-risk way to expand redemption options without additional budget.",
            },
            {
              icon: "star",
              title: "Catalog Breadth",
              description: "Wide selection of gift cards available, from over 3,000 brands.",
            },
            {
              icon: "users",
              title: "Dedicated Support",
              description: "Dedicated account manager support for implementation and the life of the partnership.",
            },
          ],
        },
      ],
    },
    {
      title: "Scoping the Rewards Catalog",
      blocks: [
        {
          type: "paragraph",
          content:
            "Tango offers over 3,000 gift cards. Rather than launching the full catalog, we intentionally scoped MVP to the ==25 most-redeemed options== (per Tango data). Starting small let us learn the ins and outs of Tango's API, manage complexity, and reduce risk before expanding the catalog or introducing customization options.",
        },
      ],
    },
    {
      title: "Build Options and Trade-Offs",
      blocks: [
        {
          type: "paragraph",
          content:
            "The biggest decision we had to make was whether to build our own redemption flow or reskin Tango's existing experience.",
        },
        {
          type: "comparison",
          options: [
            {
              label: "Option A: Build our own flow",
              items: [
                { type: "pro", text: "Users see their claim code immediately, fewer steps to start spending rewards." },
                { type: "pro", text: "Full control over the experience and future iteration." },
                { type: "con", text: "Longer development time; delays go-to-market timeline." },
                { type: "con", text: "Higher engineering risk, building from scratch with a new API." },
              ],
            },
            {
              label: "Option B: Reskin Tango's experience",
              items: [
                { type: "pro", text: "Faster launch, lower engineering lift, reduced delivery risk." },
                { type: "pro", text: "Tried-and-true flow that Tango users already understand." },
                { type: "con", text: "Tedious multi-step process: copy security code, open link, paste, retrieve code." },
                { type: "con", text: "Less control over UX; dependent on Tango's implementation." },
              ],
            },
          ],
        },
        {
          type: "paragraph",
          content:
            "We ==prioritized speed to market== and chose to reskin Tango's experience. To compensate for the multi-step flow, I focused on clear content, strong visual hierarchy, and brand-compliant designs that felt native to Paylocity even within Tango's constraints.",
        },
      ],
    },
    {
      title: "Key Takeaway",
      blocks: [
        {
          type: "highlight",
          content:
            "Sometimes the right call is getting a working solution into users' hands rather than waiting for the ideal one. ==Gift card redemption closed a real gap== for users who couldn't benefit from cash-only rewards. The experience wasn't perfect by design standards, but it was functional and on-brand.\n\nMy focus shifted to making the multi-step Tango flow as clear and bearable as possible through strong visual hierarchy and content. Post-launch, user behavior and feedback will inform when and how to expand the catalog beyond the initial 25 options.",
        },
      ],
    },
  ],
};
