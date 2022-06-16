import { Link } from 'react-router-dom';
import { Grid, Theme, Typography, Divider, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import footerLogo from '../../assets/imgs/rubios-logo-white.png';
import andriodLogo from '../../assets/imgs/button-google.png';
import iosLogo from '../../assets/imgs/button-apple.png';

import { useDispatch, useSelector } from 'react-redux';
import { getMenuRequest } from '../../redux/actions/footer';
import { useEffect, useState } from 'react';
import './footer.css';
import fbIcon from '../../assets/imgs/facebook-icon.png';
import instaIcon from '../../assets/imgs/insta-icon.png';
import twitterIcon from '../../assets/imgs/twitter-icon.png';
import tiktokIcon from '../../assets/imgs/tik-tok.png';

const useStyles = makeStyles((theme: Theme) => ({
  links: {
    textTransform: 'uppercase',
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
    paddingLeft: '30px',
    fontFamily: 'Roboto,Helvetica,Arial,sans-serif !important',
    textDecoration: 'none',
    '&:hover': {
      color: theme.palette.success.main,
    },
  },
  list: {
    listStyle: 'none',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: ' auto auto auto auto auto auto auto',
  },
}));

const Footer = () => {
  const classes = useStyles();
  const menu = useSelector((state: any) => state.footerReducer.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMenuRequest());
  }, []);

  useEffect(() => {}, [menu]);


  return (
    <footer className={`${window.location.href.toLocaleLowerCase().indexOf('/product') !== -1 ? 'footer-control' : ''}`}>
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
              <Button
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
                  title="Rubios Coastal Grill"
                />
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                spacing={1}
                sx={{
                  flexWrap: { xs: 'wrap', md: 'nowrap' },
                  maxWidth: '1024px',
                }}
              >
                <ul className="list">
                  {menu &&
                    menu.items.map((item: any, index: number) => (
                      <li key={Math.random()}>
                        <a
                          key={Math.random() + index}
                          className={classes.links}
                          href={item.url}
                          title={item.title}
                          aria-label={item.title}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                </ul>
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
                title="Connect with Us"
              >
                Connect with Us
              </Typography>
              <Grid
                container
                spacing={1}
                width={200}
                sx={{ padding: { xs: '10px 0 0 0', md: '10px 0 0 0', lg: '5px 0 0 0' } }}
              >
                <Grid item xs={2} style={{marginRight: '10px'}}>
                  <a
                    href={'https://www.facebook.com/rubios/'}
                    target={'_blank'}
                  >
                    <img
                      src={fbIcon}
                      style={{ width: '100%' }}
                      alt="Facebook Icon"
                    />
                  </a>
                </Grid>
                <Grid item xs={2} style={{marginRight: '10px'}}>
                  <a
                    href={'https://www.instagram.com/rubioscoastalgrill/'}
                    target={'_blank'}
                  >
                    <img
                      src={instaIcon}
                      style={{ width: '100%' }}
                      alt="Instagram Icon"
                    />
                  </a>
                </Grid>
                <Grid item xs={2} style={{marginRight: '10px'}}>
                  <a
                    href={'https://twitter.com/RubiosTweets'}
                    target={'_blank'}
                  >
                    <img
                      src={twitterIcon}
                      style={{ width: '100%' }}
                      alt="Twitter Icon"
                    />
                  </a>
                </Grid>
                <Grid item xs={2} style={{marginRight: '10px'}}>
                  <a
                    href={'https://www.tiktok.com/@officialrubios'}
                    target={'_blank'}
                  >
                    <img
                      src={tiktokIcon}
                      style={{ width: '100%' }}
                      alt="Tiktok Icon"
                    />
                  </a>
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
                title="Get The Rubio's App"
              >
                Get The Rubio's App
              </Typography>
              <Grid
                container
                spacing={4}
                maxWidth={300}
                sx={{ padding: '0px 0 0 0' }}
              >
                <Grid item xs={6}>
                  <Button sx={{ padding: 0 }}>
                    <img
                      style={{ display: 'inline-block', width: '100%' }}
                      src={iosLogo}
                      alt="Click Here To Download Our From Apple Store"
                    />
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button sx={{ padding: 0 }}>
                    <img
                      style={{ display: 'inline-block', width: '100%' }}
                      src={andriodLogo}
                      alt="Click Here To Download Our From Google App Store"
                    />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{
              display: { sm: 'flex', md: 'none' },
              paddingTop: { xs: '30px', md: '40px', lg: '30px' },
              paddingLeft: { xs: '20px', sm: '30px', lg: '70px' },
            }}
            variant="caption"
            component="p"
            color="#fff"
            fontSize={9}
            title="Copyright 2021 Rubios's Restaurants, Inc. All Rights reserved."
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
                title="Copyright 2021 Rubios's Restaurants, Inc. All Rights reserved."
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
                    paddingTop: '30px !important',
                    paddingLeft: {
                      xs: '20px !important',
                      sm: '30px !important',
                    },
                    paddingRight: { md: '60px' },
                    justifyContent: { xs: 'left', md: 'right' },
                  }}
                >
                  <ul style={{ listStyle: 'none', display: 'flex'}}>
                    <li>
                      <Link
                        to="/"
                        className={classes.smallLinks}
                        title="Website Accessibility"
                        aria-label="Website Accessibility"
                      >
                        Website Accessibility
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className={classes.smallLinks}
                        title="Terms of use"
                        aria-label="Terms of use"
                      >
                        Terms of use
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className={classes.smallLinks}
                        title="Privacy"
                        aria-label="Privacy"
                      >
                        Privacy
                      </Link>
                    </li>
                  </ul>
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
