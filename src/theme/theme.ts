import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0069aa',
    },
    secondary: {
      main: '#224c65',
    },
    success: {
      main: '#7AC142',
    },
  },
  breakpoints: {
    values: {
      xs: 375,
      sm: 640,
      md: 767,
      lg: 1023,
      xl: 1355,
    },
  },
});

export default theme;
