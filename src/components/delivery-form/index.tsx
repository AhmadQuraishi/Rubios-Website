import React, { useState } from 'react';
import {
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { OrderTypeDialog } from '../order-type-dialog';

const DeliveryForm = ({
  basket,
  deliveryFormRef,
  showSignUpGuest,
  setShowSignUpGuest,
}: any) => {
  const [open, setOpen] = useState(false);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);

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
    <>
      <OrderTypeDialog openModal={open} setOpenModal={setOpen} />
      <Formik
        innerRef={deliveryFormRef}
        enableReinitialize={true}
        initialValues={{
          firstName: providerToken?.first_name ? providerToken?.first_name : '',
          lastName: providerToken?.last_name ? providerToken?.last_name : '',
          phone: providerToken?.phone ? providerToken?.phone : '',
          email: providerToken?.email ? providerToken?.email : '',
          emailNotification: true,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .trim()
            .max(30, 'Must be 30 characters or less')
            .required('First Name is required'),
          lastName: Yup.string()
            .trim()
            .max(30, 'Must be 30 characters or less')
            .required('Last Name is required'),
          email: Yup.string()
            .matches(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Invalid Email ',
            )
            .email('Invalid email address')
            .required('Email is required'),
          phone: Yup.string()
            .min(14, 'Enter valid number')
            .required('Phone is required'),
          emailNotification: Yup.bool().optional(),
        })}
        onSubmit={(values, actions) => {}}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form style={{ width: '100%' }} onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <TextField
                aria-label="First Name"
                disabled={authToken?.authtoken ? true : false}
                onBlur={handleBlur}
                label="First Name"
                aria-required="true"
                title="First Name"
                type="text"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={errors.firstName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                aria-label="Last Name"
                disabled={authToken?.authtoken ? true : false}
                onBlur={handleBlur}
                label="Last Name"
                aria-required="true"
                title="Last Name"
                type="text"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={errors.lastName}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                className="mobile-field"
                aria-label="Phone Number"
                onBlur={handleBlur}
                label="Phone Number"
                aria-required="true"
                title="Phone Number"
                value={values.phone}
                onChange={handleChange}
                name="phone"
                InputLabelProps={{
                  shrink: touched && values.phone == '' ? false : true,
                  classes: {
                    root: values.phone !== '' ? 'mobile-field-label' : '',
                  },
                }}
                InputProps={{
                  inputComponent: NumberFormatCustom as any,
                }}
                error={Boolean(touched.phone && errors.phone)}
                helperText={errors.phone}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                aria-label="Email"
                disabled={authToken?.authtoken ? true : false}
                onBlur={handleBlur}
                label="Email"
                aria-required="true"
                title="Email"
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={Boolean(touched.email && errors.email)}
                helperText={errors.email}
              />
            </Grid>
            {/* {!providerToken && showSignUpGuest && (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.emailNotification}
                        onChange={handleChange}
                      />
                    }
                    label="Send me emails with special offers and updates."
                    aria-label="Send me emails with special offers and updates"
                    aria-required="true"
                    title="Send me emails with special offers and updates"
                    name="emailNotification"
                    className="size"
                  />
                </FormGroup>
                <Typography
                  variant="body2"
                  title="Don't have an account?"
                  sx={{ width: '100%', padding: '0pxx !important' }}
                >
                  Don't have an account?{' '}
                  <Link
                    underline="hover"
                    sx={{
                      color: '#1a86ff',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                    onClick={() => setShowSignUpGuest(true)}
                  >
                    Sign Up?
                  </Link>
                </Typography>
              </Grid>
            )} */}
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
              }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <br />
                  <Typography
                    variant="body1"
                    className="label"
                    style={{
                      paddingTop: '10px',
                    }}
                  >
                    Your delivery Address
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      fontSize: '14px',
                      fontFamily: 'Poppins-Medium',
                      color: '#333',
                      paddingTop: '5px',
                    }}
                  >
                    {basket?.deliveryaddress?.streetaddress}
                    <br />
                    {basket?.deliveryaddress?.building}
                    {basket?.deliveryaddress?.building !== '' && <br />}
                    {basket?.deliveryaddress?.city},&nbsp;
                    {basket?.deliveryaddress?.zipcode}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="label"
                    sx={{ cursor: 'pointer', display: 'inline' }}
                    aria-label={'Edit Address'}
                    onClick={() => setOpen(true)}
                  >
                    Edit
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

export default DeliveryForm;
