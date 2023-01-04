import { Grid, List, ListItem, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { CalendarTypeEnum, HoursListing } from '../../../helpers/hoursListing';
import { GetUserFriendlyHoursRAW } from '../../../helpers/getUserFriendlyHours';
import { getResturantCalendarRequest } from '../../../redux/actions/restaurant/calendar';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import moment from 'moment';
const useStyle = makeStyles({
  heading: {
    fontSize: '13px !important',
    color: '#000',
    fontFamily: "'grit_sansbold' !important"

  },
});

const StoreHoursIframe = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { id }: any = useParams();

  const [restaurantHours, setRestaurantHours] = useState<HoursListing[]>([]);
  const { calendar } = useSelector(
    (state: any) => state.restaurantCalendarReducer,
  );

  useEffect(() => {
    if (id) {
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
      dispatch(getResturantCalendarRequest(id, dateFrom, dateTo));
    }
  }, [id]);
  const getTimeFormat = (date: string) => {
    return moment(date, 'YYYYMMDD HH:mm').format('h:mm A');
  };
  useEffect(() => {
    if (calendar) {
      setRestaurantHours(
        GetUserFriendlyHoursRAW(calendar, CalendarTypeEnum.business),
      );
    }
  }, [calendar]);

  return (
    <>
      <Grid container component="main">
        <Grid
          item
          xs={12}
          sm={3}
          sx={{
            flexDirection: 'column',
            paddingTop: { xs: '5px', sm: '0px' },
          }}
        >
          {restaurantHours && restaurantHours.length > 0 && (
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
          )}

          {restaurantHours &&
            restaurantHours.length > 0 &&
            restaurantHours.map((item: any, index: number) => (
              <Grid container spacing={0} key={index}>
                <Grid item xs={3}>
                  <List
                    sx={{
                      padding: '2px 0 0 0',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#000',
                    }}
                    role="presentation"
                  >
                    <ListItem
                      sx={{
                        padding: '0 0 0 0',
                        fontFamily: "'grit_sansbold' !important",
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
                      color: '#000',
                      fontFamily: "'grit_sansbold' !important",
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
                        : getTimeFormat(item.start) + ' - ' + getTimeFormat(item.end)}
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default StoreHoursIframe;
