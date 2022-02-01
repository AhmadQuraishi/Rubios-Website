import StoreInfoBar from '../../components/store-info-bar';
import ProductListing from '../../components/product-listing';
import { Grid, Theme, Typography, Tabs, Tab, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Fragment, useState } from 'react';

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

const categories = [
  'Seasonal Menu',
  'Tacos',
  'Burritos',
  'Bowls & Salads',
  'Kids',
  'Drinks',
  'Dessert',
  'Sides & Extra',
];

const CategoryList = () => {
  const classes = useStyles();
  const [value, setValue] = useState('0');

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
      <Box
        sx={{
          width: '100%',
          padding: {
            xs: '30px 15px 10px 15px',
            md: '20px 60px 5px 60px',
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
          {categories.map((item, index) => (
            <Tab
              key={index}
              value={`${index}`}
              label={item}
              title={item}
              color="secondary.main"
              sx={{ fontFamily: 'Poppins-Medium !important' }}
            />
          ))}
        </Tabs>
      </Box>
      {categories.map((item, index) => (
        <Grid
          id={'#panel-' + index}
          key={index}
          container
          spacing={0}
          sx={{ padding: { xs: '30px', md: '30px 80px 0px 80px' } }}
        >
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography className={classes.heading}>{item}</Typography>
              </Grid>
              <Grid item md={6} sx={{ display: { xs: 'none', md: 'grid' } }}>
                <Typography className={classes.link}>
                  <Link to="/">view all →</Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
            <ProductListing />
          </Grid>
        </Grid>
      ))}
      <div style={{ paddingBottom: '30px' }}></div>
    </Fragment>
  );
};

export default CategoryList;
