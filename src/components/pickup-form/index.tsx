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
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';

const PickupForm = ({basket, pickupFormRef, orderType}: any) => {
  const dispatch = useDispatch();

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
            innerRef={pickupFormRef}
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
            emailNotification:
                providerToken?.marketing_email_subscription
                ? providerToken?.marketing_email_subscription
                : false,
            vehicleModal: '',  
            vehicleMake: '',  
            vehicleColor: ''
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
            vehicleModal: orderType === DeliveryModeEnum.curbside ? Yup.string().max(15, 'Must be 15 characters or less').required('Vehicle Modal is required') : Yup.string(),
            vehicleMake: orderType === DeliveryModeEnum.curbside ? Yup.string().max(15, 'Must be 15 characters or less').required('Vehicle Make is required') : Yup.string(),
            vehicleColor: orderType === DeliveryModeEnum.curbside ? Yup.string().max(15, 'Must be 15 characters or less').required('Vehicle Color is required') : Yup.string(),
            emailNotification: Yup.bool().optional()
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

                {
            orderType === DeliveryModeEnum.curbside ? (
                    <>
                        <Grid container spacing={1}>

                            <Grid item xs={6}>
                            <TextField
                                aria-label="Vehicle Modal"
                                onBlur={handleBlur}
                                label="Vehicle Modal"
                                aria-required="true"
                                title="Vehicle Modal"
                                type="text"
                                name="vehicleModal"
                                value={values.vehicleModal}
                                onChange={handleChange}
                                error={Boolean(
                                touched.vehicleModal && errors.vehicleModal,
                                )}
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
                                error={Boolean(
                                touched.vehicleMake && errors.vehicleMake,
                                )}
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
                            error={Boolean(
                            touched.vehicleColor && errors.vehicleColor,
                            )}
                            helperText={errors.vehicleColor}
                        />
                        </Grid>
                        </>
                        ) : (null)
                    } 

                <Grid item xs={12}>
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
                </Grid>
            </form>
            )}
    </Formik>
  );
};

export default PickupForm;
