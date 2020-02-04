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
