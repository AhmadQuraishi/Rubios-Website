import React from 'react';
import {
  Grid,
  SelectChangeEvent,
  Checkbox,
  FormControl,
  Typography,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Link,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userRegister } from '../../../redux/actions/user';
import { getlocations } from '../../../redux/actions/location';
import { useEffect, useState, forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import ReactDateInputs from 'react-date-inputs';
import moment from 'moment';
import './register-form.css';
import { useLocation } from 'react-router-dom';
import { displayToast } from '../../../helpers/toast';
import { addAuthTokenIframeRedirect } from '../../../redux/actions/auth';
import Select from 'react-select';
const RegisterForm = () => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(useLocation().search);
  const invite_code = query.get('invite_code');
  const { loading: loadingProvider } = useSelector(
    (state: any) => state.providerReducer,
  );
  const { loading: loadingAuth } = useSelector(
    (state: any) => state.authReducer,
  );
  function findGetParameter(parameterName: any) {
    var result = null,
      tmp = [];
    window.location.search
      .substr(1)
      .split('&')
      .forEach(function (item) {
        tmp = item.split('=');
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
      });
    return result;
  }
  const { locations } = useSelector((state: any) => state.locationReducer);
  const { error } = useSelector((state: any) => state.providerReducer);

  const [favLocation, setFavLocation] = useState<any>(null);
  const [favLocationError, setFavLocationError] = useState(false);
  const [birthDay, setBirthDay] = useState<Date | undefined>();
  const [termsAndConditions, setTermsAndconditions] = useState(false);
  const [termsAndConditionsError, setTermsAndConditionsError] = useState(false);
  const [selectShrink, setSelectShrink] = useState(false);
  const [showError, setShowError] = useState(false);
  const [signUpErrors, setSignUpErrors] = useState<any>([]);

  useEffect(() => {
    dispatch(getlocations());
  }, []);

  useEffect(() => {
    if (error && Object.keys(error).length) {
      console.log(error);
      setSignUpErrors(errorMapping(error));
    }
  }, [error]);

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

  interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }
  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? 'black' : 'black',
      backgroundColor: state.isSelected ? 'lightgray' : '',
      marginTop: '0px',
      border: '0px',
      fontFamily: 'Poppins-Regular, sans-serif !important',
    }),
    menu: (base: any) => ({
      ...base,
      marginTop: 0,
    }),
    indicatorSeparator: (base: any) => ({
      ...base,
      width: '0px',
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
      height: '55px',
      paddingLeft: '5px',
      borderRadius: 'none',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0px 0px 6px lightgray',
      fontFamily: 'Poppins-Regular, sans-serif !important',
    }),
    singleValue: (provided: any, state: any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    },
  };
  const NumberFormatCustom = forwardRef<HTMLElement, CustomProps>(
    function NumberFormatCustom(props, ref) {
      const { onChange, ...other } = props;

      return (
        <IMaskInput
          {...other}
          mask="(#00) 000-0000"
          definitions={{
            '#': /[1-9]/,
          }}
          onAccept={(value: any) =>
            onChange({ target: { name: props.name, value } })
          }
          overwrite
        />
      );
    },
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

  const errorMapping = (error: any) => {
    let generalError = true;
    const errorsArray: any = [];
    if (error?.data?.errors?.base && error.data.errors.base.length) {
      error?.data?.errors.base.forEach((msg: string) => {
        generalError = false;
        errorsArray.push(msg);
      });
    } else {
      if (
        error?.data?.errors?.device_already_shared &&
        error?.data?.errors?.device_already_shared.length
      ) {
        if (
          error?.data?.errors?.device_already_shared[0] ===
          'with maximum number of guests allowed.'
        ) {
          generalError = false;
          errorsArray.push(
            'Device already shared with maximum number of guests allowed.',
          );
        }
      }
    }
    if (error?.data?.errors?.email) {
      generalError = false;
      errorsArray.push(`Email ${error?.data?.errors?.email[0]}`);
    }
    if (error?.data?.errors?.phone) {
      generalError = false;
      errorsArray.push(`Phone ${error?.data?.errors?.phone[0]}`);
    }
    if (generalError) {
      errorsArray.push(`ERROR! Please Try again later`);
    }
    return errorsArray;
  };

  // window.parent.addEventListener(
  //   'click',
  //   function () {
  //     console.log('workinggggggg')
  //   },
  //   false,
  // );

  return (
    <Grid container className="w-register">
      {/*<Grid item xs={6}>*/}
      {/*  <Typography variant="h6">*/}
      {/*    Earn Rewards*/}
      {/*  </Typography>*/}
      {/*  <Typography variant="h1">*/}
      {/*    Join Rubio’s Rewards <br/>*/}
      {/*    for more deals*/}
      {/*  </Typography>*/}
      {/*  <img*/}
      {/*    className="phone-icon"*/}
      {/*    alt="Join Today For Getting Rewards"*/}
      {/*    src={require('../../../assets/imgs/w-phone-icon.png')}*/}
      {/*  />*/}
      {/*</Grid>*/}
      <Grid item xs={12} className="form-register">
        <Formik
          initialValues={{
            first_name: findGetParameter('fname')
              ? findGetParameter('fname')
              : '',
            last_name: findGetParameter('lname')
              ? findGetParameter('lname')
              : '',
            email: findGetParameter('email') ? findGetParameter('email') : '',
            phone: '',
            password: '',
            password_confirmation: '',
            invitecode: invite_code && invite_code !== '' ? invite_code : '',
            favLocation: '',
            birthday: '',
            termsAndConditions: false
          }}
          validationSchema={Yup.object({
            first_name: Yup.string()
              .max(30, 'Must be 30 characters or less')
              // .min(3, 'Must be at least 3 characters')
              // .matches(/^[aA-zZ\s]+$/, 'Only letters are allowed for this field ')
              .required('First Name is required'),
            last_name: Yup.string()
              .max(30, 'Must be 30 characters or less')
              // .min(3, 'Must be at least 3 characters')
              // .matches(/^[aA-zZ\s]+$/, 'Only letters are allowed for this field ')
              .required('Last Name is required'),
            email: Yup.string()
              .matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Invalid Email ',
              )
              .email('Invalid email address')
              .required('Email is required'),
            phone: Yup.string().min(14, 'Enter valid number'),
            password: Yup.string()
              .min(8, 'Must be at least 8 characters')
              .max(16, 'Must be at most 16 characters')
              .required('required'),
            password_confirmation: Yup.string()
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
            }
            setFavLocationError(false);

            if (termsAndConditions == false ){
              setTermsAndConditionsError(true);
              return;
            }else{
              setTermsAndConditionsError(false);
            }
  
            const obj: any = {
              first_name: values.first_name,
              last_name: values.last_name,
              password: values.password,
              password_confirmation: values.password_confirmation,
              email: values.email,
              phone: values.phone ? values.phone.replace(/\D/g, '') : '',
              invite_code: values.invitecode,
              fav_location_id: favLocation.value,
              terms_and_conditions: termsAndConditions,
            };

            if (birthDay) {
              obj.birthday = moment(birthDay).format('YYYY-MM-DD');
            }
            setShowError(true);
            dispatch(userRegister(obj));
            dispatch(addAuthTokenIframeRedirect());
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
            <form onSubmit={handleSubmit} autoComplete="on">
              <Grid item xs={12} md={12} lg={12}>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      aria-label="first name"
                      placeholder="First Name *"
                      title="First Name"
                      type="text"
                      name="first_name"
                      className="text-fields-background"
                      sx={{ width: '100%' }}
                      value={values.first_name}
                      autoComplete="on"
                      onChange={handleChange('first_name')}
                      onBlur={handleBlur('first_name')}
                      error={Boolean(touched.first_name && errors.first_name)}
                      helperText={touched.first_name && errors.first_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      aria-label="last name"
                      placeholder="Last Name *"
                      title="Last Name"
                      type="text"
                      name="last_name"
                      className="text-fields-background"
                      autoComplete="on"
                      sx={{ width: '100%' }}
                      value={values.last_name}
                      onChange={handleChange('last_name')}
                      onBlur={handleBlur('last_name')}
                      error={Boolean(touched.last_name && errors.last_name)}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      aria-label="email"
                      placeholder="Email *"
                      title="Email"
                      type="text"
                      name="email"
                      className="text-fields-background"
                      autoComplete="on"
                      sx={{ width: '100%' }}
                      value={values.email}
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      aria-label="mobile phone "
                      placeholder="Mobile Phone (Optional)"
                      title="Mobile Phone (Optional)"
                      value={values.phone}
                      sx={{ width: '100%' }}
                      onChange={handleChange}
                      className="mobile-field text-fields-background"
                      autoComplete="on"
                      name="phone"
                      id="formatted-numberformat-input"
                      InputLabelProps={{
                        shrink: touched && values.phone == '' ? false : true,
                        classes: {
                          root: values.phone !== '' ? 'mobile-field-label' : '',
                        },
                      }}
                      InputProps={{
                        inputComponent: NumberFormatCustom as any,
                      }}
                      error={Boolean(touched && errors.phone)}
                      helperText={errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      aria-label="password"
                      placeholder="Password *"
                      title="Password"
                      type="password"
                      name="password"
                      className="text-fields-background"
                      autoComplete="on"
                      sx={{ width: '100%' }}
                      value={values.password}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    {/*<Typography*/}
                    {/*  variant="body2"*/}
                    {/*  className="body-text"*/}
                    {/*  title="Password must be at least 8 characters."*/}
                    {/*  sx={{ width: '100%' }}*/}
                    {/*>*/}
                    {/*  Password must be at least 8 characters.*/}
                    {/*</Typography>*/}
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      aria-label="confirm password "
                      placeholder="Confirm Password *"
                      title="Confirm Password"
                      name="password_confirmation"
                      className="text-fields-background"
                      autoComplete="on"
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
                  <Grid item xs={12}>
                    <TextField
                      aria-label="invite code"
                      placeholder="Invite Code (Optional)"
                      title="Invite Code (Optional)"
                      name="invitecode"
                      className="text-fields-background"
                      autoComplete="on"
                      type="text"
                      sx={{ width: '100%' }}
                      value={values.invitecode}
                      onChange={handleChange('invitecode')}
                      onBlur={handleBlur('invitecode')}
                      error={Boolean(touched.invitecode && errors.invitecode)}
                      helperText={touched.invitecode && errors.invitecode}
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

                  <Grid item xs={12}>
                    <div>
                      <div>
                        <div>
                          <Select
                            placeholder={favLocationError ? <div style={{color: "red"}}>Favorite Location *</div> : <div>Favorite Location *</div>}
                            className="select-options"
                            isSearchable={true}
                            styles={customStyles}
                            noOptionsMessage={() => {
                              if(!locations || !locations.length){
return <CircularProgress size={30}/>
                              } else {
                                return 'No Result Found'
                              }

                            }}
                            options={locations?.map((loc: any) => {
                              return {
                                value: loc.location_id,
                                label: loc.name,
                              };
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
                      <p className="fav-iframes-error-message">
                        Favorite Location is required
                      </p>
                    )}
                  </Grid>
                  {/* <Grid item xs={12}>
                    <FormControl className="text-fields-background" fullWidth>
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
                        aria-controls="fav-location"
                        aria-haspopup="false"
                      >
                        Favorite Location *
                      </InputLabel>
                      <Select
                        labelId="fav-location-label"
                        id="fav-location"
                        name="favLocation"
                        value={favLocation && favLocation}
                        placeholder="Favorite Location"
                        onChange={handleChangeLocation}
                        onClose={() => {
                          setSelectShrink(false);
                        }}
                        onOpen={() => {
                          setSelectShrink(true);
                        }}
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              position: 'relative',
                              left: {
                                xs: '0px !Important',
                                sm: '-5px !important',
                              },
                              marginLeft: 'auto',
                              marginRight: 'auto',
                              maxHeight: 150,
                              width: 270,
                            },
                          },
                        }}
                      >
                        {locations &&
                          locations.map((location: any, index: number) => (
                            <MenuItem
                              key={index++}
                              value={location.location_id}
                              style={{
                                whiteSpace: 'normal',
                                wordBreak: 'break-all',
                              }}
                            >
                              {location.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </Grid> */}
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      className="body-text"
                      title="I agree to the  Rubios terms and conditions and to receiving marketing communications from Rubios."
                      sx={{ width: '100%' }}
                    >
                      <Checkbox
                       onChange={handleChangeCheckbox}
                       checked={termsAndConditions}
                       id="termsAndConditions"
                       name="termsAndConditions"
                        inputProps={{
                          'aria-label':
                            ' I agree to the  Rubios terms and conditions and to receiving marketing communications from Rubios ',
                        }}
                      />{' '}
                      I agree to the{' '}
                      <Link
                    target="popup"
                      onClick={() =>
                        window.open(process.env.REACT_APP_TERMS_LINK,'name','width=1000,height=1000')
                      }
                      
                      underline="hover"
                      sx={{ color: '#1a86ff', cursor: 'pointer' }}
                    >
                        Rubio's terms and conditions{' '}
                      </Link>
                      and to receiving marketing communications from Rubio's.
                    </Typography>
                    {termsAndConditionsError && (
                    <p className="fav-iframes-error-message">
                      Terms and conditions are required
                    </p>
                  )}
                  </Grid>
                  <Grid style={{ paddingTop: 10 }}>
                    {showError && signUpErrors && signUpErrors.length > 0
                      ? signUpErrors.map((err: string) => {
                          return <p style={{ color: '#E61F00' }}>- {err}</p>;
                        })
                      : null}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Grid item xs={12} sm={8} md={8} lg={8}>
                      <Button
                        type="submit"
                        disabled={loadingProvider || loadingAuth}
                        aria-label="submit form to sign upm for rubios rewards"
                        name="submit"
                        title="submit"
                        variant="contained"
                        sx={{ width: '100%' }}
                      >
                        SIGN UP
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
  );
};

export default RegisterForm;
