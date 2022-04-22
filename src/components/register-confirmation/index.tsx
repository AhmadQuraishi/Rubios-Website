import {
  Grid,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent, Typography, Checkbox, Link,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
// import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { getlocations } from '../../redux/actions/location';
// import ReactDateInputs from "react-date-inputs";
// import {userRegister} from "../../redux/actions/user";
import { userRegister } from '../../redux/actions/user';
import "./register-confirmation.css";


const RegisterConfirmation = () => {
  const dispatch = useDispatch();
  const [favLocation, setFavLocation] = useState('');
  const [selectShrink, setSelectShrink] = useState(false);
  const [birthDay, setBirthDay] = useState<Date | undefined>();
  const [termsAndConditions, setTermsAndconditions] = useState(false);



  const { locations } = useSelector((state: any) => state.locationReducer);

  const { loading: loadingProvider } = useSelector(
    (state: any) => state.providerReducer,
  );
  const { loading: loadingAuth } = useSelector(
    (state: any) => state.authReducer,
  );

  useEffect(() => {
    dispatch(getlocations());
  }, []);

  const handleChangeLocation = (event: SelectChangeEvent) => {
    setFavLocation(event.target.value as string);
  };

  const handleBirthDayChange = (value?: Date | undefined): undefined => {
    setBirthDay(value);
    return;
  };

  const handleChangeCheckbox = () => {
    setTermsAndconditions(!termsAndConditions);
  };

  // @ts-ignore
  return (
    <>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          password: '',
          password_confirmation: '',
          favLocation: '',
          birthday: '',
        }}
        validationSchema={Yup.object({
          // first_name: Yup.string()
          //   .trim()
          //   .max(30, 'Must be 30 characters or less')
          //   // .min(3, 'Must be at least 3 characters')
          //   // .matches(/^[aA-zZ\s]+$/, 'Only letters are allowed for this field ')
          //   .required('First Name is required'),
          // last_name: Yup.string()
          //   .trim()
          //   .max(30, 'Must be 30 characters or less')
          //   // .min(3, 'Must be at least 3 characters')
          //   // .matches(/^[aA-zZ\s]+$/, 'Only letters are allowed for this field ')
          //   .required('Last Name is required'),
          // email: Yup.string()
          //   .trim()
          //   .matches(
          //     /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          //     'Invalid Email ',
          //   )
          //   .email('Invalid email address')
          //   .required('Email is required'),
          // phone: Yup.string().min(14, 'Enter valid number'),
          password: Yup.string()
            .trim()
            .min(8, 'Must be at least 8 characters')
            .max(16, 'Must be at most 16 characters')
            .required('required'),
          password_confirmation: Yup.string()
            .trim()
            .min(8, 'Must be at least 8 characters')
            .max(16, 'Must be at most 16 characters')
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('required'),
        })}
        onSubmit={async (values) => {
          const obj: any = {
            first_name: values.first_name,
            last_name: values.last_name,
            password: values.password,
            password_confirmation: values.password_confirmation,
            email: values.email,
            fav_location_id: favLocation,
            // terms_and_conditions: termsAndConditions,
          };

          console.log('obj', obj);

          // if (birthDay) {
          //   obj.birthday = moment(birthDay).format('YYYY-MM-DD');
          // }
          //
          dispatch(userRegister(obj));
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
            <Grid item xs={12} sm={6} md={6} lg={12}>
              <Grid container className="confirmation-form">
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    aria-label="first name"
                    label="First Name"
                    title="First Name"
                    type="text"
                    name="first_name"
                    sx={{ width: '100%' }}
                    value={values.first_name}
                    onChange={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    error={Boolean(touched.first_name && errors.first_name)}
                    helperText={touched.first_name && errors.first_name}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    aria-label="last name"
                    label="Last Name"
                    title="Last Name"
                    type="text"
                    name="last_name"
                    sx={{ width: '100%' }}
                    value={values.last_name}
                    onChange={handleChange('last_name')}
                    onBlur={handleBlur('last_name')}
                    error={Boolean(touched.last_name && errors.last_name)}
                    helperText={touched.last_name && errors.last_name}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <TextField
                    aria-label="email"
                    label="Email"
                    title="Email"
                    type="text"
                    name="email"
                    sx={{ width: '100%' }}
                    value={values.email}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <FormControl fullWidth>
                    <InputLabel
                      id="fav-location-label"
                      classes={{
                        root:
                          !selectShrink && favLocation == ''
                            ? 'select-custom-css'
                            : '',
                      }}
                      shrink={selectShrink || favLocation !== ''}
                      style={{ textAlign: 'left' }}
                    >
                      Favorite Location
                    </InputLabel>
                    <Select
                      labelId="fav-location-label"
                      id="fav-location"
                      name="favLocation"
                      value={favLocation && favLocation}
                      label="Favorite Location"
                      onChange={handleChangeLocation}
                      onClose={() => {
                        setSelectShrink(false);
                      }}
                      onOpen={() => {
                        setSelectShrink(true);
                      }}
                      className="register-confirmation-select"
                    >
                      {locations &&
                        locations.map((location: any, index: number) => (
                          <MenuItem key={index++} value={location.location_id}>
                            {location.name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    aria-label="password"
                    label="Password"
                    title="Password"
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
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    aria-label="confirm password "
                    label="Confirm Password"
                    title="Confirm Password"
                    name="password_confirmation"
                    type="password"
                    sx={{ width: '100%' }}
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
                {/*<Grid item xs={12}>*/}
                {/*  <Typography*/}
                {/*    variant="body2"*/}
                {/*    className="body-text"*/}
                {/*    title="Password must be at least 8 characters."*/}
                {/*    sx={{ width: '100%' }}*/}
                {/*  >*/}
                {/*    <Checkbox onChange={handleChangeCheckbox} /> I agree to the{' '}*/}
                {/*    <Link*/}
                {/*      href="https://www.rubios.com/terms-and-conditions?app=1"*/}
                {/*      underline="hover"*/}
                {/*    >*/}
                {/*      Rubio's terms and conditions{' '}*/}
                {/*    </Link>*/}
                {/*    and to receiving marketing communications from Rubio's.*/}
                {/*  </Typography>*/}
                {/*</Grid>*/}
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Button
                    aria-label="Sign Up"
                    variant="contained"
                    title="Sign Up"
                    type="submit"
                    disabled={loadingProvider || loadingAuth}
                    name="submit"
                  >
                    SIGN UP
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegisterConfirmation;
