import { Link } from 'react-router-dom';
import { Grid, Theme, Typography, Divider, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

import footerLogo from '../../assets/imgs/ariginalFishTacos.png';
import andriodLogo from '../../assets/imgs/button-google.png';
import iosLogo from '../../assets/imgs/button-apple.png';
import FooterBg from '../../assets/imgs/BottomBG.png'
import { useDispatch, useSelector } from 'react-redux';
import { getMenuRequest } from '../../redux/actions/footer';
import { useEffect, useState } from 'react';
import './footer.css';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import instaIcon from '../../assets/imgs/insta-icon.png';
import tiktokIcon from '../../assets/imgs/tik-tok.png';

const useStyles = makeStyles((theme: Theme) => ({
  links: {
    textTransform: 'uppercase',
    fontSize: '11px',
    fontFamily: "'Sunborn-Sansone' !important",
    textDecoration: 'none',
    color: '#fff',
    letterSpacing: "1.00938px",
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
    <footer
      className={`${
        window.location.href.toLocaleLowerCase().indexOf('/product') !== -1
          ? 'footer-control'
          : 'footer-setting'
      }`}
    >
      <Grid
        container
        spacing={0}
        sx={{
          display: 'flex',
          //backgroundColor: 'secondary.main',
          backgroundImage: `url(${FooterBg})`,
          width: '100%',
          margin: 0,
          padding: { xs: '50px 0px', lg: '130px 0px 40px 0px', md: "130px 0px 40px 0px" },
        }}
      >
        <Grid item xs={12} sm={6} md={12} lg={12}>
          <Grid
            container
            spacing={2}
            sx={{
              flexDirection: {sm:"column", xs: "row", lg: "row", md: "row"},
              padding: {
                xs: '0px 20px',
                sm: '0px 30px',
                lg: '0px 30px 0 70px',
              },
            }}
          >
            <Grid item xs={2} sx={{paddingLeft : {sm: "25px !important", xs: "0px !important", md: "-25px !important", lg: "0px !important"}}}> 
              <Button
                sx={{
                  display: 'flex',
                  marginLeft: { sm: "30px"},
                  padding: {
                    xs: '40px 0px 45px 0px',
                    md: '0px 0px 70px 0px',
                    lg: '25px 20px 45px 0px',
                    sm: '70px 0px 45px 0px',
                  },
                  maxWidth: {
                    md: '150px',
                    xs: '150px',
                    sm: '150px',
                  },
                }}
              >
                <a href={process.env.REACT_APP_RUBIOS_HOME_PAGE}>
                  <img

                    src={footerLogo}
                    className="footer-img-logo"
                    alt="Rubios Coastal Grill"
                    title="Rubios Coastal Grill"
                  />
                </a>
              </Button>
            </Grid>
            <Grid item xs={9} sx={{paddingLeft : {sm: "25px !important", xs: "0px !important", md: "-25px !important", lg: "0px !important"}}}>
              <Grid
                container
                spacing={1}
                sx={{
                  flexWrap: { xs: 'wrap', md: 'nowrap' },
                  marginTop : {sm: "25px", xs: "0px", md: "-25px", lg: "0px"},
                   marginLeft: {md: "10px !important",sm: "0px", xs: "0px",lg: "0px" }
                  // maxWidth: '1024px',
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
            <Grid item xs={12} md={4} sx={{paddingLeft: {md:"45px !important", lg: "17px !important", sm:"0px", xs:"0px"}}}>
              <Typography
                sx={{
                  fontSize: '11px',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontFamily: "'Sunborn-Sansone'!important",
                  letterSpacing: "1.00938px",
                  paddingTop: { xs: '40px', md: '30px', lg: '60px' },
                }}
                title="Connect with Us"
              >
                Connect with Us
              </Typography>
              {/* <Grid
                container
                spacing={1}
                width={200}
                sx={{
                  padding: {
                    xs: '10px 0 0 0',
                    md: '10px 0 0 0',
                    lg: '5px 0 0 0',
                  },
                }}
              >
                <Grid item xs={2} style={{ marginRight: '10px' }}>
                  <a
                    href={'https://www.facebook.com/rubios/'}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <img
                      src={fbIcon}
                      style={{ width: '100%' }}
                      alt="Facebook Icon"
                    />
                  </a>
                </Grid>
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
                <Grid item xs={2} style={{ marginRight: '10px' }}>
                  <a
                    href={'https://twitter.com/RubiosTweets'}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <img
                      src={twitterIcon}
                      style={{ width: '100%' }}
                      alt="Twitter Icon"
                    />
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
              </Grid> */}
              <Grid
                container
                spacing={1}
                width={200}
                sx={{
                  marginTop: {lg: "0px"},
                  marginLeft: {lg:"-7px",md: "-6px", sm: "-8px", xs: "-8px"},
                  padding: {
                    xs: '10px 0 0 0',
                    md: '15px 0 0 0',
                    lg: '5px 0 0 0',
                  },
                }}
              >
                <Grid item xs={2} style={{ marginRight: '20px'}}>
                  <a
                    href={'https://www.instagram.com/rubioscoastalgrill/'}
                    target={'_blank'}
                    aria-label="Visit our Instagram page."
                    rel="noreferrer"
                    
                  >
                    <img
                      src={instaIcon}
                      style={{ width: '35px' }}
                      alt="Instagram Icon"
                    />
                  </a>
                </Grid>
                <Grid item xs={2} sx={{paddingLeft: "0px !important",paddingTop: "5px !important",marginRight: "10px !important"}}>
                  <a
                  aria-label="Visit our Facebook page."
                    href={'https://www.facebook.com/rubios/'}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <FacebookOutlinedIcon style={{color: "white", fontSize: "40px"}}/>
                  </a>
                </Grid>

                <Grid item xs={2} sx={{paddingLeft: "0px !important",paddingTop: "5px !important",marginRight: "10px !important"}}>
                  <a
                  aria-label="Visit our Twitter page."
                    href={'https://twitter.com/RubiosTweets'}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    {/* <img
                      src={twitterIcon}
                      style={{ width: '100%' }}
                      alt="Twitter Icon"
                    /> */}
                    <TwitterIcon style={{color: "white", fontSize: "40px",marginLeft: "5px"}}/>
                  </a>
                </Grid>
                <Grid item xs={2} style={{ marginRight: '10px' }}>
                  <a
                  aria-label="Visit our Tiktok page."
                    href={'https://www.tiktok.com/@officialrubios'}
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    <img
                      src={tiktokIcon}
                      style={{ width: '35px' }}
                      alt="Tiktok Icon"
                    />
                  </a>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography
                sx={{
                  fontSize: '11px',
                  color: '#fff',
                  textTransform: 'uppercase',
                  fontFamily: "'Sunborn-Sansone'!important",
                  letterSpacing: '1.00938px',
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
                <Grid item xs={6} sx={{marginTop: "12px !important"}}>
                  {/* <Button sx={{ padding: 0 }}> */}
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
                  {/* </Button> */}
                </Grid>
                <Grid item xs={6} sx={{marginTop: "12px !important"}}>
                  {/* <Button sx={{ padding: 0 }}> */}
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
                  {/* </Button> */}
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
            title="Copyright© 2023 Rubios's Restaurants, Inc. All Rights reserved."
          >
            Copyright<span>{'\u00A9'}</span> 2023 Rubios's Restaurants, Inc. All Rights reserved.
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
                  paddingTop: '30px',
                  paddingLeft: { xs: '10px', sm: '30px', lg: '70px' },
                }}
                variant="caption"
                color="#fff"
                fontSize={9}
                title="Copyright© 2023 Rubios's Restaurants, Inc. All Rights reserved."
              >
                Copyright<span>{'\u00A9'}</span> 2023 Rubios's Restaurants, Inc. All Rights reserved.
              </Typography>
            </Grid>
            <Grid
              item
              xs={1}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            ></Grid>
            <Grid item xs={12} md={6}>
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
                    paddingRight: { md: '60px', sm: '30px', xs: '30px' },
                    justifyContent: { xs: 'left', md: 'right' },
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