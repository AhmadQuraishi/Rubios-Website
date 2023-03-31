import React, { forwardRef } from 'react';
import {
  Button,
  Grid,
  TextField,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
  useTheme,
  // useMediaQuery
} from '@mui/material';

import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  getGiftCardBalance,
  verifyGiftCardPinRequirement,
} from '../../../services/checkout';
import { ResponseBasket } from '../../../types/olo-api';
import { useDispatch, useSelector } from 'react-redux';
import { displayToast } from '../../../helpers/toast';
import { updateBasketBillingSchemes } from '../../../redux/actions/basket/checkout';
import {
  getBillingSchemesStats,
  getGiftCardObj,
  updatePaymentCardsAmount,
} from '../../../helpers/checkout';
import { isLoginUser } from '../../../helpers/auth';
import moment from 'moment';

const AddGiftCard = forwardRef((props, _ref) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const basketObj = useSelector((state: any) => state.basketReducer);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [allowedCards, setAllowedCards] = React.useState<any>();
  const [billingSchemes, setBillingSchemes] = React.useState<any>([]);
  const [pinCheck, setPinCheck] = React.useState<any>(false);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [openAuthenticationModal, setOpenAuthenticationModal] =
    React.useState<any>(false);
  const [openAddGiftCard, setOpenAddGiftCard] = React.useState<boolean>(false);
  const { sessionLoginTime } = useSelector((state: any) => state.authReducer);
  React.useEffect(() => {
    if (basketObj.basket) {
      setBasket(basketObj.basket);
    }
  }, [basketObj.basket]);

  React.useEffect(() => {
    if (
      basketObj.payment.allowedCards &&
      basketObj.payment.allowedCards.data &&
      basketObj.payment.allowedCards.data.billingschemes
    ) {
      setAllowedCards(basketObj.payment.allowedCards.data.billingschemes);
    }
  }, [basketObj.payment.allowedCards]);

  React.useEffect(() => {
    if (basketObj.payment && basketObj.payment.billingSchemes) {
      setBillingSchemes(basketObj.payment.billingSchemes);
    }
  }, [basketObj.payment]);

  React.useEffect(() => {
    if (allowedCards && allowedCards.length) {
      allowedCards &&
      allowedCards.length &&
      allowedCards.findIndex((element: any) => {
        return (
          element.type === 'giftcard' &&
          element.fields &&
          element.fields.length &&
          element.fields.findIndex((field: any) => {
            return field.type === 'password' && field.isMandatory;
          }) === 1
        );
      }) === 1
        ? setPinCheck(true)
        : setPinCheck(false);
    }
  }, [allowedCards]);

  // const handleCloseAddGiftCard = () => {
  //   setPinCheck(false);
  //   setOpenAddGiftCard(!openAddGiftCard);
  // };

  const handleCloseAddGiftCard = () => {
    setPinCheck(false);
    setOpenAddGiftCard(!openAddGiftCard);
  };

  const handleGiftCardSubmit = async (values: any) => {
    setButtonDisabled(true);
    const body: any = {
      cardnumber: values.giftCardNumber,
    };
    if (values.pin && values.pin !== '') {
      body.pin = values.pin;
    }
    if (basket && basket.id) {
      const giftCardIndex = allowedCards.findIndex((element: any) => {
        return element.type === 'giftcard';
      });

      if (giftCardIndex !== -1) {
        try {
          const billingSchemeId = allowedCards[giftCardIndex].id;
          const pinResponse = await verifyGiftCardPinRequirement(
            billingSchemeId,
            body,
          );
          if (pinResponse && pinResponse.ispinrequired && !pinCheck) {
            displayToast('SUCCESS', 'Please add gift card pin.');
            setButtonDisabled(false);
            setPinCheck(true);
          } else {
            const balanceResponse = await getGiftCardBalance(
              basket.id,
              billingSchemeId,
              body,
            );
            if (balanceResponse) {
              if (balanceResponse.success) {
                let billingSchemesNewArray = billingSchemes;
                let cardObj: any = getGiftCardObj(
                  balanceResponse,
                  billingSchemeId,
                  body,
                  billingSchemesNewArray,
                );

                Array.prototype.push.apply(billingSchemesNewArray, cardObj);

                billingSchemesNewArray = billingSchemesNewArray.map(
                  (element: any) => {
                    if (element.billingmethod === 'storedvalue') {
                      return {
                        ...element,
                        alwaysVisible: false,
                      };
                    }
                    return element;
                  },
                );

                billingSchemesNewArray = updatePaymentCardsAmount(
                  billingSchemesNewArray,
                  basket,
                );

                dispatch(updateBasketBillingSchemes(billingSchemesNewArray));
                displayToast('SUCCESS', 'Gift Card Added');
                handleCloseAddGiftCard();
                setButtonDisabled(false);
              } else {
                displayToast('ERROR', `${balanceResponse.message}`);
                setButtonDisabled(false);
              }
            }
            setButtonDisabled(false);
          }
        } catch (e) {
          setButtonDisabled(false);
        }
      }
    }
  };

  const limitGiftCardNumber = (e: any, giftCardnumber: any) => {
    let newValue = e.target.value.trim();
    newValue =
      newValue && newValue >= 0 && newValue <= 999999999999999999999999999
        ? newValue
        : newValue > 999999999999999999999999999
        ? giftCardnumber
        : '';

    const newEvent = {
      target: {
        value: newValue,
        name: 'giftCardNumber',
      },
    };

    return newEvent;
  };

  const limitGiftCardPin = (e: any, pinNumber: any) => {
    let newValue = e.target.value.trim();
    newValue =
      newValue && newValue >= 0 && newValue <= 9999999999999999
        ? newValue
        : newValue > 9999999999999999
        ? pinNumber
        : '';

    const newEvent = {
      target: {
        value: newValue,
        name: 'pin',
      },
    };

    return newEvent;
  };

  const displayAddGiftCard = () => {
    const billingSchemeStats = getBillingSchemesStats(billingSchemes);
    return (
      basket &&
      billingSchemeStats.giftCard < 4 &&
      allowedCards &&
      allowedCards.length &&
      allowedCards.filter((element: any) => {
        return element.type === 'giftcard';
      }).length > 0
    );
  };

  return (
    <>
      <Dialog
        open={openAddGiftCard}
        onClose={handleCloseAddGiftCard}
        className="fav-dialog"
        TransitionProps={{
          role: 'dialog',
          'aria-modal': 'true',
          'aria-label': 'Add Gift Card',
        }}
        fullWidth
      >
        <DialogTitle id={'add-gift-card-heading'}>Add Gift Card</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              giftCardNumber: '',
              pin: '',
            }}
            validationSchema={Yup.object({
              giftCardNumber: Yup.string()
                .min(10, 'Must be at least 10 digits')
                .max(27, 'Must be at most 27 digits')
                .matches(/^[0-9]+$/, 'Must be only digits')
                .required('Gift Card Number is required'),
              pin: pinCheck
                ? Yup.string()
                    .min(1, 'Must be at least 1 digits')
                    .max(16, 'Must be at most 16 digits')
                    .matches(/^[0-9]+$/, 'Must be only digits')
                    .required('PIN is required')
                : Yup.string(),
            })}
            onSubmit={async (values) => {
              await handleGiftCardSubmit(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  className="action-btn"
                  label="Gift Card Number"
                  fullWidth
                  type="number"
                  onChange={(e) => {
                    handleChange(limitGiftCardNumber(e, values.giftCardNumber));
                  }}
                  title="Enter Code"
                  name="giftCardNumber"
                  value={values.giftCardNumber}
                  onBlur={handleBlur('giftCardNumber')}
                  error={Boolean(
                    touched.giftCardNumber && errors.giftCardNumber,
                  )}
                  helperText={touched.giftCardNumber && errors.giftCardNumber}
                />
                {pinCheck ? (
                  <TextField
                    className="action-btn"
                    label="PIN"
                    fullWidth
                    type="number"
                    onChange={(e) => {
                      handleChange(limitGiftCardPin(e, values.pin));
                    }}
                    title="PIN"
                    name="pin"
                    value={values.pin}
                    onBlur={handleBlur('pin')}
                    error={Boolean(touched.pin && errors.pin)}
                    helperText={touched.pin && errors.pin}
                  />
                ) : null}
                <DialogActions>
                  <Button
                    aria-label="Cancel"
                    title="Cancel"
                    className="link"
                    onClick={handleCloseAddGiftCard}
                  >
                    Cancel{' '}
                  </Button>
                  <Button
                    aria-label="Add Gift Card"
                    title="Add Gift Card"
                    type="submit"
                    className="link default"
                    disabled={buttonDisabled}
                    style={{ fontFamily: "'Sunborn-Sansone'!important" }}
                    // autoFocus
                  >
                    Add Gift Card
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {displayAddGiftCard() && (
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button
              onClick={handleCloseAddGiftCard}
              title="ADD GIFT CARD"
              aria-label="ADD GIFT CARD"
              className="label"
              id={'add-gift-card'}
              sx={{
                fontFamily: "'Sunborn-Sansone'!important",
                fontSize: '11pt !important',
              }}
            >
              ADD Gift CARD
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
});

export default AddGiftCard;
