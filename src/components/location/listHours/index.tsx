import { Grid, List, ListItem, Skeleton, Typography } from '@mui/material';
import { useState } from 'react';
import { GetUserFriendlyHoursRAW } from '../../../helpers/getUserFriendlyHours';
import { CalendarTypeEnum, HoursListing } from '../../../helpers/hoursListing';
import { getRestaurantCalendar } from '../../../services/restaurant/calendar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
const ListHours = (props: any) => {
  const { id } = props;
  const [restaurantHours, setRestaurantHours] = useState<HoursListing[]>([]);
  const [loading, setLoading] = useState(false);
  const [showHours, setShowHours] = useState(false);
  const getCalendarData = async () => {
    setLoading(true);
    let today = new Date();
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

    const calendar = await getRestaurantCalendar(id, dateFrom, dateTo);
    if (calendar) {
      setRestaurantHours(
        GetUserFriendlyHoursRAW(calendar, CalendarTypeEnum.business),
      );
    }
    setLoading(false);
  };
  const getTimeFormat = (date: string) => {
    return moment(date, 'YYYYMMDD HH:mm').format('h:mm A');
  };
  return (
    <>
      {!showHours && (
        <Grid container spacing={1}>
          <Grid
            onClick={() => {
              getCalendarData();
              setShowHours(true);
            }}
            item
            style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            xs={12}
          >
            <Typography
              variant="h5"
              title="Show Hours"
              sx={{
                fontSize: '13px',
                fontWeight: '500',
                fontFamily: 'Poppins-Medium !important',
                color: '#214F66',
                display: 'inline',
              }}
            >
              Show Hours
            </Typography>
            <ExpandMoreIcon style={{ color: '#214F66' }} />
          </Grid>
        </Grid>
      )}
      {loading && showHours && (
        <>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height="20px" />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height="20px" />
            </Grid>
          </Grid>
        </>
      )}
      {!loading &&
        showHours &&
        restaurantHours &&
        restaurantHours.length > 0 &&
        restaurantHours.map((item: any, index: number) => (
          <Grid container spacing={0} key={index}>
            <Grid item xs={3}>
              <List
                sx={{
                  padding: '2px 0 0 0',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
                role="presentation"
              >
                <ListItem
                  sx={{
                    padding: '0 0 0 0',
                    fontFamily: "'Poppins-Medium' !important",
                  }}
                  title={(item.weekday && item.weekday.toUpperCase()) || ''}
                >
                  {(item.weekday && item.weekday.toUpperCase()) || ''}
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={9}>
              <List
                sx={{
                  padding: '2px 0 0 0',
                  fontSize: '12px',
                  fontWeight: '500',
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
    </>
  );
};

export default ListHours;
