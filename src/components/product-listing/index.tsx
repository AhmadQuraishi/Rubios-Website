import { Grid, Typography, Card, CardContent, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import './index.css';
import { Product } from '../../types/olo-api';
import {
  changeImageSize,
  checkFeaturedProduct,
  checkProductAvailability,
} from '../../helpers/common';

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    borderRadius: '10px',
    display: 'block',
    width: '100%',
  },
  title: {
    color: '#0075BF',
    padding: '20px 0 10px 0',
    fontSize: '16px !important',
    fontWeight: '600 !important',
    fontFamily: "'grit_sansbold' !important",
    letterSpacing: '0.00938em !important',
    textTransform: "uppercase",
  },
  content: {
    color: theme.palette.secondary.main,
    fontSize: '13px !important',
    lineHeight: '7px',
    fontFamily: "'Libre Franklin' !important",
    letterSpacing: 0,
  },
  cal: {
    paddingTop: '10px',
    fontFamily: "'Libre Franklin' !important",
    fontSize: '14px',
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  price: {
    paddingTop: '10px',
    fontFamily: "'Libre Franklin' !important",
    fontSize: '14px',
    color: '#0075BF',
    fontWeight: "bold",
  },
}));

const ProductListing = (props: any) => {
  const classes = useStyles();
  const { productList, imgPath, orderType, categoryName } = props;
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
                  id="foodmenuproduct"
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
                      style={{ borderRadius: 0, position: 'relative' }}
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
                              process.env.REACT_APP_NODE_ENV === 'production'
                                ? 'marketplace-product'
                                : 'desktop-menu',
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
                      {checkFeaturedProduct(item, categoryName) && (
                        <Typography
                          variant="h2"
                          title={'FEATURED'}
                          className="product-label"
                          style={{ left: 0, top: 10 }}
                        >
                          FEATURED
                        </Typography>
                      )}
                      <CardContent sx={{ padding: '0' }}>
                        <Typography
                          variant="h2"
                          title={item.name}
                          className={classes.title}
                          dangerouslySetInnerHTML={{__html: item?.name?.includes("®") ? item.name.replace('®', '<sup>®</sup>') : item.name}}
                        >
                        </Typography>
                        <Typography
                          variant="caption"
                          title={item.description}
                          className={classes.content + ' fix-span'}
                        >
                          {item.description}
                        </Typography>
                        <Grid container spacing={0} xs={12}>
                      {item.cost > 0 && (
                          <Grid
                            item
                            //xs={3}
                            title={`$${parseFloat(item.cost).toFixed(2)}`}
                            className={classes.price}
                            sx={{display: "flex", flexDirection: 'column'}}
                          >
                            ${parseFloat(item.cost).toFixed(2)}

                          </Grid>
                          
                        )}
                        {(item.basecalories > 0 || item.maxcalories > 0) &&  item.cost > 0 && (
                          <Grid
                          item
                          >
                            
                           <Typography className="vertical-line" style={{marginTop:"10px", marginLeft: "10px", marginRight: "10px"}}>

                            </Typography>
                          </Grid>
                        )}
                        {(item.basecalories > 0 || item.maxcalories > 0) && (
                          <Grid
                            item
                            title={`${
                              item.caloriesseparator
                                ? item.basecalories +
                                  item.caloriesseparator +
                                  item.maxcalories
                                : item.basecalories
                            } CAL`}
                            className={classes.cal}
                          >

                            {item.caloriesseparator
                              ? item.basecalories +
                                item.caloriesseparator +
                                item.maxcalories
                              : item.basecalories}{' '}
                            CAL
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
