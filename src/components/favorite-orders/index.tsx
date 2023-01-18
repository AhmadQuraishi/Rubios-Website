import { Card, Grid, Typography } from '@mui/material';
import './index.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteFavOrder,
  getUserFavoritetOrders,
} from '../../redux/actions/user';
import { TablePagination } from '@mui/material';
import DialogBox from '../dialog-box';
import { createBasketFromFavOrderRequest } from '../../redux/actions/basket/create';
import {
  getResturantInfoRequest,
  setResturantInfoRequest,
} from '../../redux/actions/restaurant';
import { getBasketRequest } from '../../redux/actions/basket';
import { useNavigate } from 'react-router-dom';
import OrderListSkeletonUI from '../order-list-skeleton-ui';
import { displayToast } from '../../helpers/toast';
import { getUpsellsRequest } from '../../redux/actions/basket/upsell/Get';
import { OrderTypeDialog } from '../order-type-dialog';

const FavoriteOrders = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [idtoDelete, setId] = useState(0);
  const [favOrders, setfavOrders] = React.useState([]);

  const createBasketObj = useSelector(
    (state: any) => state.createBasketReducer,
  );
  const { restaurant, error } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const { userFavoriteOrders, loading } = useSelector(
    (state: any) => state.userReducer,
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [clickAction, setClickAction] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserFavoritetOrders());
  }, []);

  useEffect(() => {
    if (userFavoriteOrders && userFavoriteOrders.faves) {
      setfavOrders(userFavoriteOrders.faves);
    }
  }, [userFavoriteOrders]);

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
  };
  useEffect(() => {
    if (createBasketObj && clickAction) {
      if (createBasketObj.basket) {
        dispatch(getResturantInfoRequest(createBasketObj.basket.vendorid));
        // dispatch(
        //   getUpsellsRequest(
        //     createBasketObj.basket.id,
        //     createBasketObj.basket.vendorid,
        //   ),
        // );
      } else if (createBasketObj.error && createBasketObj.error.message) {
        setClickAction(false);
      }
    }
  }, [createBasketObj]);

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
  //     'The items from your favorite order have been added to your cart.',
  //   );
  //   navigate('/checkout');
  // };

  useEffect(() => {
    console.log('restaurant', restaurant)
    console.log('clickAction', clickAction)
    if (restaurant && clickAction) {
      if (error && error.message) {
        setClickAction(false);
        return;
      } else {
        // navigateAfterSuccess();
        setOpenOrder(true);
      }
    }
  }, [restaurant]);
  const addProductToBag = (faveid: any) => {
    setClickAction(true);
    const requestBody = {
      faveid: faveid,
      ignoreunavailableproducts: true,
    };
    dispatch(createBasketFromFavOrderRequest(requestBody));
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
      {!loading && !clickAction && favOrders && favOrders.length === 0 && (
        <Typography variant="h6" className="no-orders">
          You don’t have any favorite orders.
        </Typography>
      )}
      {!loading && !clickAction && favOrders.length > 0 && (
        <Grid container spacing={3} className="order-history-card">
          {favOrders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((forder: any, index: number) => (
              <Grid
                item
                xs={12}
                md={4}
                key={index + forder.id}
                sx={{ display: 'flex', alignItems: 'stretch' }}
              >
                <Card
                  elevation={0}
                  className="card-panel"
                  sx={{ width: '100%' }}
                >
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
                        title="UnFavrouite Order "
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          handleClickOpen(forder.id);
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    {/*<Grid item xs={12} sm={4}>
                       <CardMedia
                        component="img"
                        title="food item image"
                        image={require('../../assets/imgs/order-hidtory-icon.png')}
                        alt="Foot item"
                        className="order-img"
                      />
                    //</Grid>*/}
                    <Grid
                      item
                      xs={12}
                      sx={{
                        padding: {
                          xs: '0px 10px 20px 0px',
                          sm: '0px 0px 20px 0px',
                        },
                      }}
                      className="order-detail-panel"
                    >
                      {forder.products &&
                        forder.products
                          .slice(0, 3)
                          .map((product: any, index: number) => (
                            <Fragment>
                              {index === 2 && forder.products.length > 3 ? (
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
                        onClick={() => addProductToBag(forder.id)}
                      >
                        REORDER
                      </Typography>
                    </Grid>
                  </Grid>

                  <DialogBox
                    open={open}
                    handleClose={handleClose}
                    message={'Do You Really Want To UnFavorite The Order?'}
                    handleDeleteFunction={() => {
                      deleteFavOrderHandler();
                    }}
                  />
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
