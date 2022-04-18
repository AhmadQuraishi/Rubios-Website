import {
  Card,
  CardMedia,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  TextField,
} from '@mui/material';
import './index.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecentOrders } from '../../redux/actions/user';
import { createBasketFromPrevOrderRequest } from '../../redux/actions/basket/create';
import { useNavigate } from 'react-router-dom';
import { getBasketRequest } from '../../redux/actions/basket';
import {
  getResturantInfoRequest,
  setResturantInfoRequest,
} from '../../redux/actions/restaurant';
import OrderListSkeletonUI from '../order-list-skeleton-ui';
import { displayToast } from '../../helpers/toast';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { createFave } from '../../redux/actions/create-fave';
import moment from 'moment';
import { getUpsellsRequest } from '../../redux/actions/basket/upsell/Get';

const RecentOrders = () => {
  const [recentorders, setOrders] = React.useState<any>([]);
  const [clickAction, setClickAction] = useState(false);
  const [open, setOpen] = useState(false);
  const [idtoFav, setId] = useState('');
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState('');

  const [prevOrderType, setPrevOrderType] = useState<string>();
  const { restaurant, error } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const createBasketObj = useSelector(
    (state: any) => state.createBasketReducer,
  );

  const { userRecentOrders, loading } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    dispatch(getUserRecentOrders());
  }, []);

  useEffect(() => {
    if (createBasketObj && clickAction) {
      if (createBasketObj.basket && clickAction) {
        dispatch(getResturantInfoRequest(createBasketObj.basket.vendorid));
        dispatch(getUpsellsRequest(createBasketObj.basket.id));
      } else if (createBasketObj.error && createBasketObj.error.message) {
        setClickAction(false);
      }
    }
  }, [createBasketObj]);

  useEffect(() => {
    if (restaurant && clickAction) {
      setClickAction(false);
      dispatch(
        setResturantInfoRequest(
          restaurant,
          prevOrderType || createBasketObj.basket.deliverymode || '',
        ),
      );
      dispatch(getBasketRequest('', createBasketObj.basket, 'Previous'));
      displayToast('SUCCESS', 'Recent order is added in cart');
      navigate('/checkout');
    }
    if (error && error.message) {
      setClickAction(false);
    }
  }, [restaurant]);

  useEffect(() => {
    if (userRecentOrders && userRecentOrders.orders) {
      let orders: any[] = [];
      userRecentOrders.orders.map((item: any) => {
        if (isWebRecentOrder(item.oloid)) {
          orders.push(item);
        }
      });
      setOrders(orders);
    }
  }, [userRecentOrders]);

  const addProductToBag = (orderref: any, id: any, orderType: string) => {
    setClickAction(true);
    setPrevOrderType(orderType);
    const requestBody = {
      orderref: '',
      id: id,
      ignoreunavailableproducts: true,
    };
    dispatch(createBasketFromPrevOrderRequest(requestBody));
  };
  //Set order as favorite
  const handleClickOpen = (favid: string, products: any, price: string) => {
    debugger;
    if (products && products.length > 0) {
      setItems(products);
    }
    let recentorders = localStorage.getItem('recentorders');
    if (recentorders) {
      let recentordersList = JSON.parse(recentorders);
      let order = recentordersList.find((x: any) => x.orderid == favid);
      if (order) {
        setId(order.basketid);
        setPrice(price);
        setOpen(true);
      }
    }
  };

  const isWebRecentOrder = (id: any) => {
    let result = false;
    let recentorders = localStorage.getItem('recentorders');
    if (recentorders) {
      let recentordersList = JSON.parse(recentorders);
      let order = recentordersList.find((x: any) => x.orderid == id);
      if (order && order.isMarkFav === false) {
        result = true;
      }
    }
    return result;
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      {(loading || clickAction) && <OrderListSkeletonUI />}
      {recentorders && recentorders.length == 0 && !loading && (
        <Typography variant="h6" className="no-orders">
          You don't have any recent orders
        </Typography>
      )}
      {!loading && !clickAction && recentorders.length > 0 && (
        <Grid container spacing={3} className="order-history-card">
          {recentorders.map((order: any, index: number) => (
            <Grid key={Math.random() + index} item xs={12} md={6}>
              <Card elevation={0} className="card-panel">
                <Grid container>
                  <Grid item xs={10}>
                    <Typography
                      variant="caption"
                      className="order-date"
                      title={`LAST ORDERED ${order.timeplaced}`}
                    >
                      LAST ORDERED{' '}
                      {moment(order.timeplaced.split(' ')[0]).format('MM/DD')}
                    </Typography>
                    <Typography
                      variant="caption"
                      className="order-name"
                      title={order.vendorname}
                    >
                      {order.vendorname}
                    </Typography>
                  </Grid>
                  <Grid item xs={2} className="order-fav-icon">
                    <img
                      src={require('../../assets/imgs/favrouite-icon.png')}
                      alt="Set Order as favorite"
                      title="Set Order as favorite"
                      style={{ cursor: 'pointer' }}
                      className="grey"
                      onClick={() => {
                        handleClickOpen(
                          order.oloid,
                          order.products,
                          order.total,
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12} sm={4}>
                    <CardMedia
                      component="img"
                      title="image"
                      image={require('../../assets/imgs/order-hidtory-icon.png')}
                      alt="image"
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
                    {order.products
                      .slice(0, 3)
                      .map((product: any, index: number) => (
                        <Fragment>
                          {index == 2 && order.products.length > 3 ? (
                            <Typography
                              className="order-detail"
                              variant="body2"
                              title={product.name}
                              key={
                                Math.random() + product.name + product.quantity
                              }
                            >
                              {product.quantity}x{' '}
                              {product.name.substring(0, 19)}...
                            </Typography>
                          ) : (
                            <Typography
                              className="order-detail"
                              variant="body2"
                              title={product.name}
                              key={
                                Math.random() + product.name + product.quantity
                              }
                            >
                              {product.quantity} x {product.name}
                            </Typography>
                          )}
                        </Fragment>
                      ))}
                    <Typography
                      className="order-Link"
                      variant="button"
                      title="Reorder"
                      onClick={() =>
                        addProductToBag(
                          order.orderref,
                          order.id,
                          order.vendorid,
                        )
                      }
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
      <Dialog open={open} onClose={handleClose} className="fav-dialog">
        <Typography
          variant="h5"
          title="Save Order as favorite"
          className="fav-name"
        >
          Save Order as favorite
        </Typography>
        <Typography
          variant="caption"
          title="Save Order as favorite"
          className="fav-name space"
        >
          Favorite Name
        </Typography>
        <Formik
          initialValues={{
            favorite_name: '',
          }}
          validationSchema={Yup.object({
            favorite_name: Yup.string()
              .max(32, 'Must be at most 32 characters')
              .required('Favorite Name is required'),
          })}
          onSubmit={async (values) => {
            const body = {
              basketid: idtoFav,
              description: values.favorite_name,
              isdefault: false,
            };
            dispatch(createFave(body));
            handleClose();
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                aria-label="Favorite Name"
                label="Favorite Name"
                title="Favorite Name"
                type="text"
                name="favorite_name"
                sx={{ width: '100%' }}
                value={values.favorite_name}
                onChange={handleChange('favorite_name')}
                error={Boolean(touched && errors.favorite_name)}
                helperText={touched && errors.favorite_name}
                className="space"
              />
              <Grid container className="space">
                <Grid item xs={8} md={6}>
                  {items.slice(0, 3).map((item: any, index: number) => (
                    <Fragment>
                      {index == 2 && items.length > 3 ? (
                        <Typography
                          className="order-detail"
                          variant="body2"
                          title={item.name}
                          key={Math.random() + item.name + item.quantity}
                        >
                          {item.quantity}x {item.name.substring(0, 19)}...
                        </Typography>
                      ) : (
                        <Typography
                          className="order-detail"
                          variant="body2"
                          title={item.name}
                          key={Math.random() + item.name + item.quantity}
                        >
                          {item.quantity} x {item.name}
                        </Typography>
                      )}
                    </Fragment>
                  ))}
                </Grid>
                <Grid item xs={4} md={6}>
                  <Typography className="price"> ${price}</Typography>
                </Grid>
              </Grid>
              <DialogActions>
                <Button
                  aria-label="Cancel"
                  title="Cancel"
                  className="link"
                  onClick={handleClose}
                >
                  Cancel{' '}
                </Button>
                <Button
                  aria-label="Save Favorite"
                  title="Save Favorite"
                  type="submit"
                  className="link default"
                  autoFocus
                >
                  Save Favorite
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </Dialog>
    </Fragment>
  );
};

export default React.memo(RecentOrders);
