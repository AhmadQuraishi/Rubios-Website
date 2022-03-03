import { makeStyles } from "@mui/styles";
import {
  Grid, Card, FormControl,
  Typography, TextField, Button,
  InputLabel, MenuItem, Select,
  SelectChangeEvent, Checkbox
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getlocations } from '../../redux/actions/location';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const useStyle = makeStyles(() => ({
    root: {
      minHeight: '100vh',
      backgroundImage: `url(https://www.pexels.com/photo/1640777/download/)`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      justifyContent: 'center',
    },
    signinBtn: {
      width: '200px',
      margin: '20px',
    },
    card: {
      marginTop: '40px',
      marginLeft: '40px',
    },
  }));


const Register = () =>{

  const classes = useStyle();
  const dispatch = useDispatch();
  const [favLocation, setFavLocation] = useState('');
  const [termsAndConditions, setTermsAndconditions] = useState(false);
  const { locations } = useSelector((state: any) => state.locationReducer);
  useEffect(() => {
    dispatch(getlocations());
  }, []);

  const handleChangeLocation = (event: SelectChangeEvent) => {
    setFavLocation(event.target.value as string);
  };

  const handleChangeCheckbox = () => {
    setTermsAndconditions(!termsAndConditions)  }


  return (
      <>
      <Grid container component="main" className={classes.root}>
           <Grid item xs={10} md={8} lg={6}>
               <Card elevation={6}>
               <Grid container>
        <Formik
          initialValues={{
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            password: '',
            confirmpassword: '',
            invitecode: '',
            favLocation: '',
            // termsAndConditions: false
          }}
          validationSchema={Yup.object({
          firstname: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .min(3, 'Must be at least 3 characters')
            .matches(
              /^[aA-zZ\s]+$/,
              'Only letters are allowed for this field ',
            )
            .required('First Name is required'),
          lastname: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .min(3, 'Must be at least 3 characters')
            .matches(
              /^[aA-zZ\s]+$/,
              'Only letters are allowed for this field ',
            )
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
            confirmpassword: Yup.string()
              .min(8, 'Must be at least 8 characters')
              .max(16, 'Must be at most 16 characters')
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('required'),
          })}
          onSubmit={async (values) => {
            const obj = {
              first_name: values.firstname,
              last_name: values.lastname,
              password: values.password,
              password_confirmation: values.confirmpassword,
              email: values.email,
              phone: values.phone ? values.phone.replace(/\D/g, '')  : '',
              invite_code: values.invitecode,
              favourite_locations: favLocation,
              terms_and_conditions: termsAndConditions
            };

            // const data: any = await dispatch(changePassword(obj));
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid item xs={10} md={8} lg={6}>
                <Grid container className="profile-section">
                <Grid item xs={12}>
                    <TextField
                      aria-label="first name"
                      label="First Name"
                      title="First Name"
                      type="text"
                      name="firstname"
                      sx={{ width: '100%' }}
                      value={values.firstname}
                      onChange={handleChange('firstname')}
                      onBlur={handleBlur('firstname')}
                      error={Boolean(touched.firstname && errors.firstname)}
                      helperText={touched.firstname && errors.firstname}
                    />
                  </Grid>    
                  <Grid item xs={12}>
                    <TextField
                      aria-label="last name"
                      label="Last Name"
                      title="Last Name"
                      type="text"
                      name="lastname"
                      sx={{ width: '100%' }}
                      value={values.lastname}
                      onChange={handleChange('lastname')}
                      onBlur={handleBlur('lastname')}
                      error={Boolean(touched.lastname && errors.lastname)}
                      helperText={touched.lastname && errors.lastname}
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
                      aria-label="phone"
                      label="Mobile Phone (Optional)"
                      title="Mobile Phone (Optional)"
                      type="text"
                      name="phone"
                      sx={{ width: '100%' }}
                      value={values.phone}
                      onChange={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
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
                      name="confirmpassword"
                      type="password"
                      sx={{ width: '100%' }}
                      value={values.confirmpassword}
                      onChange={handleChange('confirmpassword')}
                      onBlur={handleBlur('confirmpassword')}
                      error={Boolean(
                        touched.confirmpassword && errors.confirmpassword,
                      )}
                      helperText={
                        touched.confirmpassword && errors.confirmpassword
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
                      error={Boolean(
                        touched.invitecode && errors.invitecode,
                      )}
                      helperText={
                        touched.invitecode && errors.invitecode
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body2"
                      className="body-text"
                      title="Birthday (Optional)"
                      sx={{ width: '100%' }}
                    >
                      Birthday (Optional)
                    </Typography>

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
                    <Typography
                      variant="body2"
                      className="body-text"
                      title="Password must be at least 8 characters."
                      sx={{ width: '100%' }}
                    >
                      <Checkbox  onChange={handleChangeCheckbox}/> I argree to the Rubio's Trems and Conditions and to receiving marketing
                      communications from Rubio's
                    </Typography>
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
               </Card>
           </Grid>

          </Grid>
      </>
  )


}


export default Register