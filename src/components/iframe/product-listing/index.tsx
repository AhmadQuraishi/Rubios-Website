import { Typography, Card, CardContent, Theme, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment } from 'react';
import './index.css';
import { Product } from '../../../types/olo-api';
import Carousel from 'react-multi-carousel';
import { useNavigate } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import {
  changeImageSize,
  checkFeaturedProduct,
  checkProductAvailability,
} from '../../../helpers/common';

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    borderRadius: '10px',
    display: 'block',
    width: '100%',
  },
  title: {
    color: "#474747 !important",
    padding: '20px 0 10px 0',
    fontSize: '18px !important',
    fontWeight: '600 !important',
    fontFamily: "'Librefranklin-Regular' !important",
    letterSpacing: '0.00938em !important',
    
  },
  content: {
    color: theme.palette.secondary.main,
    fontSize: '14px',
    lineHeight: '7px',
    fontFamily: "'GritSans-Bold' !important",
    letterSpacing: 0,
  },
  cal: {
    paddingTop: '10px',
    fontFamily: "'Sunborn-Sansone' !important",
    fontSize: '18px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  price: {
    paddingTop: '10px',
    fontFamily: "'Sunborn-Sansone' !important",
    fontSize: '18px',
    fontWeight: 600,
    color: theme.palette.secondary.main,
  },
}));

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

const ProductListing = (props: any) => {
  const classes = useStyles();
  const { productList, imgPath } = props;
  let products: [Product] = productList;

  const checkProductAvailability = (item: any) => {
    return !item.availability.isdisabled && item.availability.now;
  };

  return (
    <Fragment>
      {/*<Grid container spacing={3}>*/}
      <Carousel
        swipeable={true}
        draggable={false}
        responsive={responsive}
        // ssr={true} // means to render carousel on server-side.
        // infinite={true}
        // autoPlay={props.deviceType !== 'mobile' ? true : false}
        additionalTransfrom={0}
        autoPlay={false}
        autoPlaySpeed={99999}
        // autoPlaySpeed={3000}
        keyBoardControl={true}
        partialVisible={true}
        // customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={['tablet', 'mobile']}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {products.map(
          (item: any, index: number) =>
            checkProductAvailability(item) && (
              <div key={index} style={{ padding: 10 }}>
                <Card
                  elevation={0}
                  style={{ borderRadius: 0}}
                  sx={{backgroundColor: "transparent !important"}}
                  role="group"
                  aria-label={item.name}
                >
                  {item.imagefilename ? (
                    <img
                      className={classes.img}
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
                      src={require('../../../assets/imgs/default_img.png')}
                      title={item.name}
                    />
                  )}
                  {checkFeaturedProduct(item) && (
                    <Typography
                      variant="h2"
                      title={'FEATURED'}
                      className="product-label"
                      sx={{fontFamily: "'Sunborn-Sansone' !important"}}
                    >
                      {checkFeaturedProduct(item)}
                    </Typography>
                  )}
                  <CardContent
                    style={{ paddingBottom: 0 }}
                    sx={{ padding: '0' }}
                  >
                    <Typography
                      variant="h2"
                      title={item.name}
                      className={classes.title}
                      sx={{
                        
                        height: {
                          lg: '50px',
                          md: '50px',
                          sm: '45px',
                          xs: '50px',
                        },
                      }}
                    >
                      {/* {item?.name?.length > 48
                        ? item?.name?.slice(0, 50) + '...'
                        : item?.name} */}
                        {item.name}
                    </Typography>
                    <Button
                      className="custom-btn cta2-btn"
                      variant="contained"
                      title="ORDER NOW"
                      style={{ width: '80%', margin: '5px' }}
                      onClick={() => {
                        window.parent.location.href = `${process.env.REACT_APP_ORDERING_URL}`;
                      }}
                    >
                      ORDER
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ),
        )}
      </Carousel>
    </Fragment>
  );
};
export default ProductListing;