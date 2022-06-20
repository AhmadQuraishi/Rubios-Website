import { Grid, Theme, Button, Card } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductRequest } from '../../../../redux/actions/basket/product/add';
import { UPSELLS, UPSELLS_TYPES } from '../../../../helpers/upsells';
import { Category, Product as ProductInfo } from '../../../../types/olo-api';
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
    marginTop: '-15px !important'
  },
  emptyCart: {
    fontFamily: 'Poppins-Regular, sans-serif !Important',
    fontSize: '16px !important',
    color: '#525252',
    fontWeight: 'bold',
  },
}));

const UpsellsOthers = ({ upsellsType }: any) => {
  const [upsells, setUpsells] = useState<any>();
  const [optionSelected, setOptionSelected] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const basketObj = useSelector((state: any) => state.basketReducer);
  const { categories } = useSelector((state: any) => state.categoryReducer);

  const dispatch = useDispatch();

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
          let findResults = item.products
            .filter((obj: ProductInfo) => {
              return filteredUpsellsIds.includes(obj.chainproductid);
            })
            .map((obj: any) => {
              return {
                ...obj,
                selected: false,
              };
            });

          if (findResults && findResults.length) {
            Array.prototype.push.apply(products, findResults);
          }
        });
      }
    }
    if (upsellsType === UPSELLS_TYPES.DRINK) {
      upsellsCategory.products.forEach((obj: any) => {
        products = products.map((prod: any) => {
          if (obj.chainproductid === prod.chainproductid) {
            return {
              ...prod,
              options: obj.flavors,
            };
          } else {
            return prod;
          }
        });
      });
    }

    console.log('products', products);
    setUpsells(products);
  }, [categories, upsellsType]);

  const submit = () => {
    console.log('upsells', upsells);
    if (upsells && upsells.length) {
      const product: any = upsells.filter((obj: any) => obj.selected);
      if (product && product.length) {
        const request: any = {
          productid: product[0].id,
          quantity: quantity,
          options: '',
        };

        if (upsellsType === UPSELLS_TYPES.DRINK) {
          request.options = `${optionSelected},`;
        }
        setButtonDisabled(true)
        dispatch(addProductRequest(basketObj.basket.id, request));
      }
    }
  };

  const updateSelection = (id: any, selected: any) => {
    const updatedProducts = upsells.map((obj: any) => {
      let newObj: any = {
        ...obj,
      };
      if (id === obj.id) {
        newObj.selected = !selected;
      } else {
        newObj.selected = false;
      }
      if (newObj.selected && upsellsType === UPSELLS_TYPES.DRINK) {
        setOptionSelected(obj.options[0].optionid);
      }
      return newObj;
    });
    console.log('upsells', updatedProducts);
    setUpsells(updatedProducts);
  };

  const fitContainer = () => {
    const elem = document.getElementById('cart-main-container-upsells');
    const cartBox = document.getElementById('cart-box-upsells');
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
  }, []);

  useEffect(() => {
    // const focusableElements =
    //   'button, [href], input, ul , li ,  select, textarea, [tabindex]:not([tabindex="-1"])';
    const modal = document.querySelector('#cart-box-upsells'); // select the modal by it's id
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

  const optionChange = (e: any) => {
    console.log(e.target.value);
    setOptionSelected(e.target.value);
  };

  const updateQuantity = (type: string) => {
    let count = type === 'PLUS' ? quantity + 1 : quantity - 1;
    count = count >= 6 ? 6 : count <= 0 ? 0 : count;
    setQuantity(count);
  };

  const changeImageSize = (path: string, images: any) => {
    if (images && images.length > 0) {
      const dektopImage: any = images.find(
        (obj: any) => obj.groupname === 'desktop-menu',
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
  return (
    <>
      <div id="cart-main-container-upsells" className={'upsells'}>
        {basketObj &&
          basketObj.basket &&
          basketObj.basket.products.length > 0 &&
          upsells &&
          upsells.length > 0 &&
          upsells.map((itemChild: any, index1: number) => (
            <Grid
              key={Math.random() + index1}
              option-id={itemChild.id}
              onClick={() => updateSelection(itemChild.id, itemChild.selected)}
              className={
                itemChild.selected ? 'content-panel selected' : 'content-panel'
              }
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
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
              />
              <label
                tabIndex={0}
                htmlFor={itemChild.id}
                style={{marginBottom: '10px'}}
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
                      <img
                        style={{
                          // display: 'block',
                          // margin: 'auto',
                          width: '100%',
                        }}
                        src={
                          ((categories && categories.imagepath) || '') +
                          changeImageSize(
                            itemChild.imagefilename || '',
                            itemChild.images || '',
                          )
                        }
                        // src={require('../../../../assets/imgs/default_img.png')}
                        // alt={option.name}
                        // title={option.name}
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: { xs: 'center', lg: 'left' },
                          }}
                        >
                          +$
                          {parseFloat(itemChild.cost).toFixed(2)}
                        </Grid>
                      )}
                      <>
                        {itemChild.selected &&
                          itemChild.options &&
                          itemChild.options.length > 0 && (
                            <select
                              className="ss-panl"
                              parent-select-option-id={itemChild.chainproductid}
                              onClick={(e) => e.stopPropagation()}
                              value={optionSelected}
                              data-select-id={itemChild.chainproductid || '0'}
                              onChange={(e) => optionChange(e)}
                            >
                              {itemChild.options.map(
                                (option: any, index: number) => (
                                  <option
                                    key={Math.random() + index}
                                    value={option.optionid}
                                    // onClick={() => {
                                    //   setTotalCost(
                                    //     ((productDetails?.cost ||
                                    //         0) +
                                    //       option.cost) *
                                    //     count,
                                    //   );
                                    // }}
                                  >
                                    {option.name}
                                  </option>
                                ),
                              )}
                            </select>
                          )}
                      </>
                    </Grid>
                  </Grid>
                </Card>
              </label>
            </Grid>
          ))}
      </div>
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {basketObj &&
            basketObj.basket &&
            basketObj.basket.products.length > 0 &&
            upsells &&
            upsells.length > 0 && (
              <Grid
                item
                xs={12}
                lg={8}
                md={8}
                style={{
                  paddingRight: '30px',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
              >
                {upsellsType !== UPSELLS_TYPES.SALSA ? (
                  <div
                    style={{ display: 'flex', alignItems: 'center' }}
                    className="upsells-details"
                  >
                    <label
                      title="Quantity"
                      className="label bold quantity-label"
                      htmlFor="quantityfield"
                    >
                      QTY
                    </label>
                    <div className="quantity">
                      <Button
                        title=""
                        className="add"
                        aria-label="increase"
                        onClick={() => {
                          updateQuantity('PLUS');
                        }}
                      >
                        {' '}
                        +{' '}
                      </Button>
                      <input
                        value={quantity}
                        // inputProps={inputProps}
                        readOnly
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
                          updateQuantity('MINUS');
                        }}
                      >
                        {' '}
                        -{' '}
                      </Button>
                    </div>
                  </div>
                ) : null}

                <Button
                  variant="contained"
                  disabled={
                    quantity === 0 ||
                    !upsells.filter((obj: any) => obj.selected).length ||
                    (basketObj.loading && buttonDisabled)
                  }
                  onClick={() => {
                    submit();
                  }}
                  sx={{
                    textTransform: 'uppercase',
                    backgroundColor: '#0A6FB8',
                    margin: 'auto',
                    width: '100%',
                    borderRadius: 0,
                    padding: '30px 10px',
                    fontSize: '16px',
                    fontFamily: "'Poppins-Medium', sans-serif !important;",
                  }}
                  title="Checkout"
                  aria-label="Checkout"
                >
                  ADD TO BAG
                </Button>
              </Grid>
            )}
        </Grid>
      </Grid>
    </>
  );
};

export default UpsellsOthers;
