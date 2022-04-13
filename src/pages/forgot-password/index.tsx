import { makeStyles } from '@mui/styles';
import { Grid, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './forgot.css';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ForgotForm from '../../components/forgot-form';
import bgImage from '../../assets/imgs/login-bg.png';

const useStyle = makeStyles(() => ({
  root: {
    background: `url(${bgImage}) center center fixed`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  caption: {},
}));

const ForgotPassword = () => {
  const navigate = useNavigate();
  const classes = useStyle();

  const { providerToken } = useSelector((state: any) => state.providerReducer);

  const { pageURL } = useSelector((state: any) => state.pageStateReducer);
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );

  useEffect(() => {
    if (providerToken) {
      if (pageURL === undefined || pageURL === null) {
        navigate('/welcome');
      } else {
        navigate(pageURL);
      }
    }
  }, [providerToken]);

  return (
    <Fragment>
      <Grid container component="main" columns={16} className={classes.root}>
        <Grid item xs={13} className="login-wrapper">
          <Grid container columns={16} className="login-content">
            <Grid item xs={16} sm={16} md={14} lg={9} className="left-col">
              <Typography variant="caption" className="label" title="Login">
                Forgot Password
              </Typography>
              <Typography
                variant="h1"
                title="Enter the email address you use to sign in with us"
              >
                Enter the email address you use to sign in with us
              </Typography>
              <ForgotForm />
            </Grid>
            <Grid item xs={16} sm={16} md={14} lg={5.5} className="right-col">
              <Typography
                variant="caption"
                className="label"
                title="More Options"
                aria-label="More options for sign in"
              >
                More Options
              </Typography>
              <ul className="button-list">
                <li>
                  <Button
                    type="submit"
                    aria-label="sign in with facebook"
                    name="facebook"
                    title="sign in with facebook"
                    variant="contained"
                    className="sign-in-btn"
                  >
                    <img
                      src={require('../../assets/imgs/fb-icon.png')}
                      alt="Sign in with facebook"
                    />
                    Sign in with facebook
                  </Button>
                </li>
                <li>
                  <Button
                    type="submit"
                    aria-label="Sign in with apple"
                    name="Sign in with apple"
                    title="Sign in with apple"
                    variant="contained"
                    className="sign-in-btn"
                  >
                    <img
                      className="apple-icon"
                      src={require('../../assets/imgs/apple-icon.png')}
                      alt=" Sign in with apple"
                    />
                    Sign in with apple
                  </Button>
                </li>
                <li>
                  <Button
                    type="submit"
                    aria-label="Sign in with google"
                    name="Sign in with google"
                    title="Sign in with google"
                    variant="contained"
                    className="sign-in-btn"
                  >
                    <img
                      src={require('../../assets/imgs/g-icon.png')}
                      alt="Sign in with google"
                    />
                    Sign in with google
                  </Button>
                </li>
              </ul>

              <Button
                type="submit"
                aria-label="Create Account"
                name="Create Account"
                title="Create Account"
                variant="contained"
                className="acc-btn"
                onClick={() => navigate('/register')}
              >
                Create Account
              </Button>
              <Link
                to={restaurant ? '/menu/' + restaurant.slug : '/'}
                style={{ cursor: 'pointer' }}
                className="label bold"
                title="continue as guest"
              >
                Continue as guest
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default ForgotPassword;
