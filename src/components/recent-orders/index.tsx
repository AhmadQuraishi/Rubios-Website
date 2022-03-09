import { Card, CardMedia, Grid, Typography, Button } from '@mui/material';
import './index.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecentOrders } from '../../redux/actions/user';
import { addMultipleProductsRequest } from '../../redux/actions/basket/addMultipleProducts';
import LoadingBar from '../loading-bar';
import { TablePagination } from '@mui/material';
import { RequestBasketProductBatch } from '../../types/olo-api';
import { createBasketFromPrev } from '../../redux/actions/basket/create';
import { useNavigate } from 'react-router-dom';

const RecentOrders = () => {
  const [recentorders, setOrders] = React.useState([]);
  const [clickAction, setClickAction] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basketObj = useSelector((state: any) => state.basketReducer);

  const { userRecentOrders, loading } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    dispatch(getUserRecentOrders());
  }, []);

  useEffect(() => {
    if (basketObj && clickAction) {
      setClickAction(false);
      navigate('/checkout');
    }
  }, [basketObj]);

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
    //
  };

  const addProductToBag = (orderref: any, id: any) => {
    setClickAction(true);
    const body = {
      orderref: orderref,
      id: id,
      ignoreunavailableproducts: true,
    };
    dispatch(createBasketFromPrev(body));
  };

  let x = 0;
  return (
    <Fragment>
      {loading && <LoadingBar />}
      {recentorders.length < 1 && !loading && (
        <Typography variant="h6" className="no-orders">
          You don't have any recent orders
        </Typography>
      )}
      {!loading && recentorders.length > 0 && (
        <Grid container spacing={3} className="order-history-card">
          {recentorders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((order: any, index: number) => (
              <Grid key={Math.random() + index} item xs={12} lg={6}>
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
                          addProductToBag(order.orderref, order.id)
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
