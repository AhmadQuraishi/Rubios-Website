import { setDeliveryAddress } from '../../../redux/actions/location/delivery-address';
import { requestToVerifyDeliveryAddress } from '../../../services/verify-delivery-address';
import { verifyDeliveryAddressRequest } from '../../../redux/actions/location/verify-delivery-address';
import { Grid, Typography } from '@mui/material';
import { displayToast } from '../../../helpers/toast';
import { setResturantInfoRequest } from '../../../redux/actions/restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const StoreInfo = (props: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    setSelectedStoreID,
    resturantOrderType,
    deliveryRasturants,
    deliveryAddressString,
    restaurants,
    orderType,
    setDeliveryAddressString,
    item,
    index,
    restaurant
  } = props;
  const gotoCategoryPage = (storeID: number) => {
    setSelectedStoreID('');
    if (resturantOrderType == undefined) {
      displayToast('ERROR', 'Please select atleast one order type');
      return false;
    }
    let restaurantObj = null;
    if (resturantOrderType == 'delivery') {
      setSelectedStoreID(storeID.toString());
      restaurantObj = deliveryRasturants.find((x: any) => x.id === storeID);
      setDeliveryAddressString(deliveryAddressString);
    } else {
      restaurantObj = restaurants.find((x: any) => x.id === storeID);
    }
    if (restaurantObj) {
      if (
        restaurant == null ||
        (restaurant && restaurant.id != storeID) ||
        resturantOrderType != orderType
      ) {
        dispatch(
          setResturantInfoRequest(restaurantObj, resturantOrderType || ''),
        );
        displayToast('SUCCESS', 'Location changed to ' + restaurantObj.name);
      }
      navigate('/menu/' + restaurantObj.slug);
    }
  };

  return (
    <Grid
      item
      xs={12}
      sx={{ marginBottom: '10px', cursor: 'pointer' }}
      onClick={() => {
        gotoCategoryPage(item.id);
      }}
      tabIndex={0}
      onKeyUp={(e) => {
        if (e.keyCode === 13) {
          gotoCategoryPage(item.id);
        }
      }}
      key={index}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          fontSize: '18px',
          paddingBottom: '5px',
        }}
      >
        {item.name}
      </Typography>
      <Typography variant="body2">
        {item.streetaddress}, <br /> {item.city}, {item.state}, {item.zip}
      </Typography>
      {item.distance > 0 && (
        <Typography variant="body2" sx={{ color: '#5FA625' }}>
          {item.distance} Miles Away
        </Typography>
      )}
    </Grid>
  );
};

export default StoreInfo;
