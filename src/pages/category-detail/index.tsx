import StoreInfoBar from '../../components/store-info-bar';
import ProductListing from '../../components/product-listing';
import { Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment } from 'react';

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
        'https://www.rubios.com/sites/default/files/styles/menu_item_teaser/public/menu/Shirmp%20and%20Bacon%20Burrito%20-%201400x800%20-%20DD.jpg?itok=aNmnW-Q0',
      name: ' Warp Chicken Special Roll',
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
  ];
  return (
    <Fragment>
      <StoreInfoBar />
      <Grid
        container
        spacing={0}
        sx={{ padding: { xs: '30px', md: '30px 80px 0px 80px' } }}
      >
        <Grid item xs={12} md={6}>
          <Typography className={classes.heading} title="Seasonal Menu">
            Seasonal Menu
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
          <ProductListing productList={products} />
        </Grid>
      </Grid>
      <div style={{ paddingBottom: '30px' }}></div>
    </Fragment>
  );
};

export default CategoryDetail;
