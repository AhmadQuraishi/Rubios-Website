import StoreInfoBar from '../../components/restaurant-info-bar';
import ProductListing from '../../components/product-listing';
import { Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoriesRequest } from '../../redux/actions/category';
import { Category } from '../../types/olo-api';
import ProductListingSkeletonUI from '../../components/product-listing-skeleton-ui';
import { displayToast } from '../../helpers/toast';
import Page from '../../components/page-title';

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontFamily: "'sunbornsans_one' !important",
    color: theme.palette.secondary.main,
    fontSize: '25px !important',
    textTransform: 'uppercase',
    paddingBottom: '30px',
  },
  link: {
    textAlign: 'right',
    '& a': {
      fontFamily: "'grit_sansbold' !important",
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
  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  useEffect(() => {
    if (loading == true) {
      setSelectedCategory(undefined);
    }
  }, [loading]);

  const navigate = useNavigate();
  useEffect(() => {
    if (restaurant === null) {
      navigate('/location');
    } else {
      dispatch(getCategoriesRequest(restaurant.id));
    }
  }, []);

  const [filterCategories, setFilterCategories] = useState<any[]>([]);

  useEffect(() => {
    if (categories && categories.categories) {
      if (id) {
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
        const category = arrCat.find((obj: Category) => {
          return obj.id.toString() == id;
        });
        if (category) {
          setSelectedCategory(category);
        } else {
          displayToast('ERROR', "Selected category doesn't exist");
          navigate('/location');
        }
      }
    }
  }, [categories]);

  return (
    <Page title={'Menu Detail'} className="">
      <div style={{ minHeight: '500px' }}>
        <StoreInfoBar />
        {loading === true && selectedCategory === undefined && (
          <ProductListingSkeletonUI />
        )}
        {selectedCategory && (
          <Grid
            container
            spacing={0}
            sx={{ padding: { xs: '20px', md: '30px 80px 0px 80px' } }}
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
                categoryName={selectedCategory.name}
                imgPath={(categories && categories.imagepath) || ''}
                orderType={orderType}
              />
            </Grid>
          </Grid>
        )}
        <div style={{ paddingBottom: '30px' }}></div>
      </div>
    </Page>
  );
};

export default CategoryDetail;
