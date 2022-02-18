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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './profile.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  changePassword,
  getUserprofile,
  updateUser,
} from '../../redux/actions/user';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getlocations } from '../../redux/actions/location';
import LoadingBar from '../../components/loading-bar';
import { IMaskInput } from 'react-imask';
import { forwardRef } from 'react';
import ErrorMessageAlert from '../../components/error-message-alert';
import Moment from 'react-moment';

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
  roott: {
    width: '50px',
    height: '30px',
    padding: '0px',
  },
  switchBase: {
    color: '#818181',
    padding: '1px',
    '&$checked': {
      '& + $track': {
        backgroundColor: '#23bf58',
      },
    },
  },
  thumb: {
    color: 'white',
    width: '20px',
    height: '20px',
    margin: '1px',
  },
  track: {
    borderRadius: '20px',
    backgroundColor: '#818181',
    opacity: '1 !important',
    '&:after, &:before': {
      color: 'white',
      fontSize: '8.5px',
      position: 'absolute',
      top: '8px',
    },
    '&:after': {
      content: "'ON'",
      left: '8px',
    },
    '&:before': {
      content: "'OFF'",
      right: '7px',
    },
  },
  checked: {
    color: '#23bf58 !important',
    transform: 'translateX(26px) !important',
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

const Profile = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userProfile, loading, error, updatedUserprofile, success } =
    useSelector((state: any) => state.userReducer);
  const [favlocation, setFavLoc] = useState('');
  const { locations } = useSelector((state: any) => state.locationReducer);
  const [state, setState] = useState({
    emailnotification: true,
    pushnotification: true,
  });
  useEffect(() => {
    dispatch(getUserprofile());
    dispatch(getlocations());
  }, []);

  useEffect(() => {}, [error]);
  useEffect(() => {}, [updatedUserprofile]);
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

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.heading}>
        Edit Profile
      </Typography>
      {!loading && updatedUserprofile.passsuccess == 1 && (
        <ErrorMessageAlert message="password Updated successfully" />
      )}
      {!loading && success == 1 && (
        <ErrorMessageAlert message="profile Updated successfully" />
      )}
      {!loading &&
        updatedUserprofile &&
        updatedUserprofile.passerror &&
        updatedUserprofile.passerror.data && (
          <ErrorMessageAlert message={updatedUserprofile.passerror.data} />
        )}
      {!loading && error && error.data && (
        <ErrorMessageAlert message={error.data} />
      )}
      {loading && !userProfile && <LoadingBar />}
      {userProfile && (
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
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .min(3, 'Must be at least 3 characters')
                .matches(
                  /^[aA-zZ\s]+$/,
                  'Only letters are allowed for this field ',
                )
                .required('Name is required'),
              lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .min(3, 'Must be at least 3 characters')
                .matches(
                  /^[aA-zZ\s]+$/,
                  'Only letters are allowed for this field ',
                )
                .required('Last name is required'),
              email: Yup.string()
                .matches(
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                  'Invalid Email ',
                )
                .email('Invalid email address')
                .required('Email is required'),
              newpassword: Yup.string().matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                'password must be minimum 8 characters and  must contain only  numbers and letters. ',
              ),

              confirmpassword: Yup.string()
                .matches(
                  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  'password must be minimum 8 characters and  must contain only  numbers and letters. ',
                )
                .oneOf([Yup.ref('newpassword'), null], 'Passwords must match'),

              phone: Yup.string().min(14, 'Enter valid number'),
            })}
            onSubmit={async (values) => {
              const obj = {
                email: values.email,
                first_name: values.firstName,
                last_name: values.lastName,
                favourite_locations: favlocation,
                marketing_email_subscription: state.emailnotification,
                marketing_pn_subscription: state.pushnotification,
                phone: values.phone
                  ? values.phone.replace(/\D/g, '')
                  : userProfile.phone,
              };
              const passwordObj = {
                password: values.newpassword,
                password_confirmation: values.confirmpassword,
              };

              if (values.newpassword === '' || values.confirmpassword === '') {
                dispatch(updateUser(obj));
              } else {
                const data: any = await dispatch(changePassword(passwordObj));
                const dataa: any = await dispatch(updateUser(obj));
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
                        aria-label="mobile phone "
                        label="Mobile Phone"
                        title="Mobile Phone"
                        value={values.phone}
                        sx={{ width: '100%' }}
                        onChange={handleChange}
                        name="phone"
                        id="formatted-numberformat-input"
                        InputLabelProps={{
                          shrink: touched && values.phone == '' ? false : true,
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
                        aria-label="new password"
                        label="New Password"
                        title="New Password"
                        type="password"
                        name="newpassword"
                        sx={{ width: '100%' }}
                        onChange={handleChange}
                        value={values.newpassword}
                        error={Boolean(touched && errors.newpassword)}
                        helperText={errors.newpassword}
                      />
                    </Grid>
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
                        onChange={handleChange}
                        error={Boolean(touched && errors.confirmpassword)}
                        helperText={errors.confirmpassword}
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
                          <Moment format="MMMM DD, YYYY">
                            {userProfile.birthday}
                          </Moment>
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
                                classes={{
                                  root: classes.roott,
                                  switchBase: classes.switchBase,
                                  thumb: classes.thumb,
                                  track: classes.track,
                                  checked: classes.checked,
                                }}
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
                        disabled={!(dirty && isValid)}
                        onBlur={handleBlur}
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

export default Profile;
