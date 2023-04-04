import React from 'react';
import { Grid, TextField, Button, Theme } from '@mui/material';
import './index.css';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userLogin } from '../../redux/actions/user';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxSizing: 'border-box',
  },
}));
const inputProps = {
  ' aria-required': 'true',
};

const LoginForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const { loading: loadingProvider } = useSelector(
    (state: any) => state.providerReducer,
  );
  const { loading: loadingAuth } = useSelector(
    (state: any) => state.authReducer,
  );
  const { basket } = useSelector((state: any) => state.basketReducer);

  const forgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className={classes.root}>
      <Grid container columns={16}>
        <Formik
          initialValues={{
            email: '',
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
              email: values.email,
              password: values.password,
            };

            console.log('obj', obj);
            setButtonDisabled(true)
            dispatch(userLogin(obj, basket ? basket.id : '', 'LOGIN_MAIN'));
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
              <Grid item xs={16} md={16} lg={16}>
                <Grid container spacing={1} className="sign-in-section">
                  <Grid item xs={16} sm={8} md={8} lg={16}>
                    <TextField
                      label="Email Address*"
                      title="Email"
                      type="text"
                      name="email"
                      className="form-field"
                      sx={{ width: '100%' }}
                      value={values.email ? values.email : null}
                      onChange={handleChange}
                      error={Boolean(touched && errors.email)}
                      helperText={errors.email}
                      inputProps={inputProps}
                    />
                  </Grid>

                  <Grid item xs={16} sm={8} md={8} lg={16}>
                    <TextField
                      aria-label="password"
                      label="Enter Password*"
                      title=" Password"
                      type="password"
                      name="password"
                      className="form-field"
                      sx={{ width: '100%' }}
                      value={values.password ? values.password : null}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      inputProps={inputProps}
                    />
                    <Link
                      className="forgot-pass"
                      title="forgot-password"
                      to="/forgot-password"
                      style={{ cursor: 'pointer' }}
                    >
                      Forgot Password?
                    </Link>
                  </Grid>
                  <Grid
                    item
                    xs={16}
                    sx={{
                      textAlign: {
                        lg: 'right',
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
  );
};

export default LoginForm;
