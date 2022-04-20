import React, { ChangeEvent, forwardRef, useImperativeHandle } from 'react';
import {
  Button,
  Grid,
  TextField,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
} from '@mui/material';
import { CreditCardElements, PaymentMethodResult } from '@olo/pay';
// import './payment-info.css';
import { ResponseBasket } from '../../../types/olo-api';
import { useDispatch, useSelector } from 'react-redux';
import { displayToast } from '../../../helpers/toast';
import { updateBasketBillingSchemes } from '../../../redux/actions/basket/checkout';
import {getBillingSchemesStats, getCreditCardObj, updatePaymentCardsAmount, getUniqueId} from '../../../helpers/checkout';

const cardTypes: any = {
  amex: 'Amex',
  visa: 'Visa',
  discover: 'Discover',
  mastercard: 'Mastercard',
};

const styleObject = {
  base: {
    color: 'lightslategrey',
    fontSize: '5rem',
    fontFamily: 'sans-serif',
    '::placeholder': {
      color: '#000',
      fontFamily: 'Poppins-Regular, sans-serif',
    },
  },
  // complete: {
  //   color: 'peachpuff',
  //   fontFamily: 'Mr Dafoe, cursive',
  // },
  // invalid: {
  //   color: 'tomato',
  //   ':hover': {
  //     color: 'orangered',
  //   },
  // }
};

const AddCreditCard = () => {
  const dispatch = useDispatch();
  const [creditCardElements, setCreditCardElements] =
    React.useState<CreditCardElements | null>(null);
  const creditCardInfo = React.useRef<any>();
  const basketObj = useSelector((state: any) => state.basketReducer);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [allowedCards, setAllowedCards] = React.useState<any>();
  const [billingSchemes, setBillingSchemes] = React.useState<any>([]);
  const [pinCheck, setPinCheck] = React.useState<any>(false);
  const [billingDetails, setBillingDetails] = React.useState<any>();
  const [zipCode, setZipCode] = React.useState<any>();
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);

  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethodResult | null>(null);

  const [openAddCreditCard, setOpenAddCreditCard] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    if (basketObj.basket) {
      setBasket(basketObj.basket);
    }
  }, [basketObj.basket]);

  React.useEffect(() => {
    if (
      basketObj.payment.allowedCards &&
      basketObj.payment.allowedCards.data &&
      basketObj.payment.allowedCards.data.billingschemes
    ) {
      setAllowedCards(basketObj.payment.allowedCards.data.billingschemes);
    }
  }, [basketObj.payment.allowedCards]);

  React.useEffect(() => {
    setBillingSchemes(basketObj.payment.billingSchemes);
  }, [basketObj.payment.billingSchemes]);

  useImperativeHandle(creditCardInfo, () => ({
    getCardDetails: async () => {
      const response = (await creditCardElements!.createPaymentMethod(
        billingDetails,
      )) as PaymentMethodResult;
      setPaymentMethod(response);
      return response;
    },
  }));

  React.useEffect(() => {
    if (openAddCreditCard) {
      const initializeCreditCardElements = async () => {
        const elements = new CreditCardElements();
        // for production use
        // const elements = new CreditCardElements('production');

        elements.applyStyles(styleObject);

        setCreditCardElements(elements);

        await elements.create();
      };

      initializeCreditCardElements();
    }
  }, [openAddCreditCard]);

  const handleCloseAddCreditCard = () => {
    setOpenAddCreditCard(!openAddCreditCard);
    setZipCode('');
    setBillingDetails({});
  };

  const handleZipCodeChange = (event: any) => {
    let newValue = event.target.value.trim();
    newValue = newValue && newValue >= 0 ? parseInt(newValue) : '';

    setZipCode(newValue);

    setBillingDetails({
      address: {
        postal_code: newValue,
      },
    });
  };

  const validatePaymentForm = async () => {
    let data: any = {
      isValidCard: false,
      cardDetails: null,
      errors: {},
    };

    const cardDetails = await creditCardInfo.current.getCardDetails();

    if (cardDetails.error) {
      data.errors = cardDetails.error;
    } else if (cardDetails.paymentMethod) {
      if (
        cardDetails.paymentMethod &&
        cardDetails.paymentMethod.billing_details &&
        cardDetails.paymentMethod.billing_details.address.postal_code &&
        cardDetails.paymentMethod.billing_details.address.postal_code !== ''
      ) {
        let zipcode =
          cardDetails.paymentMethod.billing_details.address.postal_code;
        if (zipcode > 99 && zipcode < 99999) {
          data.cardDetails = cardDetails.paymentMethod;
          data.isValidCard = true;
        } else {
          data.isValidCard = false;
          data.errors.message = 'Zip Code must be between 3 and 5 digits.';
        }
      } else {
        data.isValidCard = false;
        data.errors.message = 'Zip Code is required';
      }
    }

    return data;
  };

  const handleCreditCardSubmit = async () => {
    setButtonDisabled(true);
    const { isValidCard, cardDetails, errors } = await validatePaymentForm();

    if (!isValidCard) {
      displayToast('ERROR', errors?.message);
      setButtonDisabled(false);
      return;
    }

    let billingSchemesNewArray = billingSchemes;
    // const billingSchemeStats = getBillingSchemesStats(billingSchemes);
    let cardObj: any = getCreditCardObj(cardDetails, billingSchemes);

    Array.prototype.push.apply(billingSchemesNewArray, cardObj);

    billingSchemesNewArray = updatePaymentCardsAmount(
      billingSchemesNewArray,
      basket,
    );

    // let cardObj: any = [
    //   {
    //     localId: getUniqueId(),
    //     selected: false,
    //     billingmethod: 'creditcardtoken',
    //     amount: 0,
    //     tipportion: 0.0,
    //     token: cardDetails.id,
    //     cardtype: cardTypes[cardDetails.card.brand],
    //     expiryyear: cardDetails.card.exp_year,
    //     expirymonth: cardDetails.card.exp_month,
    //     cardlastfour: cardDetails.card.last4,
    //     zip: cardDetails.billing_details.address.postal_code,
    //     saveonfile: false,
    //   },
    // ];

    // if (
    //   billingSchemeStats.creditCard === 0 &&
    //   billingSchemeStats.giftCard === 0
    // ) {
    //   cardObj[0].amount = basket && basket?.total ? basket?.total : 0;
    //   cardObj[0].selected = true;
    // } else if (
    //   billingSchemeStats.creditCard === 1 &&
    //   billingSchemeStats.giftCard === 1
    // ) {
    //   let giftCardAmount = 0;
    //   let halfAmount: any = 0;
    //   const giftCardIndex = billingSchemesNewArray.findIndex(
    //     (account: any) => account.billingmethod === 'storedvalue',
    //   );
    //   if (giftCardIndex !== -1) {
    //     let updatedCreditCard = billingSchemesNewArray[giftCardIndex];
    //     giftCardAmount =
    //       basket && updatedCreditCard.balance > basket.subtotal
    //         ? basket.subtotal
    //         : updatedCreditCard.balance;
    //     updatedCreditCard.amount = giftCardAmount;
    //     updatedCreditCard.selected = true;
    //     billingSchemesNewArray[giftCardIndex] = updatedCreditCard;
    //   }
    //
    //   halfAmount = basket ? basket.total - giftCardAmount : 0;
    //   halfAmount = halfAmount / 2;
    //   halfAmount = halfAmount.toFixed(2);
    //
    //   const creditCardIndex = billingSchemesNewArray.findIndex(
    //     (account: any) => account.billingmethod === 'creditcardtoken',
    //   );
    //   if (creditCardIndex !== -1) {
    //     let updatedCreditCard = billingSchemesNewArray[creditCardIndex];
    //     updatedCreditCard.amount = parseFloat(halfAmount);
    //     updatedCreditCard.selected = true;
    //     billingSchemesNewArray[creditCardIndex] = updatedCreditCard;
    //   }
    //
    //   cardObj[0].amount = parseFloat(halfAmount);
    //   cardObj[0].selected = true;
    // } else if (
    //   billingSchemeStats.creditCard === 1 &&
    //   billingSchemeStats.giftCard === 0
    // ) {
    //   let halfAmount: any = basket ? basket.total : 0;
    //   halfAmount = halfAmount / 2;
    //   halfAmount = halfAmount.toFixed(2);
    //   const creditCardIndex = billingSchemesNewArray.findIndex(
    //     (account: any) => account.billingmethod === 'creditcardtoken',
    //   );
    //   if (creditCardIndex !== -1) {
    //     let updatedCreditCard = billingSchemesNewArray[creditCardIndex];
    //     updatedCreditCard.amount = parseFloat(halfAmount);
    //     updatedCreditCard.selected = true;
    //     billingSchemesNewArray[creditCardIndex] = updatedCreditCard;
    //   }
    //
    //   cardObj[0].amount = parseFloat(halfAmount);
    //   cardObj[0].selected = true;
    // }
    //
    // Array.prototype.push.apply(billingSchemesNewArray, cardObj);

    dispatch(updateBasketBillingSchemes(billingSchemesNewArray));
    displayToast('SUCCESS', 'Credit Card Added');
    setButtonDisabled(false);
    handleCloseAddCreditCard();
  };

  return (
    <>
      <Dialog
        open={openAddCreditCard}
        onClose={handleCloseAddCreditCard}
        className="fav-dialog"
        fullWidth
      >
        <DialogTitle>Add Credit Card</DialogTitle>

        {openAddCreditCard && (
          <DialogContent>
            {openAddCreditCard && (
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
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      className="payment-form image-field align"
                    >
                      <div className="card-fields" data-olo-pay-card-number />
                      <img
                        src={require('../../../assets/imgs/card-icon.png')}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <div className="card-fields" data-olo-pay-card-cvc />
                      <img src={require('../../../assets/imgs/ccv-icon.png')} />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={6}
                      lg={6}
                      className="payment-form image-field align"
                    >
                      <div className="card-fields" data-olo-pay-card-expiry />
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                      <TextField
                        aria-label="Zip Code"
                        // onBlur={handleBlur}
                        // label="Zip Code"
                        // aria-required="true"
                        // title="Zip Code"
                        placeholder="Zip Code"
                        type="text"
                        name="zipcode"
                        inputProps={{ shrink: false }}
                        value={zipCode}
                        onChange={handleZipCodeChange}
                        // error={Boolean(touched.zipcode && errors.zipcode)}
                        // helperText={errors.zipcode}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <DialogActions>
              <Button
                aria-label="Cancel"
                title="Cancel"
                className="link"
                onClick={handleCloseAddCreditCard}
              >
                Cancel{' '}
              </Button>
              <Button
                aria-label="Add Gift Card"
                title="Add Gift Card"
                type="submit"
                className="link default"
                onClick={handleCreditCardSubmit}
                disabled={buttonDisabled}
                autoFocus
              >
                Add Credit Card
              </Button>
            </DialogActions>
          </DialogContent>
        )}
      </Dialog>
      {basket && billingSchemes.length !== 5 && (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button
              onClick={handleCloseAddCreditCard}
              title="ADD CREDIT CARD"
              className="label"
            >
              ADD Credit CARD
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default AddCreditCard;
