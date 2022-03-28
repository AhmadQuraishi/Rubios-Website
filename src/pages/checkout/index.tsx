import React, { forwardRef, useRef } from 'react';
import { Box, Button, Card, Grid, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import OrderDetail from '../../components/order-detail';
import Tip from '../../components/tip';
import Rewards from '../../components/rewards';
import OrderTime from '../../components/order-time';
import PaymentInfo from '../../components/payment-info';
import StoreInfoBar from '../../components/restaurant-info-bar';
import './checkout.css';
import {
  ResponseBasket,
  ResponseBasketValidation,
  ResponseContactOptions,
} from '../../types/olo-api';
import {DeliveryModeEnum} from '../../types/olo-api/olo-api.enums';
import { IMaskInput } from 'react-imask';
import moment from 'moment';
import { HoursListing } from '../../helpers/hoursListing';
import {
  getSingleRestaurantCalendar,
  validateBasket,
} from '../../redux/actions/basket/checkout';
import { displayToast } from '../../helpers/toast';
import { generateSubmitBasketPayload, formatCustomFields, formatDeliveryAddress } from '../../helpers/checkout';
import { updateUser } from '../../redux/actions/user';
import PickupForm from '../../components/pickup-form';
import DeliveryForm from '../../components/delivery-form';


let userInfoValidation = Yup.object({
  firstName: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .required('First Name is required'),
  lastName: Yup.string()
    .max(30, 'Must be 30 characters or less')
    .required('Last Name is required'),
  email: Yup.string()
    .matches(
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Invalid Email ',
    )
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .min(14, 'Enter valid number')
    .required('Phone is required'),
  emailNotification: Yup.bool().optional(),
  vehicleModal: Yup.string()
  .max(15, 'Must be 15 characters or less')
  .required('Vehicle Modal is required'),
  vehicleMake: Yup.string()
  .max(15, 'Must be 15 characters or less')
  .required('Vehicle Make is required'),  
  vehicleColor: Yup.string()
  .max(15, 'Must be 15 characters or less')
  .required('Vehicle Color is required'),
})

console.log('userInfoValidation', userInfoValidation)

const vehicleValidation = Yup.object({
  vehicleModal: Yup.string()
  .max(15, 'Must be 15 characters or less')
  .required('Vehicle Modal is required'),
  vehicleMake: Yup.string()
  .max(15, 'Must be 15 characters or less')
  .required('Vehicle Make is required'),  
  vehicleColor: Yup.string()
  .max(15, 'Must be 15 characters or less')
  .required('Vehicle Color is required'),
})

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pickupFormRef = React.useRef<any>(null);
  const deliveryFormRef = React.useRef<any>(null);
  const paymentInfoRef = React.useRef<any>();
  const [formValidation, setFormValidation] = React.useState<any>(userInfoValidation);

  const [runOnce, setRunOnce] = React.useState<boolean>(true);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [validate, setValidate] = React.useState<ResponseBasketValidation>();

  const basketObj = useSelector((state: any) => state.basketReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { restaurant, orderType } = useSelector((state: any) => state.restaurantInfoReducer);

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
    if (orderType && orderType !== '' && orderType === DeliveryModeEnum.curbside) {
      const obj = {
        ...userInfoValidation,
        ...vehicleValidation
      }
      setFormValidation(obj)
    }
  }, [basket]);

  React.useEffect(() => {
    if (basketObj.orderConfirmation) {
      navigate('/orderconfirmation');
    } else if (basketObj.basket) {
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
          mask="(#00) 000-0000"
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
      deliverymode: orderType || ''
    }
    let formDataValue;

    if(orderType && (orderType === '' || orderType === DeliveryModeEnum.pickup || orderType === DeliveryModeEnum.curbside)){
      const { isValidForm, formData } = validatePickupForm();
      if (!isValidForm) {
        displayToast('ERROR', 'Pickup fields are required.');
        scrollToTop();
        setButtonDisabled(false);
        return;
      }
      formDataValue = formData
    }

    if(orderType && orderType === DeliveryModeEnum.delivery){
      const { isValidForm, formData } = validateDeliveryForm();
      if (!isValidForm) {
        displayToast('ERROR', 'Delivery fields are required.');
        scrollToTop();
        setButtonDisabled(false);
        return;
      }
      formDataValue = formData
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

    if(orderType && orderType === DeliveryModeEnum.curbside){
      customFields = formatCustomFields(restaurant.customfields, formDataValue)
    }

    if(orderType && orderType === DeliveryModeEnum.delivery){
      deliveryAddress = formatDeliveryAddress(formDataValue)
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
      dispatch(validateBasket(basket?.id, basketPayload, user, customFields, deliverymode, deliveryAddress));
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
                        <Typography variant="h4" title="PICK UP INFO">
                          PICK UP INFO
                        </Typography>
                      </Grid>
                      {
                       orderType && ( orderType === '' || orderType === DeliveryModeEnum.pickup || orderType === DeliveryModeEnum.curbside) ? (
                            <PickupForm basket={basket} pickupFormRef={pickupFormRef} />
                        ) : (null)
                      }
                      {
                        orderType && (orderType === DeliveryModeEnum.delivery) ? (
                            <DeliveryForm basket={basket} deliveryFormRef={deliveryFormRef} />
                        ) : (null)
                      }
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
              <Rewards />
              <br />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <br />
              <Tip basket={basket} />
              <br />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <br />
              {/*second section*/}
              <OrderDetail basket={basket} validate={validate} />
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
