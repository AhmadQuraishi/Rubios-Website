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
import {
  ResponseBasket,
} from '../../types/olo-api';
import { IMaskInput } from 'react-imask';
import moment from 'moment';
import AdapterMoment from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { HoursListing } from '../../helpers/hoursListing';
import { GetUserFriendlyHours } from '../../helpers/getUserFriendlyHours';
import { CalendarTypeEnum } from '../../helpers/hoursListing';
import { getSingleRestaurantCalendar } from '../../redux/actions/basket/calendar';
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
  const [time, setTime] = React.useState('');
  const [timeSlots, setTimeSlots] = React.useState<string[]>([]); 
  const [selectedDate, setSelectedDate] = React.useState<any>(new Date());
  const [open, setOpen] = React.useState<boolean>(false);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [restaurantHours, setRestaurantHours] = React.useState<HoursListing[]>();

  const basketObj = useSelector((state: any) => state.basketReducer);
  // const { calendar } = useSelector(    (state: any) => state.restaurantCalendarReducer  );

  React.useEffect(() => {
    if (basket) {
      dispatch(getSingleRestaurantCalendar(basket.vendorid, moment().format('YYYYMMDD'), moment().format('YYYYMMDD')));
    }
  }, [basket]);

  React.useEffect(() => {
    if (basketObj.basket) {
      setBasket(basketObj.basket);
    }

    if (basketObj.calendar.data) {
      setRestaurantHours(GetRestaurantHoursRange(basketObj.calendar.data, CalendarTypeEnum.business));
    }
    
  }, [basketObj.basket]);

  React.useEffect(() => {
   console.log('restaurantHours', restaurantHours)
   if(restaurantHours && restaurantHours.length){
    generateNextAvailableTimeSlots(restaurantHours[0].start, restaurantHours[0].end)
   }
  }, [restaurantHours]);

  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };

  const [alignment, setAlignment] = React.useState('web');
  const onTimeSlotSelect = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
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

  const generateNextAvailableTimeSlots = (openingTime: string, ClosingTime: string) => {
    // let timeSlots = [];
    // const currentTime = moment().format();

    // if(currentTime )
    // let start = moment(startTime, 'YYYYMMDD HH:mm');
    // let end = moment(endTime, 'YYYYMMDD HH:mm');

    // let currentTime = moment(startTime, 'YYYYMMDD HH:mm');

    // console.log('start.diff(end,)', start.diff(end, 'seconds'))
    // while(end.diff(start, 'seconds') > 900){
    //   timeSlots.push(moment(start).format('YYYYMMDD HH:mm'));
    //     start.add('m', 15);
    // }

    // console.log('timeSlots', timeSlots)
    // setTimeSlots(timeSlots)
  }

  const handleDateChange = (e: any) => {
    setSelectedDate(e)
    setOpen(!open);
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

                            phone: Yup.string().min(14, 'Enter valid number'),
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
                          label="Name"
                          aria-required="true"
                          title="Name"
                          type="text"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          error={Boolean(touched && errors.name)}
                          helperText={errors.name}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          aria-label="Phone Number"
                          label="Phone Number"
                          aria-required="true"
                          title="Phone Number"
                          value={values.phone}
                          onChange={handleChange}
                          name="phone"
                          InputLabelProps={{
                            shrink: touched && values.phone == '' ? false : true,
                          }}
                          InputProps={{
                            inputComponent: NumberFormatCustom as any,
                          }}
                          error={Boolean(touched && errors.phone)}
                          helperText={errors.phone}


                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          aria-label="Email"
                          label="Email"
                          aria-required="true"
                          title="Email"
                          type="text"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          error={Boolean(touched && errors.email)}
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
                      <Typography variant="h4" title="THURSDAY SEPT.9TH">
                        THURSDAY SEPT.9TH
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
                            value={alignment}
                            exclusive
                            onChange={onTimeSlotSelect}
                          >
                            <Grid container spacing={2}>
                              {
                                timeSlots.slice(0,4).map(time => {
                                  return (
                                    <Grid item xs={6} sm={6} md={3} lg={3}>
                                      <ToggleButton
                                        value="06:10"
                                        className="selected-btn"
                                      >
                                        {moment(time, 'YYYYMMDD HH:mm').format('HH:mm')}
                                      </ToggleButton>
                                    </Grid>
                                  )
                                })
                              }
                            </Grid>
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
                              value={time}
                              onChange={handleChange}
                              label="Select More times"
                              title="Select More times"
                            >
                              {
                                    timeSlots.slice(4,7).map(time => {
                                      return (
                                        <MenuItem value={moment(time, 'YYYYMMDD HH:mm').format('HH:mm')} title= {moment(time, 'YYYYMMDD HH:mm').format('HH:mm')}>
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
              <OrderDetail />
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
