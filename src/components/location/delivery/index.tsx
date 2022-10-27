import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { getAddress } from '../../../helpers/common';
import { getNearByResturantListRequest } from '../../../redux/actions/restaurant/list';
import DeliveryAddressSkeltonUI from '../../skelton-views/delivery-address';
import './index.css';
// import { RequestDeliveryAddress } from '../../../types/olo-api';
// import * as Yup from 'yup';
// import moment from 'moment';
// import { userRegister } from '../../../redux/actions/user';
import { Formik } from 'formik';
import * as Yup from 'yup';

const DeliveryAddresses = (props: any) => {
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
  const [notFound, setNotFound] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [addDeliveryAddress, setAddDeliveryAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    zip: '',
    isdefault: false,
  });
  const [editDeliveryAddress, setEditDeliveryAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    zip: '',
    isdefault: false,
  });

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

  // const handleChange = (key: any, value: any) => {
  //   if (key === 'address1') {
  //     setAddDeliveryAddress({ ...addDeliveryAddress, address1: value });
  //   }
  //   if (key === 'address2') {
  //     setAddDeliveryAddress({ ...addDeliveryAddress, address2: value });
  //   }
  //   if (key === 'city') {
  //     // console.log('value', value)
  //     // let newValue = value.trim().replace(/[^\s*a-zA-Z]/gi, '');
  //     // console.log('newValue', newValue)
  //     setAddDeliveryAddress({ ...addDeliveryAddress, city: value });
  //   }
  //   if (key === 'zip') {
  //     let newValue = value.replace(/[^0-9]/gi, '');
  //     newValue = newValue.length > 5 ? newValue.slice(0, 5) : newValue;
  //     const regex = /[0-9]+/g;
  //     if (newValue === '' || regex.test(newValue)) {
  //       setAddDeliveryAddress({ ...addDeliveryAddress, zip: newValue });
  //     }
  //
  //     // let newValue = value;
  //     // newValue =
  //     //   newValue && newValue >= 0 && newValue <= 99999
  //     //     ? parseInt(newValue)
  //     //     : newValue > 99999
  //     //     ? addDeliveryAddress.zip
  //     //     : '';
  //     // newValue = newValue.length > 5 ? newValue.slice(0, 5) : newValue;
  //     // setAddDeliveryAddress({ ...addDeliveryAddress, zip: newValue });
  //   }
  //   if (key === 'isdefault') {
  //     setAddDeliveryAddress({ ...addDeliveryAddress, isdefault: value });
  //   }
  // };

  const getNearByRestaurants = (lat: number, long: number) => {
    var today = new Date();
    const dateFrom =
      today.getFullYear() * 1e4 +
      (today.getMonth() + 1) * 100 +
      today.getDate() +
      '';
    const lastWeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 6,
    );
    const dateTo =
      lastWeekDate.getFullYear() * 1e4 +
      (lastWeekDate.getMonth() + 1) * 100 +
      lastWeekDate.getDate() +
      '';
    dispatch(getNearByResturantListRequest(lat, long, 10, 6, dateFrom, dateTo));
  };

  const handleLCloseConfirm = (address: any, id: any) => {
    setOpen(false);
    setEdit(false);
    console.log('addDeliveryAddress 1', addDeliveryAddress);
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
            setEditDeliveryAddress(address);
            getNearByRestaurants(lat, lng);
            setActionPerform(false);
            setShowNearBy(true);
            setSelectedLatLng({
              lat: lat,
              lng: lng,
            });
            setNotFound(false);
            return;
          } else {
            setEditDeliveryAddress(address);
            setNotFound(true);
          }
        });
      })
      .catch((err) => {
        setEditDeliveryAddress(address);
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
    console.log('editDeliveryAddress', editDeliveryAddress);
  }, [addDeliveryAddress, addDeliveryAddress]);

  useEffect(() => {
    console.log('notFound', notFound);
  }, [notFound]);

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

  return (
    <Grid item xs={12} style={{ position: 'relative', marginTop: -32 }}>
      {loading ? (
        <DeliveryAddressSkeltonUI />
      ) : (
        <>
          {filteredRestaurants && filteredRestaurants.length > 0 ? (
            <>
              <Grid sx={{ paddingBottom: '150px' }} item xs={12}>
                <Typography className={'delivery-heading-text'} variant="body2">
                  DELIVERY IS AVAILABLE FOR THIS ADDRESS
                </Typography>

                <Typography
                  style={{ padding: '15px 0px 25px' }}
                  className={'delivery-address-text'}
                  variant="body2"
                >
                  {editDeliveryAddress &&
                    `${editDeliveryAddress.address1}, ${editDeliveryAddress.city}, ${editDeliveryAddress.zip} `}
                </Typography>
                <Button
                  aria-label="START ORDER BUTTON"
                  variant="contained"
                  title="START ORDER"
                  name="START ORDER"
                  style={{ width: '100%' }}
                  onClick={() => gotoCategoryPage(filteredRestaurants[0].id)}
                >
                  START ORDER
                </Button>
              </Grid>
            </>
          ) : editDeliveryAddress &&
            editDeliveryAddress.address1 !== '' &&
            notFound ? (
            <>
              <Grid sx={{ paddingBottom: '150px' }} item xs={12}>
                <Typography
                  style={{ color: 'red' }}
                  className={'delivery-heading-text'}
                  variant="body2"
                >
                  DELIVERY IS UNAVAILABLE FOR THIS ADDRESS
                </Typography>
                <Typography
                  style={{ padding: '15px 0px 5px 0px' }}
                  className={'delivery-address-text'}
                  variant="body2"
                >
                  {editDeliveryAddress &&
                    `${editDeliveryAddress.address1}, ${editDeliveryAddress.city}, ${editDeliveryAddress.zip} `}
                </Typography>
                <Typography
                  onClick={() => {
                    setAddDeliveryAddress(editDeliveryAddress);
                    setEdit(true);
                    handleClickOpen();
                  }}
                  variant="body2"
                  className={'delivery-heading-text'}
                  style={{ cursor: 'pointer', display: 'inline' }}
                >
                  EDIT
                </Typography>
                <Divider sx={{ margin: '20px 0px 16px 0px' }} />
                <Typography
                  onClick={() => {
                    setAddDeliveryAddress({
                      address1: '',
                      address2: '',
                      city: '',
                      zip: '',
                      isdefault: false,
                    });
                    setSelectedAddressId(null);
                    handleClickOpen();
                  }}
                  style={{ cursor: 'pointer' }}
                  className={'delivery-heading-text'}
                  variant="body2"
                >
                  + ADD NEW ADDRESS
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <Typography className={'delivery-heading-text'} variant="body2">
                  DELIVERY ADDRESSES
                </Typography>
                <Typography
                  style={{ padding: '10px 0px' }}
                  className={'delivery-address-text'}
                  variant="body2"
                >
                  Select a delivery address below, or add new.
                </Typography>
              </Grid>
              <Grid
                style={{
                  overflow: 'hidden auto',
                  maxHeight: 200,
                  // minHeight: 100,
                }}
                item
                xs={12}
              >
                {!loading &&
                  deliveryAddressList.map((address: any, index: number) => (
                    <Card
                      key={index + address.id}
                      style={{
                        padding: '15px 0px',
                        width: '100%',
                        borderRadius: 'inherit',
                        boxShadow: 'none',
                        background: address.isdefault ? '#f2f6fb' : 'none',
                      }}
                    >
                      <CardContent
                        style={{
                          padding: 0,
                        }}
                      >
                        <Typography
                          style={{ cursor: 'pointer' }}
                          className="delivery-address-text"
                          onClick={() => {
                            // setAddDeliveryAddress({
                            //   address1: address.streetaddress || '',
                            //   address2: '',
                            //   city: address.city || '',
                            //   zip: address.zipcode || '',
                            // });
                            // setEditDeliveryAddress({
                            //   address1: address.streetaddress || '',
                            //   address2: '',
                            //   city: address.city || '',
                            //   zip: address.zipcode || '',
                            // });
                            setSelectedAddressId(address.id);
                            // setTimeout(() => {
                            handleLCloseConfirm(
                              {
                                address1: address.streetaddress || '',
                                address2: address.building || '',
                                city: address.city || '',
                                zip: address.zipcode || '',
                                isdefault: address.isdefault,
                              },
                              address.id,
                            );
                            // }, 500);
                          }}
                          variant="body2"
                        >
                          {address.streetaddress}, {address.city},{' '}
                          {address.zipcode}
                        </Typography>
                        <Typography
                          className={'delivery-heading-text'}
                          style={{ cursor: 'pointer', display: 'inline' }}
                          onClick={() => {
                            setAddDeliveryAddress({
                              address1: address.streetaddress || '',
                              address2: address.building || '',
                              city: address.city || '',
                              zip: address.zipcode || '',
                              isdefault: address.isdefault,
                            });
                            setEdit(true);
                            setSelectedAddressId(address.id);
                            handleClickOpen();
                          }}
                          variant="body2"
                        >
                          EDIT
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Grid>
              <Grid item xs={12}>
                <Divider sx={{ margin: '20px 0px 16px 0px' }} />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  onClick={() => {
                    setAddDeliveryAddress({
                      address1: '',
                      address2: '',
                      city: '',
                      zip: '',
                      isdefault: false,
                    });
                    setSelectedAddressId(null);
                    handleClickOpen();
                  }}
                  variant="body2"
                  className={'delivery-heading-text'}
                  style={{ cursor: 'pointer' }}
                >
                  + ADD NEW ADDRESS
                </Typography>
              </Grid>
            </>
          )}
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
                      {edit ? 'Confirm' : 'Add'} Address
                    </Button>
                  </DialogActions>
                </form>
              )}
            </Formik>
          </Dialog>
        </>
      )}
    </Grid>
  );
};

export default DeliveryAddresses;
