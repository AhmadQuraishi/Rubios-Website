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
import { generateSubmitBasketPayload, formatCustomFields } from '../../helpers/checkout';
import { updateUser } from '../../redux/actions/user';


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
  const paymentInfoRef = React.useRef<any>();
  const [formValidation, setFormValidation] = React.useState<any>(userInfoValidation);

  const [runOnce, setRunOnce] = React.useState<boolean>(true);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [validate, setValidate] = React.useState<ResponseBasketValidation>();

  const basketObj = useSelector((state: any) => state.basketReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { restaurant } = useSelector((state: any) => state.restaurantInfoReducer);

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
      dispatch(validateBasket(basket.id, null, null, []));
      setRunOnce(false);
    }
  }, [basket]);

  React.useEffect(() => {
    if (basket && basket.deliverymode === DeliveryModeEnum.curbside) {
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

    console.log('pickupFormRef', pickupFormRef);

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
    const { isValidForm, formData } = validatePickupForm();

    if (!isValidForm) {
      displayToast('ERROR', 'Pickup fields are required.');
      scrollToTop();
      setButtonDisabled(false);
      return;
    }

    const { isValidCard, cardDetails, errors } = await validatePaymentForm();

    if (!isValidCard) {
      displayToast('ERROR', errors?.message);
      setButtonDisabled(false);
      return;
    }

    formData.phone = formData.phone.replace(/\D/g, '');

    const basketPayload = generateSubmitBasketPayload(
      formData,
      cardDetails,
      basket?.deliverymode,
      authToken?.authtoken,
    );

    if(basket?.deliverymode === DeliveryModeEnum.curbside){
      customFields = formatCustomFields(restaurant.customfields, formData)
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
          marketing_email_subscription: formData.emailNotification,
          phone: formData.phone,
        };
      }
      dispatch(validateBasket(basket?.id, basketPayload, user, customFields));
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
                      <Formik
                        innerRef={pickupFormRef}
                        enableReinitialize={true}
                        initialValues={{
                          firstName: providerToken?.first_name
                            ? providerToken?.first_name
                            : '',
                          lastName: providerToken?.last_name
                            ? providerToken?.last_name
                            : '',
                          phone: providerToken?.phone
                            ? providerToken?.phone
                            : '',
                          email: providerToken?.email
                            ? providerToken?.email
                            : '',
                          emailNotification:
                            providerToken?.marketing_email_subscription
                              ? providerToken?.marketing_email_subscription
                              : false,
                          vehicleModal: '',  
                          vehicleMake: '',  
                          vehicleColor: ''
                        }}
                        validationSchema={Yup.object({
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
                          vehicleModal: basket && basket.deliverymode === DeliveryModeEnum.curbside ? Yup.string().max(15, 'Must be 15 characters or less').required('Vehicle Modal is required') : Yup.string(),
                          vehicleMake: basket && basket.deliverymode === DeliveryModeEnum.curbside ? Yup.string().max(15, 'Must be 15 characters or less').required('Vehicle Make is required') : Yup.string(),
                          vehicleColor: basket && basket.deliverymode === DeliveryModeEnum.curbside ? Yup.string().max(15, 'Must be 15 characters or less').required('Vehicle Color is required') : Yup.string(),
                          emailNotification: Yup.bool().optional()
                        })}
                        onSubmit={(values, actions) => {}}
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
                          <form
                            style={{ width: '100%' }}
                            onSubmit={handleSubmit}
                          >
                            <Grid item xs={12}>
                              <TextField
                                aria-label="First Name"
                                disabled={authToken?.authtoken ? true : false}
                                onBlur={handleBlur}
                                label="First Name"
                                aria-required="true"
                                title="First Name"
                                type="text"
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                error={Boolean(
                                  touched.firstName && errors.firstName,
                                )}
                                helperText={errors.firstName}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                aria-label="Last Name"
                                disabled={authToken?.authtoken ? true : false}
                                onBlur={handleBlur}
                                label="Last Name"
                                aria-required="true"
                                title="Last Name"
                                type="text"
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                error={Boolean(
                                  touched.lastName && errors.lastName,
                                )}
                                helperText={errors.lastName}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                className="mobile-field"
                                aria-label="Phone Number"
                                onBlur={handleBlur}
                                label="Phone Number"
                                aria-required="true"
                                title="Phone Number"
                                value={values.phone}
                                onChange={handleChange}
                                name="phone"
                                InputLabelProps={{
                                  shrink:
                                    touched && values.phone == ''
                                      ? false
                                      : true,
                                  classes: {
                                    root:
                                      values.phone !== ''
                                        ? 'mobile-field-label'
                                        : '',
                                  },
                                }}
                                InputProps={{
                                  inputComponent: NumberFormatCustom as any,
                                }}
                                error={Boolean(touched.phone && errors.phone)}
                                helperText={errors.phone}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <TextField
                                aria-label="Email"
                                disabled={authToken?.authtoken ? true : false}
                                onBlur={handleBlur}
                                label="Email"
                                aria-required="true"
                                title="Email"
                                type="text"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                error={Boolean(touched.email && errors.email)}
                                helperText={errors.email}
                              />
                            </Grid>

                            {
                          basket && basket.deliverymode === DeliveryModeEnum.curbside ? (
                          <>
                                    <Grid container spacing={1}>

                                        <Grid item xs={6}>
                                          <TextField
                                            aria-label="Vehicle Modal"
                                            onBlur={handleBlur}
                                            label="Vehicle Modal"
                                            aria-required="true"
                                            title="Vehicle Modal"
                                            type="text"
                                            name="vehicleModal"
                                            value={values.vehicleModal}
                                            onChange={handleChange}
                                            error={Boolean(
                                              touched.vehicleModal && errors.vehicleModal,
                                            )}
                                            helperText={errors.vehicleModal}
                                          />
                                        </Grid>

                                        <Grid item xs={6}>
                                          <TextField
                                            aria-label="Vehicle Make"
                                            onBlur={handleBlur}
                                            label="Vehicle Make"
                                            aria-required="true"
                                            title="Vehicle Make"
                                            type="text"
                                            name="vehicleMake"
                                            value={values.vehicleMake}
                                            onChange={handleChange}
                                            error={Boolean(
                                              touched.vehicleMake && errors.vehicleMake,
                                            )}
                                            helperText={errors.vehicleMake}
                                          />
                                        </Grid> 
                                    
                                    </Grid>

                                    <Grid item xs={12}>
                                      <TextField
                                        aria-label="Vehicle Color"
                                        onBlur={handleBlur}
                                        label="Vehicle Color"
                                        aria-required="true"
                                        title="Vehicle Color"
                                        type="text"
                                        name="vehicleColor"
                                        value={values.vehicleColor}
                                        onChange={handleChange}
                                        error={Boolean(
                                          touched.vehicleColor && errors.vehicleColor,
                                        )}
                                        helperText={errors.vehicleColor}
                                      />
                                    </Grid>
                          </>
                          ) : (null)
                      } 

                            <Grid item xs={12}>
                              <FormGroup>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={values.emailNotification}
                                      onChange={handleChange}
                                    />
                                  }
                                  label="Send me emails with special offers and updates."
                                  aria-label="Send me emails with special offers and updates"
                                  aria-required="true"
                                  title="Send me emails with special offers and updates"
                                  name="emailNotification"
                                  className="size"
                                />
                              </FormGroup>
                            </Grid>
                          </form>
                        )}
                      </Formik>
                     
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
