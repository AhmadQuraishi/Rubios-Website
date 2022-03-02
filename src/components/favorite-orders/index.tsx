import { Card, CardMedia, Grid, Typography } from '@mui/material';
import './index.css';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFavoritetOrders } from '../../redux/actions/user';
import { addMultipleProductsRequest } from '../../redux/actions/basket/addMultipleProducts';
import LoadingBar from '../loading-bar';
import { TablePagination } from '@mui/material';
import {
  RequestBasketProductBatch
} from '../../types/olo-api';


const FavoriteOrders = () => {
  const [favOrders, setfavOrders] = React.useState([]);
  const dispatch = useDispatch();
  console.log('123');

  const authtoken = useSelector((state: any) => state.TokensReducer.authtoken);
  const basketObj = useSelector((state: any) => state.basketReducer);
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

  const addProductToBag = (orderProducts: any) =>{
    const request: RequestBasketProductBatch = {} as RequestBasketProductBatch ;
    request.products = orderProducts;
    request.replaceContents = true;
    dispatch(addMultipleProductsRequest(basketObj.basket.id || '', request))
  }

  let x = 0;
  return (
    <Fragment>
      {loading && <LoadingBar />}
      {!loading && favOrders.length < 1 && (
        <Typography variant="h6" className="no-orders">
          You don't have any favorites
        </Typography>
      )}
      {!loading && favOrders.length > 0 && (
        <Grid container spacing={3} className="order-history-card">
          {favOrders
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((forder: any) => (
              <Grid item xs={12} lg={6} key={x++}>
                <Card elevation={0} className="card-panel">
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography
                        variant="caption"
                        className="order-name"
                        title={forder.name}
                      >
                        {/* {forder.name.length > 30
                          ? forder.name.substring(0, 30) + '...'
                          : forder.name} */}
                        {forder.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={2} className="order-fav-icon">
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
                      {forder.products
                        .slice(0, 3)
                        .map((product: any, index: number) => (
                          <Fragment>
                            {index == 2 && forder.products.length > 3 ? (
                              <Typography
                                className="order-detail"
                                variant="body2"
                                title={product.name}
                                key={product.name + product.quantity}
                              >
                                {product.quantity}x{' '}
                                {product.name.substring(0, 19)}...
                              </Typography>
                            ) : (
                              <Typography
                                className="order-detail"
                                variant="body2"
                                title={product.name}
                                key={product.name + product.quantity}
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
                        onClick={() => addProductToBag(forder.products)}
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
