require('source-map-support').install();
require('ts-node').register({ files: true });

module.exports = {
  plugins: [
    `gatsby-plugin-typescript`,
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/data/`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/assets/`
      }
    },
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
        icon: `assets/icon.png`,
        theme_color_in_head: false
      }
    }
  ],
  // Customize your site metadata:
  siteMetadata: {
    generatedDate: (() => new Date().toISOString())(),
    title: `Emperors of Rome`,
    author: `Bakuzan`,
    personalUrl: `https://github.com/bakuzan`,
    description: `Site listing the emperors of Rome, and my personal ranking of them`,
    social: [
      {
        name: `github`,
        url: `https://github.com/bakuzan`
      },
      {
        name: `source`,
        url: `https://github.com/bakuzan/emperor`
      }
    ]
  }
};
