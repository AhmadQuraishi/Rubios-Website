import { useEffect, useState } from 'react';
import { Card, Typography } from '@mui/material';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';
import { ResponseOrderStatus } from '../../types/olo-api';
import moment from 'moment';
import { LensTwoTone } from '@mui/icons-material';
import { useSelector } from 'react-redux';

const locationTitle = (type: string) => {
  switch (type) {
    case DeliveryModeEnum.pickup:
    case DeliveryModeEnum.curbside:
      return 'PICKUP LOCATION';
    case DeliveryModeEnum.delivery:
    case DeliveryModeEnum.dispatch:
      return 'DELIVERY ADDRESS';
    default:
      return '';
  }
};

const pickupTime = (readytime: string) => {
  return (
    <>
      <Typography variant="caption" className="label" title="PICKUP TIME">
        PICKUP TIME
      </Typography>
      <Typography variant="h4" title="6:10 PM">
        {moment(readytime, 'YYYYMMDD HH:mm').format('h:mm A')}
      </Typography>
    </>
  );
};

const pickupAddress = (restaurant: any, order: any) => {
  return (
    <>
      <Typography variant="caption" className="label">
        {order && order.deliverymode ? locationTitle(order.deliverymode) : ''}
      </Typography>
      <Typography variant="h4">
        {restaurant && restaurant.slug ? restaurant.slug : ''}
      </Typography>
      <Typography variant="h6">
        {restaurant && restaurant.streetaddress ? restaurant.streetaddress : ''}
      </Typography>
      <Typography variant="h6">
        {restaurant && restaurant.city ? `${restaurant.city}, ` : ''}
        {restaurant && restaurant.state ? `${restaurant.state}` : ''}
      </Typography>
      {/*<Typography variant="h6" title="42 Miles Away">*/}
      {/*  42 Miles Away*/}
      {/*</Typography>*/}
    </>
  );
};

const deliveryAddress = (order: any) => {
  return (
    <>
      <Typography variant="caption" className="label">
        {order && order.deliverymode ? locationTitle(order.deliverymode) : ''}
      </Typography>
      <Typography variant="h4">
        {order && order.deliveryaddress && order.deliveryaddress.building
          ? order.deliveryaddress.building
          : ''}
      </Typography>
      <Typography variant="h6">
        {order && order.deliveryaddress && order.deliveryaddress.streetaddress
          ? order.deliveryaddress.streetaddress
          : ''}
      </Typography>
      <Typography variant="h6">
        {order && order.deliveryaddress && order.deliveryaddress.city
          ? `${order.deliveryaddress.city}, `
          : ''}
        {order && order.deliveryaddress && order.deliveryaddress.zipcode
          ? `${order.deliveryaddress.zipcode}`
          : ''}
      </Typography>
      {/*<Typography variant="h6" title="42 Miles Away">*/}
      {/*  42 Miles Away*/}
      {/*</Typography>*/}
    </>
  );
};

const OrderConfirmedCard = ({ orderObj, restaurantObj }: any) => {
  const [order, setOrder] = useState<ResponseOrderStatus>(orderObj);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const [restaurant, setRestaurant] =
    useState<ResponseOrderStatus>(restaurantObj);

  useEffect(() => {
    setOrder(orderObj);
    if (orderObj) {
      let recentorders = localStorage.getItem('recentorders');
      if (recentorders) recentorders = JSON.parse(recentorders);
      const items = JSON.stringify([
        {
          userid: '',
          recentorders: [
            {
              orderid: orderObj.oloid,
              orderref: orderObj.orderref,
              basketid: orderObj.id,
              date: moment(new Date()).format('DD/MM/YYYY'),
            },
          ],
        },
      ]);
      if (orderObj) {
        localStorage.setItem('recentorders', items);
      }
    }
  }, [orderObj]);

  useEffect(() => {
    setRestaurant(restaurantObj);
  }, [restaurantObj]);

  return (
    <>
      <Card style={{ backgroundColor: 'white' }}>
        <Typography variant="caption" className="label" title="ORDER CONFIRMED">
          ORDER CONFIRMED
        </Typography>
        <Typography variant="h4" title="WE'LL TAKE IT FROM HERE.">
          WE'LL TAKE IT FROM HERE.
        </Typography>
        <Typography variant="h4" title="SEE YOU SOON.">
          SEE YOU SOON.
        </Typography>
        <br />
        {order && order.deliverymode === DeliveryModeEnum.delivery
          ? deliveryAddress(order)
          : pickupAddress(restaurant, order)}
        <br />
        <br />
        {order && order.readytime ? pickupTime(order.readytime) : ''}
      </Card>
    </>
  );
};

export default OrderConfirmedCard;
