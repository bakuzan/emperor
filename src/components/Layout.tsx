import React from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';

import { useGlobalStyles } from 'meiko/hooks/useGlobalStyles';

import { rhythm } from '@/utils/typography';
import Header from './Header';
import Footer from './Footer';

const headerHeight = 73;

const NavLink = (props: Omit<GatsbyLinkProps<any>, 'ref'>) => (
  <Link
    style={{ margin: `0 ${rhythm(1 / 5)}`, padding: `0 ${rhythm(1 / 5)}` }}
    activeStyle={{
      boxShadow: `inset 0 -1.4em 0 var(--primary-colour)`,
      color: `var(--primary-contrast)`
    }}
    {...props}
  />
);

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {}

function Layout({ children }: LayoutProps) {
  useGlobalStyles({ includeFont: false });

  return (
    <>
      <Header />
      <div
        style={{
          margin: `0 auto`,
          padding: `0px ${rhythm(1 / 2)} ${rhythm(1)}`,
          paddingTop: 0
        }}
      >
        <nav
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: `${rhythm(1 / 2)} 0`
          }}
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/ranking">Ranking</NavLink>
          <NavLink to="/explore">Explore</NavLink>
        </nav>
        <main style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
