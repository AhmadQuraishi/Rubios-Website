import { makeStyles } from '@mui/styles';
import { Grid, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './forgot.css';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ForgotForm from '../../components/forgot-form';
import bgImage from '../../assets/imgs/login-bg.png';
import ReactFacebookLogin from 'react-facebook-login';
import { facebookUserLogin } from '../../redux/actions/user';
import { displayToast } from '../../helpers/toast';
import Page from '../../components/page-title';
import { isLoginUser } from '../../helpers/auth';

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
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );

  useEffect(() => {
    if (isLoginUser()) {
      navigate('/account/');
    }
  }, [providerToken]);

  const dispatch = useDispatch();

  const handleCallBackfacebook = (response: any) => {
    console.log(response);
    try {
      if (response && response.name && response.email) {
        const name = response.name.split(' ');
        if (name.length > 1) {
          const fname = name[0];
          const lname = name[1];
          // navigate(
          //   `/register?fname=${fname}&lname=${lname}&email=${response.email}`,
          // );
        } else {
          const fname = name[0];
          // navigate(`/register?fname=${fname}&email=${response.email}`);
        }

        const obj = {
          access_token: response.accessToken,
          email: response.email,
          client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
          fb_uid: response.userID,
        };

        dispatch(facebookUserLogin(obj));
      } else {
        displayToast(
          'ERROR',
          'Unable to login with Facebook. Please try it again later.',
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Page title={'Forgot Password'} className="">
      <Fragment>
        <Grid container component="main" className={classes.root}>
          <Grid item xs={12} md={5} lg={5} className="forgot-wrapper">
            <Grid container columns={12} className="login-content">
              <Grid item xs={12} className="left-col">
                <Typography variant="caption" className="label" title="Login">
                  Forgot Password
                </Typography>
                <Typography
                  variant="h1"
                  title="Enter the email address associated with your account."
                >
                  Enter the email address associated with your account.
                </Typography>
                <ForgotForm />
              </Grid>
              {/*<Grid item xs={16} sm={16} md={14} lg={5.5} className="right-col">*/}
              {/*<Typography*/}
              {/*variant="caption"*/}
              {/*className="label"*/}
              {/*title="More Options"*/}
              {/*aria-label="More options for sign in"*/}
              {/*>*/}
              {/*More Options*/}
              {/*</Typography>*/}
              {/*<ul className="button-list">*/}
              {/*<li>*/}
              {/*<ReactFacebookLogin*/}
              {/*appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}*/}
              {/*fields="name,email,picture"*/}
              {/*callback={handleCallBackfacebook}*/}
              {/*textButton="SIGN IN WITH FACEBOOK"*/}
              {/*cssClass="fb-button"*/}
              {/*/>*/}
              {/*</li>*/}
              {/*/!*<li>*!/*/}
              {/*/!*<Button*!/*/}
              {/*/!*type="submit"*!/*/}
              {/*/!*aria-label="Sign in with apple"*!/*/}
              {/*/!*name="Sign in with apple"*!/*/}
              {/*/!*title="Sign in with apple"*!/*/}
              {/*/!*variant="contained"*!/*/}
              {/*/!*className="sign-in-btn"*!/*/}
              {/*/!*>*!/*/}
              {/*/!*<img*!/*/}
              {/*/!*className="apple-icon"*!/*/}
              {/*/!*src={require('../../assets/imgs/apple-icon.png')}*!/*/}
              {/*/!*alt=" Sign in with apple"*!/*/}
              {/*/>*/}
              {/*/!*Sign in with apple*!/*/}
              {/*/!*</Button>*!/*/}
              {/*/!*</li>*!/*/}
              {/*/!*<li>*!/*/}
              {/*/!*<Button*!/*/}
              {/*/!*type="submit"*!/*/}
              {/*/!*aria-label="Sign in with google"*!/*/}
              {/*/!*name="Sign in with google"*!/*/}
              {/*/!*title="Sign in with google"*!/*/}
              {/*/!*variant="contained"*!/*/}
              {/*/!*className="sign-in-btn"*!/*/}
              {/*/!*>*!/*/}
              {/*/!*<img*!/*/}
              {/*/!*src={require('../../assets/imgs/g-icon.png')}*!/*/}
              {/*/!*alt="Sign in with google"*!/*/}
              {/*/!*Sign in with google*!/*/}
              {/*/!*</Button>*!/*/}
              {/*/!*</li>*!/*/}
              {/*</ul>*/}

              {/*<Button*/}
              {/*type="submit"*/}
              {/*aria-label="Create Account"*/}
              {/*name="Create Account"*/}
              {/*title="Create Account"*/}
              {/*variant="contained"*/}
              {/*className="acc-btn"*/}
              {/*onClick={() => navigate('/register')}*/}
              {/*>*/}
              {/*Create Account*/}
              {/*</Button>*/}
              {/*<Link*/}
              {/*to={restaurant ? '/menu/' + restaurant.slug : '/'}*/}
              {/*style={{ cursor: 'pointer' }}*/}
              {/*className="label bold"*/}
              {/*title="continue as guest"*/}
              {/*>*/}
              {/*Continue as guest*/}
              {/*</Link>*/}
              {/*</Grid>*/}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    </Page>
  );
};

export default ForgotPassword;
