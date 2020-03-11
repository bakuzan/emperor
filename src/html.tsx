import React from 'react';

interface EMPHTMLProps {
  htmlAttributes: React.HtmlHTMLAttributes<HTMLHtmlElement>;
  headComponents: React.ReactNode[];
  bodyAttributes: React.HtmlHTMLAttributes<HTMLBodyElement>;
  preBodyComponents: React.ReactNode[];
  postBodyComponents: React.ReactNode[];
  body: string;
}

export default class HTML extends React.Component<EMPHTMLProps> {
  render() {
    const {
      htmlAttributes,
      headComponents,
      bodyAttributes,
      preBodyComponents,
      postBodyComponents
    } = this.props;

    return (
      <html {...htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          {headComponents}
        </head>
        <body {...bodyAttributes} className="theme theme--light">
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                window.__onThemeChange = function() {};
                function setTheme(newTheme) {
                  window.__theme = newTheme;
                  preferredTheme = newTheme;
                  document.body.className = newTheme;
                  window.__onThemeChange(newTheme);
                }
                var preferredTheme;
                try {
                  preferredTheme = localStorage.getItem('theme');
                } catch (err) { }
                window.__setPreferredTheme = function(newTheme) {
                  setTheme(newTheme);
                  try {
                    localStorage.setItem('theme', newTheme);
                  } catch (err) {}
                }
                var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkQuery.addListener(function(e) {
                  window.__setPreferredTheme(e.matches ? 'theme theme--dark' : 'theme theme--light')
                });
                setTheme(preferredTheme || (darkQuery.matches ? 'theme theme--dark' : 'theme theme--light'));
              })();
            `
            }}
          />
          {preBodyComponents}
          <noscript>
            This application requires javascript to run properly. Please turn
            javascript on to get the intended experience.
          </noscript>
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {postBodyComponents}
        </body>
      </html>
    );
  }
}
