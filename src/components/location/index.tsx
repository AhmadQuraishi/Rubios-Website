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
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setResturantInfoRequest } from '../../redux/actions/restaurant';
import { displayToast } from '../../helpers/toast';
import usePlacesAutocomplete, {
  getDetails,
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { setDeliveryAddress } from '../../redux/actions/location/delivery-address';

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
    clearSuggestions();
  });
  const handleSelect = (description: any) => {
    setValue(description, false);
    clearSuggestions();
    setActionPerform(true);
    getGeocode({ address: description })
      .then((results) => {
        getLatLng(results[0]).then(({ lat, lng }) => {
          const address = getAddress(results[0]);
          if (address.address1 !== '') {
            setLatLng({ lat: lat, lng: lng });
            setDeliveryAddressString(getAddress(results[0]));
          } else {
            setActionPerform(false);
            displayToast(
              'ERROR',
              'Invalid Address, Please enter another address',
            );
          }
        });
      })

      .catch((error) => {
        console.log('Error: ', error);
        displayToast('ERROR', 'Selected address not found');
        setActionPerform(false);
      });
  };

  const getAddress = (place: any) => {
    const address = {
      address1: '',
      address2: '',
      city: '',
      zip: '',
      state: '',
    };

    if (!Array.isArray(place?.address_components)) {
      return address;
    }

    place.address_components.forEach((component: any) => {
      const types = component.types;
      const value = component.long_name;
      const svalue = component.short_name;

      if (types.includes('locality')) {
        address.city = value;
      } else if (types.includes('sublocality') && address.city === '') {
        address.city = value;
      } else if (types.includes('street_number')) {
        address.address1 = address.address1 + value + ' ';
      } else if (types.includes('route')) {
        address.address1 = address.address1 + value + '';
      } else if (types.includes('neighborhood')) {
        address.address2 = address.address2 + value + ' ';
      } else if (types.includes('administrative_area_level_2')) {
        address.address2 = address.address2 + value + '';
      } else if (types.includes('administrative_area_level_1')) {
        address.state = svalue;
      } else if (types.includes('postal_code')) {
        address.zip = value;
      }
    });

    if (address.address1 === '' || address.city === '' || address.zip == '') {
      return {
        address1: '',
        address2: '',
        city: '',
        zip: '',
        state: '',
      };
    }

    return address;
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
  const [deliveryAddressString, setDeliveryAddressString] = useState<any>();

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
        dispatch(setDeliveryAddress(deliveryAddressString));
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
      setfilteredRestaurants(
        (deliveryRasturants &&
          deliveryRasturants.filter((x: any) => x.candeliver === true)) ||
          [],
      );
    } else {
      setfilteredRestaurants(undefined);
    }
  }, [isNearByRestaurantList, restaurants, deliveryRasturants]);

  const getSearchResults = () => {
    setShowNotFoundMessage(false);
    if (resturantOrderType === 'delivery') {
      setfilteredRestaurants(
        (deliveryRasturants &&
          deliveryRasturants.filter((x: any) => x.candeliver === true)) ||
          [],
      );
      return false;
    }
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
              <Typography variant="h1" className="sr-only">
                Choose your location
              </Typography>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={onServiceSelect}
              >
                <ToggleButton
                  value="Pick up"
                  onClick={() => {
                    setresturantOrderType(
                      resturantOrderType === 'pickup' ? undefined : 'pickup',
                    );
                  }}
                  className="selected-btn"
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
                    setShowNotFoundMessage(false);
                    if (e.target.value === '') {
                      setValue('');
                      setActionPerform(false);
                      setDeliveryRasturants([]);
                    } else {
                      setValue(e.target.value);
                    }
                  }}
                  sx={{ fontSize: '14px', paddingRight: '0px' }}
                  variant="outlined"
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter' && e.target.value !== '') {
                      if (data.length === 0) {
                        setShowNotFoundMessage(true);
                      } else {
                        setShowNotFoundMessage(false);
                      }
                    }
                  }}
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
                <div className="autocomplete-combo">
                  {value !== '' &&
                    data.map(({ place_id, description }) => (
                      <a
                        href="#"
                        className="prg"
                        onClick={() => {
                          handleSelect(description);
                        }}
                        key={place_id}
                      >
                        {description}
                      </a>
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
                    deliveryRasturants.length > 0 &&
                    resturantOrderType &&
                    resturantOrderType == 'delivery')) &&
                  'NEARBY LOCATIONS'}
                {!isNearByRestaurantList &&
                  (filteredRestaurants == undefined ||
                    (filteredRestaurants &&
                      filteredRestaurants.length == 0)) && (
                    <Link
                      style={{
                        textAlign: 'center',
                        display: 'block',
                        cursor: 'pointer',
                        fontWeight: 500,
                        textDecoration: 'underline',
                        color: '#0075BF',
                      }}
                      title="USE YOUR CURRENT LOCATION?"
                      role="button"
                      tabIndex={0}
                      aria-label="USE YOUR CURRENT LOCATION"
                      onClick={() => {
                        setresturantOrderType(undefined);
                        setAlignment('web');
                        findNearByRestaurants();
                        setShowNotFoundMessage(false);
                      }}
                      to="#"
                    >
                      USE YOUR CURRENT LOCATION?
                    </Link>
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
