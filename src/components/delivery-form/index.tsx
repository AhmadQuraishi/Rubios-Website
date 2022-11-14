import React, { useState, useEffect } from 'react';
import {
  Grid,
  // Checkbox,
  TextField,
  FormControlLabel,
  FormGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Checkbox,
  Typography,
} from '@mui/material';
import {
  useDispatch,
  useSelector } from 'react-redux';
  import { displayToast } from '../../helpers/toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { getAddress } from '../../helpers/common';
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import { getNearByResturantListRequest } from '../../redux/actions/restaurant/list';
import { setBasketDeliveryAddress } from '../../redux/actions/basket/checkout';
import { RequestDeliveryAddress } from '../../types/olo-api';
import {
  deleteUserDeliveryAddress,
  setUserDefaultDelAddress,
} from '../../redux/actions/user';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
const DeliveryForm = ({ basket, deliveryFormRef }: any,props : any) => {
  const dispatch = useDispatch();
  const {
    deliveryAddressList,
    loading,
    deliveryAddressString,
    setDeliveryAddressString,
    filteredRestaurants,
    gotoCategoryPage,
    setActionPerform,
    setShowNearBy,
    setSelectedLatLng,
  } = props;
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [address, setAddress] = useState<any>(null);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const objDeliveryAddress = useSelector(
    (state: any) => state.deliveryAddressReducer,
  );
  
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { authToken } = useSelector((state: any) => state.authReducer);
  useEffect(() => {
    if (basket && basket.deliveryaddress) {
      setAddress(basket.deliveryaddress);
    }
    // else if (defaultAddress) {
    //   setAddress(defaultAddress);
    // }
    else {
      setAddress(null);
    }
  }, [basket]);
  // const [editDeliveryAddress, setEditDeliveryAddress] = useState({
  //   address1: '',
  //   address2: '',
  //   city: '',
  //   zip: '',
  //   isdefault: false,
  // });
  const [addDeliveryAddress, setAddDeliveryAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    zip: '',
    isdefault: false,
  });
  
  interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
  }
  const checkButtonDisabled = (
    values: any,
    isValid: any,
    dirty: any,
    edit: any,
  ) => {
    if (edit) {
      return (
        values.address1 === '' ||
        values.city === '' ||
        values.zip === '' ||
        !isValid
      );
    } else {
      return (
        values.address1 === '' ||
        values.city === '' ||
        values.zip === '' ||
        !(isValid && dirty)
      );
    }
  };
  const handleClickOpen = () => {
    console.log('working');
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEdit(false);
  };

  useEffect(() => {
    console.log('open', open);
  }, [open]);
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
      dispatch(deleteUserDeliveryAddress(address.id));
    }
  };
  
  const handleLCloseConfirm = (address: any, id: any) => {
    setOpen(false);
    setEdit(false);
    console.log('addDeliveryAddress 1', );
    getGeocode({
      address:
        address.address1 +
        ' ' +
        address.address2 +
        ', ' +
        address.city +
        ', ' +
        address.zip,
    })
      .then((results) => {
        getLatLng(results[0]).then(({ lat, lng }) => {
          const googleAddress = getAddress(results[0]);

          if (googleAddress.address1 !== '') {
            //setLatLng({ lat: lat, lng: lng });
            let newAddress: any = {
              ...address,
            };
            console.log('selectedAddressId', selectedAddressId);
            const selectedId = selectedAddressId || id || null;
            if (
              selectedId &&
              verifySameDeliveryAddress(
                address,
                deliveryAddressList,
                selectedId,
              )
            ) {
              
              newAddress['id'] = selectedId;
            }

            console.log('newAddress', newAddress);

            setDeliveryAddressString(newAddress);
            updateDefaultAddress(newAddress);
            //setEditDeliveryAddress(address);
            //getNearByRestaurants(lat, lng);
            setActionPerform(false);
            setShowNearBy(true);
            setSelectedLatLng({
              lat: lat,
              lng: lng,
            });
            setNotFound(false);
            return;
          } else {
            //setEditDeliveryAddress(address);
            displayToast('ERROR', 'Your delivery address is not Found');
            setNotFound(true);
          }
        });
      })
      .catch((err) => {
        //setEditDeliveryAddress(address);
        setNotFound(true);
      });
  };

  const verifySameDeliveryAddress = (
    formData: any,
    deliveryAddresses: any,
    id: any,
  ) => {
    let sameCheck = false;
    const selectedDeliveryAddress = deliveryAddresses.find(
      (address: any) => address.id === id,
    );

    if (selectedDeliveryAddress) {
      const currentAddress: any = {
        building: formData.address2,
        streetaddress: formData.address1,
        city: formData.city,
        zipcode: formData.zip,
      };
      const existingAddress: any = {
        building: selectedDeliveryAddress.building,
        streetaddress: selectedDeliveryAddress.streetaddress,
        city: selectedDeliveryAddress.city,
        zipcode: selectedDeliveryAddress.zipcode,
      };
      console.log('currentAddress', currentAddress);
      console.log('defaultAddress', existingAddress);
      sameCheck =
        JSON.stringify(currentAddress) === JSON.stringify(existingAddress);
    }
    return sameCheck;
  };

  useEffect(() => {
    console.log('addDeliveryAddress', addDeliveryAddress);
    //console.log('editDeliveryAddress', editDeliveryAddress);
  }, [addDeliveryAddress, addDeliveryAddress]);

  useEffect(() => {
    console.log('notFound', notFound);
  }, [notFound]);

  // const getNearByRestaurants = (lat: number, long: number) => {
  //   var today = new Date();
  //   const dateFrom =
  //     today.getFullYear() * 1e4 +
  //     (today.getMonth() + 1) * 100 +
  //     today.getDate() +
  //     '';
  //   const lastWeekDate = new Date(
  //     today.getFullYear(),
  //     today.getMonth(),
  //     today.getDate() + 6,
  //   );
  //   const dateTo =
  //     lastWeekDate.getFullYear() * 1e4 +
  //     (lastWeekDate.getMonth() + 1) * 100 +
  //     lastWeekDate.getDate() +
  //     '';
  //   dispatch(getNearByResturantListRequest(lat, long, 10, 6, dateFrom, dateTo));
  // };
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
                <Typography
                variant="body1"
                className="label"
                sx={{cursor: 'pointer'}}
                onClick={() => {
                  setAddDeliveryAddress({
                  address1: objDeliveryAddress.address.address1 || '',
                  address2: objDeliveryAddress.address.address2 || '',
                  city: objDeliveryAddress.address.city || '',
                  zip: objDeliveryAddress.address.zip || '',
                  isdefault: objDeliveryAddress.address.isdefault,
                  });
                  setEdit(true);
                  setSelectedAddressId(address.id);
                  handleClickOpen();
                  }}
                >
                  Edit
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-dialog-delivery-address"
            aria-describedby="modal-dialog-delivery-address-form"
            sx={{ width: '100%' }}
            TransitionProps={{
              role: 'dialog',
              'aria-modal': 'true',
              'aria-label': `Delivery Address`,
            }}
          >
            <DialogTitle id="modal-dialog-delivery-title">
              {`Delivery Address`}
            </DialogTitle>
            <Formik
              initialValues={{
                address1: addDeliveryAddress && addDeliveryAddress.address1,
                address2: addDeliveryAddress && addDeliveryAddress.address2,
                city: addDeliveryAddress && addDeliveryAddress.city,
                zip: addDeliveryAddress && addDeliveryAddress.zip,
                isdefault: false,
              }}
              validationSchema={Yup.object({
                address1: Yup.string()
                  .trim()
                  .max(40, 'Must be 40 characters or less')
                  .min(3, 'Must be at least 3 characters')
                  .required('Street address is required'),
                address2: Yup.string()
                  .trim()
                  .max(40, 'Must be 30 characters or less'),
                city: Yup.string()
                  .trim()
                  .max(40, 'Must be 40 characters or less')
                  .min(3, 'Must be at least 3 characters')
                  .required('City is required'),
                zip: Yup.string()
                  .trim()
                  .min(3, 'Must be at least 3 digits')
                  .max(5, 'Must be at most 5 digits')
                  .matches(
                    /^[0-9\s]+$/,
                    'Only numbers are allowed for this field ',
                  )
                  .required('Postal code is required'),
                isdefault: Yup.boolean(),
              })}
              onSubmit={async (values) => {}}
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
                  <DialogContent>
                    <DialogContentText id="Modal-dialog-delivery-description">
                      <Grid container sx={{ width: '100%', maxWidth: '450px' }}>
                        <Grid item xs={12}>
                          <TextField
                            aria-label="Address"
                            label="Street Address"
                            title="Street Address"
                            type="text"
                            name="address1"
                            autoComplete="off"
                            sx={{ width: '100%' }}
                            value={values.address1}
                            onChange={handleChange('address1')}
                            onBlur={handleBlur('address1')}
                            error={Boolean(touched.address1 && errors.address1)}
                            helperText={touched.address1 && errors.address1}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                          <TextField
                            aria-label="Apt, Floor, Suite, Building, Company Address - Optional"
                            label="Apt, Floor, Suite, Building, Company Address - Optional"
                            title="Apt, Floor, Suite, Building, Company Address - Optional"
                            type="text"
                            name="address2"
                            autoComplete="off"
                            sx={{ width: '100%' }}
                            value={values.address2}
                            onChange={handleChange('address2')}
                            onBlur={handleBlur('address2')}
                            error={Boolean(touched.address2 && errors.address2)}
                            helperText={touched.address2 && errors.address2}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                          <TextField
                            aria-label="City"
                            label="City"
                            title="City"
                            type="text"
                            name="city"
                            autoComplete="off"
                            sx={{ width: '100%' }}
                            value={values.city}
                            onChange={handleChange('city')}
                            onBlur={handleBlur('city')}
                            error={Boolean(touched.city && errors.city)}
                            helperText={touched.city && errors.city}
                          />
                        </Grid>
                        <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                          <TextField
                            aria-label="Postal Code"
                            label="Postal Code"
                            title="Postal Code"
                            type="text"
                            name="zip"
                            autoComplete="off"
                            sx={{ width: '100%' }}
                            value={values.zip}
                            onChange={handleChange('zip')}
                            onBlur={handleBlur('zip')}
                            error={Boolean(touched.zip && errors.zip)}
                            helperText={touched.zip && errors.zip}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <FormGroup>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={values.isdefault}
                                  onChange={handleChange('isdefault')}
                                />
                              }
                              label="Make default delivery address."
                              aria-label="Make default delivery address"
                              aria-required="true"
                              title="Make default delivery address"
                              name="isdefault"
                              className="size"
                            />
                          </FormGroup>
                        </Grid>
                      </Grid>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      onClick={handleClose}
                      sx={{ marginBottom: '15px' }}
                    >
                      Cancel
                    </Button>

                    <Button
                      variant="contained"
                      onClick={() => {
                        setAddDeliveryAddress({
                          address1: values.address1 || '',
                          address2: values.address2 || '',
                          city: values.city || '',
                          zip: values.zip || '',
                          isdefault: values.isdefault,
                        });
                        handleLCloseConfirm(
                          {
                            address1: values.address1 || '',
                            address2: values.address2 || '',
                            city: values.city || '',
                            zip: values.zip || '',
                            isdefault: values.isdefault,
                          },
                          null,
                        );
                      }}
                      sx={{ marginRight: '15px', marginBottom: '15px' }}
                      autoFocus
                      disabled={checkButtonDisabled(
                        values,
                        isValid,
                        dirty,
                        edit,
                      )}
                    >
                      Update Address
                    </Button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </Dialog>
          {/*{authToken?.authtoken ? (*/}
          {/*  <Grid*/}
          {/*    item*/}
          {/*    xs={12}*/}
          {/*    style={{*/}
          {/*      paddingBottom: '20px',*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <FormGroup>*/}
          {/*      <FormControlLabel*/}
          {/*        control={*/}
          {/*          <Checkbox*/}
          {/*            checked={*/}
          {/*              address && address.isdefault ? address.isdefault : false*/}
          {/*            }*/}
          {/*            onChange={(e) => {*/}
          {/*              // handleChange(e);*/}
          {/*              updateDefaultAddress(e);*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        }*/}
          {/*        label="Make default delivery address."*/}
          {/*        aria-label="Make default delivery address"*/}
          {/*        aria-required="true"*/}
          {/*        title="Make default delivery address"*/}
          {/*        name="saveAddressCheck"*/}
          {/*        className="size"*/}
          {/*      />*/}
          {/*    </FormGroup>*/}
          {/*  </Grid>*/}
          {/*) : null}*/}
        </form>
      )}
    </Formik>
  );
};

export default DeliveryForm;
