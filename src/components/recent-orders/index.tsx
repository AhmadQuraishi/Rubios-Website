import { Card, CardMedia, Grid, Typography } from '@mui/material';
import './index.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserRecentOrders } from '../../redux/actions/user';
import LoadingBar from '../loading-bar';
import { TablePagination } from '@mui/material';

const RecentOrders = () => {
  const [recentorders, setOrders] = React.useState([]);
  const dispatch = useDispatch();
  const authtoken = useSelector((state: any) => state.TokensReducer.authtoken);
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
            .map((order: any) => (
              <Grid item xs={12} lg={6} key={x++}>
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
                    <Grid item xs={2} className="order-fav-icon">
                      {/* <img
                      src={require('../../assets/imgs/favrouite-icon.png')}
                      alt="Favrouite Order Icon"
                    /> */}
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
