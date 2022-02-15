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
import { Fragment, useEffect } from 'react';
import './index.css';
import { Product } from '../../types/olo-api';

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    borderRadius: '10px',
    display: 'block',
    width: '100%',
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

const ProductListing = (props: any) => {
  const classes = useStyles();
  const { productList, shownItemsCount, categoryID } = props;
  let products: [Product] = productList;
  if (shownItemsCount) {
    products = productList.slice(0, shownItemsCount);
  }
  return (
    <Fragment>
      <Grid container spacing={3}>
        {products.map((item: any, index: number) => (
          <Grid
            scroll-id={'#panel-' + index}
            key={index}
            item
            xs={12}
            sm={6}
            md={3}
          >
            <Link
              to={`/product/${categoryID}/${item.id}`}
              aria-label={item.name}
              style={{ textDecoration: 'none' }}
            >
              <Card elevation={0} style={{ borderRadius: 0 }}>
                {item.image ? (
                  <img
                    className={classes.img}
                    src={item.image}
                    alt={item.name}
                    title={item.name}
                  />
                ) : (
                  <img
                    className={classes.img}
                    src={require('../../assets/imgs/default_img.png')}
                    alt={item.name}
                    title={item.name}
                  />
                )}
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
                    title={item.description}
                    className={classes.content + ' fix-span'}
                  >
                    {item.description}
                  </Typography>
                  <Grid container spacing={0}>
                    <Grid
                      item
                      xs={6}
                      title={`${item.basecalories} cal`}
                      className={classes.cal}
                    >
                      {item.basecalories} cal
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      title={`$${parseFloat(item.cost).toFixed(2)}`}
                      className={classes.price}
                    >
                      ${parseFloat(item.cost).toFixed(2)}
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
