import { Grid, Typography, Card, CardContent, Button } from '@mui/material';
import FoodMenuCard from '../../components/food-menu-card';
import ArrowForward from '@mui/icons-material/ArrowForward';
import './product.css';
import StoreInfoBar from '../../components/restaurant-info-bar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../redux/actions/category';
import { useParams } from 'react-router-dom';
import LoadingBar from '../../components/loading-bar';
import {
  Category,
  Option,
  OptionGroup,
  Product as ProductInfo,
  ResponseModifiers,
} from '../../types/olo-api';
import { getProductOptionRequest } from '../../redux/actions/product/option';

const Product = () => {
  const [productDetails, setProductDetails] = useState<ProductInfo>();
  const [productOptions, setProductOptions] = useState<ResponseModifiers>();
  const { categoryID, id } = useParams();
  const { categories, loading } = useSelector(
    (state: any) => state.categoryReducer,
  );
  const { options } = useSelector((state: any) => state.productOptionsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    //TODO: StoreID will get from State when select store work will be done
    const storeID = 60854;
    dispatch(getCategoriesRequest(storeID));
  }, []);

  useEffect(() => {
    if (categories && categories.categories) {
      if (id && categoryID) {
        const category = categories.categories.find((obj: Category) => {
          return obj.id.toString() == categoryID;
        });
        if (category) {
          const product = category.products.find((obj: ProductInfo) => {
            return obj.id.toString() == id;
          });
          setProductDetails(product);
        }
      }
    }
  }, [categories]);

  useEffect(() => {
    if (productDetails) {
      dispatch(getProductOptionRequest(productDetails.id));
    }
  }, [productDetails]);

  useEffect(() => {
    if (options && options.optiongroups) {
      console.log(options);
      setProductOptions(options);
    }
  }, [options]);

  return (
    <>
      <StoreInfoBar />
      {loading == true && productDetails == null && <LoadingBar />}
      {productDetails && (
        <Grid container className="product-detail">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Typography
                  variant="caption"
                  title="PICK UP YOUR"
                  className="label"
                >
                  PICK UP YOUR
                </Typography>
                <Typography
                  variant="h4"
                  className="heading"
                  title={productDetails.name}
                >
                  {productDetails.name}
                </Typography>
                <Typography variant="h6" title={productDetails.description}>
                  {productDetails.description}
                </Typography>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography
                      variant="caption"
                      className="label bold"
                      aria-label={`${productDetails.basecalories} Cal`}
                      title={`${productDetails.basecalories} Cal`}
                    >
                      {productDetails.basecalories} Cal
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      className="price"
                      title={`$${productDetails.cost.toFixed(2)}`}
                    >
                      ${productDetails.cost.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                {productDetails.imagefilename ? (
                  <img
                    src={productDetails.imagefilename}
                    alt={productDetails.name}
                    aria-label={productDetails.name}
                    title={productDetails.name}
                  />
                ) : (
                  <img
                    style={{ width: '80%', display: 'block', margin: 'auto' }}
                    src={require('../../assets/imgs/default_img.png')}
                    alt={productDetails.name}
                    aria-label={productDetails.name}
                    title={productDetails.name}
                  />
                )}
              </Grid>
            </Grid>
            {productOptions && (
              <Grid container className="menu-items">
                {productOptions.optiongroups.map(
                  (item: OptionGroup, index: number) =>
                    item.options.find((x) => x.isdefault === true) != null && (
                      <>
                        <Typography variant="h4" title="SELECT SIDE ONE">
                          {item.description}
                        </Typography>
                        <FoodMenuCard menuItems={[]} />
                      </>
                    ),
                )}
              </Grid>
            )}
            {/* <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Card elevation={6} className="single-product">
                  <Grid container>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        title="TACO ONE"
                        variant="caption"
                        className="label"
                      >
                        TACO ONE
                      </Typography>
                      <Typography
                        variant="h4"
                        title="MAXICAN STREET CORN SHRIMP TACO"
                      >
                        MAXICAN STREET CORN
                        <br /> SHRIMP TACO
                      </Typography>
                      <Button
                        title="Click to customize"
                        className="custom-btn"
                        endIcon={<ArrowForward />}
                      >
                        CLICK TO CUSTOMIZE
                      </Button>
                    </CardContent>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Card elevation={6} className="single-product">
                  <Grid container>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                      <Typography
                        title="TACO ONE"
                        variant="caption"
                        className="label"
                      >
                        TACO ONE
                      </Typography>
                      <Typography
                        variant="h4"
                        title="MAXICAN STREET CORN SHRIMP TACO"
                      >
                        MAXICAN STREET CORN
                        <br /> SHRIMP TACO
                      </Typography>
                      <Button
                        title="Click to customize"
                        className="custom-btn"
                        endIcon={<ArrowForward />}
                      >
                        CLICK TO CUSTOMIZE
                      </Button>
                    </CardContent>
                  </Grid>
                </Card>
              </Grid>
            </Grid> */}
            {/* <Grid container className="menu-items">
              <Typography variant="h4" title="SELECT SIDE ONE">
                SELECT SIDE ONE
              </Typography>
              <FoodMenuCard menuItems={[]} />
              <Typography variant="h4" title="SELECT SIDE TWO">
                SELECT SIDE TWO
              </Typography>
              <FoodMenuCard menuItems={[]} />
              <Typography variant="h4" title="ADD A DRINK">
                ADD A DRINK
              </Typography>
              <FoodMenuCard menuItems={[]} />
              <br />
              <br />
            </Grid> */}
            <Grid container>
              <Grid item xs={12} md={8} lg={8}></Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Button title="Quantity" className="label bold">
                  QUANTITY
                </Button>
              </Grid>
              <Grid item xs={12} md={2} lg={2}>
                <Button
                  aria-label="add to bag"
                  title="ADD TO Bag"
                  className="add-to-bag"
                  variant="contained"
                >
                  ADD TO Bag
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Product;
