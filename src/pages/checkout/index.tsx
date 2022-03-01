import React, { forwardRef } from 'react';
import {
  Box,
  Button,
  Card,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
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
import {  ResponseBasket, RequestUpdateBasketTimeWanted } from '../../types/olo-api';
import { IMaskInput } from 'react-imask';
import moment from 'moment';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { HoursListing } from '../../helpers/hoursListing';
import { CalendarTypeEnum } from '../../helpers/hoursListing';
import { getSingleRestaurantCalendar, updateBasketTimeWanted } from '../../redux/actions/basket/calendar';
import { ResponseRestaurantCalendars } from '../../types/olo-api';

const isTimeSame = (fTime: string, sTime: string): boolean => {
  return fTime.split(' ')[1] === sTime.split(' ')[1];
};

const GetRestaurantHoursRange = (
  hours: ResponseRestaurantCalendars,
  type: CalendarTypeEnum,
): HoursListing[] => {
  const selectedStoreHours = hours?.calendar.find((x) => x.type === type);
  let newHoursArray: HoursListing[] = [];
  if (selectedStoreHours) {
    selectedStoreHours && selectedStoreHours.ranges.forEach((item, index) => {
        newHoursArray.push({
          label: item.weekday.substring(0, 1),
          start: item.start,
          end: item.end,
          isOpenAllDay: isTimeSame(item.start, item.end),
        });
      })
  }
  return newHoursArray;
}


const Checkout = () => {
  const dispatch = useDispatch(); 
  const [selectedTime, setSelectedTime] = React.useState('');
  const [timeSlots, setTimeSlots] = React.useState<string[]>([]); 
  const [selectedDate, setSelectedDate] = React.useState<any>(new Date());
  const [open, setOpen] = React.useState<boolean>(false);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [restaurantHours, setRestaurantHours] = React.useState<HoursListing[]>();
  const [tipPercentage, setTipPercentage] = React.useState(0);
  const [tipAmount, setTipAmount] = React.useState(0);

  const basketObj = useSelector((state: any) => state.basketReducer);
  // const { calendar } = useSelector(    (state: any) => state.restaurantCalendarReducer  );

  React.useEffect(() => {
    if (basket) {
      dispatch(getSingleRestaurantCalendar(basket.vendorid, moment().format('YYYYMMDD'), moment().format('YYYYMMDD')));
    }
  }, [basket]);

  React.useEffect(() => {
    console.log('working 1')
    if (basketObj.basket) {
      setBasket(basketObj.basket);
    }

    if (basketObj.calendar.data) {
      console.log('working 2')

      setRestaurantHours(GetRestaurantHoursRange(basketObj.calendar.data, CalendarTypeEnum.business));
    }
    
  }, [basketObj.basket, basketObj.calendar.data]);

  React.useEffect(() => {
   console.log('restaurantHours', restaurantHours)
   if(restaurantHours && restaurantHours.length){
    generateNextAvailableTimeSlots(restaurantHours[0].start, restaurantHours[0].end, restaurantHours[0].isOpenAllDay )
   }
  }, [restaurantHours]);

  const createTimeWantedPayload = (time: string) => {
    const date = moment(time, 'YYYYMMDD HH:mm');
    const payload: RequestUpdateBasketTimeWanted = {
      ismanualfire: false,
      year: date.year(),
      month: date.month() + 1,
      day: date.date(),
      hour: date.hour(),
      minute: date.minute(),
      }
      return payload;
  }

  const onTimeSlotSelect = (event: any) => {
    const  timeSelect = event.target.value;
    setSelectedTime(timeSelect)
    if(timeSelect && timeSelect !== ''){
      const payload = createTimeWantedPayload(timeSelect)
        if(basket){
          dispatch(updateBasketTimeWanted(basket.id, payload));
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

  const calculateMinutesDiff = (minutes: number): number => {

    if([0, 15, 30, 45].includes(minutes)){
      return minutes;
   } else { 
      let difference = Math.ceil(minutes / 15);
      difference = (difference * 15) - minutes; 
      minutes = difference + 30;
      return minutes;
   }

  }

  const generateNextAvailableTimeSlots = (openingTime: string, closingTime: string, isOpenAllDay: Boolean) => {
    let timeSlots = [];
    let currentTime = moment();
    let startTime;

    let openAt = moment(openingTime, 'YYYYMMDD HH:mm');
    let closeAt = moment(closingTime, 'YYYYMMDD HH:mm');
    let minutes = currentTime.minutes();
    minutes = calculateMinutesDiff(minutes);

    if(currentTime.isAfter(closeAt)){
      return [];
    } else if (isOpenAllDay || currentTime.isBetween(openAt, closeAt)){
      startTime = currentTime.add(minutes, 'minute');
      if(isOpenAllDay){
        openAt.startOf('day');
        closeAt.endOf('day')
      }
    } else if (currentTime.isBefore(openAt)){
     startTime = openAt.add(15, 'm')
    }

    let count = 0;
    const maxAllowed = 7;
    while((closeAt.diff(openAt, 'seconds') > 900) && (count <= maxAllowed) ){
       timeSlots.push(moment(startTime).format('YYYYMMDD HH:mm'));
       startTime && startTime.add('m', 15);
       count++;
    }

    setTimeSlots(timeSlots)
  }

  const handleDateChange = (e: any) => {
    setSelectedDate(e)
    setOpen(!open);
  }

  React.useEffect(() => {
    console.log('selectedDate', selectedDate)
    if(basket){
      dispatch(getSingleRestaurantCalendar(basket.vendorid, moment(selectedDate).format('YYYYMMDD'), moment(selectedDate).format('YYYYMMDD')));
    }
  }, [selectedDate])

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
                          initialValues={{
                            email: '',
                            name: '',
                            phone: '',
                            emailNotification: false
                          }}
                          validationSchema={Yup.object({
                            name: Yup.string()
                              .max(15, 'Must be 15 characters or less')
                              .min(3, 'Must be at least 3 characters')
                              .matches(
                                /^[aA-zZ\s]+$/,
                                'Only letters are allowed for this field ',
                              )
                              .required('Name is required'),
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
                          onSubmit={async (values) => {
                            // const obj = {
                            //   email: values.email,
                            //   name: values.name,
                            //   phone: values.phone
                            //     ? values.phone.replace(/\D/g, '')
                            //     : ''
                            // };

                            // const data: any = await dispatch(updateUser(obj));
                          }}
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
                          aria-label="Name"
                          onBlur={handleBlur}
                          label="Name"
                          aria-required="true"
                          title="Name"
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          error={Boolean(touched.name && errors.name)}
                          helperText={errors.name}
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
                          InputLabelProps={{
                            // shrink: touched.phone && values.phone === '' ? false : true,
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
                            control={<Checkbox defaultChecked />}
                            label="Send me emails with special offers and updates"
                            aria-label="Send me emails with special offers and updates"
                            aria-required="true"
                            title="Send me emails with special offers and updates"
                            name="emailNotification"
                          />
                        </FormGroup>
                      </Grid>
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
                      <Typography style={{textTransform: 'uppercase'}} variant="h4" title={moment(selectedDate).format('dddd MMM.Do')}>
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
                          renderInput={
                                ({ inputRef, inputProps, InputProps }) => (
                                    <Box ref={inputRef}>
                                    </Box>
                                )   
                          }
                        />
                 </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <FormControl>
                          <Grid container>
                            <Grid item xs={6} sm={6} md={3} lg={3}>
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
                                        value={time}
                                        name={time}
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
                          <FormControl fullWidth className="time-slot">
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
                              value={selectedTime}
                              onChange={(event) => onTimeSlotSelect(event)}
                              label="Select More times"
                              title="Select More times"
                            >
                              {
                                    timeSlots.slice(4,7).map(time => {
                                      return (
                                        <MenuItem value={time}>
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
              <Tip />
              <br />
              <br />
              <Divider />
              <br />
              <br />
              <PaymentInfo />
              {/*second section ends here*/}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Checkout;
