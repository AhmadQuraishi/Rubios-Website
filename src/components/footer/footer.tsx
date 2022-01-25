import { Link } from 'react-router-dom';
import { Grid, Theme, Typography } from '@mui/material';

import footerLogo from '../../assets/imgs/footer-logo.svg';
import andriodLogo from '../../assets/imgs/android-app.svg';
import iosLogo from '../../assets/imgs/ios-app.svg';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  links: {
    fontSize: '14px',
    fontFamily: 'Poppins-Bold !important',
    textDecoration: 'none',
    color: '#fff',
    '&:hover': {
      color: theme.palette.success.main,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <footer>
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          backgroundColor: 'secondary.main',
          width: '100%',
          margin: 0,
          padding: { xs: '20px', md: '30px', lg: '40px 70px' },
        }}
      >
        <Grid item xs={12} md={6} lg={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                sx={{
                  display: 'flex',
                  padding: {
                    xs: '0px 0px 10px 0px',
                  },
                  maxWidth: {
                    md: '236px',
                    xs: '186px',
                  },
                }}
              >
                <img
                  src={footerLogo}
                  style={{ width: '100%' }}
                  alt="Rubios Coastal Grill"
                />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} lg={3}>
                      <Link className={classes.links} to="/">
                        CAREERS
                      </Link>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <Link to="/" className={classes.links}>
                        LOCATIONS
                      </Link>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <Link to="/" className={classes.links}>
                        GIFT CARDS
                      </Link>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <Link to="/" className={classes.links}>
                        FUNDRAISERS
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} lg={3}>
                      <Link
                        style={{ display: 'inline-block', width: '130px' }}
                        to="/"
                        className={classes.links}
                      >
                        PRESS & AWARDS
                      </Link>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      lg={3}
                      sx={{ textAlign: { xs: 'left', lg: 'center' } }}
                    >
                      <Link to="/" className={classes.links}>
                        BLOG
                      </Link>
                    </Grid>
                    <Grid item xs={12} lg={3}>
                      <Link to="/" className={classes.links}>
                        Contact US
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} lg={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} lg={4}>
              <Typography
                sx={{
                  fontSize: '17px',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontFamily: 'Poppins-Bold !important',
                  paddingTop: { xs: '30px', md: '20px', lg: '40px' },
                }}
              >
                Connect with Us
              </Typography>
              <Grid
                container
                spacing={1}
                width={200}
                sx={{ padding: { xs: '10px 0 0 0', md: '20px 0 0 0' } }}
              >
                <Grid item xs={4}>
                  <p
                    style={{
                      border: '2px solid #FFF',
                      width: '30px',
                      height: '30px',
                    }}
                  ></p>
                </Grid>
                <Grid item xs={4}>
                  <p
                    style={{
                      border: '2px solid #FFF',
                      width: '30px',
                      height: '30px',
                    }}
                  ></p>
                </Grid>
                <Grid item xs={4}>
                  <p
                    style={{
                      border: '2px solid #FFF',
                      width: '30px',
                      height: '30px',
                    }}
                  ></p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Typography
                sx={{
                  fontSize: '17px',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontFamily: 'Poppins-Bold !important',
                  paddingTop: { xs: '40px', md: '35px', lg: '40px' },
                }}
              >
                Get The Rubio's App
              </Typography>
              <Grid
                container
                spacing={2}
                maxWidth={300}
                sx={{ padding: '10px 0 0 0' }}
              >
                <Grid item xs={6}>
                  <img
                    style={{ display: 'inline-block', width: '100%' }}
                    src={iosLogo}
                    alt="Click Here To Download Our From Apple Store"
                  />
                </Grid>
                <Grid item xs={6}>
                  <img
                    style={{ display: 'inline-block', width: '100%' }}
                    src={andriodLogo}
                    alt="Click Here To Download Our From Google App Store"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;
