import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';

import { rhythm } from '@/utils/typography';
import NewTabLink from './NewTabLink';

const titles = ['Caesar', 'Imperator', 'Augustus'];
const getRandomTitle = () => titles[Math.floor(Math.random() * titles.length)];

function Bio() {
  const data = useStaticQuery(graphql`
    query PersonalMetaQuery {
      site {
        siteMetadata {
          author
          personalUrl
        }
      }
      profilePic: file(name: { eq: "profile-pic" }) {
        childImageSharp {
          fixed(width: 75, height: 75, cropFocus: NORTH) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);

  const info = data.site.siteMetadata;
  const avatar = data.profilePic.childImageSharp;
  const royalTitle = getRandomTitle();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: rhythm(1 / 2)
      }}
    >
      <Img
        {...avatar}
        alt={info.author}
        style={{
          marginRight: rhythm(1 / 3),
          marginBottom: 0,
          borderRadius: '50%'
        }}
      />
      <p style={{ maxWidth: 290, marginBottom: 0 }}>
        {royalTitle}
        <NewTabLink style={{ margin: `0 3px` }} href={info.personalUrl}>
          {info.author}
        </NewTabLink>
      </p>
    </div>
  );
}

export default Bio;
