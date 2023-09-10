import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import DrawBlob, { generatePoints } from "blob-animated";
import Skills from "./skills";
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";

const AboutMe = () => {
  // Reference for painting on canvas
  const reference = React.useRef<HTMLCanvasElement>(null);
  // Cnavas animation for blobs
  const [vectors, setVectors] = React.useState(generatePoints({ sides: 8 }));

  // Query profile image
  const queryResult = useStaticQuery(query);
  const gatsbyImage: IGatsbyImageData = getImage(queryResult.file)!;

  // State used for GatsbyImage load status and trigger animation
  const [imageLoaded, setImageLoaded] = React.useState(false);

  React.useEffect(() => {
    const maskImage: HTMLImageElement = document.getElementById(
      "maskGatsbyImage"
    ) as HTMLImageElement;

    // Depends on if GatsbyImage loaded or not. Hence check if maskImage is present
    // or not to avoid multiple animation objects
    if (reference.current && maskImage) {
      const blob = new DrawBlob({
        canvas: reference.current,
        speed: 500,
        scramble: 0.12,
        vectors: vectors,
        maskedElement: maskImage,
        color: "",
        changedVectorsCallback: (newVectors) => {
          setVectors(newVectors);
        },
      });
    }
  }, [imageLoaded]);

  return (
    <>
      <section className="flex flex-col">
        <h2 className="pb-6">📌 A little about me</h2>
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="m-auto max-w-[400px] md:max-w-prose">
            <canvas id="canvasExample" ref={reference} />
            <GatsbyImage
              id="maskGatsbyImage"
              style={{ position: "absolute" }}
              className="invisible" // A little ugle hack to remove original image
              image={gatsbyImage}
              alt="Portfolio image"
              onStartLoad={() => {
                setImageLoaded(false);
              }}
              onLoad={(wasCached) => {
                console.log(wasCached);
                setImageLoaded(true);
              }}
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
        gatsbyImageData(placeholder: DOMINANT_COLOR, quality: 40)
        original {
          src
        }
      }
    }
    markdownRemark(frontmatter: { type: { eq: "introduction" } }) {
      html
    }
  }
`;
