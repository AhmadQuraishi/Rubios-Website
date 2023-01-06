import React from 'react';
import {
  Grid,
  // SelectChangeEvent,
  Checkbox,
  // FormControl,
  Typography,
  TextField,
  Button,
  // InputLabel,
  // MenuItem,
  Link,
  // Skeleton,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { userRegister } from '../../redux/actions/user';
import { getlocations } from '../../redux/actions/location';
import { useEffect, useState, forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import ReactDateInputs from 'react-date-inputs';
import moment from 'moment';
import './register-form.css';
import { useLocation } from 'react-router-dom';
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
  const basketObj = useSelector((state: any) => state.basketReducer);

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
  console.log('locations', locations);
  const [favLocation, setFavLocation] = useState<any>(null);
  // const [actionClicked, setActionClicked] = useState(false);
  // const [removedActionClicked, setRemovedActionClicked] = useState(false);
  const [favLocationError, setFavLocationError] = useState(false);
  const [birthDay, setBirthDay] = useState<Date | undefined>();
  const [termsAndConditions, setTermsAndconditions] = useState(false);
  const [termsAndConditionsError, setTermsAndConditionsError] = useState(false);
  useEffect(() => {
    dispatch(getlocations());
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

  // const handleChangeLocation = (event: SelectChangeEvent) => {
  //   console.log('event', event);
  //   setFavLocation(event.target.value as string);
  // };
  // const handleChangeMultiple = (
  //   event: React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   const { options } = event.target;
  //   const value: string[] = [];
  //   for (let i = 0, l = options.length; i < l; i += 1) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //       return setPersonName(value);
  //     }
  //   }
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
      fontFamily: "'libre_franklin' !important"
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
      fontFamily: "'libre_franklin' !important",
    }),
    placeholder: (base: any, state: any) => ({
      ...base,
      color: state.isFocused ? '#062C43' : 'rgba(0,0,0,0.6)',
      padding: state.isFocused
        ? '0px 0px 35px 6px !important'
        : '0px 30px 0px 0px !important',
      fontSize: state.isFocused ? '8px' : '1rem',
      fontWeight: 'normal',
      transition: ' 0.1s ease',
      letterSpacing: '0.25008px',
      fontFamily: state.isFocused
        ? "'sunbornsans_one' !important"
        : "'sunbornsans_one' !important",
      transform: state.selectProps.isFocused,
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

  return (
    <>
      {/* {!locations ? (
        <>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="40px"
            style={{ marginTop: '10px' }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height="40px"
            style={{ marginTop: '10px' }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height="40px"
            style={{ marginTop: '10px' }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height="40px"
            style={{ marginTop: '10px' }}
          />
          <Skeleton
            variant="rectangular"
            width="70%"
            height="40px"
            style={{ marginTop: '10px', marginLeft: '15%' }}
          />
        </>
      ) : ( */}
      <Formik
        initialValues={{
          first_name: findGetParameter('fname')
            ? findGetParameter('fname')
            : '',
          last_name: findGetParameter('lname') ? findGetParameter('lname') : '',
          email: findGetParameter('email') ? findGetParameter('email') : '',
          phone: '',
          password: '',
          password_confirmation: '',
          invitecode: invite_code && invite_code !== '' ? invite_code : '',
          favLocation: '',
          birthday: '',
          termsAndConditions: false,
        }}
        validationSchema={Yup.object({
          first_name: Yup.string()
            .max(30, 'Must be 30 characters or less')
            //   // .min(3, 'Must be at least 3 characters')
            //   // .matches(/^[aA-zZ\s]+$/, 'Only letters are allowed for this field ')
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
          console.log('favLocation', favLocation);
          if (
            !favLocation ||
            !Object.keys(favLocation).length ||
            favLocation.value === ''
          ) {
            setFavLocationError(true);
            return;
          }
          setFavLocationError(false);

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
            phone: values.phone ? values.phone.replace(/\D/g, '') : '',
            invite_code: values.invitecode,
            fav_location_id: favLocation.value.toString(),
            terms_and_conditions: termsAndConditions,
          };

          if (birthDay) {
            obj.birthday = moment(birthDay).format('YYYY-MM-DD');
          }
          const basketId = basketObj?.basket?.id || '';
          dispatch(userRegister(obj, 'REGISTER_MAIN', basketId));
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
          <form onSubmit={handleSubmit} autoComplete="off">
            <Grid item xs={12} md={12} lg={12}>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    aria-label="first name"
                    label="First Name *"
                    title="First Name"
                    type="text"
                    name="first_name"
                    sx={{ width: '100%' }}
                    value={values.first_name}
                    autoComplete="off"
                    onChange={handleChange('first_name')}
                    onBlur={handleBlur('first_name')}
                    error={Boolean(touched.first_name && errors.first_name)}
                    helperText={touched.first_name && errors.first_name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    aria-label="last name"
                    label="Last Name *"
                    title="Last Name"
                    type="text"
                    name="last_name"
                    autoComplete="off"
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
                    label="Email *"
                    title="Email"
                    type="text"
                    name="email"
                    autoComplete="off"
                    sx={{ width: '100%' }}
                    value={values.email ? values.email : null}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className="mobile-field"
                    aria-label="mobile phone "
                    label="Mobile Phone (Optional)"
                    title="Mobile Phone (Optional)"
                    value={values.phone}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    autoComplete="off"
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
                    label="Password *"
                    title="Password"
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
                    label="Confirm Password *"
                    title="Confirm Password"
                    name="password_confirmation"
                    autoComplete="off"
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
                    label="Invite Code (Optional)"
                    title="Invite Code (Optional)"
                    name="invitecode"
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
                    label="Birthday (Optional)"
                    onChange={(value) => handleBirthDayChange(value)}
                    value={birthDay}
                    show={['month', 'day', 'year']}
                  />
                </Grid>

                <Grid item xs={12}>
                  {/* { !locations&&  <div
                    style={{
                      position: 'absolute',
                      // marginTop: '300px',
                      // top: 720,
                      // right: 370,
                      background: 'rgba(255, 255, 255, 0)',
                      zIndex: 1000,
                      width: "418px",
                      paddingTop: "7px",
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <CircularProgress />
                  </div>} */}
                  <Select
                    placeholder={
                      favLocationError ? (
                        <div style={{ color: 'red' }}>Favorite Location *</div>
                      ) : (
                        <div>Favorite Location *</div>
                      )
                    }
                    noOptionsMessage={() => {
                      if (!locations || !locations.length) {
                        return <CircularProgress size={30} />;
                      } else {
                        return 'No Result Found';
                      }
                    }}
                    isSearchable={true}
                    styles={customStyles}
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
                  {favLocationError && (
                    <p className="fav-error-message">
                      Favorite Location is required
                    </p>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    className="body-text"
                    id="chkTermandCondition"
                    title="I agree to the  Rubios terms and conditions and to receiving marketing communications from Rubios."
                    sx={{ width: '100%' }}
                  >
                    <Checkbox
                      onChange={handleChangeCheckbox}
                      checked={termsAndConditions}
                      id="termsAndConditions"
                      name="termsAndConditions"
                      inputProps={{
                        'aria-labelledby': 'chkTermandCondition',
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
                    <p className="fav-error-message">
                      Terms and conditions are required
                    </p>
                  )}
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
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
      {/* )} */}
    </>
  );
};

export default RegisterForm;
