import React, { useState, useEffect } from 'react';
import {
  Grid,
  Checkbox,
  TextField,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { setBasketDeliveryAddress } from '../../redux/actions/basket/checkout';
import { RequestDeliveryAddress } from '../../types/olo-api';
import {
  deleteUserDeliveryAddress,
  setUserDefaultDelAddress,
} from '../../redux/actions/user';

const DeliveryForm = ({ basket, deliveryFormRef, defaultAddress }: any) => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState<any>(null);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const objDeliveryAddress = useSelector(
    (state: any) => state.deliveryAddressReducer,
  );
  const { authToken } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    if (basket && basket.deliveryaddress) {
      setAddress(basket.deliveryaddress);
    } else if (defaultAddress) {
      setAddress(defaultAddress);
    } else {
      setAddress(null);
    }
  }, [defaultAddress, basket]);

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

  const updateDefaultAddress = (event: any) => {
    console.log('checked', event.target.checked);
    if (address && address.id) {
      let updatedAddress: any = {
        building: address.building ? address.building : '',
        streetaddress: address.streetaddress ? address.streetaddress : '',
        city: address.city ? address.city : '',
        zipcode: address.zipcode ? address.zipcode : '',
        isdefault: false
      };
      updatedAddress.isdefault = event.target.checked;

      dispatch(setBasketDeliveryAddress(basket.id, updatedAddress));
      // dispatch(deleteUserDeliveryAddress(address.id));
    }
  };

  return (
    <Formik
      innerRef={deliveryFormRef}
      enableReinitialize={true}
      initialValues={{
        firstName: providerToken?.first_name ? providerToken?.first_name : '',
        lastName: providerToken?.last_name ? providerToken?.last_name : '',
        phone: providerToken?.phone ? providerToken?.phone : '',
        email: providerToken?.email ? providerToken?.email : '',
        addressId:
          objDeliveryAddress && objDeliveryAddress.address
            ? null
            : address && address.id
            ? address.id
            : null,
        apartment:
          objDeliveryAddress && objDeliveryAddress.address
            ? objDeliveryAddress.address.address2
            : address && address.building
            ? address.building
            : '',
        streetAddress:
          objDeliveryAddress && objDeliveryAddress.address
            ? objDeliveryAddress.address.address1
            : address && address.streetaddress
            ? address.streetaddress
            : '',
        city:
          objDeliveryAddress && objDeliveryAddress.address
            ? objDeliveryAddress.address.city
            : address && address.city
            ? address.city
            : '',
        zipcode:
          objDeliveryAddress && objDeliveryAddress.address
            ? objDeliveryAddress.address.zip
            : address && address.zipcode
            ? address.zipcode
            : '',
        // saveAddressCheck:
        //   address && address.isdefault ? address.isdefault : false,
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
        apartment: Yup.string()
          .trim()
          .max(30, 'Must be 30 characters or less')
          .optional(),
        streetAddress: Yup.string()
          .trim()
          .max(30, 'Must be 45 characters or less')
          .required('Street Address is required'),
        city: Yup.string()
          .trim()
          .max(30, 'Must be 30 characters or less')
          .required('City is required'),
        zipcode: Yup.string()
          .trim()
          .max(30, 'Must be 30 characters or less')
          .required('Zip Code is required'),
        // saveAddressCheck: Yup.bool().optional(),
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
          <Grid
            item
            xs={12}
            sx={{
              display:
                objDeliveryAddress == null && providerToken ? 'grid' : 'none',
            }}
          >
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
                error={Boolean(touched.apartment && errors.apartment)}
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
                error={Boolean(touched.streetAddress && errors.streetAddress)}
                helperText={errors.streetAddress}
              />
            </Grid>
            <Grid container spacing={1}>
              <Grid item xs={6}>
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
                  error={Boolean(touched.city && errors.city)}
                  helperText={errors.city}
                />
              </Grid>

              <Grid item xs={6}>
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
                  error={Boolean(touched.zipcode && errors.zipcode)}
                  helperText={errors.zipcode}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display:
                objDeliveryAddress && objDeliveryAddress.address
                  ? 'flex'
                  : 'none',
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
                  {objDeliveryAddress.address.address1}
                  <br />
                  {objDeliveryAddress.address.address2}
                  {objDeliveryAddress.address.address2 != '' && <br />}
                  {objDeliveryAddress.address.city},&nbsp;
                  {objDeliveryAddress.address.zip}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {authToken?.authtoken ? (
            <Grid
              item
              xs={12}
              style={{
                paddingBottom: '20px',
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={
                        address && address.isdefault ? address.isdefault : false
                      }
                      onChange={(e) => {
                        // handleChange(e);
                        updateDefaultAddress(e);
                      }}
                    />
                  }
                  label="Make default delivery address."
                  aria-label="Make default delivery address"
                  aria-required="true"
                  title="Make default delivery address"
                  name="saveAddressCheck"
                  className="size"
                />
              </FormGroup>
            </Grid>
          ) : null}
        </form>
      )}
    </Formik>
  );
};

export default DeliveryForm;
