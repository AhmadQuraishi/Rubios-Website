import {
  Card,
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
import { OrderTypeDialog } from '../order-type-dialog';

const RecentOrders = () => {
  const [recentorders, setOrders] = React.useState<any>([]);
  const [clickAction, setClickAction] = useState(false);
  const [open, setOpen] = useState(false);
  const [favOrder, setFavOrder] = useState<any>(null);
  const [openOrder, setOpenOrder] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // const [idtoFav, setId] = useState('');
  // const [items, setItems] = useState([]);
  // const [price, setPrice] = useState('');

  const [prevOrderType, setPrevOrderType] = useState<string>();
  const { restaurant, error } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
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

  // const navigateAfterSuccess = () => {
  //   setOpenOrder(false);
  //   setClickAction(false);
  //   dispatch(
  //     setResturantInfoRequest(
  //       restaurant,
  //       createBasketObj.basket.deliverymode || '',
  //     ),
  //   );
  //   dispatch(getBasketRequest('', createBasketObj?.basket, 'Favourite'));
  //   displayToast(
  //     'SUCCESS',
  //     'The items from your recent order have been added to your cart.',
  //   );
  //   navigate('/checkout');
  // };

  useEffect(() => {
    if (createBasketObj && clickAction) {
      if (createBasketObj.basket) {
        dispatch(getResturantInfoRequest(createBasketObj.basket.vendorid));
        // dispatch(
        //   getUpsellsRequest(
        //     createBasketObj?.basket?.id,
        //     createBasketObj?.basket?.vendorid,
        //   ),
        // );
      } else if (createBasketObj?.error?.message) {
        setClickAction(false);
      }
    }
  }, [createBasketObj]);

  useEffect(() => {
    if (restaurant && clickAction) {
      if (error && error.message) {
        setClickAction(false);
        return;
      } else {
        setOpenOrder(true);
      }
    }
  }, [restaurant]);

  useEffect(() => {
    if (userRecentOrders && userRecentOrders.orders) {
      let orders: any[] = userRecentOrders.orders;
      // userRecentOrders.orders.map((item: any) => {
      //   const response = isWebRecentOrder(item.oloid);
      //   if (response.localExist) {
      //     const newObj = {
      //       ...item,
      //       isMarkFav: response.isMarkFav,
      //     };
      //     orders.push(newObj);
      //   }
      // });
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
  const handleClickOpen = (
    order: any,
    // products: any,
    // price: string,
    // isMarkFav: boolean,
  ) => {
    if (order) {
      setFavOrder(order);
      setOpen(true);
    }

    // if (isMarkFav) {
    //   return;
    // }
    // if (order && order.products && order.products.length > 0) {
    //   setItems(products);
    // }
    // let recentorders = localStorage.getItem('recentorders');
    // if (recentorders) {
    //   let recentordersList = JSON.parse(recentorders);
    //   let order = recentordersList.find((x: any) => x.orderid == favid);
    //   if (order) {
    //     setId(order.basketid);
    //     setPrice(price);
    //     setOpen(true);
    //   }
    // }
  };

  // const isWebRecentOrder = (id: any) => {
  //   let result: any = {
  //     localExist: false,
  //     isMarkFav: false,
  //   };
  //   let recentorders = localStorage.getItem('recentorders');
  //   if (recentorders) {
  //     let recentordersList = JSON.parse(recentorders);
  //     let order = recentordersList.find((x: any) => x.orderid === id);
  //     if (order) {
  //       result.localExist = true;
  //       result.isMarkFav = order.isMarkFav;
  //     }
  //   }
  //   return result;
  // };

  const handleClose = () => {
    setOpen(false);
    setFavOrder(null);
  };

  return (
    <Fragment>
      <OrderTypeDialog
        type={'RECENT_ORDER'}
        openModal={openOrder}
        setOpenModal={(value: any) => {
          setOpenOrder(value);
        }}
      />
      {(loading || clickAction) && <OrderListSkeletonUI />}
      {recentorders && recentorders.length === 0 && !loading && (
        <Typography variant="h6" className="no-orders">
          You don't have any recent orders
        </Typography>
      )}
      {!loading && !clickAction && recentorders.length > 0 && (
        <Grid container spacing={3} className="order-history-card">
          {recentorders.map((order: any, index: number) => (
            <Grid
              key={Math.random() + index}
              item
              xs={12}
              md={4}
              sx={{ display: 'flex', alignItems: 'stretch' }}
            >
              <Card elevation={0} className="card-panel" sx={{ width: '100%' }}>
                <Grid container>
                  <Grid item xs={10}>
                    <Typography variant="caption" className="order-date">
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
                      className={`${order.isMarkFav ? '' : 'grey'}`}
                      onClick={() => {
                        handleClickOpen(
                          order,
                          // order.products,
                          // order.total,
                          // order.isMarkFav,
                        );
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container>
                  {/* <Grid item xs={12} sm={4}>
                    {/* <CardMedia
                      component="img"
                      title="image"
                      image={require('../../assets/imgs/order-hidtory-icon.png')}
                      alt="image"
                      className="order-img"
                    />
                  </Grid> */}
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    sx={{
                      padding: {
                        xs: '0px 10px 20px 0px',
                        sm: '0px 0px 20px 0px',
                      },
                    }}
                    className="order-detail-rpanel"
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
                          order.deliverymode,
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
      <Dialog
        TransitionProps={{
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': 'Save Order as favorite',
        }}
        open={open}
        onClose={handleClose}
        className="fav-dialog"
      >
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
            const payload = {
              order: {
                orderref: '',
                id: favOrder.id,
                ignoreunavailableproducts: true,
              },
              basket: {
                description: values.favorite_name,
                isdefault: false,
              },
            };
            // const requestBody = {
            //   orderref: '',
            //   id: favOrder.id,
            //   ignoreunavailableproducts: true,
            // };
            // dispatch(createBasketFromPrevOrderRequest(requestBody));
            // const body = {
            //   basketid: idtoFav,
            //   description: values.favorite_name,
            //   isdefault: false,
            // };
            console.log('payload', payload);
            dispatch(createFave(payload));
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
              />
              <Grid container className="space">
                <Grid item xs={8} md={6}>
                  {favOrder &&
                    favOrder.products &&
                    favOrder.products
                      .slice(0, 3)
                      .map((item: any, index: number) => (
                        <Fragment>
                          {index === 2 && favOrder.products.length > 3 ? (
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
                  <Typography className="price">
                    {' '}
                    ${(favOrder && favOrder.total) || 0}
                  </Typography>
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
