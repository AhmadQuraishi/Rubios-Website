import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik } from 'formik';
import { Grid, TextField, Button, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { userLogin } from '../../redux/actions/user';
import ReactFacebookLogin from 'react-facebook-login';
import { facebookUserLogin } from '../../redux/actions/user';
import { displayToast } from '../../helpers/toast';
import { isLoginUser } from '../../helpers/auth';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      boxSizing: 'border-box',
    },
  }));
  const inputProps = {
    ' aria-required': 'true',
  };
const LoginAuthDialog= (props: any)  =>{
    const {
      openAuthenticationModal,
      setOpenAuthenticationModal
    } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [open, setOpen] = React.useState(openAuthenticationModal);

    const {providerToken,loading: loadingProvider } = useSelector(
      (state: any) => state.providerReducer,
    );
    const { authToken ,loading: loadingAuth } = useSelector(
      (state: any) => state.authReducer,
    );
    const { basket } = useSelector((state: any) => state.basketReducer);


    React.useEffect(() => {

      if(buttonDisabled && (!loadingAuth && !loadingProvider)){
        handleClose()
      }

    }, [loadingAuth, loadingProvider])
  
    const forgotPassword = () => {
      navigate('/forgot-password');
    };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleClose = () => {
    setOpen(false);
    setOpenAuthenticationModal(false)
  };

  const backdropClose = (event: any, reason: any) => {
    if (reason && reason === 'backdropClick') {
      return;
    }
    handleClose();
  };

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
  function handleFacebook() {
    throw new Error('Function not implemented.');
  }

  // const handleLogin = () => {
  //   console.log(`Email: ${email} Password: ${password}`);
  //   setOpen(false);
  // };
  return (
    <div>
      <Dialog onClose={backdropClose} open={open} style={{marginRight: "20px", marginLeft:"20px"}} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" style={{textAlign: "center"}}>Authentication Required</DialogTitle>
        {providerToken?.fb_uid ? (
    <div style={{padding: "20px", alignItems: "center", display: "flex", justifyContent: "center" }}>
    <ReactFacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_APP_ID || ''}
      fields="name,email,picture"
      scope="public_profile,email"
      callback={handleCallBackfacebook}
      textButton="SIGN IN WITH FACEBOOK"
      cssClass="fb-button"
    />
    </div>
    ): (
      <div className={classes.root}>
      <Grid container columns={16}>
        <Formik
          initialValues={{
            email: providerToken?.email ? providerToken?.email : '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .matches(
                // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/,
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Invalid Email',
              )
              .email('Invalid email address')
              .required('Email is required'),
            password: Yup.string()
              .min(8, 'Must be at least 8 characters')
              .max(16, 'Must be at most 16 characters')
              .required('required'),
          })}
          onSubmit={async (values) => {
            const obj = {
              email: providerToken?.email ? providerToken?.email : '',
              password: values.password,
            };

            console.log('obj', obj);
            setButtonDisabled(true)
            dispatch(userLogin(obj, basket ? basket.id : ''));
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid item xs={16} md={16} lg={16} sx={{padding: "20px"}}>
                <Grid container spacing={1} className="sign-in-section">
                  <Grid item xs={16} sm={16} md={16} lg={16}>
                    <TextField
                      label="Email Address*"
                      title="Email"
                      disabled={isLoginUser()}
                      type="text"
                      name="email"
                      className="form-field"
                      sx={{ width: '100%' }}
                      value={values.email ? values.email : null}
                      onChange={handleChange}        
                      onBlur={handleBlur}
                      error={Boolean(touched && errors.email)}
                      helperText={errors.email}
                      inputProps={inputProps}
                    />
                  </Grid>


                  <Grid item xs={16} sm={16} md={16} lg={16}>
                    <TextField
                      aria-label="password"
                      label="Enter Password*"
                      title=" Password"
                      type="password"
                      name="password"
                      className="form-field"
                      sx={{ width: '100%' }}
                      autoComplete="off"
                      value={values.password ? values.password : null}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    {/* <Link
                      className="forgot-pass"
                      title="forgot-password"
                      to="/forgot-password"
                      style={{ cursor: 'pointer' }}
                    >
                      Forgot Password?
                    </Link> */}
                  </Grid>
                  <Grid
                    item
                    xs={16}
                    sx={{
                      textAlign: {
                        lg: 'center',
                        md: 'center',
                        sm: 'center',
                        xs: 'center',
                      },
                    }}
                  >
                    <Grid
                      item
                      xs={16}
                      md={8}
                      lg={8}
                      sx={{ width: '100%', display: 'inline-block' }}
                    >
                      <Button
                        type="submit"
                        disabled={(loadingProvider || loadingAuth) && buttonDisabled}
                        aria-label="sign in"
                        name="submit"
                        title="sign in"
                        variant="contained"
                      >
                        Sign in
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Grid>
    </div>

                    )}
      </Dialog> 
    </div>
  );
};

export default LoginAuthDialog;
