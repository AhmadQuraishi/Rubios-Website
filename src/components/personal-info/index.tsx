import {
  Switch,
  Grid,
  Typography,
  CardContent,
  TextField,
  Button,
  Card,
  Theme,
} from '@mui/material';
import './index.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserprofile, updateUser } from '../../redux/actions/user';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getlocations } from '../../redux/actions/location';
import LoadingBar from '../../components/loading-bar';
import { IMaskInput } from 'react-imask';
import { forwardRef } from 'react';
import moment from 'moment';
import { displayToast } from '../../helpers/toast';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 0px 20px 0px',
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

const PersonalInfo = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userProfile, loading, error, profile } = useSelector(
    (state: any) => state.userReducer,
  );
  const [favlocation, setFavLoc] = useState('');
  const [isupdate, setIsUpdate] = useState(false);
  const { locations, loading: loadingLocations } = useSelector(
    (state: any) => state.locationReducer,
  );
  const [state, setState] = useState({
    emailnotification: true,
    pushnotification: true,
  });
  useEffect(() => {
    dispatch(getUserprofile());
    dispatch(getlocations());
  }, []);

  useEffect(() => {}, [error]);
  useEffect(() => {}, [userProfile]);

  useEffect(() => {
    if (userProfile && !loading) {
      setFavLoc(userProfile.favourite_locations);
      setState({
        emailnotification: userProfile.marketing_email_subscription,
        pushnotification: userProfile.marketing_pn_subscription,
      });
    }
  }, [userProfile, loading]);

  const handleChangeLocation = (event: SelectChangeEvent) => {
    setFavLoc(event.target.value as string);
  };

  const handleChangeNotification = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  useEffect(() => {
    if (isupdate == true) {
      dispatch(getUserprofile());
      setIsUpdate(false);
    }
  }, [profile]);

  return (
    <div className={classes.root}>
      {(loading || !userProfile || loadingLocations) && <LoadingBar />}
      {userProfile && locations && locations.length > 0 && (
        <Grid container>
          <Formik
            initialValues={{
              email: userProfile.email,
              firstName: userProfile.first_name,
              lastName: userProfile.last_name,
              phone: userProfile.phone,
              favlocation: '',
              newpassword: '',
              confirmpassword: '',
              currentpassword: '',
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .required('Name is required'),
              lastName: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .required('Last name is required'),
              email: Yup.string()
                .matches(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  'Invalid Email ',
                )
                .email('Invalid email address')
                .required('Email is required'),

              phone: Yup.string().min(14, 'Enter valid number'),
              currentpassword: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .max(16, 'Must be at most 16 characters'),
              newpassword: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .max(16, 'Must be at most 16 characters'),
              confirmpassword: Yup.string()
                .min(8, 'Must be at least 8 characters')
                .max(16, 'Must be at most 16 characters')
                .oneOf([Yup.ref('newpassword'), null], 'Passwords must match'),
            })}
            onSubmit={async (values) => {
              if (values.confirmpassword === '' && values.newpassword === '') {
                if (values.currentpassword === '') {
                  const obj = {
                    email: values.email,
                    first_name: values.firstName,
                    last_name: values.lastName,
                    favourite_location_ids: favlocation,
                    marketing_email_subscription: state.emailnotification,
                    marketing_pn_subscription: state.pushnotification,
                    phone: values.phone
                      ? values.phone.replace(/\D/g, '')
                      : userProfile.phone,
                    // current_password: "qwerty",
                    // password: "p@ssw0rd",
                    // password_confirmation: "p@ssw0rd"
                  };
                  const data: any = await dispatch(updateUser(obj, true));
                  setIsUpdate(true);
                  // setTimeout(() => {
                  //   dispatch(getUserprofile());
                  // }, 600);
                } else {
                  const obj = {
                    email: values.email,
                    first_name: values.firstName,
                    last_name: values.lastName,
                    favourite_location_ids: favlocation,
                    marketing_email_subscription: state.emailnotification,
                    marketing_pn_subscription: state.pushnotification,
                    phone: values.phone
                      ? values.phone.replace(/\D/g, '')
                      : userProfile.phone,
                    current_password: values.currentpassword,
                    // password: "p@ssw0rd",
                    // password_confirmation: "p@ssw0rd"
                  };
                  const data: any = await dispatch(updateUser(obj, true));
                  setIsUpdate(true);
                  // setTimeout(() => {
                  //   dispatch(getUserprofile());
                  // }, 600);
                }
              } else {
                if (values.currentpassword === '') {
                  displayToast('ERROR', 'Current Password is required');
                } else if (values.newpassword === '') {
                  displayToast('ERROR', 'New Password is required');
                } else if (values.confirmpassword === '') {
                  displayToast('ERROR', 'Confirm Password is required');
                } else if (
                  values.confirmpassword !== '' &&
                  values.newpassword !== '' &&
                  values.currentpassword !== ''
                ) {
                  const obj = {
                    email: values.email,
                    first_name: values.firstName,
                    last_name: values.lastName,
                    favourite_location_ids: favlocation,
                    marketing_email_subscription: state.emailnotification,
                    marketing_pn_subscription: state.pushnotification,
                    phone: values.phone
                      ? values.phone.replace(/\D/g, '')
                      : userProfile.phone,
                    current_password: values.currentpassword,
                    password: values.newpassword,
                    password_confirmation: values.confirmpassword,
                  };
                  const data: any = await dispatch(updateUser(obj, true));
                  setIsUpdate(true);
                  // setTimeout(() => {
                  //   dispatch(getUserprofile());
                  // }, 600);
                }
              }
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
                        aria-label="email"
                        label="Email"
                        title="Email"
                        type="text"
                        name="email"
                        sx={{ width: '100%' }}
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(touched && errors.email)}
                        helperText={errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        aria-label="first name"
                        label="First Name"
                        title="First Name"
                        type="text"
                        name="firstName"
                        sx={{ width: '100%' }}
                        value={values.firstName}
                        onChange={handleChange}
                        error={Boolean(touched && errors.firstName)}
                        helperText={errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        aria-label="last name"
                        label="Last Name"
                        title="Last Name"
                        name="lastName"
                        sx={{ width: '100%' }}
                        value={values.lastName}
                        onChange={handleChange}
                        error={Boolean(touched && errors.lastName)}
                        helperText={errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className="mobile-field"
                        aria-label="mobile phone"
                        label="Mobile Phone"
                        title="Mobile Phone"
                        value={values.phone}
                        sx={{ width: '100%' }}
                        onChange={handleChange}
                        name="phone"
                        id="formatted-numberformat-input"
                        InputLabelProps={{
                          shrink: touched && values.phone == '' ? false : true,
                          classes: {
                            root:
                              values.phone !== '' ? 'mobile-field-label' : '',
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
                        aria-label="current password"
                        label="Current Password"
                        title="Current Password"
                        type="password"
                        name="currentpassword"
                        sx={{ width: '100%' }}
                        value={values.currentpassword}
                        onChange={handleChange('currentpassword')}
                        onBlur={handleBlur('currentpassword')}
                        error={Boolean(
                          touched.currentpassword && errors.currentpassword,
                        )}
                        helperText={
                          touched.currentpassword && errors.currentpassword
                        }
                      />
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*<Typography*/}
                    {/*variant="body2"*/}
                    {/*className="body-text"*/}
                    {/*title="Password must be at least 8 characters."*/}
                    {/*sx={{ width: '100%' }}*/}
                    {/*>*/}
                    {/*Your current password. Required to update your personal*/}
                    {/*details.*/}
                    {/*</Typography>*/}
                    {/*</Grid>*/}
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
                        error={Boolean(
                          touched.newpassword && errors.newpassword,
                        )}
                        helperText={touched.newpassword && errors.newpassword}
                      />
                    </Grid>
                    {/* <Typography>{errors.newpassword}</Typography> */}
                    <Grid item xs={12}>
                      <Typography
                        variant="body2"
                        className="body-text"
                        title="Password must be at least 8 characters."
                        sx={{
                          width: '100%',
                          paddingTop: '0px !important',
                          marginTop: '-10px',
                        }}
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
                        error={Boolean(touched && errors.confirmpassword)}
                        helperText={
                          touched.confirmpassword && errors.confirmpassword
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        disabled
                        aria-label="date of birth"
                        title="date of birth"
                        sx={{ width: { xs: '100%' } }}
                        className="birthday-button"
                      >
                        <span className="bday-text">Birthday</span>
                        <span className="date">
                          {moment(userProfile.birthday).format('MMMM Do, YYYY')}
                        </span>
                        <span>
                          <LockOutlinedIcon
                            style={{ color: 'grey', paddingTop: '5px' }}
                          />
                        </span>
                      </Button>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel id="fav-location-label">
                          Favorite Location
                        </InputLabel>
                        <Select
                          labelId="fav-location-label"
                          id="fav-location"
                          name="favlocation"
                          value={favlocation && favlocation}
                          label="Favorite Location"
                          onChange={handleChangeLocation}
                        >
                          {locations &&
                            locations.map((location: any, index: number) => (
                              <MenuItem
                                key={index++}
                                value={location.location_id}
                              >
                                {location.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Card className="card-border">
                        <CardContent>
                          <Typography
                            variant="body2"
                            className="body-text"
                            title="Keep up to date on rewards, exclusive offers and new product
                      launches."
                            sx={{ width: '100%' }}
                          >
                            Keep up to date on rewards, exclusive offers and new
                            product launches.
                          </Typography>
                          <br />
                          <Grid container>
                            <Grid item xs={12} sm={6}>
                              <Switch
                                aria-label="email notification"
                                checked={state.emailnotification}
                                onChange={handleChangeNotification}
                                name="emailnotification"
                              />
                              <Typography
                                variant="caption"
                                title="Email Notification"
                              >
                                Email Notification
                              </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Switch
                                aria-label="push notification"
                                checked={state.pushnotification}
                                onChange={handleChangeNotification}
                                name="pushnotification"
                              />
                              <Typography
                                variant="caption"
                                title="Push Notification"
                              >
                                Push Notification
                              </Typography>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
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
      )}
    </div>
  );
};

export default PersonalInfo;
