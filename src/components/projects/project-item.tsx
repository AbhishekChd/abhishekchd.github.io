import React from "react";
import Pill from "./pill";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

const Project = (project: Project) => {
  return (
    <>
      <div className="group">
        <a
          className="h-full p-4 rounded flex flex-col md:flex-row items-start transition-all  bg-[var(--color-background)] group-hover:drop-shadow-lg dark:group-hover:drop-shadow-2xl  border dark:border-opacity-20 dark:group-hover:border-opacity-40 dark:border-gray-500"
          href={project.url}
          target="_blank"
        >
          <GatsbyImage
            className="transition-all rounded m-2 border-2 border-gray-500 border-opacity-20 group-hover:border-opacity-30 group-hover:border-4"
            style={{ maxWidth: "150px", minWidth: "150px" }}
            image={project.image}
            alt={`${project.title} project image`}
          />
          <div className="ml-4 flex mt-4 md:mt-0 flex-col h-full justify-between">
            <div>
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
                className="hyphens-auto my-2 text-[var(--color-text-muted)]"
                lang="en"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
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
  image: IGatsbyImageData;
};
