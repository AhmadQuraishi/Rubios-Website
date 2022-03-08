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
import { setResturantInfoRequest } from '../../redux/actions/restaurant';
import { displayToast } from '../../helpers/toast';

const LocationCard = (props: any) => {
  const { restaurants, isNearByRestaurantList, setShowNearBy } = props;
  const [searchText, setSearchText] = useState<string>();
  const [orderType, setOrderType] = useState<string>();
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [filteredRestaurants, setfilteredRestaurants] =
    useState<ResponseRestaurant[]>();
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );

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
      displayToast('ERROR', 'Please select atleast one order type');
      return false;
    }
    const restaurantObj = restaurants.find((x: any) => x.id === storeID);
    if (restaurantObj) {
      if (restaurant == null || (restaurant && restaurant.id != storeID)) {
        dispatch(setResturantInfoRequest(restaurantObj, orderType || ''));
        displayToast('SUCCESS', 'Location changed to ' + restaurantObj.name);
      }
      navigate('/menu/' + restaurantObj.slug);
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
    setShowNotFoundMessage(false);
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
        } else {
          setShowNotFoundMessage(true);
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
          if (searchedRestaurant.length == 0) {
            setShowNotFoundMessage(true);
          }
          setfilteredRestaurants(
            searchedRestaurant.length > 0 ? searchedRestaurant : [],
          );
        }
      }
    } else {
      if (!isNearByRestaurantList) {
        setShowNotFoundMessage(false);
        setfilteredRestaurants([]);
      }
    }
  };

  useEffect(() => {
    getSearchResults();
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
                  PickUp
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
              <Typography className="label">
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
                      title="USE YOUR CURRENT LOCATION?"
                      onClick={() => {
                        findNearByRestaurants();
                        setShowNotFoundMessage(false);
                      }}
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
              {showNotFoundMessage && (
                <Typography
                  className="label msg"
                  title="We were unable to find any participating locations in the area you have selected. Please try increasing the radius or enter another address. Be sure to include city, state, or zip code for the most accurate results."
                >
                  We were unable to find any participating locations in the area
                  you have selected. Please try increasing the radius or enter
                  another address. Be sure to include city, state, or zip code
                  for the most accurate results.
                </Typography>
              )}
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
