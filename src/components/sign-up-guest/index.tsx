import { Grid, Typography, Divider, Link, Checkbox, TextField, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { calculateTaxAndFee } from '../../helpers/common';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DialogTitle from '@mui/material/DialogTitle';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';
import ReactDateInputs from 'react-date-inputs';
import { Formik } from 'formik';
import * as Yup from 'yup';
import "./index.css";
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { userRegister } from '../../redux/actions/user';
import { style } from '@mui/system';
import { useNavigate } from 'react-router-dom';
const SignUpGuest = ({signupFormRef }: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [favLocation, setFavLocation] = useState<any>(null);
    const [favLocationError, setFavLocationError] = useState(false);
    const [birthDay, setBirthDay] = useState<Date | undefined>();
    const [termsAndConditions, setTermsAndconditions] = useState(false);
    const [termsAndConditionsError, setTermsAndConditionsError] = useState(false);
    const { restaurant } = useSelector(
        (state: any) => state.restaurantInfoReducer,
      );
    const handleChangeCheckbox = () => {
        setTermsAndConditionsError(false);
        setTermsAndconditions(!termsAndConditions);
    };
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
    const handleBirthDayChange = (value?: Date | undefined): undefined => {
        setBirthDay(value);
        return;
    };
    return (
        <>
            <Grid container>
                <Grid item xs={0} sm={0} md={3} lg={3} />

                <Grid item style={{ paddingBottom: 30 }} xs={12} sm={12} md={6} lg={6}>

                    <Typography fontWeight={500} title="ORDER DETAILS" variant="h2" sx={{ textAlign: { lg:"center",md:"center", sm:"center", xs: "left"} }}>
                        START EARNING POINTS TODAY
                    </Typography>
                    <Typography sx={{ textAlign: { lg:"center",md:"center", sm:"center", xs: "left"}  }} variant="h6">
                        Join Rubio's Rewards and get $5 off your next order.
                    </Typography>
                    <br/>
                    <Formik
                          innerRef={signupFormRef}
                        initialValues={{
                            emailNotification: false,
                            password: '',
                            password_confirmation: '',
                            favLocation: '',
                            birthday: '',
                            termsAndConditions: false,
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
                                password: values.password,
                                password_confirmation: values.password_confirmation,
                                fav_location_id: restaurant.extref,
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
                                <Grid item xs={12} md={12} lg={12} 
                                        >
                                    <Grid item xs={12} sm={8} md={8} lg={8} sx={{margin:"auto"}}>
                                        <TextField
                                            aria-label="Create Password "
                                            label="Create Password *"
                                            title="Create Password "
                                            type="Create Password "
                                            name="Create Password "
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
                                            sx={{ width: '100%' }}
                                        >
                                            Password must be at least 8 characters.
                                        </Typography>
                                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{margin:"auto"}}>
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
                                    <Grid item xs={12} sm={12} md={12} lg={12} className="date-field" sx={{margin:"auto", width: "100%"}}>
                                        <ReactDateInputs
                                            className="body-text-signup"
                                            label="Birthday (Optional)"
                                            onChange={(value) => handleBirthDayChange(value)}
                                            value={birthDay}
                                            show={['month', 'day', 'year']}
                                        />
                                    </Grid>
                                    <br/>
                                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{margin:"auto"}}>

                                            <Checkbox
                                            checked={termsAndConditions}
                                            id="termsAndConditions"
                                                onChange={handleChangeCheckbox}
                                                sx={{padding:"0px !important", float: "left"}}
                                                name="termsAndConditions"
                                                inputProps={{
                                                    'aria-labelledby': 'chkTermandCondition',
                                                }}
                                            />{' '}
                                            <Typography
                                            variant="body2"
                                            sx={{ width: '100%', paddingTop: "3px" }}
                                        >
                                            I accept the {' '}
                                            <Link
                                                target="popup"
                                                onClick={() =>
                                                    window.open(process.env.REACT_APP_TERMS_LINK, 'name', 'width=1000,height=1000')
                                                }

                                                underline="hover"
                                                sx={{ color: '#1a86ff', cursor: 'pointer' }}
                                            >
                                                Terms and Conditions
                                            </Link>
                                            .
                                        </Typography>
                                        {termsAndConditionsError && (
                                            <p className="fav-error-message">
                                                Terms and conditions are required
                                            </p>
                                        )}
                                    </Grid>
                                    
                                    <Grid item xs={12} sm={12} md={12} lg={12}  sx={{margin:"auto"}}>
                                        <Typography
                                            variant="body2"

                                            title="I accept the terms and conditions."
                                            sx={{ width: '100%', paddingTop: "3px !important", display:"flex", alignItems:"center" }}
                                        >
                                            <Checkbox
                                                checked={values.emailNotification}
                                                onChange={handleChange}
                                                id="emailNotification"
                                                name="emailNotification"
                                                sx={{padding:"0px !important", float: "left"}}
                                                inputProps={{
                                                    'aria-labelledby': 'chkTermandCondition',
                                                }}
                                            />{' '}
                                            Send me email with special Offers and Updates.
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Typography
                                            variant="body2"
                                            className="body-text-signup"
                                            title="Already a Rewards member?"
                                            sx={{ width: '100%', }}
                                        >
                                            Already a Rewards member?{' '}
                                            <Link
onClick={() => navigate('/login')}
                                                underline="hover"
                                                sx={{ color: '#1a86ff', cursor: 'pointer' }}
                                            >
                                                Log In
                                            </Link>
                                            
                                        </Typography>
                                        </Grid>
                                        <br/>
                                    <Grid
                                        item
                                        sx={{ display: 'flex', justifyContent: 'center' }}
                                    >
                                        <Grid item xs={12} sm={12} md={12} lg={12} sx={{margin:"auto"}}>
                                            <Button
                                                type="submit"
                                                //disabled={loadingProvider || loadingAuth}
                                                aria-label="submit form to sign upm for rubios rewards"
                                                name="signup"
                                                title="signup"
                                                variant="contained"
                                                sx={{ width: '100%', height: "70px" }}
                                            >
                                                Sign Up
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
        </>
    );
};

export default SignUpGuest;
