import { makeStyles } from '@mui/styles';
import { Button, Grid } from '@mui/material';
import RegisterForm from '../../../components/iframe/register-form';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import './register.css';
import { removeAuthTokenIframeRedirect } from '../../../redux/actions/auth';
import { isLoginUser } from '../../../helpers/auth';

const useStyle = makeStyles(() => ({
  root: {
    // background: `#eddfca`,
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
  const dispatch = useDispatch();

  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { authToken, iframeRedirect } = useSelector(
    (state: any) => state.authReducer,
  );

  useEffect(() => {
    if (isLoginUser()) {
      if (iframeRedirect) {
        dispatch(removeAuthTokenIframeRedirect());
        window.parent.location.href = `${process.env.REACT_APP_ORDERING_URL}/welcome?new_user=true`;
      }
    }
  }, [providerToken, authToken]);

  return (
    <>
      <Grid container component="main" className={classes.root}>
        <Grid item xs={12}>
          <Grid container className="sign-up-section">
            {isLoginUser() ? (
              <Button
                aria-label="view account"
                variant="contained"
                title="VIEW ACCOUNT"
                onClick={() =>
                  (window.parent.location.href = `${process.env.REACT_APP_ACCOUNT_URL}`)
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
