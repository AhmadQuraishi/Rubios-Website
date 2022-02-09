import StoreInfoBar from '../../components/store-info-bar';
import ProductListing from '../../components/product-listing';
import { Grid, Theme, Typography, Tabs, Tab, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMenuRequest } from '../../redux/actions/menu';

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
  const menu = useSelector((state: any) => state.menuReducer.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    //TODO: StoreID will get from State when select store work will be done
    const storeID = 60854;
    dispatch(getMenuRequest(storeID));
  }, []);

  useEffect(() => {
    console.log(menu)
  }, [menu]);

  const products = [
    {
      image:
        'https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/TacoKit.jpg?itok=sXyv_fvV',
      name: ' California Burrito',
      desc: 'Salsa Verde Taco, Grilled Gourmet Toca and the Maxican street corn Taco all with your choice of sustainably sourced protien.',
      cal: '1000',
      price: '12.05',
    },
    {
      image:
        'https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/bowl-mahi-mahi.jpg?itok=yXA_BMpa',
      name: ' Grilled Chicken Salad Bowl',
      desc: 'Salsa Verde Taco, Grilled Gourmet Toca and the Maxican street corn Taco all with your choice of sustainably sourced protien.',
      cal: '1000',
      price: '12.05',
    },
    {
      image:
        'https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/Chicken_Nachos_V2.jpg?itok=JCQOjNiP',
      name: ' Classic Grilled Chicken Salad Platter',
      desc: 'Salsa Verde Taco, Grilled Gourmet Toca and the Maxican street corn Taco all with your choice of sustainably sourced protien.',
      cal: '1000',
      price: '12.05',
    },
    {
      image:
        'https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/Shirmp%20and%20Bacon%20Burrito%20-%201400x800%20-%20DD.jpg?itok=aNmnW-Q0',
      name: ' Warp Chicken Special Roll',
      desc: 'Salsa Verde Taco, Grilled Gourmet Toca and the Maxican street corn Taco all with your choice of sustainably sourced protien.',
      cal: '1000',
      price: '12.05',
    },
  ];

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
          {categories.map((item, index) => (
            <Tab
              key={item + index}
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
          sx={{ padding: { xs: '30px', sm: '30px 40px 0px 40px', lg: '30px 80px 0px 80px' } }}
        >
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} md={6}>
                <Typography className={classes.heading} title={item}>
                  {item}
                </Typography>
              </Grid>
              <Grid item md={6} sx={{ display: { xs: 'none', md: 'grid' } }}>
                <Typography className={classes.link}>
                  <Link to="/category" title="view all">
                    view all →
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
            <ProductListing productList={products} />
          </Grid>
        </Grid>
      ))}
      <div style={{ paddingBottom: '30px' }}></div>
    </Fragment>
  );
};

export default CategoryList;
