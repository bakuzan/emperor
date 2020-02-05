import './fonts/fonts.css';
import './global.scss';

import Typography from 'typography';
import FairyGates from 'typography-theme-fairy-gates';

FairyGates.overrideThemeStyles = () => ({
  a: {
    backgroundImage: 'none',
    textDecoration: 'none',
    textShadow: 'none',
    boxShadow: `inset 0 -0.5em 0 var(--alt-colour, #eee)`,
    transition: `box-shadow 0.2s ease-in-out`,
    color: `var(--primary-colour)`
  },
  [`a:focus, a:hover`]: {
    boxShadow: `inset 0 -1.2em 0 var(--alt-colour, #ddd)`
  },
  'td,th': {
    padding: typography.rhythm(1 / 2),
    borderColor: `var(--table-border-colour)`
  },
  '@media only screen and (max-width: 760px), (min-device-width: 768px) and (max-device-width: 1024px)': {
    tr: {
      marginBottom: typography.rhythm(1 / 4)
    },
    'th, th:first-child': {
      padding: typography.rhythm(1 / 2)
    },
    'td:last-child': {
      'padding-right': typography.rhythm(1 / 2)
    }
  }
});

delete FairyGates.googleFonts;

const typography = new Typography(FairyGates);

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
