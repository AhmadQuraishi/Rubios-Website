import React, { forwardRef, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  FormLabel,
  Grid,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
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
import PaymentInfo from '../../components/payment-info';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import StoreInfoBar from '../../components/restaurant-info-bar';
import './checkout.css';
import {  ResponseBasket, RequestUpdateBasketTimeWanted, RequestBasketSubmit } from '../../types/olo-api';
import { IMaskInput } from 'react-imask';
import moment from 'moment';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { HoursListing } from '../../helpers/hoursListing';
import { CalendarTypeEnum } from '../../helpers/hoursListing';
import { getSingleRestaurantCalendar, updateBasketTimeWanted, deleteBasketTimeWanted, validateBasket } from '../../redux/actions/basket/checkout';
import { displayToast } from '../../helpers/toast';
import { 
  generateSubmitBasketPayload, 
  GetRestaurantHoursRange, 
  generateNextAvailableTimeSlots,
  createTimeWantedPayload } from '../../helpers/checkout';

const Checkout = () => {
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const pickupFormRef = React.useRef<any>(null);
  const paymentInfoRef = React.useRef<any>();
   
  const [selectedTime, setSelectedTime] = React.useState('');
  const [timeSlots, setTimeSlots] = React.useState<string[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<any>(new Date());
  const [open, setOpen] = React.useState<boolean>(false);
  const [runOnce, setRunOnce] = React.useState<boolean>(true);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [restaurantHours, setRestaurantHours] = React.useState<HoursListing[]>();

  const basketObj = useSelector((state: any) => state.basketReducer);
  const tokenObj = useSelector((state: any) => state.TokensReducer);

  React.useEffect(() => {
    if (basket && runOnce) {
      dispatch(
        getSingleRestaurantCalendar(
          basket.vendorid,
          moment().format('YYYYMMDD'),
          moment().format('YYYYMMDD'),
        ),
      );
      setSelectedTime(basket.timewanted ? basket.timewanted : '');
      setRunOnce(false);
    }
  }, [basket]);

  React.useEffect(() => {
    console.log('working 1');
    if (basketObj.basket) {
      setBasket(basketObj.basket);
    } else {
      navigate('/location')
    }

    if (basketObj.calendar && basketObj.calendar.data) {
      setRestaurantHours(
        GetRestaurantHoursRange(
          basketObj.calendar.data,
          CalendarTypeEnum.business,
        ),
      );
    }
  }, [basketObj.basket, basketObj.calendar]);

  React.useEffect(() => {
    console.log('restaurantHours', restaurantHours);
    if (restaurantHours && restaurantHours.length) {
     const slots =  generateNextAvailableTimeSlots(
        restaurantHours[0].start,
        restaurantHours[0].end,
        restaurantHours[0].isOpenAllDay,
      );
      setTimeSlots(slots)
    }
  }, [restaurantHours]);

  const onTimeSlotSelect = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedTime(selectedValue);
    if (selectedValue && selectedValue !== '') {
      if (selectedValue === basket?.timewanted) {
        if (basket) {
          dispatch(deleteBasketTimeWanted(basket.id));
          setSelectedTime('');
        }
      } else {
        const payload = createTimeWantedPayload(selectedValue);
        if (basket) {
          dispatch(updateBasketTimeWanted(basket.id, payload));
        }
      }
    }
  };

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

  const handleDateChange = (e: any) => {
    setSelectedDate(e);
    setOpen(!open);
  };

  React.useEffect(() => {
    console.log('selectedDate', selectedDate);
    if (basket) {
      dispatch(
        getSingleRestaurantCalendar(
          basket.vendorid,
          moment(selectedDate).format('YYYYMMDD'),
          moment(selectedDate).format('YYYYMMDD'),
        ),
      );
    }
  }, [selectedDate]);

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

   const payload = generateSubmitBasketPayload(formData, cardDetails, tokenObj.authtoken);
  
    if(basket){
      setButtonDisabled(false);
      dispatch(validateBasket(basket.id, payload))
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
                          title="WHO IS PICKING UP?"
                        >
                          WHO IS PICKING UP?
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
                            firstName: '',
                            lastName: '',
                            phone: '',
                            email: '',
                            emailNotification: false
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
                    <form onSubmit={handleSubmit}>
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

                            {
                              tokenObj.authtoken && tokenObj.authtoken === '' ? (
                              <Grid item xs={12}>
                                <FormGroup>
                                  <FormControlLabel
                                    control={<Checkbox defaultChecked />}
                                    label="Send me emails with special offers and updates"
                                    aria-label="Send me emails with special offers and updates"
                                    aria-required="true"
                                    title="Send me emails with special offers and updates"
                                    name="emailNotification"
                                  />
                                </FormGroup>
                              </Grid>
                              ) : (null)
                            }

                          </form>
                        )}
                      </Formik>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6} className="right-col">
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          variant="caption"
                          title="PICKUP TIME"
                          className="label"
                        >
                          PICKUP TIME
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        style={{ textTransform: 'uppercase' }}
                        variant="h4"
                        title={moment(selectedDate).format('dddd MMM.Do')}
                      >
                        {moment(selectedDate).format('dddd MMM.Do')}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        aria-label="change"
                        title="change"
                        className="caption-grey"
                        onClick={() => setOpen(!open)}
                      >
                        (change)
                      </Button>
                      <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                          open={open}
                          label="Date desktop"
                          minDate={moment()}
                          inputFormat="MM/dd/yyyy"
                          value={selectedDate}
                          onChange={handleDateChange}
                          renderInput={({
                            inputRef,
                            inputProps,
                            InputProps,
                          }) => <Box ref={inputRef}></Box>}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <FormControl>
                          <Grid container>
                            <Grid item xs={3} sm={3} md={3} lg={3}>
                              <FormLabel
                                className="slot-label"
                                title="QUICKEST"
                                id="demo-row-radio-buttons-group-label"
                              >
                                QUICKEST
                              </FormLabel>
                            </Grid>
                          </Grid>
                          <ToggleButtonGroup
                            value={selectedTime}
                            exclusive
                            onChange={(event) => onTimeSlotSelect(event)}
                            className="selected-btn"
                          >
                            {/* <Grid container spacing={2}> */}
                              {
                                timeSlots.slice(0,4).map(time => {
                                  return (
                                    // <Grid item xs={6} sm={6} md={3} lg={3}>
                                      <ToggleButton
                                        key={`button-${time}`}
                                        value={time}
                                        className="selected-btn"
                                        selected={ selectedTime === time ? true : false}
                                      >
                                        {moment(time, 'YYYYMMDD HH:mm').format('HH:mm')}
                                      </ToggleButton>
                                    // </Grid>
                                  )
                                })
                              }
                            {/* </Grid> */}
                          </ToggleButtonGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    {
                      timeSlots.length > 4 ? (
                        <Grid item xs={12}>
                          <FormControl fullWidth className={`${timeSlots.slice(4).includes(selectedTime) ? 'time-slot-selected' : 'time-slot'}`}>
                            <InputLabel
                              id="select-more-times"
                              aria-label="More Times"
                              title="More Times"
                            >
                              MORE TIMES
                            </InputLabel>
                            <Select
                              id="select-label"
                              labelId="select-more-times"
                              value={timeSlots.slice(4).includes(selectedTime) ? selectedTime : ''}
                              onChange={(event) => onTimeSlotSelect(event)}
                              label="Select More times"
                              title="Select More times"
                            >
                              {
                                    timeSlots.slice(4).map(time => {
                                      return (
                                        <MenuItem key={`menu-${time}`} value={time}>
                                        {moment(time, 'YYYYMMDD HH:mm').format('HH:mm')}
                                        </MenuItem>
                                      )
                                    })
                              }
                            </Select>
                          </FormControl>
                        </Grid>
                      ) : (null)
                    }
                    
                  </Grid>
                </Grid>
              </Grid>
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
              <OrderDetail basket={basket} />
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
