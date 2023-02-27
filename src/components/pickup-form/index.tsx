import React from 'react';
import {
  Grid,
  Checkbox,
  TextField,
  FormControlLabel,
  Typography,
  Link,
  FormGroup,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';
import { isLoginUser } from '../../helpers/auth';

const PickupForm = ({
  basket,
  pickupFormRef,
  orderType,
  setShowSignUpGuest,
  showSignUpGuest,
}: any) => {
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const [show, setShow] = React.useState<boolean>(false);
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
  const formatTableNumber = (e: any, tableNumber: any) => {
    let newValue = e.target.value.trim();
    if (newValue && newValue !== '') {
      if (newValue.includes('.')) {
        const splitArray = newValue.split('.');
        newValue = +splitArray[0];
      }
      // newValue = newValue.replace(/^0+/, '');
    }
    newValue =
      newValue && newValue >= 0 && newValue <= 9999999999999999999
        ? newValue
        : newValue > 9999999999999999999
        ? tableNumber
        : '';

    const newEvent: any = {
      target: {
        value: newValue,
        name: 'tableNumber',
      },
    };

    return newEvent;
  };

  return (
    <Formik
      innerRef={pickupFormRef}
      enableReinitialize={true}
      initialValues={{
        firstName: providerToken?.first_name ? providerToken?.first_name : '',
        lastName: providerToken?.last_name ? providerToken?.last_name : '',
        phone: providerToken?.phone ? providerToken?.phone : '',
        email: providerToken?.email ? providerToken?.email : '',
        emailNotification: true,
        tableNumber: '',
        vehicleModal: '',
        vehicleMake: '',
        vehicleColor: '',
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
            'Invalid Email',
          )
          .email('Invalid email address')
          .required('Email is required'),
        phone:
          orderType !== DeliveryModeEnum.dinein
            ? Yup.string()
                .min(14, 'Enter valid number')
                .required('Phone is required')
            : Yup.string(),
        tableNumber:
          orderType === DeliveryModeEnum.dinein
            ? Yup.string().required('Table Number is required')
            : Yup.string(),
        vehicleModal:
          orderType === DeliveryModeEnum.curbside
            ? Yup.string().trim().required('Vehicle Model is required')
            : Yup.string(),
        vehicleMake:
          orderType === DeliveryModeEnum.curbside
            ? Yup.string().trim().required('Vehicle Make is required')
            : Yup.string(),
        vehicleColor:
          orderType === DeliveryModeEnum.curbside
            ? Yup.string().trim().required('Vehicle Color is required')
            : Yup.string(),
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
        isValid,
        dirty,
      }) => (
        <form style={{ width: '100%' }} onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <TextField
              aria-label="First Name"
              disabled={isLoginUser()}
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
              disabled={isLoginUser()}
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

          {orderType !== DeliveryModeEnum.dinein && (
            <Grid item xs={12} sx={{letterSpacing: "0.1px !important"}}>
              <TextField
                className=" phone-field"
                aria-label="Phone Number"
                onBlur={handleBlur}
                label="Phone Number"
                aria-required="true"
                title="Phone Number"
                sx={{letterSpacing: "0.1px !important"}}
                value={values.phone ? values.phone : null}
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
          )}

          <Grid item xs={12}>
            <TextField
              aria-label="Email"
              disabled={isLoginUser()}
              onBlur={handleBlur}
              label="Email"
              aria-required="true"
              title="Email"
              type="text"
              name="email"
              value={values.email ? values.email : null}
              onChange={handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={errors.email}
            />
          </Grid>
          {orderType === DeliveryModeEnum.dinein ? (
            <>
              <Grid item xs={12}>
                <TextField
                  aria-label="Table Number"
                  onBlur={handleBlur}
                  label="Table Number"
                  aria-required="true"
                  title="Table Number"
                  type="text"
                  name="tableNumber"
                  value={values.tableNumber}
                  onChange={(e) => {
                    handleChange(formatTableNumber(e, values.tableNumber));
                  }}
                  error={Boolean(touched.tableNumber && errors.tableNumber)}
                  helperText={errors.tableNumber}
                />
              </Grid>
            </>
          ) : null}
          {orderType === DeliveryModeEnum.curbside ? (
            <>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    aria-label="Vehicle Model"
                    onBlur={handleBlur}
                    label="Vehicle Model"
                    aria-required="true"
                    title="Vehicle Model"
                    type="text"
                    name="vehicleModal"
                    value={values.vehicleModal}
                    onChange={handleChange}
                    error={Boolean(touched.vehicleModal && errors.vehicleModal)}
                    helperText={errors.vehicleModal}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    aria-label="Vehicle Make"
                    onBlur={handleBlur}
                    label="Vehicle Make"
                    aria-required="true"
                    title="Vehicle Make"
                    type="text"
                    name="vehicleMake"
                    value={values.vehicleMake}
                    onChange={handleChange}
                    error={Boolean(touched.vehicleMake && errors.vehicleMake)}
                    helperText={errors.vehicleMake}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  aria-label="Vehicle Color"
                  onBlur={handleBlur}
                  label="Vehicle Color"
                  aria-required="true"
                  title="Vehicle Color"
                  type="text"
                  name="vehicleColor"
                  value={values.vehicleColor}
                  onChange={handleChange}
                  error={Boolean(touched.vehicleColor && errors.vehicleColor)}
                  helperText={errors.vehicleColor}
                />
              </Grid>
            </>
          ) : null}
           {!isLoginUser() && (
            <Grid item xs={12}>
              {/* {!providerToken && showSignUpGuest && ( */}
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
                  {/* <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Typography
                      variant="body2"
                      title="Don't have an account?"
                      sx={{ width: '100%', padding: '0pxx !important' }}
                    >
                      Don't have an account?{' '}
                      <Link
                        underline="hover"
                        sx={{
                          color: '#214F66',
                          cursor: 'pointer',
                          fontFamily: 'Poppins-Medium',
                          textDecoration: 'underline',
                        }}
                        onClick={() => setShowSignUpGuest(true)}
                      >
                        Sign Up?
                      </Link>
                    </Typography>
                  </Grid> */}
                </FormGroup>
               {/* )}  */}
            </Grid> 
          )} 
        </form>
      )}
    </Formik>
  );
};

export default PickupForm;
