import { makeStyles } from '@mui/styles';
import { Grid, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './login2.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../../components/login-form';
import bgImage from '../../assets/imgs/login-bg.png';
import ReactFacebookLogin from 'react-facebook-login';
import { facebookUserLogin } from '../../redux/actions/user';
import { displayToast } from '../../helpers/toast';
import Page from '../../components/page-title';

const useStyle = makeStyles(() => ({
  root: {
    background: `url(${bgImage}) center center fixed`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  caption: {},
}));

const Login2 = () => {
  const navigate = useNavigate();
  const classes = useStyle();

  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const { basket } = useSelector((state: any) => state.basketReducer);

  const { pageURL } = useSelector((state: any) => state.pageStateReducer);
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      providerToken &&
      authToken &&
      authToken.authtoken &&
      authToken.authtoken !== ''
    ) {
      if (pageURL == undefined || pageURL == null) {
        navigate('/welcome');
      } else if (pageURL && pageURL.includes('reset-password')) {
        navigate('/welcome');
      } else {
        if (basket) {
          navigate(pageURL);
        } else {
          navigate('/welcome');
        }
      }
    }
  }, [authToken, providerToken]);

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
    <Page title={'Login'} className="">
      <main>
        <Grid container component="main" columns={16} className={classes.root}>
          <Grid item xs={13} className="login-wrapper">
            <Grid container columns={16} className="login-content">
              <Grid item xs={16} sm={16} md={14} lg={9} className="left-col">
                <Typography variant="caption" className="label" title="Login">
                  LOGIN
                </Typography>
                <Typography
                  variant="h1"
                  title={
                    providerToken &&
                    providerToken.first_name &&
                    providerToken.first_name
                  }
                >
                  SIGN IN TO <br />
                  RUBIO'S REWARDS{' '}
                  {providerToken &&
                    providerToken.first_name &&
                    providerToken.first_name}
                </Typography>
                <LoginForm />
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
                    <ReactFacebookLogin
                      appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
                      fields="name,email,picture"
                      scope="public_profile,email"
                      callback={handleCallBackfacebook}
                      textButton="SIGN IN WITH FACEBOOK"
                      cssClass="fb-button"
                    />
                  </li>
                  {/*<li>*/}
                  {/*<Button*/}
                  {/*type="submit"*/}
                  {/*aria-label="Sign in with apple"*/}
                  {/*name="Sign in with apple"*/}
                  {/*title="Sign in with apple"*/}
                  {/*variant="contained"*/}
                  {/*className="sign-in-btn"*/}
                  {/*>*/}
                  {/*<img*/}
                  {/*className="apple-icon"*/}
                  {/*src={require('../../assets/imgs/apple-icon.png')}*/}
                  {/*alt=" Sign in with apple"*/}
                  {/*/>*/}
                  {/*Sign in with apple*/}
                  {/*</Button>*/}
                  {/*</li>*/}
                  {/*<li>*/}
                  {/*<Button*/}
                  {/*type="submit"*/}
                  {/*aria-label="Sign in with google"*/}
                  {/*name="Sign in with google"*/}
                  {/*title="Sign in with google"*/}
                  {/*variant="contained"*/}
                  {/*className="sign-in-btn"*/}
                  {/*>*/}
                  {/*<img*/}
                  {/*src={require('../../assets/imgs/g-icon.png')}*/}
                  {/*alt="Sign in with google"*/}
                  {/*/>*/}
                  {/*Sign in with google*/}
                  {/*</Button>*/}
                  {/*</li>*/}
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
      </main>
    </Page>
  );
};

export default Login2;
