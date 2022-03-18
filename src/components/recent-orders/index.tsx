import { Card, CardMedia, Grid, Typography, Button } from '@mui/material';
import './index.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecentOrders } from '../../redux/actions/user';
import { TablePagination } from '@mui/material';
import { createBasketFromPrevOrderRequest } from '../../redux/actions/basket/create';
import { useNavigate } from 'react-router-dom';
import { getBasketRequest } from '../../redux/actions/basket';
import {
  getResturantInfoRequest,
  setResturantInfoRequest,
} from '../../redux/actions/restaurant';
import OrderListSkeletonUI from '../order-list-skeleton-ui';
import { displayToast } from '../../helpers/toast';

const RecentOrders = () => {
  const [recentorders, setOrders] = React.useState([]);
  const [clickAction, setClickAction] = useState(false);
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

  useEffect(() => {
    if (createBasketObj && clickAction) {
      if (createBasketObj.basket && clickAction) {
        dispatch(getResturantInfoRequest(createBasketObj.basket.vendorid));
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
      setOrders(userRecentOrders.orders);
    }
  }, [userRecentOrders]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  let x = 0;
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
          {recentorders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((order: any, index: number) => (
              <Grid key={Math.random() + index} item xs={12} md={6}>
                <Card elevation={0} className="card-panel">
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography
                        variant="caption"
                        className="order-date"
                        title={`LAST ORDERED ${order.timeplaced}`}
                      >
                        LAST ORDERED {order.timeplaced.substr(6, 2)}/
                        {order.timeplaced.substr(4, 2)}
                      </Typography>
                      <Typography
                        variant="caption"
                        className="order-name"
                        title={order.vendorname}
                      >
                        {order.vendorname}
                      </Typography>
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
      {!loading && recentorders.length > 10 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={recentorders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Fragment>
  );
};

export default React.memo(RecentOrders);
