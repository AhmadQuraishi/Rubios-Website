import {
  Grid,
  Typography,
  Card,
  Button,
  useMediaQuery,
  Switch,
  styled,
  Box,
} from '@mui/material';
import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './product.css';

import ItemImage from '../../../components/item-image';
import {
  Category,
  Option,
  OptionGroup,
  Product as ProductInfo,
  ResponseBasket,
  ResponseModifiers,
} from '../../../types/olo-api';
import { changeImageSize, checkTacoMatch } from '../../../helpers/common';



const SimpleView = (props: any) => {
  const [productDetails, setProductDetails] = useState<ProductInfo>();
  const [optionImages, setOptionImages] = useState([]);
  const { categories, loading } = useSelector(
    (state: any) => state.categoryReducer,
  );

  const { showChildOptions, itemChild, itemMain, checkOptionSelected, IsItemSelected, noWordpressImageFound, index0 = 0, selectedParentOption } = props;

  return (
    <Grid
      // key={Math.random() + index1}
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
                // index={index1}
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

              {console.log('dropDownValues:::', itemChild.dropDownValues)
              }
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
                        // onChange={(e) =>
                        //   dropDownValue(
                        //     itemChild.option.id,
                        //     e.target.value,
                        //     itemChild.dropDownValues,
                        //     e.target,
                        //   )
                        // }
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
                              // onClick={() => {
                              //   setTotalCost(
                              //     ((productDetails?.cost ||
                              //       0) +
                              //       option.cost) *
                              //     count,
                              //   );
                              // }}
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
              <Grid style={{ paddingBottom: '20px', paddingTop: '10px' }}>
                {itemMain.selectedOptions.includes(itemChild.option.id) && itemMain.maxSelect &&
                  (
                    <div className="quantity2">
                      <Button
                        title=""
                        aria-label="reduce"
                      >
                        {' '}
                        -{' '}
                      </Button>
                      <input
                        // value={count}
                        readOnly
                        id="quantityfield"
                        onChange={() => { }}
                        className="input-quantity2"
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
                      >
                        {' '}
                        +{' '}
                      </Button>
                    </div>
                  )}

              </Grid>
            </Grid>
          </Grid>
        </Card>
      </label>
    </Grid>)
}

export default SimpleView;
