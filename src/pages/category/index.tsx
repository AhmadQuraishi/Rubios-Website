import StoreInfoBar from '../../components/store-info-bar';
import ProductListing from '../../components/product-listing';
import { Grid, Theme, Typography, Tabs, Tab, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../redux/actions/category';
import LoadingBar from '../../components/loading-bar';

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
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
  const { categories, loading } = useSelector(
    (state: any) => state.categoryReducer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //TODO: StoreID will get from State when select store work will be done
    const storeID = 60854;
    dispatch(getCategoriesRequest(storeID));
  }, []);

  useEffect(() => {
    if (categories && categories.categories) {
      setCategoriesWithProducts(categories.categories);
    }
  }, [categories]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTimeout(() => {
      var elem = document.getElementById('#panel-' + newValue);
      elem?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 200);
    setValue(newValue);
  };

  return (
    <Fragment>
      <StoreInfoBar />
      {loading === true && categoriesWithProducts.length == 0 && <LoadingBar />}
      {categoriesWithProducts.length > 0 && (
        <Box
          sx={{
            width: '100%',
            padding: {
              xs: '20px 20px 10px 20px',
              sm: '20px 30px 5px 30px',
              lg: '20px 60px 5px 60px',
              boxSizing: 'border-box',
            },
          }}
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
            {categoriesWithProducts.map((item: any, index: number) => (
              <Tab
                key={item.id}
                value={`${index}`}
                label={item.name}
                title={item.name}
                color="secondary.main"
                sx={{ fontFamily: 'Poppins-Medium !important' }}
              />
            ))}
          </Tabs>
        </Box>
      )}
      {categoriesWithProducts.length > 0 &&
        categoriesWithProducts.map((item: any, index: number) => (
          <Grid
            id={'#panel-' + index}
            key={index}
            container
            spacing={0}
            sx={{
              padding: {
                xs: '20px',
                sm: '30px 40px 0px 40px',
                lg: '30px 80px 0px 80px',
              },
            }}
          >
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography className={classes.heading} title={item.name}>
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography className={classes.link}>
                    <Link to={`/category/${item.id}`} title="view all">
                      view all →
                    </Link>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
              <ProductListing productList={item.products} shownItems={4} />
            </Grid>
          </Grid>
        ))}
      <div style={{ paddingBottom: '30px' }}></div>
    </Fragment>
  );
};

export default CategoryList;
