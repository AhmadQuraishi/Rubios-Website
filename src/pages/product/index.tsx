import {
  Grid,
  Typography,
  Card,
  Button,
  TextField,
  Snackbar,
  Alert,
  Slide,
} from '@mui/material';
import FoodMenuCard from '../../components/food-menu-card';
import './product.css';
import StoreInfoBar from '../../components/restaurant-info-bar';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as React from 'react';
import { getCategoriesRequest } from '../../redux/actions/category';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Category,
  Option,
  OptionGroup,
  Product as ProductInfo,
  ResponseBasket,
  ResponseModifiers,
} from '../../types/olo-api';
import { getProductOptionRequest } from '../../redux/actions/product/option';
import ProductSkeletonUI from '../../components/product-skeleton-ui';
import { setBasketRequest } from '../../redux/actions/basket/create';
import { addProductRequest } from '../../redux/actions/basket/product/add';
import { getBasketRequest } from '../../redux/actions/basket';
import { updateProductRequest } from '../../redux/actions/basket/product/update';
import { displayToast } from '../../helpers/toast';

const Product = () => {
  const [productDetails, setProductDetails] = useState<ProductInfo>();
  const [productOptions, setProductOptions] = useState<ResponseModifiers>();
  const [basket, setBasket] = useState<ResponseBasket>();
  const [actionStatus, setActionStatus] = useState<boolean>(false);
  const { id, edit } = useParams();
  const { categories, loading } = useSelector(
    (state: any) => state.categoryReducer,
  );
  const dummyBasketObj = useSelector((state: any) => state.createBasketReducer);
  const basketObj = useSelector((state: any) => state.basketReducer);
  const productAddObj = useSelector((state: any) => state.addProductReducer);
  const productUpdateObj = useSelector(
    (state: any) => state.updateProductReducer,
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
    if (restaurant === null) {
      navigate('/location');
    } else {
      if (categories == null) {
        dispatch(getCategoriesRequest(restaurant.id));
      }
    }
  }, []);

  useEffect(() => {
    if (categories && categories.categories) {
      if (id) {
        categories.categories.map((item: Category) => {
          const product = item.products.find((obj: ProductInfo) => {
            return obj.id.toString() == id;
          });
          if (product) {
            setProductDetails(product);
          }
        });
      }
    }
  }, [categories]);

  useEffect(() => {
    if (productDetails) {
      dispatch(getProductOptionRequest(productDetails.id));
      setCountWithEdit();
    }
  }, [productDetails]);

  const setCountWithEdit = () => {
    if (edit && productDetails) {
      const product = basketObj.basket.products.find(
        (item: any) => item.id == edit,
      );
      if (product) {
        setCount(product.quantity);
      } else {
        navigate('/product/' + productDetails?.id);
      }
    }
  };

  useEffect(() => {
    if (edit && window.location.href.indexOf('edit') == -1) {
      dispatch(getCategoriesRequest(restaurant.id));
    }
  }, [edit]);

  useEffect(() => {
    if (options && options.optiongroups && productOptions == undefined) {
      setProductOptions(options);
      if (edit) {
        const product = basketObj.basket.products.find(
          (item: any) => item.id == edit,
        );
        setTimeout(() => {
          let timeCount = 200;
          product.choices.map((item: any, index: number) => {
            setTimeout(() => {
              let element = document.querySelectorAll(
                "[option-id='" + item.optionid + "'",
              )[0] as HTMLElement;
              if (element) {
                element.click();
              }
              let elementSel = document.getElementById(
                item.optionid,
              ) as HTMLOptionElement;
              if (elementSel) {
                let sel = elementSel.parentElement as HTMLSelectElement;
                sel.value = item.optionid.toString();
              }
            }, timeCount);
            timeCount = timeCount + 200;
          });
        }, 500);
      }
    }
  }, [options]);

  const addProductToBag = () => {
    if (basketObj.basket == null) {
      const request: any = {};
      request.vendorid = restaurant.id;
      dispatch(setBasketRequest(request));
    } else {
      const request: any = {};
      request.productid = productDetails?.id;
      request.quantity = count;
      let options = '';
      Array.from(
        document.getElementsByClassName('reward-item-selected'),
      ).forEach((el) => {
        if (el.getAttribute('option-id')) {
          options = options + el.getAttribute('option-id') + ',';
          const sel = el.querySelector('select')?.value;
          if (sel) {
            options = options + sel + ',';
          }
        }
      });

      request.options = options;
      setActionStatus(true);
      if (edit) {
        dispatch(
          updateProductRequest(basket?.id || '', parseInt(edit), request),
        );
      } else {
        dispatch(addProductRequest(basket?.id || '', request));
      }
    }
  };

  useEffect(() => {
    if (dummyBasketObj.basket && basket == undefined) {
      setBasket(dummyBasketObj.basket);
      dispatch(getBasketRequest('', dummyBasketObj.basket));
      const request: any = {};
      request.productid = productDetails?.id;
      request.quantity = count;
      setActionStatus(true);
      dispatch(addProductRequest(dummyBasketObj.basket.id || '', request));
    }
  }, [dummyBasketObj.basket]);

  useEffect(() => {
    if (basketObj.basket) {
      setBasket(basketObj.basket);
    }
  }, [basketObj.basket]);

  useEffect(() => {
    if (productAddObj && productAddObj.basket && actionStatus) {
      setBasket(productAddObj.basket);
      setActionStatus(false);
      displayToast('SUCCESS', '1 item added to cart.');
      dispatch(getBasketRequest('', productAddObj.basket));
      navigate('/menu/' + restaurant.slug);
    }
  }, [productAddObj]);

  useEffect(() => {
    if (productUpdateObj && productUpdateObj.basket && actionStatus) {
      setBasket(productUpdateObj.basket);
      setActionStatus(false);
      displayToast('SUCCESS', '1 item updated in cart.');
      dispatch(getBasketRequest('', productUpdateObj.basket));
      navigate('/menu/' + restaurant.slug);
    }
  }, [productUpdateObj]);

  const changeImageSize = (path: string) => {
    return path.replaceAll('w=210', 'w=520').replaceAll('h=140', 'w=520');
  };

  return (
    <div style={{ minHeight: '500px' }}>
      <StoreInfoBar />
      {loading == true && productDetails == null && productOptions == null && (
        <ProductSkeletonUI />
      )}
      {productDetails && (
        <Grid container className="product-detail">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={6} className="ph-fix">
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
                  {productDetails.cost > 0 && (
                    <Grid item xs={6}>
                      <Typography
                        variant="h6"
                        className="price"
                        title={`$${productDetails.cost.toFixed(2)}`}
                      >
                        ${productDetails.cost.toFixed(2)}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                sx={{ marginTop: '20px', textAlign: 'center' }}
              >
                {productDetails.imagefilename ? (
                  <img
                    style={{ width: '100%', display: 'block', margin: 'auto' }}
                    src={
                      ((categories && categories.imagepath) || '') +
                      changeImageSize(productDetails.imagefilename)
                    }
                    className="img"
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
                <Button
                  title=""
                  className="add"
                  aria-label="increase"
                  onClick={() => {
                    setCount(count + 1);
                  }}
                >
                  {' '}
                  +{' '}
                </Button>
                <TextField
                  value={count}
                  aria-label=""
                  placeholder="0"
                  title=""
                />
                <Button
                  title=""
                  className="subtract"
                  aria-label="reduce"
                  onClick={() => {
                    setCount(Math.max(count - 1, 1));
                  }}
                >
                  {' '}
                  -{' '}
                </Button>
              </Grid>
              <Grid item xs={12} sm={3} md={2} lg={2}>
                {productAddObj.loading ||
                basketObj.loading ||
                dummyBasketObj.loading ||
                productUpdateObj.loading ? (
                  <Button
                    aria-label="add to bag"
                    title="ADD TO Bag"
                    className="add-to-bag"
                    variant="contained"
                    disabled
                  >
                    {edit ? 'UPDATE BAG' : 'ADD TO BAG'}
                  </Button>
                ) : (
                  <Button
                    aria-label="add to bag"
                    title="ADD TO Bag"
                    className="add-to-bag"
                    variant="contained"
                    onClick={() => {
                      addProductToBag();
                      return false;
                    }}
                  >
                    {edit ? 'UPDATE BAG' : 'ADD TO BAG'}
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Product;
