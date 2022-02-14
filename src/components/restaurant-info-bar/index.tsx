import { Grid, Typography, useTheme, List, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getResturantInfoRequest } from '../../redux/actions/restaurant';
import { getResturantCalendarRequest } from '../../redux/actions/restaurant/calendar';
import {
  ResponseRestaurant,
  CalendarTypeEnum as typeEnum,
} from '../../types/olo-api';
import { GetUserFriendlyHours } from '../../helpers/getUserFriendlyHours';

const useStyle = makeStyles({
  heading: {
    fontSize: '13px',
    color: '#fff',
    fontFamily: 'Poppins-Medium !important',
  },
});

const StoreInfoBar = () => {
  const theme = useTheme();
  const classes = useStyle();
  const [restaurantInfo, setRestaurantInfo] = useState<ResponseRestaurant>();
  const [restaurantHours, setRestaurantHours] = useState([]);
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const { calendar } = useSelector(
    (state: any) => state.restaurantCalendarReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //TODO: StoreID will get from State when select store work will be done
    const storeID = 60854;
    dispatch(getResturantInfoRequest(storeID));
  }, []);

  useEffect(() => {
    if (restaurant) {
      setRestaurantInfo(restaurant);
    }
  }, [restaurant]);

  useEffect(() => {
    if (restaurantInfo) {
      var today = new Date();
      const dateTo =
        today.getFullYear() * 1e4 +
        (today.getMonth() + 1) * 100 +
        today.getDate() +
        '';
      const lastWeekDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 6,
      );
      const dateFrom =
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
      setRestaurantHours(GetUserFriendlyHours(calendar, 'business'));
    }
  }, [calendar]);

  return (
    <>
      {restaurantInfo && (
        <Grid
          container
          spacing={0}
          sx={{
            backgroundColor: theme.palette.secondary.main,
            padding: { xs: '30px', sm: '35px' },
          }}
        >
          <Grid item xs={12}>
            <Grid container spacing={0} maxWidth={1090} margin="auto">
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
                  variant="body2"
                  textTransform="uppercase"
                  title="Pick Up From"
                >
                  Pick Up From
                </Typography>
                <Typography
                  variant="body2"
                  color="#fff"
                  textTransform="uppercase"
                  fontWeight={700}
                  lineHeight={1.3}
                  fontFamily="Poppins-Bold !important"
                  sx={{ fontSize: { xs: 30, sm: 35, lg: 40 } }}
                  title={restaurantInfo.name}
                >
                  {restaurantInfo.name}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  paddingRight: { xs: '0px', sm: '15px' },
                  paddingBottom: { xs: '15px', sm: '0px' },
                  paddingTop: { xs: '15px', sm: '0px' },
                  flexDirection: 'column',
                }}
              >
                <Typography
                  className={classes.heading}
                  variant="body2"
                  textTransform="uppercase"
                  title="Address"
                >
                  Address
                </Typography>
                <Typography
                  variant="body1"
                  color="#fff"
                  textTransform="uppercase"
                  fontSize={11}
                  paddingTop="8px"
                  title={`${restaurantInfo.streetaddress}, ${restaurantInfo.city}, ${restaurantInfo.state}`}
                >
                  <p style={{paddingBottom: '2px'}}>{restaurantInfo.streetaddress}</p>
                  <p style={{paddingBottom: '2px'}}>
                    {restaurantInfo.city}, {restaurantInfo.state}
                  </p>
                  <p>{restaurantInfo.distance.toFixed(1)} Miles Away</p>
                </Typography>
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
                  variant="body2"
                  textTransform="uppercase"
                  title="Hours"
                  sx={{ paddingBottom: '5px'}}
                >
                  Hours
                </Typography>
                {restaurantHours.length > 0 &&
                  restaurantHours.map((item: any, index: number) => (
                    <Grid container spacing={0} key={index}>
                      <Grid item xs={3}>
                        <List
                          sx={{
                            padding: '2px 0 0 0',
                            fontSize: '12px',
                            fontWeight: '600',
                            color: 'background.paper',
                          }}
                        >
                          <ListItem
                            sx={{
                              padding: '0 0 0 0',
                            }}
                            title={item.label}
                          >
                            {item.label}
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
                          }}
                        >
                          <ListItem
                            sx={{
                              padding: '0 0 0 0',
                            }}
                            title={
                              item.isOpenAllDay
                                ? 'Open 24 hours'
                                : item.startTime + ' - ' + item.endTime
                            }
                          >
                            {item.isOpenAllDay
                              ? 'Open 24 hours'
                              : item.startTime + ' - ' + item.endTime}
                          </ListItem>
                        </List>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default React.memo(StoreInfoBar);
