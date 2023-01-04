import { Link } from 'react-router-dom';
import { Grid, Theme, Typography, Divider, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import footerLogo from '../../assets/imgs/ariginalFishTacos.png';
import andriodLogo from '../../assets/imgs/button-google.png';
import iosLogo from '../../assets/imgs/button-apple.png';

import { useDispatch, useSelector } from 'react-redux';
import { getMenuRequest } from '../../redux/actions/footer';
import { useEffect, useState } from 'react';
import './footer.css';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import instaIcon from '../../assets/imgs/insta-icon.png';
import twitterIcon from '../../assets/imgs/twitter-icon.png';
import tiktokIcon from '../../assets/imgs/tik-tok.png';
import image from '../../assets/imgs/blue-bg.png';
const useStyles = makeStyles((theme: Theme) => ({
  links: {
    textTransform: 'uppercase',
    fontSize: '13px',
    fontFamily: 'sunbornsans_one !important',
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
    fontFamily: "'libre_franklinlight' !important",
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

  useEffect(() => { }, [menu]);

  return (
    <footer
      className={`${window.location.href.toLocaleLowerCase().indexOf('/product') !== -1
          ? 'footer-control'
          : ''
        }` || `${window.location.href.toLocaleLowerCase().indexOf('/location') !== -1
        ? 'login-setting'
        : ''
      }`}
    >
      {/* New Changes */}
      <Grid
        container
        spacing={0}
        className={`${window.location.href.toLocaleLowerCase().indexOf('/account') !== -1 || window.location.href.toLocaleLowerCase().indexOf('/product') !== -1  || window.location.href.toLocaleLowerCase().indexOf('/menu') !== -1 ||  window.location.href.toLocaleLowerCase().indexOf('/location') !== -1
          ? 'footer-image footer-mobile footer-lg'
          : 'footer-setting footer-mobile footer-lg'
        }` }
        sx={{
          display: 'flex',
          //backgroundImage: `url(${image})`,
          //backgroundColor: {xs:"#136CAC",md: "none",lg: "none", sm: "none"},
          width: '100%',
          height: {sm:"500px", lg: "500px", md: "500px", xs: "620px"},
          margin: 0,
          padding: { xs: '100px 0px',sm: '100px 0px 10px 0px',md: '150px 0px 20px 0px', lg: '220px 0px 40px 0px' },
        }}
      >
        <Grid item xs={12} sm={6} md={7} lg={7}>
          <Grid
            container
            spacing={2}
            sx={{
              marginTop : {lg:"0px"},
              padding: {
                xs: '0px 20px',
                sm: '0px 30px',
                md: '30px 30px 0px 70px',
                lg: '0px 0px 0 100px',
              },
            }}
          >
            <Grid item xs={4} >
              <Button
                sx={{
                  display: 'flex',
                  padding: {
                    xs: '70px 0px 10px 0px', lg: '20px 0px 10px 0px',md: '50px 0px 10px 0px', sm: "80px 0px 10px 0px "
                  },
                  maxWidth: {
                    md: '236px',
                    xs: '186px',
                  },
                }}
              >
                <a href={process.env.REACT_APP_RUBIOS_HOME_PAGE}>
                  <img
                    src={footerLogo}
                    style={{ width: '100%' }}
                    alt="Rubios Coastal Grill"
                    title="Rubios Coastal Grill"
                  />
                </a>
              </Button>
            </Grid>
            <Grid item xs={8} sx={{paddingTop: {xs: "0px", sm: "36px !important",md: "16px !important",lg: "16px !important"}}}>
              <Grid
                container
                spacing={1}
                sx={{
                  flexWrap: { xs: 'wrap', md: 'wrap' },
                  maxWidth: '1024px',
                }}
              >
                <ul className="list">
                  {menu &&
                    menu.items.map((item: any, index: number) => (
                      <li key={Math.random()} style={{    margin: "0px 20px 20px 0px"}}>
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
        <Grid
          item

          sx={{
            display: {xs: "none", lg: "flex", md: "flex", sm: "none"},
            padding: '0 !important',
            paddingTop: { xs: '20px !important', lg: '0px !important' },
            paddingBottom: { xs: '0px !important',md: '30px !important', lg: '35px !important' },
            marginLeft: {lg: "20px"},
            marginRight: {md: "20px"},
          }}
        >
          <Divider orientation="vertical" color="#fff" sx={{ padding: '0' }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Grid
            container
            spacing={1}
            sx={{
              marginTop: {lg:"0px"},
              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
              padding: {
                xs: '0px 20px',
                sm: '0px 30px',
                
                lg: '0px 30px 0 70px',
              },
            }}
          >
            <Grid item xs={12} md={6} sx={{display: { md: "-webkit-inline-box",lg:"-webkit-inline-box"}}}>
              <Typography
                sx={{
                  fontSize: '13px',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontWeight: '100 !important',
                  letterSpacing: "0.07938em !important",
                  fontFamily: 'sunbornsans_one !important',
                  paddingTop: {xs: "20px",sm:"15px", md: '28px', lg: '2px' },
                }}
                title="Connect with Us"
              >
                Connect with Us
              </Typography>
              <Grid
                container
                spacing={1}
                width={200}
                sx={{
                  marginTop: {lg: "-15px"},
                  marginLeft: {lg:"20px",md: "10px", sm: "-8px", xs: "-8px"},
                  padding: {
                    xs: '10px 0 0 0',
                    md: '25px 0 0 0',
                    lg: '5px 0 0 0',
                  },
                }}
              >
                <Grid item xs={2} style={{ marginRight: '10px' }}>
                  <a
                    href={'https://www.instagram.com/rubioscoastalgrill/'}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <img
                      src={instaIcon}
                      style={{ width: '100%' }}
                      alt="Instagram Icon"
                    />
                  </a>
                </Grid>
                <Grid item xs={2} sx={{paddingLeft: "0px !important",paddingTop: "5px !important"}}>
                  <a
                    href={'https://www.facebook.com/rubios/'}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <FacebookOutlinedIcon style={{color: "white", fontSize: "xx-large"}}/>
                  </a>
                </Grid>

                <Grid item xs={2} sx={{paddingLeft: "0px !important",paddingTop: "5px !important"}}>
                  <a
                    href={'https://twitter.com/RubiosTweets'}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    {/* <img
                      src={twitterIcon}
                      style={{ width: '100%' }}
                      alt="Twitter Icon"
                    /> */}
                    <TwitterIcon style={{color: "white", fontSize: "xx-large",marginLeft: "5px"}}/>
                  </a>
                </Grid>
                <Grid item xs={2} style={{ marginRight: '10px' }}>
                  <a
                    href={'https://www.tiktok.com/@officialrubios'}
                    target={'_blank'}
                    rel="noreferrer"
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
            <Grid item xs={12} md={12}    sx={{ display: 'flex',flexDirection: 'column',alignItems: "flex-start"}} >
              <Typography
                sx={{
                  fontSize: '13px',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontWeight: '100 !important',
                  letterSpacing: "0.07938em !important",
                  fontFamily: 'sunbornsans_one !important',
                  paddingTop: { xs: '40px', md: '30px', lg: '0px' },
                  //paddingLeft: {lg: "107px"},
                }}
                title="Get The Rubio's App"
              >
                Get The Rubio's App
              </Typography>
              <Grid
                container
                spacing={4}
                maxWidth={300}
                sx={{ padding: '0px 0 0 0', 
                //paddingLeft: {lg: "107px"},
               }}
              >
                <Grid item xs={6} sx={{paddingTop: "40px !important"}}>
                  <Button sx={{ padding: 0 }}>
                    <a
                      href={process.env.REACT_APP_IOS_DOWNLOAD_LINK}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        style={{ display: 'inline-block', width: '100%' }}
                        src={iosLogo}
                        alt="Click Here To Download Our From Apple Store"
                      />
                    </a>
                  </Button>
                </Grid>
                <Grid item xs={6} sx={{paddingTop: "40px !important"}}>
                  <Button sx={{ padding: 0 }}>
                    <a
                      href={process.env.REACT_APP_GOOGLE_DOWNLOAD_LINK}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        style={{ display: 'inline-block', width: '100%' }}
                        src={andriodLogo}
                        alt="Click Here To Download Our From Google App Store"
                      />
                    </a>
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
            fontFamily= {"'libre_franklinlight' !important"}
            title="Copyright 2021 Rubios's Restaurants, Inc. All Rights reserved."
          >
            Copyright 2021 Rubios's Restaurants, Inc. All Rights reserved.
          </Typography>
        </Grid>
        {/* <Grid
          item
          xs={12}
          sx={{
            padding: '0 !important',
            paddingTop: { xs: '20px !important', lg: '30px !important' },
          }}
        >
          <Divider color="#fff" sx={{ padding: '0' }} />
        </Grid> */}
        <Grid item xs={12} sx={{ paddingLeft: { xs: '0px' } }}>
          <Grid container spacing={1}>
            <Grid
              item
              xs={5}
              sx={{
                display: { xs: 'none', md: 'flex' },
                padding: { 
                  xs: '30px 0px 0px 0px',
                   lg: '50px 0px 0px 0px' },
                justifyContent: { md: 'end' }
              }}
            >
              <Typography
                sx={{
                  paddingTop: '30px',
                  paddingLeft: { xs: '10px', sm: '30px', lg: '70px' },
                }}
                variant="caption"
                color="#fff"
                fontSize={9}
                fontFamily= {"'libre_franklinlight' !important"}
                title="Copyright 2021 Rubios's Restaurants, Inc. All Rights reserved."
              >
                Copyright 2021 Rubios's Restaurants, Inc. All Rights reserved.
              </Typography>
            </Grid>
            {/* <Grid
              item
              xs={1}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            ></Grid> */}
            <Grid item xs={12} md={6}>
              <Grid
                container
                spacing={1}
                sx={{ paddingTop: '6px', paddingLeft: { xs: '10px', md: "0px", lg: "0px" } }}
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{
                    display: 'flex',
                    paddingTop: '29px !important',
                    paddingLeft: '0px !important',
                    paddingRight: { md: '90px', sm: '30px', xs: '30px' },
                    justifyContent: { xs: 'center', md: 'start' },
                  }}
                >
                  <ul style={{ listStyle: 'none', display: 'flex' }}>
                    <li>
                      <a
                        href="javascript:Optanon.ToggleInfoDisplay()"
                        className={classes.smallLinks}
                        title="Do Not Sell My Personal Infomation"
                        aria-label="Do Not Sell My Personal Infomation"
                      >
                        Do Not Sell My Personal Infomation
                      </a>
                    </li>
                    <li>
                      <a
                        href={process.env.REACT_APP_WEBSITE_ACCESSIBILITY_LINK}
                        className={classes.smallLinks}
                        title="Website Accessibility"
                        aria-label="Website Accessibility"
                      >
                        Website Accessibility
                      </a>
                    </li>
                    <li>
                      <a
                        href={process.env.REACT_APP_TERMS_LINK}
                        className={classes.smallLinks}
                        title="Terms of use"
                        aria-label="Terms of use"
                      >
                        Terms of use
                      </a>
                    </li>
                    <li>
                      <a
                        href={process.env.REACT_APP_PRIVACY_LINK}
                        className={classes.smallLinks}
                        title="Privacy"
                        aria-label="Privacy"
                      >
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a
                        href="javascript:Optanon.ToggleInfoDisplay()"
                        className={classes.smallLinks}
                        title="Cookies"
                        aria-label="Cookies"
                      >
                        Cookies
                      </a>
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
