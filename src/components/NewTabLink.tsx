import React from 'react';

function NewTabLink({
  children,
  ...props
}: React.HTMLProps<HTMLAnchorElement>) {
  return (
    <a {...props} target="_blank" rel="nofollow noopener noreferrer">
      {children}
    </a>
  );
}

NewTabLink.displayName = 'NewTabLink';

export default NewTabLink;
