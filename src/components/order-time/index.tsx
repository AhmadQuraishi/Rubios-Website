import React from 'react';
import { Grid,
  Typography,
  Button,
  FormControl,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  InputLabel,
  MenuItem,
  Box
 } from '@mui/material';
import moment from 'moment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { useDispatch, useSelector } from 'react-redux';
import {getSingleRestaurantCalendar, updateBasketTimeWanted, deleteBasketTimeWanted } from '../../redux/actions/basket/checkout';
import {
  generateNextAvailableTimeSlots,
  GetRestaurantHoursRange,
  createTimeWantedPayload } from '../../helpers/checkout';
import { HoursListing } from '../../helpers/hoursListing';
import { CalendarTypeEnum } from '../../helpers/hoursListing';
import { useNavigate } from 'react-router-dom';
import {  ResponseBasket } from '../../types/olo-api';



const OrderTime = ()  => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState<any>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<any>('');
  const [restaurantHours, setRestaurantHours] = React.useState<HoursListing[]>();
  const [timeSlots, setTimeSlots] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [basket, setBasket] = React.useState<ResponseBasket>();

  const basketObj = useSelector((state: any) => state.basketReducer);

  React.useEffect(() => {
    if (basketObj.basket) {
      if(basketObj.basket?.timewanted){
        setSelectedDate(moment(basketObj.basket.timewanted, 'YYYYMMDD HH:mm'));
        setSelectedTime(basketObj.basket.timewanted);
      }
      setBasket(basketObj.basket);
    } else {
      navigate('/location')
    }
  }, [basketObj.basket]);

  React.useEffect(() => {
    if (basketObj.calendar && basketObj.calendar.data) {
      setRestaurantHours(
        GetRestaurantHoursRange(
          basketObj.calendar.data,
          CalendarTypeEnum.business,
        ),
      );
    }
  }, [basketObj.calendar]);

  React.useEffect(() => {
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

  const handleDateChange = (e: any) => {
    setSelectedDate(e);
    setOpen(!open);
    if (basket) {
      dispatch(
        getSingleRestaurantCalendar(
          basket.vendorid,
          moment(e).format('YYYYMMDD'),
          moment(e).format('YYYYMMDD'),
        ),
      );
    }
  };

  return (
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
                          maxDate={moment().add('days', 7)}
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
                    <Grid item xs={12} className="time-slot-wrapper">
                      <Grid container>
                        <FormControl>
                          <Grid container>
                            <Grid item xs={6} sm={3} md={3} lg={3}>
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
                            className="selected-btn-group"
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
                                        {moment(time, 'YYYYMMDD HH:mm').format('hh:mm A')}
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
                                        {moment(time, 'YYYYMMDD HH:mm').format('hh:mm A')}
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
  );
};

export default OrderTime;
