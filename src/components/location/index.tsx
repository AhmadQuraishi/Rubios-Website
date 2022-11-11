import {
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './location.css';
import { ResponseRestaurant } from '../../types/olo-api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import StoreInfo from './info';
import { displayToast } from '../../helpers/toast';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { getNearByResturantListRequest } from '../../redux/actions/restaurant/list';
import './location.css';
import { getAddress } from '../../helpers/common';
import TagManager from 'react-gtm-module';
import DeliveryAddresses from './delivery';
import { getUserDeliveryAddresses } from '../../redux/actions/user';
import { setDeliveryAddress } from '../../redux/actions/location/delivery-address';
import { setResturantInfoRequest } from '../../redux/actions/restaurant';
import { facebookSendEvent } from '../../redux/actions/facebook-conversion';
import { facebookConversionTypes } from '../../redux/types/facebook-conversion';
import { getOrderTypeRestaurants } from '../../helpers/location';

const LocationCard = (props: any) => {
  const {
    actionTypes,
    setAction,
    orderType,
    changeOrderType,
    setLatLng,
    setActionPerform,
    deliveryAddressString,
    setDeliveryAddressString,
    allRestaurants,
    setFilteredRestaurants,
    filteredRestaurants,
    loading,
    addCustomAddressCheck,
    currentLocation,
    setRestaurantNotFound,
    restaurantNotFound,
    hideCurrentLocation,
    getNearByRestaurants,
  } = props;
  const {
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
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [searchText, setSearchText] = useState<string>();
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);
  const [alignment, setAlignment] = React.useState('web');
  const onServiceSelect = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const { userDeliveryAddresses, loading: deliveryAddressesLoading } =
    useSelector((state: any) => state.userReducer);
  const { restaurant: selectedRestaurant, orderType: selectedOrderType } =
    useSelector((state: any) => state.restaurantInfoReducer);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const basketObj = useSelector((state: any) => state.basketReducer);

  useEffect(() => {
    dispatch(getUserDeliveryAddresses());
  }, []);

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (!isDesktop) {
      setShowAllRestaurants(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (orderType) {
      setValue('');
    }
  }, [orderType]);

  const handleSelect = (description: any) => {
    setValue(description, false);
    clearSuggestions();
    setAction(actionTypes.GOOGLE_SEARCH);
    setActionPerform(true);
    getGeocode({ address: description })
      .then((results) => {
        getLatLng(results[0]).then(({ lat, lng }) => {
          const address = getAddress(results[0]);
          if (address.address1 !== '') {
            setLatLng({ lat: lat, lng: lng });
            setDeliveryAddressString(address);
            getNearByRestaurants(lat, lng);
          } else {
            setActionPerform(false);
            displayToast('ERROR', 'Please enter your full delivery address.');
          }
        });
      })

      .catch((error) => {
        displayToast('ERROR', 'Please enter your full delivery address.');
        setActionPerform(false);
      });
  };
  const getSearchResults = () => {
    setAction(actionTypes.LOCAL_SEARCH);
    let availableRestaurants = [];
    availableRestaurants = getOrderTypeRestaurants(allRestaurants, orderType);
    let searchedRestaurant: ResponseRestaurant[] = [];
    const searchTextTrim =
      (searchText && searchText.trim().toLowerCase()) || '';
    if (searchTextTrim.length > 1) {
      TagManager.dataLayer({
        dataLayer: {
          event: 'vpv',
          virtualPagePath: searchTextTrim,
        },
      });
      searchedRestaurant = availableRestaurants.filter(
        (x: any) => x.city.toLowerCase() == searchTextTrim,
      );
      if (searchedRestaurant.length === 0) {
        searchedRestaurant = availableRestaurants.filter(
          (x: any) =>
            x.state.toLowerCase() == searchTextTrim ||
            (x.stateName && x.stateName.toLowerCase() == searchTextTrim),
        );
      }
      if (searchedRestaurant.length === 0) {
        getGeocode({ address: searchTextTrim })
          .then((results) => {
            getLatLng(results[0]).then(({ lat, lng }) => {
              getNearByRestaurants(lat, lng);
              setActionPerform(true);
              setLatLng({ lat: lat, lng: lng });
            });
          })
          .catch((error) => {
            setFilteredRestaurants([]);
            setRestaurantNotFound(true);
          });
      } else {
        setFilteredRestaurants(searchedRestaurant);
        setRestaurantNotFound(false);
      }
    } else {
      setFilteredRestaurants(availableRestaurants);
      setRestaurantNotFound(false);
    }
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
    setLatLng(null);
    setActionPerform(true);
    setSearchText('');
    setAction(actionTypes.CURRENT_LOCATION);
    currentLocation();
  };

  const gotoCategoryPage = (storeID: number) => {
    if (orderType === undefined) {
      displayToast('ERROR', 'Please select at least one order type');
      return false;
    }
    let restaurantObj = null;
    restaurantObj = allRestaurants.find((x: any) => x.id === storeID);
    if (orderType === 'dispatch' && restaurantObj) {
      dispatch(setDeliveryAddress(deliveryAddressString));
    }
    if (restaurantObj) {
      if (
        !selectedRestaurant ||
        (selectedRestaurant && selectedRestaurant.id !== storeID) ||
        orderType !== selectedOrderType
      ) {
        dispatch(setResturantInfoRequest(restaurantObj, orderType || ''));
        if (basketObj && basketObj.basket) {
          displayToast(
            'SUCCESS',
            'Location changed to ' +
              restaurantObj.name +
              ' and basket is empty',
          );
        } else {
          displayToast('SUCCESS', 'Location changed to ' + restaurantObj.name);
        }
        triggerFacebookEventOnLocationChange();
      }
      navigate('/menu/' + restaurantObj.slug);
    }
  };

  const triggerFacebookEventOnLocationChange = () => {
    let userObj: any = null;
    if (providerToken) {
      userObj = {
        first_name: providerToken.first_name || '',
        last_name: providerToken.last_name || '',
        email: providerToken.email || '',
        phone: providerToken.phone || '',
      };
    }
    dispatch(
      facebookSendEvent(
        facebookConversionTypes.FACEBOOK_FIND_LOCATION_EVENT,
        userObj,
        null,
      ),
    );
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
        {showAllRestaurants && (
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
                paddingTop: '40px',
                paddingRight: '40px',
                maxHeight: '94%',
                overflowY: 'auto',
              }}
              className="view-all-panel-listing-oo"
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
                SELECT A {orderType} LOCATION
              </Typography>
              <ul
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexFlow: 'row wrap',
                  marginTop: '10px',
                }}
              >
                {!loading &&
                  filteredRestaurants &&
                  filteredRestaurants.length === 0 && (
                    <Typography
                      variant="h2"
                      sx={{
                        fontFamily: 'Poppins-Medium !important',
                        color: '#000000',
                        fontSize: '12px !important',
                      }}
                    >
                      No Restaurant Found!
                    </Typography>
                  )}
                {filteredRestaurants.length > 0 &&
                  filteredRestaurants.map((item: any, index: number) => (
                    <StoreInfo
                      gotoCategoryPage={gotoCategoryPage}
                      orderType={orderType}
                      deliveryAddressString={deliveryAddressString}
                      item={item}
                      index={index + Math.random()}
                      key={index + Math.random()}
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
                  role="radio"
                  value="Pick up"
                  onClick={() => {
                    setSearchText('');
                    changeOrderType('pickup');
                  }}
                  className="selected-btn"
                  aria-current={alignment === 'Pick up'}
                  aria-label="PickUp, Activating this element will cause results to load below "
                >
                  PickUp
                </ToggleButton>
                <ToggleButton
                  role="radio"
                  value="Curbside"
                  onClick={() => {
                    setSearchText('');
                    changeOrderType('curbside');
                  }}
                  className="selected-btn"
                  aria-current={alignment === 'Curbside'}
                  aria-label=" Curbside, Activating this element will cause results to load below "
                >
                  Curbside
                </ToggleButton>
                <ToggleButton
                  value="Delivery"
                  role="radio"
                  onClick={() => {
                    setSearchText('');
                    setShowAllRestaurants(false);
                    changeOrderType('dispatch');
                  }}
                  className="selected-btn"
                  aria-current={alignment === 'Delivery'}
                  aria-label=" Delivery, Enter your address below to get nearby restaurants"
                >
                  Delivery
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} style={{ position: 'relative', zIndex: 1 }}>
              {orderType &&
                orderType === 'dispatch' &&
                !addCustomAddressCheck() && (
                  <TextField
                    aria-label="Enter your delivery address"
                    label="Enter your delivery address"
                    title="Enter your delivery address"
                    aria-required="true"
                    autoComplete="false"
                    value={value}
                    type="text"
                    onChange={(e) => {
                      setRestaurantNotFound(false);
                      if (e.target.value === '') {
                        setValue('');
                        setActionPerform(false);
                      } else {
                        setValue(e.target.value);
                      }
                    }}
                    sx={{ fontSize: '14px', paddingRight: '0px' }}
                    variant="outlined"
                    onKeyPress={(e: any) => {
                      if (e.key === 'Enter' && e.target.value !== '') {
                        if (data.length === 0) {
                          // setRestaurantNotFound(true);
                        } else {
                          // setRestaurantNotFound(false);
                        }
                      }
                    }}
                  />
                )}
              {orderType && orderType !== 'dispatch' && (
                <TextField
                  aria-label="City, Zip Code, State"
                  label="City, Zip Code, State"
                  title="City, Zip Code, State"
                  aria-required="true"
                  value={searchText || ''}
                  autoComplete="false"
                  type="search"
                  onChange={(e) => handleChange(e)}
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
              {orderType &&
                !hideCurrentLocation &&
                !(orderType === 'dispatch' && addCustomAddressCheck()) && (
                  <Link
                    className={'current-location'}
                    title="USE YOUR CURRENT LOCATION?"
                    role="button"
                    tabIndex={0}
                    aria-label="USE YOUR CURRENT LOCATION"
                    onClick={findNearByRestaurants}
                    to="#"
                  >
                    USE YOUR CURRENT LOCATION?
                  </Link>
                )}

              {!showAllRestaurants &&
                orderType &&
                orderType !== 'dispatch' &&
                filteredRestaurants?.length > 0 && (
                  <Typography
                    className="label"
                    sx={{ display: { xs: 'none', lg: 'block' } }}
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
                        setShowAllRestaurants(true);
                      }}
                      to="#"
                    >
                      View All Restaurants
                    </Link>
                  </Typography>
                )}
              {showAllRestaurants && (
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
                      setShowAllRestaurants(false);
                    }}
                    to="#"
                  >
                    BACK TO MAP
                  </Link>
                </Typography>
              )}

              {!showAllRestaurants &&
                orderType &&
                orderType === 'dispatch' &&
                filteredRestaurants.length > 0 &&
                !addCustomAddressCheck() && (
                  <Typography className="label">
                    <p style={{ paddingTop: '5px' }}>SELECT LOCATION BELOW</p>
                  </Typography>
                )}
            </Grid>
            {addCustomAddressCheck() && (
              <DeliveryAddresses
                deliveryAddressList={userDeliveryAddresses?.deliveryaddresses}
                loading={deliveryAddressesLoading}
                setDeliveryAddressString={setDeliveryAddressString}
                deliveryAddressString={deliveryAddressString}
                filteredRestaurants={filteredRestaurants}
                gotoCategoryPage={gotoCategoryPage}
                setActionPerform={setActionPerform}
                setLatLng={setLatLng}
              />
            )}
            <Grid
              item
              xs={12}
              style={{
                overflow: 'hidden',
                overflowY: 'auto',
                maxHeight: '350px',
                minHeight: '350px',
                display:
                  orderType &&
                  orderType === 'dispatch' &&
                  addCustomAddressCheck()
                    ? 'none'
                    : 'block',
              }}
            >
              {restaurantNotFound && (
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
                {orderType &&
                  !addCustomAddressCheck() &&
                  filteredRestaurants?.map(
                    (item: ResponseRestaurant, index: number) => (
                      <StoreInfo
                        gotoCategoryPage={gotoCategoryPage}
                        orderType={orderType}
                        deliveryAddressString={deliveryAddressString}
                        item={item}
                        index={index + Math.random()}
                        key={index + Math.random()}
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
