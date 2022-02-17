import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './location.css';
import { ResponseRestaurant } from '../../types/olo-api';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  getResturantInfoRequest,
  setResturantInfoRequest,
} from '../../redux/actions/restaurant';

const LocationCard = (props: any) => {
  const { restaurants, isNearByRestaurantList } = props;
  const [searchText, setSearchText] = useState<string>();
  const [orderType, setOrderType] = useState<string>();
  const [filteredRestaurants, setfilteredRestaurants] = useState<
    ResponseRestaurant[]
  >(isNearByRestaurantList ? restaurants : undefined);
  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotoCategoryPage = (storeID: number) => {
    const restaurant = restaurants.find((x: any) => x.id === storeID);
    if (restaurant) {
      dispatch(setResturantInfoRequest(restaurant));
      navigate('/');
    }
  };

  useEffect(() => {
    if (searchText || orderType) {
      let updatedRestaurants = [];
      let resultsFound = false;
      if (orderType !== '') {
        if (orderType === 'pickup') {
          updatedRestaurants = restaurants.filter(
            (x: any) => x.canpickup === true,
          );
        } else if (orderType === 'curbside') {
          updatedRestaurants = restaurants.filter(
            (x: any) => x.supportscurbside === true,
          );
        } else if (orderType === 'delivery') {
          updatedRestaurants = restaurants.filter(
            (x: any) => x.candeliver === true,
          );
        }
        if (updatedRestaurants.length > 0) {
          resultsFound = true;
        }
      }
      let searchedRestaurant: ResponseRestaurant[] = [];
      if (searchText && searchText.length > 2) {
        if (!resultsFound) {
          updatedRestaurants = restaurants.filter((x: any) =>
            x.streetaddress.toLowerCase().includes(searchText),
          );
          if (updatedRestaurants.length === 0) {
            updatedRestaurants = restaurants.filter((x: any) =>
              x.city.toLowerCase().includes(searchText),
            );
          }
          if (updatedRestaurants.length === 0) {
            searchedRestaurant = restaurants.filter((x: any) =>
              x.zip.toLowerCase().includes(searchText),
            );
          }
        } else {
          searchedRestaurant = updatedRestaurants.filter((x: any) =>
            x.streetaddress.toLowerCase().includes(searchText),
          );
          if (searchedRestaurant.length === 0) {
            searchedRestaurant = updatedRestaurants.filter((x: any) =>
              x.city.toLowerCase().includes(searchText),
            );
          }
          if (searchedRestaurant.length === 0) {
            searchedRestaurant = updatedRestaurants.filter((x: any) =>
              x.zip.toLowerCase().includes(searchText),
            );
          }
        }
      }
      if (searchedRestaurant.length > 0)
        setfilteredRestaurants(searchedRestaurant);
      else setfilteredRestaurants(updatedRestaurants);
    }
  }, [searchText, orderType]);

  const [alignment, setAlignment] = React.useState('web');
  const onServiceSelect = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const Icon = () => (
    <Button
      className="search-field"
      aria-label="search nearby locations"
      title="search nearby locations"
    >
      <SearchIcon />
    </Button>
  );

  return (
    <Grid container className="list-wrapper">
      <Grid
        item
        xs={12}
        sm={5}
        md={4}
        lg={4}
        sx={{ zIndex: 1, margin: '20px 30px' }}
      >
        <Card>
          <Grid container spacing={2} className="location-sidebar">
            <Grid item xs={12}>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={onServiceSelect}
              >
                <ToggleButton
                  value="Pick up"
                  onClick={() =>
                    setOrderType(orderType === 'pickup' ? '' : 'pickup')
                  }
                  className="selected-btn"
                >
                  Pick Up
                </ToggleButton>
                <ToggleButton
                  value="Curbside"
                  onClick={() =>
                    setOrderType(orderType === 'curbside' ? '' : 'curbside')
                  }
                  className="selected-btn"
                >
                  Curbside
                </ToggleButton>
                <ToggleButton
                  value="Delivery"
                  onClick={() =>
                    setOrderType(orderType === 'delivery' ? '' : 'delivery')
                  }
                  className="selected-btn"
                >
                  Delivery
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="Address, City, or Zip Code"
                label="Address, City, or Zip Code"
                title="Address, City, or Zip Code"
                aria-required="true"
                value={searchText || ''}
                onChange={handleChange}
                sx={{ fontSize: '14px' }}
                InputProps={{ endAdornment: <Icon /> }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className="label" title="NEARBY LOCATIONS">
                {isNearByRestaurantList ? (
                  'NEARBY LOCATIONS'
                ) : (
                  <span
                    style={{
                      textAlign: 'center',
                      color: '#5fa625',
                      display: 'block',
                    }}
                  >
                    FIND A RUBIO'S NEAR YOU
                  </span>
                )}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                overflow: 'hidden',
                overflowY: 'auto',
                maxHeight: '300px',
                minHeight: '300px',
              }}
            >
              <Grid container spacing={1}>
                {filteredRestaurants?.map(
                  (item: ResponseRestaurant, index: number) => (
                    <Grid
                      item
                      xs={12}
                      sx={{ marginBottom: '10px', cursor: 'pointer' }}
                      onClick={() => {
                        gotoCategoryPage(item.id);
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
                        {item.streetaddress}, {item.city}, {item.state},{' '}
                        {item.zip}
                      </Typography>
                      {item.distance > 0 && (
                        <Typography variant="body2" sx={{ color: '#5FA625' }}>
                          {item.distance} Miles Away
                        </Typography>
                      )}
                      {item.iscurrentlyopen && item.distance == 0 && (
                        <Typography variant="body2" sx={{ color: '#5FA625' }}>
                          Online
                        </Typography>
                      )}
                    </Grid>
                  ),
                )}
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default LocationCard;
