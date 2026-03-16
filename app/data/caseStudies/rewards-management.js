export const rewardsManagement = {
  hero: true,
  title:
    "Solo-designed an admin-facing rewards infrastructure from 0→1 ($21.9M ARR)",
  vimeoId: "1167074985",
  images: [
    "cover/rewards-management.png",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&h=450&fit=crop",
  ],
  bgColor: "#E8EDF6",
  teamSummary: "==Solo designer and researcher== working alongside two product teams: Recognition & Rewards (1 PM, 8 Eng, 2 QA) and Money Movement (2 PMs).",
  sections: [
    {
      title: "The Problem",
      blocks: [
                {
          type: "paragraph",
          content:
            "Companies were using Paylocity's Recognition feature to give kudos to their employees, but relied on separate tools to reward them. This created a fragmented experience across admins, managers, and employees. Their key pain points include:",
        },
        {
          type: "container",
          items: [
            {
              icon: "trending-down",
              description: "Multiple logins across tools reduced manager adoption of employee rewards",
            },
            {
              icon: "dollar-sign",
              description: "Admins had to manually upload reward earnings to Paylocity for taxation",
            },
            {
              icon: "database",
              description: "Admins manually uploaded employee data to external Reward tools",
            },
            {
              icon: "x-octagon",
              description: "Employees had low trust in unfamiliar external reward platforms",
            },
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
            "A simple, auditable money movement experience where funds flow from company accounts through Give wallets to employees' Redeem wallets, with ==tax implications handled throughout==.\n\nTo accommodate how differently companies structure rewards, ==I designed for flexibility==. Rewards can flow from admins directly to employees or through managers as intermediaries, with allocation methods that flex: customize per manager, split evenly, or split per direct report. This also sets the foundation for peer-to-peer giving in future iterations.",
        },
                {
          type: "carousel",
          thumbnails: true,
          description: "",

          images: [
          { src: "/casestudy/rewards/overview.png", caption: "Program & wallets overview" },
          { src: "/casestudy/rewards/prefunding.png", caption: "Pre-funding (moving money from bank account to Paylocity" },
          { src: "/casestudy/rewards/manageboost.png", caption: "Fund distribution to boost wallets" },
          { src: "/casestudy/rewards/transactionhistory.png", caption: "Transaction history" },
    ],
  }
      ],
    },
    {
      title: "Impact & Outcomes",
      blocks: [
        {
          type: "metrics",
          metrics: [
            { value: "$21.9M", label: "ARR generated" },
            { value: "$8.2M", label: "Total redeemed" },
            { value: "90%", label: "YoY increase in R&R clients" },

          ],
        },
      ],
    },
    {
      title: "Research & Discovery",
      blocks: [
        {
          type: "table",
          description: "The following activities helped me formulate a UX point-of-view for this initiative.",
          headers: ["Activities", "Learnings"],
          rows: [
            {
              col1: "Analyzed ==500+ survey responses== from companies using Paylocity's Recognition feature",
              col2: [
                "Clients wanted Rewards natively integrated with the Recognition tool they already used at Paylocity",
                "A unified experience meant fewer logins, simplified taxation, and less manual admin work",
              ],
            },
            {
              col1: "Ran ==6 customer interviews== with Recognition users and ==1 internal stakeholder interview==",
              col2: [
                "Companies of different sizes run rewards very differently. Smaller ones allocate directly to employees; larger ones route through managers",
                "==Our tool needed to be flexible== enough to meet most models without heavy configuration",
              ],
            },
            {
              col1: "Conducted ==competitive analysis== of rewards platforms identified by customers",
              col2: [
                "Uncovered a range of funding models: pre-pay, pay-as-you-go, and post-pay",
                "Identified giving structures: peer-to-peer, manager-to-employee, and group-based allocation",
                "Defined table-stakes features and informed what was realistic for MVP vs. future iterations",
              ],
            },
          ],
        },
      ],
    },

    {
      title: "Validating with Clients",
      blocks: [
        {
          type: "image",
          description: "I facilitated ==6 usability sessions== to validate early concepts with clients. We confirmed that the wallet model (company → boost → redeem) resonated. One recurring signal came through: transaction history felt too prominent, so I moved it behind a text link.\n\nOur first concept required admins to manually assign who could give rewards. Usability confirmed users understood it, but dev complexity was too high for our timeline. We simplified so everyone can boost. Removing the permission flow also meant admins no longer had to configure a list of reward givers before the program could go live.",
          src: "/casestudy/rewards/wires.png",
          link: "https://whimsical.com/taylor-s-workspace6262/rewards-wireframes-XByqej6opLpwyEZyCGsCww",
          caption: "Extensive wireframes for Rewards Management experience",
        },
      ],
    },
    {
      title: "Constraints & Trade-offs",
      blocks: [
        {
          type: "highlight",
          content:
            '**Constraint:** Large datasets (500+ employees) weren\'t loading properly in tables.\n\n**Decision:** We limited Reward Givers to managers instead of enabling peer-to-peer, and simplified wallet management to avoid bulk-loading all employee wallets.\n\n**Trade-off:** We optimized for speed to market. Peer-to-peer rewards and broader program types are scoped for post-MVP.',
        },
      ],
    },
    {
      title: "Key Takeaway",
      blocks: [
        {
          type: "highlight",
          content:
            'I learned to ==leverage the credibility of others== when I\'m the only one advocating for users in a room of engineers.\n\n**Engineers had a strong stance:** The engineering team heavily pushed for a "build up" experience for the main use case of allocating money from the company wallet to managers\' Give wallets because of tech constraints.\n\n**Pushing back:** This "build up" table pattern wasn\'t consistent with Paylocity\'s platform or industry norms, and would be confusing. Imagine landing on a key experience and seeing an empty table, and learning that you have to build up a list of people.\n\n**How we compromised:** I leveraged other people\'s credibility by bringing in the design system team as well as my UX team to champion for the industry standard table experience, which landed us at a compromise for MVP which was only allowing managers to boost.',
        },
      ],
    },
  ],
  audio: {
    src: "/audio/p1.mp3",
    duration: "1:45",
  },
};
