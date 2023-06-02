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
import { useEffect, useState, memo, SetStateAction } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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


type OptionsProps = {
  id: number;
  title: string;
  description: string;
  image: string;
  selectedId: number | null;
  type: 'simple' | 'dropdown' | 'quantity';
  quantity: number;
  dropDownOptions?: { id: number, title: string, cost: number }[];
  selectionChanged: (selectedId: number | null, quantity: number, idArray: number[]) => void;
  optionImages: string[]
};

let idArray: number[] = [];

const BaseView = (props: OptionsProps) => {
  // const [idArray, setIdArray] = useState<number[]>([]);
  const [refreshView, setRefreshView] = useState(false);

  const { selectionChanged, id, selectedId } = props

  // Function to add or remove the id
  // const toggleId = (id: number | null) => {
  //   id && setIdArray(prevIds => {
  //     if (prevIds.includes(id)) {
  //       return prevIds.filter(existingId => existingId !== id);
  //     } else {
  //       return [...prevIds, id];
  //     }
  //   });
  // };

  const toggleId = (id: number | null) => {
    if (id && idArray.includes(id)) {
      const updatedArray = idArray.filter((item) => item !== id);
      idArray = updatedArray;
    } else {
      id && idArray.push(id);
    }
    setRefreshView(!refreshView)
  };

  const [productDetails, setProductDetails] = useState<ProductInfo>();
  // const [optionImages, setOptionImages] = useState([]);
  const { categories, loading } = useSelector(
    (state: any) => state.categoryReducer,
  );
  console.log('properr', props.image, id);

  useEffect(() => {
    if (categories && categories.categories) {
      if (id) {
        categories.categories.map((item: Category) => {
          const product = item.products.find((obj: ProductInfo) => {
            console.log('obj?.id:::', obj?.id, '---', id);

            return obj?.id + "" == id.toString();
          });

          console.log('product:::::', props.optionImages);

          if (product) {
            setProductDetails(product);
            // fireProductViewEvent(product);
          }
        });
      }
    }
  }, [categories]);
  return (
    <>
      {
        //       <Grid container>
        //{/* {(parseInt(props.basecalories || '0') > 0 ||
        //   parseInt(props.maxcalories || '0') > 0) && (
        //     <Grid item xs={4.5} sx={{ marginRight: '15px' }}>
        //       <Typography
        //         variant="caption"
        //         className="label bold"
        //         aria-label={`${props.caloriesseparator
        //           ? props.basecalories +
        //           props.caloriesseparator +
        //           props.maxcalories
        //           : props.basecalories
        //           } Cal`}
        //         title={`${props.caloriesseparator
        //           ? props.basecalories +
        //           props.caloriesseparator +
        //           props.maxcalories
        //           : props.basecalories
        //           } Cal`}
        //       >
        //         {props.caloriesseparator
        //           ? props.basecalories +
        //           props.caloriesseparator +
        //           props.maxcalories
        //           : props.basecalories}{' '}
        //         Cal
        //       </Typography>
        //     </Grid>
        //   )} */}
        //           {/* {props.cost > 0 && (
        //   <Grid item xs={6}>
        //     <Typography
        //       variant="body1"
        //       className="price"
        //       title={`$${props.cost.toFixed(2)}`}
        //     >
        //       ${props.cost.toFixed(2)}
        //     </Typography>
        //   </Grid>
        // )} */}
        //         </Grid>
        //       </Grid>
        //     </Grid>
      }
      <Grid container spacing={1} xs={12}
        style={{ backgroundColor: 'yellow', width: '100%' }}
      // parent-mandatory-option={itemMain.mandatory.toString()}
      // parent-option-id={itemMain.parentOptionID}
      >
        {console.log('productDetails:::', selectedId && idArray.includes(selectedId) === true)}
        {console.log('productDetails:::111', idArray.length)}
        <Grid
          container item spacing={2}
          key={Math.random() + id}
          style={{ backgroundColor: 'red', display: 'inline-block' }}
          option-id={id}
          // className={'content-panel'}
          className={selectedId && idArray.includes(selectedId) === true
            ? 'content-panel selected'
            : 'content-panel'
          }
          direction="row"
          xs={4}
          sx={{ position: 'relative' }}
        >

          <label
            // htmlFor={id}
            onClick={() => {
              toggleId(selectedId)
              selectionChanged(
                selectedId,
                1,
                idArray
              );
            }}
            onKeyUp={(e) => {
              if (e.keyCode === 13)
                selectionChanged(
                  selectedId,
                  1,
                  idArray
                );
            }}
          >
            <Card
              className={`card-panel`}
              title={props.title}
            // is-mandatory={itemMain.mandatory.toString()}
            // parent-option-id={itemMain.parentOptionID}
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
                // style={{ width: '100%' }}
                className="name-img-panel"
                sx={{ padding: '0', marginTop: '0' }}
              >
                <Grid
                  item
                  sx={{
                    width: '420px',
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
                    productImageURL={props.image
                      // productDetails &&
                      // ((categories &&
                      //   categories.imagepath) ||
                      //   '') +
                      // changeImageSize(
                      //   productDetails.imagefilename ||
                      //   '',
                      //   productDetails.images || '',
                      //   'desktop-menu',
                      // )
                    }
                    index={1}
                    className="item-image"
                    name={props.title}
                    id={props.id}
                    optionImages={props.optionImages}
                    isdefault={true}
                  />
                </Grid>
                <Grid
                  item
                  className="name-panel"
                >
                  {props.title}
                  {/* <div
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
              </div> */}

                  {props.dropDownOptions && (
                    <>
                      <div
                        style={{
                          position: 'relative',
                        }}
                      >
                        <select
                          className="ss-panl"
                          parent-select-option-id={
                            props.id
                          }
                          onClick={(e) =>
                            e.stopPropagation()
                          }
                          value={
                            // itemChild.selectedValue ||
                            '0'
                          }
                          data-select-id={
                            // itemChild.selectedValue ||
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
                          {props.dropDownOptions.map(
                            (
                              option,
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
                                {option.title +
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
                    </>
                  )}
                  {/* <Grid style={{ paddingBottom: '20px', paddingTop: '10px' }}>
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

              </Grid> */}
                </Grid>
              </Grid>
            </Card>
          </label>
        </Grid>
      </Grid>
    </>
  )
}

export default BaseView;
