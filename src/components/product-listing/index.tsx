import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    borderRadius: '10px',
  },
  title: {
    color: theme.palette.secondary.main,
    padding: '20px 0 5px 0',
    fontSize: '18px !important',
    fontWeight: '600 !important',
    fontFamily: 'Poppins-Medium !important',
  },
  content: {
    color: theme.palette.secondary.main,
    fontSize: '14px',
    lineHeight: '7px',
    fontFamily: 'Poppins-Medium !important',
    letterSpacing: 0,
  },
  cal: {
    paddingTop: '10px',
    fontFamily: 'Poppins-Bold !important',
    fontSize: '18px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  price: {
    paddingTop: '10px',
    fontFamily: 'Poppins-Bold !important',
    fontSize: '18px',
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },
}));

const ProductListing = () => {
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
  ];
  return (
    <Fragment>
      <Grid container spacing={3}>
        {products.map((item, index) => (
          <Grid
            scroll-id={'#panel-' + index}
            key={index}
            item
            xs={12}
            sm={6}
            md={3}
          >
            <Link
              to="/product"
              aria-label={item.name}
              style={{ textDecoration: 'none' }}
            >
              <Card elevation={0} style={{ borderRadius: 0 }}>
                <CardMedia
                  className={classes.img}
                  component="img"
                  image={item.image + ' image'}
                  alt={item.name}
                  title={item.name}
                />
                <CardContent sx={{ padding: '0' }}>
                  <Typography
                    variant="body1"
                    title={item.name}
                    className={classes.title}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    title={item.desc}
                    className={classes.content}
                  >
                    {item.desc}
                  </Typography>
                  <Grid container spacing={0}>
                    <Grid
                      item
                      xs={6}
                      title={`${item.cal} cal`}
                      className={classes.cal}
                    >
                      {item.cal} cal
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      title={`$${item.price}`}
                      className={classes.price}
                    >
                      ${item.price}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Fragment>
  );
};
export default ProductListing;
