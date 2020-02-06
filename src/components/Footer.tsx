import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import NewTabLink from './NewTabLink';
import { rhythm } from '@/utils/typography';
import { SocialLink } from '@/interfaces/SocialLink';

interface FooterQuery {
  site: {
    siteMetadata: {
      generatedDate: string;
      social: SocialLink[];
    };
  };
}

function Divider() {
  return (
    <div
      style={{
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        padding: rhythm(1 / 4),
        color: `var(--primary-colour)`
      }}
    >
      -
    </div>
  );
}

function Footer() {
  const data = useStaticQuery<FooterQuery>(graphql`
    query FooterMetaQuery {
      site {
        siteMetadata {
          generatedDate
          social {
            name
            url
          }
        }
      }
    }
  `);

  const info = data.site.siteMetadata;
  const [date, time] = info.generatedDate.split('T');

  return (
    <footer
      style={{
        padding: `${rhythm(1 / 5)} 0px`,
        borderTop: `1px solid var(--primary-colour)`
      }}
    >
      <div style={{ display: 'flex', alignItems: `center` }}>
        {info.social.map((x, i: number) => (
          <React.Fragment key={i}>
            {i !== 0 && <Divider />}
            <div>
              <NewTabLink href={x.url}>{x.name}</NewTabLink>
            </div>
          </React.Fragment>
        ))}
      </div>
      <div>
        Last updated{' '}
        {date
          .split('-')
          .reverse()
          .join('-')}{' '}
        {time.slice(0, 5)} UTC
      </div>
    </footer>
  );
}

export default Footer;
