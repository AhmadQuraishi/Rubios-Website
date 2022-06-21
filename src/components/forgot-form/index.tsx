import React from 'react';
import { Grid, TextField, Button, Theme } from '@mui/material';
import './index.css';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userForgotPasswordRequest } from '../../redux/actions/user';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxSizing: 'border-box',
  },
}));

const ForgotForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading } = useSelector((state: any) => state.userReducer);

  return (
    <div className={classes.root}>
      <Grid container columns={16}>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .matches(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Invalid Email ',
              )
              .email('Invalid email address')
              .required('Email is required'),
          })}
          onSubmit={async (values) => {
            const obj = {
              email: values.email,
            };
            dispatch(userForgotPasswordRequest(obj));
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
                      aria-label="email"
                      label="Email Address"
                      title="Email"
                      type="text"
                      name="email"
                      className="form-field"
                      sx={{ width: '100%' }}
                      value={values.email}
                      onChange={handleChange}
                      error={Boolean(touched && errors.email)}
                      helperText={errors.email}
                    />
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
                        disabled={loading}
                        aria-label="sign in"
                        name="submit"
                        title="sign in"
                        variant="contained"
                      >
                        Reset Password
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

export default ForgotForm;