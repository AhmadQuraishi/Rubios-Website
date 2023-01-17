import React, { useEffect, useState } from 'react';
import { Card, Typography, Grid } from '@mui/material';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';
import { ResponseOrderStatus } from '../../types/olo-api';
import moment from 'moment';
import { LensTwoTone } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import './order-confirm-card.css';
import CardSkeletonUI from '../card-skeleton-ui';

const locationTitle = (type: string) => {
  switch (type) {
    case DeliveryModeEnum.pickup:
    case DeliveryModeEnum.curbside:
      return 'PICKUP LOCATION';
    case DeliveryModeEnum.dinein:
      return 'RESTAURANT LOCATION';
    case DeliveryModeEnum.delivery:
    case DeliveryModeEnum.dispatch:
      return 'DELIVERY ADDRESS';
    default:
      return '';
  }
};

const pickupTime = (order: any) => {
  return (
    <>
      <Typography
        variant="h2"
        className="label"
        sx={{fontSize: "11pt !important",fontFamily: "'Sunborn_Sansone'!important"}}
        title={
          order && order.deliverymode === DeliveryModeEnum.dispatch
            ? 'DELIVERY TIME'
            : 'PICKUP TIME'
        }
      >
        {order && order.deliverymode === DeliveryModeEnum.dispatch
          ? 'DELIVERY TIME'
          : 'PICKUP TIME'}
      </Typography>
      <Typography
        variant="body1"
        title="6:10 PM"
        sx={{
          fontFamily: "'GritSans-Bold'!important",
          color: '#062C43 !important',
          fontSize: '22px !important',
          lineHeight: '1.2',
          letterSpacing: '-0.00833em',
        }}
      >
        {moment(order.readytime, 'YYYYMMDD HH:mm').format('h:mm A')}
      </Typography>
    </>
  );
};

const vehicleInfo = (order: any) => {
  return (
    <>
      <Grid xs={12} sm={6} md={6} lg={12} className="adjust-space">
        <Typography variant="h2" className="label" title="VEHICLE INFO">
          {order.deliverymode === DeliveryModeEnum.curbside
            ? 'VEHICLE INFO'
            : 'DINE IN INFO'}
        </Typography>
        <Typography variant="body1">
          {order &&
            order.customfields &&
            order.customfields.length &&
            order.customfields.map((field: any) => {
              return (
                <>
                  {order.deliverymode === DeliveryModeEnum.curbside ? (
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
                      ) : null}
                    </>
                  ) : (
                    <>
                      {field.label === 'Table Number' ? (
                        <>
                          <b>Table Number:</b> {field.value}
                          <br />
                          <br />
                        </>
                      ) : null}
                    </>
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
      <Typography variant="h2" className="label" sx={{fontFamily: "'Sunborn_Sansone' !important"}}>
        {order && order.deliverymode ? locationTitle(order.deliverymode) : ''}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textTransform: 'uppercase',
          fontFamily: "'GritSans-Bold'!important",
          color: '#062C43 !important',
          fontSize: '22px !important',
          lineHeight: '1.2',
          letterSpacing: '-0.00833em',
        }}
      >
        {restaurant && restaurant.slug ? restaurant.slug : ''}
      </Typography>
      <Typography variant="body1">
        {restaurant && restaurant.streetaddress ? restaurant.streetaddress : ''}
      </Typography>
      <Typography variant="body1">
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
      <Typography variant="h2" className="label">
        {order && order.deliverymode ? locationTitle(order.deliverymode) : ''}
      </Typography>
      <Typography
        sx={{
          textTransform: 'uppercase',
          fontFamily: "'GritSans-Bold'!important",
          color: '#062C43 !important',
          fontSize: '22px !important',
          lineHeight: '1.2',
          letterSpacing: '-0.00833em',
        }}
        variant="body1"
      >
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

const OrderConfirmedCard = ({
  orderObj,
  restaurantObj,
  loadingOrder,
  loadingRestaurant,
}: any) => {
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
          {(loadingRestaurant || loadingOrder) && <CardSkeletonUI />}
          {!loadingRestaurant && !loadingOrder && orderObj && restaurantObj && (
            <>
              <Grid xs={12} sm={6} md={6} lg={12}>
                <Typography
                  variant="h2"
                  className="heading-one"
                  title="ORDER CONFIRMED"
                  sx={{
                    color: '#0075BF',
                    fontFamily: "'Sunborn_Sansone'!important",
                    fontSize: { xs: '14px !important' },
                    fontWeight: 400,
                    textTransform: 'uppercase',
                  }}
                >
                  ORDER CONFIRMED
                </Typography>
                <Typography
                  variant="body1"
                  
                  title={
                    order && order.deliverymode === DeliveryModeEnum.dinein
                      ? 'We’ll bring your food right to you shortly.'
                      : "WE'LL TAKE IT FROM HERE. SEE YOU SOON."
                  }
                  sx={{
                    lineHeight: '1.2',
                    letterSpacing: '-0.00833em',
                    color: '#062C43 !important',
                    fontSize: '22px !important',
                    fontFamily: "'GritSans-Bold' !important",
                  }}
                >
                  {order && order.deliverymode === DeliveryModeEnum.dinein
                    ? 'We’ll bring your food right to you shortly.'
                    : "WE'LL TAKE IT FROM HERE. SEE YOU SOON."}
                </Typography>

                {/*<Typography variant="h1" title="SEE YOU SOON.">*/}
                {/*  */}
                {/*</Typography>*/}
                <br />
                <br />
                {order && order.deliverymode === DeliveryModeEnum.dispatch
                  ? deliveryAddress(order)
                  : pickupAddress(restaurant, order)}
                <br />
                <br />
                {/*<br />*/}
              </Grid>
              {order &&
              (order.deliverymode === DeliveryModeEnum.curbside ||
                order.deliverymode === DeliveryModeEnum.dinein)
                ? vehicleInfo(order)
                : ''}

              <Grid xs={12} sm={6} md={6} lg={12} className="adjust-space">
                {order &&
                order.readytime &&
                order &&
                order.deliverymode !== DeliveryModeEnum.dinein
                  ? pickupTime(order)
                  : ''}
              </Grid>
            </>
          )}
        </Grid>
      </Card>
    </>
  );
};

export default OrderConfirmedCard;
