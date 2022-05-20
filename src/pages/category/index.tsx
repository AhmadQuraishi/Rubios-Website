import StoreInfoBar from '../../components/restaurant-info-bar';
import ProductListing from '../../components/product-listing';
import {
  Grid,
  Theme,
  Typography,
  Tabs,
  Tab,
  Box,
  Modal,
  Button,
  Dialog,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../redux/actions/category';
import { Category, ResponseMenu } from '../../types/olo-api';
import ProductListingSkeletonUI from '../../components/product-listing-skeleton-ui';
import { getResturantListRequest } from '../../redux/actions/restaurant/list';
import { setResturantInfoRequest } from '../../redux/actions/restaurant';
import { displayToast } from '../../helpers/toast';

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontFamily: 'Poppins-Bold !important',
    color: theme.palette.secondary.main,
    fontSize: '25px !important',
    textTransform: 'uppercase',
    paddingBottom: '30px',
  },
  link: {
    textAlign: 'right',
    '& a': {
      fontFamily: 'Poppins-Medium !important',
      color: '#6AC0BD',
      fontSize: '13px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      paddingTop: '10px',
      display: 'block',
    },
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
  const [getResutarnts, setGetResutrants] = useState(false);
  const [getDineInResutarnts, setGetDineInResutarnts] = useState(false);
  const [restaurantSelected, setRestaurantSelected] = useState<any>();
  const [value, setValue] = useState('0');
  const { store } = useParams();
  const [categoriesWithProducts, setCategoriesWithProducts] =
    useState<ResponseMenu>();
  const { categories, loading, error } = useSelector(
    (state: any) => state.categoryReducer,
  );
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const objResturantsList = useSelector(
    (state: any) => state.restaurantListReducer,
  );
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const body = document;

  useEffect(() => {
    if (window.location.href.toLowerCase().indexOf('selection=1') != -1) {
      setGetResutrants(true);
      dispatch(getResturantListRequest());
      if (restaurant && restaurant.id) {
        dispatch(getCategoriesRequest(restaurant.id));
      }
    } else if (
      window.location.href.toLowerCase().indexOf('handoff=dinein') != -1
    ) {
      setGetDineInResutarnts(true);
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
  }, []);

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
      if (objRestaurant && getDineInResutarnts == false) {
        setRestaurantSelected(objRestaurant);
        setOpen(true);
      } else if (objRestaurant && getDineInResutarnts == true) {
        if (objRestaurant.supportsdinein) {
          dispatch(setResturantInfoRequest(objRestaurant, 'dine-in'));
          displayToast('SUCCESS', 'Location changed to ' + objRestaurant.name);
          navigate('/menu/' + objRestaurant.slug);
          dispatch(getCategoriesRequest(objRestaurant.id));
        } else {
          displayToast('ERROR', 'Dine-in is not available at this time.');
          navigate('/location');
        }
        setGetDineInResutarnts(false);
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
    if (categories && categories.categories) {
      setCategoriesWithProducts(categories);
      let scrollValues: any[] = [];
      setTimeout(() => {
        categories.categories.map((item: any, index: number) => {
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

      window.addEventListener(
        'orientationchange',
        function () {
          scrollValues = [];
          categories.categories.map((item: any, index: number) => {
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
          categories.categories.map((item: any, index: number) => {
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
    setTimeout(() => {
      var elem = document.getElementById('#panel-' + newValue);
      elem?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 700);
    setValue(newValue);
  };

  const [open, setOpen] = useState(true);

  const changeRestaurant = (orderType: string) => {
    dispatch(setResturantInfoRequest(restaurantSelected, orderType));
    displayToast('SUCCESS', 'Location changed to ' + restaurantSelected.name);
    setOpen(false);
    navigate('/menu/' + restaurantSelected.slug);
    dispatch(getCategoriesRequest(restaurantSelected.id));
  };
  return (
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
                fontFamily: 'Poppins-Bold',
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
                    fontFamily: "'Poppins-Medium', sans-serif !important;",
                    marginBottom: '10px',
                  }}
                  title="Checkout"
                  onClick={() => changeRestaurant('pickup')}
                >
                  Pickup
                </Button>
              )}
            </>
            {restaurantSelected.supportscurbside && (
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
                  fontFamily: "'Poppins-Medium', sans-serif !important;",
                  marginBottom: '10px',
                }}
                title="Checkout"
                onClick={() => changeRestaurant('curbside')}
              >
                Curbside
              </Button>
            )}
            {restaurantSelected.candeliver && (
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
                  fontFamily: "'Poppins-Medium', sans-serif !important;",
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
      {categoriesWithProducts?.categories &&
        categoriesWithProducts?.categories.length > 0 && (
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
                  xs: '20px 5px 10px 5px',
                  sm: '20px 30px 5px 30px',
                  lg: '20px 60px 5px 60px',
                  boxSizing: 'border-box',
                },
              }}
              id="categoryMenu"
            >
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="primary"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                sx={{ fontFamily: 'Poppins-Medium !important' }}
                role="region"
                aria-label="Food Menu"
              >
                {categoriesWithProducts?.categories.map(
                  (item: Category, index: number) => (
                    <Tab
                      key={item.id}
                      value={`${index}`}
                      label={item.name}
                      title={item.name}
                      color="secondary.main"
                      sx={{ fontFamily: 'Poppins-Medium !important' }}
                      tabIndex={0}
                      role="link"
                      href={`#cat-panel-${index}`}
                    />
                  ),
                )}
              </Tabs>
            </Box>
          </>
        )}
      {categoriesWithProducts?.categories &&
        categoriesWithProducts?.categories.length > 0 &&
        categoriesWithProducts?.categories.map(
          (item: Category, index: number) => (
            <Grid
              key={index}
              container
              spacing={0}
              id={`cat-panel-${index}`}
              sx={{
                padding: {
                  xs: '20px 20px 0px 20px',
                  sm: '30px 70px 0px 70px',
                  lg: '30px 100px 0px 100px',
                },
                position: 'relative',
              }}
            >
              <Grid item xs={12}>
                <div
                  id={'#panel-' + index}
                  style={{ position: 'absolute', top: '-120px' }}
                ></div>
                <Grid container>
                  <Grid item xs={item.products.length > 4 ? 8 : 12}>
                    <Typography className={classes.heading} title={item.name}>
                      {item.name}
                    </Typography>
                  </Grid>
                  {item.products.length > 4 && (
                    <Grid item xs={4}>
                      <Typography className={classes.link}>
                        <Link to={`/category/${item.id}`} title="view all">
                          view all →
                        </Link>
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }} role="list">
                <ProductListing
                  productList={item.products}
                  categoryID={item.id}
                  imgPath={categoriesWithProducts.imagepath}
                  shownItemsCount={4}
                />
              </Grid>
            </Grid>
          ),
        )}
      <div style={{ paddingBottom: '30px' }}></div>
    </div>
  );
};

export default CategoryList;
