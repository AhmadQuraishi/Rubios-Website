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
  Skeleton,
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

const Countries = [
  { label: 'Albania', value: 355 },
  { label: 'Argentina', value: 54 },
  { label: 'Austria', value: 43 },
  { label: 'Venezuela', value: 58 },
];
// import { Grid, Skeleton } from '@mui/material';
const names = [
  'Oliver Hansen Oliver Hansen Oliver Hansen Oliver ',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

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
  console.log('locations', locations);
  const [favLocation, setFavLocation] = useState(null);
  const [favLocationError, setFavLocationError] = useState(false);
  const [birthDay, setBirthDay] = useState<Date | undefined>();
  const [termsAndConditions, setTermsAndconditions] = useState(false);
  const [selectShrink, setSelectShrink] = useState(false);
  const [personName, setPersonName] = React.useState<string[]>([names[0]]);
  useEffect(() => {
    dispatch(getlocations());
  }, []);

  useEffect(() => {
    if (locations) {
      const elem = document.getElementById('fav-location');
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
    setTermsAndconditions(!termsAndConditions);
  };

  interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }
  const customStyles = {
    option: (provided : any, state : any) => ({
      ...provided,
      color: state.isSelected ? 'black' : 'black',
      backgroundColor: state.isSelected ? 'lightgray' : '',
      marginTop: '0px',
      border : '0px',
      fontFamily: "Poppins-Regular, sans-serif !important",
    }),
    menu: (base : any ) => ({
      ...base,
      marginTop: 0,

    }),
    indicatorSeparator:  (base : any ) => ({
      ...base,
      width: "0px"
    }),
    dropdownIndicator: (base : any, state : any) => ({
      ...base,
      transition: 'all .2s ease',
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
    }),
    control: (provided : any, state : any) => ({
      ...provided,
      // none of react-select's styles are passed to <Control />
      //
      height: "55px",
      paddingLeft: "5px",
      borderRadius: "none",
      border: "none",
      boxShadow: "0px 0px 6px lightgray",
      fontFamily: "Poppins-Regular, sans-serif !important",

    }),
    singleValue: (provided : any, state : any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    }
  }
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
      {!locations ? (
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
      ) : (
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
            // termsAndConditions: false
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
            console.log('favLocation', favLocation)
            if (!favLocation) {
              setFavLocationError(true);
              return;
            }
            setFavLocationError(false)
            const obj: any = {
              first_name: values.first_name,
              last_name: values.last_name,
              password: values.password,
              password_confirmation: values.password_confirmation,
              email: values.email,
              phone: values.phone ? values.phone.replace(/\D/g, '') : '',
              invite_code: values.invitecode,
              fav_location_id: favLocation,
              terms_and_conditions: termsAndConditions,
            };

            if (birthDay) {
              obj.birthday = moment(birthDay).format('YYYY-MM-DD');
            }

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
                      value={values.email}
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

                  {/* <Grid item xs={12}>
                    <div>
                     <Typography
                      variant="body2"
                      className="body-text"
                      title="Favourite Location"
                      sx={{ width: '100%', marginBottom: '3px',}}
                    >
                      Favourite Location *
                    </Typography>
                      <FormControl sx={{margin: "0px", maxWidth: 'auto' }}>
                        <InputLabel classes={{
                          root:
                            !selectShrink && favLocation == ''
                              ? 'select-custom-css'
                              : '',
                        }}
                        // shrink={selectShrink || favLocation !== ''}
                        shrink
                        style={{ textAlign: 'left' }} aria-controls="fav-location"
                        // aria-haspopup="false"
                        // id="fav-location-label"
                        // htmlFor="select-multiple-native"
                        >
                        Favorite Location *
                        </InputLabel>
                        <Select
                          multiple
                          native
                          value={personName}
                          // @ts-ignore Typings are not considering `native`
                          onChange={handleChangeMultiple}
                          label="Favorite Location *"
                          inputProps={{
                            id: 'select-multiple-native',
                          }}
                        >
                          {names.map((name) => (
                            <option
                            key={name} value={name}  style={{

                              whiteSpace: 'normal',
                              wordBreak: 'break-all',
                              padding: '8px 0px',
                              font: '16px Roboto,Helvika,Arial, Sans Serif',
                            }} >
                              {name}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </Grid> */}
                  {/* <Grid item xs={12}>
                  <div>
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
                        label="Favorite Location"
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
                              // left: {
                              //   xs: '0px !Important',
                              //   sm: '-5px !important',
                              // },
                              width: {
                                xs: 200,
                              },
                              maxHeight: 150,
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
                    </div>
                  </Grid>  */}
                  <Grid item xs={12}>
                    <div>
                      <div>
                        <div>
                          <Select
                          placeholder="Favorite Location *"
                          className="select-options"
                          isSearchable={true}
                          styles={customStyles}
                          options={locations?.map((loc: any) => {
                              return { value: loc.name, label: loc.name };
                            })}
                            onChange={(selectedOption: any) => {
                              console.log('selectedOption', selectedOption);
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
                        inputProps={{
                          'aria-labelledby': 'chkTermandCondition',
                        }}
                      />{' '}
                      I agree to the{' '}
                      <Link
                        href={process.env.REACT_APP_TERMS_LINK}
                        underline="hover"
                      >
                        Rubio's terms and conditions{' '}
                      </Link>
                      and to receiving marketing communications from Rubio's.
                    </Typography>
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
      )}
    </>
  );
};

export default RegisterForm;
