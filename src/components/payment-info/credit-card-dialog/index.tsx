import React, { forwardRef, useImperativeHandle } from 'react';
import { Grid, TextField, useTheme } from '@mui/material';
import { IMaskInput } from 'react-imask';

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
        mask="00/00"
        // definitions={{
        //   '#': /[1-9]/,
        // }}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  },
);

const CreditCardAdd = (props: any) => {
  const {
    cardOnScreen,
    diplayOnScreenCreditCardForm,
    handleZipCodeChange,
    handleCardExpiryChange,
    cardExpiry,
    zipCode,
    cardNumberClass,
    cardCVVClass,
  } = props;
  const theme = useTheme();

  return (
    <>
      <Grid
        style={{
          display:
            cardOnScreen && !diplayOnScreenCreditCardForm() ? 'none' : 'block',
        }}
        container
        className="payment-form"
        spacing={2}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          className="payment-form image-field align"
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              textAlign={'left'}
              className="payment-form image-field align"
            >
              {/*<div*/}
              {/*  tabIndex={0}*/}
              {/*  className="card-fields"*/}
              {/*  data-olo-pay-card-number*/}
              {/*/>*/}
              <label className="add-credit-card-label" htmlFor="cardnumber">
                Card Number
              </label>
              <div className="card-fields">
                <div
                  style={{ display: 'contents' }}
                  className={cardNumberClass}
                ></div>
              </div>
              <div>
                <img
                  alt=""
                  src={require('../../../assets/imgs/card-icon.png')}
                />
              </div>
            </Grid>
            <Grid textAlign={'left'} item xs={12} sm={6} md={6} lg={6}>
              {/*<div className="card-fields" data-olo-pay-card-cvc />*/}
              <label className="add-credit-card-label" htmlFor="cvv">
                CVV
              </label>
              <div className="card-fields">
                <div
                  style={{ display: 'contents' }}
                  className={cardCVVClass}
                ></div>
              </div>
              <div>
                <img
                  alt=""
                  src={require('../../../assets/imgs/ccv-icon.png')}
                />
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={6}
              textAlign={'left'}
              className="payment-form image-field align"
            >
              <label className="add-credit-card-label" htmlFor="card-expiry">
                Card Expiry MM/YY
              </label>
              <TextField
                className="zipcode"
                aria-label="Card Expiry"
                // placeholder="Card Expiry MM/YY"
                value={cardExpiry}
                onChange={handleCardExpiryChange}
                name="phone"
                InputProps={{
                  inputComponent: NumberFormatCustom as any,
                }}
                id="card-expiry"
              />
            </Grid>
            <Grid textAlign={'left'} item xs={12} sm={6} md={6} lg={6}>
              <label className="add-credit-card-label" htmlFor="card-zipcode">
                Zip Code
              </label>
              <TextField
                className="zipcode"
                aria-label="Zip Code"
                // placeholder="Zip Code"
                type="number"
                name="zipcode"
                inputProps={{ shrink: false }}
                value={zipCode}
                onChange={handleZipCodeChange}
                id="card-zipcode"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CreditCardAdd;
