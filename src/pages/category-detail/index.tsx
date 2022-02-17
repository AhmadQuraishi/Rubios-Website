import StoreInfoBar from '../../components/restaurant-info-bar';
import ProductListing from '../../components/product-listing';
import { Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCategoriesRequest } from '../../redux/actions/category';
import { Category } from '../../types/olo-api';
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
      paddingBottom: '30px',
      textDecoration: 'none',
    },
  },
}));

const CategoryDetail = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<Category>();

  const { categories, loading } = useSelector(
    (state: any) => state.categoryReducer,
  );
  useEffect(() => {
    if (loading == true) {
      setSelectedCategory(undefined);
    }
  }, [loading]);
  useEffect(() => {
    //TODO: StoreID will get from State when select store work will be done
    const storeID = 60854;
    dispatch(getCategoriesRequest(storeID));
  }, []);

  useEffect(() => {
    if (categories && categories.categories) {
      if (id) {
        const category = categories.categories.find((obj: Category) => {
          return obj.id.toString() == id;
        });
        setSelectedCategory(category);
      }
    }
  }, [categories]);

  return (
    <Fragment>
      <StoreInfoBar />
      {loading === true && selectedCategory === undefined && (
        <ProductListingSkeletonUI />
      )}
      {selectedCategory && (
        <Grid
          container
          spacing={0}
          sx={{ padding: { xs: '30px', md: '30px 80px 0px 80px' } }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              className={classes.heading}
              title={selectedCategory.name}
            >
              {selectedCategory.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
            <ProductListing
              productList={selectedCategory.products}
              categoryID={id}
            />
          </Grid>
        </Grid>
      )}
      <div style={{ paddingBottom: '30px' }}></div>
    </Fragment>
  );
};

export default CategoryDetail;
