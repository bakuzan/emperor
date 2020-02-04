import React from 'react';

function NewTabLink({
  children,
  ...props
}: React.HTMLProps<HTMLAnchorElement>) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

NewTabLink.displayName = 'NewTabLink';

export default NewTabLink;
