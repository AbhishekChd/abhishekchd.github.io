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
        preconnect: [`https://fonts.gstatic.com`],
        custom: [
          {
            /* Exact name of the font as defied in @font-face CSS rule */
            name: ["IBM Plex Sans2"],
            /* Path to the font CSS file inside the "static" folder with @font-face definition */
            file: "/fonts/IBMPlexSans.css",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-CB6JJLRWD3"],
        gtagConfig: {
          optimize_id: "OPT_CONTAINER_ID",
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
          delayOnRouteUpdate: 0,
        },
      },
    },
  ],
};

export default config;
