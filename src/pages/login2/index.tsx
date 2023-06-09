import { makeStyles } from '@mui/styles';
import {
  Grid,
  Typography,
  Button,
} from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import './login2.css';
import {  Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../../components/login-form';
import bgImage from '../../assets/imgs/login-bg.png';


const useStyle = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(${bgImage})`,
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

  useEffect(() => {
    if(providerToken){
      navigate('/welcome')
    }
  }, [providerToken])

  return (
    <Fragment>
      <Grid container component="main" columns={16} className={classes.root}>
        <Grid item xs={13} className="login-wrapper">
          <Grid container columns={16} className="login-content">
            <Grid item xs={16} sm={16} md={14} lg={9} className="left-col">
              <Typography variant="caption" className="label" title="Login">
                LOGIN
              </Typography>
              <Typography
                variant="h4"
                title={
                  providerToken &&
                  providerToken.first_name &&
                  providerToken.first_name
                }
              >
                SIGN IN TO <br/>RUBIO'S REWARDS{' '}
                {providerToken &&
                  providerToken.first_name &&
                  providerToken.first_name}
              </Typography>
              <LoginForm />
            </Grid>
            <Grid item xs={16} sm={16} md={14} lg={5.5} className="right-col">
              <Typography variant="caption" className="label" title="More Options">
                More Options
              </Typography>
              <Button
                type="submit"
                aria-label="sign in with facebook"
                name="facebook"
                title="sign in with facebook"
                variant="contained"
                className="sign-in-btn"
              >
                <img src={require('../../assets/imgs/fb-icon.png')}/>
                Sign in with facebook
              </Button>
              <Button
                type="submit"
                aria-label="Sign in with apple"
                name="Sign in with apple"
                title="Sign in with apple"
                variant="contained"
                className="sign-in-btn"
              >
                <img className="apple-icon" src={require('../../assets/imgs/apple-icon.png')}/>
                Sign in with apple
              </Button>
              <Button
                type="submit"
                aria-label="Sign in with google"
                name="Sign in with google"
                title="Sign in with google"
                variant="contained"
                className="sign-in-btn"
              >
                <img src={require('../../assets/imgs/g-icon.png')}/>
                Sign in with google
              </Button>
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
              <Typography onClick={() => navigate('/')} style={{cursor: 'pointer'}} variant="caption" className="label bold" title="continue as guest">
                Continue as guest
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Login2;
