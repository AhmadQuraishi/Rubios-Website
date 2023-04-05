import StoreInfoBar from '../../components/restaurant-info-bar';
import ProductListingCarousel from '../../components/product-listing-carousel';
import {
  Grid,
  Theme,
  Typography,
  Tabs,
  Tab,
  Box,
  Modal,
  Divider,
  Button,
  Dialog,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { RefObject, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../redux/actions/category';
import { Category, ResponseMenu } from '../../types/olo-api';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';
import ProductListingSkeletonUI from '../../components/product-listing-skeleton-ui';
import { getResturantListRequest } from '../../redux/actions/restaurant/list';
import { setResturantInfoRequest } from '../../redux/actions/restaurant';
import { displayToast } from '../../helpers/toast';
import { capitalizeFirstLetter } from '../../helpers/common';
import Page from '../../components/page-title';
import { facebookSendEvent } from '../../redux/actions/facebook-conversion';
import { facebookConversionTypes } from '../../redux/types/facebook-conversion';
import { resetBasketRequest } from '../../redux/actions/basket';
import { isLoginUser } from '../../helpers/auth';
import "./index.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontFamily: "'Sunborn-Sansone'!important",
    // color: "#0075BF !important",
    fontSize: '25px !important',
    textTransform: 'uppercase',
    paddingBottom: '30px',
    letterSpacing: '0.04833em !important',
  },

  link: {
    textAlign: 'right',
    '& a': {
      fontFamily: "'GritSans-Bold' !important",
      color: '#0069aa',
      fontSize: '13px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      // paddingTop: '10px',
      display: 'block',
    },
  },
  link2: {
      fontSize: '13px !important',
      color: '#062c43',
      fontFamily:"'Sunborn-Sansone' !important",
  },
}));

const CategoryList = () => {
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    maxWidth: 400,
    background: '#FFF',
    border: '1px solid #FFF',
  };
  const classes = useStyles();
  const theme = useTheme();
  const query = new URLSearchParams(useLocation().search);
  const handoff: any = query.get('handoff') || '';
  const [getResutarnts, setGetResutrants] = useState(false);
  const [getDineInResutarnts, setGetDineInResutarnts] = useState('');
  const [restaurantSelected, setRestaurantSelected] = useState<any>();
  const [value, setValue] = useState('0');
  const { store } = useParams();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showAll, setShowAll] = useState<ShowAll>({});
  const [categoriesWithProducts, setCategoriesWithProducts] =
    useState<ResponseMenu>();
    const myRef: RefObject<HTMLElement> = useRef(null);
    
  const { categories, loading, error } = useSelector(
    (state: any) => state.categoryReducer,
  );
  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const objResturantsList = useSelector(
    (state: any) => state.restaurantListReducer,
  );
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const basketObj = useSelector((state: any) => state.basketReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const body = document;
  const [filterCategories, setFilterCategories] = useState<any[]>([]);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // const handleViewClick = () => {
  //   if (showMore) {
  //     window.scrollTo({ top: prevScrollPos, behavior: 'smooth' });
  //     setShowMore(false);
  //   } else {
  //     setPrevScrollPos(window.pageYOffset);
  //     setShowMore(true);
  //     if (myRef.current) {
  //       myRef.current.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      const categoryElements = filterCategories.map((category : any, index : any) =>
        document.getElementById(`cat-panel-${index}`)
      );
      const activeCategoryIndex = categoryElements.findIndex((el: any) =>
        el.getBoundingClientRect().top >= 0
      );
      setValue(`${activeCategoryIndex}`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filterCategories]);


  const handleViewMore = (categoryIndex: any) => {
    if (showAll[categoryIndex]) {
      // window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowAll({ ...showAll, [categoryIndex]: false });
      const categoryElement = document.getElementById(`cat-${categoryIndex}`);
      console.log("categoryIndex Element ",categoryIndex)
      console.log("category Element ",categoryElement)
      if (categoryElement) {
        categoryElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Expand the category
      setShowAll({ ...showAll, [categoryIndex]: true });

    }
    // debugger;
  };
  type ShowAll = {
    [categoryIndex: number]: boolean;
  }
  useEffect(() => {
    if (window.location.href.toLowerCase().indexOf('selection=1') != -1) {
      setGetResutrants(true);
      dispatch(getResturantListRequest());
      if (restaurant && restaurant.id) {
        setFilterCategories([]);
        dispatch(getCategoriesRequest(restaurant.id));
      }
    } else {
      // @ts-ignore
      if (
        handoff &&
        handoff !== DeliveryModeEnum.curbside &&
        Object.values(DeliveryModeEnum).includes(handoff)
      ) {
        setGetDineInResutarnts(handoff);
        setGetResutrants(true);
        dispatch(getResturantListRequest());
        if (restaurant && restaurant.id) {
          dispatch(getCategoriesRequest(restaurant.id));
        }
      } else {
        if (restaurant === null) {
          navigate('/location');
        } else {
          dispatch(getCategoriesRequest(restaurant.id));
        }
      }
    }
    window.scrollTo(0, 0);
  }, []);

  const checkRestaurantHandOffAvailability = (
    restaurant: any,
    handoff: string,
  ) => {
    switch (handoff) {
      case DeliveryModeEnum.dinein:
        return restaurant.supportsdinein;
      case DeliveryModeEnum.pickup:
        return restaurant.canpickup;
      case DeliveryModeEnum.curbside:
        return restaurant.supportscurbside;
      case DeliveryModeEnum.dispatch:
        return restaurant.supportsdispatch;
      default:
        return false;
    }
  };

  useEffect(() => {
    if (
      getResutarnts &&
      objResturantsList.restaurants &&
      objResturantsList.restaurants.restaurants &&
      objResturantsList.restaurants.restaurants.length > 0 &&
      store
    ) {
      const restaurants = objResturantsList.restaurants.restaurants;
      const objRestaurant = restaurants.find(
        (x: any) => x.slug.toLowerCase() == store.toLowerCase(),
      );
      if (objRestaurant && getDineInResutarnts === '') {
        setRestaurantSelected(objRestaurant);
        setOpen(true);
      } else if (objRestaurant && getDineInResutarnts !== '') {
        if (
          handoff &&
          checkRestaurantHandOffAvailability(objRestaurant, handoff)
        ) {
          dispatch(setResturantInfoRequest(objRestaurant, handoff));
          dispatch(resetBasketRequest());
          // if (basketObj && basketObj.basket) {

          // displayToast(
          //   'SUCCESS',
          //   'Location changed to ' +
          //     objRestaurant.name +
          //     ' and basket is empty',
          // );
          // } else {
          displayToast('SUCCESS', 'Location changed to ' + objRestaurant.name);
          // }
          // navigate('/menu/' + objRestaurant.slug);
          dispatch(getCategoriesRequest(objRestaurant.id));
        } else {
          displayToast(
            'ERROR',
            `${capitalizeFirstLetter(handoff)} is not available at this time.`,
          );
          navigate('/location');
        }
        setGetDineInResutarnts('');
      } else {
        displayToast(
          'ERROR',
          'Your restaurant does not exist, Please search your restaurant here',
        );
        navigate('/location');
      }
      setGetResutrants(false);
    }
  }, [objResturantsList]);



  useEffect(() => {
    setFilterCategories([]);
    if (categories && categories.categories) {
      let arrCat: any[] = [];
      let products: any[] = [];
      categories.categories.map((cat: any) => {
        products = [];
        let fCount = 0;
        const pCount = cat.products.length;
        cat.products.map((pItem: any) => {
          if (pItem.unavailablehandoffmodes.includes(orderType)) {
            fCount++;
          } else {
            products.push(pItem);
          }
        });
        if (pCount != fCount) {
          let catF = cat;
          catF.products = products;
          arrCat.push(catF);
        }
      });
      setFilterCategories(arrCat);
      setCategoriesWithProducts(categories);
      let scrollValues: any[] = [];
      setTimeout(() => {
        try {
          const arrowButtons: any = document.getElementsByClassName(
            'MuiTabScrollButton-horizontal',
          );
          arrowButtons[0].setAttribute('role', 'tab');
          arrowButtons[0].setAttribute('tabindex', '0');
          arrowButtons[0].setAttribute('aria-label', 'previous');
          arrowButtons[1].setAttribute('role', 'tab');
          arrowButtons[1].setAttribute('tabindex', '0');
          arrowButtons[1].setAttribute('aria-label', 'next');
        } catch (e) { }

        filterCategories.map((item: any, index: number) => {
          const elem: HTMLElement = document.getElementById(
            'cat-panel-' + index,
          ) as HTMLElement;
          if (document.getElementById('cat-panel-' + index)) {
            scrollValues.push({
              panel: elem,
              start: elem.offsetTop - 100,
              end: elem.offsetTop - 100 + elem.clientHeight,
              index: index,
            });
          }
        });
      }, 500);
      window.scrollTo(0, 0);
      window.addEventListener(
        'orientationchange',
        function () {
          scrollValues = [];
          filterCategories.map((item: any, index: number) => {
            const elem: HTMLElement = document.getElementById(
              'cat-panel-' + index,
            ) as HTMLElement;
            if (document.getElementById('cat-panel-' + index)) {
              scrollValues.push({
                panel: elem,
                start: elem.offsetTop - 100,
                end: elem.offsetTop - 100 + elem.clientHeight,
                index: index,
              });
            }
          });
        },
        false,
      );

      // Listen for resize changes
      window.addEventListener(
        'resize',
        function () {
          scrollValues = [];
          filterCategories.map((item: any, index: number) => {
            const elem: HTMLElement = document.getElementById(
              'cat-panel-' + index,
            ) as HTMLElement;
            if (document.getElementById('cat-panel-' + index)) {
              scrollValues.push({
                panel: elem,
                start: elem.offsetTop - 100,
                end: elem.offsetTop - 100 + elem.clientHeight,
                index: index,
              });
            }
          });
        },
        false,
      );

      body.addEventListener('scroll', (e) => {
        e.preventDefault();
        var categoryPanel = document.getElementById('categoryMenu');
        var dummyCategoryPanel = document.getElementById('dummyCategoryPanel');

        //checkScrollIndex(scrollValues, window.scrollY);
        if (categoryPanel && dummyCategoryPanel) {
          if (window.scrollY > categoryPanel.offsetTop) {
            categoryPanel.style.position = 'fixed';
            categoryPanel.style.top = '60px';
            dummyCategoryPanel.style.display = 'block';
          } else {
            categoryPanel.style.position = 'relative';
            categoryPanel.style.top = '0px';
            dummyCategoryPanel.style.display = 'none';
          }
        }
      });
    }
  }, [categories]);

  const checkScrollIndex = (scrollValues: any[], scrollValue: number) => {
    const val: any = scrollValues.find(
      (x: any) => x.start < scrollValue && x.end > scrollValue,
    );
    if (val) {
      if (value != val.index) setValue(val.index.toString() || '0');
    } else {
      setValue('0');
    }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    triggerFacebookEventOnViewContent();
    setTimeout(() => {
      var elem = document.getElementById('#panel-' + newValue);
      elem?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 700);
    setValue(newValue);
  };

  const [open, setOpen] = useState(true);

  const changeRestaurant = (orderType: string) => {
    dispatch(setResturantInfoRequest(restaurantSelected, orderType));
    if (basketObj && basketObj.basket) {
      displayToast(
        'SUCCESS',
        'Location changed to ' +
        restaurantSelected.name +
        ' and basket is empty',
      );
    } else {
      displayToast('SUCCESS', 'Location changed to ' + restaurantSelected.name);
    }
    setOpen(false);
    navigate('/menu/' + restaurantSelected.slug);
    dispatch(getCategoriesRequest(restaurantSelected.id));
  };

  const triggerFacebookEventOnViewContent = () => {
    let userObj: any = null;
    if (isLoginUser()) {
      userObj = {
        first_name: providerToken.first_name || '',
        last_name: providerToken.last_name || '',
        email: providerToken.email || '',
        phone: providerToken.phone || '',
      };
    }
    dispatch(
      facebookSendEvent(
        facebookConversionTypes.FACEBOOK_VIEW_CONTENT_EVENT,
        userObj,
        null,
      ),
    );
  };
  return (
    <Page title={'Menu'} description={'Satisfy your cravings for Baja-inspired, Mexican flavors.'} className="">
      <div style={{ minHeight: '500px' }}>
        <Typography variant="h1" className="sr-only">
          Main Menu
        </Typography>
        {getResutarnts && (
          <div
            style={{
              display: 'flex',
              width: '100%',
              top: 0,
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(0,0,0,0.2)',
              position: 'fixed',
              height: '100%',
              zIndex: 1000000,
            }}
          >
            <CircularProgress />
          </div>
        )}
        {restaurantSelected && (
          <Dialog
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ border: '0' }}
            TransitionProps={{
              role: 'dialog',
              'aria-modal': 'true',
              'aria-label': 'Please Choose Order Type',
            }}
          >
            <div
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#FFF',
                padding: '30px',
                textAlign: 'center',
                width: '75%',
                maxWidth: '400px',
                border: '0px solid #FFF',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontSize: '16px',
                  fontWeight: '700',
                  fontFamily: "'Sunborn-Sansone' !important",
                  textTransform: 'uppercase',
                }}
              >
                Please Choose Order Type
              </Typography>
              <br />
              <>
                {restaurantSelected.canpickup && (
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: 'uppercase',
                      backgroundColor: '#5FA625',
                      margin: 'auto',
                      width: '100%',
                      borderRadius: 0,
                      padding: '30px 10px',
                      fontSize: '16px',
                      fontFamily: "'GritSans-Bold' !important",
                      marginBottom: '10px',
                    }}
                    title="Checkout"
                    onClick={() => changeRestaurant('pickup')}
                  >
                    Pickup
                  </Button>
                )}
              </>
              {/* {restaurantSelected.supportscurbside && (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'uppercase',
                    backgroundColor: '#5FA625',
                    margin: 'auto',
                    width: '100%',
                    borderRadius: 0,
                    padding: '30px 10px',
                    fontSize: '16px',
                    fontFamily: "'GritSans-Bold' !important",
                    marginBottom: '10px',
                  }}
                  title="Checkout"
                  onClick={() => changeRestaurant('curbside')}
                >
                  Curbside
                </Button>
              )} */}
              {restaurantSelected.supportsdispatch && (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: 'uppercase',
                    backgroundColor: '#5FA625',
                    margin: 'auto',
                    width: '100%',
                    borderRadius: 0,
                    padding: '30px 10px',
                    fontSize: '16px',
                    fontFamily: "'GritSans-Bold' !important",

                  }}
                  title="Checkout"
                  onClick={() => changeRestaurant('delivery')}
                >
                  Delivery
                </Button>
              )}
            </div>
          </Dialog>
        )}
        <StoreInfoBar />
        {loading === true && <ProductListingSkeletonUI />}
        {loading == false && filterCategories && filterCategories.length > 0 && (
          <>
            <div
              style={{ display: 'none', height: '80px' }}
              id="dummyCategoryPanel"
            ></div>
            <Box
              sx={{
                width: '100%',
                background: '#FFF',
                zIndex: '1099',

                padding: {
                  xs: '20px 5px 10px 20px',
                  sm: '20px 30px 5px 40px',
                  lg: '20px 60px 5px 100px',
                  boxSizing: 'border-box',
                },
              }}
              id="categoryMenu"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                // textColor="secondary"
                // indicatorColor="primary"
                variant="scrollable"
                //scrollButtons
                // allowScrollButtonsMobile
                
                sx={{ fontFamily: "'Sunborn-Sansone' !important", }}
                role="region"
                aria-label="Food Menu"
              >
                {filterCategories.map((item: Category, index: number) => (
                  <Tab
                    key={item.id}
                    className="food-menu--link"
                    value={`${index}`}
                    label={item.name}
                    title={item.name}

                    sx={{
                      fontFamily: "'Sunborn-Sansone' !important",
                      padding: '10px 0px',
                      marginRight: '20px',
                      fontSize: "15px",
                      color: "#224c65 !important"

                    }}
                    tabIndex={0}
                    role="tab"
                    href={`#cat-panel-${index}`}
                  />
                ))}
              </Tabs>
            </Box>
          </>
        )}
        {filterCategories &&
          filterCategories.length > 0 &&
          filterCategories.map((item: Category, index: number) => (
            <Grid
              key={index}
              container
              spacing={0}
              id={`cat-panel-${index}`}
              sx={{
                padding: {
                  xs: '20px 20px 0px 20px',
                  sm: '30px 40px 0px 40px',
                  lg: '30px 100px 0px 100px',
                },
                position: 'relative',
              }}
            >
              <Grid item xs={12} >
                <div
                  id={'#panel-' + index}
                  style={{ position: 'absolute', top: '-120px' }}
                ></div>
                <Grid container sx={{ alignItems: "center" }}>
                  <Grid item xs={12} sm={item.products.length > 4 ? 8 : 8}>
                  <div id ={`cat-${item.id}`}> </div>
                    <Typography
                      variant="h2"
                      sx={{
                        color: { xs: '#062c43 ', sm: '#224c65' },
                        display: { xs: 'flex', },
                        justifyContent: { xs: 'center', sm: 'left' }
                      }}
                      className={`${classes.heading} rubios-menu-category`}
                      title={item.name}
                    >
                      {item.name}
                    </Typography>
                  </Grid>

                  {item.products.length > 4 && (
                    <Grid item xs={4} sx={{ padding: "0px 0px 35px 0px", display: { xs: 'none', sm: 'block' } }}>
                      <Typography className={classes.link}>
                        <Link to={`/category/${item.id}`} title="view all" style={{ color: "#062C43" }}>
                          view all <span style={{ fontSize: "17px" }}><img
                            // style={{ width: '75%', display: 'block' }}
                            src={require('../../assets/imgs/arrow2.png')}
                            alt="Login Icon"
                          /></span>
                        </Link>
                      </Typography>
                    </Grid>
                  )}
                  {/* {item.name === "DRINKS"  &&(
                    <Grid item xs={4} sx={{padding: "0px 0px 35px 0px"}}>
                      <Typography className={classes.link}>
                        <Link to={`/category/${item.id}`} title="view all" style={{color: "#062C43"}}>
                          view all <span style={{fontSize:"17px"}}><img
                        // style={{ width: '75%', display: 'block' }}
                        src={require('../../assets/imgs/arrow2.png')}
                        alt="Login Icon"
                      /></span>
                        </Link>
                      </Typography>
                    </Grid>
                  )} */}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }} role="list">
                <ProductListingCarousel
                  orderType={orderType}
                  index={Math.random()}
                  productList = {isMobile ? (showAll[item.id] ? item.products : item.products.slice(0,4)) : item.products}
                  categoryID={item.id}
                  categoryName={item.name}
                  imgPath={
                    categoriesWithProducts && categoriesWithProducts?.imagepath
                  }
                  shownItemsCount={4}
                />
              </Grid>
              {item.products.length > 4
                &&
                <a  
                style={{display: "contents"}}
                id={`view-${item.id}`}
                >

                <Grid
                
              
                  sx={{marginTop: '4px',display: {xs: 'block',sm: 'none',md: 'none',lg: 'none',},}}
                    onClick={() => handleViewMore(item.id)}
                  item
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    justifyContent: 'center',
                  }}
                  role={'button'}
                  tabIndex={0}
                  // title={`${showAll[index] ? 'Hide' : 'View'} Details`}
                  
                  onKeyPress={(e: any) => {
                    if (e.key === 'Enter') {
                      handleViewMore(item.id)
                    }
                  }}
                  xs={12}
                >
                  <Typography
                    variant="h2"
                    className={classes.link2}
                    key={item.id}
                    sx={{
                      fontSize: '18px !important',
                      color: '#062c43',
                      // display: 'inline',
                      display: {
                        xs: 'block',
                        sm: 'none',
                        md: 'none',
                        lg: 'none',
                      },
                    }}
                  >
                    VIEW {showAll[item.id] ? 'LESS' : 'MORE'}
                  </Typography>
                  {showAll[item.id] ? (
                    <ExpandLessIcon
                      sx={{
                        marginLeft: '10px',
                        display: {
                          xs: 'block',
                          sm: 'none',
                          md: 'none',
                          lg: 'none',
                        },
                      }}
                      style={{ color: '#0075bf', }}
                    />
                  ) : (
                    <ExpandMoreIcon
                      sx={{
                        marginLeft: '10px',
                        display: {
                          xs: 'block',
                          sm: 'none',
                          md: 'none',
                          lg: 'none',
                        },
                      }}
                      style={{ color: '#0075bf' }}
                    />
                  )}
                </Grid>
                </a>
              }
            </Grid>
          ))}
        <Grid
          sx={{
            padding: {
              xs: '20px 20px 0px 20px',
              sm: '30px 70px 0px 70px',
              lg: '0px 110px 0px 110px',
            },
            position: 'relative',
          }}
        >
          <Grid item xs={12} sx={{ padding: '0px 0px 35px' }}>
            <Divider sx={{ borderColor: '#224c65' }} />
          </Grid>
          <Typography
            sx={{ fontSize: '13px', color: '#062C43', fontStyle: 'italic', }}
            variant="caption"
            title="Due to potential cross-contact when preparing menu items, it is not possible to guarantee your meal is completely free of any particular allergen or ingredient. Impossible™ meat, fish, tortillas, veggies, toasted cheese and shellfish are cooked on the same grill."
          >
            Due to potential cross-contact when preparing menu items, it is not
            possible to guarantee your meal is completely free of any particular
            allergen or ingredient. Impossible™ meat, fish, tortillas, veggies,
            toasted cheese and shellfish are cooked on the same grill.
          </Typography>
        </Grid>
        <div style={{ paddingBottom: '40px' }}></div>
      </div>
    </Page>
  );
};

export default CategoryList;