import {Grid, List, ListItem, Skeleton, Typography} from '@mui/material';
import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { GetUserFriendlyHours } from '../../../helpers/getUserFriendlyHours';
import { CalendarTypeEnum, HoursListing } from '../../../helpers/hoursListing';
// import { getResturantCalendarRequest } from '../../../redux/actions/restaurant/calendar';
import { getRestaurantCalendar } from '../../../services/restaurant/calendar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const ListHours = (props: any) => {
  const { id, resturantOrderType } = props;

  // const dispatch = useDispatch();
  const [restaurantHours, setRestaurantHours] = useState<HoursListing[]>();
  const [loading, setLoading] = useState(false);
  const [showHours, setShowHours] = useState(false);
  // const { calendar } = useSelector(
  //   (state: any) => state.restaurantCalendarReducer,
  // );

  // useEffect(() => {
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
    // console.log('response', response);
    if (calendar) {
      setRestaurantHours(
        GetUserFriendlyHours(calendar, CalendarTypeEnum.business),
      );
    }
    setLoading(false);
  };
  // getCalendarData();

  // dispatch(getResturantCalendarRequest(id, dateFrom, dateTo));
  // }, [resturantOrderType]);

  // useEffect(() => {
  //   if (calendar) {
  //     setRestaurantHours(
  //       GetUserFriendlyHours(calendar, CalendarTypeEnum.business),
  //     );
  //   }
  // }, [calendar]);

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
                display: 'inline'
              }}
            >
              Show Hours
            </Typography>
            {/*<p style={{ display: 'inline', color: '#214F66' }}>Show Hours</p>*/}
            <ExpandMoreIcon style={{color: '#214F66'}} />
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
        restaurantHours.map((item: HoursListing, index: number) => (
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
                      : item.start + ' - ' + item.end
                  }
                >
                  {item.isOpenAllDay
                    ? 'Open 24 hours'
                    : item.start + ' - ' + item.end}
                </ListItem>
              </List>
            </Grid>
          </Grid>
        ))}
    </>
  );
};

export default ListHours;
