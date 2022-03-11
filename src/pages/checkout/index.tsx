import React, { forwardRef, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography
} from '@mui/material';
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
import {  ResponseBasket, ResponseBasketValidation, ResponseContactOptions } from '../../types/olo-api';
import { IMaskInput } from 'react-imask';
import moment from 'moment';
import { HoursListing } from '../../helpers/hoursListing';
import { getSingleRestaurantCalendar, validateBasket } from '../../redux/actions/basket/checkout';
import { displayToast } from '../../helpers/toast';
import { generateSubmitBasketPayload } from '../../helpers/checkout';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pickupFormRef = React.useRef<any>(null);
  const paymentInfoRef = React.useRef<any>();


  const [runOnce, setRunOnce] = React.useState<boolean>(true);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [validate, setValidate] = React.useState<ResponseBasketValidation>();

  const basketObj = useSelector((state: any) => state.basketReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const { providerToken } = useSelector((state: any) => state.providerReducer);

  React.useEffect(() => {
    if (basket && runOnce) {
      let selectedTime = moment().format('YYYYMMDD');
      if(basket.timewanted){
        selectedTime = moment(basket.timewanted, 'YYYYMMDD HH:mm').format('YYYYMMDD')
      }
      dispatch(
        getSingleRestaurantCalendar(
          basket.vendorid,
          selectedTime,
          selectedTime,
        ),
      );
      dispatch(validateBasket(basket.id, null))
      setRunOnce(false);
    }
  }, [basket]);

  React.useEffect(() => {
    if (basketObj.orderConfirmation) {
      navigate('/orderconfirmation')
    } else if (basketObj.basket) {
      setBasket(basketObj.basket);
    } else {
      navigate('/location')
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
      behavior: "smooth"
    });
  };

  const validatePickupForm = () : any => {

    let data = {
      isValidForm: false,
      formData: null
    }

    if(!pickupFormRef.current){
    }
    else if (!pickupFormRef.current.dirty){
      pickupFormRef.current.submitForm();
    }
    else if (Object.keys(pickupFormRef.current.errors).length > 0){
    }
    else {
      data.isValidForm = true;
      data.formData = pickupFormRef.current.values;
    }

    return data;

  }

  const validatePaymentForm = async ()  => {

    let data: any = {
      isValidCard: false,
      cardDetails: null,
      errors: {}
    }

    const cardDetails = await paymentInfoRef.current.getCardDetails();

    if(cardDetails.error){
      data.errors = cardDetails.error;
    } else if(cardDetails.paymentMethod){
      data.cardDetails = cardDetails.paymentMethod;
      data.isValidCard = true;
    }

    return data;

  }

  const placeOrder = async () => {

    setButtonDisabled(true);
   const {isValidForm, formData} =  validatePickupForm();

   if(!isValidForm){
        displayToast('ERROR', 'Pickup fields are required.');
        scrollToTop();
        setButtonDisabled(false);
        return;
   }

   const {isValidCard, cardDetails, errors } = await validatePaymentForm();

   if(!isValidCard){
        displayToast('ERROR', errors?.message);
        setButtonDisabled(false);
        return;
   }

   formData.phone = formData.phone.replace(/\D/g, '')

   const basketPayload = generateSubmitBasketPayload(formData, cardDetails, authToken?.authtoken);
  //  const contactOptionsPayload: ResponseContactOptions = {
  //     optin: formData.emailNotification,
  //     marketingsms: false,
  //     upsell: false,
  //     emailreceipts: false,
  //     followups: false
  //  }

    if(basket){
      setButtonDisabled(false);
      dispatch(validateBasket(basket.id, basketPayload))
    }
  }

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
                          WHO'S IS PICKING UP?
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
                            firstName: providerToken?.first_name ? providerToken?.first_name : '',
                            lastName: providerToken?.last_name ? providerToken?.last_name : '',
                            phone: providerToken?.phone ? providerToken?.phone : '',
                            email: providerToken?.email ? providerToken?.email : '',
                            emailNotification: providerToken?.marketing_email_subscription ? providerToken?.marketing_email_subscription : false
                          }}
                          validationSchema={Yup.object({
                            firstName: Yup.string()
                              .max(15, 'Must be 15 characters or less')
                              .min(3, 'Must be at least 3 characters')
                              .matches(
                                /^[aA-zZ\s]+$/,
                                'Only letters are allowed for this field ',
                              )
                              .required('First Name is required'),
                            lastName: Yup.string()
                              .max(15, 'Must be 15 characters or less')
                              .min(3, 'Must be at least 3 characters')
                              .matches(
                                /^[aA-zZ\s]+$/,
                                'Only letters are allowed for this field ',
                              )
                              .required('Last Name is required'),
                            email: Yup.string()
                              .matches(
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                'Invalid Email ',
                              )
                              .email('Invalid email address')
                              .required('Email is required'),

                            phone: Yup.string().min(14, 'Enter valid number').required('Phone is required'),
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
                    <form style={{width: '100%'}} onSubmit={handleSubmit}>
                      <Grid item xs={12}>
                        <TextField
                          aria-label="First Name"
                          onBlur={handleBlur}
                          label="First Name"
                          aria-required="true"
                          title="First Name"
                          type="text"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          error={Boolean(touched.firstName && errors.firstName)}
                          helperText={errors.firstName}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          aria-label="Last Name"
                          onBlur={handleBlur}
                          label="Last Name"
                          aria-required="true"
                          title="Last Name"
                          type="text"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          error={Boolean(touched.lastName && errors.lastName)}
                          helperText={errors.lastName}
                        />
                      </Grid>

                      <Grid item xs={12}>
                              <TextField
                                aria-label="Phone Number"
                                onBlur={handleBlur}
                                label="Phone Number"
                                aria-required="true"
                                title="Phone Number"
                                value={values.phone}
                                onChange={handleChange}
                                name="phone"
                                InputLabelProps={
                                  {
                                    // shrink: values.phone !== '' ? true : false,
                                  }
                                }
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

                              <Grid item xs={12}>
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox checked={values.emailNotification} onChange={handleChange}  />}
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
              <Divider />
              <br />
              <br />
              <Rewards />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <Tip basket={basket} />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              {/*second section*/}
              <OrderDetail basket={basket} validate={validate} />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <Rewards />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <PaymentInfo ref={paymentInfoRef} />
              {/*second section ends here*/}
              <Grid container className="add-order">
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Button disabled={buttonDisabled || basketObj?.loading} onClick={placeOrder} variant="contained" title="PLACE ORDER">
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
