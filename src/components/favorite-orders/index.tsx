import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import './index.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFavOrder,
  getUserFavoritetOrders,
} from '../../redux/actions/user';
import LoadingBar from '../loading-bar';
import { TablePagination } from '@mui/material';
import DialogBox from '../dialog-box';

const FavoriteOrders = () => {
  const [open, setOpen] = useState(false);
  const [idtoDelete, setId] = useState(0);

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
      setfavOrders(userFavoriteOrders.faves);
    }
  }, [userFavoriteOrders]);

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
  const handleClickOpen = (favid: number) => {
    setId(favid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteFavOrderHandler = () => {
    dispatch(deleteFavOrder(idtoDelete));

    setOpen(false);
    setTimeout(() => {
      dispatch(getUserFavoritetOrders(authtoken));
    }, 600);
    setId(0);
  };

  let x = 0;
  return (
    <Fragment>
      {loading && <LoadingBar />}
      {!loading && favOrders.length < 1 && (
        <Typography variant="h2" className="no-orders">
          You don't have any favorites
        </Typography>
      )}
      {!loading && favOrders.length > 0 && (
        <Grid container spacing={3} className="order-history-card">
          {favOrders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((forder: any, index: number) => (
              <Grid item xs={12} lg={6} key={index + forder.id}>
                <Card elevation={0} className="card-panel">
                  <CardContent>
                    <Grid container>
                      <Grid item xs={10}>
                        <Typography
                          variant="caption"
                          className="order-name"
                          title={forder.name}
                        >
                          {forder.name}
                        </Typography>
                      </Grid>
                      <Grid item xs={2} className="order-fav-icon">
                        <img
                          src={require('../../assets/imgs/favrouite-icon.png')}
                          alt="Favrouite Order Icon"
                          onClick={() => {
                            handleClickOpen(forder.id);
                          }}
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
                        {forder.products
                          .slice(0, 3)
                          .map((product: any, index: number) => (
                            <Fragment>
                              {index == 2 && forder.products.length > 3 ? (
                                <Typography
                                  className="order-detail"
                                  variant="body2"
                                  title={product.name}
                                  key={product.index + product.quantity}
                                >
                                  {product.quantity}x{' '}
                                  {product.name.substring(0, 19)}...
                                </Typography>
                              ) : (
                                <Typography
                                  className="order-detail"
                                  variant="body2"
                                  title={product.name}
                                  key={product.index + product.quantity}
                                >
                                  {product.quantity}x {product.name}
                                </Typography>
                              )}
                            </Fragment>
                          ))}

                        <Typography
                          className="order-Link"
                          variant="button"
                          title="Reorder"
                        >
                          REORDER
                        </Typography>
                        <DialogBox
                          open={open}
                          handleClose={handleClose}
                          message={
                            'Do You Really Want To UnFavorite The Order?'
                          }
                          handleDeleteFunction={() => {
                            deleteFavOrderHandler();
                          }}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
      {!loading && favOrders.length > 10 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={favOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Fragment>
  );
};

export default FavoriteOrders;
