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
import AddCreditCard from './add-credit-card';
// import AddCreditCardCopy from './add-credit-card-copy';
import { displayToast } from '../../helpers/toast';
import {
  getBillingSchemesStats,
  getCreditCardObj,
  updatePaymentCardsAmount,
} from '../../helpers/checkout';
import { updateBasketBillingSchemes } from '../../redux/actions/basket/checkout';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseBasket } from '../../types/olo-api';
import { IMaskInput } from 'react-imask';
import moment from 'moment';

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

const PaymentInfo = forwardRef((props: any, _ref) => {
  const { ccsfObj, basketAccessToken } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hideShow, setHideShow] = React.useState<boolean>(false);
  const [editCreditCard, setEditCreditCard] = React.useState<boolean>(false);
  const [zipCode, setZipCode] = React.useState<any>();
  const [cardExpiry, setCardExpiry] = React.useState<any>();
  const [billingSchemes, setBillingSchemes] = React.useState<any>([]);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [allowedCards, setAllowedCards] = React.useState<any>();
  const basketObj = useSelector((state: any) => state.basketReducer);

  React.useEffect(() => {
    setBillingSchemes(basketObj.payment.billingSchemes);
  }, [basketObj.payment.billingSchemes]);

  React.useEffect(() => {
    if (basketObj.basket) {
      setBasket(basketObj.basket);
    }
  }, [basketObj.basket]);

  React.useEffect(() => {
    if (!hideShow) {
      setEditCreditCard(false);
    }
  }, [hideShow]);

  React.useEffect(() => {
    if (
      basketObj.payment.allowedCards &&
      basketObj.payment.allowedCards.data &&
      basketObj.payment.allowedCards.data.billingschemes
    ) {
      setAllowedCards(basketObj.payment.allowedCards.data.billingschemes);
    }
  }, [basketObj.payment.allowedCards]);

  const handleHideShow = () => {
    setHideShow(!hideShow);
  };

  const handleZipCodeChange = (event: any) => {
    let newValue = event.target.value.trim();
    newValue = newValue.replace(/[^0-9]/gi, '');
    newValue = newValue.length > 5 ? newValue.slice(0, 5) : newValue;
    const regex = /[0-9]+/g;
    if (newValue === '' || regex.test(newValue)) {
      setZipCode(newValue);
    }
    // newValue =
    //   newValue && newValue >= 0 && newValue <= 99999
    //     ? parseInt(newValue)
    //     : newValue > 99999
    //     ? zipCode
    //     : '';

    // newValue = newValue.length > 5 ? newValue.slice(0, 5) : newValue;
    //
    // setZipCode(newValue);
  };

  const handleCardExpiryChange = (event: any) => {
    let newValue = event.target.value.trim();

    setCardExpiry(newValue);
  };

  const handleCreditCardSubmit = async () => {
    setButtonDisabled(true);
    if (!zipCode || zipCode === '') {
      displayToast('ERROR', 'Zip Code is required');
      setButtonDisabled(false);
      return;
    }

    if (!cardExpiry || cardExpiry === '') {
      displayToast('ERROR', 'Card Expiry is required');
      setButtonDisabled(false);
      return;
    } else if (cardExpiry.length !== 5) {
      displayToast('ERROR', 'Please enter valid date.');
      setButtonDisabled(false);
      return;
    } else {
      const currentDate: any = moment(new Date());
      const expiryDate: any = moment(cardExpiry, 'MM/YY');

      if (!expiryDate.isValid()) {
        displayToast('ERROR', 'Please enter valid date.');
        setButtonDisabled(false);
        return;
      }

      if (!expiryDate.isAfter(currentDate)) {
        displayToast('ERROR', 'Please enter future date.');
        setButtonDisabled(false);
        return;
      }
    }

    let billingSchemesNewArray = billingSchemes;
    if (editCreditCard) {
      billingSchemesNewArray = billingSchemes.filter((account: any) => {
        if (
          account.billingmethod === 'creditcard' &&
          !account.billingaccountid
        ) {
          return false;
        } else {
          return true;
        }
      });
    }
    const obj = {
      exp_year: moment(cardExpiry, 'MM/YYYY').year(),
      exp_month: moment(cardExpiry, 'MM/YYYY').month() + 1,
      postal_code: zipCode,
    };
    let cardObj: any = getCreditCardObj(obj, billingSchemes);

    Array.prototype.push.apply(billingSchemesNewArray, cardObj);

    billingSchemesNewArray = updatePaymentCardsAmount(
      billingSchemesNewArray,
      basket,
    );

    dispatch(updateBasketBillingSchemes(billingSchemesNewArray));
    if (!isMobile) {
      displayToast(
        'SUCCESS',
        `Credit Card ${editCreditCard ? 'Updated' : 'Added'}`,
      );
    }
    setButtonDisabled(false);
    handleHideShow();

    // if (ccsfObj) {
    //   ccsfObj.registerError((errors: any) => {
    //     console.log('ccsf error 2', errors);
    //
    //     errors.forEach((error: any) => {
    //       console.log(error.code);
    //       console.log(error.description);
    //       if (
    //         error.description &&
    //         error.description ===
    //           'The sum of your selected payment methods must equal the order total.'
    //       ) {
    //
    //       } else {
    //         displayToast('ERROR', error.description);
    //       }
    //     });
    //   });
    // ccsfObj.submit({
    //   id: basket && basket.id,
    //   accessToken: basketAccessToken,
    //   billingaccounts: [
    //     {
    //       billingmethod: 'creditcard',
    //       // amount: 31.25,
    //       // tipportion: 0,
    //       expiryyear: monthYear[1],
    //       expirymonth: monthYear[0],
    //       zip: zipCode,
    //       saveonfile: true,
    //     },
    //   ],
    // });
    // }
  };

  const displayAddCreditCard = () => {
    const billingSchemeStats = getBillingSchemesStats(billingSchemes);
    return (
      basket &&
      billingSchemeStats.creditCard < 1 &&
      allowedCards &&
      allowedCards.length &&
      allowedCards.filter((element: any) => {
        return element.type === 'creditcard';
      }).length > 0
    );
  };

  const HandleEditCreditCard = (value: boolean) => {
    setHideShow(value);
    if (value) {
      setEditCreditCard(true);
    }
  };

  React.useEffect(() => {
    let dialog: any = document.querySelector('[role="dialog"]');
    let firstFocusableElement = dialog.querySelector(
      '.first-focusable-element',
    );
    let lastFocusableElement = dialog.querySelector('.last-focusable-element');

    dialog.addEventListener('keydown', function (e: any) {
      if (e.target == firstFocusableElement && e.key == 'Tab' && e.shiftKey) {
        e.preventDefault();
        lastFocusableElement.focus();
      } else if (
        e.target == lastFocusableElement &&
        e.key == 'Tab' &&
        !e.shiftKey
      ) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    });
  }, []);

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
          <SplitPayment
            setHideShow={(value: boolean) => HandleEditCreditCard(value)}
          />
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} className="add-gift">
              {displayAddCreditCard() && (
                <Button
                  className={'add-credit-card-button'}
                  title="Add Credit card"
                  aria-label="Add Credit card"
                  onClick={() => handleHideShow()}
                >
                  Add Credit card
                </Button>
              )}

              <div
                id="myModal"
                role={'dialog'}
                aria-modal={'true'}
                aria-label={editCreditCard ? 'Edit Credit card' : 'Add Credit card'}
                className={`modal ${hideShow ? 'show' : 'hide'}`}
              >
                {/*<div className="modal-content">*/}
                {/*  <span  className="close">&times;</span>*/}
                {/*  <p>Some text in the Modal..</p>*/}
                {/*</div>*/}
                <div className="modal-content">
                  <div className="modal-header">
                    {/*<span onClick={() => handleHideShow()} className="close">*/}
                    {/*  &times;*/}
                    {/*</span>*/}
                    <h2
                      tabIndex={0}
                      style={{ outline: 'none' }}
                      className={'heading first-focusable-element'}
                    >
                      {editCreditCard ? 'Edit Credit card' : 'Add Credit card'}
                    </h2>
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
                              <div
                                style={{ display: 'contents' }}
                                className="credit-card-info-div"
                              ></div>
                            </div>
                            <img
                              alt="card icon"
                              src={require('../../assets/imgs/card-icon.png')}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            {/*<div className="card-fields" data-olo-pay-card-cvc />*/}
                            <div className="card-fields">
                              <div
                                style={{ display: 'contents' }}
                                className="cvv-info-div"
                              ></div>
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
                            {/*<TextField*/}
                            {/*  className="zipcode"*/}
                            {/*  aria-label="Card Expiry"*/}
                            {/*  placeholder="Card Expiry"*/}
                            {/*  type="text"*/}
                            {/*  name="expiry"*/}
                            {/*  inputProps={{ shrink: false }}*/}
                            {/*  value={cardExpiry}*/}
                            {/*  onChange={handleCardExpiryChange}*/}
                            {/*/>*/}
                            <TextField
                              className="zipcode"
                              aria-label="Card Expiry"
                              // onBlur={handleBlur}
                              // label="Card Expiry"
                              placeholder="Card Expiry MM/YY"
                              // aria-required="true"
                              // title="Card Expiry"
                              value={cardExpiry}
                              onChange={handleCardExpiryChange}
                              name="phone"
                              // InputLabelProps={{
                              //   shrink: false,
                              //   classes: {
                              //     root: cardExpiry !== '' ? 'mobile-field-label' : '',
                              //   },
                              // }}
                              InputProps={{
                                inputComponent: NumberFormatCustom as any,
                              }}
                              // error={Boolean(cardExpiry.phone && errors.phone)}
                              // helperText={errors.phone}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={6}>
                            <TextField
                              className="zipcode"
                              aria-label="Zip Code"
                              placeholder="Zip Code"
                              type="number"
                              name="zipcode"
                              inputProps={{ shrink: false }}
                              value={zipCode}
                              onChange={handleZipCodeChange}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="modal-footer">
                    <Button
                      aria-label="Cancel"
                      title="Cancel"
                      className="link"
                      onClick={() => handleHideShow()}
                    >
                      Cancel{' '}
                    </Button>
                    <Button
                      aria-label={
                        editCreditCard
                          ? 'Update Credit card'
                          : 'Add Credit card'
                      }
                      title={
                        editCreditCard
                          ? 'Update Credit card'
                          : 'Add Credit card'
                      }
                      type="submit"
                      className="link default last-focusable-element"
                      onClick={handleCreditCardSubmit}
                      // disabled={buttonDisabled}
                      autoFocus
                    >
                      {editCreditCard
                        ? 'Update Credit card'
                        : 'Add Credit card'}
                    </Button>
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
