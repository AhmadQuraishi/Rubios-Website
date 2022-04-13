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
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

const LocationCard = (props: any) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: new google.maps.LatLng({ lat: 37.772, lng: -122.214 }),
      radius: 200 * 1000,
    },
  });
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });
  const handleSelect = (description: any) => {
    debugger;
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        setLatLng({ lat: lat, lng: lng });
        setActionPerform(true);
      })
      .catch((error) => {
        console.log('Error: ', error);
      });
  };

  const {
    restaurants,
    isNearByRestaurantList,
    setShowNearBy,
    setLatLng,
    setActionPerform,
    deliveryRasturants,
    setDeliveryRasturants,
  } = props;
  const [searchText, setSearchText] = useState<string>();
  const [resturantOrderType, setresturantOrderType] = useState<string>();
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  const [filteredRestaurants, setfilteredRestaurants] =
    useState<ResponseRestaurant[]>();
  const { restaurant, orderType } = useSelector(
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
    if (resturantOrderType == undefined) {
      displayToast('ERROR', 'Please select atleast one order type');
      return false;
    }
    let restaurantObj = null;
    if (resturantOrderType == 'delivery') {
      restaurantObj = deliveryRasturants.find((x: any) => x.id === storeID);
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

  useEffect(() => {
    setShowNotFoundMessage(false);
    if (isNearByRestaurantList && resturantOrderType != 'delivery') {
      setfilteredRestaurants(restaurants);
    } else if (resturantOrderType == 'delivery') {
      setfilteredRestaurants(deliveryRasturants);
    } else {
      setfilteredRestaurants(undefined);
    }
  }, [isNearByRestaurantList, restaurants, deliveryRasturants]);

  const getSearchResults = () => {
    setShowNotFoundMessage(false);
    if (resturantOrderType === 'delivery') {
      setfilteredRestaurants(deliveryRasturants);
      return false;
    }
    debugger;
    setfilteredRestaurants(isNearByRestaurantList ? restaurants : []);
    if (resturantOrderType || searchText) {
      let updatedRestaurants = [];
      let resultsFound = false;
      if (resturantOrderType && resturantOrderType !== '') {
        if (resturantOrderType === 'pickup') {
          updatedRestaurants = restaurants.filter(
            (x: any) => x.canpickup === true,
          );
        } else if (resturantOrderType === 'curbside') {
          updatedRestaurants = restaurants.filter(
            (x: any) => x.supportscurbside === true,
          );
        } else if (resturantOrderType === 'delivery') {
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
          if (updatedRestaurants.length > 0) {
            setfilteredRestaurants(updatedRestaurants);
          } else setShowNotFoundMessage(true);
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
  }, [resturantOrderType]);

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
    setLatLng(null);
    setActionPerform(true);
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
                    setresturantOrderType(
                      resturantOrderType === 'pickup' ? undefined : 'pickup',
                    )
                  }
                  className="selected-btn"
                  aria-label=" PickUp"
                >
                  PickUp
                </ToggleButton>
                <ToggleButton
                  value="Curbside"
                  onClick={() =>
                    setresturantOrderType(
                      resturantOrderType === 'curbside'
                        ? undefined
                        : 'curbside',
                    )
                  }
                  className="selected-btn"
                  aria-label=" Curbside"
                >
                  Curbside
                </ToggleButton>
                <ToggleButton
                  value="Delivery"
                  onClick={() => {
                    setresturantOrderType(
                      resturantOrderType === 'delivery'
                        ? undefined
                        : 'delivery',
                    );
                  }}
                  className="selected-btn"
                  aria-label=" Delivery"
                >
                  Delivery
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} style={{ position: 'relative' }} ref={ref}>
              {resturantOrderType == 'delivery' ? (
                <TextField
                  aria-label="Enter your address..."
                  label="Enter your address..."
                  title="Enter your address..."
                  aria-required="true"
                  autoComplete="false"
                  value={value}
                  type="text"
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setValue('');
                      setActionPerform(false);
                      setDeliveryRasturants([]);
                    } else {
                      setValue(e.target.value);
                      setActionPerform(true);
                    }
                  }}
                  sx={{ fontSize: '14px', paddingRight: '0px' }}
                  variant="outlined"
                />
              ) : (
                <TextField
                  aria-label="City, Zip Code, State"
                  label="City, Zip Code, State"
                  title="City, Zip Code, State"
                  aria-required="true"
                  value={searchText || ''}
                  autoComplete="false"
                  type="search"
                  onChange={handleChange}
                  sx={{ fontSize: '14px', paddingRight: '0px' }}
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      setSearchText(e.target.value);
                      getSearchResults();
                    }
                  }}
                  InputProps={{
                    endAdornment: <Icon />,
                  }}
                  variant="outlined"
                />
              )}
              {status === 'OK' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '72px',
                    padding: '10px 5px',
                    background: '#fff',
                    boxShadow: 'rgb(0 0 0 / 30%) 0px 1px 4px -1px',
                    borderRadius: '0px 0px 5px 5px',
                  }}
                >
                  {value !== '' &&
                    data.map(({ place_id, description }) => (
                      <p
                        style={{
                          padding: '5px',
                          fontFamily: 'Poppins-Regular',
                          fontSize: '13px',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          handleSelect(description);
                        }}
                        key={place_id}
                      >
                        {description}
                      </p>
                    ))}
                </div>
              )}
            </Grid>
            <Grid item xs={12}>
              <Typography className="label">
                {((isNearByRestaurantList &&
                  filteredRestaurants &&
                  filteredRestaurants.length > 0) ||
                  (value &&
                    deliveryRasturants &&
                    value != '' &&
                    deliveryRasturants.length > 0)) &&
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
                      role="button"
                      tabIndex={0}
                      aria-label="USE YOUR CURRENT LOCATION"
                      onClick={() => {
                        setresturantOrderType(undefined);
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
                      tabIndex={0}
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
