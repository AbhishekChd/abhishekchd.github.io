import React from "react";
import { Link } from "gatsby";
import Pill from "./pill";
import * as Icon from "react-feather";

const Project = (project: ProjectItem) => {
  const isInternal = project.url.startsWith("/");
  const containerClasses =
    "h-full p-4 rounded flex flex-col md:flex-row items-start transition-all bg-[var(--color-background)] group-hover:drop-shadow-lg dark:group-hover:drop-shadow-2xl border dark:border-opacity-20 dark:group-hover:border-opacity-40 dark:border-gray-500";

  const content = (
    <>
      <img
        className="transition-all rounded m-2 border-2 border-gray-500 border-opacity-20 group-hover:border-opacity-30 group-hover:border-4"
        style={{ maxWidth: "150px", minWidth: "150px" }}
        src={project.image}
        alt={`${project.title} project image`}
      />
      <div className="ml-4 flex mt-4 md:mt-0 flex-col h-full justify-between">
        <div>
          <title className="flex flex-wrap items-center">
            <span>{project.title}</span>
            {project.isPrivate && (
              <span
                className="ml-2 inline-flex items-center text-[var(--color-text-muted)]"
                title="Private Project"
              >
                <Icon.Lock size={16} />
              </span>
            )}
            <span className="transition-all shrink ml-2 translate-y-1 group-hover:translate-x-0.5 group-hover:translate-y-0">
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
    </>
  );

  return (
    <div className="group">
      {isInternal ? (
        <Link to={project.url} className={containerClasses}>
          {content}
        </Link>
      ) : (
        <a
          className={containerClasses}
          href={project.url}
          target="_blank"
          rel="noreferrer"
        >
          {content}
        </a>
      )}
    </div>
  );
};

export default Project;

export type ProjectItem = {
  title: string;
  url: string;
  description: string;
  tags: string[];
  image: string;
  isPrivate?: boolean;
  badge?: string;
};

export type Project = ProjectItem;

