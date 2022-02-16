import { Card, CardMedia, Grid, Typography } from '@mui/material';
import './index.css';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getUserFavoritetOrders,
  getUserRecentOrders,
} from '../../redux/actions/user';
import LoadingBar from '../loading-bar';

const FavoriteOrders = (props: any) => {
  const [favOrders, setfavOrders] = React.useState([]);
  const dispatch = useDispatch();
  console.log('123');

  const authtoken = useSelector((state: any) => state.TokensReducer.authtoken);
  const { userFavoriteOrders, loading } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    dispatch(getUserFavoritetOrders(authtoken));
  }, []);

  useEffect(() => {
    if (userFavoriteOrders && userFavoriteOrders.faves) {
      console.log(userFavoriteOrders.faves);
      setfavOrders(userFavoriteOrders.faves);
    }
  }, [userFavoriteOrders]);

  let x = 0;
  return (
    <Fragment>
      {loading && <LoadingBar />}
      {!loading && favOrders.length < 1 && (
        <h6>You don't have any favorites</h6>
      )}
      {!loading && favOrders.length > 0 && (
        <Grid container spacing={3} className="order-history-card">
          {favOrders.map((forder: any) => (
            <Grid item xs={12} lg={6} key={x++}>
              <Card elevation={0} className="card-panel">
                <Grid container>
                  <Grid item xs={8}>
                    <Typography
                      variant="caption"
                      className="order-name"
                      title={forder.name}
                    >
                      {forder.name}
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
                      title="food item image"
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
                    {forder.products.map((product: any, index: number) => (
                      <Typography
                        className="order-detail"
                        variant="body2"
                        title={product.name}
                        key={product.name + product.quantity}
                      >
                        {product.quantity} x {product.name}
                      </Typography>
                    ))}

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

export default FavoriteOrders;
