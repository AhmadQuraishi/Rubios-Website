import {
  Grid,
  Typography,
  Card,
  Button,
  CardContent,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserDeliveryAddress,
  getUserDeliveryAddresses,
  getUserFavoritetOrders,
  setUserDefaultDelAddress,
} from '../../redux/actions/user';
import LoadingBar from '../../components/loading-bar';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 15px',
    maxWidth: '990px',
    boxSizing: 'border-box',
  },
  heading: {
    paddingBottom: '25px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
}));

const DeliveryAddress = () => {
  const classes = useStyles();
  const [deliveryaddresses, setDelAddresses] = useState([]);
  const dispatch = useDispatch();


  const authtoken = useSelector((state: any) => state.TokensReducer.authtoken);
  const { userDeliveryAddresses, loading , userDefaultDeliveryAddress } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
   
      dispatch(getUserDeliveryAddresses(authtoken));

    
  }, [userDefaultDeliveryAddress]);


  useEffect(() => {
    if (userDeliveryAddresses && userDeliveryAddresses.deliveryaddresses) {
      console.log(userDeliveryAddresses.deliveryaddresses);
      setDelAddresses(userDeliveryAddresses.deliveryaddresses);
     
    
    }
  }, [userDeliveryAddresses , loading])
  
  const defaultAddressHandler = (e: any, id: number) => {


    const obj = {
      addressid : id
    }
    dispatch(setUserDefaultDelAddress(obj, authtoken));
  }

  // const deleteAddressHandler = (id: number) => {
    
  //   dispatch(deleteUserDeliveryAddress(id, authtoken));
  
  // }

  return (
    <Fragment>
      <Grid container className={`${classes.root} delivery-address-container`}>
        <Typography variant="h4" className={classes.heading}>
          DELIVERY ADDRESSES
        </Typography>
        {loading && <LoadingBar />}
        {!loading && deliveryaddresses.length < 1 && (
          <h6>No Delivery Addresses Found</h6>
        )}
        {!loading &&
          deliveryaddresses.length > 0 &&
          deliveryaddresses.map((address: any, index) => (
           
              <Grid item xs={12} key={index + address.id}>
             <Card elevation={0} className="card-panel">
                <CardContent className="card-content">
                  <Typography variant="body2" title="DEFAULT Stacey's Home">
                    {address.isdefault && <b>DEFAULT</b>} {address.building}
                  </Typography>
                  <Typography variant="body2" title="5326 Highway Ave.">
                  {address.streetaddress}
                  </Typography>
                  <Typography variant="body2" title="Apt 342">
                  {address.city}
                  </Typography>
                  <Typography variant="body2" title="Carisbad, CA 34092-342387">
                    Carisbad, CA 34092-342387
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} className="small-button-panel">
                      <Link
                        aria-label="Edit"
                        title="Edit"
                        className="link"
                        to={`/account/addDeliveryAddress/${address.id}`}
                      >
                        EDIT
                      </Link>
                      <Typography
                        variant="button"
                        aria-label="Delete"
                        title="DELETE"
                        className="link"
                        // onClick={() => deleteAddressHandler( address.id )}
                      >
                        DELETE
                      </Typography>
                     {!address.isdefault  &&  <Typography
                        variant="button"
                        aria-label="MAke Default"
                        title="Make Default"
                        className="link default"
                        onClick={(e) => defaultAddressHandler( e , address.id )}
                      >
                        MAKE DEFAULT
                      </Typography>}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}

       
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DeliveryAddress;
