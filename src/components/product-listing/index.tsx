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

const ProductListing = (props: any) => {
  const classes = useStyles();
  const { productList } = props;
  return (
    <Fragment>
      <Grid container spacing={3}>
        {productList.map((item: any, index: number) => (
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
