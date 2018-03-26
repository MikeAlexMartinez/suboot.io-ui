
import { createMuiTheme } from 'material-ui/styles';

const colorTheme = {
  palette: {
    primary: {
      light: '#64d8cb',
      main: '#26a69a',
      dark: '#00766c',
      contrastText: '#000',
    },
    secondary: {
      light: '#a7c0cd',
      main: '#78909c',
      dark: '#4b636e',
      contrastText: '#000',
    },
  },
  button: {
    margin: 5,
  },
};

const theme = createMuiTheme(colorTheme);

module.exports = theme;