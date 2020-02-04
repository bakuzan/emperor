import React from 'react';

import { rhythm } from '@/utils/typography';

import Header from './Header';
import Footer from './Footer';

const headerHeight = 73;

interface LayoutProps extends React.HTMLProps<HTMLDivElement> {}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div
        style={{
          margin: `0 auto`,
          padding: `0px ${rhythm(3 / 4)} ${rhythm(1)}`,
          paddingTop: 0
        }}
      >
        <main style={{ minHeight: `calc(100vh - ${headerHeight}px)` }}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
