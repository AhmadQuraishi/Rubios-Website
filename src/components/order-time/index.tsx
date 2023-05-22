import React, { useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import moment from 'moment';
import './index.css';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteBasketTimeWanted,
  getSingleRestaurantCalendar,
  updateBasketTimeWanted,
} from '../../redux/actions/basket/checkout';
import {
  createTimeWantedPayload,
  generateNextAvailableTimeSlots,
  GetRestaurantHoursRange,
} from '../../helpers/checkout';
import { CalendarTypeEnum, HoursListing } from '../../helpers/hoursListing';
import { useNavigate } from 'react-router-dom';
import { ResponseBasket } from '../../types/olo-api';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';
import { MobileDatePicker } from '@mui/x-date-pickers';

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
  const [asapTime, setAsapTime] = useState(false);
  const basketObj = useSelector((state: any) => state.basketReducer);
  const time = basketObj?.basket;
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
  const getEstTimeFormat = (date: string) => {
    return moment(date, 'YYYYMMDD HH:mm').format('h:mmA');
  };
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
  const EstimatedTime = () => {
    const type = basketObj?.basket?.deliverymode || orderType || '';
    const time = basketObj?.basket;
    const isToday = moment().isSame(selectedDate, 'day');

    if (type === 'dispatch' && time?.timemode === 'asap' && isToday) {
      return getEstTimeFormat(time.earliestreadytime);
    }
  };

  // const handleEstTime = (time: any, time2: any) => {
  //   let localTime = moment(new Date());
  //   let earlyReadyTime = moment(time, 'YYYYMMDD HH:mm');

  //   const minute = earlyReadyTime.diff(localTime, 'minutes');
  //   const minutes = minute;
  //   return minutes && minutes > 0 ? minutes : 0;
  //   console.log(minutes, 'minutesminutesminutesminutes');
  // };

  console.log('time.earliestreadytime', time?.earliestreadytime);
  React.useEffect(() => {
    if (restaurantHours && restaurantHours.length) {
      const slots = generateNextAvailableTimeSlots(
        restaurantHours[0]?.start,
        restaurantHours[0]?.end,
        time?.leadtimeestimateminutes,
        orderType,
        time?.timewanted,
        selectedDate,
      );
      if (!slots.length) {
        setNotAvailableSlots(true);
      } else {
        setNotAvailableSlots(false);
      }
      setTimeSlots(slots);
    }
    // debugger;
  }, [restaurantHours, basket]);

  const onTimeSlotSelect = (event: any) => {
    const selectedValue = event.target.value;
    console.log('selectedValue', selectedValue);
    // setSelectedTime(selectedValue);
    if (selectedValue && selectedValue !== '') {
      //   if (selectedValue === basket?.timewanted) {
      //     if (basket) {
      //       dispatch(deleteBasketTimeWanted(basket.id));
      //       setSelectedTime('');
      //     }
      //   } else {
      const payload = createTimeWantedPayload(selectedValue);
      if (basket) {
        dispatch(updateBasketTimeWanted(basket.id, payload));
        // setSelectedTime(selectedValue);
      }
    }
    // }
  };

  const onAsapSelected = () => {
    // const selectedValue = event.target.value;
    // console.log('selectedValue', selectedValue);
    // setSelectedTime(selectedValue);
    // if (selectedValue && selectedValue !== '') {
    //   if (selectedValue === basket?.timewanted) {
    if (basket && basket.timemode !== 'asap') {
      dispatch(deleteBasketTimeWanted(basket.id));
      setSelectedTime('');
    }
    //   } else {
    // const payload = createTimeWantedPayload(selectedValue);
    // if (basket) {
    //   dispatch(updateBasketTimeWanted(basket.id, payload));
    // }
    //   }
    // }
  };

  const handleDateChange = (e: any) => {
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

    document.getElementById('dateTime_check')?.addEventListener('click', () => {
      setTimeout(() => {
        let dateNodes: any = document.querySelectorAll('.MuiPickersDay-root');
        dateNodes.forEach((item: any) => {
          item.removeAttribute('tabIndex');
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

  const handleTime = (time: any) => {
    let localTime = moment(new Date());
    let earlyReadyTime = moment(time, 'YYYYMMDD HH:mm');

    const minutes = earlyReadyTime.diff(localTime, 'minutes');
    return minutes && minutes > 0 ? minutes : 0;
  };

  const hideRemoveAsap = () => {
    let currentTime = moment();

    if (restaurantHours && restaurantHours.length) {
      let openAt = moment(restaurantHours[0].start, 'YYYYMMDD HH:mm');
      let closeAt = moment(restaurantHours[0].end, 'YYYYMMDD HH:mm');

      return currentTime.isBetween(openAt, closeAt);
    } else {
      return false;
    }
  };

  return (
    <>
      <Grid item xs={12} sm={6} md={6} lg={6} className="right-col">
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h3"
              sx={{
                fontSize: '11pt !important',
                fontFamily: "'Sunborn-Sansone'!important",
                letterSpacing: '0.03562em',
              }}
              title={
                orderType === DeliveryModeEnum.dinein
                  ? 'DATE'
                  : orderType === DeliveryModeEnum.dispatch
                  ? 'DELIVERY TIME'
                  : 'PICKUP TIME'
              }
              className="label"
            >
              {orderType === DeliveryModeEnum.dinein
                ? 'DATE'
                : orderType === DeliveryModeEnum.dispatch
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
            {moment(selectedDate).format('dddd MMM D')}

            <sup style={{ fontSize: 20 }}>
              {moment(selectedDate).format('Do').replace(/(\d)/g, '')}
            </sup>
          </Typography>
        </Grid>
        {orderType !== DeliveryModeEnum.dinein && (
          <>
            <Grid item xs={12}>
              <button
                aria-label="Change Order Time"
                aria-expanded={open}
                aria-controls="date-picker"
                title="Change Order Time"
                className="caption-grey font-change"
                style={{
                  marginTop: -10,
                  color: '#58595b',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  setAttributesForDate();
                }}
              >
                (change)
              </button>
              <div id="date-picker" aria-labelledby="date-picker-title">
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <MobileDatePicker
                    label="Order Date"
                    DialogProps={{
                      TransitionProps: { role: 'dialog', 'aria-modal': 'true' },
                    }}
                    minDate={moment()}
                    maxDate={moment().add('days', 7)}
                    inputFormat="MM/DD/yyyy"
                    value={selectedDate}
                    views={['day']}
                    className="order-date"
                    onChange={(e: any) => handleDateChange(e)}
                    renderInput={(params: any) => (
                      <TextField
                        id="dateTime_check"
                        className="order-date"
                        style={{ display: open ? 'block' : 'none' }}
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
              {window?.location?.href
                ?.toLocaleLowerCase()
                ?.indexOf('/checkout') !== -1 &&
                EstimatedTime() && (
                  <>
                    <Typography
                      // className={classes.heading}
                      sx={{
                        fontFamily: "'Sunborn-Sansone'!important",
                        color: '#0075BF',
                        display: {
                          xs: 'flex',
                          sm: 'flex',
                        },
                      }}
                      textTransform="uppercase"
                      title="Pick Up From"
                    >
                      Estimated Delivery Time
                    </Typography>

                    <Typography
                      // className={classes.heading}

                      sx={{
                        marginBottom: { sm: '8px', xs: '0px' },
                        marginTop: { sm: '-10px', xs: '0px' },
                        fontSize: '29px',
                        fontFamily: "'GritSans-Bold' !important",
                        color: '#122b40',
                        letterSpacing: '0.03562em',
                        display: {
                          xs: 'flex',
                          sm: 'flex',
                        },
                      }}
                      textTransform="uppercase"
                      title="Pick Up From"
                    >
                      {EstimatedTime()}
                    </Typography>
                  </>
                )}
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
                        {/* <FormLabel
                        className="slot-label"
                        title="QUICKEST"
                        id="demo-row-radio-buttons-group-label"
                      >
                        QUICKEST
                      </FormLabel> */}
                      </Grid>
                    )}
                  </Grid>
                  <ToggleButtonGroup
                    value={selectedTime}
                    exclusive
                    sx={{ fontFamily: 'Librefranklin-Regular !important' }}
                    onChange={(event) => onTimeSlotSelect(event)}
                    className="selected-btn-group"
                  >
                    {/* <Grid container spacing={2}> */}
                    {timeSlots.length !== 0 && hideRemoveAsap() && (
                      <ToggleButton
                        sx={{
                          backgroundColor: '#062C43',
                          fontFamily: 'Librefranklin-Regular !important',
                        }}
                        key={`button-${basketObj.basket?.earliestreadytime}`}
                        value={basketObj.basket?.earliestreadytime}
                        className="selected-btn"
                        onClick={() => {
                          onAsapSelected();
                        }}
                        selected={
                          basketObj.basket?.timemode === 'asap' || asapTime
                        }
                      >
                        <h3>
                          ASAP{' '}
                          <span
                            style={{
                              fontSize: '10px',
                              display: 'block',
                              textTransform: 'none',
                              letterSpacing: 1,
                              fontFamily: "'Librefranklin-Regular' !important",
                            }}
                          >
                            Est{' '}
                            {handleTime(basketObj.basket?.earliestreadytime)}{' '}
                            mins
                          </span>
                        </h3>
                      </ToggleButton>
                    )}

                    {timeSlots.slice(0, 3).map((time) => {
                      return (
                        // <Grid item xs={6} sm={6} md={3} lg={3}>
                        <ToggleButton
                          onChange={() => setAsapTime(true)}
                          key={`button-${time}`}
                          value={time}
                          className="selected-btn"
                          sx={{
                            fontFamily: 'Librefranklin-Regular !important',
                          }}
                          style={{
                            backgroundColor: '#062C43',
                            fontSize: '16px',
                          }}
                          selected={selectedTime === time ? true : false}
                        >
                          {/* {index === 0 ? */}
                          {/* <h3>ASAP <span style={{fontSize: '10px', display: 'block', textTransform: 'none'}}>Est {handleTime(basketObj.basket?.earliestreadytime)} mins</span></h3> :  */}
                          {moment(time, 'YYYYMMDD HH:mm').format('h:mm A')}
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
                    htmlFor={'select-label'}
                    title="More Times"
                    className="time-picker"
                    classes={{
                      root:
                        !selectShrink &&
                        !timeSlots.slice(4).includes(selectedTime)
                          ? 'select-custom-css'
                          : '',
                    }}
                    sx={{ fontFamily: "'Librefranklin-Regular' !important" }}
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
                    sx={{ fontFamily: 'Librefranklin-Regular !important' }}
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
                          {moment(time, 'YYYYMMDD HH:mm').format('h:mm A')}
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
    </>
  );
};

export default OrderTime;
