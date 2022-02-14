import { Card, CardMedia, Grid, Typography } from '@mui/material';
import './index.css';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecentOrders } from '../../redux/actions/user';
import LoadingBar from '../loading-bar';

const RecentOrders = (props: any) => {
  const [recentorders, setOrders] = React.useState([]);
  const dispatch = useDispatch();
  console.log('123');

  const authtoken = useSelector((state: any) => state.TokensReducer.authtoken);
  const { userRecentOrders, loading } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    dispatch(getUserRecentOrders(authtoken));
  }, []);

  useEffect(() => {
    if (userRecentOrders && userRecentOrders.orders) {
      console.log(userRecentOrders.orders);
      setOrders(userRecentOrders.orders);
    }
  }, [userRecentOrders]);

  let x = 0;
  return (
    <Fragment>
      {loading && <LoadingBar />}
      {!loading && recentorders.length < 1 && <h6>You don't have any recent orders</h6>}
      {!loading && recentorders.length > 0 && (
        <Grid container spacing={3} className="order-history-card">
          {recentorders.map((order: any) => (
            <Grid item xs={12} lg={6} key={x++}>
              <Card elevation={0} className="card-panel">
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      variant="caption"
                      className="order-date"
                      title={`LAST ORDERED ${order.timeplaced}`}
                    >
                      LAST ORDERED {order.timeplaced}
                    </Typography>
                    <Typography
                      variant="caption"
                      className="order-name"
                      title="Amanda's Usual"
                    >
                      Amanda's Usual
                    </Typography>
                  </Grid>
                  <Grid item xs={4} className="order-fav-icon">
                    <img
                      src={require('../../assets/imgs/favrouite-icon.png')}
                      alt="Favrouite Order Icon"
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <CardMedia
                      component="img"
                      title="Live from space album cover"
                      image={require('../../assets/imgs/order-hidtory-icon.png')}
                      alt="Live from space album cover"
                      className="order-img"
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    sx={{
                      padding: {
                        xs: '20px 10px 20px 10px',
                        sm: '0px 0px 10px 20px',
                      },
                    }}
                    className="order-detail-panel"
                  >
                    <Typography
                      className="order-detail"
                      variant="body2"
                      title="1x California Burrito"
                    >
                      1x California Burrito
                    </Typography>
                    <Typography
                      className="order-detail"
                      variant="body2"
                      title="2x Fish Toca Plates"
                    >
                      2x Fish Toca Plates
                    </Typography>
                    <Typography
                      className="order-detail"
                      variant="body2"
                      title="1x Medium Drink..."
                    >
                      1x Medium Drink...
                    </Typography>
                    <Typography
                      className="order-Link"
                      variant="button"
                      title="Reorder"
                    >
                      REORDER
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Fragment>
  );
};

export default React.memo(RecentOrders);
