import StoreInfoBar from '../../components/store-info-bar';
import ProductListing from '../../components/product-listing';
import { Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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
  const classes = useStyles();
  const categoriesData = useSelector(
    (state: any) => state.categoriesData.categories,
  );
  const { id } = useParams();
  let selectedCategory = null;
  if (id) {
    selectedCategory = categoriesData.categories.find((obj: any) => {
      return obj.id == id;
    });
  }
  return (
    <Fragment>
      <StoreInfoBar />
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
            <ProductListing productList={selectedCategory.products} />
          </Grid>
        </Grid>
      )}
      <div style={{ paddingBottom: '30px' }}></div>
    </Fragment>
  );
};

export default CategoryDetail;
