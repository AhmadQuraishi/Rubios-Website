import React, { useImperativeHandle } from 'react';
import {
  Button,
  Grid,
  TextField,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  useTheme, 
  useMediaQuery
} from '@mui/material';
import { CreditCardElements, PaymentMethodResult } from '@olo/pay';
import { ResponseBasket } from '../../../types/olo-api';
import { useDispatch, useSelector } from 'react-redux';
import { displayToast } from '../../../helpers/toast';
import { updateBasketBillingSchemes } from '../../../redux/actions/basket/checkout';
import {
  getBillingSchemesStats,
  getCreditCardObj,
  updatePaymentCardsAmount,
} from '../../../helpers/checkout';

const styleObject = {
  base: {
    color: 'lightslategrey',
    fontSize: '5rem',
    '::placeholder': {
      color: '#000',
      fontFamily: "'Librefranklin-Regular' !important",
    },
  },
};

const AddCreditCard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [creditCardElements, setCreditCardElements] =
    React.useState<CreditCardElements | null>(null);
  const creditCardInfo = React.useRef<any>();
  const basketObj = useSelector((state: any) => state.basketReducer);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [billingSchemes, setBillingSchemes] = React.useState<any>([]);
  const [billingDetails, setBillingDetails] = React.useState<any>();
  const [zipCode, setZipCode] = React.useState<any>();
  const [allowedCards, setAllowedCards] = React.useState<any>();
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
    if (
      basketObj.payment.allowedCards &&
      basketObj.payment.allowedCards.data &&
      basketObj.payment.allowedCards.data.billingschemes
    ) {
      setAllowedCards(basketObj.payment.allowedCards.data.billingschemes);
    }
  }, [basketObj.payment.allowedCards]);

  React.useEffect(() => {
    if (openAddCreditCard) {
      const initializeCreditCardElements = async () => {
        let elements;
        if (process.env.REACT_APP_NODE_ENV === 'production') {
          let env = 'production';
          if (
            basket &&
            basket.vendorid.toString() ===
              process.env.REACT_APP_CONF_ROOM_PILOT_ID
          ) {
            env = 'development';
          }
          // @ts-ignore
          elements = new CreditCardElements(env);
        } else {
          elements = new CreditCardElements('development');
        }
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
    newValue =
      newValue && newValue >= 0 && newValue <= 99999
        ? parseInt(newValue)
        : newValue > 99999
        ? zipCode
        : '';

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
    let cardObj: any = getCreditCardObj(cardDetails, billingSchemes);

    Array.prototype.push.apply(billingSchemesNewArray, cardObj);

    billingSchemesNewArray = updatePaymentCardsAmount(
      billingSchemesNewArray,
      basket,
    );

    dispatch(updateBasketBillingSchemes(billingSchemesNewArray));
      displayToast('SUCCESS', 'Credit Card Added');
    setButtonDisabled(false);
    handleCloseAddCreditCard();
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
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      className="payment-form image-field align"
                    >
                      <div
                        tabIndex={0}
                        className="card-fields"
                        data-olo-pay-card-number
                      />
                      <img
                        src={require('../../../assets/imgs/card-icon.png')}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                      <div className="card-fields" data-olo-pay-card-cvc />
                      <img src={require('../../../assets/imgs/ccv-icon.png')} />
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
                      <div className="card-fields" data-olo-pay-card-expiry />
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
                aria-label="Add Credit Card"
                title="Add Credit Card"
                type="submit"
                className="link default"
                onClick={handleCreditCardSubmit}
                disabled={buttonDisabled}
                sx={{fontFamily: "'Sunborn-Sansone'!important",fontSize: "11pt !important",}}
              >
                Add Credit Card
              </Button>
            </DialogActions>
          </DialogContent>
        )}
      </Dialog>
      {displayAddCreditCard() && (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button
              onClick={handleCloseAddCreditCard}
              title="ADD CREDIT CARD"
              className="label"
              sx={{fontFamily: "'Sunborn-Sansone'!important",fontSize: "11pt !important",}}
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
