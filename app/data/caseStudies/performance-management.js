export const performanceManagement = {
  title: "Shaping the Enterprise Strategy for Performance",
  images: [
    "/casestudy/performance/cover.png",
  ],
  teamSummary: "==Lead designer== working alongside a senior designer and a researcher, with guidance from a principal designer. ==11-week sprint== focused on strategy and direction-setting.",
  sections: [
    {
      title: "Overview",
      blocks: [
        {
          type: "paragraph",
          content:
            "Paylocity's Performance product was built on legacy technology and mandated to migrate to a shared web platform and unified design system. Rather than treating this as a lift-and-shift, we saw it as an opportunity to do more: ==evolve Performance into an enterprise-grade solution== and increase enterprise wins, a key business priority for the fiscal year.\n\nHow might we rebuild Performance not just to modernize it, but to make it a product enterprises actually want to buy?",
        },
        {
          type: "carousel",
          images: [
            { src: "/casestudy/performance/screenshot.png", caption: "Legacy Performance experience" },
          ],
        },
      ],
    },
    {
      title: "Research & Discovery",
      blocks: [
        {
          type: "paragraph",
          content:
            "We began by mapping everything we already knew and identifying gaps. Rather than jumping to solutions, we spent seven weeks building a shared, evidence-based perspective on the current state of Performance.",
        },
        {
          type: "stat-grid",
          description: "We synthesized ==9 data sources== spanning quantitative signals, qualitative feedback, competitive intelligence, and behavioral data:",
          items: [
            { value: "87", label: "SUS survey responses" },
            { value: "221", label: "In-product feedback submissions" },
            { value: "172", label: "Product development requests" },
            { value: "60", label: "Competitive feature gaps from Sales" },
            { value: "6", label: "Direct and indirect competitors analyzed" },
            { value: "22", label: "Key tasks in heuristic evaluation" },
            { value: "24", label: "Tasks in IA tree testing" },
            { value: "13", label: "User interviews across 3 archetypes" },
            { value: "1 yr", label: "Utilization data" },
          ],
        },
        {
          type: "paragraph",
          content:
            "==We used AI to help analyze user interview transcripts, but we were intentional about not outsourcing the thinking.== We manually reviewed much of the feedback ourselves because reading it firsthand built foundational knowledge and deeper context. Relying solely on AI would have produced summaries, but not understanding.",
        },
        {
          type: "image",
          src: "/casestudy/performance/userjourney.png",
          caption: "Pain points mapped across the user journey, synthesized from discovery research",
        },
      ],
    },
    {
      title: "From Findings to Guiding Principles",
      blocks: [
        {
          type: "paragraph",
          content:
            "The 9 sources produced ==220 findings==, organized into a filterable Excel document so Product, Design, and Engineering could trace every insight back to its origin. We then translated those findings into six guiding principles to anchor all design decisions going forward:",
        },
        {
          type: "container",
          columns: 3,
          items: [
            {
              icon: "flag",
              title: "Streamlined Management",
              description: "Enable managers and admins to ==easily manage, assign, and track== reviews and related objects",
            },
            {
              icon: "users",
              title: "Employee Development",
              description: "Position Performance as a tool for ==employee development==, not just a compliance checkpoint",
            },
            {
              icon: "globe",
              title: "Macro-Level Visibility",
              description: "Provide ==visibility into workforce performance== and outcomes at the organizational level",
            },
            {
              icon: "star",
              title: "One Holistic Review",
              description: "Bring all performance inputs into ==one unified review experience==",
            },
            {
              icon: "zap",
              title: "Intuitive Setup",
              description: "Clarify object structures so ==setup and participation== are clear from the start",
            },
            {
              icon: "lock",
              title: "Enterprise Flexibility",
              description: "Increase ==flexibility and control== to support complex enterprise scenarios",
            },
          ],
        },
      ],
    },
    {
      title: "Strategic Design Direction",
      blocks: [
        {
          type: "paragraph",
          content:
            "Four weeks of design work translated findings into structural concepts. These aren't final blueprints — they are ==data-backed perspectives== designed to spark conversation and pressure-test the future of the Performance suite.",
        },
        {
          type: "image",
          src: "/casestudy/performance/wireframes.png",
          bg: true,
          caption: "Strategic design direction concepts across the Performance suite",
        },
        {
          type: "paragraph",
          content:
            "With stakeholder buy-in on these concepts, the team has since moved into an OOUX activity to further define the ideal IA.",
        },
      ],
    },
    {
      title: "Impact on Roadmap",
      blocks: [
        {
          type: "paragraph",
          content:
            "Performance is a multi-module suite — Goals, Reviews, Feedback, Check-ins, and more. Rather than waiting for a full revamp, the team is migrating and improving module by module to ==deliver incremental value== without halting the product.\n\nDiscovery didn't just inform design decisions — it shaped what gets built and in what order.",
        },
        {
          type: "phases",
          items: [
            {
              label: "Goals Migration",
              description: "Scoped as a lift-and-shift to give engineering a low-risk path onto the new platform. I identified quick wins through content updates and component swaps to ensure even this phase moves the experience forward.",
            },
            {
              label: "Reviews Redesign",
              description: "Where the full weight of this discovery gets applied. The 220 findings will directly inform an enterprise-grade Reviews experience, not just a migrated one.",
            },
            {
              label: "Future Prioritization",
              description: "Findings beyond Reviews don't disappear. They give Product a data-backed input to decide what to tackle next — when the time is right.",
            },
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
            "**Stakeholder Management:**\nOn a highly visible project with senior stakeholders, I initially felt pressure to have every answer. What worked better was ==shifting from presenter to facilitator==. By crowdsourcing knowledge in the room and grounding conversations in research, I created alignment without needing to be the sole expert.",
        },
        {
          type: "highlight",
          content:
            "**Mentoring & Building Empathy:**\nThe designer supporting this initiative struggled to meet expectations, even after alignment and repeated feedback. At first, this was frustrating, but over time that frustration shifted into understanding and acceptance. I realized that some designers need ==closer guidance through the process==, not just feedback on outcomes. I rolled up my sleeves and partnered with them step by step on their portion of the work, while also pulling them into areas where I knew they could excel to help rebuild confidence.",
        },
      ],
    },
  ],
};
