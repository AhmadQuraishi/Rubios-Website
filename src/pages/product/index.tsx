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
import './product.css';
import * as React from 'react';
import ProductOptionsSkeletonUI from '../../components/product-options-skeleton-ui';
import StoreInfoBar from '../../components/restaurant-info-bar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../redux/actions/category';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Category,
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
import ItemImage from '../../components/item-image';
import { getUpsellsRequest } from '../../redux/actions/basket/upsell/Get';
import axios from 'axios';
const inputProps = {
  'aria-label': 'quantity',
};

const Product = () => {
  const [productDetails, setProductDetails] = useState<ProductInfo>();
  const [productOptions, setProductOptions] = useState<ResponseModifiers>();
  const [basket, setBasket] = useState<ResponseBasket>();
  const [actionStatus, setActionStatus] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>();
  const { id, edit } = useParams();
  const { categories, loading } = useSelector(
    (state: any) => state.categoryReducer,
  );
  const dummyBasketObj = useSelector((state: any) => state.createBasketReducer);
  const basketObj = useSelector((state: any) => state.basketReducer);
  const productAddObj = useSelector((state: any) => state.addProductReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const upsellsObj = useSelector((state: any) => state.getUpsellsReducer);
  const productUpdateObj = useSelector(
    (state: any) => state.updateProductReducer,
  );
  const { options } = useSelector((state: any) => state.productOptionsReducer);
  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );

  const [basketType, setBasketType] = useState();
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
    if (edit == undefined) {
      setProductDetails(undefined);
      if (restaurant === null) {
        navigate('/location');
      } else {
        setCatRequest(true);
        dispatch(getCategoriesRequest(restaurant.id));
      }
    }
    setOptionsSelectionArray([]);
    setBasketType((basketObj && basketObj.basketType) || 'New');
  }, []);

  const [catRequest, setCatRequest] = useState(false);

  useEffect(() => {
    if (categories && categories.categories && catRequest) {
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
  const [updatedOptions, setUpdatedOptions] = useState(false);
  useEffect(() => {
    if (productDetails) {
      setUpdatedOptions(true);
      setOptionsSelectionArray([]);
      dispatch(getProductOptionRequest(productDetails.id));
      setTotalCost(productDetails.cost * count);
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
        getTotalCost(productDetails.cost + ptotalCost || 0 * product.quantity);
      } else {
        navigate('/product/' + productDetails?.id);
      }
    }
  };

  useEffect(() => {
    if (edit) {
      setCatRequest(true);
      dispatch(getCategoriesRequest(restaurant.id));
    }
  }, [edit]);

  useEffect(() => {
    if (options && options.optiongroups && updatedOptions) {
      setUpdatedOptions(false);
      setProductOptions(options);
      prepareProductOptionsArray(options.optiongroups, null, []);
      getOptionsImages(options.optiongroups);
      getTotalCost();
    }
  }, [options]);

  const [optionImages, setOptionImages] = useState([]);

  const getOptionsImages = (options: []) => {
    const ids: any[] = [];
    JSON.stringify(options, (key, value) => {
      if (key === 'chainoptionid' && !ids.find((x) => x === value))
        ids.push(value);
      return value;
    });
    if (ids.length > 0) {
      try {
        const url = process.env.REACT_APP_INGREDIENT_URL?.replace(
          '*yourplu*',
          ids.toString(),
        );
        const promise = axios.get(url || '');
        promise.then((response) => {
          if (response.data.length > 0) {
            setOptionImages(response.data);
          } else {
            setOptionImages([]);
          }
        });
      } catch (error) {
        throw error;
      }
    }
  };

  const addProductToBag = () => {
    if (basketObj.basket == null) {
      const request: any = {};
      // let deliverymode = orderType || '';
      request.vendorid = restaurant.id;
      if (authToken?.authtoken && authToken.authtoken !== '') {
        request.authtoken = authToken.authtoken;
      }
      dispatch(setBasketRequest(request));
    } else {
      const request: any = {};
      request.productid = productDetails?.id;
      request.quantity = count;
      let options = '';
      optionsSelectionArray.map((option: any) => {
        if (option.selected) {
          option.selectedOptions.map((item: any) => {
            options = options + item + ',';
            const elem = option.options.find((x: any) => x.optionID == item);
            if (elem && elem.selectedValue) {
              options = options + elem.selectedValue + ',';
            }
          });
        }
      });
      request.options = options;
      setActionStatus(true);
      if (edit) {
        dispatch(
          updateProductRequest(basket?.id || '', parseInt(edit), request),
        );
      } else {
        if (upsellsObj.upsells == null && basket) {
          dispatch(getUpsellsRequest(basket.id));
        }
        dispatch(addProductRequest(basket?.id || '', request));
      }
    }
  };

  useEffect(() => {
    if (dummyBasketObj.basket && basket == undefined && productDetails) {
      setBasket(dummyBasketObj.basket);
      dispatch(getBasketRequest('', dummyBasketObj.basket));
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
      dispatch(addProductRequest(dummyBasketObj.basket.id || '', request));
    }

    if (
      dummyBasketObj &&
      dummyBasketObj.basket &&
      dummyBasketObj.basket.id &&
      upsellsObj.upsells == null
    ) {
      dispatch(getUpsellsRequest(dummyBasketObj.basket.id));
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
      dispatch(getBasketRequest('', productAddObj.basket, basketType));
      navigate('/menu/' + restaurant.slug);
    }
  }, [productAddObj]);

  useEffect(() => {
    if (productUpdateObj && productUpdateObj.basket && actionStatus) {
      setBasket(productUpdateObj.basket);
      setActionStatus(false);
      displayToast('SUCCESS', '1 item updated in cart.');
      dispatch(getBasketRequest('', productUpdateObj.basket, basketType));
      navigate('/menu/' + restaurant.slug);
    }
  }, [productUpdateObj]);

  const changeImageSize = (path: string, images: any) => {
    if (images && images.length > 0) {
      const dektopImage: any = images.find(
        (obj: any) => obj.groupname == 'desktop-menu',
      );
      if (dektopImage) {
        return dektopImage.filename;
      } else {
        return path;
      }
    } else {
      return path;
    }
  };

  const [optionsSelectionArray, setOptionsSelectionArray] = useState<any>([]);

  useEffect(() => {}, [optionsSelectionArray]);

  let ptotalCost = 0;

  const prepareProductOptionsArray = (
    options: any,
    parentID: any,
    parentDefaultOptionID: any[],
    isParentSelected: any = false,
  ) => {
    options.map((itemMain: any, index0: number) => {
      let defaultOptionID: any = null;
      if (itemMain.options) {
        const item = itemMain.options.find(
          (item: any) => item.isdefault == true,
        );
        defaultOptionID = (item && item.id) || null;
      }
      let editOptions: any[] = [];
      let optionsArray: any[] = [];
      itemMain.options.map((option: any) => {
        if (
          itemMain.description &&
          itemMain.description.toLowerCase().indexOf('remove or modify') != -1
        ) {
          optionsArray.push({
            optionID: option.id,
            selectedValue: dropDownFilledValueForEdit(
              option.modifiers[0].options,
            ),
            option: option,
            dropDownValues: option.modifiers[0].options,
          });
        } else {
          optionsArray.push({
            optionID: option.id,
            selectedValue: null,
            option: option,
            dropDownValues: null,
          });
        }
        if (isExistInEdit(option.id)) {
          ptotalCost = ptotalCost + option.cost;
          getTotalCost(
            productDetails?.cost || 0 + ptotalCost || 0 * count || 0,
          );
          editOptions.push(option.id);
        }
      });

      let selectedOptions: any[] =
        editOptions.length > 0
          ? editOptions
          : defaultOptionID
          ? [defaultOptionID]
          : [];

      setOptionsSelectionArray((optionsSelectionArray: any) => [
        ...optionsSelectionArray,
        {
          id: itemMain.id,
          name: itemMain.description,
          mandatory: itemMain.mandatory,
          multiSelectOptions: !itemMain.mandatory,
          selectedOptions: selectedOptions,
          defaultOption: defaultOptionID,
          options: optionsArray,
          parentOptionID: parentID || itemMain.id,
          cost: itemMain.cost || 0,
          selected:
            (isParentSelected && parentDefaultOptionID.includes(parentID)) ||
            parentID == null
              ? true
              : false,
        },
      ]);
      if (
        itemMain.description &&
        itemMain.description.toLowerCase().indexOf('remove or modify') == -1
      ) {
        itemMain.options.map(
          (item: any, index2: number) =>
            item.modifiers &&
            prepareProductOptionsArray(
              item.modifiers,
              item.id,
              selectedOptions,
              (isParentSelected && parentDefaultOptionID.includes(parentID)) ||
                parentID == null,
            ),
        );
      }
    });
  };

  const isExistInEdit = (id: number) => {
    let isExist = false;
    if (edit) {
      const product = basketObj.basket.products.find(
        (item: any) => item.id == edit,
      );
      product.choices.map((item: any, index: number) => {
        if (item.optionid == id) isExist = true;
      });
    }
    return isExist;
  };

  const dropDownFilledValueForEdit = (options: any) => {
    let isExist = null;
    if (edit) {
      const product = basketObj.basket.products.find(
        (item: any) => item.id == edit,
      );
      product.choices.map((item: any, index: number) => {
        if (options.find((x: any) => item.optionid == x.id)) {
          isExist = item.optionid;
        }
      });
    }
    if (isExist == null) isExist = options[0].id;
    return isExist;
  };

  const [selectionExecute, setSelectionExecute] = useState(false);

  const showChildOptions = (optionId: number, parnetOptionID: number) => {
    setSelectionExecute(false);
    setTimeout(() => {
      setSelectionExecute(false);
    }, 200);
    optionsSelectionArray.map((item: any) => {
      if (item.id === parnetOptionID) {
        if (item.mandatory) {
          if (item.selectedOptions.includes(optionId)) {
            item.selectedOptions = [];
            let elems = optionsSelectionArray.filter(
              (x: any) => x.parentOptionID == optionId,
            );
            if (elems) {
              elems.map((x: any) => {
                x.selected = false;
                if (x.defaultOption) {
                  let elem = optionsSelectionArray.find(
                    (i: any) => i.parentOptionID == x.defaultOption,
                  );
                  if (elem) {
                    elem.selected = false;
                    if (elem.defaultOption) {
                      let elem1 = optionsSelectionArray.find(
                        (i: any) => i.parentOptionID == elem.defaultOption,
                      );
                      if (elem1) {
                        elem1.selected = false;
                      }
                    }
                  }
                }
              });
            }
          } else {
            let elems = optionsSelectionArray.filter(
              (x: any) => x.parentOptionID == item.selectedOptions[0],
            );
            if (elems) {
              elems.map((x: any) => {
                x.selected = false;
                if (x.defaultOption) {
                  let elem = optionsSelectionArray.find(
                    (i: any) => i.parentOptionID == x.defaultOption,
                  );
                  if (elem) {
                    elem.selected = false;
                    if (elem.defaultOption) {
                      let elem1 = optionsSelectionArray.find(
                        (i: any) => i.parentOptionID == elem.defaultOption,
                      );
                      if (elem1) {
                        elem1.selected = false;
                      }
                    }
                  }
                }
              });
            }
            item.selectedOptions = [optionId];
            item.selected = true;
            const option = item.options.find(
              (option: any) => option.optionID == optionId,
            );
            if (option) {
              setOptionsCost(optionsCost + option.option.cost);
              setTotalCost((totalCost || 0) + option.option.cost * count);
            }
            elems = optionsSelectionArray.filter(
              (x: any) => x.parentOptionID == optionId,
            );
            if (elems) {
              elems.map((x: any) => {
                x.selected = true;
                if (x.defaultOption) {
                  let elem = optionsSelectionArray.find(
                    (i: any) => i.parentOptionID == x.defaultOption,
                  );
                  if (elem) {
                    elem.selected = true;
                    if (elem.defaultOption) {
                      let elem1 = optionsSelectionArray.find(
                        (i: any) => i.parentOptionID == elem.defaultOption,
                      );
                      if (elem1) {
                        elem1.selected = true;
                      }
                    }
                  }
                }
              });
            }
          }
        } else {
          if (item.selectedOptions.includes(optionId)) {
            const index = item.selectedOptions.indexOf(optionId);
            if (index > -1) {
              item.selectedOptions.splice(index, 1);
              const option = item.options.find(
                (option: any) => option.optionID == optionId,
              );
              if (option) {
                setOptionsCost(optionsCost - option.option.cost);
                setTotalCost((totalCost || 0) - option.option.cost * count);
              }
              item.selected = !(item.selectedOptions.length == 0);
              let elems = optionsSelectionArray.filter(
                (x: any) => x.parentOptionID == optionId,
              );
              if (elems) {
                elems.map((x: any) => {
                  x.selected = false;
                  if (x.defaultOption) {
                    let elem = optionsSelectionArray.find(
                      (i: any) => i.parentOptionID == x.defaultOption,
                    );
                    if (elem) {
                      elem.selected = false;
                      if (elem.defaultOption) {
                        let elem1 = optionsSelectionArray.find(
                          (i: any) => i.parentOptionID == elem.defaultOption,
                        );
                        if (elem1) {
                          elem1.selected = false;
                        }
                      }
                    }
                  }
                });
              }
            }
          } else {
            item.selectedOptions.push(optionId);
            item.selected = true;
            const option = item.options.find(
              (option: any) => option.optionID == optionId,
            );
            if (option) {
              setOptionsCost(optionsCost + option.option.cost);
              setTotalCost((totalCost || 0) + option.option.cost * count);
            }
            let elems = optionsSelectionArray.filter(
              (x: any) => x.parentOptionID == optionId,
            );
            if (elems) {
              elems.map((x: any) => {
                x.selected = true;
                if (x.defaultOption) {
                  let elem = optionsSelectionArray.find(
                    (i: any) => i.parentOptionID == x.defaultOption,
                  );
                  if (elem) {
                    elem.selected = true;
                    if (elem.defaultOption) {
                      let elem1 = optionsSelectionArray.find(
                        (i: any) => i.parentOptionID == elem.defaultOption,
                      );
                      if (elem1) {
                        elem1.selected = true;
                      }
                    }
                  }
                }
              });
            }
          }
        }
      }
    });
    setOptionsSelectionArray((optionsSelectionArray: any) => [
      ...optionsSelectionArray,
    ]);
  };

  const checkOptionSelected = (
    optionId: number,
    parnetOptionID: number,
  ): boolean => {
    let isSelected = false;
    optionsSelectionArray.map((item: any) => {
      if (item.id === parnetOptionID) {
        isSelected = item.selectedOptions.includes(optionId);
      }
    });
    return isSelected;
  };

  const selectedParentOption = (parentOptionID: number) => {
    let isSelected = false;
    optionsSelectionArray.map((item: any) => {
      if (item.parentOptionID == parentOptionID && item.selected) {
        isSelected = true;
      }
    });
    return isSelected;
  };

  const IsItemSelected = (parentOptionID: number) => {
    let isOptionsRequired = false;
    optionsSelectionArray.map((item: any) => {
      if (
        item.id == parentOptionID &&
        item.selectedOptions.length == 0 &&
        item.mandatory
      ) {
        isOptionsRequired = true;
      }
    });
    return isOptionsRequired;
  };

  const validateOptionsSelection = () => {
    let isValidate = true;
    optionsSelectionArray.map((itemP: any) => {
      if (
        itemP.id == itemP.parentOptionID &&
        itemP.mandatory &&
        itemP.selectedOptions.length === 0
      ) {
        isValidate = false;
      }
      itemP.selectedOptions.map((itemC: any) => {
        let el = optionsSelectionArray.find(
          (i: any) => i.parentOptionID === itemC,
        );
        if (el == undefined && itemP.selected) {
          optionsSelectionArray.map((i: any) => {
            let ele2 = i.options.find((x: any) => x.optionID == itemC);
            if (
              ele2 &&
              ele2.selectedValue == null &&
              ele2.dropDownValues != null
            ) {
              isValidate = false;
            }
          });
        }
        if (el && el.mandatory && el.selectedOptions.length === 0) {
          isValidate = false;
        }
      });
    });
    return isValidate;
  };

  const dropDownValue = (
    optionID: number,
    value: any,
    options: any,
    target: HTMLSelectElement,
  ) => {
    const id = target.getAttribute('data-select-id');
    const option = options.find((x: any) => x.id == id);
    if (option) {
      setTotalCost(((productDetails?.cost || 0) - option.cost) * count);
    }
    const optionAdd = options.find((x: any) => x.id == value);
    if (optionAdd) {
      setTotalCost(((productDetails?.cost || 0) + optionAdd.cost) * count);
    }
    optionsSelectionArray.map((itemP: any) => {
      itemP.options.map((itemC: any) => {
        if (itemC.optionID == optionID) {
          itemC.selectedValue = value == '0' ? null : value;
        }
      });
    });
    setOptionsSelectionArray((optionsSelectionArray: any) => [
      ...optionsSelectionArray,
    ]);
  };

  const [optionsCost, setOptionsCost] = useState(0);

  const getTotalCost = (cost: any = null) => {
    if (cost) {
      setTotalCost(cost);
    } else {
      setOptionsCost(ptotalCost);
      setTotalCost(((productDetails?.cost || 0) + ptotalCost) * count);
    }
  };

  return (
    <div style={{ minHeight: '500px' }}>
      <Typography variant="h1" className="sr-only">
        Product details
      </Typography>
      <StoreInfoBar />
      {loading == true && productDetails == null && productOptions == null && (
        <ProductSkeletonUI />
      )}
      {productDetails && (
        <Grid container className="product-detail">
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} sm={6} className="ph-fix">
                {/*<Typography*/}
                {/*variant="caption"*/}
                {/*title="PICK UP YOUR"*/}
                {/*className="label"*/}
                {/*>*/}
                {/*PICK UP YOUR*/}
                {/*</Typography>*/}
                <Typography
                  variant="h2"
                  className="heading"
                  title={productDetails.name}
                >
                  {productDetails.name}
                </Typography>
                <Typography
                  variant="body1"
                  title={productDetails.description}
                  className="desc"
                >
                  {productDetails.description}
                </Typography>
                <Grid container>
                  {(parseInt(productDetails.basecalories || '0') > 0 ||
                    parseInt(productDetails.maxcalories || '0') > 0) && (
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
                  )}
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
                sm={6}
                sx={{ marginTop: '20px', textAlign: 'center' }}
              >
                {productDetails.imagefilename ? (
                  <img
                    style={{
                      width: '100%',
                      display: 'block',
                      margin: 'auto',
                      borderRadius: '10px',
                    }}
                    src={
                      ((categories && categories.imagepath) || '') +
                      changeImageSize(
                        productDetails.imagefilename,
                        productDetails.images,
                      )
                    }
                    className="img"
                    title={productDetails.name}
                  />
                ) : (
                  <img
                    style={{ width: '80%', display: 'block', margin: 'auto' }}
                    src={require('../../assets/imgs/default_img.png')}
                    title={productDetails.name}
                  />
                )}
              </Grid>
            </Grid>
            <br />
            <br />
            {selectionExecute && <ProductOptionsSkeletonUI />}
            <div style={{ display: !selectionExecute ? 'block' : 'none' }}>
              {optionsSelectionArray.length > 0 &&
                optionsSelectionArray.map((itemMain: any, index0: number) => (
                  <Grid
                    key={Math.random() + index0}
                    container
                    sx={{
                      display:
                        itemMain.id == itemMain.parentOptionID ||
                        selectedParentOption(itemMain.parentOptionID)
                          ? 'flex'
                          : 'none',
                    }}
                    className="menu-items"
                    parent-mandatory-option={itemMain.mandatory.toString()}
                    parent-option-id={itemMain.parentOptionID}
                  >
                    <Grid item xs={12} option-id={itemMain.id}>
                      <Typography
                        variant={
                          itemMain.parentOptionID == itemMain.id ? 'h4' : 'h5'
                        }
                        className="heading-ui"
                        sx={{ marginTop: '20px' }}
                        title={itemMain.name}
                        aria-required={itemMain.mandatory ? 'true' : 'false'}
                      >
                        {itemMain.name}
                        <span style={{ color: '#ff0000' }}>
                          {itemMain.mandatory ? '*' : ''}
                        </span>
                        {IsItemSelected(itemMain.id) && (
                          <span
                            style={{
                              fontSize: '16px',
                              color: 'red',
                              paddingLeft: '10px',
                            }}
                          >
                            (Required)
                          </span>
                        )}
                      </Typography>
                    </Grid>
                    {itemMain.options &&
                      itemMain.options.map((itemChild: any, index1: number) => (
                        <Grid
                          key={Math.random() + index1}
                          option-id={itemChild.option.id}
                          className={
                            checkOptionSelected(
                              itemChild.option.id,
                              itemMain.id,
                            ) == true
                              ? 'content-panel selected'
                              : 'content-panel'
                          }
                          item
                          xs={6}
                          sm={4}
                          md={3}
                          lg={4}
                        >
                          <label htmlFor={itemChild.option.id}>
                            <Card
                              className="card-panel"
                              tabIndex={0}
                              title={itemChild.option.name}
                              is-mandatory={itemMain.mandatory.toString()}
                              parent-option-id={itemMain.parentOptionID}
                              onClick={() => {
                                showChildOptions(
                                  itemChild.option.id,
                                  itemMain.id,
                                );
                              }}
                              onKeyUp={(e) => {
                                if (e.keyCode === 13)
                                  showChildOptions(
                                    itemChild.option.id,
                                    itemMain.id,
                                  );
                              }}
                            >
                              <div className="check-mark">
                                <div aria-hidden="true" className="checkmark">
                                  L
                                </div>
                              </div>
                              <Grid
                                container
                                spacing={1}
                                className="name-img-panel"
                                sx={{ padding: '0', marginTop: '0' }}
                              >
                                <Grid
                                  item
                                  xs={12}
                                  lg={5}
                                  sx={{
                                    padding: '0px',
                                    paddingLeft: {
                                      xs: '0px !important',
                                      lg: '15px !important',
                                    },
                                    paddingTop: {
                                      xs: '0px !important',
                                      lg: '0px !important',
                                    },
                                  }}
                                >
                                  <ItemImage
                                    productImageURL={
                                      productDetails &&
                                      ((categories && categories.imagepath) ||
                                        '') +
                                        changeImageSize(
                                          productDetails.imagefilename || '',
                                          productDetails.images || '',
                                        )
                                    }
                                    index={index1}
                                    className="item-image"
                                    name={itemChild.option.name}
                                    id={itemChild.option.chainoptionid}
                                    optionImages={optionImages}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={12}
                                  lg={7}
                                  className="name-panel"
                                >
                                  {itemChild.option.name}

                                  {itemChild.option.cost > 0 && (
                                    <Grid
                                      item
                                      xs={12}
                                      title={`$${parseFloat(
                                        itemChild.option.cost,
                                      ).toFixed(2)}`}
                                      sx={{
                                        paddingTop: '5px',
                                        fontSize: '14px',
                                        fontFamily: 'Poppins-Bold',
                                        color: '#7CC8C5',
                                        textAlign: { xs: 'center', lg: 'left' },
                                      }}
                                    >
                                      +$
                                      {parseFloat(
                                        itemChild.option.cost,
                                      ).toFixed(2)}
                                    </Grid>
                                  )}
                                  {itemChild.dropDownValues && (
                                    <>
                                      {checkOptionSelected(
                                        itemChild.option.id,
                                        itemMain.id,
                                      ) == true && (
                                        <select
                                          className="ss-panl"
                                          parent-select-option-id={itemChild.id}
                                          onClick={(e) => e.stopPropagation()}
                                          value={itemChild.selectedValue || '0'}
                                          data-select-id={
                                            itemChild.selectedValue || '0'
                                          }
                                          onChange={(e) =>
                                            dropDownValue(
                                              itemChild.option.id,
                                              e.target.value,
                                              itemChild.dropDownValues,
                                              e.target,
                                            )
                                          }
                                        >
                                          {itemChild.dropDownValues.map(
                                            (option: any, index: number) => (
                                              <option
                                                key={Math.random() + index}
                                                value={option.id}
                                                onClick={() => {
                                                  setTotalCost(
                                                    ((productDetails?.cost ||
                                                      0) +
                                                      option.cost) *
                                                      count,
                                                  );
                                                }}
                                              >
                                                {option.name +
                                                  (option.cost > 0
                                                    ? ' (+$' +
                                                      option.cost.toFixed(2) +
                                                      ')'
                                                    : '')}
                                              </option>
                                            ),
                                          )}
                                        </select>
                                      )}
                                    </>
                                  )}
                                </Grid>
                              </Grid>
                            </Card>
                          </label>
                        </Grid>
                      ))}
                  </Grid>
                ))}
            </div>
            <Grid container className="action-panel">
              <Grid item xs={12} className="content-panel">
                <div
                  style={{ display: 'flex', alignItems: 'center' }}
                  className="button-panel-sx"
                >
                  <label
                    title="Quantity"
                    className="label bold quantity-label"
                    htmlFor="quantityfield"
                  >
                    QUANTITY
                  </label>
                  <div className="quantity">
                    <Button
                      title=""
                      className="add"
                      aria-label="increase"
                      onClick={() => {
                        setCount(count + 1);
                        setTotalCost(
                          ((productDetails?.cost || 0) + optionsCost) *
                            (count + 1),
                        );
                      }}
                    >
                      {' '}
                      +{' '}
                    </Button>
                    <input
                      value={count}
                      // inputProps={inputProps}
                      id="quantityfield"
                      onChange={() => {}}
                      className="input-quantity"
                      title="quantity"
                    />
                    <Button
                      title=""
                      className="subtract"
                      aria-label="reduce"
                      onClick={() => {
                        setCount(Math.max(count - 1, 1));
                        setTotalCost(
                          ((productDetails?.cost || 0) + optionsCost) *
                            Math.max(count - 1, 1),
                        );
                      }}
                    >
                      {' '}
                      -{' '}
                    </Button>
                  </div>
                </div>
                {productAddObj.loading ||
                basketObj.loading ||
                dummyBasketObj.loading ||
                productUpdateObj.loading ||
                !validateOptionsSelection() ? (
                  <Button
                    title="ADD TO BAG"
                    className="add-to-bag"
                    variant="contained"
                    disabled
                  >
                    {edit ? 'UPDATE BAG' : 'ADD TO BAG'}
                    <span style={{ position: 'absolute', right: '15px' }}>
                      ${totalCost?.toFixed(2)}
                    </span>
                  </Button>
                ) : (
                  <Button
                    title="ADD TO BAG"
                    className="add-to-bag"
                    variant="contained"
                    onClick={() => {
                      addProductToBag();
                    }}
                  >
                    {edit ? 'UPDATE BAG' : 'ADD TO BAG'}
                    <span style={{ position: 'absolute', right: '15px' }}>
                      ${totalCost?.toFixed(2)}
                    </span>
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
