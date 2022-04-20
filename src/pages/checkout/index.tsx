import React, { useEffect } from 'react';
import { Box, Button, Card, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import OrderDetails from '../../components/order-details';
import Tip from '../../components/tip';
import Rewards from '../../components/rewards';
import OrderTime from '../../components/order-time';
import PaymentInfo from '../../components/payment-info';
import StoreInfoBar from '../../components/restaurant-info-bar';
import './checkout.css';
import { ResponseBasket, ResponseBasketValidation } from '../../types/olo-api';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';
import moment from 'moment';
import {
  getBasketAllowedCardsRequest,
  getSingleRestaurantCalendar,
  updateBasketBillingSchemes,
  validateBasket,
} from '../../redux/actions/basket/checkout';
import { displayToast } from '../../helpers/toast';
import {
  generateSubmitBasketPayload,
  formatCustomFields,
  formatDeliveryAddress,
  getUniqueId,
  getCreditCardObj,
  updatePaymentCardsAmount,
} from '../../helpers/checkout';
import { getUserDeliveryAddresses } from '../../redux/actions/user';
import PickupForm from '../../components/pickup-form/index';
import DeliveryForm from '../../components/delivery-form/index';
import { getRewardsForCheckoutRequest } from '../../redux/actions/reward/checkout';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pickupFormRef = React.useRef<any>(null);
  const deliveryFormRef = React.useRef<any>(null);
  const paymentInfoRef = React.useRef<any>();

  const [runOnce, setRunOnce] = React.useState<boolean>(true);
  const [defaultCard, setDefaultCard] = React.useState<boolean>(true);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [tipPercentage, setTipPercentage] = React.useState<any>(null);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [billingSchemes, setBillingSchemes] = React.useState<any>([]);
  const [validate, setValidate] =
    React.useState<ResponseBasketValidation | null>(null);
  const [defaultDeliveryAddress, setDefaultDeliveryAddress] =
    React.useState<any>(null);

  const basketObj = useSelector((state: any) => state.basketReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { rewards } = useSelector(
    (state: any) => state.getRewardForCheckoutReducer,
  );
  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const { userDeliveryAddresses } = useSelector(
    (state: any) => state.userReducer,
  );

  React.useEffect(() => {
    if (basket && runOnce) {
      let selectedTime = moment().format('YYYYMMDD');
      if (basket.timewanted) {
        selectedTime = moment(basket.timewanted, 'YYYYMMDD HH:mm').format(
          'YYYYMMDD',
        );
      }
      dispatch(
        getSingleRestaurantCalendar(
          basket.vendorid,
          selectedTime,
          selectedTime,
        ),
      );
      dispatch(validateBasket(basket.id, null, null, [], null, null));
      dispatch(getBasketAllowedCardsRequest(basket.id));
      setRunOnce(false);
    }
  }, [basket]);

  React.useEffect(() => {
    setBillingSchemes(basketObj.payment.billingSchemes);
  }, [basketObj.payment.billingSchemes]);

  React.useEffect(() => {
    if (
      defaultCard &&
      !basketObj?.loading &&
      validate &&
      basket &&
      basketObj.payment.allowedCards.data &&
      basketObj.payment.allowedCards.data.billingschemes &&
      basketObj.payment.allowedCards.data.billingschemes.length
    ) {
      const creditCardIndex =
        basketObj.payment.allowedCards.data.billingschemes.findIndex(
          (schemes: any) => schemes.type === 'creditcard',
        );
      if (creditCardIndex !== -1) {
        if (
          basketObj.payment.allowedCards.data.billingschemes[creditCardIndex]
            .accounts
        ) {
          const defaultCardIndex =
            basketObj.payment.allowedCards.data.billingschemes[
              creditCardIndex
            ].accounts.findIndex((card: any) => card.isdefault);
          if (defaultCardIndex !== -1) {
            const defaultCard =
              basketObj.payment.allowedCards.data.billingschemes[
                creditCardIndex
              ].accounts[defaultCardIndex];
            console.log('Mubashir', defaultCard);

            let cardObj: any = [
              {
                localId: getUniqueId(),
                selected: false,
                billingmethod: 'creditcardtoken',
                amount: 0,
                tipportion: 0.0,
                cardtype: defaultCard.cardtype,
                cardlastfour: defaultCard.cardsuffix,
                billingaccountid: parseInt(defaultCard.accountidstring),
              },
            ];

            cardObj[0].amount =
              validate && validate.total
                ? validate.total
                : basket && basket?.total
                ? basket?.total
                : 0;
            cardObj[0].selected = true;

            cardObj = updatePaymentCardsAmount(cardObj, basket);

            dispatch(updateBasketBillingSchemes(cardObj));
          }
        }
      }
      setDefaultCard(false);
    }
  }, [basketObj.payment.allowedCards, validate]);

  React.useEffect(() => {
    if (authToken?.authtoken && authToken.authtoken !== '') {
      dispatch(getUserDeliveryAddresses());
      if (restaurant && restaurant.id) {
        dispatch(
          getRewardsForCheckoutRequest(restaurant.id, authToken.authtoken),
        );
      }
    }
  }, []);

  React.useEffect(() => {
    if (
      userDeliveryAddresses &&
      userDeliveryAddresses.deliveryaddresses &&
      userDeliveryAddresses.deliveryaddresses.length
    ) {
      let defaultAddress = userDeliveryAddresses.deliveryaddresses.filter(
        (address: any) => {
          return address.isdefault === true;
        },
      );
      defaultAddress = defaultAddress.length ? defaultAddress[0] : null;
      setDefaultDeliveryAddress(defaultAddress);
    }
  }, [userDeliveryAddresses]);

  React.useEffect(() => {
    if (basketObj.basket) {
      setBasket(basketObj.basket);
    } else {
      navigate('/location');
    }
  }, [basketObj.basket, basketObj.calendar]);

  React.useEffect(() => {
    if (basketObj.validate) {
      setValidate(basketObj.validate);
    }
  }, [basketObj.validate]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 300,
      behavior: 'smooth',
    });
  };

  const validatePickupForm = (): any => {
    let data = {
      isValidForm: false,
      formData: null,
    };

    if (!pickupFormRef.current) {
    } else if (!pickupFormRef.current.dirty) {
      pickupFormRef.current.submitForm();
    } else if (Object.keys(pickupFormRef.current.errors).length > 0) {
    } else {
      data.isValidForm = true;
      data.formData = pickupFormRef.current.values;
    }

    return data;
  };

  const validateDeliveryForm = (): any => {
    let data = {
      isValidForm: false,
      formData: null,
    };

    if (!deliveryFormRef.current) {
    } else if (!deliveryFormRef.current.dirty) {
      deliveryFormRef.current.submitForm();
    } else if (Object.keys(deliveryFormRef.current.errors).length > 0) {
    } else {
      data.isValidForm = true;
      data.formData = deliveryFormRef.current.values;
    }

    return data;
  };

  const validatePaymentForm = async () => {
    let data: any = {
      isValidCard: false,
      cardDetails: null,
      errors: {},
    };

    const cardDetails = await paymentInfoRef.current.getCardDetails();

    if (cardDetails.error) {
      data.errors = cardDetails.error;
    } else if (cardDetails.paymentMethod) {
      if (
        cardDetails.paymentMethod &&
        cardDetails.paymentMethod.billing_details &&
        cardDetails.paymentMethod.billing_details.address.postal_code &&
        cardDetails.paymentMethod.billing_details.address.postal_code !== ''
      ) {
        data.cardDetails = cardDetails.paymentMethod;
        data.isValidCard = true;
      } else {
        data.isValidCard = false;
        data.errors.message = 'Zip Code is required';
      }
    }

    return data;
  };

  const placeOrder = async () => {
    setButtonDisabled(true);
    let customFields = [];
    let deliveryAddress = null;
    let deliverymode = {
      deliverymode: orderType || '',
    };
    let formDataValue;

    if (
      orderType &&
      (orderType === '' ||
        orderType === DeliveryModeEnum.pickup ||
        orderType === DeliveryModeEnum.curbside)
    ) {
      const { isValidForm, formData } = validatePickupForm();
      if (!isValidForm) {
        displayToast('ERROR', 'Pickup fields are required.');
        scrollToTop();
        setButtonDisabled(false);
        return;
      }
      formDataValue = formData;
    }

    if (orderType && orderType === DeliveryModeEnum.delivery) {
      const { isValidForm, formData } = validateDeliveryForm();
      if (!isValidForm) {
        displayToast('ERROR', 'Delivery fields are required.');
        scrollToTop();
        setButtonDisabled(false);
        return;
      }
      formDataValue = formData;
    }

    if (billingSchemes.length === 0) {
      displayToast('ERROR', 'Payment method is required');
      setButtonDisabled(false);
      return;
    }

    if (billingSchemes.length) {
      const tip = (basket && basket.tip) || 0;
      const creditCardTotal = billingSchemes.reduce(
        (sum: any, account: any) => {
          if (account.billingmethod === 'creditcardtoken' && account.selected) {
            sum = sum + account.amount;
          }
          return sum;
        },
        0,
      );

      if (creditCardTotal < tip) {
        displayToast(
          'ERROR',
          'Credit Card amount should be greater than Tip amount.',
        );
        setButtonDisabled(false);
        return;
      }
    }

    // const { isValidCard, cardDetails, errors } = await validatePaymentForm();
    //
    // if (!isValidCard) {
    //   displayToast('ERROR', errors?.message);
    //   setButtonDisabled(false);
    //   return;
    // }

    if (formDataValue.phone) {
      formDataValue.phone = formDataValue.phone.replace(/\D/g, '');
    }

    const basketPayload = generateSubmitBasketPayload(
      formDataValue,
      billingSchemes,
      basket?.deliverymode,
      authToken?.authtoken,
      basket,
    );

    if (orderType && orderType === DeliveryModeEnum.curbside) {
      customFields = formatCustomFields(restaurant.customfields, formDataValue);
    }

    if (orderType && orderType === DeliveryModeEnum.delivery) {
      deliveryAddress = formatDeliveryAddress(
        formDataValue,
        defaultDeliveryAddress,
      );
      console.log('deliveryAddress', deliveryAddress);
    }

    if (basket) {
      setButtonDisabled(false);
      let user: any = null;
      if (authToken?.authtoken && authToken.authtoken !== '') {
        user = {
          email: providerToken.email,
          first_name: providerToken?.first_name,
          last_name: providerToken?.last_name,
          favourite_locations: providerToken?.favourite_locations,
          marketing_email_subscription: formDataValue.emailNotification,
          phone: formDataValue.phone,
        };
      }
      console.log('basketPayload', basketPayload);

      dispatch(
        validateBasket(
          basket?.id,
          basketPayload,
          user,
          customFields,
          deliverymode,
          deliveryAddress,
        ),
      );
    }
  };

  return (
    <>
      <Typography variant="h1" className="sr-only">
        Checkout
      </Typography>
      <StoreInfoBar />
      <Box className="checkout-wrapper">
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card className="order">
              <Grid container>
                <Grid container>
                  <Grid item xs={12} sm={6} md={6} lg={6} className="left-col">
                    <Grid container>
                      {basket &&
                      (orderType === '' ||
                        orderType === DeliveryModeEnum.pickup) ? (
                        <>
                          <Grid item xs={12}>
                            <Typography
                              variant="caption"
                              className="label"
                              title="WHO'S IS PICKING UP?"
                            >
                              WHO'S PICKING UP?
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h2" title="PICK UP INFO">
                              PICK UP INFO
                            </Typography>
                          </Grid>
                        </>
                      ) : basket && orderType === DeliveryModeEnum.curbside ? (
                        <>
                          <Grid item xs={12}>
                            <Typography
                              variant="caption"
                              className="label"
                              title="WHO'S IS PICKING UP?"
                            >
                              WHO'S PICKING UP?
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h2" title="PICK UP INFO">
                              CURBSIDE PICK UP
                            </Typography>
                          </Grid>
                        </>
                      ) : basket && orderType === DeliveryModeEnum.delivery ? (
                        <>
                          <Grid item xs={12}>
                            <Typography
                              variant="caption"
                              className="label"
                              title="WHO'S IS PICKING UP?"
                            >
                              WHERE TO DELIVER
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="h2" title="PICK UP INFO">
                              DELIVERY INFO
                            </Typography>
                          </Grid>
                        </>
                      ) : null}
                      {basket &&
                      (orderType === '' ||
                        orderType === DeliveryModeEnum.pickup ||
                        orderType === DeliveryModeEnum.curbside) ? (
                        <PickupForm
                          basket={basket}
                          pickupFormRef={pickupFormRef}
                          orderType={orderType}
                        />
                      ) : null}
                      {orderType && orderType === DeliveryModeEnum.delivery ? (
                        <DeliveryForm
                          basket={basket}
                          defaultAddress={defaultDeliveryAddress}
                          deliveryFormRef={deliveryFormRef}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                  <OrderTime />
                </Grid>
              </Grid>
              <br />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <br />
              {providerToken && providerToken.first_name && rewards && (
                <>
                  <Rewards rewardsList={rewards} />
                  <br />
                  <br />
                  <br />
                  <Divider />
                  <br />
                  <br />
                  <br />
                </>
              )}
              <Tip
                basket={basket}
                loading={basketObj?.loading}
                updateOrderDetailTipPercent={setTipPercentage}
              />
              <br />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <br />
              {/*second section*/}
              <OrderDetails
                basket={basket}
                tipPercentage={tipPercentage}
                page="checkout"
              />
              <br />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <br />
              <PaymentInfo ref={paymentInfoRef} />
              {/*second section ends here*/}
              <Grid container className="add-order">
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Button
                    disabled={buttonDisabled || basketObj?.loading}
                    onClick={placeOrder}
                    variant="contained"
                    title="PLACE ORDER"
                  >
                    PLACE ORDER
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Checkout;
