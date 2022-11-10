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
    allRestaurants,
    changeOrderType,
    orderType,
    // isNearByRestaurantList,
    setShowNearBy,
    setLatLng,
    latLng,
    setActionPerform,
    deliveryRasturants,
    setDeliveryRasturants,
    // setOrderTypeMain,
    setfilteredRestaurants,
    filteredRestaurants,
    loading,
    deliveryAddressString,
    setDeliveryAddressString,
    searchTextP,
    // setSelectedLatLng,
    addCustomAddressCheck,
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
            displayToast('ERROR', 'Please enter your full delivery address.');
          }
        });
      })

      .catch((error) => {
        displayToast('ERROR', 'Please enter your full delivery address.');
        setActionPerform(false);
      });
  };

  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [searchText, setSearchText] = useState<string>();
  // const [orderType, setorderType] = useState<string>();
  // const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  // const [AllResturants, setAllResturants] = useState([]);
  // const { restaurant, orderType } = useSelector(
  //   (state: any) => state.restaurantInfoReducer,
  // );
  const { userDeliveryAddresses, loading: deliveryAddressesLoading } =
    useSelector((state: any) => state.userReducer);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const basketObj = useSelector((state: any) => state.basketReducer);

  useEffect(() => {
    dispatch(getUserDeliveryAddresses());
  }, []);

  const [showAllResturants, setShowAllResturants] = useState(false);

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  };
  // useEffect(() => {
  //   if (searchTextP == '') setValue('');
  // }, [searchTextP]);

  useEffect(() => {
    if (!isDesktop) {
      setShowAllResturants(false);
    }
  }, [isDesktop]);

  // useEffect(() => {
  //   if (isNearByRestaurantList) {
  //     if (searchText) {
  //       setSearchText(searchText?.trim() + ' ');
  //       setTimeout(() => {
  //         setSearchText(searchText?.trim());
  //       }, 500);
  //     }
  //   }
  // }, [isNearByRestaurantList]);

  // useEffect(() => {
  //   setValue('');
  //   setSearchText('');
  //   setDeliveryRasturants([]);
  //   setfilteredRestaurants([]);
  //   setAllResturants([]);
  //   setDeliveryAddressString(null);
  //   setShowNotFoundMessage(false);
  //   setShowAllResturants(false);
  //   setOrderTypeMain(orderType);
  // }, [orderType]);

  // useEffect(() => {
  //   setShowNotFoundMessage(false);
  //   // if (isNearByRestaurantList && orderType && !showNearBy) {
  //   //   setfilteredRestaurants(restaurants);
  //   // } else
  //     if (orderType && showNearBy) {
  //     setfilteredRestaurants(
  //       deliveryRasturants && deliveryRasturants.length
  //         ? deliveryRasturants
  //         : [],
  //     );
  //   }
  // }, [isNearByRestaurantList, restaurants, deliveryRasturants]);

  const getNearByRestaurants = (lat: number, long: number) => {
    var today = new Date();
    const dateFrom =
      today.getFullYear() * 1e4 +
      (today.getMonth() + 1) * 100 +
      today.getDate() +
      '';
    const lastWeekDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 6,
    );
    const dateTo =
      lastWeekDate.getFullYear() * 1e4 +
      (lastWeekDate.getMonth() + 1) * 100 +
      lastWeekDate.getDate() +
      '';
    dispatch(getNearByResturantListRequest(lat, long, 40, 6, dateFrom, dateTo));
  };

  const getSearchResults = () => {
    // setShowNotFoundMessage(false);
    // if (orderType === 'dispatch') {
    //   setfilteredRestaurants(
    //     deliveryRasturants && deliveryRasturants.length
    //       ? deliveryRasturants
    //       : [],
    //   );
    //   return false;
    // }
    // setfilteredRestaurants(isNearByRestaurantList ? allRestaurants : []);
    // if (orderType) {
    let availableRestaurants = [];
    let resultsFound = false;
    // if (orderType && orderType !== '') {
    //   if (orderType === 'pickup') {
    //     updatedRestaurants = allRestaurants.filter(
    //       (x: any) => x.canpickup === true,
    //     );
    //   } else if (orderType === 'curbside') {
    //     updatedRestaurants = allRestaurants.filter(
    //       (x: any) => x.supportscurbside === true,
    //     );
    //   } else if (orderType === 'dispatch') {
    //     updatedRestaurants = allRestaurants.filter(
    //       (x: any) => x.supportsdispatch === true,
    //     );
    //   }
    availableRestaurants = getOrderTypeRestaurants(allRestaurants, orderType);
    // if (availableRestaurants.length > 0) {
    //   resultsFound = true;
    // } else {
    //   // setShowNotFoundMessage(true);
    // }
    // }
    let searchedRestaurant: ResponseRestaurant[] = [];
    const searchTextTrim = (searchText && searchText.trim()) || '';
    if (searchTextTrim.length > 1) {
      TagManager.dataLayer({
        dataLayer: {
          event: 'vpv',
          virtualPagePath: searchTextTrim,
        },
      });
      // let searchTxt = searchText.trim().toLowerCase();
      // if (!resultsFound) {
      // setShowNotFoundMessage(true);
      //   setfilteredRestaurants([]);
      // } else {
      searchedRestaurant = availableRestaurants.filter(
        (x: any) => x.city.toLowerCase() == searchTextTrim,
      );
      if (searchedRestaurant.length === 0) {
        searchedRestaurant = availableRestaurants.filter(
          (x: any) => x.state.toLowerCase() == searchTextTrim,
        );
        // setShowNotFoundMessage(false);
        // setfilteredRestaurants([]);


      }
      if (searchedRestaurant.length === 0) {
        // searchedRestaurant = availableRestaurants.filter(
        //   (x: any) => x.zip.toLowerCase() == searchTextTrim,
        // );
        getGeocode({ address: searchTextTrim })
          .then((results) => {
            getLatLng(results[0]).then(({ lat, lng }) => {
              getNearByRestaurants(lat, lng);
              // setShowNearBy(true);
              setActionPerform(true)
              setLatLng({ lat: lat, lng: lng });
              // setSelectedLatLng({ lat: lat, lng: lng });
            });
          })
          .catch((error) => {
            // setShowNotFoundMessage(true);
          });
      }
      setfilteredRestaurants(searchedRestaurant);
      // if (searchedRestaurant.length === 0) {
      // setShowNotFoundMessage(true);
      // }
      // }
    } else {
      setfilteredRestaurants(availableRestaurants);
    }
    // } else {
    // if (!isNearByRestaurantList) {
    //   // setShowNotFoundMessage(false);
    //   setfilteredRestaurants([]);
    // }
    // }
  };

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
    // setShowNearBy(true);
    setLatLng(null);
    setActionPerform(true);
    setSearchText('');
  };

  const gotoCategoryPage = (storeID: number) => {
    if (orderType === undefined) {
      displayToast('ERROR', 'Please select at least one order type');
      return false;
    }
    let restaurantObj = null;
    if (orderType === 'dispatch') {
      restaurantObj = deliveryRasturants.find((x: any) => x.id === storeID);
      dispatch(setDeliveryAddress(deliveryAddressString));
    } else {
      restaurantObj = allRestaurants.find((x: any) => x.id === storeID);
    }
    // if (restaurantObj) {
    //   if (
    //     restaurant == null ||
    //     (restaurant && restaurant.id !== storeID) ||
    //     orderType !== orderType
    //   ) {
    //     dispatch(setResturantInfoRequest(restaurantObj, orderType || ''));
    //     if (basketObj && basketObj.basket) {
    //       displayToast(
    //         'SUCCESS',
    //         'Location changed to ' +
    //           restaurantObj.name +
    //           ' and basket is empty',
    //       );
    //     } else {
    //       displayToast('SUCCESS', 'Location changed to ' + restaurantObj.name);
    //     }
    //     triggerFacebookEventOnLocationChange();
    //   }
    //   navigate('/menu/' + restaurantObj.slug);
    // }
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
                      deliveryRasturants={deliveryRasturants}
                      deliveryAddressString={deliveryAddressString}
                      // restaurants={restaurants}
                      // orderType={orderType}
                      setDeliveryAddressString={setDeliveryAddressString}
                      item={item}
                      index={index + Math.random()}
                      key={index + Math.random()}
                      allRestaurants={allRestaurants}
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
                  onClick={() => changeOrderType('curbside')}
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
                !addCustomAddressCheck()(
                  <TextField
                    aria-label="Enter your delivery address"
                    label="Enter your delivery address"
                    title="Enter your delivery address"
                    aria-required="true"
                    autoComplete="false"
                    value={value}
                    type="text"
                    onChange={(e) => {
                      // setShowNotFoundMessage(false);
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
                          // setShowNotFoundMessage(true);
                        } else {
                          // setShowNotFoundMessage(false);
                        }
                      }
                    }}
                  />,
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
              {
                // (!filteredRestaurants || filteredRestaurants && filteredRestaurants.length == 0)
                // && (orderType !== 'dispatch' && !addCustomAddressCheck())
                // // !isNearByRestaurantList &&
                // // !showAllResturants &&
                // // orderType === 'dispatch' &&
                //  &&
                //   filteredRestaurants && filteredRestaurants.length == 0 &&
                orderType &&
                  !(orderType === 'dispatch' && addCustomAddressCheck()) && (
                    <Link
                      className={'current-location'}
                      title="USE YOUR CURRENT LOCATION?"
                      role="button"
                      tabIndex={0}
                      aria-label="USE YOUR CURRENT LOCATION"
                      onClick={() => {
                        // setorderType(undefined);
                        findNearByRestaurants();
                        // setShowNotFoundMessage(false);
                      }}
                      to="#"
                    >
                      USE YOUR CURRENT LOCATION?
                    </Link>
                  )
              }
              {showAllResturants}
              {((!showAllResturants &&
                orderType &&
                orderType !== 'dispatch' &&
                filteredRestaurants &&
                filteredRestaurants.length > 0) ||
                (!showAllResturants &&
                  orderType !== 'dispatch' &&
                  deliveryRasturants &&
                  deliveryRasturants.length > 0)) && (
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
                      // let updatedRestaurants = [];
                      // if (orderType === 'pickup') {
                      //   updatedRestaurants = filteredRestaurants.filter(
                      //     (x: any) => x.canpickup === true,
                      //   );
                      // } else if (orderType === 'curbside') {
                      //   updatedRestaurants = filteredRestaurants.filter(
                      //     (x: any) => x.supportscurbside === true,
                      //   );
                      // } else if (orderType === 'dispatch') {
                      //   updatedRestaurants = filteredRestaurants.filter(
                      //     (x: any) => x.supportsdispatch === true,
                      //   );
                      // }
                      // setAllResturants(updatedRestaurants);
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
                      // setAllResturants([]);
                      setShowAllResturants(false);
                    }}
                    to="#"
                  >
                    BACK TO MAP
                  </Link>
                </Typography>
              )}

              {
                // isNearByRestaurantList &&
                ((latLng &&
                  filteredRestaurants &&
                  !showAllResturants &&
                  !addCustomAddressCheck() &&
                  filteredRestaurants.length > 0) ||
                  (!showAllResturants &&
                    value &&
                    deliveryRasturants &&
                    value != '' &&
                    deliveryRasturants.length > 0 &&
                    !addCustomAddressCheck() &&
                    orderType &&
                    orderType == 'dispatch')) && (
                  <>
                    <Typography className="label">
                      <p style={{ paddingTop: '5px' }}>SELECT LOCATION BELOW</p>
                    </Typography>
                  </>
                )
              }
            </Grid>
            {addCustomAddressCheck() && (
              <DeliveryAddresses
                deliveryAddressList={userDeliveryAddresses.deliveryaddresses}
                loading={deliveryAddressesLoading}
                setDeliveryAddressString={setDeliveryAddressString}
                deliveryAddressString={deliveryAddressString}
                filteredRestaurants={filteredRestaurants}
                gotoCategoryPage={gotoCategoryPage}
                setActionPerform={setActionPerform}
                setShowNearBy={setShowNearBy}
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
              {/*{*/}
              {/*  // showNotFoundMessage*/}
              {/*  <Typography*/}
              {/*    className="label msg"*/}
              {/*    title="We were unable to find any participating locations in the area you have selected. Please try increasing the radius or enter another address. Be sure to include city, state, or zip code for the most accurate results."*/}
              {/*  >*/}
              {/*    We were unable to find any participating locations in the area*/}
              {/*    you have selected. Please try increasing the radius or enter*/}
              {/*    another address. Be sure to include city, state, or zip code*/}
              {/*    for the most accurate results.*/}
              {/*  </Typography>*/}
              {/*}*/}
              <Grid container spacing={1}>
                {orderType &&
                  !addCustomAddressCheck() &&
                  filteredRestaurants?.map(
                    (item: ResponseRestaurant, index: number) => (
                      <StoreInfo
                        gotoCategoryPage={gotoCategoryPage}
                        orderType={orderType}
                        deliveryRasturants={deliveryRasturants}
                        deliveryAddressString={deliveryAddressString}
                        restaurants={allRestaurants}
                        setDeliveryAddressString={setDeliveryAddressString}
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
