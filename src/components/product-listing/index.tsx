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

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    borderRadius: '10px',
  },
  title: {
    color: theme.palette.secondary.main,
    padding: '20px 0 10px 0',
    fontSize: '18px',
    fontWeight: 600,
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
      image: 'TacoKit.jpg',
      name: ' California Burrito',
      desc: 'Salsa Verde Taco, Grilled Gourmet Toca and the Maxican street corn Taco all with your choice of sustainably sourced protien.',
      cal: '1000',
      price: '12.05',
    },
    {
      image: '../../assets/imgs/taco-mango-mahi-mahi.jpg',
      name: ' Grilled Chicken Salad Bowl',
      desc: 'Salsa Verde Taco, Grilled Gourmet Toca and the Maxican street corn Taco all with your choice of sustainably sourced protien.',
      cal: '1000',
      price: '12.05',
    },
    {
      image: '../../assets/imgs/Family_Burrito_Box_mainA573LR.jpg',
      name: ' Classic Grilled Chicken Salad Platter',
      desc: 'Salsa Verde Taco, Grilled Gourmet Toca and the Maxican street corn Taco all with your choice of sustainably sourced protien.',
      cal: '1000',
      price: '12.05',
    },
    {
      image: '../../assets/imgs/taco-original-fish.jpg',
      name: ' Warp Chicken Special Roll',
      desc: 'Salsa Verde Taco, Grilled Gourmet Toca and the Maxican street corn Taco all with your choice of sustainably sourced protien.',
      cal: '1000',
      price: '12.05',
    },
  ];
  return (
    <>
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
            <Link to="/product" style={{ textDecoration: 'none' }}>
              <Card elevation={0} style={{ borderRadius: 0 }}>
                <CardMedia
                  className={classes.img}
                  component="img"
                  image={require('../../assets/imgs/taco-mango-mahi-mahi.jpg')}
                  alt="Taco Kit"
                />
                <CardContent sx={{ padding: '0' }}>
                  <Typography variant="body1" className={classes.title}>
                    {item.name}
                  </Typography>
                  <Typography variant="caption" className={classes.content}>
                    {item.desc}
                  </Typography>
                  <Grid container spacing={0}>
                    <Grid item xs={6} className={classes.cal}>
                      {item.cal} cal
                    </Grid>
                    <Grid item xs={6} className={classes.price}>
                      ${item.price}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default ProductListing;
