import { graphql, useStaticQuery } from "gatsby";
import React from "react";

const languages: Skill = new Map([
  ["java", { title: "Java" }],
  ["cpp", { title: "C++" }],
  ["python", { title: "Python" }],
  ["sql", { title: "SQL" }],
  ["javascript", { title: "Javascript" }],
  ["typescript", { title: "Typescript" }],
  ["html", { title: "HTML" }],
  ["css", { title: "CSS" }],
]);

const tools: Skill = new Map([
  ["spring", { title: "Spring" }],
  ["mongodb", { title: "MongoDB" }],
  ["django", { title: "Django" }],
  ["git", { title: "git" }],
  ["android", { title: "Android" }],
]);

const Skills = () => {
  const assetsResponse = useStaticQuery(allSvgAsssetsQuery);
  const nodes: { node: Node }[] = assetsResponse.assets.edges;

  return (
    <>
      {getPaths(languages, nodes)}
      {getPaths(tools, nodes)}

      <title className="mt-6 mb-2">Languages</title>
      <div className="flex gap-6 flex-wrap">
        {Array.from(languages).map((key, value) => {
          const language = key[1];
          if (!language.path) return;
          return (
            <span className="text-center" key={value}>
              <img className="inline" src={language.path} />
              <br />
              {language.title}
            </span>
          );
        })}
      </div>

      <title className="mt-6 mb-2">Tools & Frameworks</title>
      <div className="flex gap-6 flex-wrap">
        {Array.from(tools).map((key, value) => {
          const tool = key[1];
          if (!tool.path) return;
          return (
            <span className="text-center" key={value}>
              <img className="inline" src={tool.path} />
              <br />
              {tool.title}
            </span>
          );
        })}
      </div>
    </>
  );
};

export default Skills;

function getPaths(skills: Skill, nodes: any) {
  nodes.forEach((node: any) => {
    const { name, publicURL } = node.node;
    if (skills.has(name)) {
      skills.get(name)!.path = publicURL;
    }
  });
}

const allSvgAsssetsQuery = graphql`
query AllSVGs {
  assets: allFile(filter: {relativePath: {regex: "/.*\\.svg/"}}) {
    edges {
      node {
        name
        publicURL
      }
    }
  }
}`;

type Node = { relativePath: string; name: string };

type Skill = Map<string, { title: string; path?: string }>;
