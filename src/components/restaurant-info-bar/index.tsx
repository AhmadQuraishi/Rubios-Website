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
import DialogBox from '../dialog-box';
import { resetBasketRequest } from '../../redux/actions/basket';
import { setResturantInfoRequest } from '../../redux/actions/restaurant';
import { updateUser } from '../../redux/actions/user';
import { getlocations } from '../../redux/actions/location';
import './index.css';
import moment from 'moment';
const useStyle = makeStyles({
  heading: {
    fontSize: '13px !important',
    color: '#fff',
    fontFamily: 'Poppins-Medium !important',
  },
});

const StoreInfoBar = () => {
  const theme = useTheme();
  const classes = useStyle();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isDesktop = useMediaQuery(theme.breakpoints.down('lg'));
  const [restaurantInfo, setRestaurantInfo] = useState<ResponseRestaurant>();
  const [restaurantHours, setRestaurantHours] = useState<HoursListing[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [open, setOpen] = useState(false);
  const [locationId, setLocationId] = useState(null);
  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const { calendar } = useSelector(
    (state: any) => state.restaurantCalendarReducer,
  );
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);

  const { locations, loading: loadingLocations } = useSelector(
    (state: any) => state.locationReducer,
  );
  const dispatch = useDispatch();

  const getTimeFormat = (date: string) => {
    return moment(date, 'YYYYMMDD HH:mm').format('h:mm A');
  };
  useEffect(() => {
    dispatch(getlocations());
  }, []);

  useEffect(() => {
    if (locations && locations.length && restaurant) {
      const loc = locations.find(
        (loc: any) => loc.store_number.toString() === restaurant.extref,
      );
      if (loc) {
        setLocationId(loc.location_id);
      }
    }
  }, [locations, restaurant]);

  useEffect(() => {
    if (restaurant) {
      setRestaurantInfo(restaurant);
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
    dispatch(resetBasketRequest());
    dispatch(setResturantInfoRequest(null, ''));
    setTimeout(() => {
      window.location.href = '/location';
    }, 500);
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
    if (providerToken && providerToken.favourite_store_numbers && restaurant) {
      if (providerToken.favourite_store_numbers === restaurant.extref) {
        check = true;
      }
    }
    return check;
  };

  return (
    <>
      {restaurantInfo && (
        <Grid
          container
          spacing={0}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            padding: { xs: '30px 20px', sm: '35px 40px', lg: '20px 100px' },
          }}
        >
          <DialogBox
            open={open}
            handleClose={handleClose}
            message={
              'If you change location, your selected items will be removed from your basket, and you will have to choose the items again. Are you sure you want to change locations?'
            }
            handleDeleteFunction={() => handleDeleteFunction()}
          />
          <Grid item xs={12}>
            <Grid container spacing={0} margin="auto">
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  paddingRight: { xs: '0px', sm: '15px' },
                  paddingBottom: { xs: '0px', sm: '0px' },
                }}
              >
                <Typography
                  className={classes.heading}
                  variant="h2"
                  textTransform="uppercase"
                  title="Pick Up From"
                >
                  {orderType && orderType == 'dispatch' && 'Delivered From'}
                  {orderType && orderType == 'dinein' && 'Dine In At'}
                  {orderType &&
                    (orderType == 'pickup' || orderType == 'curbside') &&
                    'Pick Up From'}
                </Typography>
                <Typography
                  variant="h2"
                  color="#fff"
                  textTransform="uppercase"
                  fontWeight={700}
                  lineHeight={1.3}
                  fontFamily="Poppins-Bold !important"
                  sx={{
                    fontSize: {
                      xs: '30px !important',
                      sm: '35px !important',
                      lg: '40px !important',
                    },
                  }}
                  title={restaurantInfo.name}
                >
                  {restaurantInfo.name}
                </Typography>
              </Grid>
              {isMobile && (
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
                    sx={{
                      fontSize: '13px',
                      fontWeight: '500',
                      fontFamily: 'Poppins-Medium !important',
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
              )}

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
                      className={classes.heading}
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
                    <Typography
                      variant="body2"
                      color="#fff"
                      fontSize={11}
                      sx={{
                        display: {
                          xs: 'block',
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
                        aria-label={'Change location'}
                        tabIndex={0}
                        onKeyPress={(e: any) => {
                          if (e.key === 'Enter') {
                            handleClickOpen();
                          }
                        }}
                        onClick={() => handleClickOpen()}
                      >
                        Change location
                      </p>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="#fff"
                      fontSize={11}
                      sx={{
                        marginTop: '22px',
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
                        aria-label={'Change location'}
                        tabIndex={0}
                        onKeyPress={(e: any) => {
                          if (e.key === 'Enter') {
                            handleClickOpen();
                          }
                        }}
                        onClick={() => handleClickOpen()}
                      >
                        Change location
                      </p>
                    </Typography>
                    {providerToken &&
                      authToken &&
                      authToken.authtoken &&
                      authToken.authtoken !== '' && (
                        <Typography
                          variant="body2"
                          color="#fff"
                          fontSize={11}
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
                            aria-label={'Change location'}
                            tabIndex={0}
                            onKeyPress={(e: any) => {
                              if (e.key === 'Enter') {
                                AddToFavourites();
                              }
                            }}
                            onClick={() => AddToFavourites()}
                          >
                            {checkFavorite()
                              ? 'Favourited'
                              : 'Add to Favourites'}

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
                      className={classes.heading}
                      variant="h2"
                      textTransform="uppercase"
                      title="Hours"
                      sx={{
                        paddingBottom: '5px',
                      }}
                    >
                      Hours
                    </Typography>
                    {
                     restaurantHours &&
                      restaurantHours.length > 0 &&
                      restaurantHours.map(
                        (item: any, index: number,) => (                         
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
                                  fontWeight: '600',
                                  color: 'background.paper',
                                }}
                                role="presentation"
                              >
                                <ListItem
                                  sx={{
                                    padding: '0 0 0 0',
                                    fontFamily: "'Poppins-Medium' !important",
                                  }}
                                  title={item.weekday && item.weekday.toUpperCase() || ""}
                                >
                                  {item.weekday && item.weekday.toUpperCase() || ""}
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
                                  fontFamily: "'Poppins-Medium' !important",
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
                                      : getTimeFormat(item.start) + ' - ' + getTimeFormat(item.end)
                                  }
                                >
                                  {item.isOpenAllDay
                                    ? 'Open 24 hours'
                                    : getTimeFormat(item.start) + ' - ' + getTimeFormat(item.end) }
                                </ListItem>
                              </List>
                            </Grid>
                          </Grid>
                        ),
                      )}
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
                                      fontFamily: "'Poppins-Medium' !important",
                                    }}
                                    title={item.weekday && item.weekday.toUpperCase() || ""}
                                  >
                                    {item.weekday && item.weekday.toUpperCase() || ""}
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
                                    fontFamily: "'Poppins-Medium' !important",
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
                                        : getTimeFormat(item.start) + ' - ' + getTimeFormat(item.end) 
                                    }
                                  >
                                    {item.isOpenAllDay
                                      ? 'Open 24 hours'
                                      : getTimeFormat(item.start)  + ' - ' + getTimeFormat(item.end) }
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
                          sx={{
                            fontSize: '13px',
                            fontWeight: '500',
                            fontFamily: 'Poppins-Medium !important',
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
                                          fontFamily:
                                            "'Poppins-Medium' !important",
                                        }}
                                        title={item.weekday && item.weekday.toUpperCase() || ""}
                                      >
                                        {item.weekday && item.weekday.toUpperCase() || ""}
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
                                        fontFamily:
                                          "'Poppins-Medium' !important",
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
                                            : getTimeFormat(item.start)+ ' - ' + getTimeFormat(item.end)
                                        }
                                      >
                                        {item.isOpenAllDay
                                          ? 'Open 24 hours'
                                          : getTimeFormat(item.start) + ' - ' + getTimeFormat(item.end)}
                                      </ListItem>
                                    </List>
                                  </Grid>
                                </Grid>
                              ))}
                          <Typography
                            className={classes.heading}
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
                            paddingTop="8px"
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
