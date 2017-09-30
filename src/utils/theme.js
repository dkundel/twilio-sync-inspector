import { createMuiTheme } from 'material-ui/styles';

export const twilioBlue = {
  50: '#e2e3e6',
  100: '#b6b8bf',
  200: '#868995',
  300: '#56596b',
  400: '#31364b',
  500: '#0d122b',
  600: '#0b1026',
  700: '#090d20',
  800: '#070a1a',
  900: '#030510',
  A100: '#5270ff',
  A200: '#1f45ff',
  A400: '#0028eb',
  A700: '#0023d2',
  contrastDefaultColor: 'light'
};

export const twilioRed = {
  50: '#fde6e9',
  100: '#fbc1c8',
  200: '#f997a3',
  300: '#f66d7e',
  400: '#f44e62',
  500: '#f22f46',
  600: '#f02a3f',
  700: '#ee2337',
  800: '#ec1d2f',
  900: '#e81220',
  A100: '#ffffff',
  A200: '#f22f46',
  A400: '#f22f46',
  A700: '#f22f46',
  contrastDefaultColor: 'light'
};

const palette = {
  primary: twilioBlue,
  secondary: twilioRed
};

const theme = createMuiTheme({ palette });

export default theme;
