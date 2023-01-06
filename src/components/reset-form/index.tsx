import React, {useEffect} from 'react';
import { Grid, TextField, Button, Theme } from '@mui/material';
import './index.css';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userResetPasswordRequest } from '../../redux/actions/user';
import {useNavigate, useLocation} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    boxSizing: 'border-box',
  },
}));

const ResetForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const reset_password_token = query.get('reset_password_token');
  const { loading } = useSelector((state: any) => state.userReducer);
  console.log('reset_password_token 00', reset_password_token);
  useEffect(() => {
    if (reset_password_token === undefined || reset_password_token === null) {
      navigate('/login');
    }
  }, [reset_password_token]);

  return (
    <div className={classes.root}>
      <Grid container columns={16}>
        <Formik
          initialValues={{
            newpassword: '',
            confirmpassword: '',
          }}
          validationSchema={Yup.object({
            newpassword: Yup.string()
              .min(8, 'Must be at least 8 characters')
              .max(16, 'Must be at most 16 characters')
              .required('required'),
            confirmpassword: Yup.string()
              .min(8, 'Must be at least 8 characters')
              .max(16, 'Must be at most 16 characters')
              .oneOf([Yup.ref('newpassword'), null], 'Passwords must match')
              .required('required'),
          })}
          onSubmit={async (values) => {
            const passwordObj = {
              password: values.newpassword,
              password_confirmation: values.confirmpassword,
            };

            dispatch(
              userResetPasswordRequest(passwordObj, reset_password_token),
            );
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
                      aria-label="new password"
                      label="New Password"
                      title="New Password"
                      type="password"
                      name="newpassword"
                      sx={{ width: '100%' }}
                      value={values.newpassword}
                      onChange={handleChange('newpassword')}
                      onBlur={handleBlur('newpassword')}
                      error={Boolean(touched.newpassword && errors.newpassword)}
                      helperText={touched.newpassword && errors.newpassword}
                    />
                  </Grid>
                  <Grid item xs={16} sm={8} md={8} lg={16}>
                    <TextField
                      aria-label="confirm password "
                      label="Confirm Password"
                      title="Confirm Password"
                      name="confirmpassword"
                      type="password"
                      sx={{ width: '100%' }}
                      value={values.confirmpassword}
                      onChange={handleChange('confirmpassword')}
                      onBlur={handleBlur('confirmpassword')}
                      error={Boolean(
                        touched.confirmpassword && errors.confirmpassword,
                      )}
                      helperText={
                        touched.confirmpassword && errors.confirmpassword
                      }
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
                        aria-label="Reset password"
                        name="submit"
                        title="Reset password"
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

export default ResetForm;
