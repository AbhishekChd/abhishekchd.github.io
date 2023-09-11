import React from "react";
import Project from "./project-item";
const ProjectsSection = () => {
  const desc =
    "It wasn't that he hated her. It was simply that he didn't like her much. It was difficult for him to explain this to her, and even more difficult for her to truly understand. She was in love and wanted him to feel the same way. He didn't, and no matter how he tried to explain to her she refused to listen or to understand.";
  return (
    <>
      <section>
        <h2 className="pb-6">💪 Things I've built</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
          <Project
            title="News App"
            url="https://github.com/AbhishekChd/NewsApp"
            description={desc}
            tags={["Android", "Java", "MVVM"]}
          />

          <Project
            title="Cineverse"
            url="https://github.com/AbhishekChd/NewsApp"
            description={desc}
            tags={["Android", "Repository Pattern"]}
          />

          <Project
            title="News App"
            url="https://github.com/AbhishekChd/NewsApp"
            description={desc}
            tags={["Android", "Java", "MVVM"]}
          />

          <Project
            title="Cineverse"
            url="https://github.com/AbhishekChd/NewsApp"
            description={desc}
            tags={["Android", "Repository Pattern"]}
          />
        </div>
      </section>
    </>
  );
};

export default ProjectsSection;
