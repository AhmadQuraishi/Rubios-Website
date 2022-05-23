import StoreInfoBar from '../../../components/restaurant-info-bar';
import ProductListing from '../../../components/iframe/product-listing';
import { Grid, Theme, Typography, Tabs, Tab, Box } from '@mui/material';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../../redux/actions/category';
import { Category, ResponseMenu } from '../../../types/olo-api';
import ProductListingSkeletonUI from '../../../components/product-listing-skeleton-ui';
import { getResturantListRequest } from '../../../redux/actions/restaurant/list';
import { setResturantInfoRequest } from '../../../redux/actions/restaurant';
import { displayToast } from '../../../helpers/toast';

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

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

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
  const [restaurantSelected, setRestaurantSelected] = useState<any>();
  const [value, setValue] = useState(0);
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
    if (window.location.href.toLocaleLowerCase().indexOf('selection=1') != -1) {
      //if (providerToken && providerToken.first_name) {
      //navigate('/location');
      //} else {
      setGetResutrants(true);
      dispatch(getResturantListRequest());
      if (restaurant && restaurant.id) {
        dispatch(getCategoriesRequest(restaurant.id));
      }
      // }
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
      if (objRestaurant) {
        setRestaurantSelected(objRestaurant);
        setOpen(true);
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
      // let scrollValues: any[] = [];
      // setTimeout(() => {
      //   categories.categories.map((item: any, index: number) => {
      //     const elem: HTMLElement = document.getElementById(
      //       'cat-panel-' + index,
      //     ) as HTMLElement;
      //     if (document.getElementById('cat-panel-' + index)) {
      //       scrollValues.push({
      //         panel: elem,
      //         start: elem.offsetTop - 100,
      //         end: elem.offsetTop - 100 + elem.clientHeight,
      //         index: index,
      //       });
      //     }
      //   });
      // }, 500);
      //
      // window.addEventListener(
      //   'orientationchange',
      //   function () {
      //     scrollValues = [];
      //     categories.categories.map((item: any, index: number) => {
      //       const elem: HTMLElement = document.getElementById(
      //         'cat-panel-' + index,
      //       ) as HTMLElement;
      //       if (document.getElementById('cat-panel-' + index)) {
      //         scrollValues.push({
      //           panel: elem,
      //           start: elem.offsetTop - 100,
      //           end: elem.offsetTop - 100 + elem.clientHeight,
      //           index: index,
      //         });
      //       }
      //     });
      //   },
      //   false,
      // );
      //
      // // Listen for resize changes
      // window.addEventListener(
      //   'resize',
      //   function () {
      //     scrollValues = [];
      //     categories.categories.map((item: any, index: number) => {
      //       const elem: HTMLElement = document.getElementById(
      //         'cat-panel-' + index,
      //       ) as HTMLElement;
      //       if (document.getElementById('cat-panel-' + index)) {
      //         scrollValues.push({
      //           panel: elem,
      //           start: elem.offsetTop - 100,
      //           end: elem.offsetTop - 100 + elem.clientHeight,
      //           index: index,
      //         });
      //       }
      //     });
      //   },
      //   false,
      // );

      body.addEventListener('scroll', (e) => {
        e.preventDefault();
        var categoryPanel = document.getElementById('categoryMenu');
        var dummyCategoryPanel = document.getElementById('dummyCategoryPanel');

        //checkScrollIndex(scrollValues, window.scrollY);
        if (categoryPanel && dummyCategoryPanel) {
          if (window.scrollY > categoryPanel.offsetTop) {
            categoryPanel.style.position = 'fixed';
            // categoryPanel.style.top = '60px';
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [open, setOpen] = useState(true);
  return (
    <div style={{ minHeight: '500px' }}>
      {loading === true && <ProductListingSkeletonUI />}
      {categoriesWithProducts?.categories &&
        categoriesWithProducts?.categories.length > 0 && (
          <>
            {/*<div*/}
            {/*  style={{ display: 'none', height: '80px' }}*/}
            {/*  id="dummyCategoryPanel"*/}
            {/*></div>*/}
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
                      value={index}
                      label={item.name}
                      title={item.name}
                      color="secondary.main"
                      sx={{ fontFamily: 'Poppins-Medium !important' }}
                      role="link"
                      href={`#cat-panel-${index}`}
                      {...a11yProps(index)}
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
            <TabPanel value={value} index={index}>
              <Grid item xs={12} sx={{ paddingBottom: '20px' }} role="list">
                <ProductListing
                  productList={item.products}
                  categoryID={item.id}
                  imgPath={categoriesWithProducts.imagepath}
                  shownItemsCount={4}
                />
              </Grid>
            </TabPanel>
          ),
        )}
      <div style={{ paddingBottom: '30px' }}></div>
    </div>
  );
};

export default CategoryList;
