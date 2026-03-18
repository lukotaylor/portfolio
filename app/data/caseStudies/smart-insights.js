export const smartInsights = {
  hero: true,
  images: ["/cover/smartinsights.png"],
  title: "Reducing insight discovery from 6+ clicks to just 1",
  audio: {
    src: "/audio/p4.mp3",
    duration: "3:24",
  },
  vimeoId: "1167935050",
  teamSummary: "Solo designer working with a product team of 1 PM based in the USA and 1 lead engineer based in India.",
  sections: [
    {
      title: "The Problem",
      blocks: [
        {
          type: "carousel",
          thumbnails: true,
          description: "Brands need quick access to what customers are saying about them — whether in response to a new product launch or a recent scandal. The existing workflow in Sprinklr Research was powerful and buried. ==6+ clicks stood between a user and a single insight,== requiring significant configuration and cognitive effort just to understand the root cause of one data point.",
          images: [
          { src: "/casestudy/smartinsights/SI02.png", caption: "Step 1: Click negative sentiment score to drill down — a flyout appears with 50+ dimension options to choose from" },
          { src: "/casestudy/smartinsights/SI03.png", caption: "Step 2: Select a dimension (e.g. Conversation Stream) — results load in an overlay" },
          { src: "/casestudy/smartinsights/SI04.png", caption: "Step 3: Open the more actions menu to find additional controls" },
          { src: "/casestudy/smartinsights/SI05.png", caption: "Step 4: Locate the sort option buried within the menu" },
          { src: "/casestudy/smartinsights/SI06.png", caption: "Step 5: Sort by reach to finally surface which conversation stream contributed most to the negative sentiment" },
    ],
  }
      ],
    },
    {
      title: "The Solution",
      blocks: [
        {
          type: "paragraph",
          content:
            "A non-intrusive way to surface data anomalies directly within charts. Users who care about overall trends aren't interrupted — and those who need to investigate can toggle insights on globally. A ==color-matched bulb icon== appears on each chart to signal an anomaly, immediately connecting the insight to the right dataset.",
        },
        {
          type: "image",
          images: [
            { src: "/casestudy/smartinsights/SmartInsights.gif" },
          ],
          fit: "natural",
        },
      ],
    },
    {
      title: "Impact & Outcomes",
      blocks: [
        {
          type: "metrics",
          metrics: [
            { value: "56K+", label: "Clicks in 2 Months" },
            { value: "3.8K", label: "Users" },
            { value: "800+", label: "Brands" },
          ],
        },
      ],
    },
    {
      title: "Research & Discovery",
      blocks: [
        {
          type: "table",
          description: "Four activities helped me formulate a UX point-of-view for this initiative.",
          headers: ["Activities", "Learnings"],
          rows: [
            {
              col1: "==Analyzed the existing workflow==",
              col2: [
                "Exposed just how granular the experience was — 50+ dimensions, multiple sort options, layered navigation",
                "Confirmed the core problem: the power was there, but the cognitive load to access it was too high",
              ],
            },
            {
              col1: "==Reviewed call recordings== of account managers and clients",
              col2: [
                "Heard directly from account managers about what clients expected to be able to do",
                "Surfaced real-world scenarios clients were struggling with, like monitoring brand conversations during a crisis",
              ],
            },
            {
              col1: "==Audited data types== available for MVP",
              col2: [
                "Produced a running list of what data we could surface, giving design a clear scope to visualize against",
              ],
            },
            {
              col1: "==Competitive analysis== across Brandwatch, Domo, and Sprout Social",
              col2: [
                "Assessed feature parity and learned patterns for how competitors surface insights",
                "Informed our approach to progressive disclosure and anomaly signaling",
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Defining the Key Experiences",
      blocks: [
        {
          type: "paragraph",
          content:
            "Working closely with my PM, VP of Design, and UX Manager, I distilled the experience down to four key moments — each one a deliberate step in ==progressively revealing data== without overwhelming the user.",
        },
        {
          type: "flow",
          steps: [
            { title: "User enables the feature" },
            { title: "Clicks bulb icon on a data anomaly" },
            { title: "Flyout surfaces top contributing factors at a glance" },
            { title: "Clicks \"View Detail\" for deeper data and visualizations" },
          ],
        },
      ],
    },
    {
      title: "Scalability Challenges",
      blocks: [
        {
          type: "paragraph",
          content:
            "During implementation, developers flagged that charts with many anomalies caused insight bulbs to overflow into the x-axis labels. I proposed a ==nested icon pattern==: a single neutral icon that groups multiple insights underneath, solving both the overflow and any accessibility concerns. This shipped as a fast-follow update.",
        },
        {
          type: "image",
          images: [
            { src: "/casestudy/smartinsights/insightsoverflow.png", caption: "Figure A: overflowing insights icon" },
            { src: "/casestudy/smartinsights/insightsoverflowsolution.gif", caption: "Figure B: solution for when there’s > 1 category in the fly out" },
          ],
          fit: "natural",
        },
      ],
    },
    {
      title: "Customer Feedback",
      blocks: [
        {
          type: "paragraph",
          content: "Shortly after launch, unsolicited feedback started coming in from clients.",
        },
        {
          type: "quote",
          content: "The data and insights that appear from these different bubbles is exactly the kind of information that I would love to see easier when we drill down...it gives us a general idea of what is causing a spike. If I currently click to drill down manually, there are a lot of options and a lot of clicks to discover what is going on.",
          attribution: "Phillip Morris International, Crisis Management Team",
        },
          {
          type: "quote",
          content: "I have looked at the new insights feature. Overall, it looks great and will be a sought after feature. It will probably be even more useful than Smart Theme Explorer.",
          attribution: "P&G, Solution Owner",
        },
      ],
    },
    {
      title: "Key Takeaway",
      blocks: [
        {
          type: "highlight",
          content:
            "Product's initial direction was to look at competitors for inspiration. I advocated for going deeper first — reviewing call recordings, analyzing the existing workflow, and auditing the data we could surface. That groundwork is what led to the ==progressive disclosure approach==. Understanding the full complexity of the existing workflow made it clear the solution needed to abstract that complexity away, not just borrow a pattern.",
        },
      ],
    },
  ],
};
