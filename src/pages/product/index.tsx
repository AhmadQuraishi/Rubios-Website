import { Grid, Typography, Card, Button, TextField } from '@mui/material';
import FoodMenuCard from '../../components/food-menu-card';
import './product.css';
import StoreInfoBar from '../../components/restaurant-info-bar';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { getCategoriesRequest } from '../../redux/actions/category';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingBar from '../../components/loading-bar';
import {
  Category,
  Option,
  OptionGroup,
  Product as ProductInfo,
  ResponseModifiers,
} from '../../types/olo-api';
import { getProductOptionRequest } from '../../redux/actions/product/option';
import ProductSkeletonUI from '../../components/product-skeleton-ui';

const Product = () => {
  const [productDetails, setProductDetails] = useState<ProductInfo>();
  const [productOptions, setProductOptions] = useState<ResponseModifiers>();

  const { categoryID, id } = useParams();
  const { categories, loading } = useSelector(
    (state: any) => state.categoryReducer,
  );
  const { options } = useSelector((state: any) => state.productOptionsReducer);
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );

  const [count, setCount] = React.useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading == true) {
      setProductOptions(undefined);
      setProductDetails(undefined);
    }
  }, [loading]);

  const navigate = useNavigate();

  useEffect(() => {
    setProductOptions(undefined);
    if (restaurant === null) {
      navigate('/location');
    } else {
      dispatch(getCategoriesRequest(restaurant.id));
    }
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
      setProductOptions(options);
    }
  }, [options]);

  return (
    <>
      <StoreInfoBar />
      {loading == true && productDetails == null && productOptions == null && (
        <ProductSkeletonUI />
      )}
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
                      aria-label={`${
                        productDetails.caloriesseparator
                          ? productDetails.basecalories +
                            productDetails.caloriesseparator +
                            productDetails.maxcalories
                          : productDetails.basecalories
                      } Cal`}
                      title={`${
                        productDetails.caloriesseparator
                          ? productDetails.basecalories +
                            productDetails.caloriesseparator +
                            productDetails.maxcalories
                          : productDetails.basecalories
                      } Cal`}
                    >
                      {productDetails.caloriesseparator
                        ? productDetails.basecalories +
                          productDetails.caloriesseparator +
                          productDetails.maxcalories
                        : productDetails.basecalories}{' '}
                      Cal
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
            <br />
            <br />
            {productOptions && (
              <Grid container className="menu-items">
                {productOptions.optiongroups.map(
                  (item: OptionGroup, index: number) =>
                    item.mandatory ? (
                      <Fragment key={index}>
                        {item.options && item.options.length == 1 && (
                          <>
                            <Typography
                              variant="h4"
                              sx={{ marginTop: '20px' }}
                              title={item.options[0].name}
                            >
                              {item.options[0].name}
                            </Typography>
                            {item.options[0].modifiers &&
                              item.options[0].modifiers.length == 1 && (
                                <Card
                                  sx={{
                                    padding: '20px',
                                    border: '1px solid #ccc',
                                    marginTop: '10px',
                                    boxShadow: 'none',
                                  }}
                                >
                                  <Typography
                                    variant="h5"
                                    title={
                                      item.options[0].modifiers[0].description
                                    }
                                  >
                                    {item.options[0].modifiers[0].description}
                                  </Typography>
                                  <FoodMenuCard
                                    menuItems={
                                      item.options[0].modifiers[0].options
                                    }
                                    isSingleSelect={
                                      item.options[0].modifiers[0].mandatory
                                    }
                                    options={productOptions.optiongroups}
                                    showDDL={
                                      !item.options[0].modifiers[0].mandatory
                                    }
                                  />
                                </Card>
                              )}
                            {item.options[0].modifiers &&
                              item.options[0].modifiers.length > 1 && (
                                <FoodMenuCard
                                  menuItems={item.options[0].modifiers}
                                  isSingleSelect={
                                    item.options[0].modifiers[0].mandatory
                                  }
                                  options={productOptions.optiongroups}
                                  showDDL={
                                    !item.options[0].modifiers[0].mandatory
                                  }
                                />
                              )}
                          </>
                        )}
                        {item.options && item.options.length > 1 && (
                          <Card
                            sx={{
                              padding: '20px',
                              border: '1px solid #ccc',
                              marginTop: '10px',
                              boxShadow: 'none',
                            }}
                          >
                            <Typography variant="h4" title={item.description}>
                              {item.description}
                            </Typography>
                            <FoodMenuCard
                              menuItems={item.options}
                              options={productOptions.optiongroups}
                              isSingleSelect={item.mandatory}
                              showDDL={!item.mandatory}
                            />
                          </Card>
                        )}
                      </Fragment>
                    ) : (
                      <Fragment key={index}>
                        <Typography
                          variant="h4"
                          sx={{ marginTop: '20px' }}
                          title={item.description}
                        >
                          {item.description}
                        </Typography>
                        {item.options && (
                          <FoodMenuCard
                            menuItems={item.options}
                            isSingleSelect={item.mandatory}
                            options={productOptions.optiongroups}
                            showDDL={item.mandatory}
                          />
                        )}
                      </Fragment>
                    ),
                )}
              </Grid>
            )}
            <br />
            <br />
            <Grid container>
              <Grid item xs={0} sm={0} md={2} lg={6}></Grid>
              <Grid item xs={12} sm={3} md={2} lg={1}>
                <Button title="Quantity" className="label bold">
                  QUANTITY
                </Button>
              </Grid>
              <Grid item xs={12} sm={4} md={4} lg={2} className="quantity">
                <Button title="" className="add"  aria-label="increase" onClick={() => {setCount(count + 1);}}> + </Button>
                <TextField
                  value={count}
                  aria-label=""
                  placeholder="0"
                  title=""
                />
                <Button title="" className="subtract"  aria-label="reduce" onClick={() => {setCount(Math.max(count - 1, 0));}}> - </Button>
              </Grid>
              <Grid item xs={12} sm={3} md={2} lg={2}>
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
