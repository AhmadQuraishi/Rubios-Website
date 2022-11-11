import {
  Grid,
  Typography,
  Link,
  Checkbox,
  TextField,
  Button,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactDateInputs from 'react-date-inputs';
import { Formik } from 'formik';
import * as Yup from 'yup';
import './index.css';
import { useNavigate } from 'react-router-dom';
const SignUpGuest = ({ guestSignupCheckout, signupFormRef }: any) => {
  const navigate = useNavigate();
  const [birthDay, setBirthDay] = useState<Date | undefined>();

  const { loading: loadingProvider } = useSelector(
    (state: any) => state.providerReducer,
  );
  const { loading: loadingAuth } = useSelector(
    (state: any) => state.authReducer,
  );

  const handleBirthDayChange = (value?: Date | undefined): undefined => {
    setBirthDay(value);
    return;
  };
  return (
    <>
      <Grid container>
        <Grid item xs={0} sm={0} md={3} lg={3} />

        <Grid item style={{ paddingBottom: 30 }} xs={12} sm={12} md={6} lg={6}>
          <Typography
            fontWeight={500}
            title="ORDER DETAILS"
            variant="h2"
            sx={{
              textAlign: {
                lg: 'center',
                md: 'center',
                sm: 'center',
                xs: 'left',
              },
            }}
          >
            START EARNING POINTS TODAY
          </Typography>
          <Typography
            sx={{
              textAlign: {
                lg: 'center',
                md: 'center',
                sm: 'center',
                xs: 'left',
              },
            }}
            variant="h6"
          >
            Join Rubio's Rewards and get $5 off your next order.
          </Typography>
          <br />
          <Formik
            innerRef={signupFormRef}
            initialValues={{
              password: '',
              password_confirmation: '',
              birthday: '',
              termsAndConditions: false,
              emailNotification: false,
            }}
            validationSchema={Yup.object({
              password: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .max(16, 'Must be at most 16 characters')
                .required('required'),
              password_confirmation: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .max(16, 'Must be at most 16 characters')
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('required'),
              termsAndConditions: Yup.boolean().required(),
            })}
            onSubmit={async (values) => {
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
              dirty,
            }) => (
              <form onSubmit={handleSubmit} autoComplete="off">
                <Grid item xs={12} md={12} lg={12}>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={8}
                    lg={8}
                    sx={{ margin: 'auto' }}
                  >
                    <TextField
                      aria-label="Create Password "
                      label="Create Password *"
                      title="Create Password "
                      type="password"
                      name="password"
                      autoComplete="off"
                      sx={{ width: '100%' }}
                      value={values.password}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <Typography
                      variant="body2"
                      className="body-text-signup"
                      title="Password must be at least 8 characters."
                      sx={{ width: '100%',marginBottom: '10px', }}
                    >
                      Password must be at least 8 characters.
                    </Typography>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      sx={{ margin: 'auto' }}
                    >
                      <TextField
                        aria-label="confirm password "
                        label="Confirm Password *"
                        title="Confirm Password"
                        name="password_confirmation"
                        autoComplete="off"
                        type="password"
                        sx={{ width: '100%',marginBottom: "10px", }}
                        value={values.password_confirmation}
                        onChange={handleChange('password_confirmation')}
                        onBlur={handleBlur('password_confirmation')}
                        error={Boolean(
                          touched.password_confirmation &&
                            errors.password_confirmation,
                        )}
                        helperText={
                          touched.password_confirmation &&
                          errors.password_confirmation
                        }
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className="date-field"
                      sx={{ margin: 'auto', width: '100%' }}
                    >
                      <ReactDateInputs
                        className="body-text-signup"
                        label="Birthday (Optional)"
                        onChange={(value) => handleBirthDayChange(value)}
                        value={birthDay}
                        show={['month', 'day', 'year']}
                      />
                    </Grid>
                    <br />
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      sx={{ margin: 'auto' }}
                    >
                      <Checkbox
                        checked={values.termsAndConditions}
                        id="termsAndConditions"
                        onChange={handleChange('termsAndConditions')}
                        sx={{ padding: '0px !important', float: 'left' }}
                        name="termsAndConditions"
                        inputProps={{
                          'aria-labelledby': 'chkTermandCondition',
                        }}
                      />{' '}
                      <Typography
                        variant="body2"
                        sx={{ width: '100%', paddingTop: '3px' }}
                      >
                        I accept the{' '}
                        <Link
                          target="popup"
                          onClick={() =>
                            window.open(
                              process.env.REACT_APP_TERMS_LINK,
                              'name',
                              'width=1000,height=1000',
                            )
                          }
                          underline="hover"
                          sx={{ color: '#1a86ff', cursor: 'pointer' }}
                        >
                          Terms and Conditions
                        </Link>
                        .
                      </Typography>
                      {dirty && !values.termsAndConditions && (
                        <p className="fav-error-message">
                          Terms and conditions are required
                        </p>
                      )}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      sx={{ margin: 'auto' }}
                    >
                      <Typography
                        variant="body2"
                        title="I accept the terms and conditions."
                        sx={{
                          width: '100%',
                          paddingTop: '3px !important',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Checkbox
                          checked={values.emailNotification}
                          onChange={handleChange('emailNotification')}
                          id="emailNotification"
                          name="emailNotification"
                          sx={{ padding: '0px !important', float: 'left' }}
                          inputProps={{
                            'aria-labelledby': 'emailNotification',
                          }}
                        />{' '}
                        Send me email with special Offers and Updates.
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      sx={{ display: 'flex', justifyContent: 'center',marginTop: "10px", }}
                    >
                      <Typography
                        variant="body2"
                        className="body-text-signup"
                        title="Already a Rewards member?"
                        sx={{ width: '100%' }}
                      >
                        Already a Rewards member?{' '}
                        <Link
                          onClick={() => navigate('/login')}
                          underline="hover"
                          sx={{ color: '#1a86ff', cursor: 'pointer' }}
                        >
                          Log In
                        </Link>
                      </Typography>
                    </Grid>
                    <br />
                    <Grid
                      item
                      sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        sx={{ margin: 'auto' }}
                      >
                        <Button
                          type="submit"
                          onClick={guestSignupCheckout}
                          disabled={loadingProvider || loadingAuth}
                          aria-label="submit form to sign upm for rubios rewards"
                          name="signup"
                          title="signup"
                          variant="contained"
                          sx={{ width: '100%', height: '70px' }}
                        >
                          Sign Up
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUpGuest;
