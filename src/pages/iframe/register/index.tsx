import { makeStyles } from '@mui/styles';
import { Button, Grid } from '@mui/material';
import RegisterForm from '../../../components/iframe/register-form';
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const useStyle = makeStyles(() => ({
  root: {
    background: `#eddfca`,
    // backgroundRepeat: 'no-repeat',
    // backgroundSize: 'cover',
    justifyContent: 'center',
  },
  signinBtn: {
    width: '200px',
    margin: '20px',
  },
}));

const RegisterIframe = () => {
  const classes = useStyle();
  const navigate = useNavigate();

  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const { pageURL } = useSelector((state: any) => state.pageStateReducer);

  useEffect(() => {
    if (providerToken && authToken) {
      // if (pageURL == undefined || pageURL == null) {
      //   navigate('/welcome');
      // } else {
      //   navigate(pageURL);
      // }
    }
  }, [providerToken]);

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12}>
          <Grid container className="sign-up-section">
            {providerToken && authToken ? (
              <Button
                aria-label="view account"
                variant="contained"
                title="VIEW ACCOUNT"
                onClick={() =>
                  window.open(`${process.env.REACT_APP_ACCOUNT_URL}`, '_blank')
                }
              >
                VIEW ACCOUNT
              </Button>
            ) : (
              <RegisterForm />
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterIframe;
