import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  FormControl,
  FormLabel,
  ToggleButtonGroup,
  ToggleButton,
  Select,
  InputLabel,
  MenuItem,
  Box,
  NativeSelect,
  TextField,
} from '@mui/material';
import moment from 'moment';
import './index.css';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterMoment from '@mui/lab/AdapterMoment';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSingleRestaurantCalendar,
  updateBasketTimeWanted,
  deleteBasketTimeWanted,
} from '../../redux/actions/basket/checkout';
import {
  generateNextAvailableTimeSlots,
  GetRestaurantHoursRange,
  createTimeWantedPayload,
} from '../../helpers/checkout';
import { HoursListing } from '../../helpers/hoursListing';
import { CalendarTypeEnum } from '../../helpers/hoursListing';
import { useNavigate } from 'react-router-dom';
import { ResponseBasket } from '../../types/olo-api';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';

const OrderTime = ({ orderType }: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState<any>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<any>('');
  const [restaurantHours, setRestaurantHours] =
    React.useState<HoursListing[]>();
  const [timeSlots, setTimeSlots] = React.useState<string[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [notAvailableSlots, setNotAvailableSlots] = useState(false);
  const [selectShrink, setSelectShrink] = useState(false);

  const basketObj = useSelector((state: any) => state.basketReducer);

  React.useEffect(() => {
    if (basketObj.basket) {
      if (basketObj.basket?.timewanted) {
        setSelectedDate(moment(basketObj.basket.timewanted, 'YYYYMMDD HH:mm'));
        setSelectedTime(basketObj.basket.timewanted);
      }
      setBasket(basketObj.basket);
    } else {
      navigate('/location');
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

  // React.useEffect(() => {
  //   if (basket) {
  //     dispatch(
  //       getSingleRestaurantCalendar(
  //         basket.vendorid,
  //         moment(selectedDate).format('YYYYMMDD'),
  //         moment(selectedDate).format('YYYYMMDD'),
  //       ),
  //     );
  //   }
  // }, [selectedDate]);

  React.useEffect(() => {
    if (restaurantHours && restaurantHours.length) {
      const slots = generateNextAvailableTimeSlots(
        restaurantHours[0].start,
        restaurantHours[0].end,
        restaurantHours[0].isOpenAllDay,
      );
      if (!slots.length) {
        setNotAvailableSlots(true);
      } else {
        setNotAvailableSlots(false);
      }
      setTimeSlots(slots);
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
    console.log('eeeeeeeeeeee', e);
    console.log('date 1', moment(e).format('YYYYMMDD'));
    console.log('date 2', moment(selectedDate).format('YYYYMMDD'));

    try {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (!isDateFormatSet) {
          let dateNodes: any = document.querySelectorAll('.MuiPickersDay-root');
          dateNodes.forEach((item: any) => {
            const attributeValue = item.getAttribute('aria-label');
            if (attributeValue) {
              const date = new Date(attributeValue);
              item.setAttribute(
                'aria-label',
                moment(date).format('dddd MMM. D, YYYY'),
              );
            }
          });
          isDateFormatSet = true;
        }
      }, 1000);
    } catch (e) {}

    const startDate = moment().toDate();
    const endDate = moment().add('days', 7).toDate();

    const range = moment(e).isBetween(startDate, endDate, 'days', '[]');
    setSelectedDate(e);
    const callAllow = range;

    if (
      callAllow &&
      basket &&
      moment(e).format('YYYYMMDD') !== moment(selectedDate).format('YYYYMMDD')
    ) {
      dispatch(
        getSingleRestaurantCalendar(
          basket.vendorid,
          moment(e).format('YYYYMMDD'),
          moment(e).format('YYYYMMDD'),
        ),
      );
    }
    //setOpen(!open);
  };
  let timer: any = null;
  let isDateFormatSet = false;
  const setAttributesForDate = () => {
    setOpen(!open);

    document
      .getElementsByClassName('MuiInputAdornment-root')[0]
      .addEventListener('click', () => {
        setTimeout(() => {
          let dateNodes: any = document.querySelectorAll('.MuiPickersDay-root');
          dateNodes.forEach((item: any) => {
            const attributeValue = item.getAttribute('aria-label');
            if (attributeValue) {
              const date = new Date(attributeValue);
              item.setAttribute(
                'aria-label',
                moment(date).format('dddd, MMMM D, YYYY'),
              );
            }
          });
        }, 500);
      });
  };

  return (
    <Grid item xs={12} sm={6} md={6} lg={6} className="right-col">
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            title={
              orderType === DeliveryModeEnum.dinein
                ? 'DATE'
                : orderType === DeliveryModeEnum.delivery
                ? 'DELIVERY TIME'
                : 'PICKUP TIME'
            }
            className="label"
          >
            {orderType === DeliveryModeEnum.dinein
              ? 'DATE'
              : orderType === DeliveryModeEnum.delivery
              ? 'DELIVERY TIME'
              : 'PICKUP TIME'}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography
          style={{ textTransform: 'uppercase' }}
          variant="h2"
          title={moment(selectedDate).format('dddd MMM Do')}
        >
          {moment(selectedDate).format('dddd MMM Do')}
        </Typography>
      </Grid>
      {orderType !== DeliveryModeEnum.dinein && (
        <>
          <Grid item xs={12}>
            <Button
              aria-label="change"
              title="change"
              className="caption-grey"
              onClick={() => {
                setAttributesForDate();
              }}
            >
              (change)
            </Button>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                //open={open}
                label="Order Date"
                minDate={moment()}
                maxDate={moment().add('days', 7)}
                inputFormat="MM/DD/yyyy"
                value={selectedDate}
                views={['day']}
                className="order-date"
                onChange={(e) => handleDateChange(e)}
                renderInput={(params) => (
                  <TextField
                    className="order-date"
                    style={{ display: open ? 'block' : 'none' }}
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} className="time-slot-wrapper">
            <Grid container>
              <FormControl>
                <Grid container>
                  {notAvailableSlots ? (
                    <Grid item xs={12}>
                      <Typography
                        variant="caption"
                        className="label"
                        style={{ color: 'red' }}
                      >
                        No availabe slots. Please try a different Date.
                      </Typography>
                    </Grid>
                  ) : (
                    <Grid item xs={6} sm={6} md={3} lg={3}>
                      <FormLabel
                        className="slot-label"
                        title="QUICKEST"
                        id="demo-row-radio-buttons-group-label"
                      >
                        QUICKEST
                      </FormLabel>
                    </Grid>
                  )}
                </Grid>
                <ToggleButtonGroup
                  value={selectedTime}
                  exclusive
                  onChange={(event) => onTimeSlotSelect(event)}
                  className="selected-btn-group"
                >
                  {/* <Grid container spacing={2}> */}
                  {timeSlots.slice(0, 4).map((time) => {
                    return (
                      // <Grid item xs={6} sm={6} md={3} lg={3}>
                      <ToggleButton
                        key={`button-${time}`}
                        value={time}
                        className="selected-btn"
                        selected={selectedTime === time ? true : false}
                      >
                        {moment(time, 'YYYYMMDD HH:mm').format('hh:mm A')}
                      </ToggleButton>
                      // </Grid>
                    );
                  })}
                  {/* </Grid> */}
                </ToggleButtonGroup>
              </FormControl>
            </Grid>
          </Grid>
          {timeSlots.length > 4 ? (
            <Grid item xs={12}>
              <FormControl
                fullWidth
                className={`${
                  timeSlots.slice(4).includes(selectedTime)
                    ? 'time-slot-selected'
                    : 'time-slot'
                }`}
              >
                <InputLabel
                  id="select-more-times"
                  aria-label="More Times"
                  title="More Times"
                  className="time-picker"
                  classes={{
                    root:
                      !selectShrink &&
                      !timeSlots.slice(4).includes(selectedTime)
                        ? 'select-custom-css'
                        : '',
                  }}
                  style={{ textAlign: 'center' }}
                  shrink={
                    selectShrink || timeSlots.slice(4).includes(selectedTime)
                  }
                >
                  MORE TIMES
                </InputLabel>
                {}
                <NativeSelect
                  id="select-label"
                  className={`native-select`}
                  role="dialog"
                  aria-modal="true"
                  aria-label="select more time"
                  value={
                    timeSlots.slice(4).includes(selectedTime)
                      ? selectedTime
                      : ''
                  }
                  onClick={() => {
                    console.log('open');
                  }}
                  onChange={(event) => {
                    if (event.target.value == '') {
                      return;
                    }
                    onTimeSlotSelect(event);
                  }}
                  title="Select More times"
                >
                  {timeSlots.slice(4).map((time, index) => {
                    return (
                      <option key={`menu-${time}`} value={time}>
                        {moment(time, 'YYYYMMDD HH:mm').format('hh:mm A')}
                      </option>
                    );
                  })}
                  <option value="" style={{ display: 'none' }}></option>
                </NativeSelect>
              </FormControl>
            </Grid>
          ) : null}
        </>
      )}
    </Grid>
  );
};

export default OrderTime;
