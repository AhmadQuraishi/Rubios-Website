import { useEffect, useState } from 'react';
import { Card, Typography, Grid } from '@mui/material';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';
import { ResponseOrderStatus } from '../../types/olo-api';
import moment from 'moment';
import { LensTwoTone } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import './order-confirm-card.css';

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
      <Typography variant="h1" title="6:10 PM">
        {moment(readytime, 'YYYYMMDD HH:mm').format('h:mm A')}
      </Typography>
    </>
  );
};

const vehicleInfo = (order: any) => {
  return (
    <>
      <Grid xs={12} sm={6} md={6} lg={12} className="adjust-space">
        <Typography variant="caption" className="label" title="PICKUP TIME">
          VEHICLE INFO
        </Typography>
        <Typography variant="h6">
          {order &&
            order.customfields &&
            order.customfields.length &&
            order.customfields.map((field: any) => {
              return (
                <>
                  {field.label === 'Make' ? (
                    <>
                      <b>Make:</b> {field.value}
                      <br />
                    </>
                  ) : field.label === 'Model' ? (
                    <>
                      <b>Modal:</b> {field.value}
                      <br />
                    </>
                  ) : field.label === 'Color' ? (
                    <>
                      <b>Color:</b> {field.value}
                      <br />
                      <br />
                    </>
                  ) : (
                    ''
                  )}
                </>
              );
            })}
        </Typography>
      </Grid>
    </>
  );
};

const pickupAddress = (restaurant: any, order: any) => {
  return (
    <>
      <Typography variant="caption" className="label">
        {order && order.deliverymode ? locationTitle(order.deliverymode) : ''}
      </Typography>
      <Typography style={{ textTransform: 'uppercase' }} variant="h1">
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
      <Typography style={{ textTransform: 'uppercase' }} variant="h1">
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
  }, [orderObj]);

  useEffect(() => {
    setRestaurant(restaurantObj);
  }, [restaurantObj]);

  return (
    <>
      <Card style={{ backgroundColor: 'white' }} className="order-info">
        <Grid container spacing={0}>
          <Grid xs={12} sm={6} md={6} lg={12}>
            <Typography
              variant="caption"
              className="label"
              title="ORDER CONFIRMED"
            >
              ORDER CONFIRMED
            </Typography>
            <Typography
              variant="h1"
              title="WE'LL TAKE IT FROM HERE. SEE YOU SOON."
            >
              WE'LL TAKE IT FROM HERE. SEE YOU SOON.
            </Typography>

            {/*<Typography variant="h1" title="SEE YOU SOON.">*/}
            {/*  */}
            {/*</Typography>*/}
            <br />
            <br />
            {order && order.deliverymode === DeliveryModeEnum.delivery
              ? deliveryAddress(order)
              : pickupAddress(restaurant, order)}
            <br />
            <br />
            {/*<br />*/}
          </Grid>
          {order && order.deliverymode === DeliveryModeEnum.curbside
            ? vehicleInfo(order)
            : ''}

          <Grid xs={12} sm={6} md={6} lg={12} className="adjust-space">
            {order && order.readytime ? pickupTime(order.readytime) : ''}
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default OrderConfirmedCard;
