import { Link } from 'react-router-dom';
import { Grid, Theme, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';

import footerLogo from '../../assets/imgs/rubios-logo-white.png';
import andriodLogo from '../../assets/imgs/button-google.png';
import iosLogo from '../../assets/imgs/button-apple.png';

const useStyles = makeStyles((theme: Theme) => ({
  links: {
    textTransform: "uppercase",
    fontSize: '13px',
    fontFamily: 'Poppins-Bold !important',
    textDecoration: 'none',
    color: '#fff',
    '&:hover': {
      color: theme.palette.success.main,
    },
  },
  smallLinks: {
    color: '#fff',
    fontSize: '9px',
    textAlign: 'center',
    display: 'inline-block',
    paddingRight: '10px',
    textDecoration: 'none',
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
        spacing={0}
        sx={{
          display: 'flex',
          backgroundColor: 'secondary.main',
          width: '100%',
          margin: 0,
          padding: { xs: '25px 0px', lg: '35px 0px 40px 0px' },
        }}
      >
        <Grid item xs={12} sm={6} md={12}>
          <Grid
            container
            spacing={2}
            sx={{
              padding: {
                xs: '0px 20px',
                sm: '0px 30px',
                lg: '0px 30px 0 70px',
              },
            }}
          >
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
                    <Grid item xs={12} md={3}>
                      <Link className={classes.links} to="/">
                        CAREERS
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Link to="/" className={classes.links}>
                        LOCATIONS
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Link to="/" className={classes.links}>
                        GIFT CARDS
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={3}>
                      <Link to="/" className={classes.links}>
                        FUNDRAISERS
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
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
                      md={3}
                      sx={{ textAlign: { xs: 'left', md: 'center' } }}
                    >
                      <Link to="/" className={classes.links}>
                        BLOG
                      </Link>
                    </Grid>
                    <Grid item xs={12} md={3}>
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
        <Grid item xs={12} sm={6} md={12}>
          <Grid
            container
            spacing={1}
            sx={{
              padding: {
                xs: '0px 20px',
                sm: '0px 30px',
                lg: '0px 30px 0 70px',
              },
            }}
          >
            <Grid item xs={12} md={4}>
              <Typography
                sx={{
                  fontSize: '16px',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontFamily: 'Poppins-Medium !important',
                  paddingTop: { xs: '40px', md: '30px', lg: '60px' },
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
            <Grid item xs={12} md={4}>
              <Typography
                sx={{
                  fontSize: '16px',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontFamily: 'Poppins-Medium !important',
                  paddingTop: { xs: '40px', md: '30px', lg: '60px' },
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
        <Grid item xs={12}>
          <Typography
            sx={{
              display: { sm: 'flex', md: 'none' },
              paddingTop: { xs: '30px', md: '40px' },
              paddingLeft: { xs: '20px', sm: '30px', lg: '70px' },
            }}
            variant="caption"
            component="p"
            color="#fff"
            fontSize={9}
          >
            Copyright 2021 Rubios's Restaurants, Inc. All Rights reserved.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            padding: '0 !important',
            paddingTop: { xs: '20px !important', lg: '30px !important' },
          }}
        >
          <Divider color="#fff" sx={{ padding: '0' }} />
        </Grid>
        <Grid item xs={12} sx={{ paddingLeft: { xs: '0px' } }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={5}
              sx={{
                display: { xs: 'none', md: 'flex' },
                padding: { xs: '30px 0px 0px 0px', lg: '50px 0px 0px 0px' },
              }}
            >
              <Typography
                sx={{
                  paddingTop: '20px',
                  paddingLeft: { xs: '10px', sm: '30px', lg: '70px' },
                }}
                variant="caption"
                color="#fff"
                fontSize={9}
              >
                Copyright 2021 Rubios's Restaurants, Inc. All Rights reserved.
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            ></Grid>
            <Grid item xs={12} md={5}>
              <Grid
                container
                spacing={1}
                sx={{ paddingTop: '10px', paddingLeft: { xs: '10px' } }}
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{
                    display: 'flex',
                    paddingTop: '15px !important',
                    paddingLeft: { xs: '20px !important', sm: '30px !important' },
                    paddingRight: { md: '60px' },
                    justifyContent: { xs: 'left', md: 'right' },
                  }}
                >
                  <Link to="/" className={classes.smallLinks}>
                    Website Accessibility
                  </Link>
                  <Link to="/" className={classes.smallLinks}>
                    Terms of use
                  </Link>
                  <Link to="/" className={classes.smallLinks}>
                    Privacy
                  </Link>
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
