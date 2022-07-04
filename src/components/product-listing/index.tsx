import { Grid, Typography, Card, CardContent, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import './index.css';
import { Product } from '../../types/olo-api';
import { changeImageSize, checkProductAvailability } from '../../helpers/common';

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    borderRadius: '10px',
    display: 'block',
    width: '100%',
  },
  title: {
    color: theme.palette.secondary.main,
    padding: '20px 0 10px 0',
    fontSize: '18px !important',
    fontWeight: '600 !important',
    fontFamily: 'Poppins-Medium !important',
    letterSpacing: '0.00938em !important',
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
    fontFamily: 'Poppins-Regular !important',
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  price: {
    paddingTop: '10px',
    fontFamily: 'Poppins-Regular !important',
    fontSize: '14px',
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },
}));

const ProductListing = (props: any) => {
  const classes = useStyles();
  const { productList, imgPath, orderType } = props;
  let products: [Product] = productList;


  return (
    <Fragment>
      <Grid container spacing={1}>
        {products.map(
          (item: any, index: number) =>
            checkProductAvailability(item, orderType) && (
              <Grid
                scroll-id={'#panel-' + index}
                key={index}
                item
                xs={12}
                sm={6}
                md={3}
              >
                <Grid
                  scroll-id={'#panel-' + index}
                  key={index}
                  style={{ padding: 10 }}
                >
                  <Link
                    to={`/product/${item.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Card
                      elevation={0}
                      style={{ borderRadius: 0 }}
                      role="group"
                      aria-label={item.name}
                    >
                      {item.imagefilename ? (
                        <img
                          className={classes.img}
                          alt=""
                          src={
                            imgPath +
                            changeImageSize(
                              item.imagefilename,
                              item.images,
                              'desktop-menu',
                            )
                          }
                          title={item.name}
                        />
                      ) : (
                        <img
                          className={classes.img}
                          alt=""
                          src={require('../../assets/imgs/default_img.png')}
                          title={item.name}
                        />
                      )}
                      <CardContent sx={{ padding: '0' }}>
                        <Typography
                          variant="h2"
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
                          {(item.basecalories > 0 || item.maxcalories > 0) && (
                            <Grid
                              item
                              xs={6}
                              title={`${
                                item.caloriesseparator
                                  ? item.basecalories +
                                    item.caloriesseparator +
                                    item.maxcalories
                                  : item.basecalories
                              } cal`}
                              className={classes.cal}
                            >
                              {item.caloriesseparator
                                ? item.basecalories +
                                  item.caloriesseparator +
                                  item.maxcalories
                                : item.basecalories}{' '}
                              cal
                            </Grid>
                          )}
                          {item.cost > 0 && (
                            <Grid
                              item
                              xs={6}
                              title={`$${parseFloat(item.cost).toFixed(2)}`}
                              className={classes.price}
                            >
                              ${parseFloat(item.cost).toFixed(2)}
                            </Grid>
                          )}
                        </Grid>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              </Grid>
            ),
        )}
      </Grid>
    </Fragment>
  );
};
export default ProductListing;
