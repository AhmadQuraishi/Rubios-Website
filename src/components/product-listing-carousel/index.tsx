import {
  Grid,
  Typography,
  Card,
  CardContent,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './index.css';
import { Product } from '../../types/olo-api';
import {
  changeImageSize,
  checkProductAvailability,
  checkFeaturedProduct,
} from '../../helpers/common';
import { facebookSendEvent } from '../../redux/actions/facebook-conversion';
import { facebookConversionTypes } from '../../redux/types/facebook-conversion';
import { useSelector, useDispatch } from 'react-redux';
import { isLoginUser } from '../../helpers/auth';

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    borderRadius: '10px',
    display: 'block',
    width: '100%',
  },
  title: {
    color: "#0075BF",
    padding: '20px 0 10px 0',
    fontSize: '18px !important',
    fontWeight: '600 !important',
    fontFamily: "'grit_sansbold' !important",
    letterSpacing: '0.00938em !important',
    textTransform: 'uppercase',
  },
  content: {
    color: theme.palette.secondary.main,
    fontSize: '14px',
    lineHeight: '7px',
    fontFamily: "'libre_franklinlight' !important",
    letterSpacing: 0,
  },
  cal: {
    paddingTop: '10px',
    fontFamily: "'grit_sansbold' !important",
    fontSize: '14px',
    fontWeight: 600,
    color: '#0075BF',
  },
  price: {
    paddingTop: '10px',
    fontFamily: "'grit_sansbold' !important",
    fontSize: '14px',
    fontWeight: 600,
    color: "#0075BF",
  },
}));

const ProductListingCarousel = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { productList, shownItemsCount, imgPath, orderType, categoryName } =
    props;
  let products: [Product] = productList;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { providerToken } = useSelector((state: any) => state.providerReducer);

  // if (shownItemsCount) {
  //   products = productList.slice(0, shownItemsCount);
  // }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
      partialVisibilityGutter: 50,
    },
  };

  // @ts-ignore
  // const CustomRightArrow = ({ onClick, ...rest }) => {
  //   const {
  //     onMove,
  //     carouselState: { currentSlide, deviceType }
  //   } = rest;
  //   // onMove means if dragging or swiping in progress.
  //   return <p onClick={() => onClick()} >working 111</p>;
  // };
  //
  // // @ts-ignore
  // const CustomLeftArrow = ({ onClick, ...rest }) => {
  //   const {
  //     onMove,
  //     carouselState: { currentSlide, deviceType }
  //   } = rest;
  //   // onMove means if dragging or swiping in progress.
  //   return <p onClick={() => onClick()} >working 222</p>;
  // };

  // function CustomRightArrow({ onClick }: any) {
  //   function handleClick() {
  //     // do whatever you want on the right button click
  //     console.log('Right button clicked, go to next slide');
  //     // ... and don't forget to call onClick to slide
  //     onClick();
  //   }
  //
  //   return (
  //     // <button
  //     //   onClick={handleClick}
  //     //   aria-label="Go to next slide"
  //     //   className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
  //     // />
  //     <p
  //       onClick={handleClick}
  //       aria-label="Go to next slide"
  //       className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
  //     >
  //       {' '}
  //       Next
  //     </p>
  //   );
  // }
  //
  // function CustomLeftArrow({ onClick }: any) {
  //   function handleClick() {
  //     // do whatever you want on the right button click
  //     console.log('Right button clicked, go to next slide');
  //     // ... and don't forget to call onClick to slide
  //     onClick();
  //   }
  //
  //   return (
  //     // <button
  //     //   onClick={handleClick}
  //     //   aria-label="Go to next slide"
  //     //   className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
  //     // />
  //     <p
  //       onClick={handleClick}
  //       aria-label="Go to next slide"
  //       className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
  //     >
  //       {' '}
  //       Back
  //     </p>
  //   );
  // }
  const triggerFacebookEventOnViewContentProduct = () => {
    let userObj: any = null;
    if (isLoginUser()) {
      userObj = {
        first_name: providerToken.first_name || '',
        last_name: providerToken.last_name || '',
        email: providerToken.email || '',
        phone: providerToken.phone || '',
      };
    }
    dispatch(
      facebookSendEvent(
        facebookConversionTypes.FACEBOOK_VIEW_CONTENT_EVENT,
        userObj,
        null,
      ),
    );
  };

  return (
    <Fragment>
      {/*<Grid container spacing={3}>*/}
      <Carousel
        swipeable={true}
        draggable={false}
        responsive={responsive}
        // ssr={true} // means to render carousel on server-side.
        // infinite={false}
        // autoPlay={props.deviceType !== 'mobile' ? false : true}
        additionalTransfrom={0}
        autoPlay={false}
        autoPlaySpeed={99999}
        keyBoardControl={true}
        partialVisible={true}
        // customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px carousel-mobile-show-next-slide"
        // customRightArrow={<CustomRightArrow onClick={undefined} />}
        // customLeftArrow={<CustomLeftArrow onClick={undefined} />}
      >
        {products.map(
          (item: any, index: number) =>
            checkProductAvailability(item, orderType) && (
              // <Grid
              //   scroll-id={'#panel-' + index}
              //   key={index}
              //   item
              //   xs={12}
              //   sm={6}
              //   md={3}
              // >
              <div
                id="foodmenuproduct"
                scroll-id={'#panel-' + index}
                key={index}
                style={{ padding: 10 }}
              >
                <Link
                  onClick={() => {
                    triggerFacebookEventOnViewContentProduct();
                  }}
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
                      >
                        FEATURED
                      </Typography>
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
                      {item.cost > 0 && (
                          <Grid
                            item
                            xs={5}
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
                          xs={2}>

                           <Typography className={classes.price} sx={{marginRight: "10px"}}>
                           {"|"}
                            </Typography>
                          </Grid>
                        )}
                        {(item.basecalories > 0 || item.maxcalories > 0) && (
                          <Grid
                            item
                            xs={5}
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
                        
                      </Grid>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            ),
        )}
        {/*</Grid>*/}
      </Carousel>
    </Fragment>
  );
};
export default ProductListingCarousel;
