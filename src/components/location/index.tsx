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
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StoreInfo from './info';
import { displayToast } from '../../helpers/toast';
import ListHours from '../location/listHours';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

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
            setDeliveryAddressString(address);
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
  const [AllResturants, setAllResturants] = useState([]);
  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const [deliveryAddressString, setDeliveryAddressString] = useState<any>();
  const [showAllResturants, setShowAllResturants] = useState(false);

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

  const [selectedStoreID, setSelectedStoreID] = useState('');

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
    if (restaurants) {
      setShowAllResturants(false);
      getSearchResults();
    }
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
        {showAllResturants && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              background: '#FFF',
              top: 0,
              left: 0,
            }}
          >
            <div
              style={{
                marginLeft: '350px',
                paddingTop: '40px',
                paddingRight: '40px',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontFamily: 'Poppins-Bold !important',
                  color: '#214F66',
                  fontSize: '36px !important',
                  textTransform: 'uppercase',
                }}
              >
                SELECT A {resturantOrderType} LOCATION
              </Typography>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexFlow: 'row wrap',
                  marginTop: '10px',
                }}
              >
                {AllResturants.length > 0 &&
                  AllResturants.map((item: any, index: number) => (
                    <StoreInfo
                      setSelectedStoreID={setSelectedStoreID}
                      resturantOrderType={resturantOrderType}
                      deliveryRasturants={deliveryRasturants}
                      deliveryAddressString={deliveryAddressString}
                      restaurants={restaurants}
                      orderType={orderType}
                      setDeliveryAddressString={setDeliveryAddressString}
                      item={item}
                      index={index + Math.random()}
                      key={index + Math.random()}
                      restaurant={restaurant}
                      allStores={true}
                    />
                  ))}
              </ul>
            </div>
          </div>
        )}
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
                  aria-label="PickUp ,  Activating this element will cause results to load below "
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
                  aria-label=" Curbside ,  Activating this element will cause results to load below "
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
                  aria-label=" Delivery , Enter your address below to get nearby restaurants"
                >
                  Delivery
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} style={{ position: 'relative', zIndex: 1 }}>
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
                    setDeliveryRasturants([]);
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
            <Grid item xs={12} style={{ position: 'relative' }}>
              {showAllResturants}
              {((!showAllResturants &&
                resturantOrderType &&
                resturantOrderType != 'delivery') ||
                (!showAllResturants &&
                  resturantOrderType == 'delivery' &&
                  deliveryRasturants &&
                  deliveryRasturants.length > 0)) && (
                <Typography
                  className="label"
                  sx={{ display: { xs: 'none', sm: 'block' } }}
                >
                  <Link
                    style={{
                      display: 'block',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      fontWeight: 500,
                      color: '#0075BF',
                    }}
                    title="View All Resturants"
                    role="button"
                    tabIndex={0}
                    aria-label="View All Resturants"
                    onClick={() => {
                      let updatedRestaurants = [];
                      if (resturantOrderType === 'pickup') {
                        updatedRestaurants = restaurants.filter(
                          (x: any) => x.canpickup === true,
                        );
                      } else if (resturantOrderType === 'curbside') {
                        updatedRestaurants = restaurants.filter(
                          (x: any) => x.supportscurbside === true,
                        );
                      } else if (resturantOrderType === 'delivery') {
                        updatedRestaurants = deliveryRasturants.filter(
                          (x: any) => x.candeliver === true,
                        );
                      }
                      setAllResturants(updatedRestaurants);
                      setShowAllResturants(true);
                    }}
                    to="#"
                  >
                    View All Restaurants
                  </Link>
                </Typography>
              )}
              {showAllResturants && (
                <Typography className="label">
                  <Link
                    style={{
                      zIndex: 1,
                      display: 'block',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      fontWeight: 500,
                      color: '#0075BF',
                    }}
                    title="BACK TO MAP"
                    role="button"
                    tabIndex={0}
                    aria-label="BACK TO MAP"
                    onClick={() => {
                      setAllResturants([]);
                      setShowAllResturants(false);
                    }}
                    to="#"
                  >
                    BACK TO MAP
                  </Link>
                </Typography>
              )}
              <Typography className="label">
                {((isNearByRestaurantList &&
                  filteredRestaurants &&
                  !showAllResturants &&
                  filteredRestaurants.length > 0) ||
                  (!showAllResturants &&
                    value &&
                    deliveryRasturants &&
                    value != '' &&
                    deliveryRasturants.length > 0 &&
                    resturantOrderType &&
                    resturantOrderType == 'delivery')) && (
                  <>
                    <p style={{ paddingTop: '5px' }}>NEARBY LOCATIONS</p>
                  </>
                )}
                {!isNearByRestaurantList &&
                  !showAllResturants &&
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
                    <StoreInfo
                      setSelectedStoreID={setSelectedStoreID}
                      resturantOrderType={resturantOrderType}
                      deliveryRasturants={deliveryRasturants}
                      deliveryAddressString={deliveryAddressString}
                      restaurants={restaurants}
                      orderType={orderType}
                      setDeliveryAddressString={setDeliveryAddressString}
                      item={item}
                      index={index + Math.random()}
                      key={index + Math.random()}
                      restaurant={restaurant}
                      allStores={false}
                    />
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
