import {
  Grid,
  Typography,
  Card,
  Button,
  useMediaQuery,
  Switch,
  styled,
} from '@mui/material';
import './product.css';
import * as React from 'react';
import ProductOptionsSkeletonUI from '../../components/product-options-skeleton-ui';
import StoreInfoBar from '../../components/restaurant-info-bar';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoriesRequest } from '../../redux/actions/category';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Category,
  Product as ProductInfo,
  ResponseBasket,
  ResponseModifiers,
} from '../../types/olo-api';
import { DeliveryModeEnum } from '../../types/olo-api/olo-api.enums';
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
import { changeImageSize, checkTacoMatch } from '../../helpers/common';
import Page from '../../components/page-title';
import { facebookSendEvent } from '../../redux/actions/facebook-conversion';
import { facebookConversionTypes } from '../../redux/types/facebook-conversion';
import { convertMetaDataToOptions } from '../../helpers/product';
import { isLoginUser } from '../../helpers/auth';

import { SwitchProps } from '@mui/material/Switch';
import TagManager from 'react-gtm-module';
import ProductToggle from './product-toggle/productToggle';

const Product = () => {
  const { id, edit } = useParams();
  const isMobile = useMediaQuery('(max-width:468px)');
  const [productDetails, setProductDetails] = useState<ProductInfo>();
  const [productOptions, setProductOptions] = useState<ResponseModifiers>();
  const [basket, setBasket] = useState<ResponseBasket>();
  const [actionStatus, setActionStatus] = useState<boolean>(false);
  const [totalCost, setTotalCost] = useState<number>();
  const { categories, loading } = useSelector(
    (state: any) => state.categoryReducer,
  );
  const dummyBasketObj = useSelector((state: any) => state.createBasketReducer);
  const basketObj = useSelector((state: any) => state.basketReducer);
  const productAddObj = useSelector((state: any) => state.addProductReducer);
  const { authToken } = useSelector((state: any) => state.authReducer);
  const upsellsObj = useSelector((state: any) => state.getUpsellsReducer);
  const utensilsReducer = useSelector((state: any) => state.utensilsReducer);
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const productUpdateObj = useSelector(
    (state: any) => state.updateProductReducer,
  );
  const { options } = useSelector((state: any) => state.productOptionsReducer);
  const { restaurant, orderType } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  // const [toggle, setToggle] = useState('As is' || null);
  const objDeliveryAddress = useSelector(
    (state: any) => state.deliveryAddressReducer,
  );
  const [optionsSelectionArray, setOptionsSelectionArray] = useState<any>([]);
  const [basketType, setBasketType] = useState();
  const [count, setCount] = React.useState(1);
  // const [toggle, setToggle] = useState();
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
            fireProductViewEvent(product);
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
      const product = basketObj?.basket?.products?.find(
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
      dispatch(getCategoriesRequest(restaurant?.id));
    }
  }, [edit]);

  useEffect(() => {
    if (options && options.optiongroups && updatedOptions) {
      setUpdatedOptions(false);
      setProductOptions(options);
      const newOptions = convertMetaDataToOptions(options.optiongroups);
      prepareProductOptionsArray(newOptions, null, []);
      getOptionsImages(options.optiongroups);
      getTotalCost();
    }
  }, [options]);

  const fireProductViewEvent = (product: ProductInfo) => {

    const tagManagerArgs: any = {
      dataLayer: {
        event: 'eec.detail',
        ecommerce: {
          detail: {
            actionField: {
              list: 'view_item'
            }
          },
          products: [{
            id: product.id,
            name: product.name,
            category: product.categoryInfo?.name,
          }]
        }
      },
    };

    TagManager.dataLayer(tagManagerArgs);
    // TODO: Remove console logs
    console.log("Commerce Events:  product view", tagManagerArgs);
  }

  const fireAddToBagEvent = () => {
    const tagManagerArgs: any = {
      dataLayer: {
        event: 'eec.add',
        ecommerce: {
          add: {
            actionField: {
              list: productDetails?.categoryInfo?.name
            }
          },
          products: [{
            id: productDetails?.id,
            name: productDetails?.name,
            category: productDetails?.categoryInfo?.name,
            quantity: count
          }]
        }
      },
    };

    // TODO: Remove console logs
    console.log("Commerce Events: add product", tagManagerArgs);
    TagManager.dataLayer(tagManagerArgs);
  }

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

  const formatDeliveryAddress = () => {
    let obj: any = {
      building: objDeliveryAddress?.address?.address2 || '',
      streetaddress: objDeliveryAddress?.address?.address1 || '',
      city: objDeliveryAddress?.address?.city || '',
      zipcode: objDeliveryAddress?.address?.zip || '',
      isdefault: objDeliveryAddress?.address?.isdefault || false,
    };
    if (objDeliveryAddress?.address?.id) {
      obj['id'] = objDeliveryAddress?.address?.id;
    }
    return obj;
  };

  const addProductToBag = () => {
    if (basketObj.basket == null) {
      let payload: any = {};
      const request: any = {};
      let deliverymode: any = {
        deliverymode: orderType || '',
      };
      let deliveryAddress = null;
      payload.deliverymode = deliverymode;
      if (
        objDeliveryAddress &&
        objDeliveryAddress.address &&
        orderType === DeliveryModeEnum.dispatch
      ) {
        deliveryAddress = formatDeliveryAddress();
        payload.deliveryAddress = deliveryAddress;
      }

      request.vendorid = restaurant.id;
      if (isLoginUser()) {
        request.authtoken = authToken.authtoken;
      }
      payload.request = request;
      dispatch(setBasketRequest(payload));
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
              if (elem.option && elem.option.customDropDown) {
                options = options.replace(`${item},`, '');
              }
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
        // if (upsellsObj.upsells == null && basket) {
        //   dispatch(getUpsellsRequest(basket.id, basket.vendorid));
        // }
        dispatch(addProductRequest(basket?.id || '', request));
      }

    }
    fireAddToBagEvent();
    
    let userData: any = null;

    if (isLoginUser()) {
      userData = {
        first_name: providerToken?.first_name || '',
        last_name: providerToken?.last_name || '',
        email: providerToken?.email || '',
        phone: providerToken?.phone || '',
      };
    }

    dispatch(
      facebookSendEvent(
        facebookConversionTypes.FACEBOOK_ADD_CART_EVENT,
        userData,
        null,
      ),
    );    
  };

  useEffect(() => {
    if (dummyBasketObj.basket && basket == undefined && productDetails) {
      setBasket(dummyBasketObj.basket);
      dispatch(getBasketRequest('', dummyBasketObj.basket));
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
              if (elem.option && elem.option.customDropDown) {
                options = options.replace(`${item},`, '');
              }
            }
          });
        }
      });
      request.options = options;
      setActionStatus(true);
      dispatch(addProductRequest(dummyBasketObj.basket.id || '', request));
    }
    // debugger;
    // if (
    //   dummyBasketObj &&
    //   dummyBasketObj.basket &&
    //   dummyBasketObj.basket.id &&
    //   upsellsObj.upsells == null
    // ) {
    //   dispatch(
    //     getUpsellsRequest(
    //       dummyBasketObj.basket.id,
    //       dummyBasketObj.basket.vendorid,
    //     ),
    //   );
    // }
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
      // displayToast('SUCCESS', '1 item added to cart.');
      // dispatch(getBasketRequest('', productAddObj.basket, basketType));
      navigate(`/menu/${restaurant.slug}?cart=true`);
    }
  }, [productAddObj]);

  useEffect(() => {
    if (productUpdateObj && productUpdateObj.basket && actionStatus) {
      setBasket(productUpdateObj.basket);
      setActionStatus(false);
      displayToast('SUCCESS', '1 item updated in cart.');
      // dispatch(getBasketRequest('', productUpdateObj.basket, basketType));
      navigate(`/menu/${restaurant.slug}?cart=true`);
    }
  }, [productUpdateObj]);

  let ptotalCost = 0;

  const prepareProductOptionsArray = (
    options: any,
    parentID: any,
    parentDefaultOptionID: any[],
    isParentSelected: any = false,
    // products: option.products,
  ) => {
    options.map((itemMain: any, index0: number) => {
      let defaultOptionID: any = null;
      let defaultOptionsID: any = null;
      if (itemMain.options) {
        const item = itemMain.options.find(
          (item: any) => item.isdefault == true,
        );
        console.log(item, 'item');
        defaultOptionID = (item && item.id) || null;
      }
      // console.log(defaultOptionID, 'defaultOptionID');
      // debugger;
      // if (itemMain?.options) {
      //   defaultOptionsID = itemMain.options
      //     .filter((it: any) => it.isdefault)
      //     .map((item: any) => item.id || null);
      // }

      // if (itemMain?.options) {
      //   defaultOptionID = itemMain.options
      //     .filter((it: any) => it.isdefault)
      //     .map((item: any) => item.id || null);
      // if (defaultOptionsID.length > 1) {
      //   defaultOptionID = defaultOptionsID.map(
      //     (item: any) => item.id || null,
      //   );
      // } else {
      //   defaultOptionID = defaultOptionsID[0];
      // }
      // }

      // console.log(defaultOptionID[0], 'defaultOptionID');
      let editOptions: any[] = [];
      let optionsArray: any[] = [];
      itemMain.options.map((option: any) => {
        if (
          (itemMain.description &&
            itemMain.description.toLowerCase().indexOf('remove or modify') !==
              -1) ||
          option.customDropDown
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
        if (option.customDropDown) {
          if (
            selectCustomDropDownOptionIdIfExist(option.modifiers[0].options)
          ) {
            editOptions.push(option.id);
          }
        }
        if (isExistInEdit(option.id)) {
          ptotalCost = ptotalCost + option.cost;
          getTotalCost(
            productDetails?.cost || 0 + ptotalCost || 0 * count || 0,
          );
          editOptions.push(option.id);
        }
        if (!isExistInEdit(option.id) && defaultOptionID == option.id) {
          ptotalCost = ptotalCost + option.cost;
          getTotalCost(
            productDetails?.cost || 0 + ptotalCost || 0 * count || 0,
          );
        }
      });
      // let defaultOptions: any = null;
      // console.log(defaultOptionID[0], 'defaultOptionID[0]');
      // if ()
      // debugger;
      let selectedOptions: any[] =
        editOptions.length > 0
          ? editOptions
          : defaultOptionID
          ? [defaultOptionID]
          : [];
      // if (itemMain.description === 'Pick your sides') {
      //   selectedOptions = selectedOptions.length < 3;
      // }
      // debugger;
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
      console.log(parentDefaultOptionID, 'parentDefaultOptionID');
      if (
        itemMain.description &&
        itemMain.description.toLowerCase().indexOf('remove or modify') == -1
      ) {
        itemMain.options.map((item: any, index2: number) => {
          if (item.customDropDown) {
            return;
          } else {
            return (
              item.modifiers &&
              prepareProductOptionsArray(
                item.modifiers,
                item.id,
                selectedOptions,
                (isParentSelected &&
                  parentDefaultOptionID.includes(parentID)) ||
                  parentID == null,
              )
            );
          }
        });
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
        const op = options.find((x: any) => item.optionid == x.id);
        if (op) {
          isExist = item.optionid;
          ptotalCost = ptotalCost + op.cost;
          setOptionsCost(ptotalCost);
        }
      });
    }
    if (isExist == null) isExist = options[0].id;
    return isExist;
  };

  const selectCustomDropDownOptionIdIfExist = (options: any) => {
    let isExist = false;
    if (edit) {
      const product = basketObj.basket.products.find(
        (item: any) => item.id == edit,
      );
      product.choices.map((item: any, index: number) => {
        const op = options.find((x: any) => item.optionid == x.id);
        if (op) {
          isExist = true;
        }
      });
    }
    return isExist;
  };

  const [selectionExecute, setSelectionExecute] = useState(false);

  const showChildOptions = (
    optionId: number,
    parnetOptionID: number,
    optionsDDL: any = null,
    optionsDDLSelectedID: any = null,
  ) => {
    setSelectionExecute(false);
    setTimeout(() => {
      setSelectionExecute(false);
    }, 200);
    let optionPrice = optionsCost;
    let totalPrice = totalCost || 0;
    optionsSelectionArray.map((item: any) => {
      if (item.id === parnetOptionID) {
        if (item.mandatory) {
          if (item.selectedOptions.includes(optionId)) {
            const option = item.options.find(
              (option: any) => option.optionID == item.selectedOptions[0],
            );

            let mainOptionCost = 0;
            if (option) {
              mainOptionCost = option.option.cost;
            }
            item.selectedOptions = [];
            let elems = optionsSelectionArray.filter(
              (x: any) => x.parentOptionID == optionId,
            );
            if (elems) {
              elems.map((x: any) => {
                x.selected = false;
                x.selectedOptions.map((mainChild: any) => {
                  let elemSelected = optionsSelectionArray.filter(
                    (i: any) => i.parentOptionID == mainChild,
                  );
                  let elemChildSelected = x.options.find(
                    (i: any) => i.optionID == mainChild,
                  );
                  if (elemChildSelected) {
                    mainOptionCost =
                      mainOptionCost + elemChildSelected.option.cost;
                    if (
                      elemChildSelected.dropDownValues &&
                      elemChildSelected.selectedValue
                    ) {
                      let ddl_op = elemChildSelected.dropDownValues.find(
                        (i: any) => i.id == elemChildSelected.selectedValue,
                      );
                      if (ddl_op) {
                        mainOptionCost = mainOptionCost + ddl_op.cost;
                      }
                    }
                  }
                  if (elemSelected && elemSelected.length > 0) {
                    elemSelected.map((ss: any) => {
                      ss.selected = false;
                      if (ss.selectedOptions.length > 0) {
                        let xelemChildSelected = optionsSelectionArray.filter(
                          (i: any) => i.parentOptionID == ss.selectedOptions[0],
                        );
                        if (xelemChildSelected.length > 0) {
                          xelemChildSelected.map((xc: any) => {
                            xc.selected = false;
                            xc.selectedOptions.map((child: any) => {
                              let elemChildSelected = xc.options.find(
                                (i: any) => i.optionID == child,
                              );
                              if (
                                elemChildSelected &&
                                xelemChildSelected.selected
                              ) {
                                mainOptionCost =
                                  mainOptionCost +
                                  elemChildSelected.option.cost;
                                if (elemChildSelected.selectedValue) {
                                  const ddlSelected =
                                    elemChildSelected.dropDownValues.find(
                                      (i: any) =>
                                        i.id == elemChildSelected.selectedValue,
                                    );
                                  if (ddlSelected) {
                                    mainOptionCost =
                                      mainOptionCost + ddlSelected.cost;
                                  }
                                  elemChildSelected.selectedValue =
                                    elemChildSelected.dropDownValues[0].id;
                                }
                              }
                            });
                          });
                        } else {
                          ss.selectedOptions.map((child: any) => {
                            xelemChildSelected = ss.options.find(
                              (i: any) => i.optionID == child,
                            );
                            if (xelemChildSelected) {
                              mainOptionCost =
                                mainOptionCost + xelemChildSelected.option.cost;
                              if (xelemChildSelected.selectedValue) {
                                const ddlSelected =
                                  xelemChildSelected.dropDownValues.find(
                                    (i: any) =>
                                      i.id == xelemChildSelected.selectedValue,
                                  );
                                if (ddlSelected) {
                                  mainOptionCost =
                                    mainOptionCost + ddlSelected.cost;
                                }
                                xelemChildSelected.selectedValue =
                                  xelemChildSelected.dropDownValues[0].id;
                              }
                            }
                          });
                        }
                      }
                      ss.selectedOptions = ss.defaultOption
                        ? [ss.defaultOption]
                        : [];
                    });
                  }
                });
                x.selectedOptions = x.defaultOption ? [x.defaultOption] : [];
              });
            }
            optionPrice -= mainOptionCost;
            totalPrice = totalPrice - mainOptionCost * count;
            // setOptionsCost(optionsCost - mainOptionCost);
            // setTotalCost((totalCost || 0) - mainOptionCost * count);
          } else {
            const optionX = item.options.find(
              (option: any) => option.optionID == item.selectedOptions[0],
            );
            let mainOptionCost = 0;
            if (optionX) {
              mainOptionCost = optionX.option.cost;
            }
            let elems = optionsSelectionArray.filter(
              (x: any) => x.parentOptionID == item.selectedOptions[0],
            );
            if (elems) {
              elems.map((x: any) => {
                x.selected = false;
                x.selectedOptions.map((mainChild: any) => {
                  let elemSelected = optionsSelectionArray.filter(
                    (i: any) => i.parentOptionID == mainChild,
                  );
                  let elemChildSelected = x.options.find(
                    (i: any) => i.optionID == mainChild,
                  );
                  if (elemChildSelected) {
                    mainOptionCost =
                      mainOptionCost + elemChildSelected.option.cost;
                    if (
                      elemChildSelected.dropDownValues &&
                      elemChildSelected.selectedValue
                    ) {
                      let ddl_op = elemChildSelected.dropDownValues.find(
                        (i: any) => i.id == elemChildSelected.selectedValue,
                      );
                      if (ddl_op) {
                        mainOptionCost = mainOptionCost + ddl_op.cost;
                      }
                    }
                  }
                  if (elemSelected && elemSelected.length > 0) {
                    elemSelected.map((ss: any) => {
                      ss.selected = false;
                      if (ss.selectedOptions.length > 0) {
                        let xelemChildSelected = optionsSelectionArray.filter(
                          (i: any) => i.parentOptionID == ss.selectedOptions[0],
                        );
                        if (xelemChildSelected.length > 0) {
                          xelemChildSelected.map((xc: any) => {
                            xc.selected = false;
                            xc.selectedOptions.map((child: any) => {
                              let elemChildSelected = xc.options.find(
                                (i: any) => i.optionID == child,
                              );
                              if (
                                elemChildSelected &&
                                xelemChildSelected.selected
                              ) {
                                mainOptionCost =
                                  mainOptionCost +
                                  elemChildSelected.option.cost;
                                if (elemChildSelected.selectedValue) {
                                  const ddlSelected =
                                    elemChildSelected.dropDownValues.find(
                                      (i: any) =>
                                        i.id == elemChildSelected.selectedValue,
                                    );
                                  if (ddlSelected) {
                                    mainOptionCost =
                                      mainOptionCost + ddlSelected.cost;
                                  }
                                  elemChildSelected.selectedValue =
                                    elemChildSelected.dropDownValues[0].id;
                                }
                              }
                            });
                          });
                        } else {
                          ss.selectedOptions.map((child: any) => {
                            xelemChildSelected = ss.options.find(
                              (i: any) => i.optionID == child,
                            );
                            if (xelemChildSelected) {
                              mainOptionCost =
                                mainOptionCost + xelemChildSelected.option.cost;
                              if (xelemChildSelected.selectedValue) {
                                const ddlSelected =
                                  xelemChildSelected.dropDownValues.find(
                                    (i: any) =>
                                      i.id == xelemChildSelected.selectedValue,
                                  );
                                if (ddlSelected) {
                                  mainOptionCost =
                                    mainOptionCost + ddlSelected.cost;
                                }
                                xelemChildSelected.selectedValue =
                                  xelemChildSelected.dropDownValues[0].id;
                              }
                            }
                          });
                        }
                      }
                      ss.selectedOptions = ss.defaultOption
                        ? [ss.defaultOption]
                        : [];
                    });
                  }
                });
                x.selectedOptions = x.defaultOption ? [x.defaultOption] : [];
              });
            }
            item.selectedOptions = [optionId];
            item.selected = true;
            const option = item.options.find(
              (option: any) => option.optionID == optionId,
            );
            if (option) {
              const prc = option.option.cost * count;
              optionPrice = optionPrice - mainOptionCost + option.option.cost;
              totalPrice = totalPrice - mainOptionCost + prc;
              // setOptionsCost(optionsCost - mainOptionCost + option.option.cost);
              // setTotalCost((totalCost || 0) - mainOptionCost + prc);
            }
            elems = optionsSelectionArray.filter(
              (x: any) => x.parentOptionID == optionId,
            );
            if (elems) {
              elems.map((x: any) => {
                x.selected = true;
                let elemSelected = optionsSelectionArray.filter(
                  (i: any) => i.parentOptionID == x.selectedOptions[0],
                );
                if (elemSelected && elemSelected.length > 0) {
                  elemSelected.map((ss: any) => {
                    ss.selected = true;
                    if (ss.selectedOptions.length > 0) {
                      let elemSelectedx = optionsSelectionArray.find(
                        (i: any) => i.parentOptionID == ss.selectedOptions[0],
                      );
                      if (elemSelectedx) {
                        elemSelectedx.selected = true;
                      }
                    }
                  });
                }
              });
            }
          }
        } else {
          if (item.selectedOptions.includes(optionId)) {
            const index = item.selectedOptions.indexOf(optionId);

            if (index > -1) {
              let optionDDLE = null;
              if (optionsDDL && optionsDDLSelectedID) {
                optionDDLE = optionsDDL.find(
                  (option: any) => option.id == optionsDDLSelectedID,
                );
              }

              item.selectedOptions.splice(index, 1);
              const option = item.options.find(
                (option: any) => option.optionID == optionId,
              );

              if (option) {
                const prc =
                  ((optionDDLE ? optionDDLE.cost : 0) + option.option.cost) *
                  count;
                optionPrice =
                  optionPrice -
                  ((optionDDLE ? optionDDLE.cost : 0) + option.option.cost);
                // setOptionsCost(
                //   optionsCost -
                //     ((optionDDLE ? optionDDLE.cost : 0) + option.option.cost),
                // );

                totalPrice -= prc;
                // setTotalCost((totalCost || 0) - prc);
              }

              //item.selected = !(item.selectedOptions.length == 0);
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
            // debugger;
            const option = item.options.find(
              (option: any) => option.optionID == optionId,
            );
            let optionDDLE = null;
            if (optionsDDL && optionsDDLSelectedID) {
              optionDDLE = optionsDDL.find(
                (option: any) => option.id == optionsDDLSelectedID,
              );
            }
            if (option) {
              const cc =
                optionsCost +
                (optionDDLE ? optionDDLE.cost : 0) +
                option.option.cost;
              optionPrice = cc;
              // setOptionsCost(cc);
              const opc =
                ((optionDDLE ? optionDDLE.cost : 0) + option.option.cost) *
                count;
              totalPrice += opc;
              // setTotalCost((totalCost || 0) + opc);
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
    setOptionsCost(optionPrice);
    setTotalCost(totalPrice);
    setOptionsSelectionArray((optionsSelectionArray: any) => [
      ...optionsSelectionArray,
    ]);
  };
  const showChildToggleOptions = (optionId: number, parnetOptionID: number) => {
    setSelectionExecute(false);
    setTimeout(() => {
      setSelectionExecute(false);
    }, 200);
    let optionPrice = optionsCost;
    let totalPrice = totalCost || 0;
    optionsSelectionArray.map((item: any) => {
      if (item.id === parnetOptionID) {
        if (item.mandatory) {
          if (!item.selectedOptions.includes(optionId)) {
            const optionX = item.options.find(
              (option: any) => option.optionID == item.selectedOptions[0],
            );
            let mainOptionCost = 0;
            if (optionX) {
              mainOptionCost = optionX.option.cost;
            }
            let elems = optionsSelectionArray.filter(
              (x: any) => x.parentOptionID == item.selectedOptions[0],
            );
            if (elems) {
              elems.map((x: any) => {
                x.selected = false;
                x.selectedOptions.map((mainChild: any) => {
                  let elemSelected = optionsSelectionArray.filter(
                    (i: any) => i.parentOptionID == mainChild,
                  );
                  let elemChildSelected = x.options.find(
                    (i: any) => i.optionID == mainChild,
                  );
                  if (elemChildSelected) {
                    mainOptionCost =
                      mainOptionCost + elemChildSelected.option.cost;
                    if (
                      elemChildSelected.dropDownValues &&
                      elemChildSelected.selectedValue
                    ) {
                      let ddl_op = elemChildSelected.dropDownValues.find(
                        (i: any) => i.id == elemChildSelected.selectedValue,
                      );
                      if (ddl_op) {
                        mainOptionCost = mainOptionCost + ddl_op.cost;
                      }
                    }
                  }
                  if (elemSelected && elemSelected.length > 0) {
                    elemSelected.map((ss: any) => {
                      ss.selected = false;
                      if (ss.selectedOptions.length > 0) {
                        let xelemChildSelected = optionsSelectionArray.filter(
                          (i: any) => i.parentOptionID == ss.selectedOptions[0],
                        );
                        if (xelemChildSelected.length > 0) {
                          xelemChildSelected.map((xc: any) => {
                            xc.selected = false;
                            xc.selectedOptions.map((child: any) => {
                              let elemChildSelected = xc.options.find(
                                (i: any) => i.optionID == child,
                              );
                              if (
                                elemChildSelected &&
                                xelemChildSelected.selected
                              ) {
                                mainOptionCost =
                                  mainOptionCost +
                                  elemChildSelected.option.cost;
                                if (elemChildSelected.selectedValue) {
                                  const ddlSelected =
                                    elemChildSelected.dropDownValues.find(
                                      (i: any) =>
                                        i.id == elemChildSelected.selectedValue,
                                    );
                                  if (ddlSelected) {
                                    mainOptionCost =
                                      mainOptionCost + ddlSelected.cost;
                                  }
                                  elemChildSelected.selectedValue =
                                    elemChildSelected.dropDownValues[0].id;
                                }
                              }
                            });
                          });
                        } else {
                          ss.selectedOptions.map((child: any) => {
                            xelemChildSelected = ss.options.find(
                              (i: any) => i.optionID == child,
                            );
                            if (xelemChildSelected) {
                              mainOptionCost =
                                mainOptionCost + xelemChildSelected.option.cost;
                              if (xelemChildSelected.selectedValue) {
                                const ddlSelected =
                                  xelemChildSelected.dropDownValues.find(
                                    (i: any) =>
                                      i.id == xelemChildSelected.selectedValue,
                                  );
                                if (ddlSelected) {
                                  mainOptionCost =
                                    mainOptionCost + ddlSelected.cost;
                                }
                                xelemChildSelected.selectedValue =
                                  xelemChildSelected.dropDownValues[0].id;
                              }
                            }
                          });
                        }
                      }
                      ss.selectedOptions = ss.defaultOption
                        ? [ss.defaultOption]
                        : [];
                    });
                  }
                });
                x.selectedOptions = x.defaultOption ? [x.defaultOption] : [];
              });
            }
            item.selectedOptions = [optionId];
            item.selected = true;
            const option = item.options.find(
              (option: any) => option.optionID == optionId,
            );
            if (option) {
              const prc = option.option.cost * count;
              optionPrice = optionPrice - mainOptionCost + option.option.cost;
              totalPrice = totalPrice - mainOptionCost + prc;
              // setOptionsCost(optionsCost - mainOptionCost + option.option.cost);
              // setTotalCost((totalCost || 0) - mainOptionCost + prc);
            }
            elems = optionsSelectionArray.filter(
              (x: any) => x.parentOptionID == optionId,
            );
            if (elems) {
              elems.map((x: any) => {
                x.selected = true;
                let elemSelected = optionsSelectionArray.filter(
                  (i: any) => i.parentOptionID == x.selectedOptions[0],
                );
                if (elemSelected && elemSelected.length > 0) {
                  elemSelected.map((ss: any) => {
                    ss.selected = true;
                    if (ss.selectedOptions.length > 0) {
                      let elemSelectedx = optionsSelectionArray.find(
                        (i: any) => i.parentOptionID == ss.selectedOptions[0],
                      );
                      if (elemSelectedx) {
                        elemSelectedx.selected = true;
                      }
                    }
                  });
                }
              });
            }
          }
        }
      }
    });
    setOptionsCost(optionPrice);
    setTotalCost(totalPrice);
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
      // debugger;
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
        itemP.selected == true &&
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
    let optionPrice = optionsCost;
    let totalPrice = totalCost || 0;
    if (option) {
      const prc = option.cost * count;
      optionPrice = optionPrice - option.cost;
      totalPrice -= prc;
    }
    const optionAdd = options.find((x: any) => x.id == value);
    if (optionAdd) {
      const prc = optionAdd.cost * count;
      optionPrice = optionPrice + optionAdd.cost;
      totalPrice += prc;
    }
    setOptionsCost(optionPrice);
    setTotalCost(totalPrice);
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

  const checkDisable = () => {
    return (
      productDetails &&
      productDetails.id === utensilsReducer.utensilsProductId &&
      basketObj &&
      basketObj.basket &&
      basketObj.basket.products &&
      basketObj.basket.products.length > 0 &&
      basketObj.basket.products.filter(
        (obj: any) => obj.productId === utensilsReducer.utensilsProductId,
      ).length > 0
    );
  };

  const noWordpressImageFound = (
    optionImages: any,
    id: any,
    name: any,
    isdefault: boolean,
  ) => {
    let check = true;
    if (optionImages && optionImages.length) {
      optionImages.forEach((item: any) => {
        if (process.env.REACT_APP_NODE_ENV !== 'production') {
          if (item.sandbox_plu_names.indexOf(id.toString()) !== -1) {
            check = false;
          }
        } else {
          if (item.production_plu_names.indexOf(id.toString()) !== -1) {
            check = false;
          }
        }

        if (
          name.toLowerCase().indexOf('no rice') !== -1 ||
          checkTacoMatch(name, isdefault) ||
          name.toLowerCase().indexOf('no beans') !== -1 ||
          name.toLowerCase() === 'customize' ||
          name.toLowerCase() === 'as is'
        ) {
          check = false;
        }
      });
    }
    return check;
  };
  return (
    <Page title={'Product Detail'} className="">
      <div style={{ minHeight: '500px' }}>
        <Typography variant="h1" className="sr-only">
          Product details
        </Typography>
        <StoreInfoBar />
        {loading == true &&
          productDetails == null &&
          productOptions == null && <ProductSkeletonUI />}
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
                    dangerouslySetInnerHTML={{
                      __html: productDetails?.name?.includes('®')
                        ? productDetails?.name?.replace('®', '<sup>®</sup>')
                        : productDetails.name,
                    }}
                  ></Typography>
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
                      <Grid item xs={4.5} sx={{ marginRight: '15px' }}>
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
                          variant="body1"
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
                          process.env.REACT_APP_NODE_ENV === 'production'
                            ? 'marketplace-product'
                            : 'desktop-menu',
                        )
                      }
                      alt=""
                      className="img"
                      title={productDetails.name}
                    />
                  ) : (
                    <img
                      style={{ width: '80%', display: 'block', margin: 'auto' }}
                      alt=""
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
                {!optionsSelectionArray ||
                  (optionsSelectionArray.length < 0 && (
                    <ProductOptionsSkeletonUI />
                  ))}
                {optionsSelectionArray.length > 0 &&
                  optionsSelectionArray.map((itemMain: any, index0: number) => (
                    <fieldset
                      key={Math.random() + index0}
                      className="field-set"
                      style={{
                        border: '0',
                        boxShadow: 'none',
                        display:
                          itemMain.id == itemMain.parentOptionID ||
                          selectedParentOption(itemMain.parentOptionID)
                            ? 'flex'
                            : 'none',
                      }}
                    >
                      <legend
                        className={`heading-ui ${
                          itemMain.parentOptionID == itemMain.id ? 'h2' : 'h3'
                        }`}
                      >
                        {itemMain?.name?.replace('As is or Customize?', '')}
                        {IsItemSelected(itemMain.id) && (
                          <span
                            role="alert"
                            style={{
                              fontSize: '16px',
                              color: '#b91a2e',
                              paddingLeft: '10px',
                            }}
                            id={`required-label-${index0}`}
                          >
                            (Required)
                          </span>
                        )}
                      </legend>

                      <Grid
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
                        {!itemMain.options ||
                          (itemMain.options.length < 0 && (
                            <ProductOptionsSkeletonUI />
                          ))}

                        {itemMain.name === 'As is or Customize?' ? (
                          // asIs &&
                          // customize &&
                          <ProductToggle
                            // toggle={toggle}
                            // setToggle={setToggle}
                            showChildToggleOptions={showChildToggleOptions}
                            main={itemMain}
                          />
                        ) : null}
                        {itemMain?.options &&
                          itemMain?.options
                            .filter(
                              (item: any) =>
                                !(
                                  item.option.name === 'As is' ||
                                  item.option.name === 'Customize'
                                ),
                            )
                            .map((itemChild: any, index1: number) => (
                              <>
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
                                  sm={3}
                                  md={3}
                                  lg={4}
                                  sx={{ position: 'relative' }}
                                >
                                  {itemMain.mandatory ? (
                                    <input
                                      aria-invalid={
                                        IsItemSelected(itemMain.id) &&
                                        index1 == 0
                                          ? 'true'
                                          : 'false'
                                      }
                                      aria-describedby={
                                        index1 == 0
                                          ? `required-label-${index0}`
                                          : ''
                                      }
                                      checked={checkOptionSelected(
                                        itemChild.option.id,
                                        itemMain.id,
                                      )}
                                      style={{
                                        opacity: 0,
                                        position: 'absolute',
                                        zIndex: 1000,
                                      }}
                                      type="radio"
                                      id={itemChild.option.id}
                                      value={itemChild.option.name}
                                      onChange={() => {
                                        showChildOptions(
                                          itemChild.option.id,
                                          itemMain.id,
                                          itemChild.dropDownValues,
                                          itemChild.selectedValue,
                                        );
                                      }}
                                    />
                                  ) : (
                                    <input
                                      aria-invalid={
                                        IsItemSelected(itemMain.id) &&
                                        index1 == 0
                                          ? 'true'
                                          : 'false'
                                      }
                                      aria-describedby={
                                        index1 == 0
                                          ? `required-label-${index0}`
                                          : ''
                                      }
                                      checked={checkOptionSelected(
                                        itemChild.option.id,
                                        itemMain.id,
                                      )}
                                      style={{
                                        opacity: 0,
                                        position: 'absolute',
                                        zIndex: 1000,
                                      }}
                                      type="checkbox"
                                      id={itemChild.option.id}
                                      value={itemChild.option.name}
                                      onChange={() => {
                                        showChildOptions(
                                          itemChild.option.id,
                                          itemMain.id,
                                          itemChild.dropDownValues,
                                          itemChild.selectedValue,
                                        );
                                      }}
                                    />
                                  )}
                                  <label
                                    htmlFor={itemChild.option.id}
                                    onClick={() => {
                                      showChildOptions(
                                        itemChild.option.id,
                                        itemMain.id,
                                        itemChild.dropDownValues,
                                        itemChild.selectedValue,
                                      );
                                    }}
                                    onKeyUp={(e) => {
                                      if (e.keyCode === 13)
                                        showChildOptions(
                                          itemChild.option.id,
                                          itemMain.id,
                                          itemChild.dropDownValues,
                                          itemChild.selectedValue,
                                        );
                                    }}
                                  >
                                    <Card
                                      className={`card-panel ${
                                        noWordpressImageFound(
                                          optionImages,
                                          itemChild.option.chainoptionid,
                                          itemChild.option.name,
                                          itemChild.option.isdefault,
                                        )
                                          ? 'no-image-class'
                                          : ''
                                      }`}
                                      title={itemChild.option.name}
                                      is-mandatory={itemMain.mandatory.toString()}
                                      parent-option-id={itemMain.parentOptionID}
                                    >
                                      <div className="check-mark">
                                        <div
                                          aria-hidden="true"
                                          className="checkmark"
                                        >
                                          L
                                        </div>
                                      </div>
                                      <Grid
                                        container
                                        spacing={1}
                                        style={{ width: '100%' }}
                                        className="name-img-panel"
                                        sx={{ padding: '0', marginTop: '0' }}
                                      >
                                        <Grid
                                          item
                                          xs={12}
                                          lg={5}
                                          sx={{
                                            width: '120px',
                                            maxWidth: {
                                              lg: '120px',
                                              xs: 'auto',
                                            },
                                            height: '120px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: '0px',
                                            paddingLeft: {
                                              xs: '0px !important',
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
                                              ((categories &&
                                                categories.imagepath) ||
                                                '') +
                                                changeImageSize(
                                                  productDetails.imagefilename ||
                                                    '',
                                                  productDetails.images || '',
                                                  'desktop-menu',
                                                )
                                            }
                                            index={index1}
                                            className="item-image"
                                            name={itemChild.option.name}
                                            id={itemChild.option.chainoptionid}
                                            optionImages={optionImages}
                                            isdefault={
                                              itemChild.option.isdefault
                                            }
                                          />
                                        </Grid>
                                        <Grid
                                          item
                                          xs={12}
                                          lg={7}
                                          className="name-panel"
                                        >
                                          {itemChild.option.name}
                                          <div
                                            className={'options-cals-price'}
                                            style={{ display: 'flex' }}
                                          >
                                            {itemChild.option.cost > 0 && (
                                              <span
                                                className={'value'}
                                                title={`$${parseFloat(
                                                  itemChild.option.cost,
                                                ).toFixed(2)}`}
                                                style={{
                                                  fontSize: '11px',
                                                  fontFamily:
                                                    "'Sunborn-Sansone' !important",
                                                  color: '#0075BF',
                                                }}
                                              >
                                                +$
                                                {parseFloat(
                                                  itemChild.option.cost,
                                                ).toFixed(2)}
                                              </span>
                                            )}
                                            {itemChild.option.cost > 0 &&
                                              itemChild.option.basecalories && (
                                                <span
                                                  style={{
                                                    fontSize: '16px',
                                                    fontFamily:
                                                      "'Librefranklin-Regular' !important",
                                                    color: '#AAA',
                                                    marginTop: '-2%',
                                                  }}
                                                >
                                                  &nbsp;|&nbsp;
                                                </span>
                                              )}
                                            {itemChild.option.basecalories && (
                                              <span
                                                style={{
                                                  fontSize: '11px',
                                                  fontFamily:
                                                    "'Sunborn-Sansone' !important",
                                                  color: '#0075BF',
                                                }}
                                              >
                                                +{' '}
                                                {itemChild.option.basecalories +
                                                  ' Cals'}
                                              </span>
                                            )}
                                            {itemChild.option.maxcalories &&
                                              itemChild.option.basecalories && (
                                                <span
                                                  style={{
                                                    fontSize: '16px',
                                                    fontFamily:
                                                      "'Librefranklin-Regular' !important",
                                                    color: '#AAA',
                                                    marginTop: '-2%',
                                                  }}
                                                >
                                                  &nbsp;|&nbsp;
                                                </span>
                                              )}
                                            {itemChild.option.maxcalories && (
                                              <span
                                                style={{
                                                  fontSize: '11px',
                                                  fontFamily:
                                                    "'Sunborn-Sansone' !important",
                                                  color: '#0075BF',
                                                }}
                                              >
                                                +
                                                {itemChild.option.maxcalories +
                                                  ' Cals'}
                                              </span>
                                            )}
                                          </div>
                                          {itemChild.dropDownValues && (
                                            <>
                                              {checkOptionSelected(
                                                itemChild.option.id,
                                                itemMain.id,
                                              ) == true && (
                                                <div
                                                  style={{
                                                    position: 'relative',
                                                  }}
                                                >
                                                  <select
                                                    className="ss-panl"
                                                    parent-select-option-id={
                                                      itemChild.id
                                                    }
                                                    onClick={(e) =>
                                                      e.stopPropagation()
                                                    }
                                                    value={
                                                      itemChild.selectedValue ||
                                                      '0'
                                                    }
                                                    data-select-id={
                                                      itemChild.selectedValue ||
                                                      '0'
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
                                                      (
                                                        option: any,
                                                        index: number,
                                                      ) => (
                                                        <option
                                                          key={
                                                            Math.random() +
                                                            index
                                                          }
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
                                                                option.cost.toFixed(
                                                                  2,
                                                                ) +
                                                                ')'
                                                              : '')}
                                                        </option>
                                                      ),
                                                    )}
                                                  </select>
                                                </div>
                                              )}
                                            </>
                                          )}
                                        </Grid>
                                      </Grid>
                                    </Card>
                                  </label>
                                </Grid>
                              </>
                            ))}
                      </Grid>
                    </fieldset>
                  ))}
              </div>
              <Grid container className="action-panel">
                <Grid item xs={12} className="content-panel">
                  {productDetails &&
                  productDetails.id !== utensilsReducer.utensilsProductId ? (
                    <div
                      style={{ display: 'flex', alignItems: 'center' }}
                      className="button-panel-sx"
                    >
                      {isMobile ? (
                        <label
                          title="Quantity"
                          id={'quantity-label-id'}
                          className="label bold quantity-label"
                          htmlFor="quantityfield"
                        >
                          QTY
                        </label>
                      ) : (
                        <label
                          title="Quantity"
                          id={'quantity-label-id'}
                          className="label bold quantity-label"
                          htmlFor="quantityfield"
                        >
                          QUANTITY
                        </label>
                      )}
                      <div className="quantity">
                        <Button
                          title=""
                          className="subtract"
                          aria-label="reduce"
                          sx={{
                            marginLeft: {
                              xs: '5px',
                            },
                          }}
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
                        <input
                          value={count}
                          readOnly
                          id="quantityfield"
                          onChange={() => {}}
                          className="input-quantity"
                          title="quantity"
                        />
                        <Button
                          title=""
                          className="add"
                          aria-label="increase"
                          sx={{
                            marginRight: {
                              xs: 'inherit',
                            },
                          }}
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
                      </div>
                    </div>
                  ) : null}
                  {productAddObj.loading ||
                  basketObj.loading ||
                  dummyBasketObj.loading ||
                  productUpdateObj.loading ||
                  !validateOptionsSelection() ? (
                    <Button
                      id="AddProductToBasket"
                      data-test-button="addToCart"
                      title="ADD TO BAG"
                      className="add-to-bag"
                      sx={{ letterSpacing: '0px !important' }}
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
                      id="AddProductToBasket"
                      data-test-button="addToCart"
                      title="ADD TO BAG"
                      className="add-to-bag"
                      variant="contained"
                      data-product-name={`${productDetails?.name || ''}`}
                      data-product-id={`${
                        productDetails?.chainproductid || ''
                      }`}
                      data-product-price={`${totalCost?.toFixed(2)}`}
                      sx={{ letterSpacing: '0px !important' }}
                      disabled={checkDisable()}
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
    </Page>
  );
};

export default Product;
