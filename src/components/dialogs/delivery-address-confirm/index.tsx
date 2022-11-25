import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from '@mui/material';
import * as Yup from 'yup';
import { Formik } from 'formik';
const DeliveryAddressConfirmDialog = ({
  open,
  selectedAddress,
  handleClose,
  setSelectedAddress,
  handleLCloseConfirm,
}: any) => {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ width: '100%' }}
      TransitionProps={{
        role: 'dialog',
        'aria-modal': 'true',
        'aria-label': 'Confirm Your Delivery Address',
      }}
    >
      <DialogTitle id="alert-dialog-title">
        {'Confirm Your Delivery Address'}
      </DialogTitle>
      {selectedAddress && (
        <Formik
          initialValues={{
            address1: selectedAddress && selectedAddress.address1,
            address2: selectedAddress && selectedAddress.address2,
            city: selectedAddress && selectedAddress.city,
            zip: selectedAddress && selectedAddress.zip,
            isdefault: (selectedAddress && selectedAddress.isdefault) || false,
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
                    setSelectedAddress({
                      address1: values.address1 || '',
                      address2: values.address2 || '',
                      city: values.city || '',
                      zip: values.zip || '',
                      isdefault: values.isdefault,
                    });
                    handleLCloseConfirm({
                      address1: values.address1 || '',
                      address2: values.address2 || '',
                      city: values.city || '',
                      zip: values.zip || '',
                      isdefault: values.isdefault,
                    });
                  }}
                  sx={{ marginRight: '15px', marginBottom: '15px' }}
                  autoFocus
                  disabled={
                    values.address1 === '' ||
                    values.city === '' ||
                    values.zip === '' ||
                    !isValid
                  }
                >
                  Confirm
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      )}
    </Dialog>
  );
};

export default DeliveryAddressConfirmDialog;
