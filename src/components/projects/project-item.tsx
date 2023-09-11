import React from "react";
import Pill from "./pill";
import { StaticImage } from "gatsby-plugin-image";

const Project = (project: Project) => {
  return (
    <>
      <div className="group">
        <a
          className="transition-all flex items-start p-4 rounded bg-[var(--color-background)] dark:group-hover:drop-shadow-2xl group-hover:drop-shadow-lg border dark:border-opacity-20 dark:group-hover:border-opacity-40 dark:border-gray-500"
          href={project.url}
          target="_blank"
        >
          <StaticImage
            className="rounded m-2"
            style={{ maxWidth: "150px" }}
            src="https://placehold.co/600x400.png"
            alt="Placeholder"
          />
          <div className="ml-4">
            <title className="flex">
              <span>{project.title}</span>
              <span className=" transition-all shrink ml-2 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="fill-[var(--color-text)]"
                >
                  <path d="M7 7h8.586L5.293 17.293l1.414 1.414L17 8.414V17h2V5H7v2z" />
                </svg>
              </span>
            </title>
            <div
              className="break-all hyphens-auto my-2 text-[var(--color-text-muted)]"
              lang="en"
            >
              {project.description}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map((tag: string) => (
                <Pill label={tag} key={tag} filled={true} />
              ))}
            </div>
          </div>
        </a>
      </div>
    </>
  );
};

export default Project;

type Project = {
  title: string;
  url: string;
  description: string;
  tags: string[];
};
