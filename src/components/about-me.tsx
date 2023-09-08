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

  const imageQueryResult = useStaticQuery(imageQuery);

  return (
    <>
      <section className="flex flex-col">
        <h3 className="pb-6">📌 A little about me</h3>
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="m-auto">
            <canvas id="canvasExample" ref={reference} />
            <img
              className="hidden"
              id="imgExample"
              src={imageQueryResult.file.childImageSharp.original.src}
            />
          </div>

          <div className="m-auto">
            <p>
              As a <b>Software Engineer</b> I love to build scalable solutions
              to ambiguous and challenging problems. I have 3 years of SDE
              Experience where my last stint was @Amazon where we designed and
              launched multiple features!
              <br />
              <br />I began my journey as a developer more than 7 years ago and
              still look out to learn new tech with same curiosity and build
              some awesome UI/UX!
              <br />
              <br />
              Here are some of my skills ⚡️
            </p>

            <Skills />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;

const imageQuery = graphql`
  query ProfileImage {
    file(relativePath: { eq: "header_personal_profile.jpeg" }) {
      childImageSharp {
        gatsbyImageData(width: 400, placeholder: DOMINANT_COLOR, quality: 0)
        original {
          src
        }
      }
    }
  }
`;
