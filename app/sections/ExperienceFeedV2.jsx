"use client";

import React from "react";
import ExperienceCardV2 from "./ExperienceCardV2";

export default function ExperienceFeedV2({ experiences, onSelectProject }) {
  return (
    <main className="flex-1 min-w-0 portfolio-main">
      <div className="flex flex-col" style={{ gap: 32 }}>
        {experiences.map((exp) => (
          <ExperienceCardV2
            key={exp.id}
            experience={exp}
            onSelectProject={onSelectProject}
          />
        ))}
      </div>
    </main>
  );
}
