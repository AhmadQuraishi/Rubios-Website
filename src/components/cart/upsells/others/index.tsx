import {
  Grid,
  Typography,
  Theme,
  Box,
  Divider,
  Button,
  Card,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import crossIcon from '../../../assets/imgs/close.png';
import { getBasketRequest } from '../../../../redux/actions/basket';
import { removeProductRequest } from '../../../../redux/actions/basket/product/remove';
import { addProductRequest } from '../../../../redux/actions/basket/product/add';
import { displayToast } from '../../../../helpers/toast';
import { addUpsellsRequest } from '../../../../redux/actions/basket/upsell/Add';
import { UPSELLS, UPSELLS_TYPES } from '../../../../helpers/upsells';
import { capitalizeFirstLetter } from '../../../../helpers/common';
import { Category, Product as ProductInfo } from '../../../../types/olo-api';
import { addMultipleProductsRequest } from '../../../../redux/actions/basket/addMultipleProducts';
import ItemImage from '../../../item-image';
import './index.css';

const useStyles = makeStyles((theme: Theme) => ({
  dimPanel: {
    position: 'fixed',
    background: 'rgba(0, 0, 0, 0.5)',
    top: 0,
    right: 400,
    width: '100%',
    height: '100vh',
    zIndex: 1101,
    [theme.breakpoints.down('xl')]: {
      display: 'block !important',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  cartBox: {
    border: '1px solid #666',
    borderTop: '0',
    borderRight: '0',
    position: 'fixed',
    background: '#fff',
    top: 0,
    right: 400,
    width: '100%',
    height: '100%',
    zIndex: 9999,
    [theme.breakpoints.up('md')]: {
      maxWidth: '600px',
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: '600px',
    },
    [theme.breakpoints.up('xs')]: {
      maxWidth: 'auto !important',
    },
  },
  cartRoot: {
    position: 'relative',
    padding: '35px 5px 10px 30px',
  },
  cartTitle: {
    color: theme.palette.secondary.main,
    textTransform: 'uppercase',
    fontSize: '25px !important',
    fontWeight: '700',
    fontFamily: 'Poppins-Bold !important',
    padding: '10px 0px 18px 0px',
  },
  crossIcon: {
    position: 'absolute',
    top: '15px !important',
    right: '10px !important',
    display: 'flex !important',

    justifyContent: 'right !important',
    '& img': {
      cursor: 'pointer',
    },
  },
  smallLink: {
    color: '#0075BF !important',
    fontSize: '11px !important',
    fontFamily: "'Poppins-Bold' !important",
    textDecoration: 'underline',
    display: 'inline',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  disabledLink: {
    color: '#ccc !important',
    fontSize: '11px !important',
    fontFamily: 'Poppins-Bold !important',
    display: 'inline',
    cursor: 'default',
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
  btnsList: {
    width: '100%',
    display: 'flex',
    listStyle: 'none',
    textDecoration: 'underline',
    height: '40px',
  },
  btn: {
    paddingLeft: '0px  !important',
    letterSpacing: 'normal !important',
  },
  emptyCart: {
    fontFamily: 'Poppins-Regular, sans-serif !Important',
    fontSize: '16px !important',
    color: '#525252',
    fontWeight: 'bold',
  },
}));

const UpsellsOthers = ({ addToBag, showCart, upsellsType }: any) => {
  const classes = useStyles();
  const [actionStatus, setActionStatus] = useState(false);
  const [clickAction, setClickAction] = useState('');
  const [runOnce, setRunOnce] = useState(true);
  const [upsells, setUpsells] = useState<any>();

  const productRemoveObj = useSelector(
    (state: any) => state.removeProductReducer,
  );
  const productAddObj = useSelector((state: any) => state.addProductReducer);
  const { restaurant } = useSelector(
    (state: any) => state.restaurantInfoReducer,
  );
  const basketObj = useSelector((state: any) => state.basketReducer);
  const upsellsObj = useSelector((state: any) => state.getUpsellsReducer);
  const addUpsellsObj = useSelector((state: any) => state.addUpsellReducer);
  const { categories } = useSelector((state: any) => state.categoryReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [basketType, setBasketType] = useState();

  useEffect(() => {
    let products: any = [];

    let upsellsCategory: any = UPSELLS.find(
      (obj: any) => obj.type === upsellsType,
    );
    console.log('upsellsCategory', upsellsCategory);
    if (upsellsCategory && upsellsCategory.products.length > 0) {
      const filteredUpsellsIds = upsellsCategory.products.map(
        (obj: any) => obj.chainproductid,
      );
      console.log('filteredUpsellsIds', filteredUpsellsIds);
      if (
        upsellsCategory &&
        categories &&
        categories.categories &&
        categories.categories.length &&
        filteredUpsellsIds.length
      ) {
        categories.categories.forEach((item: Category) => {
          const findResults = item.products
            .filter((obj: ProductInfo) => {
              return filteredUpsellsIds.includes(obj.chainproductid);
            })
            .map((obj: any) => {
              return {
                ...obj,
                quantity: 0,
              };
            });
          if (findResults && findResults.length) {
            Array.prototype.push.apply(products, findResults);
          }
        });

        // const singleCategory = categories.categories.find((obj: any) => {
        //   return obj.id === upsellsCategory.catergoryid;
        // });
        // console.log('singleCategory', singleCategory);
        // if (
        //   singleCategory &&
        //   singleCategory.products &&
        //   singleCategory.products.length
        // ) {
        //   products = singleCategory.products.filter((obj: any) =>
        //     filteredUpsellsIds.includes(obj.chainproductid),
        //   );
        // }
      }
    }
    console.log('products', products);
    setUpsells(products);

    // let filteredUpsells = UPSELLS.filter(
    //   (obj: any) => obj.type === upsellsType,
    //   return obj.id;
    // );

    // if (filteredUpsells.length > 0) {
    //   console.log('filteredUpsells', filteredUpsells);
    //   // setUpsells(filteredUpsells[0]);
    //
    //   if (
    //     categories &&
    //     categories.categories &&
    //     categories.categories.length > 0
    //   ) {
    //     const singleCategory = categories.categories.find((obj: any) => {
    //       return obj.id === filteredUpsells[0].catergoryid;
    //     });
    //
    //     if (
    //       singleCategory &&
    //       singleCategory.products &&
    //       singleCategory.products.length > 0
    //     ) {
    //       singleCategory.products.filter();
    //       filteredUpsells.forEach((obj: any) => {});
    //     }
    //
    //     categories.categories.map((item: Category) => {
    //       const product = item.products.find((obj: ProductInfo) => {
    //         return obj.id.toString() == id;
    //       });
    //       if (product) {
    //         setProductDetails(product);
    //       }
    //     });
    //   }
    // } else {
    //   setUpsells({});
    // }
  }, [categories, upsellsType]);
  const changeImageSize = (path: string, images: any) => {
    if (images && images.length > 0) {
      const dektopImage: any = images.find(
        (obj: any) => obj.groupname == 'desktop-menu',
      );
      if (dektopImage) {
        return dektopImage.filename.replace('h=138', 'h=500');
      } else {
        return path;
      }
    } else {
      return path;
    }
  };
  // useEffect(() => {
  //   if (
  //     basketObj &&
  //     basketObj.basket &&
  //     basketObj.basket.products &&
  //     basketObj.basket.products.length
  //   ) {
  //
  //   }
  // }, [basketObj]);

  useEffect(() => {
    if (addToBag) {
      console.log('upsells', upsells);
      if (upsells && upsells.length) {
        const products: any = [];
        upsells.forEach((product: any) => {
          const obj = {
            productid: product.id,
            quantity: product.quantity,
            choices: [],
          };
          products.push(obj);
        });
        if (products.length) {
          const payload: any = {
            products: products,
          };
          dispatch(addMultipleProductsRequest(basketObj.basket.id, payload));
        }
      }
    }
  }, [addToBag]);

  const updateSalsaCount = (id: number, type: string) => {
    const updatedProducts = upsells.map((obj: any) => {
      if (obj.chainproductid === id) {
        let count = type === 'PLUS' ? obj.quantity + 1 : obj.quantity - 1;
        count = count >= 6 ? 6 : count <= 0 ? 0 : count;
        return {
          ...obj,
          quantity: count,
        };
      } else {
        return {
          ...obj,
        };
      }
    });
    console.log('upsells', updatedProducts);
    setUpsells(updatedProducts);
  };

  const fitContainer = () => {
    const elem = document.getElementById('cart-main-conatiner');
    const cartBox = document.getElementById('cart-box');
    if (elem && cartBox) {
      if (
        basketObj &&
        basketObj.basket &&
        basketObj.basket.products.length > 0
      ) {
        elem.style.height = cartBox?.clientHeight - 172 + 'px';
      } else {
        elem.style.height = cartBox?.clientHeight - 100 + 'px';
      }
      elem.style.overflow = 'auto';
    }
  };
  window.addEventListener(
    'orientationchange',
    function () {
      fitContainer();
    },
    false,
  );

  window.addEventListener(
    'resize',
    function () {
      fitContainer();
    },
    false,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    fitContainer();
    setBasketType((basketObj && basketObj.basketType) || '');
  }, []);

  // useEffect(() => {
  //   if (!runOnce) {
  //     return;
  //   }
  //   const payload = {
  //     products: [
  //       {
  //         productid: 13582533,
  //         quantity: 1,
  //         choices: [{
  //           choiceid: 1195344702
  //         }],
  //       },
  //       // {
  //       //   chainproductid: 364431,
  //       //   quantity: 1,
  //       //   choices: [],
  //       // },
  //       // {
  //       //   chainproductid: 364175,
  //       //   quantity: 1,
  //       //   choices: [],
  //       // },
  //     ],
  //   };
  //
  //   if (basketObj && basketObj.basket) {
  //     dispatch(addMultipleProductsRequest(basketObj.basket.id, payload));
  //   }
  //   setRunOnce(false);
  // }, []);

  // const updateUpsells = (upsells: any) => {
  //   let finalOptionsInArray: any = [];
  //   upsells.groups.map((g: any) => {
  //     g.items.map((item: any) => {
  //       if (!checkUpsellIsAdded(item.id)) {
  //         finalOptionsInArray.push(item);
  //       }
  //     });
  //   });
  //   setUpsells(finalOptionsInArray);
  // };

  // useEffect(() => {
  //   if (addUpsellsObj && addUpsellsObj.basket && clickAction != '') {
  //     setClickAction('');
  //     displayToast('SUCCESS', '1 item added to cart.');
  //     dispatch(getBasketRequest('', addUpsellsObj.basket, basketType));
  //   }
  // }, [addUpsellsObj]);

  // useEffect(() => {
  //   if (productRemoveObj && productRemoveObj.basket && actionStatus) {
  //     dispatch(getBasketRequest('', productRemoveObj.basket, basketType));
  //     displayToast('SUCCESS', '1 item removed from cart.');
  //     setActionStatus(false);
  //     navigate(restaurant ? '/menu/' + restaurant.slug : '/');
  //   }
  // }, [productRemoveObj]);

  // useEffect(() => {
  //   if (upsellsObj && upsellsObj.upsells && basketObj && basketObj.basket) {
  //     updateUpsells(upsellsObj.upsells);
  //   }
  //   fitContainer();
  // }, [basketObj]);

  // useEffect(() => {
  //   if (productAddObj && productAddObj.basket && actionStatus) {
  //     dispatch(getBasketRequest('', productAddObj.basket, basketType));
  //     displayToast('SUCCESS', 'Duplicate item added to cart.');
  //     setActionStatus(false);
  //     navigate(restaurant ? '/menu/' + restaurant.slug : '/');
  //   }
  // }, [productAddObj]);

  // const removeProductHandle = (productID: number) => {
  //   setActionStatus(true);
  //   dispatch(removeProductRequest(basketObj.basket.id, productID));
  // };

  // const duplicateProductHandle = (productID: number) => {
  //   const product = basketObj.basket.products.find(
  //     (x: any) => x.id == productID,
  //   );
  //   if (product) {
  //     setActionStatus(true);
  //     const request: any = {};
  //     request.productid = product.productId;
  //     request.quantity = product.quantity;
  //     let options = '';
  //     product.choices.map((item: any) => {
  //       options = options + item.optionid + ',';
  //     });
  //     request.options = options;
  //     dispatch(addProductRequest(basketObj.basket.id, request));
  //   }
  // };

  // const addUpsells = (upsellID: number) => {
  //   const request = {
  //     items: [
  //       {
  //         id: upsellID,
  //         quantity: 1,
  //       },
  //     ],
  //   };
  //   setClickAction('clicked');
  //   dispatch(addUpsellsRequest(basketObj.basket.id, request));
  // };

  // const getOptions = (options: any) => {
  //   let val = '';
  //   options.map((item: any) => {
  //     val = val + ' ' + item.name.trim() + ',';
  //   });
  //   return val.trim().replace(/,*$/, '');
  // };

  // const checkItemIsUpsells = (id: number) => {
  //   let aval = false;
  //   if (upsellsObj && upsellsObj.upsells) {
  //     upsellsObj.upsells.groups.map((obj: any, index: number) => {
  //       obj.items.map((item: any, index: number) => {
  //         if (item.id == id) {
  //           aval = true;
  //         }
  //       });
  //     });
  //   }
  //   return aval;
  // };

  // const checkUpsellIsAdded = (id: number) => {
  //   let aval = false;
  //   if (basketObj && basketObj.basket && basketObj.basket.products.length) {
  //     basketObj.basket.products.map((obj: any, index: number) => {
  //       if (obj.productId == id) {
  //         aval = true;
  //       }
  //     });
  //   }
  //   return aval;
  // };

  useEffect(() => {
    // const focusableElements =
    //   'button, [href], input, ul , li ,  select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#cart-box'); // select the modal by it's id
    if (modal) {
      const focusableContent = modal.querySelectorAll('[tabindex="0"]');
      const firstFocusableElement = focusableContent[0]; // get first element to be focused inside modal

      const lastFocusableElement =
        focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

      document.addEventListener('keydown', function (e) {
        let isTabPressed = e.key === 'Tab' || e.keyCode === 9;

        if (!isTabPressed) {
          return;
        }

        if (e.shiftKey) {
          // if shift key pressed for shift + tab combination
          if (document.activeElement === firstFocusableElement) {
            // add focus for the last focusable element
            lastFocusableElement &&
              (lastFocusableElement as HTMLElement)?.focus();
            e.preventDefault();
          }
        } else {
          // if tab key is pressed
          if (document.activeElement === lastFocusableElement) {
            // if focused has reached to last focusable element then focus first focusable element after pressing tab
            firstFocusableElement &&
              (firstFocusableElement as HTMLElement)?.focus(); // add focus for the first focusable element
            e.preventDefault();
          }
        }
      });

      firstFocusableElement && (firstFocusableElement as HTMLElement)?.focus();
    }
  }, []);
  return (
    <>
      <div className={'upsells'}>
        {basketObj &&
          basketObj.basket &&
          basketObj.basket.products.length > 0 &&
          upsells &&
          upsells.length > 0 &&
          upsells.map((itemChild: any, index1: number) => (
            <Grid
              key={Math.random() + index1}
              option-id={itemChild.id}
              className={1 === 1 ? 'content-panel selected' : 'content-panel'}
              item
              xs={6}
              sm={3}
              md={3}
              lg={4}
              sx={{ position: 'relative' }}
            >
              <input
                checked={itemChild.selected}
                style={{
                  opacity: 0,
                  position: 'absolute',
                  zIndex: 1000,
                }}
                type="checkbox"
                id={itemChild.id}
                value={itemChild.name}
                // onClick={() => {
                //   showChildOptions(
                //     itemChild.option.id,
                //     itemMain.id,
                //     itemChild.dropDownValues,
                //     itemChild.selectedValue,
                //   );
                // }}
              />
              <label
                tabIndex={0}
                htmlFor={itemChild.id}
                // onClick={() => {
                //   showChildOptions(
                //     itemChild.option.id,
                //     itemMain.id,
                //     itemChild.dropDownValues,
                //     itemChild.selectedValue,
                //   );
                // }}
                // onKeyUp={(e) => {
                //   if (e.keyCode === 13)
                //     showChildOptions(
                //       itemChild.option.id,
                //       itemMain.id,
                //       itemChild.dropDownValues,
                //       itemChild.selectedValue,
                //     );
                // }}
              >
                <Card
                  className="card-panel"
                  title={itemChild.name}
                  // is-mandatory={itemMain.mandatory.toString()}
                  // parent-option-id={itemMain.parentOptionID}
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
                          ((categories && categories.imagepath) || '') +
                          changeImageSize(
                            itemChild.imagefilename || '',
                            itemChild.images || '',
                          )
                        }
                        index={index1}
                        className="item-image"
                        name={itemChild.name}
                        id={itemChild.id}
                        // optionImages={optionImages}
                      />
                    </Grid>
                    <Grid item xs={12} lg={7} className="name-panel">
                      {itemChild.name}
                      {itemChild.cost > 0 && (
                        <Grid
                          item
                          xs={12}
                          title={`$${parseFloat(itemChild.cost).toFixed(2)}`}
                          sx={{
                            paddingTop: '5px',
                            fontSize: '14px',
                            fontFamily: 'Poppins-Bold',
                            color: '#7CC8C5',
                            textAlign: { xs: 'center', lg: 'left' },
                          }}
                        >
                          +$
                          {parseFloat(itemChild.cost).toFixed(2)}
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </label>
            </Grid>
          ))}
      </div>
    </>
  );
};

export default UpsellsOthers;
