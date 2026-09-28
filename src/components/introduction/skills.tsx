import { graphql, useStaticQuery } from "gatsby";
import React from "react";

interface SkillItem {
  key: string;
  title: string;
}

interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Languages",
    skills: [
      { key: "java", title: "Java" },
      { key: "go", title: "Go" },
      { key: "scala", title: "Scala" },
      { key: "python", title: "Python" },
      { key: "javascript", title: "Javascript" },
    ],
  },
  {
    title: "Backend & Distributed Systems",
    skills: [
      { key: "spring", title: "Spring Boot" },
      { key: "grpc", title: "gRPC" },
      { key: "kafka", title: "Kafka" },
      { key: "redis", title: "Redis" },
      { key: "akka", title: "Akka" },
      { key: "postgresql", title: "PostgreSQL" },
      { key: "sql", title: "MySQL" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    skills: [
      { key: "aws", title: "AWS" },
      { key: "elastic-search", title: "Elasticsearch" },
      { key: "docker", title: "Docker" },
      { key: "kubernetes", title: "Kubernetes" },
      { key: "terraform", title: "Terraform" },
      { key: "cicd", title: "CI/CD" },
    ],
  },
  {
    title: "Frontend & Mobile",
    skills: [
      { key: "react", title: "React" },
      { key: "nextjs", title: "Next.js" },
      { key: "flutter", title: "Flutter" },
      { key: "android", title: "Android" },
    ],
  },
];

const Skills: React.FC = () => {
  const assetsResponse = useStaticQuery(allSvgAssetsQuery);
  const nodes = assetsResponse?.assets?.edges || [];

  const iconMap: Record<string, string> = {};
  nodes.forEach((edge: any) => {
    iconMap[edge.node.name] = edge.node.publicURL;
  });

  // Fallbacks if alternate naming exists
  if (!iconMap["kubernetes"] && iconMap["kubernets"]) {
    iconMap["kubernetes"] = iconMap["kubernets"];
  }

  return (
    <div className="mt-8 flex flex-col space-y-7">
      {SKILL_CATEGORIES.map((category) => (
        <div key={category.title} className="flex flex-col">
          <h3 className="font-bold text-lg md:text-xl text-[var(--color-text)] mb-3">
            {category.title}
          </h3>

          <div className="flex gap-6 flex-wrap">
            {category.skills.map((skill) => {
              const iconUrl = iconMap[skill.key];
              return (
                <span
                  className="text-center flex flex-col items-center min-w-[56px]"
                  key={skill.title}
                >
                  {iconUrl ? (
                    <img
                      className="inline rounded skill-icon object-contain"
                      src={iconUrl}
                      alt={skill.title}
                    />
                  ) : (
                    <div className="skill-icon rounded bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-xs font-mono">
                      {skill.title.slice(0, 2)}
                    </div>
                  )}
                  <span className="text-xs sm:text-sm mt-1.5 text-[var(--color-text)] leading-tight">
                    {skill.title}
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;

const allSvgAssetsQuery = graphql`
  query AllSVGs {
    assets: allFile(filter: { relativePath: { regex: "/.*\\.svg/" } }) {
      edges {
        node {
          name
          publicURL
        }
      }
    }
  }
`;
