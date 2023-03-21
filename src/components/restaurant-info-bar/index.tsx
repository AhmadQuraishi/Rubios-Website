import {
  Grid,
  Typography,
  useTheme,
  List,
  ListItem,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResturantCalendarRequest } from '../../redux/actions/restaurant/calendar';
import { ResponseRestaurant } from '../../types/olo-api';
import { GetUserFriendlyHoursRAW } from '../../helpers/getUserFriendlyHours';
import { HoursListing } from '../../helpers/hoursListing';
import { CalendarTypeEnum } from '../../helpers/hoursListing';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { updateUser } from '../../redux/actions/user';
import { getSingleLocation } from '../../redux/actions/location';
import './index.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import crossIcon from '../../assets/imgs/cross_square_icon.png';
import { OrderTypeDialog } from '../order-type-dialog';
import { isLoginUser } from '../../helpers/auth';
import { promotionalMsg } from '../../redux/actions/restaurant';
const useStyle = makeStyles({
  heading: {
    fontSize: '13px !important',
    color: '#fff',
    fontFamily: "'GritSans-Bold' !important"
  },
  heading1: {
    fontSize: '13px !important',
    color: '#fff',
    fontFamily:"'Librefranklin-Regular' !important",
  },
});

const StoreInfoBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyle();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [restaurantInfo, setRestaurantInfo] = useState<ResponseRestaurant>();
  const [restaurantHours, setRestaurantHours] = useState<HoursListing[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [showPromo, setShowPromo] = useState(true);
  const [locationId, setLocationId] = useState(null);
  const {restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const { calendar } = useSelector(
    (state: any) => state.restaurantCalendarReducer,
  );
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { singleLocation } = useSelector((state: any) => state.locationReducer);
  const basketObj = useSelector((state: any) => state.basketReducer);

  const dispatch = useDispatch();

  const getTimeFormat = (date: string) => {
    return moment(date, 'YYYYMMDD HH:mm').format('h:mm a');
  };

  useEffect(() => {
    if (singleLocation?.data?.length) {
      setLocationId(singleLocation.data[0].location_id);
    }
  }, [singleLocation]);

  useEffect(() => {
    if (restaurant) {
      setRestaurantInfo(restaurant);
      if (restaurant?.extref) {
        dispatch(getSingleLocation(restaurant.extref));
      }
    }
  }, [restaurant]);

  useEffect(() => {
    if (restaurantInfo) {
      var today = new Date();
      const dateFrom =
        today.getFullYear() * 1e4 +
        (today.getMonth() + 1) * 100 +
        today.getDate() +
        '';
      const lastWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 6,
      );
      const dateTo =
        lastWeekDate.getFullYear() * 1e4 +
        (lastWeekDate.getMonth() + 1) * 100 +
        lastWeekDate.getDate() +
        '';
      dispatch(
        getResturantCalendarRequest(restaurantInfo.id, dateFrom, dateTo),
      );
    }
  }, [restaurantInfo]);

  useEffect(() => {
    if (calendar) {
      setRestaurantHours(
        GetUserFriendlyHoursRAW(calendar, CalendarTypeEnum.business),
      );
    }
  }, [calendar]);

  const showHideFunc = () => {
    if (!isMobile) {
      return true;
    } else if (showMore) {
      return true;
    }
    return false;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDeleteFunction = () => {
    setOpen(false);
    // dispatch(resetBasketRequest());
    // dispatch(setResturantInfoRequest(null, ''));
    // setTimeout(() => {
    window.location.href = '/location';
    // }, 500);
  };

  const AddToFavourites = () => {
    if (checkFavorite()) {
      return;
    }
    if (locationId) {
      const obj = {
        favourite_location_ids: locationId,
      };
      dispatch(updateUser(obj, false));
    }
  };
  const checkFavorite = () => {
    let check = false;
    if (isLoginUser() && providerToken?.favourite_store_numbers && restaurant) {
      if (providerToken.favourite_store_numbers === restaurant.extref) {
        check = true;
      }
    }
    return check;
  };

  const orderSelectedType = () => {
    const type = basketObj?.basket?.deliverymode || orderType || '';

    if (type === 'dispatch') return 'Delivered From';
    if (type === 'dinein') return 'Dine In At';
    if (type === 'pickup' || type === 'curbside') return 'Pick Up From';
  };
  const getEstTimeFormat = (date: string, data2: string) => {
    return moment(date, 'YYYYMMDD HH:mm').add(data2, 'minutes').format('dddd h:mm A');
    // moment(startTime, 'HH:mm:ss').add(durationInMinutes, 'minutes').format('HH:mm');
  };
  useEffect(() => {
    const hasDisplayedDialog = sessionStorage.getItem('hasDisplayedDialog') || '';
    if (!hasDisplayedDialog) {
      setShowPromo(true);
    }
  }, []);
  const handlePromotionClose = () => {
    sessionStorage.setItem('hasDisplayedDialog', true.toString());
    setShowPromo(false);
    sessionStorage.removeItem('hasDisplayedDialog');
  };

  const EstimatedTime = () => {
    const type = basketObj?.basket?.deliverymode || orderType || '';
    const time = basketObj?.basket;
    // const 
    if (type === 'dispatch') {
    if (time?.timemode === 'asap') {
      return getEstTimeFormat(time.earliestreadytime,time.leadtimeestimateminutes);
    }
    else if (time?.timewanted)
     {
      return getEstTimeFormat(time.timewanted,time.leadtimeestimateminutes);
    }
  }
  }
  return (
    <>
    { !(process.env.REACT_APP_PROMOTIONAL_MESSAGE === '') && showPromo &&
     <Grid           sx={{
      backgroundColor: "#f8cd58",
      display: 'flex', flexDirection: "row",
      padding: { xs: '20px 20px', sm: '35px 40px', lg: '20px 100px' },
    }}>
      <Grid
          xs={11}
          sm={11.8}
          container
          spacing={0}
          sx={{
            fontFamily:"'Librefranklin-Bold' !important",
            color: {xs:"#062C43",sm : "#224c65"},
          }}

        >
          {process.env.REACT_APP_PROMO_MESSAGE}

          </Grid>
          <Grid        sx={{cursor: 'pointer',marginLeft: {xs: '10px'}}}   xs={1} sm={0.2}>
          <img
                src={crossIcon}
                title="Close Cart"
                height="20px"
                onClick={handlePromotionClose}
                width="20px"
                alt="Close Cart"
              />
          </Grid>
    </Grid>}
      {restaurantInfo && (

        <Grid
          container
          spacing={0}
          sx={{
            backgroundColor: "#062C43",
            padding: { xs: '15px 20px', sm: '35px 40px', lg: '20px 100px' },
          }}
        >
          {/* <DialogBox
            open={open}
            handleClose={handleClose}
            message={
              'If you change location, your selected items may not be available at the new location. Are you sure you want to change location?'
            }
            handleDeleteFunction={() => handleDeleteFunction()}
          /> */}
          <OrderTypeDialog
            type={'CHECKOUT'}
            openModal={openOrder}
            setOpenModal={setOpenOrder}
          />
          <Grid item xs={12}>
            <Grid container spacing={0} margin="auto">
              { !isMobile ? (
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  paddingRight: { xs: '0px', sm: '15px' },
                  paddingBottom: { xs: '0px', sm: '0px' },
                }}
              >
                <Grid sx={{ display: 'flex', flexDirection: 'inherit' }}>
                  <Typography
                    className={classes.heading}
                    variant="h2"
                    textTransform="uppercase"
                    title="Pick Up From"
                  >
                    {orderSelectedType()}
                  </Typography>
                  {/* {window?.location?.href
                    ?.toLocaleLowerCase()
                    ?.indexOf('/checkout') !== -1 && ( */}
                    {/* <>
                      <Typography
                        //variant="body2"
                        color="#fff"
                        fontSize={11}
                        className={classes.heading1}
                        variant="h2"
                        sx={{
                          marginLeft: '5px',
                          display: {
                            xs: 'none',
                            sm: 'none',
                            md: 'none',
                            lg: 'none',
                          },
                        }}
                      >
                        <p
                          style={{
                            cursor: 'pointer',
                            textDecorationLine: 'underline',
                          }}
                          role={'button'}
                          title="Change Order Type"
                          tabIndex={0}
                          onKeyPress={(e: any) => {
                            if (e.key === 'Enter') {
                              setOpenOrder(true);
                            }
                          }}
                          onClick={() => setOpenOrder(true)}
                        >
                          Change Order Type
                        </p>
                        {'\n'}
                      </Typography>
                    </> */}
                        {/* )} */}
                </Grid>
                <Typography
                  variant="h2"
                  color="#fff"
                  textTransform="uppercase"
                  lineHeight={1.3}
                  sx={{
                    fontFamily: {
                    xs: "'Librefranklin-Regular' !important",
                    sm:"'Sunborn-Sansone' !important",
                    },
                    fontSize: {
                      xs: '13px !important',
                      sm: '35px !important',
                      lg: '40px !important',
                    },
                  }}
                  title={restaurantInfo.name}
                >
                  {restaurantInfo.name}
                </Typography>
                {window?.location?.href
                  ?.toLocaleLowerCase()
                  ?.indexOf('/checkout') !== -1 &&
                  EstimatedTime() && (
                    <>
                      <Typography
                        className={classes.heading}
                        variant="h2"
                        sx={{
                        display: {
                          xs: 'none',
                          sm: 'flex',
                          md: 'flex',
                          lg: 'flex',
                        },
                        }}
                        textTransform="uppercase"
                        title="Pick Up From"
                      >
                        Estimated Delivery Time: {EstimatedTime()}
                      </Typography>
                    </>
                  )}
              </Grid> 
                    ) : (
                      <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  paddingRight: { xs: '0px', sm: '15px' },
                  paddingBottom: { xs: '0px', sm: '0px' },
                }}
              >
                <Grid onClick={() => {navigate('/location')}} sx={{ display: 'flex', flexDirection: 'row',alignItems: 'baseline',justifyContent: 'center', border: "1px solid #fff", borderRadius: "20px", }}>
                  <Typography
                    className={classes.heading}
                    variant="h2"
                    sx={{margin: "5px 0px 5px 0px", padding: '5px',}}
                    textTransform="uppercase"
                    title="Pick Up From"
                  >
                    {orderSelectedType()}
                  </Typography>

                <Typography
                  variant="h2"
                  color="#fff"
                  lineHeight={1.3}
                  sx={{
                    marginLeft : '10px',
                    maxWidth: { xs: '155px' },
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    padding: '0px 15px',
                    fontFamily: {
                    xs: "'Librefranklin-Regular' !important",
                    },
                    fontSize: {
                      xs: '13px !important',
                      sm: '35px !important',
                      lg: '40px !important',
                    },
                  }}
                  title={restaurantInfo.name}
                >
                  {restaurantInfo.name}
                </Typography>
                </Grid>
              </Grid> 
                    )}
              {/* {isMobile && (
                <Grid>
                  &nbsp;
                  <Typography
                    className={classes.heading1}
                    variant="h2"
                    color="#fff"
                    fontSize={11}
                    sx={{
                      marginTop: '-12px',
                      display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'none',
                        lg: 'none',
                      },
                    }}
                  >
                    <p
                      style={{
                        cursor: 'pointer',
                        textDecorationLine: 'underline',
                        
                      }}
                      role={'button'}
                      title="Change Location"
                      tabIndex={0}
                      // onKeyPress={(e: any) => {
                      //   if (e.key === 'Enter') {
                      //     handleClickOpen();
                      //   }
                      // }}
                      onClick={() => navigate('/location')}
                    >
                      Change location
                    </p>
                  </Typography>
                  <Grid
                    onClick={() => {
                      setShowMore(!showMore);
                    }}
                    item
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                    role={'button'}
                    tabIndex={0}
                    onKeyPress={(e: any) => {
                      if (e.key === 'Enter') {
                        setShowMore(!showMore);
                      }
                    }}
                    aria-label={`${showMore ? 'Hide' : 'View'} Details`}
                    xs={12}
                  >
                    <Typography
                      variant="h5"
                      className={classes.heading1}
                      sx={{
                        fontSize: '13px',
                        color: '#fff',

                        display: 'inline',
                      }}
                    >
                      {showMore ? 'Hide' : 'View'} Details
                    </Typography>
                    {showMore ? (
                      <ExpandLessIcon style={{ color: '#fff' }} />
                    ) : (
                      <ExpandMoreIcon style={{ color: '#fff' }} />
                    )}
                  </Grid>
                </Grid>
              )} */}
              {showHideFunc() && (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    sx={{
                      paddingRight: {
                        xs: '0px',
                        sm: '15px',
                        md: '20px',
                        lg: '20px',
                      },
                      paddingBottom: { xs: '15px', sm: '0px' },
                      paddingTop: { xs: '15px', sm: '0px' },
                      flexDirection: 'column',
                    }}
                  >
                    <Typography
                      className={classes.heading1}
                      variant="h2"
                      textTransform="uppercase"
                      title="Address"
                      sx={{
                        display: {
                          xs: 'block',
                          sm: 'none',
                          md: 'none',
                          lg: 'none',
                        },
                      }}
                    >
                      Address
                    </Typography>
                    <Typography
                      variant="body1"
                      color="#fff"
                      component="div"
                      textTransform="uppercase"
                      fontSize={11}
                      paddingTop="8px"
                      title={`${restaurantInfo.streetaddress}, ${restaurantInfo.city}, ${restaurantInfo.state}`}
                      sx={{
                        display: {
                          xs: 'block',
                          sm: 'none',
                          md: 'none',
                          lg: 'none',
                        },
                      }}
                    >
                      <p style={{ paddingBottom: '2px' }}>
                        {restaurantInfo.streetaddress}
                      </p>
                      <p style={{ paddingBottom: '2px' }}>
                        {restaurantInfo.city}, {restaurantInfo.state}
                      </p>
                      {restaurantInfo.distance > 0 && (
                        <p>{restaurantInfo.distance.toFixed(2)} Miles Away</p>
                      )}
                    </Typography>
                    {/* {window?.location?.href
                    ?.toLocaleLowerCase()
                    ?.indexOf('/checkout') !== -1 && (
                      <> */}
                        <Typography
                          color="#fff"
                          fontSize={11}
                          className={classes.heading1}
                          variant="h2"
                          sx={{
                            marginBottom: '5px',
                            display: {
                              xs: 'none',
                              sm: 'block',
                              md: 'block',
                              lg: 'block',
                            },
                          }}
                        >
                          <p
                            style={{
                              cursor: 'pointer',
                              textDecorationLine: 'underline',
                              fontSize: '13px',
                            }}
                            role={'button'}
                            title="Change Order Type"
                            tabIndex={0}
                            onKeyPress={(e: any) => {
                              if (e.key === 'Enter') {
                                setOpenOrder(true);
                              }
                            }}
                            onClick={() => setOpenOrder(true)}
                          >
                            Change Order Type
                          </p>
                        </Typography>
                      {/* </>
                    )} */}
                    <Typography
                      color="#fff"
                      fontSize={11}
                      className={classes.heading1}
                      variant="h2"
                      sx={{
                        display: {
                          marginBottom: 3,
                          xs: 'none',
                          sm: 'block',
                          md: 'block',
                          lg: 'block',
                        },
                      }}
                    >
                      <p
                        style={{
                          cursor: 'pointer',
                          textDecorationLine: 'underline',
                          fontSize: '13px',
                        }}
                        role={'button'}
                        tabIndex={0}
                        title="Change Location"
                        // onKeyPress={(e: any) => {
                        //   if (e.key === 'Enter') {
                        //     handleClickOpen();
                        //   }
                        // }}
                        onClick={() => navigate('/location')}
                      >
                        Change location
                      </p>
                    </Typography>
                    {isLoginUser() && (
                      <Typography
                        color="#fff"
                        className={classes.heading1}
                        variant="h2"
                        sx={{
                          display: {
                            xs: 'inline',
                            sm: 'inline',
                            md: 'inline',
                            lg: 'inline',
                          },
                        }}
                      >
                        <p
                          style={{
                            cursor: checkFavorite() ? 'inherit' : 'pointer',
                            textDecorationLine: checkFavorite()
                              ? 'none'
                              : 'underline',
                          }}
                          className={'add-favourite'}
                          role={'button'}
                          title={checkFavorite() ? 'Favourite' : 'Add to Favourite'}
                          aria-label={checkFavorite() ? 'Favourite' : 'Add to Favourite'}
                          tabIndex={0}
                          onKeyPress={(e: any) => {
                            if (e.key === 'Enter') {
                              AddToFavourites();
                            }
                          }}
                          onClick={() => AddToFavourites()}
                        >
                          {checkFavorite() ? 'Favorite' : 'Add to Favorites'}
                          {checkFavorite() ? (
                            <FavoriteIcon
                              sx={{
                                fontSize: '15px',
                                marginLeft: '3px',
                                display: {
                                  xs: 'inline',
                                  sm: 'inline',
                                  md: 'inline',
                                  lg: 'inline',
                                },
                              }}
                            />
                          ) : (
                            <FavoriteBorderIcon
                              sx={{
                                fontSize: '15px',
                                marginLeft: '3px',
                                display: {
                                  xs: 'inline',
                                  sm: 'inline',
                                  md: 'inline',
                                  lg: 'inline',
                                },
                              }}
                            />
                          )}
                        </p>
                      </Typography>
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    sx={{
                      flexDirection: 'column',
                      paddingTop: { xs: '5px', sm: '0px' },
                    }}
                  >
                    <Typography
                      className={classes.heading1}
                      variant="h2"
                      textTransform="uppercase"
                      title="Hours"
                      sx={{
                        paddingBottom: '5px',
                      }}
                    >
                      Hours
                    </Typography>
                    {restaurantHours &&
                      restaurantHours.length > 0 &&
                      restaurantHours.map((item: any, index: number) => (
                        <Grid
                          container
                          spacing={0}
                          key={index}
                          sx={{
                            display: {
                              xs: 'flex',
                              sm: 'none',
                              md: 'none',
                              lg: 'none',
                            },
                          }}
                        >
                          <Grid item xs={3}>
                            <List
                              sx={{
                                padding: '2px 0 0 0',
                                fontSize: '12px',
                                //fontWeight: '600',
                                color: 'background.paper',
                              }}
                              role="presentation"
                            >
                              <ListItem
                                sx={{
                                  padding: '0 0 0 0',
                                  fontFamily:"'Librefranklin-Regular' !important",
                                }}
                                title={
                                  (item.weekday &&
                                    item.weekday.toUpperCase()) ||
                                  ''
                                }
                              >
                                {(item.weekday && item.weekday.toUpperCase()) ||
                                  ''}
                              </ListItem>
                            </List>
                          </Grid>
                          <Grid item xs={9}>
                            <List
                              sx={{
                                padding: '2px 0 0 0',
                                fontSize: '12px',
                                fontWeight: '500',
                                color: 'background.paper',
                                fontFamily:"'Librefranklin-Regular' !important",
                              }}
                              role="presentation"
                            >
                              <ListItem
                                sx={{
                                  padding: '0 0 0 0',
                                }}
                                title={
                                  item.isOpenAllDay
                                    ? 'Open 24 hours'
                                    : getTimeFormat(item.start) +
                                      ' - ' +
                                      getTimeFormat(item.end)
                                }
                              >
                                {item.isOpenAllDay
                                  ? 'Open 24 hours'
                                  : getTimeFormat(item.start) +
                                    ' - ' +
                                    getTimeFormat(item.end)}
                              </ListItem>
                            </List>
                          </Grid>
                        </Grid>
                      ))}
                    <>
                      {restaurantHours &&
                        restaurantHours.length > 0 &&
                        restaurantHours
                          .slice(0, 1)
                          .map((item: any, index: number) => (
                            <Grid
                              container
                              spacing={0}
                              key={index}
                              sx={{
                                display: {
                                  xs: 'none',
                                  sm: 'flex',
                                  md: 'flex',
                                  lg: 'flex',
                                },
                              }}
                            >
                              <Grid item xs={3}>
                                <List
                                  sx={{
                                    padding: '2px 0 0 0',
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: 'background.paper',
                                  }}
                                  role="presentation"
                                >
                                  <ListItem
                                    sx={{
                                      padding: '0 0 0 0',
                                      fontFamily:"'Librefranklin-Regular' !important",
                                    }}
                                    title={
                                      (item.weekday &&
                                        item.weekday.toUpperCase()) ||
                                      ''
                                    }
                                  >
                                    {(item.weekday &&
                                      item.weekday.toUpperCase()) ||
                                      ''}
                                  </ListItem>
                                </List>
                              </Grid>
                              <Grid item xs={9}>
                                <List
                                  sx={{
                                    padding: '2px 0 0 0',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    color: 'background.paper',
                                    fontFamily:"'Librefranklin-Regular' !important",
                                  }}
                                  role="presentation"
                                >
                                  <ListItem
                                    sx={{
                                      padding: '0 0 0 0',
                                    }}
                                    title={
                                      item.isOpenAllDay
                                        ? 'Open 24 hours'
                                        : getTimeFormat(item.start) +
                                          ' - ' +
                                          getTimeFormat(item.end)
                                    }
                                  >
                                    {item.isOpenAllDay
                                      ? 'Open 24 hours'
                                      : getTimeFormat(item.start) +
                                        ' - ' +
                                        getTimeFormat(item.end)}
                                  </ListItem>
                                </List>
                              </Grid>
                            </Grid>
                          ))}
                      <Grid
                        sx={{
                          marginTop: '4px',
                          display: {
                            xs: 'none',
                            sm: 'block',
                            md: 'block',
                            lg: 'block',
                          },
                        }}
                        onClick={() => {
                          setShowMore(!showMore);
                        }}
                        item
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          cursor: 'pointer',
                        }}
                        role={'button'}
                        tabIndex={0}
                        title={`${showMore ? 'Hide' : 'View'} Details`}
                        onKeyPress={(e: any) => {
                          if (e.key === 'Enter') {
                            setShowMore(!showMore);
                          }
                        }}
                        xs={12}
                      >
                        <Typography
                          variant="h5"
                          className={classes.heading1}
                          sx={{
                            fontSize: '13px',
                            fontWeight: '500',
                            color: '#fff',
                            // display: 'inline',
                            display: {
                              xs: 'none',
                              sm: 'block',
                              md: 'block',
                              lg: 'block',
                            },
                          }}
                        >
                          {showMore ? 'Hide' : 'View'} Details
                        </Typography>
                        {showMore ? (
                          <ExpandLessIcon
                            sx={{
                              display: {
                                xs: 'none',
                                sm: 'block',
                                md: 'block',
                                lg: 'block',
                              },
                            }}
                            style={{ color: '#fff' }}
                          />
                        ) : (
                          <ExpandMoreIcon
                            sx={{
                              display: {
                                xs: 'none',
                                sm: 'block',
                                md: 'block',
                                lg: 'block',
                              },
                            }}
                            style={{ color: '#fff' }}
                          />
                        )}
                      </Grid>
                      {!showMore ? (
                        <></>
                      ) : (
                        <>
                          {restaurantHours &&
                            restaurantHours.length > 0 &&
                            restaurantHours
                              .slice(1)
                              .map((item: any, index: number) => (
                                <Grid
                                  container
                                  spacing={0}
                                  key={index}
                                  sx={{
                                    display: {
                                      xs: 'none',
                                      sm: 'flex',
                                      md: 'flex',
                                      lg: 'flex',
                                    },
                                  }}
                                >
                                  <Grid item xs={3}>
                                    <List
                                      sx={{
                                        padding: '2px 0 0 0',
                                        fontSize: '12px',
                                        fontWeight: '600',
                                        color: 'background.paper',
                                      }}
                                      role="presentation"
                                    >
                                      <ListItem
                                        sx={{
                                          padding: '0 0 0 0',
                                          fontFamily:"'Librefranklin-Regular' !important",
                                        }}
                                        title={
                                          (item.weekday &&
                                            item.weekday.toUpperCase()) ||
                                          ''
                                        }
                                      >
                                        {(item.weekday &&
                                          item.weekday.toUpperCase()) ||
                                          ''}
                                      </ListItem>
                                    </List>
                                  </Grid>
                                  <Grid item xs={9}>
                                    <List
                                      sx={{
                                        padding: '2px 0 0 0',
                                        fontSize: '12px',
                                        fontWeight: '500',
                                        color: 'background.paper',
                                        fontFamily:"'Librefranklin-Regular' !important",
                                      }}
                                      role="presentation"
                                    >
                                      <ListItem
                                        sx={{
                                          padding: '0 0 0 0',
                                        }}
                                        title={
                                          item.isOpenAllDay
                                            ? 'Open 24 hours'
                                            : getTimeFormat(item.start) +
                                              ' - ' +
                                              getTimeFormat(item.end)
                                        }
                                      >
                                        {item.isOpenAllDay
                                          ? 'Open 24 hours'
                                          : getTimeFormat(item.start) +
                                            ' - ' +
                                            getTimeFormat(item.end)}
                                      </ListItem>
                                    </List>
                                  </Grid>
                                </Grid>
                              ))}
                          <Typography
                            className={classes.heading1}
                            variant="h2"
                            textTransform="uppercase"
                            title="Address"
                            sx={{
                              marginTop: '10px',
                              display: {
                                xs: 'none',
                                sm: 'block',
                                md: 'block',
                                lg: 'block',
                              },
                            }}
                          >
                            Address
                          </Typography>
                          <Typography
                            variant="body1"
                            color="#fff"
                            component="div"
                            textTransform="uppercase"
                            fontSize={11}
                            fontFamily={"'Librefranklin-Regular' !important"}                            paddingTop="8px"
                            title={`${restaurantInfo.streetaddress}, ${restaurantInfo.city}, ${restaurantInfo.state}`}
                            sx={{
                              display: {
                                xs: 'none',
                                sm: 'block',
                                md: 'block',
                                lg: 'block',
                              },
                            }}
                          >
                            <p style={{ paddingBottom: '2px' }}>
                              {restaurantInfo.streetaddress}
                            </p>
                            <p style={{ paddingBottom: '2px' }}>
                              {restaurantInfo.city}, {restaurantInfo.state}
                            </p>
                            {restaurantInfo.distance > 0 && (
                              <p>
                                {restaurantInfo.distance.toFixed(2)} Miles Away
                              </p>
                            )}
                          </Typography>
                        </>
                      )}
                    </>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default React.memo(StoreInfoBar);