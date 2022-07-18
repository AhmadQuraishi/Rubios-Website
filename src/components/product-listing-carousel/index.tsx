import { Grid, Typography, Card, CardContent, Theme } from '@mui/material';
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
} from '../../helpers/common';

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

const ProductListingCarousel = (props: any) => {
  const classes = useStyles();
  const { productList, shownItemsCount, imgPath, orderType } = props;
  let products: [Product] = productList;
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

  return (
    <Fragment>
      {/*<Grid container spacing={3}>*/}
      <Carousel
        swipeable={true}
        draggable={false}
        responsive={responsive}
        // ssr={true} // means to render carousel on server-side.
        infinite={false}
        // autoPlay={props.deviceType !== 'mobile' ? true : false}
        additionalTransfrom={0}
        autoPlay={false}
        autoPlaySpeed={99999}
        keyBoardControl={true}
        // customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
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
              </div>
            ),
        )}
        {/*</Grid>*/}
      </Carousel>
    </Fragment>
  );
};
export default ProductListingCarousel;
