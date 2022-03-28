import React from 'react';
import {
  Grid,
  Checkbox,
  TextField,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

const DeliveryForm = ({basket, deliveryFormRef}: any) => {

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
    <Formik
            innerRef={deliveryFormRef}
            enableReinitialize={true}
            initialValues={{
            firstName: providerToken?.first_name
                ? providerToken?.first_name
                : '',
            lastName: providerToken?.last_name
                ? providerToken?.last_name
                : '',
            phone: providerToken?.phone
                ? providerToken?.phone
                : '',
            email: providerToken?.email
                ? providerToken?.email
                : '',
            apartment: '',
            streetAddress: '',  
            city: '',  
            zipcode: '',
            saveAddressCheck: false
            }}
            validationSchema={Yup.object({
            firstName: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .required('First Name is required'),
            lastName: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .required('Last Name is required'),
            email: Yup.string()
                .matches(
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Invalid Email ',
                )
                .email('Invalid email address')
                .required('Email is required'),
            phone: Yup.string()
                .min(14, 'Enter valid number')
                .required('Phone is required'),
            apartment: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .optional(),
            streetAddress: Yup.string()
                .max(30, 'Must be 45 characters or less')
                .required('Street Address is required'),
            city: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .required('City is required'),
            zipcode: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .required('Zip Code is required'),
            saveAddressCheck: Yup.bool().optional()
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
            <form
                style={{ width: '100%' }}
                onSubmit={handleSubmit}
            >
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
                        error={Boolean(
                        touched.firstName && errors.firstName,
                        )}
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
                    error={Boolean(
                    touched.lastName && errors.lastName,
                    )}
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
                    shrink:
                        touched && values.phone == ''
                        ? false
                        : true,
                    classes: {
                        root:
                        values.phone !== ''
                            ? 'mobile-field-label'
                            : '',
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

                <Grid item xs={12}>
                    <TextField
                        aria-label="Apt, Building, Company - Optional"
                        onBlur={handleBlur}
                        label="Apt, Building, Company - Optional"
                        aria-required="true"
                        title="Apt, Building, Company - Optional"
                        type="text"
                        name="apartment"
                        value={values.apartment}
                        onChange={handleChange}
                        error={Boolean(
                        touched.apartment && errors.apartment,
                        )}
                        helperText={errors.apartment}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        aria-label="Street Address"
                        onBlur={handleBlur}
                        label="Street Address"
                        aria-required="true"
                        title="Street Address"
                        type="text"
                        name="streetAddress"
                        value={values.streetAddress}
                        onChange={handleChange}
                        error={Boolean(
                        touched.streetAddress && errors.streetAddress,
                        )}
                        helperText={errors.streetAddress}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        aria-label="City"
                        onBlur={handleBlur}
                        label="City"
                        aria-required="true"
                        title="City"
                        type="text"
                        name="city"
                        value={values.city}
                        onChange={handleChange}
                        error={Boolean(
                        touched.city && errors.city,
                        )}
                        helperText={errors.city}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        aria-label="Zip Code"
                        onBlur={handleBlur}
                        label="Zip Code"
                        aria-required="true"
                        title="Zip Code"
                        type="text"
                        name="zipcode"
                        value={values.zipcode}
                        onChange={handleChange}
                        error={Boolean(
                        touched.zipcode && errors.zipcode,
                        )}
                        helperText={errors.zipcode}
                    />
                </Grid>

                 <Grid item xs={12}>
                <FormGroup>
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={values.saveAddressCheck}
                        onChange={handleChange}
                        />
                    }
                    label="Save Delivery Address to My account."
                    aria-label="Save Delivery Address to My account"
                    aria-required="true"
                    title="Save Delivery Address to My account"
                    name="saveAddressCheck"
                    className="size"
                    />
                </FormGroup>
                </Grid> 
            </form>
            )}
    </Formik>
  );
};

export default DeliveryForm;
