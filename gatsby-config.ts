import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Portfolio | Abhishek Chaudhary`,
    description:
      "Software Development Enginner Portfolio craeted by Abhishek Chaudhary",
    siteUrl: `https://abhishekchaudhary.dev`,
    twitterUsername: `@coder_abhishek`,
    image: "src/images/icon.png",
    author: `@abhishekchd`,
    socials: {
      github: {
        title: "GitHub",
        username: "AbhishekChd",
        url: "https://github.com/AbhishekChd",
      },
      linkedin: {
        title: "LinkedIn",
        username: "abhishek-chd",
        url: "https://www.linkedin.com/in/abhishek-chd/",
      },
      email: {
        title: "Email",
        username: "abhishek.chaudhary.in@gmail.com",
        url: "mailto:abhishek.chaudhary.in@gmail.com?subject=Connect from Portfolio!",
      },
      resume: {
        title: "Resume",
        username: "Resume",
        url: "https://drive.google.com/open?id=1F1TUqgsMxODNsPw83IuSw-DAvnNAHXCp",
      },
    },
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-default-html-attrs`,
            options: {
              a: {
                target: "_blank",
              },
            },
          },
        ],
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/src/assets/`,
      },
      __key: "assets",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "data",
        path: `${__dirname}/src/data/`,
      },
      __key: "data",
    },
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        mode: "async",
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `IBM Plex Sans`,
            file: `https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@200;400;500;600;700&display=swap`,
          },
        ],
      },
    },
  ],
};

export default config;
