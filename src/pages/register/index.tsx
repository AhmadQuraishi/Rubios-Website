import { makeStyles } from '@mui/styles';
import { Grid, Card, Typography } from '@mui/material';
import RegisterForm from '../../components/register-form';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../../assets/imgs/20221027_RCG_Brand_5tacos_0501-login.jpg';
import './register.css';
import Page from '../../components/page-title';
import { isLoginUser } from '../../helpers/auth';

const useStyle = makeStyles(() => ({
  root: {
    background: `url(${bgImage}) fixed`,
    backgroundRepeat: 'no-repeat',
    justifyContent: 'center',
    backgroundSize: 'cover',
  },
  signinBtn: {
    width: '200px',
    margin: '20px',
  },
}));

const Register = () => {
  const classes = useStyle();
  const navigate = useNavigate();

  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { pageURL } = useSelector((state: any) => state.pageStateReducer);

  useEffect(() => {
    if (isLoginUser()) {
      if (pageURL == undefined || pageURL == null) {
        navigate('/welcome');
      } else {
        navigate(pageURL);
      }
    }
  }, [providerToken]);

  return (
    <Page title={'Register'} className=''>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={10} sm={8} md={7} lg={5}>
          <Card className="register-card" elevation={6}>
            <Grid container className="sign-up-section">
              <Typography
                variant="caption"
                className="label"
                title="Create Account"
              >
                Create Account
              </Typography>
              <Typography variant="h1">
                SIGN UP FOR <br /> RUBIO'S REWARDS
              </Typography>
              <RegisterForm />
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Register;
