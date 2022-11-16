import {
  Grid,
  Typography,
  Button,
  DialogContentText,
  FormGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  TextField,
} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRestaurantInfoOrderType } from '../../redux/actions/restaurant';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  setBasketDeliveryAddress,
  setBasketDeliveryMode,
} from '../../services/basket';
import { setBasketDeliveryAddressSuccess } from '../../redux/actions/basket/checkout';
import { displayToast } from '../../helpers/toast';

export const OrderTypeDialog = ({ openModal, setOpenModal }: any) => {
  const dispatch = useDispatch();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const basketObj = useSelector((state: any) => state.basketReducer);

  const handleClose = () => {
    setOpenModal(false);
    setButtonDisabled(false);
  };

  const basketSuccess = (response: any) => {
    dispatch(setBasketDeliveryAddressSuccess(response));
    dispatch(setRestaurantInfoOrderType(response?.deliverymode));
    setButtonDisabled(false);
    displayToast('SUCCESS', 'Order updated!');
    handleClose();
  };

  const basketError = (error: any) => {
    setButtonDisabled(false);
    displayToast(
      'ERROR',
      error?.response?.data?.message
        ? error.response.data.message
        : 'ERROR! Please Try again later',
    );
  };

  const handleOrderUpdate = async (formData: any) => {
    setButtonDisabled(true);
    if (formData.orderType !== 'dispatch') {
      try {
        const body = {
          deliverymode: formData.orderType,
        };
        const response = await setBasketDeliveryMode(
          basketObj?.basket?.id,
          body,
        );
        basketSuccess(response);
      } catch (error: any) {
        basketError(error);
      }
    } else if (formData.address) {
      let updatedAddress: any = {
        building: formData?.address?.address2 || '',
        streetaddress: formData?.address?.address1 || '',
        city: formData?.address?.city || '',
        zipcode: formData?.address?.zip || '',
        isdefault: formData?.address?.isdefault || false,
      };
      try {
        const response = await setBasketDeliveryAddress(
          basketObj?.basket?.id,
          updatedAddress,
        );
        basketSuccess(response);
      } catch (error: any) {
        basketError(error);
      }
    }
  };

  const checkButtonDisable = (values: any, isValid: any) => {
    console.log('isValid', isValid)
    console.log('buttonDisabled', buttonDisabled)
    console.log('values', values)
    return (
      buttonDisabled ||
      (values.orderType !== 'dispatch' && values.orderType === orderType) ||
      (values.orderType === 'dispatch' && !isValid)
    );
  };

  return (
    <Dialog
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-dialog-delivery-address"
      aria-describedby="modal-dialog-delivery-address-form"
      sx={{ width: '100%' }}
      TransitionProps={{
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': `Change Order Type`,
      }}
      fullWidth
    >
      <DialogTitle id="modal-dialog-delivery-title">{`Edit Order`}</DialogTitle>
      <Formik
        initialValues={{
          orderType: basketObj?.basket?.deliverymode || orderType || 'pickup',
          address1: basketObj?.basket?.deliveryaddress?.streetaddress || '',
          address2: basketObj?.basket?.deliveryaddress?.building || '',
          city: basketObj?.basket?.deliveryaddress?.city || '',
          zip: basketObj?.basket?.deliveryaddress?.zipcode || '',
          isdefault: basketObj?.basket?.deliveryaddress?.isdefault || false,
        }}
        validationSchema={Yup.object({
          orderType: Yup.string(),
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
            .matches(/^[0-9\s]+$/, 'Only numbers are allowed for this field ')
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
              <DialogContentText id="alert-dialog-description">
                <Grid container sx={{ width: '100%' }}>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Order Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.orderType}
                        label="Order Type"
                        name={'orderType'}
                        onChange={handleChange}
                        style={{ textAlign: 'left' }}
                      >
                        <MenuItem value={'pickup'}>Pickup</MenuItem>
                        <MenuItem value={'curbside'}>Curbside</MenuItem>
                        <MenuItem value={'dinein'}>Dine In</MenuItem>
                        <MenuItem value={'dispatch'}>Delivery</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {values.orderType === 'dispatch' && (
                    <>
                      <Grid item xs={12}>
                        <Typography
                          style={{
                            padding: '10px 0px',
                            fontFamily:
                              "'Poppins-Regular', sans-serif !important",
                            color: '#000000',
                          }}
                          textAlign={'center'}
                          variant={'body1'}
                        >
                          {`Delivery Address`}
                        </Typography>
                      </Grid>
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
                          name="second_address"
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
                          name="City"
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
                          name="postal_code"
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
                    </>
                  )}
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
                  handleOrderUpdate({
                    address: {
                      address1: values.address1 || '',
                      address2: values.address2 || '',
                      city: values.city || '',
                      zip: values.zip || '',
                      isdefault: values.isdefault,
                    },
                    orderType: values.orderType,
                  });
                }}
                sx={{ marginRight: '15px', marginBottom: '15px' }}
                autoFocus
                disabled={checkButtonDisable(values, isValid)}
              >
                Update
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
};
