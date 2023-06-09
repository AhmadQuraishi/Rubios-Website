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
  Select,
  Link,
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

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { loading: loadingProvider } = useSelector(
    (state: any) => state.providerReducer,
  );
  const { loading: loadingAuth } = useSelector(
    (state: any) => state.authReducer,
  );
  const { locations } = useSelector((state: any) => state.locationReducer);

  const [favLocation, setFavLocation] = useState('');
  const [birthDay, setBirthDay] = useState<Date | undefined>();
  const [termsAndConditions, setTermsAndconditions] = useState(false);

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

  interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
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

  return (
    <Grid container className="sign-up-section">
      <Typography variant="caption" className="label" title="Create Account">
        Create Account
      </Typography>
      <Typography variant="h4">
        SIGN UP FOR <br /> RUBIO'S REWARDS
      </Typography>
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          password: '',
          password_confirmation: '',
          invitecode: '',
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
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
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
          <form onSubmit={handleSubmit}>
            <Grid item xs={12} md={12} lg={12}>
              <Grid container>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <TextField
                    className="mobile-field"
                    aria-label="mobile phone "
                    label="Mobile Phone (Optional)"
                    title="Mobile Phone (Optional)"
                    value={values.phone}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                    name="phone"
                    id="formatted-numberformat-input"
                    InputLabelProps={
                      {
                        shrink: touched && values.phone == '' ? false : true,
                        classes: {
                          root: values.phone !== '' ? 'mobile-field-label' : '',
                        }
                      }
                    }
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
                  <Typography
                    variant="body2"
                    className="body-text"
                    title="Birthday (Optional)"
                    sx={{ width: '100%' }}
                  >
                    Birthday (Optional)
                  </Typography>
                  <ReactDateInputs
                    onChange={(value) => handleBirthDayChange(value)}
                    value={birthDay}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="fav-location-label">
                      Favorite Location
                    </InputLabel>
                    <Select
                      labelId="fav-location-label"
                      id="fav-location"
                      name="favLocation"
                      value={favLocation && favLocation}
                      label="Favorite Location"
                      onChange={handleChangeLocation}
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
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    className="body-text"
                    title="Password must be at least 8 characters."
                    sx={{ width: '100%' }}
                  >
                    <Checkbox onChange={handleChangeCheckbox} /> I agree to the{' '}
                    <Link
                      href="https://www.rubios.com/terms-and-conditions?app=1"
                      underline="hover"
                    >
                      Rubio's terms and conditions{' '}
                    </Link>
                    and to receiving marketing communications from Rubio's.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8} md={8} lg={8}>
                  <Button
                    type="submit"
                    disabled={loadingProvider || loadingAuth}
                    aria-label="submit"
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
          </form>
        )}
      </Formik>
    </Grid>
  );
};

export default RegisterForm;
