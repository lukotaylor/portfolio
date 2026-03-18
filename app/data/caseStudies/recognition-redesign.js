export const recognitionRedesign = {
  title:
    "Drove a 150% increase in recognition sent by unifying a legacy product",
  vimeoId: "1167579687",
  images: [
    "/cover/recognition.png",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&h=450&fit=crop",
  ],
  teamSummary: "==Solo designer== for desktop working alongside 2 PMs, 12 Engs, and 2 QAs. ==Lead designer== for mobile working alongside 3 rotating designers.",
  sections: [
    {
      title: "The Problem",
      blocks: [
        {
          type: "paragraph",
          content:
            "Paylocity's Recognition tool was a legacy feature scattered across multiple areas of the suite, with ==several visual variations, built on different tech stacks, and not easy to find or use.==\n\nWhen Paylocity decided to launch a brand-new Rewards product, it created the opportunity to finally fix Recognition as well, combining both experiences into a unified, standalone Recognition & Rewards experience.",
        },
        {
          type: "carousel",
          sideBySide: true,
          thumbnails: true,
          images: [
            { src: "/casestudy/RRredesign/ESSLegacy.png", caption: "Legacy feed in HR & Payroll product" },
            { src: "/casestudy/RRredesign/Leaderboard.png", caption: "Legacy leaderboard in HR & Payroll product" },
            { src: "/casestudy/RRredesign/GiveImpression.png", caption: "Give Recognition in HR & Payroll product" },
            { src: "/casestudy/RRredesign/CommunityFeed.png", caption: "Recognition feed in Community product" },
          ],
          mobileImages: [
            { src: "/casestudy/RRredesign/mobile/ESSLegacy.png" },
            { noMobile: true },
            { src: "/casestudy/RRredesign/mobile/GiveImpression.png" },
            { src: "/casestudy/RRredesign/mobile/CommunityFeed.png" },
          ],
        },
        
      ],
    },
        {
      title: "The Solution",
      blocks: [
        {
          type: "list",
          items: [
            "Shipped a unified, design-system compliant Recognition experience, including a net-new landing page and a redesigned Give Recognition flow",
            "Built a plug-and-play Give Recognition experience, enabling it to surface across the platform at meaningful moments (next on the roadmap)",
            "Shipped AI message refinement and AI-generated recognition summaries to help employees track and surface achievements",
            "Cross-integrated with the following teams: Learning Management System, Community, Home, Calendar, and AI + Recommendation",
          ],
        },

        {
          type: "carousel",
          images: [
            { src: "/casestudy/RRredesign/landingpage.png", caption: "Net-new landing page consolidating all dispersed Recognition experiences, with Rewards and personalized recommendations of people to recognize" },
            { src: "/casestudy/RRredesign/giverecognition.png", caption: "Redesigned Give Recognition flow, addressing key user pain points with net-new capabilities: AI message refinement, attachments, and a richer composition experience" },
            { src: "/casestudy/RRredesign/recognitiondetails.png", caption: "Recognition detail view showing the full message, attachments, likes, comments, and AI-powered comment suggestions" },
            { src: "/casestudy/RRredesign/cashredemption.png", caption: "Cash redemption — a key differentiator in the R&R space, made possible by Paylocity's native payroll infrastructure. Gift card redemption shipped as a fast follow." },
          ],
          sideBySide: true,
          thumbnails: true,
          mobileAlign: "flex-end",
          mobileImages: [
            { src: "/casestudy/RRredesign/mobile/landingpage.png" },
            { src: "/casestudy/RRredesign/mobile/giverecognition.png" },
            { src: "/casestudy/RRredesign/mobile/recognitiondetails.png" },
            { src: "/casestudy/RRredesign/mobile/cashredemption.png" },
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
            { value: "$21.9M", label: "ARR generated" },
            { value: "150%", label: "Increase in Recognition Sent" },
            { value: "110%", label: "Increase in Comments" },
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
              col1: "Conducted ==8 interviews== with internal Recognition users",
              col2: [
                "Users valued the leaderboard, feed, and Give Recognition flow. The call was to preserve and improve, not reinvent",
                "The Give Recognition flow had friction: badges were hard to browse, and the search lacked profile photos and titles to confirm the right person",
              ],
            },
            {
              col1: "Mapped ==cross-integration opportunities== across the platform with product",
              col2: [
                "Identified natural surfaces where Give Recognition could appear without users having to hunt for it",
                "Became key talking points when socializing the initiative with other teams and pitching to exec for funding",
              ],
            },
            {
              col1: "Performed a ==competitive analysis== of recognition experiences",
              col2: [
                "Established what good looks like for recognition products",
                "Informed layout decisions for both the landing page and the Give Recognition flow",
              ],
            },
          ],
        },
        {
          type: "image",
          src: "/casestudy/RRredesign/wires.png",
          link: "https://whimsical.com/taylor-s-workspace6262/r-and-r-integration-explorations-KN4TAwwstiEo7L5qqnMn83",
          caption: "Ideas Product x UX created on Recognition & Rewards cross-integration opportunities",
        },
      ],
    },
    {
      title: "Defining the MVP",
      blocks: [
        {
          type: "paragraph",
          content:
            "Users found value in the existing experiences, particularly the leaderboard, the feed, and the Give Recognition flow. While Give Recognition was bare-bones, it effectively supported the core job. Rather than reinventing the experience entirely, I focused on ==improving what already worked==.\n\nFor MVP, we brought the existing experiences users loved into a unified landing page, rethinking the layout to better fit their needs based on interviews I hosted and competitive signals. I ran a ==stacked ranking survey to further inform prioritization==, ensuring the experience surfaced the people users care about most: themselves, their direct reports, and their indirect reports.",
        },
        {
          type: "paragraph",
          content: "Interview participants echoed this clearly: users weren't seeing content that felt relevant to them.",
        },
        {
          type: "quote",
          content: "When there are a lot of Impressions, it's important to make the impressions that people care about more visible.",
          attribution: "Internal power user",
        },
        {
          type: "quote",
          content: "The Client Funds Accounting team just give each other impressions, they don't deal with people outside their own team. It's annoying at this point that they are doing impressions constantly, they are monopolizing the leaderboard.",
          attribution: "Internal power user",
        },
      ],
    },
    {
      title: "Design Validation",
      blocks: [
        {
          type: "table",
          description: "Across three rounds of usability testing, I validated key design decisions and refined the experience based on real user feedback.",
          headers: ["Activities", "Learnings"],
          rows: [
            {
              col1: "==8 usability tests== on Recognition landing page structure",
              col2: [
                "Give Recognition CTA was easy to find with high task success, confirming placement was working",
                "Widget prioritization exercise informed page structure and component hierarchy",
                "Signaled the need to make Recognition cards feel clearly clickable",
              ],
            },
            {
              col1: "==160+ usability tests== on the Give Recognition experience on desktop",
              col2: [
                "Validated the overall structure, preview concept, and mandatory message — all held up",
                "Search field caused confusion, leading to added clarity in the final design",
              ],
            },
            {
              col1: "==10 usability tests== on the Give Recognition experience on mobile",
              col2: [
                "Multi-step and single-step (hub and spoke) flows performed equally. I chose single-step because the selected badge was clear and editable inline, and the recipient field scaled well to multiple users",
                "The layout mirrored the Recognition post closely enough to remove the preview CTA entirely, reducing complexity without hurting the experience",
              ],
            },
          ],
        },
        

        {
          type: "image",
          src: "/casestudy/RRredesign/usabilitytest.png",
          caption: "Three rounds of usability testing across Recognition landing page structure, Give Recognition on desktop, and Give Recognition on mobile",
        },
      ],
    },
    {
      title: "Contributing to the Design System",
      blocks: [
        {
          type: "paragraph",
          content:
            "==Design systems== for both desktop and mobile ==were evolving== during this project. I worked closely with the design systems team to prioritize the components Recognition needed, keeping us on track to launch with the updated visual language. \n\nFor two components that didn't yet exist, I co-created them directly with the team: a ==metric tile with action== and a ==data segmentation by archetype== (Mine, My Direct Reports, My Reports, My Company). Data segmentation existed in the system, but segmenting by archetype was a new concept I proposed to surface the right data to the right person without extra filtering. Both components are now widely used across the platform. Launching with the right components from the start also meant we didn't have to retrofit later, avoiding future UX and technical debt.",
        },
        {
          type: "image",
          fit: "contain",
          bg: true,
          images: [
            { src: "/casestudy/RRredesign/metric.png", caption: "Metric tile with action component" },
            { src: "/casestudy/RRredesign/chips.png", caption: "Data segmentation pattern component" },
          ],
        },
      ],
    },
    {
      title: "Key Takeaway",
      blocks: [
        {
          type: "highlight",
          content:
            "This project reiterated that ==I don't have to be the loudest voice in the room== to drive meaningful outcomes. I continuously leveraged user interviews and survey data to advocate for design decisions I believed in.\n\n**AI generated messages:** Product initially proposed fully AI-generated recognition messages. I pushed back to preserve authenticity. Recognition reinforces behavior and relationships, automating that entirely would weaken its intent. We compromised on a middle ground: AI-powered text refinement rather than fully generated messages, keeping recognition personal and human.\n\n**Personalized messages:** Recognition originally did not require a message. I advocated for making the message mandatory, framing recognition as a culture-building tool. A recognition without a message doesn't reinforce behavior; it's like a birthday card without a note. After surveying 160+ users, data showed usage was unlikely to drop. I used these findings to align product and leadership.",
        },
      ],
    },
  ],
};
