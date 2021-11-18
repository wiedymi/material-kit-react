import { createMuiTheme } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const LightTheme = createMuiTheme({
  palette: {
    type: 'light',
    background: {
      dark: '#f4f6f8',
      default: '#f4f6f8',
      paper: '#ffffff'
    },
    appbar: '#009ff9',
    borderColor: '#e6e5e8',
    primary: {
      main: '#009ff9',
      contrastText: '#f4f6f8',
      contrastActiveText: '#009ff9'
    },
    secondary: {
      main: '#009ff9',
    }
  },
  shadows,
  typography
});

const DarkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      dark: '#1c2025',
      default: '#000000',
      paper: '#282c34'
    },
    appbar: '#282c4d',
    borderColor: '#e6e5e8',
    primary: {
      main: '#004973', // #343d50
      contrastText: '#e6e5e8',
      contrastActiveText: '#009ff9'
    },
    secondary: {
      main: '#e6e5e8',
    }
  },
  shadows,
  typography
});

export { LightTheme, DarkTheme };
