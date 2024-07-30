import { graphql, useStaticQuery } from "gatsby";
import React from "react";

const languages: Skill = new Map([
  ["java", { title: "Java" }],
  ["scala", { title: "Scala" }],
  ["python", { title: "Python" }],  
  ["javascript", { title: "Javascript" }],
  ["typescript", { title: "Typescript" }],
  ["cpp", { title: "C++" }],
  ["sql", { title: "SQL" }],
  ["html", { title: "HTML" }],
  ["css", { title: "CSS" }],
]);

const tools: Skill = new Map([
  ["spring", { title: "Spring" }],
  ["akka", { title: "Akka" }],
  ["kubernets", { title: "Kubernets" }],
  ["aws", { title: "AWS" }],
  ["elastic-search", { title: "Elasticsearch" }],
  ["mongodb", { title: "MongoDB" }],
  ["git", { title: "git" }],
  ["android", { title: "Android" }],
  ["django", { title: "Django" }],
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
              <img
                className="inline rounded skill-icon"
                src={language.path}
                alt={language.title}
              />
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
              <img
                className="inline rounded skill-icon"
                src={tool.path}
                alt={tool.title}
              />
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
