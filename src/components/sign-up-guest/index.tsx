import {
  Grid,
  Typography,
  Link,
  Checkbox,
  TextField,
  Button,
  Divider,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactDateInputs from 'react-date-inputs';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useEffect, forwardRef } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
const SignUpGuest = ({
  guestSignupCheckout,
  signupFormRef,
  birthDay,
  setBirthDay,
}: any) => {
  const navigate = useNavigate();
  const { locations } = useSelector((state: any) => state.locationReducer);
  const [termsAndConditions, setTermsAndconditions] = useState(false);
  const { loading: loadingProvider } = useSelector(
    (state: any) => state.providerReducer,
  );
  const { loading: loadingAuth } = useSelector(
    (state: any) => state.authReducer,
  );
  React.useEffect(() => {
    const monthField = document.getElementsByClassName(
      'react-date-inputs__month',
    );
    const dayField = document.getElementsByClassName('react-date-inputs__day');

    if (monthField && monthField.length && dayField && dayField.length) {
      monthField[0].after(dayField[0]);
    }
  }, []);
  useEffect(() => {
    if (locations) {
      const elem = document.getElementById('react-select-3-input');
      if (elem) elem.removeAttribute('aria-haspopup');
      const dName = 'react-date-inputs__day';
      const mName = 'react-date-inputs__month';
      const yName = 'react-date-inputs__year';
      const dateElem = document.getElementsByClassName(dName);
      if (dateElem) {
        dateElem[0].setAttribute('aria-label', 'Day');
      }
      const monthElem = document.getElementsByClassName(mName);
      if (monthElem) {
        monthElem[0].setAttribute('aria-label', 'Month');
      }
      const yearElem = document.getElementsByClassName(yName);
      if (yearElem) {
        yearElem[0].setAttribute('aria-label', 'Year');
      }
    }
  }, [locations]);
  const handleBirthDayChange = (value?: Date | undefined): undefined => {
    setBirthDay(value);
    return;
  };
  return (
    <>
      <Grid container>
        <Grid item xs={0} sm={0} md={3} lg={2} />

        <Grid item style={{ paddingBottom: 30 }} xs={12} sm={12} md={6} lg={8}>
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
              marginTop: '10px',
              marginBottom: '5px',
              margin: { sm: '0px', lg: '0px 80px 0px 80px' },
            }}
            variant="h6"
          >
            Join Rubio's Rewards and get $5 off any entree on your next order.
          </Typography>
          <br />
          <Formik
            innerRef={signupFormRef}
            initialValues={{
              password: '',
              password_confirmation: '',
              birthday: '',
              termsAndConditions: false,
              emailNotification: true,
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
            onSubmit={async (values) => {}}
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
                    lg={7}
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
                      sx={{ width: '100%', marginBottom: '10px' }}
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
                        sx={{ width: '100%', marginBottom: '10px' }}
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
                        sx={{
                          padding: '0px !important',
                          float: 'left',
                          marginRight: '5px',
                        }}
                        name="termsAndConditions"
                        inputProps={{
                          'aria-labelledby': 'chkTermandCondition',
                        }}
                      />{' '}
                      <Typography
                        variant="body2"
                        sx={{
                          width: '100%',
                          paddingTop: '4px',
                          fontSize: '11px !important',
                          fontFamily: "'Librefranklin-Regular' !important",
                        }}
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

                    {/* <Grid
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
                          width: {lg:'130%',xs:"100%",md:"130%",sm: "130%"},
                          paddingTop: '3px !important',
                          display: 'inline-block',
                          alignItems: 'center',
                          fontSize: '11px !important',
                          fontFamily: 'Poppins-Regular',
                          marginTop: '8px',
                        }}
                      >
                        <Checkbox
                          checked={values.emailNotification}
                          onChange={handleChange('emailNotification')}
                          id="emailNotification"
                          name="emailNotification"
                          sx={{ marginTop: '-3px',padding: '0px 5px 0px 0px !important', float: 'left'}}
                          inputProps={{
                            'aria-labelledby': 'emailNotification',
                          }}
                        />{'  '}
                        Send me emails with special Offers and Updates.
                      </Typography>
                    </Grid> */}

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
                          disabled={
                            !values.termsAndConditions ||
                            loadingProvider ||
                            loadingAuth
                          }
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

                    <Grid item xs={12} sx={{ padding: '15px 0px 0px 0px' }}>
                      <Divider
                        sx={{ borderColor: '#122a41' }}
                        style={{ borderTopWidth: '1px' }}
                      />
                    </Grid>
                    <Grid
                    // item
                    // xs={12}
                    // sm={12}
                    // md={12}
                    // lg={12}
                    // sx={{ display: 'flex', justifyContent: 'center', marginTop: "10px", }}
                    >
                      <Typography
                        title="Already a Rewards member?"
                        sx={{
                          color: '#122a41',
                          fontSize: '1.1rem',
                          fontFamily: "'Sunborn-Sansone' !important",
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          marginTop: '30px',
                          marginBottom: '16px',
                        }}
                      >
                        Already a Rewards member?{' '}
                      </Typography>
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
                            aria-label="Sign in"
                            name="signin"
                            title="signin"
                            sx={{
                              color: '#122a41',
                              fontSize: '1.1rem',
                              fontFamily: "'Sunborn-Sansone' !important",
                              width: '100%',
                              height: '70px',
                              border: '3px solid #122a41',
                            }}
                            onClick={() => navigate('/login')}
                          >
                            Sign In
                          </Button>
                        </Grid>
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
