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
import { Link } from 'react-router-dom';
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
            displayToast('ERROR', 'Please enter your full delivery address.');
          }
        });
      })

      .catch((error) => {
        console.log('Error: ', error);
        displayToast('ERROR', 'Please enter your full delivery address.');
        setActionPerform(false);
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
    setOrderTypeMain,
    setfilteredRestaurants,
    filteredRestaurants,
    loading,
    deliveryAddressString,
    setDeliveryAddressString,
    searchTextP,
  } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [searchText, setSearchText] = useState<string>();
  const [resturantOrderType, setresturantOrderType] = useState<string>();
  const [showNotFoundMessage, setShowNotFoundMessage] = useState(false);
  // const [filteredRestaurants, setfilteredRestaurants] =
  //   useState<ResponseRestaurant[]>();
  const [AllResturants, setAllResturants] = useState([]);
  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );

  const [showAllResturants, setShowAllResturants] = useState(false);

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    if (searchTextP == '') setValue('');
  }, [searchTextP]);

  useEffect(() => {
    if (!isDesktop) {
      setShowAllResturants(false);
    }
  }, [isDesktop]);

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

  useEffect(() => {
    setValue('');
    setSearchText('');
    setDeliveryRasturants([]);
    setfilteredRestaurants([]);
    setAllResturants([]);
    setDeliveryAddressString(null);
    setShowNotFoundMessage(false);
    setShowAllResturants(false);
    setOrderTypeMain(resturantOrderType);
  }, [resturantOrderType]);

  useEffect(() => {
    console.log('start------------>');
    console.log('filteredRestaurants', filteredRestaurants);
    console.log('AllResturants', AllResturants);
    console.log('deliveryRasturants', deliveryRasturants);
    console.log('end------------>');
  }, [filteredRestaurants, AllResturants, deliveryRasturants]);

  const [selectedStoreID, setSelectedStoreID] = useState('');

  useEffect(() => {
    setShowNotFoundMessage(false);
    if (isNearByRestaurantList && resturantOrderType != 'dispatch') {
      setfilteredRestaurants(restaurants);
    } else if (resturantOrderType == 'dispatch') {
      console.log('aosjdojasodj', deliveryRasturants);
      // setfilteredRestaurants(
      //   (deliveryRasturants &&
      //     deliveryRasturants.filter((x: any) => x.candeliver === false)) ||
      //     [],
      // );
      setfilteredRestaurants(
        deliveryRasturants && deliveryRasturants.length
          ? deliveryRasturants
          : [],
      );
    } else {
      // setfilteredRestaurants([]);
    }
  }, [isNearByRestaurantList, restaurants, deliveryRasturants]);

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
    setShowNotFoundMessage(false);
    if (resturantOrderType === 'dispatch') {
      // setfilteredRestaurants(
      //   (deliveryRasturants &&
      //     deliveryRasturants.filter((x: any) => x.candeliver === false)) ||
      //     [],
      // );
      setfilteredRestaurants(
        deliveryRasturants && deliveryRasturants.length
          ? deliveryRasturants
          : [],
      );
      return false;
    }
    setfilteredRestaurants(isNearByRestaurantList ? restaurants : []);
    // if (
    //   resturantOrderType && resturantOrderType !== '' &&
    //   !searchText
    // ) {
    //   console.log('empty')
    //   // dispatch(getResturantListRequest());
    //   return false;
    // }
    if (resturantOrderType) {
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
        } else if (resturantOrderType === 'dispatch') {
          updatedRestaurants = restaurants.filter(
            (x: any) => x.supportsdispatch === true,
          );
        }
        // setfilteredRestaurants(updatedRestaurants);
        if (updatedRestaurants.length > 0) {
          resultsFound = true;
        } else {
          setShowNotFoundMessage(true);
        }
      }
      let searchedRestaurant: ResponseRestaurant[] = [];
      if (searchText && searchText.trim() && searchText.length > 1) {
        TagManager.dataLayer({
          dataLayer: {
            event: 'vpv',
            virtualPagePath: searchText.trim().toLowerCase(),
          },
        });
        let searchTxt = searchText.trim().toLowerCase();
        // let zipCodeMatchedRestaurants = updatedRestaurants.filter(
        //   (x: any) => x.zip.toLowerCase() === searchTxt,
        // );
        // if (zipCodeMatchedRestaurants.length) {
        //   getNearByRestaurants(
        //     zipCodeMatchedRestaurants[0].latitude,
        //     zipCodeMatchedRestaurants[0].longitude,
        //   );
        //   // setShowNearBy(true)
        //   return false;
        // }
        if (!resultsFound) {
          setShowNotFoundMessage(true);
          setfilteredRestaurants([]);
          // updatedRestaurants = restaurants.filter(
          //   (x: any) => x.city.toLowerCase() == searchTxt,
          // );
          // if (updatedRestaurants.length === 0) {
          //   updatedRestaurants = restaurants.filter(
          //     (x: any) => x.zip.toLowerCase() == searchTxt,
          //   );
          // }
          // if (updatedRestaurants.length === 0) {
          //   updatedRestaurants = restaurants.filter(
          //     (x: any) => x.state.toLowerCase() == searchTxt,
          //   );
          // }
          // if (updatedRestaurants.length > 0) {
          //   setfilteredRestaurants(updatedRestaurants);
          // } else setShowNotFoundMessage(true);
        } else {
          searchedRestaurant = updatedRestaurants.filter(
            (x: any) => x.city.toLowerCase() == searchTxt,
          );
          // if (searchedRestaurant.length === 0) {
          //   searchedRestaurant = updatedRestaurants.filter(
          //     (x: any) => x.zip.toLowerCase() == searchTxt,
          //   );
          // }
          if (searchedRestaurant.length === 0) {
            searchedRestaurant = updatedRestaurants.filter(
              (x: any) => x.state.toLowerCase() == searchTxt,
            );
          }
          if (searchedRestaurant.length === 0) {
            // if (!hasNumber(searchTxt)) {
            getGeocode({ address: searchTxt })
              .then((results) => {
                getLatLng(results[0]).then(({ lat, lng }) => {
                  console.log('lat', lat);
                  console.log('lng', lng);
                  getNearByRestaurants(lat, lng);
                });
              })

              .catch((error) => {
                console.log('error zipcode', error);
                setShowNotFoundMessage(true);
              });
          }
          setfilteredRestaurants(
            searchedRestaurant.length > 0 ? searchedRestaurant : [],
          );
        }
      } else {
        setfilteredRestaurants(updatedRestaurants);
      }
    } else {
      if (!isNearByRestaurantList) {
        setShowNotFoundMessage(false);
        setfilteredRestaurants([]);
      }
      // if(updatedRestaurants && updatedRestaurants.length){
      //   setfilteredRestaurants(updatedRestaurants)
      // }
    }
  };

  // const getSearchResults = () => {
  //   setShowNotFoundMessage(false);
  //   if (resturantOrderType === 'delivery') {
  //     // setfilteredRestaurants(
  //     //   (deliveryRasturants &&
  //     //     deliveryRasturants.filter((x: any) => x.candeliver === false)) ||
  //     //     [],
  //     // );
  //     setfilteredRestaurants(
  //       deliveryRasturants && deliveryRasturants.length
  //         ? deliveryRasturants
  //         : [],
  //     );
  //     return false;
  //   }
  //   setfilteredRestaurants(isNearByRestaurantList ? restaurants : []);
  //   if (resturantOrderType || searchText) {
  //     console.log('searchtetx', searchText)
  //
  //     if (
  //       resturantOrderType === 'pickup' ||
  //       resturantOrderType === 'curbside'
  //     ) {
  //       if (searchText && searchText.trim() && searchText.length > 1) {
  //         let filterRestaurantOrderType = [];
  //         if (resturantOrderType === 'pickup') {
  //           filterRestaurantOrderType = restaurants.filter(
  //             (x: any) => x.canpickup === true,
  //           );
  //         } else if (resturantOrderType === 'curbside') {
  //           filterRestaurantOrderType = restaurants.filter(
  //             (x: any) => x.supportscurbside === true,
  //           );
  //         }
  //         let searchTxt = searchText.trim().toLowerCase();
  //         let zipCodeMatchedRestaurants = filterRestaurantOrderType.filter(
  //           (x: any) => x.zip.toLowerCase() === searchTxt,
  //         );
  //         console.log('zipCodeMatchedRestaurants', zipCodeMatchedRestaurants);
  //         if (zipCodeMatchedRestaurants.length) {
  //           getNearByRestaurants(
  //             zipCodeMatchedRestaurants[0].latitude,
  //             zipCodeMatchedRestaurants[0].longitude,
  //           );
  //           // setShowNearBy(true)
  //           return false;
  //         }
  //       }
  //     }
  //
  //     if (resturantOrderType && resturantOrderType !== '') {
  //       let updatedRestaurants = [];
  //       let resultsFound = false;
  //       if (resturantOrderType === 'pickup') {
  //         updatedRestaurants = restaurants.filter(
  //           (x: any) => x.canpickup === true,
  //         );
  //       } else if (resturantOrderType === 'curbside') {
  //         updatedRestaurants = restaurants.filter(
  //           (x: any) => x.supportscurbside === true,
  //         );
  //       }
  //       // else if (resturantOrderType === 'dispatch') {
  //       //   updatedRestaurants = restaurants.filter(
  //       //     (x: any) => x.candeliver === false,
  //       //   );
  //       // }
  //       setfilteredRestaurants(updatedRestaurants);
  //       if (updatedRestaurants.length > 0) {
  //         resultsFound = true;
  //       } else {
  //         setShowNotFoundMessage(true);
  //       }
  //     }
  //     let searchedRestaurant: ResponseRestaurant[] = [];
  //     if (searchText && searchText.trim() && searchText.length > 1) {
  //       let searchTxt = searchText.trim().toLowerCase();
  //       if (!resultsFound) {
  //         updatedRestaurants = restaurants.filter(
  //           (x: any) => x.city.toLowerCase() == searchTxt,
  //         );
  //         if (updatedRestaurants.length === 0) {
  //           updatedRestaurants = restaurants.filter(
  //             (x: any) => x.zip.toLowerCase() == searchTxt,
  //           );
  //         }
  //         if (updatedRestaurants.length === 0) {
  //           updatedRestaurants = restaurants.filter(
  //             (x: any) => x.state.toLowerCase() == searchTxt,
  //           );
  //         }
  //         if (updatedRestaurants.length > 0) {
  //           setfilteredRestaurants(updatedRestaurants);
  //         } else setShowNotFoundMessage(true);
  //       } else {
  //         searchedRestaurant = updatedRestaurants.filter(
  //           (x: any) => x.city.toLowerCase() == searchTxt,
  //         );
  //         if (searchedRestaurant.length === 0) {
  //           searchedRestaurant = updatedRestaurants.filter(
  //             (x: any) => x.zip.toLowerCase() == searchTxt,
  //           );
  //         }
  //         if (searchedRestaurant.length === 0) {
  //           searchedRestaurant = updatedRestaurants.filter(
  //             (x: any) => x.state.toLowerCase() == searchTxt,
  //           );
  //         }
  //         if (searchedRestaurant.length == 0) {
  //           setShowNotFoundMessage(true);
  //         }
  //         setfilteredRestaurants(
  //           searchedRestaurant.length > 0 ? searchedRestaurant : [],
  //         );
  //       }
  //     }
  //   } else {
  //     if (!isNearByRestaurantList) {
  //       setShowNotFoundMessage(false);
  //       setfilteredRestaurants([]);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (restaurants) {
  //     setShowAllResturants(false);
  //     getSearchResults();
  //   }
  // }, [resturantOrderType]);

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
                  role="radio"
                  value="Pick up"
                  onClick={() => {
                    setresturantOrderType(
                      resturantOrderType === 'pickup' ? undefined : 'pickup',
                    );
                  }}
                  className="selected-btn"
                  aria-current={alignment === 'Pick up' ? true : false}
                  aria-label="PickUp ,  Activating this element will cause results to load below "
                >
                  PickUp
                </ToggleButton>
                <ToggleButton
                  role="radio"
                  value="Curbside"
                  onClick={() =>
                    setresturantOrderType(
                      resturantOrderType === 'curbside'
                        ? undefined
                        : 'curbside',
                    )
                  }
                  className="selected-btn"
                  aria-current={alignment === 'Curbside' ? true : false}
                  aria-label=" Curbside ,  Activating this element will cause results to load below "
                >
                  Curbside
                </ToggleButton>
                <ToggleButton
                  value="Delivery"
                  role="radio"
                  onClick={() => {
                    setresturantOrderType(
                      resturantOrderType === 'dispatch'
                        ? undefined
                        : 'dispatch',
                    );
                  }}
                  className="selected-btn"
                  aria-current={alignment === 'Delivery' ? true : false}
                  aria-label=" Delivery , Enter your address below to get nearby restaurants"
                >
                  Delivery
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item xs={12} style={{ position: 'relative', zIndex: 1 }}>
              {resturantOrderType == 'dispatch' ? (
                <TextField
                  aria-label="Enter your delivery address"
                  label="Enter your delivery address"
                  title="Enter your delivery address"
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
              ) : resturantOrderType && resturantOrderType !== '' ? (
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
              ) : null}
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
                resturantOrderType !== 'dispatch' &&
                filteredRestaurants &&
                filteredRestaurants.length > 0) ||
                (!showAllResturants &&
                  resturantOrderType !== 'dispatch' &&
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
                      let updatedRestaurants = [];
                      if (resturantOrderType === 'pickup') {
                        updatedRestaurants = filteredRestaurants.filter(
                          (x: any) => x.canpickup === true,
                        );
                      } else if (resturantOrderType === 'curbside') {
                        updatedRestaurants = filteredRestaurants.filter(
                          (x: any) => x.supportscurbside === true,
                        );
                      } else if (resturantOrderType === 'dispatch') {
                        updatedRestaurants = filteredRestaurants.filter(
                          (x: any) => x.supportsdispatch === true,
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
                    resturantOrderType == 'dispatch')) && (
                  <>
                    <p style={{ paddingTop: '5px' }}>SELECT LOCATION</p>
                  </>
                )}
                {!isNearByRestaurantList &&
                  !showAllResturants &&
                  resturantOrderType === 'dispatch' &&
                  (filteredRestaurants == undefined ||
                    (filteredRestaurants &&
                      filteredRestaurants.length == 0)) && (
                    <Link
                      style={{
                        textAlign: 'left',
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
                        // setresturantOrderType(undefined);
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
