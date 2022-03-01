require('source-map-support').install();
require('ts-node').register({ files: true });

module.exports = {
  plugins: [
    `gatsby-plugin-typescript`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        cssLoaderOptions: {
          esModule: false,
          modules: {
            namedExport: false
          }
        }
      }
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/content/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets/`
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
        omitGoogleFont: true
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `emperor`,
        short_name: `emperor`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#66023c`,
        display: `minimal-ui`,
        icon: `content/assets/icon.png`,
        theme_color_in_head: false
      }
    }
  ],
  // Customize your site metadata:
  pathPrefix: 'emperor',
  siteMetadata: {
    generatedDate: (() => new Date().toISOString())(),
    title: `Emperors of Rome`,
    author: `Bakuzan`,
    personalUrl: `https://github.com/bakuzan`,
    description: `Information on the Emperors of Rome`,
    social: [
      {
        name: `github`,
        url: `https://github.com/bakuzan`
      },
      {
        name: `source`,
        url: `https://github.com/bakuzan/emperor`
      },
      {
        name: `report a bug`,
        url: `https://github.com/bakuzan/emperor/issues`
      }
    ]
  }
};
