import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import DrawBlob, { generatePoints } from "blob-animated";
import Skills from "./skills";

const AboutMe = () => {
  const reference = React.useRef<HTMLCanvasElement>(null);
  const [vectors, setVectors] = React.useState(generatePoints({ sides: 8 }));

  React.useEffect(() => {
    if (reference.current) {
      const blob = new DrawBlob({
        canvas: reference.current,
        speed: 500,
        scramble: 0.12,
        vectors: vectors,
        maskedElement: document.getElementById(
          "imgExample"
        ) as HTMLImageElement,
        color: "",
        changedVectorsCallback: (newVectors) => {
          setVectors(newVectors);
        },
      });
    }
  }, []);

  const queryResult = useStaticQuery(query);

  return (
    <>
      <section className="flex flex-col">
        <h2 className="pb-6">📌 A little about me</h2>
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="m-auto max-w-[400px] md:max-w-prose">
            <canvas id="canvasExample" ref={reference} />
            <img
              className="hidden"
              id="imgExample"
              src={queryResult.file.childImageSharp.original.src}
            />
          </div>

          <div className="m-auto">
            <span
              dangerouslySetInnerHTML={{
                __html: queryResult.markdownRemark.html,
              }}
            />
            <Skills />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;

const query = graphql`
  query ImageAndIntroductionQuery {
    file(relativePath: { eq: "header_personal_profile.jpeg" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: DOMINANT_COLOR, quality: 0)
        original {
          src
        }
      }
    }
    markdownRemark(fileAbsolutePath: { regex: "/introduction.md/" }) {
      html
    }
  }
`;
