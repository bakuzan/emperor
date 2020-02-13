import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

import RadioToggle from 'meiko/RadioToggle';

import { rhythm } from '@/utils/typography';
import { Icons } from '@/consts';

interface HeaderProps {}

function Header({}: HeaderProps) {
  const [theme, setTheme] = useState(null);

  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  const siteTitle = data.site.siteMetadata.title;
  const win = typeof window !== 'undefined' ? (window as any) : {};

  useEffect(() => {
    setTheme(win.__theme);
    win.__onThemeChange = () => {
      setTheme(win.__theme);
    };
  }, []);

  return (
    <header
      style={{
        marginBottom: rhythm(1 / 2)
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: `0 auto`,
          padding: `${rhythm(1 / 2)}`
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link to="/">{siteTitle}</Link>
        </h1>
        {theme !== null && (
          <RadioToggle
            label="Switch between Dark and Light mode"
            name="theme"
            icons={[Icons.moon, Icons.sun]}
            checked={theme === 'theme theme--dark'}
            onChange={(checked) =>
              win.__setPreferredTheme(
                checked ? 'theme theme--dark' : 'theme theme--light'
              )
            }
          />
        )}
      </div>
    </header>
  );
}

export default Header;
