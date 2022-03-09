import React from 'react';
import {
  Grid,
  TextField,
  Button,
  Theme,
} from '@mui/material';
import './index.css';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {userLogin} from '../../redux/actions/user'
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 0px 20px 0px',
    boxSizing: 'border-box',
  }
}));

const LoginForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading: loadingProvider } = useSelector((state: any) => state.providerReducer);
  const { loading: loadingAuth } = useSelector((state: any) => state.authReducer);

  return (
    <div className={classes.root}>
        <Grid container>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .matches(
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  'Invalid Email ',
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
                password: values.password
              };

              console.log('obj', obj)

              dispatch(userLogin(obj));
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
                <Grid item xs={12} md={12} lg={12}>
                  <Grid container className="profile-section">
                    <Grid item xs={12}>
                      <TextField
                        aria-label="email"
                        label="Email"
                        title="Email"
                        type="text"
                        name="email"
                        sx={{ width: '100%' }}
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(touched && errors.email)}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                      aria-label="password"
                      label="Password"
                      title=" Password"
                      type="password"
                      name="password"
                      sx={{ width: '100%' }}
                      value={values.password}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        disabled={loadingProvider || loadingAuth}
                        aria-label="submit"
                        name="submit"
                        title="submit"
                        variant="contained"
                        sx={{ width: { xs: '100%', lg: '400px' } }}
                      >
                        Submit
                      </Button>
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
