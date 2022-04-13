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
  getSingleRestaurantCalendar,
  validateBasket,
} from '../../redux/actions/basket/checkout';
import { displayToast } from '../../helpers/toast';
import {
  generateSubmitBasketPayload,
  formatCustomFields,
  formatDeliveryAddress,
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
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [tipPercentage, setTipPercentage] = React.useState<any>(null);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [validate, setValidate] = React.useState<ResponseBasketValidation>();
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
      setRunOnce(false);
    }
  }, [basket]);

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
      data.cardDetails = cardDetails.paymentMethod;
      data.isValidCard = true;
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

    const { isValidCard, cardDetails, errors } = await validatePaymentForm();

    if (!isValidCard) {
      displayToast('ERROR', errors?.message);
      setButtonDisabled(false);
      return;
    }

    formDataValue.phone = formDataValue.phone.replace(/\D/g, '');

    const basketPayload = generateSubmitBasketPayload(
      formDataValue,
      cardDetails,
      basket?.deliverymode,
      authToken?.authtoken,
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
                            <Typography variant="h1" title="PICK UP INFO">
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
                            <Typography variant="h1" title="PICK UP INFO">
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
                            <Typography variant="h1" title="PICK UP INFO">
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
