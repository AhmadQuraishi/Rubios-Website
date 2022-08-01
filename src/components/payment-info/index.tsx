import React, { forwardRef } from 'react';
import {
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import './payment-info.css';
import SplitPayment from './split-payment';
import AddGiftCard from './add-gift-card';
// import AddCreditCard from './add-credit-card';
// import AddCreditCardCopy from './add-credit-card-copy';
import { displayToast } from '../../helpers/toast';
import {
  getCreditCardObj,
  updatePaymentCardsAmount,
} from '../../helpers/checkout';
import { updateBasketBillingSchemes } from '../../redux/actions/basket/checkout';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseBasket } from '../../types/olo-api';

const PaymentInfo = forwardRef((props: any, _ref) => {
  const { ccsfObj, basketAccessToken } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hideShow, setHideShow] = React.useState<boolean>(false);
  const [zipCode, setZipCode] = React.useState<any>();
  const [cardExpiry, setCardExpiry] = React.useState<any>();
  const [billingSchemes, setBillingSchemes] = React.useState<any>([]);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const basketObj = useSelector((state: any) => state.basketReducer);

  React.useEffect(() => {
    setBillingSchemes(basketObj.payment.billingSchemes);
  }, [basketObj.payment.billingSchemes]);

  React.useEffect(() => {
    if (basketObj.basket) {
      setBasket(basketObj.basket);
    }
  }, [basketObj.basket]);

  const handleHideShow = () => {
    setHideShow(!hideShow);
  };

  const handleZipCodeChange = (event: any) => {
    let newValue = event.target.value.trim();
    newValue =
      newValue && newValue >= 0 && newValue <= 99999
        ? parseInt(newValue)
        : newValue > 99999
        ? zipCode
        : '';

    setZipCode(newValue);
  };

  const handleCreditCardSubmit = async () => {
    setButtonDisabled(true);
    // const { isValidCard, cardDetails, errors } = await validatePaymentForm();

    // if (!isValidCard) {
    //   displayToast('ERROR', errors?.message);
    //   setButtonDisabled(false);
    //   return;
    // }

    if (ccsfObj) {
      ccsfObj.registerError((errors: any) => {
        console.log('ccsf error 2', errors);

        errors.forEach((error: any) => {
          console.log(error.code);
          console.log(error.description);
          if (
            error.description &&
            error.description ===
              'The sum of your selected payment methods must equal the order total.'
          ) {
            let billingSchemesNewArray = billingSchemes;
            const obj = {
              exp_year: 2024,
              exp_month: 10,
              postal_code: 12345,
            };
            let cardObj: any = getCreditCardObj(obj, billingSchemes);

            Array.prototype.push.apply(billingSchemesNewArray, cardObj);

            billingSchemesNewArray = updatePaymentCardsAmount(
              billingSchemesNewArray,
              basket,
            );

            dispatch(updateBasketBillingSchemes(billingSchemesNewArray));
            if (!isMobile) {
              displayToast('SUCCESS', 'Credit Card Added');
            }
            setButtonDisabled(false);
            handleHideShow();
          } else {
            displayToast('ERROR', error.description);
          }
        });
      });
      ccsfObj.submit({
        id: basket && basket.id,
        accessToken: basketAccessToken,
        billingaccounts: [
          {
            billingmethod: 'creditcard',
            // amount: 31.25,
            // tipportion: 0,
            expiryyear: 2033,
            expirymonth: 12,
            zip: '12312',
            saveonfile: true,
          },
        ],
      });
    }
  };
  return (
    <Grid container>
      {/*column for space*/}
      <Grid item xs={0} sm={0} md={2} lg={2} />

      <Grid item style={{ paddingBottom: 30 }} xs={12} sm={12} md={8} lg={8}>
        <Typography variant="h2" title="PAYMENT INFO">
          PAYMENT INFO
        </Typography>
        <br />
        <Grid container spacing={2} className="payment-form">
          <SplitPayment />
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} className="add-gift">
              <h2>Modal Example</h2>

              <button onClick={() => handleHideShow()} id="myBtn">
                Open Modal
              </button>

              <div
                id="myModal"
                className={`modal ${hideShow ? 'show' : 'hide'}`}
              >
                {/*<div className="modal-content">*/}
                {/*  <span  className="close">&times;</span>*/}
                {/*  <p>Some text in the Modal..</p>*/}
                {/*</div>*/}
                <div className="modal-content">
                  <div className="modal-header">
                    <span onClick={() => handleHideShow()} className="close">
                      &times;
                    </span>
                    <h2>Modal Header</h2>
                  </div>
                  <div className="modal-body">
                    <Grid container className="payment-form" spacing={2}>
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
                            className="payment-form image-field align"
                          >
                            {/*<div*/}
                            {/*  tabIndex={0}*/}
                            {/*  className="card-fields"*/}
                            {/*  data-olo-pay-card-number*/}
                            {/*/>*/}
                            <div className="card-fields">
                              <div className="credit-card-info-div"></div>
                            </div>
                            <img
                              alt="card icon"
                              src={require('../../assets/imgs/card-icon.png')}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            {/*<div className="card-fields" data-olo-pay-card-cvc />*/}
                            <div className="card-fields">
                              <div className="cvv-info-div"></div>
                            </div>
                            <img
                              alt="cvc icon"
                              src={require('../../assets/imgs/ccv-icon.png')}
                            />
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
                            className="payment-form image-field align"
                          >
                            {/*<div className="card-fields" data-olo-pay-card-expiry />*/}
                            <TextField
                              className="zipcode"
                              aria-label="Card Expiry"
                              placeholder="Card Expiry"
                              type="text"
                              name="expiry"
                              inputProps={{ shrink: false }}
                              value={cardExpiry}
                              onChange={handleZipCodeChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                              className="zipcode"
                              aria-label="Zip Code"
                              placeholder="Zip Code"
                              type="text"
                              name="zipcode"
                              inputProps={{ shrink: false }}
                              value={zipCode}
                              onChange={handleZipCodeChange}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Button
                      aria-label="Cancel"
                      title="Cancel"
                      className="link"
                      // onClick={handleCloseAddCreditCard}
                    >
                      Cancel{' '}
                    </Button>
                    <Button
                      aria-label="Add Gift Card"
                      title="Add Gift Card"
                      type="submit"
                      className="link default"
                      onClick={handleCreditCardSubmit}
                      // disabled={buttonDisabled}
                      autoFocus
                    >
                      Add Credit Card
                    </Button>
                  </div>
                  <div className="modal-footer">
                    <h3>Modal Footer</h3>
                  </div>
                </div>
              </div>

              {/*<AddCreditCard />*/}
              {/*<AddCreditCardCopy />*/}
              <AddGiftCard />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/*column for space*/}
      <Grid item xs={0} sm={0} md={2} lg={2} />
    </Grid>
  );
});

export default PaymentInfo;
