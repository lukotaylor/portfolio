export const touchscreen = {
  title: "Making large-screen data displays interactive",
  images: ["/cover/touchscreen.png"],
  vimeoId: "1167929852",
  teamSummary: "==Solo designer== working alongside 1 PM and 2 engineers over the course of 3 months.",
  sections: [
    {
      title: "The Problem",
      blocks: [
        {
          type: "paragraph",
          content:
            "Sprinklr Display turns social media data into large-format visualizations used in retail stores, executive command centers, stadiums, and broadcast TVs. These screens are powerful storytelling tools, but they were passive. \n\n==Users had no way to interact with the data themselves.== When they wanted to understand what was driving an anomaly, they had to reach out to a dedicated Display designer to manually add visualizations, a slow, back-and-forth process.",
        },
        {
          type: "image",
          images: [
            { src: "/casestudy/touchscreen/commandcenter02.jpg", caption: "Display command center at Darden Group HQ" },
            { src: "/casestudy/touchscreen/rocnation.jpg", caption: "Display command center at Roc Nation headquarter" },
          ],
        },
      ],
    },
        {
      title: "The Solution",
      blocks: [
      {
          type: "paragraph",
          content:
            "==Evolving Sprinklr Display into an interactive experience== where users can tap into any data point and immediately understand what's driving it, without any additional setup.",
        },
        {
          type: "image",
          images: [
            { src: "/casestudy/touchscreen/solution.gif", caption: "'With Touchscreen Display, I can immediately find out top posts that contributed to high mentions in San Francisco 49ers!'" },
          ],
          fit: "natural",
        },
      ],
    },

    {
      title: "Discovery",
      blocks: [
        {
          type: "table",
          description: "Two activities helped me formulate a point-of-view before putting pixels on screen.",
          headers: ["Activities", "Learnings"],
          rows: [
            {
              col1: "==Scoped MVP== to the Listening engine (it covers the most common Display use case",
              col2: [
                "Defined a clear set of data visualizations to design for: sentiment, themes, volume trends, and share of voice",
              ],
            },
            {
              col1: "==Studied large-screen experiences== across Netflix, Hulu, and direct competitor like Salesforce",
              col2: [
                "Mapped common navigation patterns for TVs, including left and top navigation structures",
                "Informed how to organize and present content on a large screen in a way that feels familiar and scannable",
              ],
            },
          ],
        },
      ],
    },
        {
      title: "High Level User Flow",
      blocks: [
    {                                                                             
        type: "flow", 
        description: "Drawing from competitor research and user scenarios, the team aligned on a simple drill-down flow. Users should be able to ==tap into any data point and return to the primary view== at any time.",
        steps: [                                                                    
        { title: "Review the primary data layer" },
        { title: "Tap to filter into a specific sub-dimension" },
        { title: "Review the granular data in that layer" },
        { title: "Return to the primary data layer" },
        ]
    },
      ],
    },
    {
      title: "Exploring Concepts",
      blocks: [
     {
          type: "carousel",
          thumbnails: true,
          description: "==Concept A:== When tapped, users see an overlay focused on a single data source at a time. This concept revealed the importance of ==showing all visualizations together== to tell a complete story, rather than isolating one data type.",
          images: [
          { src: "/casestudy/touchscreen/contextualoverlay.png", caption: "Contextual overlay modal", grayscale: true },
          { src: "/casestudy/touchscreen/fullscreenoverlay.png", caption: "Fullscreen overlay", grayscale: true },
    ],
      },

           {
          type: "carousel",
          thumbnails: true,
          description: "==Concept B:== When tapped, users see all data sources at once with a fixed navigation bar highlighting the selected slice. The small footprint keeps context visible without disrupting the view. This direction ==resonated with the team and partnered clients==, and became the foundation for the final design.",
          images: [
          { src: "/casestudy/touchscreen/story01.png", caption: "Bottom navigation", grayscale: true },
          { src: "/casestudy/touchscreen/story02.png", caption: "Left navigation", grayscale: true },
    ],
      },
      ],
    },
        {
      title: "Testing Concepts",
      blocks: [
        {
          type: "carousel",
          thumbnails: true,
          description: "We tested designs on large-format touch screens in person. ==Experiencing the hardware directly== led to refinements we couldn't have caught in a prototype, from navigation placement to visualization clarity.",
          images: [
          { src: "/casestudy/touchscreen/validation01.png", caption: "Testing out different visualizations for sentiment toggles, realizing emotion icons do not work well as they are hard to see on large screens, so opted in for a pie chart" },
          { src: "/casestudy/touchscreen/validation02.png", caption: "Realizing the middle placement for previous/next may be a bit too high for reach" },
          { src: "/casestudy/touchscreen/validation03.png", caption: "Relocating the previous/next too be is more accessible for folks of all heights" },
          { src: "/casestudy/touchscreen/validation04.png", caption: "Separating out the previous/next to prevent misclick" },
    ],
  }
      ],
    },

            {
      title: "Finalizing the Concept",
      blocks: [
        {
          type: "carousel",
          thumbnails: true,
          description: "Below is the final concept in 3 different color palettes. When creating a Display, designers can choose off-the-shelf color palettes that Sprinklr provides or create a customize palette for the brand they are designing for.",            
          alt: "Screenshot of the dashboard",
          images: [
          { src: "/casestudy/touchscreen/touchscreenblack.png"},
          { src: "/casestudy/touchscreen/touchscreenpurple.png",},
          { src: "/casestudy/touchscreen/touchscreenteal.png",},
          ],
        },
                {
          type: "carousel",
          thumbnails: true,
          description: "With designers able to choose any color palette, I needed the navigation and system states to adapt automatically. I built a ==color system for all new components== so that every state — navigation, loading, empty — would always feel cohesive with the selected palette.",
          images: [
          { src: "/casestudy/touchscreen/rule01.png", caption: "General rules for the navigation pulling from the primary color, background color, and font color" },
          { src: "/casestudy/touchscreen/rule02.png", caption: "Additional rules for selected state of sentiment toggles" },
          { src: "/casestudy/touchscreen/rule03.png", caption: "Rules for loading state" },
          { src: "/casestudy/touchscreen/rule04.png", caption: "Rules for no data state" },
    ],
  }
        
      ],
    },
    {
      title: "Sentiment Post-Launch",
      blocks: [
        {
          type: "image",
          fit: "match-height",
          description: "At a Sprinklr Sales event shortly after launch, the feature was demoed to the team. People tweeted about it unprompted — ==when Sales is genuinely excited, they pitch it that way.==",
          images: [
            { src: "casestudy/touchscreen/tweet01.gif"},
            { src: "casestudy/touchscreen/tweet02.gif"},
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
            "The front-end implementation missed the mark across visual design and interactions. I flagged it repeatedly, which created some tension with the project manager. ==I stood firm== because this is a highly visual product and the interactions and visuals need to be ==pixel-perfect to build credibility, trust, and delight==. The VP of Product loved the final result, and so did the rest of the team. I used to worry about coming across as nitpicky, but I've learned that ==holding that bar sets expectations with developers that the details matter==.",
        },
        {
          type: "quote",
          content:
            "Taylor worked closely with the development team and presented designs in iterative waves, each time subjecting the results to acceptance criteria and scrutiny. With Taylor's expertise and team-oriented attitude, the product was elevated dramatically.",
          attribution: "Justin G., VP of Product at Sprinklr",
        },
      ],
    },
  ],
};
