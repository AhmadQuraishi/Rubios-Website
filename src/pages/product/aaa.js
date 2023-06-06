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
            <Grid item xs={4}>
              <Grid container>
                {/* <Grid item xs={4} sm={6} className="ph-fix">
                  
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
                            aria-label={`${productDetails.caloriesseparator
                              ? productDetails.basecalories +
                              productDetails.caloriesseparator +
                              productDetails.maxcalories
                              : productDetails.basecalories
                              } Cal`}
                            title={`${productDetails.caloriesseparator
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
                </Grid> */}
                <Grid
                // item
                // xs={12}
                // sm={6}
                // sx={{ marginTop: '20px', textAlign: 'center' }}
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
                        className={`heading-ui ${itemMain.parentOptionID == itemMain.id ? 'h2' : 'h3'
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
                            toggle={toggle}
                            setToggle={setToggle}
                            showChildOptions={showChildOptions}
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
                                      className={`card-panel ${noWordpressImageFound(
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

            </Grid>
          </Grid>
        )}
      </div>
    </Page>
  );
};

export default Product;
