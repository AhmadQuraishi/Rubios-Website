import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ListHours from '../listHours';
import { removeNumberFromRestaurantName } from '../../../helpers/location';

const StoreInfo = (props: any) => {
  const {
    gotoCategoryPage,
    orderType,
    deliveryAddressString,
    item,
    index,
    allStores,
  } = props;

  const [candeliver, setCanDeliver] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      if (
        orderType === 'dispatch' &&
        deliveryAddressString &&
        Object.keys(deliveryAddressString).length
      ) {
        const url =
          (process.env.REACT_APP_OLO_API || '') +
          `/restaurants/${item.id}/checkdeliverycoverage`;
        const promise = axios.post(url, {
          handoffmode: 'dispatch',
          timewantedmode: 'asap',
          street: deliveryAddressString.address1,
          city: deliveryAddressString.city,
          zipcode: deliveryAddressString.zip,
        });
        setLoading(true);
        promise.then((response) => {
          setLoading(false);
          if (response.data && response.data.candeliver == false) {
            setCanDeliver(false);
          } else {
            setCanDeliver(true);
          }
        });
      }
    } catch (error) {
      setCanDeliver(true);
      setLoading(false);
      throw error;
    }
  }, []);

  return allStores ? (
    <li role="group" aria-label={'Restaurant'} className="list-sx">
      <div
        style={{
          boxShadow: '0px 2px 3px 0px rgb(0 0 0 / 20%)',
          margin: '10px 20px 10px 0px',
          padding: '20px 12px 5px 20px',
          border: '1px solid #CCC',
          overflow: 'hidden',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            fontSize: '18px',
            paddingBottom: '5px',
          }}
        >
          {removeNumberFromRestaurantName(item.name)}
        </Typography>
        <Typography variant="body2">
          {item.streetaddress}, <br /> {item.city}, {item.state}, {item.zip}
        </Typography>
        {item.distance > 0 && (
          <Typography variant="body2" sx={{ color: '#0069aa' }}>
            {item.distance} Miles Away
          </Typography>
        )}
        <Typography
          variant="h5"
          textTransform="uppercase"
          title="Hours"
          sx={{
            paddingBottom: '5px',
            paddingTop: '15px',
            fontSize: '13px',
            fontWeight: '500',
            fontFamily: "'GritSans-Bold' !important",
          }}
        >
          Hours
        </Typography>
        <ListHours id={item.id} />
        {candeliver == false && (
          <Typography
            variant="body2"
            sx={{
              color: '#b91a2e',
              fontSize: '13px',
              background: '#fee',
              padding: '2px 5px',
              margin: '10px 0',
            }}
          >
            {candeliver} Delivery is not available at this time
          </Typography>
        )}
        {!loading && (
          <Button
            sx={{ float: 'right', marginTop: '5px' }}
            onClick={() => {
              gotoCategoryPage(item.id);
            }}
          >
            ORDER NOW
          </Button>
        )}
      </div>
    </li>
  ) : (
    <Grid
      item
      xs={12}
      role="group"
      aria-label={'Restaurant'}
      sx={{
        marginBottom: '10px',
        cursor: 'pointer',
      }}
      onClick={() => {
        !loading && gotoCategoryPage(item.id);
      }}
      onKeyUp={(e) => {
        if (e.keyCode === 13) {
          !loading && gotoCategoryPage(item.id);
        }
      }}
      key={index}
    >
      <a style={{ color: '#000', textDecoration: 'none' }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            fontSize: '18px',
            paddingBottom: '5px',
          }}
        >
          {removeNumberFromRestaurantName(item.name)}
        </Typography>
        <Typography variant="body2">
          {item.streetaddress}, <br /> {item.city}, {item.state}, {item.zip}
        </Typography>
        {item.distance > 0 && (
          <Typography variant="body2" sx={{ color: '#5FA625' }}>
            {item.distance} Miles Away
          </Typography>
        )}
        {candeliver == false && (
          <Typography
            variant="body2"
            sx={{
              color: '#b91a2e',
              fontSize: '13px',
              background: '#fee',
              padding: '2px 5px',
            }}
          >
            {candeliver} Delivery is not available at this time
          </Typography>
        )}
      </a>
    </Grid>
  );
};

export default StoreInfo;
