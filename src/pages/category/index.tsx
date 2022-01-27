import StoreInfoBar from '../../components/store-info-bar';
import ProductListing from '../../components/product-listing';
import {
  Grid,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontFamily: 'Poppins-Bold !important',
    color: theme.palette.secondary.main,
    fontSize: '25px',
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
  const theme = useTheme();
  const classes = useStyles();
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const [value, setValue] = useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <StoreInfoBar />
      <Box
        sx={{
          width: '100%',
          display: { xs: 'none', lg: 'flex' },
          padding: {
            xs: '30px',
            md: '20px 80px 5px 80px',
            boxSizing: 'border-box',
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          sx={{ fontFamily: 'Poppins-Medium !important' }}
        >
          <Tab
            value="1"
            label="Seasonal Menu"
            color="secondary.main"
            sx={{ fontFamily: 'Poppins-Medium !important' }}
          />
          <Tab
            value="2"
            label="Tacos"
            color="secondary.main"
            sx={{ fontFamily: 'Poppins-Medium !important' }}
          />
          <Tab
            value="3"
            label="Burritos"
            color="secondary.main"
            sx={{ fontFamily: 'Poppins-Medium !important' }}
          />
          <Tab
            value="4"
            label="Bowl & Salads"
            color="secondary.main"
            sx={{ fontFamily: 'Poppins-Medium !important' }}
          />
        </Tabs>
      </Box>
      {categories.map((item, index) => (
        <Grid
          data-id={'#panel-' + index}
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
    </>
  );
};

export default CategoryList;
