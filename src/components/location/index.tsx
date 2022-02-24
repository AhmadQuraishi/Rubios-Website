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
import { useDispatch } from 'react-redux';
import { setResturantInfoRequest } from '../../redux/actions/restaurant';

const LocationCard = (props: any) => {
  const { restaurants, isNearByRestaurantList, setShowNearBy, setShowError } =
    props;
  const [searchText, setSearchText] = useState<string>();
  const [orderType, setOrderType] = useState<string>();
  const [filteredRestaurants, setfilteredRestaurants] =
    useState<ResponseRestaurant[]>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (isNearByRestaurantList) {
      if (searchText) {
        setSearchText(searchText?.trim() + ' ');
        setTimeout(() => {
          setSearchText(searchText?.trim());
        }, 500);
      }
    }
  }, [isNearByRestaurantList]);

  const gotoCategoryPage = (storeID: number) => {
    if (orderType == undefined) {
      setShowError('Please select atleast one order type');
      return false;
    }
    const restaurant = restaurants.find((x: any) => x.id === storeID);
    if (restaurant) {
      dispatch(setResturantInfoRequest(restaurant, orderType || ''));
      navigate('/');
    }
  };

  useEffect(() => {
    if (isNearByRestaurantList) {
      setfilteredRestaurants(restaurants);
    } else {
      setfilteredRestaurants(undefined);
    }
  }, [isNearByRestaurantList, restaurants]);

  const getSearchResults = () => {
    if (searchText == undefined || searchText == '') {
      setfilteredRestaurants(isNearByRestaurantList ? restaurants : []);
      return false;
    }
    if (orderType || searchText) {
      let updatedRestaurants = [];
      let resultsFound = false;
      if (orderType && orderType !== '') {
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
        setfilteredRestaurants(updatedRestaurants);
        if (updatedRestaurants.length > 0) {
          resultsFound = true;
        }
      }
      let searchedRestaurant: ResponseRestaurant[] = [];
      if (searchText && searchText.trim() && searchText.length > 1) {
        let searchTxt = searchText.trim().toLowerCase();
        if (!resultsFound) {
          updatedRestaurants = restaurants.filter(
            (x: any) => x.city.toLowerCase() == searchTxt,
          );
          if (updatedRestaurants.length === 0) {
            updatedRestaurants = restaurants.filter(
              (x: any) => x.zip.toLowerCase() == searchTxt,
            );
          }
          if (updatedRestaurants.length === 0) {
            updatedRestaurants = restaurants.filter(
              (x: any) => x.state.toLowerCase() == searchTxt,
            );
          }
          if (updatedRestaurants.length > 0)
            setfilteredRestaurants(updatedRestaurants);
        } else {
          searchedRestaurant = updatedRestaurants.filter(
            (x: any) => x.city.toLowerCase() == searchTxt,
          );
          if (searchedRestaurant.length === 0) {
            searchedRestaurant = updatedRestaurants.filter(
              (x: any) => x.zip.toLowerCase() == searchTxt,
            );
          }
          if (searchedRestaurant.length === 0) {
            searchedRestaurant = updatedRestaurants.filter(
              (x: any) => x.state.toLowerCase() == searchTxt,
            );
          }
          setfilteredRestaurants(
            searchedRestaurant.length > 0 ? searchedRestaurant : [],
          );
        }
      }
    } else {
      if (!isNearByRestaurantList) {
        setfilteredRestaurants([]);
      }
    }
  };

  useEffect(() => {
    if (orderType) {
      setShowError('');
      getSearchResults();
    } else {
      if (searchText && searchText == '') {
        setShowError('');
        getSearchResults();
      }
    }
  }, [orderType]);

  useEffect(() => {
    if (searchText == undefined || searchText == '') {
      setfilteredRestaurants(isNearByRestaurantList ? restaurants : []);
    }
  }, [searchText]);

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
      onClick={() => getSearchResults()}
    >
      <SearchIcon />
    </Button>
  );

  const findNearByRestaurants = () => {
    setShowNearBy(true);
    setShowError('');
  };

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
                    setOrderType(orderType === 'pickup' ? undefined : 'pickup')
                  }
                  className="selected-btn"
                >
                  Pick Up
                </ToggleButton>
                <ToggleButton
                  value="Curbside"
                  onClick={() =>
                    setOrderType(
                      orderType === 'curbside' ? undefined : 'curbside',
                    )
                  }
                  className="selected-btn"
                >
                  Curbside
                </ToggleButton>
                <ToggleButton
                  value="Delivery"
                  onClick={() =>
                    setOrderType(
                      orderType === 'delivery' ? undefined : 'delivery',
                    )
                  }
                  className="selected-btn"
                >
                  Delivery
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="City, Zip Code, State"
                label="City, Zip Code, State"
                title="City, Zip Code, State"
                aria-required="true"
                value={searchText || ''}
                type="search"
                onChange={handleChange}
                sx={{ fontSize: '14px' }}
                InputProps={{
                  endAdornment: <Icon />,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography className="label" title="NEARBY LOCATIONS">
                {isNearByRestaurantList &&
                  filteredRestaurants &&
                  filteredRestaurants.length > 0 &&
                  'NEARBY LOCATIONS'}
                {!isNearByRestaurantList &&
                  (filteredRestaurants == undefined ||
                    (filteredRestaurants &&
                      filteredRestaurants.length == 0)) && (
                    <span
                      style={{
                        textAlign: 'center',
                        display: 'block',
                        cursor: 'pointer',
                        fontWeight: 500,
                        textDecoration: 'underline',
                      }}
                      onClick={() => findNearByRestaurants()}
                    >
                      USE YOUR CURRENT LOCATION?
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
                maxHeight: '350px',
                minHeight: '350px',
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
                        {item.streetaddress}, <br /> {item.city}, {item.state},{' '}
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
