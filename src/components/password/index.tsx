import { Grid, Typography, TextField, Button, Theme } from '@mui/material';
import './index.css';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { changePassword } from '../../redux/actions/user';
import { Formik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 15px 20px 15px',
    maxWidth: '990px',
    boxSizing: 'border-box',
  },
  heading: {
    paddingBottom: '5px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
}));

const Password = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, updatedUserprofile } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {}, [updatedUserprofile, loading]);

  return (
    <div className={classes.root}>
      <Grid container>
        <Formik
          initialValues={{
            newpassword: '',
            confirmpassword: '',
          }}
          validationSchema={Yup.object({
            newpassword: Yup.string()
              // .matches(
              //   /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              //   'password must be minimum 8 characters and  must contain only  numbers and letters. ',
              // )
              .min(8, 'Must be at least 8 characters')
              .max(16, 'Must be at most 16 characters')
              .required('required'),

            confirmpassword: Yup.string()

              //   .matches(
              //     /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
              //     'password must be minimum 8 characters and  must contain only  numbers and letters. ',
              // )
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

            const data: any = await dispatch(changePassword(passwordObj));
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
            isValid,
            dirty,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid item xs={12} md={6}>
                <Grid container className="profile-section">
                  <Grid item xs={12}>
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
                  {/* <Typography>{errors.newpassword}</Typography> */}
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      className="body-text"
                      title="Password must be at least 8 characters."
                      sx={{ width: '100%' }}
                    >
                      Password must be at least 8 characters.
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
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
                  {/* <Typography>{errors.confirmpassword}</Typography> */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
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

export default Password;
