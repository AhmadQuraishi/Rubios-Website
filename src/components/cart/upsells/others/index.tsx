import { Grid, Button, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UPSELLS_TYPES } from '../../../../helpers/upsells';
import './index.css';
import { addUpsellsRequest } from '../../../../redux/actions/basket/upsell/Add';
import { changeImageSize } from '../../../../helpers/common';
import SalsaSkeletonUI from '../../../salsa-skeleton-ui';

const UpsellsOthers = ({ upsellsType }: any) => {
  const [products, setProducts] = useState<any>();
  const [optionSelected, setOptionSelected] = useState<any>(null);
  const [quantity, setQuantity] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const basketObj = useSelector((state: any) => state.basketReducer);
  const { categories } = useSelector((state: any) => state.categoryReducer);
  const { upsells } = useSelector((state: any) => state.getUpsellsReducer);
  const addUpsellsObj = useSelector((state: any) => state.addUpsellReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (upsells && upsells.length) {
      let prod: any = [];

      let upsellsCategory: any = upsells.find(
        (obj: any) => obj.type === upsellsType,
      );
      if (upsellsCategory && upsellsCategory.products) {
        prod = upsellsCategory.products;
      }

      if (prod && prod.length) {
        prod = prod.map((obj: any) => {
          return {
            ...obj,
            selected: false,
          };
        });
      }

      setProducts(prod);
    }
    // let products: any = [];
    //
    // let upsellsCategory: any = UPSELLS.find(
    //   (obj: any) => obj.type === upsellsType,
    // );
    // console.log('upsellsCategory', upsellsCategory);
    // if (upsellsCategory && upsellsCategory.products.length > 0) {
    //   const filteredUpsellsIds = upsellsCategory.products.map(
    //     (obj: any) => obj.chainproductid,
    //   );
    //   console.log('filteredUpsellsIds', filteredUpsellsIds);
    //   if (
    //     upsellsCategory &&
    //     categories &&
    //     categories.categories &&
    //     categories.categories.length &&
    //     filteredUpsellsIds.length
    //   ) {
    //     categories.categories.forEach((item: Category) => {
    //       let findResults = item.products
    //         .filter((obj: ProductInfo) => {
    //           return filteredUpsellsIds.includes(obj.chainproductid);
    //         })
    //         .map((obj: any) => {
    //           return {
    //             ...obj,
    //             selected: false,
    //           };
    //         });
    //
    //       if (findResults && findResults.length) {
    //         Array.prototype.push.apply(products, findResults);
    //       }
    //     });
    //   }
    // }
    // if (upsellsType === UPSELLS_TYPES.DRINK) {
    //   upsellsCategory.products.forEach((obj: any) => {
    //     products = products.map((prod: any) => {
    //       if (obj.chainproductid === prod.chainproductid) {
    //         return {
    //           ...prod,
    //           options: obj.flavors,
    //         };
    //       } else {
    //         return prod;
    //       }
    //     });
    //   });
    // }
  }, [upsells, upsellsType]);

  const submit = () => {
    if (products && products.length) {
      const selectedProducts: any = products.filter((obj: any) => obj.selected);
      if (selectedProducts && selectedProducts.length) {
        const request: any = {
          productid: selectedProducts[0].id,
          quantity: quantity,
          options: '',
        };

        if (upsellsType === UPSELLS_TYPES.DRINK) {
          request.options = `${optionSelected?.optionId},`;
        }
        setButtonDisabled(true);
        // dispatch(addProductRequest(basketObj.basket.id, request));
        dispatch(addUpsellsRequest(basketObj.basket.id, request));
      }
    }
  };

  const updateSelection = (id: any, selected: any) => {
    const updatedProducts = products.map((obj: any) => {
      let newObj: any = {
        ...obj,
      };
      if (id === obj.id) {
        newObj.selected = !selected;
      } else {
        newObj.selected = false;
      }
      if (newObj.selected && upsellsType === UPSELLS_TYPES.DRINK) {
        setOptionSelected({optionId: obj.options[0]?.id, cost: obj.options[0]?.cost });
      }
      return newObj;
    });
    setProducts(updatedProducts);
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
        elem.style.height = cartBox?.clientHeight - 202 + 'px';
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
    const modal = document.querySelector('#cart-box-others'); // select the modal by it's id
    if (modal) {
      const focusableContent = modal.querySelectorAll('[tabindex="1"]');
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

  const optionChange = (e: any, product: any) => {
    const filterOpt = product?.options?.filter((opt: any) => opt.id === parseInt(e.target.value));
    console.log(e.target.value);
    setOptionSelected({optionId: filterOpt[0]?.id, cost: filterOpt[0]?.cost });
  };

  const updateQuantity = (type: string) => {
    let count = type === 'PLUS' ? quantity + 1 : quantity - 1;
    count = count >= 6 ? 6 : count <= 0 ? 0 : count;
    setQuantity(count);
  };

  return (
    <>
          {products?.length < 1 && <SalsaSkeletonUI />}
      <div id="cart-main-container-upsells" className={'upsells'}>

        {basketObj &&
          basketObj.basket &&
          basketObj.basket.products.length > 0 &&
          products &&
          products.length > 0 &&
          products.map((itemChild: any, index1: number) => (
            <Grid
            id="cart-box-others"
              key={Math.random() + index1}
              option-id={itemChild.id}
              onClick={() => updateSelection(itemChild.id, itemChild.selected)}
              className={
                itemChild.selected ? 'content-panel selected' : 'content-panel'
              }
              item
              xs={12}
              // sm={6}
              // md={6}
              lg={products?.length === 1 ? 12  : 6}
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
                style={{ marginBottom: '10px', width: '100%' }}
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

                  <Grid
                    container
                    spacing={1}
                    className="name-img-panel"
                    sx={{ padding: '0', marginTop: '0' }}
                  >
                    <Grid
                      item
                      xs={6}
                      lg={6}
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
                        position: 'relative'
                      }}
                    >
                      <img
                        style={{
                          // display: 'block',
                          // margin: 'auto',
                          // width: {'auto'},
                        }}
                        src={
                          ((categories && categories.imagepath) || '') +
                          changeImageSize(
                            itemChild.imagefilename || '',
                            itemChild.images || '',
                            'desktop-menu',
                          )
                        }
                        // src={require('../../../../assets/imgs/default_img.png')}
                        // alt={option.name}
                        // title={option.name}
                      />
                      <div className="check-mark"  tabIndex={1}>
                        <div aria-hidden="true" className="checkmark">
                          L
                        </div>
                      </div>
                    </Grid>
                    <Grid item xs={6} lg={6} className="name-panel">
                      {itemChild.name}
                      {(itemChild?.cost > 0 || optionSelected?.cost > 0) && (
                        <Grid
                          item
                          xs={12}
                          title={`$${parseFloat(itemChild.cost).toFixed(2)}`}
                          sx={{
                            paddingTop: '5px',
                            fontSize: '14px',
                            fontFamily: "'Librefranklin-Regular' !important",
                            color: '#0075BF',
                            display: 'flex',
                            alignItems: 'center',
                            // justifyContent: 'center',
                            justifyContent: { xs: 'center', md: 'left' },
                          }}
                        >
                          +$
                          {parseFloat(itemChild?.cost > 0 && itemChild?.cost || optionSelected?.cost || 0 ).toFixed(2)}
                        </Grid>
                      )}
                      <>
                        {itemChild.selected &&
                          itemChild.options &&
                          itemChild.options.length > 0 && (
                            <select
                            autoFocus
                            id="cart-box-others"
                              className="ss-panl"
                              parent-select-option-id={itemChild.chainproductid}
                              onClick={(e) => e.stopPropagation()}
                              value={
                                (optionSelected?.optionId) ||
                                ''
                              }
                              data-select-id={itemChild.chainproductid || '0'}
                              onChange={(e) => optionChange(e, itemChild)}
                            >
                              {itemChild.options.map(
                                (option: any, index: number) => (
                                  <option
                                    key={Math.random() + index}
                                    value={option.id}
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
      <Grid container spacing={0} sx={{paddingTop: "20px"}} id="cart-box-others">
        <Grid
          item
          xs={12}
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          {basketObj &&
            basketObj.basket &&
            basketObj.basket.products.length > 0 &&
            products &&
            products.length > 0 && (
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
                        sx={{ marginLeft: { xs:"7px" }}}
                        className="subtract"
                        aria-label="reduce"
                        onClick={() => {
                          updateQuantity('MINUS');
                        }}
                      >
                        {' '}
                        -{' '}
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
                        sx={{ marginRight: { xs:"7px" }}}
                        className="add"
                        aria-label="increase"
                        onClick={() => {
                          updateQuantity('PLUS');
                        }}
                      >
                        {' '}
                        +{' '}
                      </Button>
                    </div>
                  </div>
                ) : null}

                <Button
                  variant="contained"
                  disabled={
                    quantity === 0 ||
                    (products &&
                      !products.filter((obj: any) => obj.selected).length) ||
                    (addUpsellsObj.loading && buttonDisabled)
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
                    fontFamily: "'GritSans-Bold' !important",
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
