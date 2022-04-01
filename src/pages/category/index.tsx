import StoreInfoBar from '../../components/restaurant-info-bar';
import ProductListing from '../../components/product-listing';
import { Grid, Theme, Typography, Tabs, Tab, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../redux/actions/category';
import { Category, ResponseMenu } from '../../types/olo-api';
import ProductListingSkeletonUI from '../../components/product-listing-skeleton-ui';

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
  const classes = useStyles();
  const [value, setValue] = useState('0');
  const [categoryPanels, setCategoryPanels] = useState<{}[]>([]);
  const [categoriesWithProducts, setCategoriesWithProducts] =
    useState<ResponseMenu>();
  const { categories, loading, error } = useSelector(
    (state: any) => state.categoryReducer,
  );
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const body = document;

  useEffect(() => {
    console.log(categoryPanels);
  }, [categoryPanels]);

  useEffect(() => {
    if (restaurant === null) {
      navigate('/location');
    } else {
      dispatch(getCategoriesRequest(restaurant.id));
    }
  }, []);

  useEffect(() => {
    if (categories && categories.categories) {
      setCategoriesWithProducts(categories);
      // if (categories && categories.categories && categoryPanels.length == 0) {
      //   setCategoryPanels([]);
      //   categories.categories.map((item: any, index: number) => {
      //     setCategoryPanels((categoryPanels) => [
      //       ...categoryPanels,
      //       {
      //         panel: document.getElementById('#panel-' + index),
      //       },
      //     ]);
      //   });
      // }
      body.addEventListener('scroll', (e) => {
        e.preventDefault();
        var categoryPanel = document.getElementById('categoryMenu');
        var dummyCategoryPanel = document.getElementById('dummyCategoryPanel');
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTimeout(() => {
      var elem = document.getElementById('#panel-' + newValue);
      elem?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 700);
    setValue(newValue);
  };

  return (
    <div style={{ minHeight: '500px' }}>
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
                aria-label="Menu Tabs"
                variant="scrollable"
                scrollButtons
                allowScrollButtonsMobile
                sx={{ fontFamily: 'Poppins-Medium !important' }}
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
              <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
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
