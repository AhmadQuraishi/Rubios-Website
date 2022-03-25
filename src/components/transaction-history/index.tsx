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
        {loading && <HistorySkeletonUI />}
        {!loading && recentorders.length == 0 && (
          <Typography variant="h6" className="no-orders">
            You don't have any Transaction History
          </Typography>
        )}
        {!loading && recentorders.length > 0 && (
          <Grid container spacing={0}>
            <Grid
              item
              xs={0}
              sm={3}
              sx={{
                fontWeight: '700',
                textTransform: 'uppercase',
                borderBottom: '1px solid #CCC',
                borderTop: '1px solid #CCC',
                padding: '10px 0',
                fontSize: '14px',
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
                fontWeight: '700',
                textTransform: 'uppercase',
                borderBottom: '1px solid #CCC',
                borderTop: '1px solid #CCC',
                padding: '10px 0',
                fontSize: '14px',
              }}
            >
              Order Id
            </Grid>
            <Grid
              item
              xs={8}
              sm={6}
              sx={{
                fontWeight: '700',
                textTransform: 'uppercase',
                borderBottom: '1px solid #CCC',
                borderTop: '1px solid #CCC',
                padding: '10px 0',
                fontSize: '14px',
              }}
            >
              Amount
            </Grid>

            {recentorders.map((item: any, index: number) => (
              <Fragment key={Math.random() + index}>
                <Grid
                  item
                  xs={0}
                  sm={3}
                  sx={{
                    fontWeight: '500',
                    borderBottom: '1px solid #CCC',
                    padding: '10px 0',
                    fontSize: '12px',
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
                    fontWeight: '500',
                    borderBottom: '1px solid #CCC',
                    padding: '10px 0',
                    fontSize: '12px',
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
                    fontWeight: '500',
                    borderBottom: '1px solid #CCC',
                    padding: '10px 0',
                    fontSize: '12px',
                    color: 'secondary.main',
                  }}
                >
                  ${item.total}
                </Grid>
              </Fragment>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default TransactionHistory;
