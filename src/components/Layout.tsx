import React, { useState } from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';

import Alert, { AlertMessage } from 'meiko/Alert';
import { useGlobalStyles } from 'meiko/hooks/useGlobalStyles';

import { rhythm } from '@/utils/typography';
import Header from './Header';
import Footer from './Footer';
import { useMountedOnClient } from '@/hooks/useMountedOnClient';

const HIDDEN_ALERT_KEY = 'empHiddenAlerts';
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

  const mounted = useMountedOnClient();
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  function dismissAlertMessage() {
    const ids = alerts.map((x) => x.id);
    window.sessionStorage.setItem(HIDDEN_ALERT_KEY, JSON.stringify(ids));
    setAlerts([]);
  }

  return (
    <>
      <Header />
      <Alert
        messageClassName="emp-alert-message"
        alerts={alerts}
        actions={{ dismissAlertMessage }}
      />
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
          <NavLink to="/ranking" partiallyActive={true}>
            Ranking
          </NavLink>
          {mounted && (
            <NavLink to="/explore" partiallyActive={true}>
              Explore
            </NavLink>
          )}
        </nav>
        <main
          style={{
            minHeight: `calc(100vh - ${headerHeight}px)`,
            padding: `0 5px`
          }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
