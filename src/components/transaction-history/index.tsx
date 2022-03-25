import { Grid, Typography } from '@mui/material';
import moment from 'moment';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccountHistory } from '../../redux/actions/account-history';
import { getUserRecentOrders } from '../../redux/actions/user';
import HistorySkeletonUI from '../history-grid-skeleton-ui';

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const [recentorders, setOrders] = useState([]);
  const { userRecentOrders, loading } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    dispatch(getUserRecentOrders());
  }, []);

  useEffect(() => {
    if (userRecentOrders && userRecentOrders.orders) {
      setOrders(userRecentOrders.orders);
      console.log(userRecentOrders.orders);
    }
  }, [userRecentOrders]);
  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={0}
            sm={3}
            sx={{
              fontFamily: 'Poppins-Bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #CCC',
              borderTop: '1px solid #CCC',
              padding: '10px 0',
              fontSize: '14px',
              color: 'secondary.main',
              display: { xs: 'none', sm: 'grid' },
            }}
          >
            Date
          </Grid>
          <Grid
            item
            xs={4}
            sm={3}
            sx={{
              fontFamily: 'Poppins-Bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #CCC',
              borderTop: '1px solid #CCC',
              padding: '10px 0',
              fontSize: '14px',
              color: 'secondary.main',
            }}
          >
            Order Id
          </Grid>
          <Grid
            item
            xs={8}
            sm={6}
            sx={{
              fontFamily: 'Poppins-Bold',
              textTransform: 'uppercase',
              borderBottom: '1px solid #CCC',
              borderTop: '1px solid #CCC',
              padding: '10px 0',
              fontSize: '14px',
              color: 'secondary.main',
            }}
          >
            Amount
          </Grid>
          {loading && <HistorySkeletonUI />}
          {!loading &&
            recentorders.length > 0 &&
            recentorders.map((item: any, index: number) => (
              <Fragment key={Math.random() + index}>
                <Grid
                  item
                  xs={0}
                  sm={3}
                  sx={{
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '500',
                    borderBottom: '1px solid #CCC',
                    padding: '10px 0',
                    fontSize: '10px',
                    color: 'secondary.main',
                    display: { xs: 'none', sm: 'grid' },
                  }}
                >
                  {moment(item.date).format('MM/DD/YYYY')}
                </Grid>
                <Grid
                  item
                  key={index + '-col2'}
                  xs={4}
                  sm={3}
                  sx={{
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '500',
                    borderBottom: '1px solid #CCC',
                    padding: '10px 0',
                    fontSize: '10px',
                    color: 'secondary.main',
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ display: { xs: 'block', sm: 'none' } }}
                  >
                    {moment(item.date).format('MM/DD/YYYY')}
                  </Typography>
                  {item.oloid}
                </Grid>
                <Grid
                  item
                  key={index + '-col3'}
                  xs={8}
                  sm={6}
                  sx={{
                    fontFamily: 'Poppins-Medium',
                    fontWeight: '500',
                    borderBottom: '1px solid #CCC',
                    padding: '10px 0',
                    fontSize: '10px',
                    color: 'secondary.main',
                  }}
                >
                  ${item.total}
                </Grid>
              </Fragment>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionHistory;
