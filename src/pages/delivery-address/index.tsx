import { Grid, Typography, Card, CardContent, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment, useEffect, useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserDeliveryAddress,
  getUserDeliveryAddresses,
  setUserDefaultDelAddress,
} from '../../redux/actions/user';
import LoadingBar from '../../components/loading-bar';
import DialogBox from '../../components/dialog-box';
import Page from '../../components/page-title';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 20px 40px 20px',
    maxWidth: '1260px',
    boxSizing: 'border-box',
    margin: 'auto',
  },
  heading: {
    paddingBottom: '25px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
}));

const DeliveryAddress = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (id: number) => {
    setId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const [deliveryaddresses, setDelAddresses] = useState([]);
  const [idtoDelete, setId] = useState(0);
  const dispatch = useDispatch();
  const { userDeliveryAddresses, loading, userDefaultDeliveryAddress } =
    useSelector((state: any) => state.userReducer);

  useEffect(() => {
    dispatch(getUserDeliveryAddresses());
  }, [userDefaultDeliveryAddress]);

  useEffect(() => {
    if (userDeliveryAddresses && userDeliveryAddresses.deliveryaddresses) {
      console.log(userDeliveryAddresses.deliveryaddresses);
      setDelAddresses(userDeliveryAddresses.deliveryaddresses);
    }
  }, [userDeliveryAddresses]);

  const defaultAddressHandler = (id: number) => {
    const obj = {
      addressid: id,
    };
    dispatch(setUserDefaultDelAddress(obj));
  };

  const deleteAddressHandler = () => {
    dispatch(deleteUserDeliveryAddress(idtoDelete));

    setTimeout(() => {
      dispatch(getUserDeliveryAddresses());
      setId(0);
    }, 600);
    setOpen(false);
  };

  return (
    <Page title={'Delivery Address'} className="">
      <Fragment>
        <Grid
          container
          className={`${classes.root} delivery-address-container`}
        >
          <Typography variant="h1" className={classes.heading}>
            DELIVERY ADDRESSES
          </Typography>
          <Typography variant="h6" title="" sx={{ marginBottom: '20px' }}>
            To add or update your delivery addresses, select “delivery” when
            placing an order and enter the updated delivery address during
            checkout.
          </Typography>
          {loading && <LoadingBar />}

          {!loading &&
            deliveryaddresses.length > 0 &&
            deliveryaddresses.map((address: any, index) => (
              <Grid item xs={12} key={index + address.id}>
                {address.isdefault == true && (
                  <Card elevation={0} className="card-panel">
                    <CardContent className="card-content">
                      <Typography variant="body2">
                        {address.isdefault && <b>DEFAULT</b>} {address.building}
                      </Typography>
                      <Typography variant="body2">
                        {address.streetaddress}
                      </Typography>
                      <Typography variant="body2">{address.city}</Typography>
                      <Typography variant="body2">{address.zipcode}</Typography>
                      <Grid container>
                        <Grid item xs={12} className="small-button-panel">
                          {/* <Link
                        aria-label="Edit"
                        title="Edit"
                        className="link"
                        to={`/account/addDeliveryAddress/${address.id}`}
                      >
                        EDIT
                      </Link> */}
                          <Typography
                            variant="button"
                            aria-label="Delete"
                            title="DELETE"
                            className="link"
                            onClick={() => {
                              handleClickOpen(address.id);
                            }}
                          >
                            DELETE
                          </Typography>

                          {!address.isdefault && (
                            <Typography
                              variant="button"
                              aria-label="MAke Default"
                              title="Make Default"
                              className="link default"
                              onClick={() => defaultAddressHandler(address.id)}
                            >
                              MAKE DEFAULT
                            </Typography>
                          )}
                        </Grid>
                        <DialogBox
                          open={open}
                          handleClose={handleClose}
                          message={
                            'Do You Really Want To Delete This Delivery Address?'
                          }
                          handleDeleteFunction={() => deleteAddressHandler()}
                        />
                      </Grid>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            ))}
          {!loading &&
            deliveryaddresses.length > 0 &&
            deliveryaddresses.map((address: any, index) => (
              <Grid item xs={12} key={index + address.id}>
                {!address.isdefault && (
                  <Card elevation={0} className="card-panel">
                    <CardContent className="card-content">
                      <Typography variant="body2">
                        {address.isdefault && <b>DEFAULT</b>} {address.building}
                      </Typography>
                      <Typography variant="body2">
                        {address.streetaddress}
                      </Typography>
                      <Typography variant="body2">{address.city}</Typography>
                      <Typography variant="body2">{address.zipcode}</Typography>
                      <Grid container>
                        <Grid item xs={12} className="small-button-panel">
                          {/* <Link
                        aria-label="Edit"
                        title="Edit"
                        className="link"
                        to={`/account/addDeliveryAddress/${address.id}`}
                      >
                        EDIT
                      </Link> */}
                          <Typography
                            variant="button"
                            aria-label="Delete"
                            title="DELETE"
                            className="link"
                            onClick={() => {
                              handleClickOpen(address.id);
                            }}
                          >
                            DELETE
                          </Typography>

                          {!address.isdefault && (
                            <Typography
                              variant="button"
                              aria-label="MAke Default"
                              title="Make Default"
                              className="link default"
                              onClick={() => {
                                defaultAddressHandler(address.id);
                              }}
                            >
                              MAKE DEFAULT
                            </Typography>
                          )}
                        </Grid>
                        <DialogBox
                          open={open}
                          handleClose={handleClose}
                          message={
                            'Do You Really Want To Delete This Delivery Address?'
                          }
                          handleDeleteFunction={() => deleteAddressHandler()}
                        />
                      </Grid>
                    </CardContent>
                  </Card>
                )}
              </Grid>
            ))}

          <Grid xs={12}>
            {!loading && deliveryaddresses.length === 0 && (
              <Typography variant="h6" className="no-address">
                You don't have any delivery addresses.
              </Typography>
            )}
          </Grid>

          {/* <Grid item xs={12}>
          <Link
            to="/account/addDeliveryAddress"
            aria-label="Add delivery Address"
          >
            <Button
              aria-label="add address"
              title=" ADD ADDRESS"
              variant="contained"
              className="button-panel"
            >
              ADD ADDRESS
            </Button>
          </Link>
        </Grid> */}
        </Grid>
      </Fragment>
    </Page>
  );
};

export default DeliveryAddress;
