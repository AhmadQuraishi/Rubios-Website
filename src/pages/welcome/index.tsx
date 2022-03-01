import { makeStyles } from '@mui/styles';
import {
  Grid,
  Typography,
  CardMedia,
  Card,
  CardContent,
  Button,
  Link,
} from '@mui/material';
import './welcome.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecentOrders } from '../../redux/actions/user';
const useStyle = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  caption: {},
}));

const Welcome = () => {
  const [recentorders, setOrders] = React.useState([]);
  const dispatch = useDispatch();
  const authtoken = useSelector((state: any) => state.TokensReducer.authtoken);
  const { userProfile } = useSelector((state: any) => state.userReducer);
  const { userRecentOrders, loading } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    dispatch(getUserRecentOrders(authtoken));
  }, []);

  useEffect(() => {
    if (userRecentOrders && userRecentOrders.orders) {
      setOrders(userRecentOrders.orders);
    }
  }, [userRecentOrders]);

  const classes = useStyle();
  return (
    <Fragment>
      <Grid container component="main" columns={16} className={classes.root}>
        <Grid item xs={12} className="welcome-wrapper">
          <Grid container className="welcome-content">
            {recentorders.length > 0 && (
              <Grid item xs={12} md={6} lg={6} className="left-col">
                <Typography variant="caption" className="label" title="Welcome">
                  WELCOME
                </Typography>
                <Typography variant="h4" title="WELCOME BACK ALEXENDRA">
                  WELCOME BACK {userProfile && userProfile.first_name}!
                </Typography>

                {recentorders.slice(0, 1).map((order: any) => (
                  <Fragment>
                    <Typography
                      variant="caption"
                      className="label"
                      title="LAST ORDER 11/01"
                    >
                      LAST ORDER {order.timeplaced.substr(6, 2)}/
                      {order.timeplaced.substr(4, 2)}
                    </Typography>
                    <Card elevation={0} className="product-card">
                      <CardMedia
                        component="img"
                        title="image"
                        image={require('../../assets/imgs/order-hidtory-icon.png')}
                        alt="image"
                        className="order-img"
                      />
                      <CardContent>
                        {order.products
                          .slice(0, 3)
                          .map((product: any, index: number) => (
                            <Fragment>
                              {index == 2 && order.products.length > 3 ? (
                                <Typography
                                  variant="h6"
                                  title={product.name}
                                  key={product.name + product.quantity}
                                >
                                  {product.quantity}x{' '}
                                  {product.name.substring(0, 19)}...
                                </Typography>
                              ) : (
                                <Typography
                                  variant="h6"
                                  title={product.name}
                                  key={product.name + product.quantity}
                                >
                                  {product.quantity}x {product.name}
                                </Typography>
                              )}
                            </Fragment>
                          ))}
                        <Link
                          href=""
                          aria-label="edit order"
                          color="#a5a5a5"
                          fontWeight={900}
                          textTransform="uppercase"
                          underline="none"
                          title="EDIT ORDER"
                        >
                          Edit Order
                        </Link>
                        <Link
                          href=""
                          aria-label="re order"
                          color="#0075bf"
                          fontWeight={900}
                          textTransform="uppercase"
                          underline="none"
                          title="order"
                        >
                          Re Order
                        </Link>
                      </CardContent>
                    </Card>
                  </Fragment>
                ))}
              </Grid>
            )}

            <Grid item xs={12} md={6} lg={6} className="right-col">
              <Typography
                variant="caption"
                className="label"
                title="YOUR FAVORITE LOCATION"
              >
                YOUR FAVORITE LOCATION
              </Typography>
              <Typography variant="h5" title="Broadway Blvd">
                Broadway Blvd
                <Typography
                  variant="caption"
                  className="caption-grey"
                  title="change"
                >
                  (change)
                </Typography>
              </Typography>
              <Typography variant="h6" title="20212 North 59th Ave, Ste.465A">
                20212 North 59th Ave, Ste.465A
              </Typography>
              <Typography variant="h6" title="San Diego, CA">
                San Diego, CA
              </Typography>
              <Typography variant="h6" title="4.2 Mile Away">
                4.2 Mile Away
              </Typography>
              <Button
                aria-label="pickup button"
                variant="contained"
                title="PICKUP"
              >
                PICKUP
              </Button>
              <Button
                aria-label="curbside button"
                variant="contained"
                title="CURBSIDE"
              >
                CURBSIDE
              </Button>
              <Button
                aria-label="delivery button"
                variant="contained"
                title="DELIVERY"
              >
                DELIVERY
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Welcome;
