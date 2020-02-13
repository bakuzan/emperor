import React, { useState } from 'react';
import { Link, GatsbyLinkProps } from 'gatsby';

import Alert, { AlertMessage } from 'meiko/Alert';
import { useGlobalStyles } from 'meiko/hooks/useGlobalStyles';

import { rhythm } from '@/utils/typography';
import Header from './Header';
import Footer from './Footer';

const HIDDEN_ALERT_KEY = 'empHiddenAlerts';
const headerHeight = 73;
const workInProgressMessage = {
  id: 'in-progress-warning',
  type: 'warning',
  message: 'Work on the list of roman emperors is still in progress.',
  detail: `Progress will continue on completing the list.
  In the mean time you can visit 
  https://en.wikipedia.org/wiki/List_of_Roman_emperors 
  to see a the complete list of emperors.`
};

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

  const [alerts, setAlerts] = useState(() => {
    const initAlerts = [workInProgressMessage];
    let session = null;

    if (typeof window !== 'undefined') {
      session = window.sessionStorage.getItem(HIDDEN_ALERT_KEY);
    }

    if (!session) {
      return initAlerts;
    }

    const hiddenIds = JSON.parse(session);
    return initAlerts.filter((x) => !hiddenIds.includes(x.id));
  });

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
