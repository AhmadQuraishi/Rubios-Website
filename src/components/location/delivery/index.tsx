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
  Divider
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import { getAddress } from '../../../helpers/common';
import { getNearByResturantListRequest } from '../../../redux/actions/restaurant/list';
import DeliveryAddressSkeltonUI from '../../skelton-views/delivery-address'
import './index.css';

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
  const [addDeliveryAddress, setAddDeliveryAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    zip: '',
  });
  const [editDeliveryAddress, setEditDeliveryAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    zip: '',
  });

  const handleClickOpen = () => {
    console.log('working')
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false)
  };

  useEffect(() => {
    console.log('open', open)
  }, [open])

  const handleChange = (key: any, value: any) => {
    if (key === 'address1') {
      setAddDeliveryAddress({ ...addDeliveryAddress, address1: value });
    }
    if (key === 'address2') {
      setAddDeliveryAddress({ ...addDeliveryAddress, address2: value });
    }
    if (key === 'city') {
      setAddDeliveryAddress({ ...addDeliveryAddress, city: value });
    }
    if (key === 'zip') {
      let newValue = value;
      newValue =
        newValue && newValue >= 0 && newValue <= 99999
          ? parseInt(newValue)
          : newValue > 99999
          ? addDeliveryAddress.zip
          : '';
      setAddDeliveryAddress({ ...addDeliveryAddress, zip: newValue });
    }
  };

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

  const handleLCloseConfirm = () => {
    setOpen(false);
    setEdit(false)
    getGeocode({
      address:
        addDeliveryAddress.address1 +
        ' ' +
        addDeliveryAddress.address2 +
        ', ' +
        addDeliveryAddress.city +
        ', ' +
        addDeliveryAddress.zip,
    })
      .then((results) => {
        getLatLng(results[0]).then(({ lat, lng }) => {
          const address = getAddress(results[0]);
          console.log('address', address)
          console.log('addDeliveryAddress', addDeliveryAddress)


          if (address.address1 !== '') {
            //setLatLng({ lat: lat, lng: lng });
            setDeliveryAddressString(addDeliveryAddress);
            setEditDeliveryAddress(addDeliveryAddress)
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
            setEditDeliveryAddress(addDeliveryAddress);
            setNotFound(true);
          }
        });
      })
      .catch((err) => {
        setEditDeliveryAddress(addDeliveryAddress);
        setNotFound(true);
      });
  };

  useEffect(() => {
console.log('addDeliveryAddress', addDeliveryAddress)
console.log('editDeliveryAddress', editDeliveryAddress)
  }, [addDeliveryAddress, addDeliveryAddress])

  return (
    <Grid item xs={12} style={{ position: 'relative', marginTop: -32 }}>
      {
        loading ? (
          <DeliveryAddressSkeltonUI />
        ) : (
          <>
            {filteredRestaurants && filteredRestaurants.length > 0 ? (
              <>
                <Grid item xs={12} >
                  <Typography className={'delivery-heading-text'} variant="body2">
                    DELIVERY IS AVAILABLE FOR THIS ADDRESS
                  </Typography>

                  <Typography style={{padding: '15px 0px 25px'}} className={'delivery-address-text'} variant="body2">
                    {
                      editDeliveryAddress && (
                        `${editDeliveryAddress.address1}, ${editDeliveryAddress.city}, ${editDeliveryAddress.zip} `
                      )
                    }
                  </Typography>
                  <Button
                    aria-label="START ORDER BUTTON"
                    variant="contained"
                    title="START ORDER"
                    name="START ORDER"
                    style={{width: '100%'}}
                    onClick={() => gotoCategoryPage(filteredRestaurants[0].id)}
                  >
                    START ORDER
                  </Button>
                </Grid>
              </>
            ) : editDeliveryAddress?.address1 !== '' && notFound ? (
              <>
                <Grid item xs={12} >
                  <Typography className={'delivery-heading-text'} variant="body2">
                    DELIVERY IS UNAVAILABLE FOR THIS ADDRESS
                  </Typography>
                  <Typography style={{padding: '15px 0px 5px 0px'}} className={'delivery-address-text'} variant="body2">
                    {
                      editDeliveryAddress && (
                        `${editDeliveryAddress.address1}, ${editDeliveryAddress.city}, ${editDeliveryAddress.zip} `
                      )
                    }
                  </Typography>
                  <Typography
                    onClick={() => {
                      setAddDeliveryAddress(editDeliveryAddress)
                      setEdit(true)
                      handleClickOpen();
                    }}
                    variant="body2"
                    className={'delivery-heading-text'}
                    style={{cursor: 'pointer'}}
                  >
                    EDIT
                  </Typography>
                  <Divider sx={{  margin: '20px 0px 16px 0px' }} />
                  <Typography
                    onClick={() => {
                      setAddDeliveryAddress({
                        address1: '',
                        address2: '',
                        city: '',
                        zip: '',
                      })
                      handleClickOpen();
                    }}
                    style={{cursor: 'pointer'}}
                    className={'delivery-heading-text'}
                    variant="body2"
                  >
                    + ADD NEW ADDRESS
                  </Typography>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} >
                  <Typography className={'delivery-heading-text'} variant="body2">DELIVERY ADDRESSES</Typography>
                  <Typography style={{padding: '10px 0px'}} className={'delivery-address-text'}  variant="body2">Select a delivery address below, or add new.</Typography>
                </Grid>
                <Grid style={{
                  overflow: 'hidden auto',
                  maxHeight: 200,
                  // minHeight: 100,
                }} item xs={12} >
                  {!loading &&
                    deliveryAddressList
                      .map((address: any, index: number) => (

                        <Card key={index + address.id} style={{
                          padding: '15px 0px',
                          width: '100%',
                          borderRadius: 'inherit',
                          boxShadow: 'none',
                          background: address.isdefault ? '#f2f6fb' : 'none'
                        }} >
                          <CardContent style={{
                            padding: 0,
                          }} >
                            <Typography style={{cursor: 'pointer'}}  className='delivery-address-text' onClick={() => {
                              setAddDeliveryAddress({
                                address1: address.streetaddress || '',
                                address2: '',
                                city: address.city || '',
                                zip: address.zipcode || '',
                              })
                              setEditDeliveryAddress({
                                address1: address.streetaddress || '',
                                address2: '',
                                city: address.city || '',
                                zip: address.zipcode || '',
                              })
                              setTimeout(() => {
                                handleLCloseConfirm();
                              }, 1000)

                            }} variant="body2">
                              {address.streetaddress}, {address.city}, {address.zipcode}
                            </Typography>
                            <Typography className={'delivery-heading-text'} style={{cursor: 'pointer'}} onClick={() => {
                              setAddDeliveryAddress({
                                address1: address.streetaddress || '',
                                address2: '',
                                city: address.city || '',
                                zip: address.zipcode || '',
                              })
                              setEdit(true)
                              handleClickOpen();
                            }} variant="body2">EDIT</Typography>
                          </CardContent>
                        </Card>
                      ))}

                </Grid>
                <Grid item xs={12} >
                  <Divider sx={{  margin: '20px 0px 16px 0px' }} />
                </Grid>
                <Grid item xs={12} >
                  <Typography
                    onClick={() => {
                      handleClickOpen();
                    }}
                    variant="body2"
                    className={'delivery-heading-text'}
                    style={{cursor: 'pointer'}}
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
                'aria-label': `${edit ? 'Edit' : 'Add'} Your Delivery Address` ,
              }}
            >
              <DialogTitle id="modal-dialog-delivery-title">
                {`${edit ? 'Edit' : 'Add'} Your Delivery Address`}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="Modal-dialog-delivery-description">
                  <Grid container sx={{ width: '100%', maxWidth: '450px' }}>
                    <Grid item xs={12}>
                      <TextField
                        aria-label="Address"
                        label="Street Address"
                        title="Street Address"
                        type="text"
                        name="street_address"
                        autoComplete="off"
                        sx={{ width: '100%' }}
                        value={addDeliveryAddress && addDeliveryAddress.address1}
                        onChange={(e) => {
                          handleChange('address1', e.target.value);
                        }}

                        // onChange={handleChange('last_name')}
                        // onBlur={handleBlur('last_name')}
                        // error={Boolean(touched.last_name && errors.last_name)}
                        // helperText={touched.last_name && errors.last_name}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                      <TextField
                        aria-label="Apt, Floor, Suite, Building, Company Address - Optional"
                        label="Apt, Floor, Suite, Building, Company Address - Optional"
                        title="Apt, Floor, Suite, Building, Company Address - Optional"
                        type="text"
                        name="second_address"
                        autoComplete="off"
                        sx={{ width: '100%' }}
                        value={addDeliveryAddress && addDeliveryAddress.address2}
                        onChange={(e) => {
                          handleChange('address2', e.target.value);
                        }}

                        // onChange={handleChange('last_name')}
                        // onBlur={handleBlur('last_name')}
                        // error={Boolean(touched.last_name && errors.last_name)}
                        // helperText={touched.last_name && errors.last_name}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                      <TextField
                        aria-label="City"
                        label="City"
                        title="City"
                        type="text"
                        name="City"
                        autoComplete="off"
                        sx={{ width: '100%' }}
                        value={addDeliveryAddress && addDeliveryAddress.city}
                        onChange={(e) => {
                          handleChange('city', e.target.value);
                        }}

                        // onBlur={handleBlur('last_name')}
                        // error={Boolean(touched.last_name && errors.last_name)}
                        // helperText={touched.last_name && errors.last_name}
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ paddingTop: '10px' }}>
                      <TextField
                        aria-label="Postal Code"
                        label="Postal Code"
                        title="Postal Code"
                        type="text"
                        name="postal_code"
                        autoComplete="off"
                        sx={{ width: '100%' }}
                        value={addDeliveryAddress && addDeliveryAddress.zip}
                        onChange={(e) => {
                          handleChange('zip', e.target.value.trim());
                        }}

                        // onBlur={handleBlur('last_name')}
                        // error={Boolean(touched.last_name && errors.last_name)}
                        // helperText={touched.last_name && errors.last_name}
                      />
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
                  onClick={handleLCloseConfirm}
                  sx={{ marginRight: '15px', marginBottom: '15px' }}
                  autoFocus
                  disabled={
                    addDeliveryAddress &&
                    (addDeliveryAddress.address1 === '' ||
                      addDeliveryAddress.city === '' ||
                      addDeliveryAddress.zip === '')
                  }
                >
                  {edit ? 'Edit' : 'Add'}
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )
      }

    </Grid>
  );
};

export default DeliveryAddresses;
