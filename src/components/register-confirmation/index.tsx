import { Grid, TextField, Button, CircularProgress } from '@mui/material';
import { Link, Checkbox, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { getlocations } from '../../redux/actions/location';
import { userRegister } from '../../redux/actions/user';
import './register-confirmation.css';
import ReactDateInputs from 'react-date-inputs';
import moment from 'moment';
import Select from 'react-select';

const RegisterConfirmation = ({ id }: any) => {
  const dispatch = useDispatch();
  const [favLocation, setFavLocation] = useState<any>(null);
  const [favLocationError, setFavLocationError] = useState(false);
  // const [selectShrink, setSelectShrink] = useState(false);
  const [birthDay, setBirthDay] = useState<Date | undefined>();
  const [termsAndConditions, setTermsAndconditions] = useState(false);
  const [termsAndConditionsError, setTermsAndConditionsError] = useState(false);
  const { locations } = useSelector((state: any) => state.locationReducer);

  const { guestUser } = useSelector((state: any) => state.guestReducer);

  const { loading: loadingProvider } = useSelector(
    (state: any) => state.providerReducer,
  );
  const { loading: loadingAuth } = useSelector(
    (state: any) => state.authReducer,
  );
  useEffect(() => {
    dispatch(getlocations());
  }, []);
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? 'black' : 'black',
      backgroundColor: state.isSelected ? 'lightgray' : '',
      border: '0px',
      width: 'inherit',
      fontFamily: "'Librefranklin-Light' !important",
    }),
    menu: (base: any, state: any) => ({
      ...base,
      marginTop: '0px',
      zIndex: '5555',
      width: '99%',
    }),

    indicatorSeparator: (base: any) => ({
      ...base,
      width: '0px',
    }),

    placeholder: (base: any, state: any) => ({
      ...base,
      color: state.isFocused ? '#062C43' : 'rgba(0,0,0,0.6)',
      padding: state.isFocused
        ? '0px 0px 35px 6px !important'
        : '0px 30px 0px 0px !important',
      fontSize: state.isFocused ? '8.5px' : '1rem',
      //fontWeight: state.isFocused ? '800' : '400',
      transition: ' 0.1s ease',
      fontFamily: state.isFocused
        ? "'Sunborn-Sansone' !important"
        : "'Sunborn-Sansone' !important",
      transform: state.selectProps.isFocused,
    }),
    dropdownIndicator: (base: any, state: any) => ({
      ...base,
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      // none of react-select's styles are passed to <Control />
      //
      height: '53px',
      paddingLeft: '5px !important',
      width: 'inherit',
      borderRadius: 'none',
      margin: '0px 5px 10px 0px',
      border: 'none',
      cursor: 'pointer',
      cursorColor: 'black',
      boxShadow: 'none',
      fontFamily: "'Librefranklin-Light' !important",
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    },
  };
  const formDefaultData = (key: string) => {
    if (guestUser) {
      return guestUser[`${key}`] ? guestUser[`${key}`] : '';
    }
    return '';
  };

  // const handleChangeLocation = (event: SelectChangeEvent) => {
  //   setFavLocation(event.target.value as string);
  // };

  const handleBirthDayChange = (value?: Date | undefined): undefined => {
    setBirthDay(value);
    return;
  };

  const handleChangeCheckbox = () => {
    setTermsAndConditionsError(false);
    setTermsAndconditions(!termsAndConditions);
  };

  // @ts-ignore
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
      const elem = document.getElementById('react-select-5-input');
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

  return (
    <>
      <Formik
        initialValues={{
          first_name: formDefaultData('firstname'),
          last_name: formDefaultData('lastname'),
          email: formDefaultData('emailaddress'),
          password: '',
          password_confirmation: '',
          favLocation: '',
          birthday: '',
          termsAndConditions: false,
        }}
        validationSchema={Yup.object({
          first_name: Yup.string()
            .trim()
            .max(30, 'Must be 30 characters or less')
            // .min(3, 'Must be at least 3 characters')
            // .matches(/^[aA-zZ\s]+$/, 'Only letters are allowed for this field ')
            .required('First Name is required'),
          last_name: Yup.string()
            .trim()
            .max(30, 'Must be 30 characters or less')
            // .min(3, 'Must be at least 3 characters')
            // .matches(/^[aA-zZ\s]+$/, 'Only letters are allowed for this field ')
            .required('Last Name is required'),
          email: Yup.string()
            .trim()
            .matches(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Invalid Email ',
            )
            .email('Invalid email address')
            .required('Email is required'),
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
          if (
            !favLocation ||
            !Object.keys(favLocation).length ||
            favLocation.value === ''
          ) {
            setFavLocationError(true);
            return;
          } else {
            setFavLocationError(false);
          }
          if (termsAndConditions == false) {
            setTermsAndConditionsError(true);
            return;
          } else {
            setTermsAndConditionsError(false);
          }

          const obj: any = {
            first_name: values.first_name,
            last_name: values.last_name,
            password: values.password,
            password_confirmation: values.password_confirmation,
            email: values.email,
            fav_location_id: favLocation.value.toString(),
            terms_and_conditions: termsAndConditions,
          };

          console.log('obj', obj);

          if (birthDay) {
            obj.birthday = moment(birthDay).format('YYYY-MM-DD');
          }
          //
          dispatch(userRegister(obj, 'REGISTER_CONFIRMATION', ''));
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
                    name="first name"
                    sx={{ width: '100%' }}
                    value={values.first_name}
                    onChange={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    autoComplete="given-name"
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
                    name="last name"
                    autoComplete="family-name"
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
                    autoComplete="email"
                    sx={{ width: '100%' }}
                    value={values.email ? values.email : null}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} className="date-field">
                  {/* <Typography
                    variant="body2"
                    className="body-text"
                    title="Birthday (Optional)"
                    sx={{ width: '100%' }}
                  >
                    Birthday (Optional)
                  </Typography> */}
                  <ReactDateInputs
                    className="body-text"
                    // label="Birthday (Optional)"
                    onChange={(value) => handleBirthDayChange(value)}
                    value={birthDay}
                    show={['month', 'day', 'year']}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} lg={12}>
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
                      name="favorite location"
                      value={favLocation && favLocation}
                      label="Favorite Location"
                      autoComplete="favorite location"
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
                </Grid> */}
                <Grid item xs={12}>
                  <div>
                    <div>
                      <div>
                        <Select
                          placeholder={
                            favLocationError ? (
                              <div style={{ color: 'red' }}>
                                Favorite Location *
                              </div>
                            ) : (
                              <div>Favorite Location *</div>
                            )
                          }
                          isSearchable={true}
                          noOptionsMessage={() => {
                            if (!locations || !locations.length) {
                              return <CircularProgress size={30} />;
                            } else {
                              return 'No Result Found';
                            }
                          }}
                          styles={customStyles}
                          classNamePrefix="select"
                          options={locations?.map((loc: any) => {
                            return { value: loc.location_id, label: loc.name };
                          })}
                          onChange={(selectedOption: any) => {
                            setFavLocationError(false);
                            setFavLocation(selectedOption);
                          }}
                          value={favLocation && favLocation}
                          maxMenuHeight={150}
                        />
                      </div>
                    </div>
                  </div>
                  {favLocationError && (
                    <p className="fav-conf-error-message">
                      Favorite Location is required
                    </p>
                  )}
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
                    autoComplete="new-password"
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                  <TextField
                    aria-label="confirm password"
                    autoComplete="password"
                    label="Confirm Password"
                    title="Confirm Password"
                    name="confirm password"
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
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  sx={{
                    backgroundColor: 'transparent',
                    fontFamily: "'Librefranklin-Light' !important",
                  }}
                  className="check-with-text"
                >
                  <Typography
                    variant="body2"
                    id="chkTermandCondition"
                    title="I agree to the  Rubios terms and conditions and to receiving marketing communications from Rubios."
                    sx={{
                      width: '100%',
                      fill: 'white',
                      color: 'white',
                      fontFamily: "'Librefranklin-Light' !important",
                    }}
                  >
                    <Checkbox
                      onChange={handleChangeCheckbox}
                      checked={termsAndConditions}
                      id="termsAndConditions"
                      name="termsAndConditions"
                      inputProps={{
                        'aria-labelledby': 'chkTermandCondition',
                      }}
                      color="default"
                      sx={{
                        float: 'left',
                        color: 'white',
                        padding: '0px 10px 0px 0px !important',
                        marginBottom: { xs: '50px !important' },
                      }}
                    />{' '}
                    I agree to the{' '}
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
                      Rubio's terms and conditions{' '}
                    </Link>
                    and to receiving marketing communications from Rubio's.
                  </Typography>
                  {termsAndConditionsError && (
                    <p className="fav-conf-error-message">
                      Terms and conditions are required
                    </p>
                  )}
                </Grid>
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
