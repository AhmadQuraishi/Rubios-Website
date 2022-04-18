import React, { ChangeEvent, forwardRef, useImperativeHandle } from 'react';
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  DialogTitle,
  DialogContent,
  Dialog,
  DialogActions,
} from '@mui/material';
// import { CreditCardElements, PaymentMethodResult } from '@olo/pay';
import './payment-info.css';
import { createFave } from '../../redux/actions/create-fave';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  getGiftCardBalance,
  verifyGiftCardPinRequirement,
} from '../../services/checkout';
import { DeliveryModeEnum, ResponseBasket } from '../../types/olo-api';
import {useDispatch, useSelector} from 'react-redux';
import { displayToast } from '../../helpers/toast';
import { updateBasketBillingSchemes } from '../../redux/actions/basket/checkout';
import AddCreditCard from './add-credit-card';

// const billingAccounts = [
//   {
//     billingmethod: 'creditcard',
//     amount: 36.4,
//     tipportion: 0.0,
//     firstname: 'Hussnain',
//     lastname: 'Hashmi',
//     emailaddress: 'hashmih9211@gmail.com',
//     cardnumber: '4111111111111111',
//     expiryyear: 2024,
//     expirymonth: 2,
//     cvv: '222',
//     streetaddress: '26 Broadway',
//     streetaddress2: 'Unit 4',
//     city: 'New York',
//     state: 'New York',
//     zip: '10004',
//     country: 'US',
//     saveonfile: true,
//   },
//   {
//     billingmethod: 'storedvalue',
//     amount: 10.0,
//     tipportion: 0.0,
//     billingschemeid: 1282,
//     billingfields: [
//       {
//         name: 'pin',
//         value: '123',
//       },
//       {
//         name: 'number',
//         value: '1111222233334444',
//       },
//     ],
//   },
// ];

const styleObject = {
  base: {
    color: 'lightslategrey',
    fontSize: '5rem',
    fontFamily: 'sans-serif',
    '::placeholder': {
      color: '#000',
      fontFamily: 'Poppins-Regular, sans-serif',
    },
  },
  // complete: {
  //   color: 'peachpuff',
  //   fontFamily: 'Mr Dafoe, cursive',
  // },
  // invalid: {
  //   color: 'tomato',
  //   ':hover': {
  //     color: 'orangered',
  //   },
  // }
};

const PaymentInfo = forwardRef((props, _ref) => {
  // const [creditCardElements, setCreditCardElements] =
  //   React.useState<CreditCardElements | null>(null);
  const dispatch = useDispatch();
  const basketObj = useSelector((state: any) => state.basketReducer);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [allowedCards, setAllowedCards] = React.useState<any>();
  const [billingSchemes, setBillingSchemes] = React.useState<any>([]);
  const [pinCheck, setPinCheck] = React.useState<any>(false);
  const [billingDetails, setBillingDetails] = React.useState<any>();

  // const [paymentMethod, setPaymentMethod] =
  //   React.useState<PaymentMethodResult | null>(null);

  const [checkBox, setCheckBox] = React.useState<boolean>(false);
  const [openAddGiftCard, setOpenAddGiftCard] = React.useState<boolean>(false);
  const [openAddCreditCard, setOpenAddCreditCard] =
    React.useState<boolean>(false);

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
    setBillingSchemes(basketObj.payment.billingSchemes);
  }, [basketObj.payment.billingSchemes]);

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

  // useImperativeHandle(_ref, () => ({
  //   getCardDetails: async () => {
  //     const response = (await creditCardElements!.createPaymentMethod(
  //       billingDetails,
  //     )) as PaymentMethodResult;
  //     setPaymentMethod(response);
  //     return response;
  //   },
  // }));

  // React.useEffect(() => {
  //   const initializeCreditCardElements = async () => {
  //     const elements = new CreditCardElements();
  //     // for production use
  //     // const elements = new CreditCardElements('production');
  //
  //     elements.applyStyles(styleObject);
  //
  //     setCreditCardElements(elements);
  //
  //     await elements.create();
  //   };
  //
  //   initializeCreditCardElements();
  // }, []);

  const handleCheckBox = (e: ChangeEvent<HTMLInputElement>) => {
    setCheckBox(e.target.checked);
  };

  const handleCloseAddGiftCard = () => {
    setPinCheck(false);
    setOpenAddGiftCard(!openAddGiftCard);
  };

  const handleCloseAddCreditCard = () => {
    setOpenAddCreditCard(!openAddCreditCard);
  };

  const handleGiftCardSubmit = async (values: any) => {
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

      console.log('works', giftCardIndex);
      if (giftCardIndex !== -1) {
        const billingSchemeId = allowedCards[giftCardIndex].id;
        console.log('works 1', billingSchemeId);
        const pinResponse = await verifyGiftCardPinRequirement(
          billingSchemeId,
          body,
        );
        console.log('pinResponse', pinResponse);
        if (pinResponse && pinResponse.ispinrequired && !pinCheck) {
          displayToast('SUCCESS', 'Please add gift card pin.');
          setPinCheck(true);
        } else {
          const balanceResponse = await getGiftCardBalance(
            basket.id,
            billingSchemeId,
            body,
          );
          if (balanceResponse) {
            if (balanceResponse.success) {
              const cardObj = [
                {
                  billingmethod: 'storedvalue',
                  balance: balanceResponse.balance,
                  amount: 0,
                  tipportion: 0.0,
                  billingschemeid: billingSchemeId,
                  billingfields: [
                    {
                      name: 'number',
                      value: body.cardnumber,
                    },
                  ],
                },
              ];

              if (body.pin && body.pin !== '') {
                cardObj[0].billingfields.push({
                  name: 'pin',
                  value: body.pin,
                });
              }

              let billingSchemesNewArray = billingSchemes;
              Array.prototype.push.apply(billingSchemesNewArray, cardObj);
              // billingSchemesNewArray.push(cardObj);

              console.log('cardObj', cardObj);
              console.log('billingSchemesNewArray', billingSchemesNewArray);
              dispatch(updateBasketBillingSchemes(billingSchemesNewArray));
              displayToast('SUCCESS', 'Card Added');
              handleCloseAddGiftCard();
            } else {
              displayToast('ERROR', `${balanceResponse.message}`);
            }
          }
          console.log('balanceResponse', balanceResponse);
        }
      }
    }
  };

  const handleZipCodeChange = (event: any) => {
    setBillingDetails({
      address: {
        postal_code: event.target.value.trim(),
      },
    });
  };

  return (
    <Grid container>
      {/*column for space*/}
      <Grid item xs={0} sm={0} md={2} lg={2} />

      <Grid item xs={12} sm={12} md={8} lg={8}>
        <Typography variant="h2" title="PAYMENT INFO">
          PAYMENT INFO
        </Typography>
        <br />
        <Grid container spacing={2} className="payment-form">
          {/* <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  label="First Name"
                  aria-label="First Name"
                  aria-required="true"
                  title="First Name"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6}>
                <TextField
                  label="Last Name"
                  aria-label="Last Name"
                  aria-required="true"
                  title="Last Name"
                />
              </Grid>
            </Grid>
          </Grid> */}
          <Grid item xs={12}>
            {/*<Grid container spacing={2}>*/}
            {/*  <Grid*/}
            {/*    item*/}
            {/*    xs={12}*/}
            {/*    sm={12}*/}
            {/*    md={12}*/}
            {/*    lg={12}*/}
            {/*    className="payment-form image-field align"*/}
            {/*  >*/}
            {/*    <Grid container spacing={2}>*/}
            {/*      <Grid*/}
            {/*        item*/}
            {/*        xs={6}*/}
            {/*        sm={6}*/}
            {/*        md={6}*/}
            {/*        lg={6}*/}
            {/*        className="payment-form image-field align"*/}
            {/*      >*/}
            {/*        <div className="card-fields" data-olo-pay-card-number></div>*/}
            {/*        <img src={require('../../assets/imgs/card-icon.png')} />*/}
            {/*      </Grid>*/}
            {/*      <Grid item xs={6} sm={6} md={6} lg={6}>*/}
            {/*        <div className="card-fields" data-olo-pay-card-cvc></div>*/}
            {/*        <img src={require('../../assets/imgs/ccv-icon.png')} />*/}
            {/*      </Grid>*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            {/*  <Grid item xs={12} sm={12} md={12} lg={12}>*/}
            {/*    <Grid container spacing={2}>*/}
            {/*      <Grid*/}
            {/*        item*/}
            {/*        xs={6}*/}
            {/*        sm={6}*/}
            {/*        md={6}*/}
            {/*        lg={6}*/}
            {/*        className="payment-form image-field align"*/}
            {/*      >*/}
            {/*        <div className="card-fields" data-olo-pay-card-expiry></div>*/}
            {/*      </Grid>*/}
            {/*      <Grid item xs={6} sm={6} md={6} lg={6}>*/}
            {/*        <TextField*/}
            {/*          aria-label="Zip Code"*/}
            {/*          // onBlur={handleBlur}*/}
            {/*          // label="Zip Code"*/}
            {/*          // aria-required="true"*/}
            {/*          // title="Zip Code"*/}
            {/*          placeholder="Zip Code"*/}
            {/*          type="text"*/}
            {/*          name="zipcode"*/}
            {/*          inputProps={{ shrink: false }}*/}
            {/*          // value={values.zipcode}*/}
            {/*          onChange={handleZipCodeChange}*/}
            {/*          // error={Boolean(touched.zipcode && errors.zipcode)}*/}
            {/*          // helperText={errors.zipcode}*/}
            {/*        />*/}
            {/*      </Grid>*/}
            {/*    </Grid>*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
          </Grid>

          {billingSchemes &&
            billingSchemes.length > 0 &&
            billingSchemes.map((account: any, index: any) => {
              return (
                <Grid key={index} container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    className="card-details"
                  >
                    <Grid item xs={1} sm={1} md={1} lg={1}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={checkBox}
                              onChange={(e) => handleCheckBox(e)}
                            />
                          }
                          label=""
                          name="saveAddressCheck"
                          className="size"
                        />
                      </FormGroup>
                    </Grid>
                    <Grid container className="payment-bar">
                      <Grid
                        item
                        style={{ display: 'flex' }}
                        alignItems="center"
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                      >
                        <img
                          src={require('../../assets/imgs/mastercard.png')}
                          width={'45px'}
                          alt="Sign in with facebook"
                        />
                      </Grid>
                      <Grid
                        item
                        style={{ display: 'flex' }}
                        alignItems="center"
                        justifyContent="flex-start"
                        xs={7}
                        sm={7}
                        md={7}
                        lg={7}
                      >
                        <Typography variant="h6">x-9345</Typography>
                      </Grid>
                      <Grid
                        style={{ display: 'flex', justifyContent: 'right' }}
                        alignItems="center"
                        item
                        xs={2}
                        sm={2}
                        md={2}
                        lg={2}
                      >
                        <Typography variant="h6">Amount</Typography>
                      </Grid>
                      <Grid
                        style={{ display: 'flex' }}
                        alignItems="center"
                        item
                        xs={2}
                        sm={2}
                        md={2}
                        lg={2}
                      >
                        <TextField
                          // className="action-btn"
                          value={10}
                          type="text"
                          // onChange={handleTipCustomAmountChange}
                          // label="Custom Amount"
                          // aria-label="custom amount"
                          // title="Custom Amount"
                          inputProps={{ shrink: false }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                $
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}

          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} className="add-gift">
              <Dialog
                open={openAddGiftCard}
                onClose={handleCloseAddGiftCard}
                className="fav-dialog"
                fullWidth
              >
                <DialogTitle>Add Gift Card</DialogTitle>
                <DialogContent>
                  <Formik
                    initialValues={{
                      giftCardNumber: '',
                      pin: '',
                    }}
                    validationSchema={Yup.object({
                      giftCardNumber: Yup.string()
                        .trim()
                        .min(10, 'Must be at least 10 characters')
                        .max(19, 'Must be at most 19 characters')
                        .required('Gift Card Number is required'),
                      pin: pinCheck
                        ? Yup.string()
                            .trim()
                            .min(1, 'Must be at least 1 characters')
                            .max(16, 'Must be at most 16 characters')
                            .required('PIN is required')
                        : Yup.string(),
                    })}
                    onSubmit={async (values) => {
                      handleGiftCardSubmit(values);
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
                          type="text"
                          onChange={handleChange}
                          title="Enter Code"
                          name="giftCardNumber"
                          value={values.giftCardNumber}
                          onBlur={handleBlur('giftCardNumber')}
                          error={Boolean(
                            touched.giftCardNumber && errors.giftCardNumber,
                          )}
                          helperText={
                            touched.giftCardNumber && errors.giftCardNumber
                          }
                        />
                        {pinCheck ? (
                          <TextField
                            className="action-btn"
                            label="PIN"
                            fullWidth
                            type="text"
                            onChange={handleChange}
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
                            autoFocus
                          >
                            Add Gift Card
                          </Button>
                        </DialogActions>
                      </form>
                    )}
                  </Formik>
                </DialogContent>
              </Dialog>
              <AddCreditCard />
              {/*<Dialog*/}
              {/*  open={openAddCreditCard}*/}
              {/*  onClose={handleCloseAddCreditCard}*/}
              {/*  className="fav-dialog"*/}
              {/*  fullWidth*/}
              {/*>*/}
              {/*  <DialogTitle>Add Credit Card</DialogTitle>*/}
              {/*  <DialogContent>*/}
              {/*    {openAddCreditCard && (*/}
              {/*      <Grid container className="payment-form" spacing={2}>*/}
              {/*        <Grid*/}
              {/*          item*/}
              {/*          xs={12}*/}
              {/*          sm={12}*/}
              {/*          md={12}*/}
              {/*          lg={12}*/}
              {/*          className="payment-form image-field align"*/}
              {/*        >*/}
              {/*          <Grid container spacing={2}>*/}
              {/*            <Grid*/}
              {/*              item*/}
              {/*              xs={6}*/}
              {/*              sm={6}*/}
              {/*              md={6}*/}
              {/*              lg={6}*/}
              {/*              className="payment-form image-field align"*/}
              {/*            >*/}
              {/*              <div*/}
              {/*                className="card-fields"*/}
              {/*                data-olo-pay-card-number*/}
              {/*              ></div>*/}
              {/*              <img*/}
              {/*                src={require('../../assets/imgs/card-icon.png')}*/}
              {/*              />*/}
              {/*            </Grid>*/}
              {/*            <Grid item xs={6} sm={6} md={6} lg={6}>*/}
              {/*              <div*/}
              {/*                className="card-fields"*/}
              {/*                data-olo-pay-card-cvc*/}
              {/*              ></div>*/}
              {/*              <img*/}
              {/*                src={require('../../assets/imgs/ccv-icon.png')}*/}
              {/*              />*/}
              {/*            </Grid>*/}
              {/*          </Grid>*/}
              {/*        </Grid>*/}
              {/*        <Grid item xs={12} sm={12} md={12} lg={12}>*/}
              {/*          <Grid container spacing={2}>*/}
              {/*            <Grid*/}
              {/*              item*/}
              {/*              xs={6}*/}
              {/*              sm={6}*/}
              {/*              md={6}*/}
              {/*              lg={6}*/}
              {/*              className="payment-form image-field align"*/}
              {/*            >*/}
              {/*              <div*/}
              {/*                className="card-fields"*/}
              {/*                data-olo-pay-card-expiry*/}
              {/*              ></div>*/}
              {/*            </Grid>*/}
              {/*            <Grid item xs={6} sm={6} md={6} lg={6}>*/}
              {/*              <TextField*/}
              {/*                aria-label="Zip Code"*/}
              {/*                // onBlur={handleBlur}*/}
              {/*                // label="Zip Code"*/}
              {/*                // aria-required="true"*/}
              {/*                // title="Zip Code"*/}
              {/*                placeholder="Zip Code"*/}
              {/*                type="text"*/}
              {/*                name="zipcode"*/}
              {/*                inputProps={{ shrink: false }}*/}
              {/*                // value={values.zipcode}*/}
              {/*                onChange={handleZipCodeChange}*/}
              {/*                // error={Boolean(touched.zipcode && errors.zipcode)}*/}
              {/*                // helperText={errors.zipcode}*/}
              {/*              />*/}
              {/*            </Grid>*/}
              {/*          </Grid>*/}
              {/*        </Grid>*/}
              {/*      </Grid>*/}
              {/*    )}*/}
              {/*    <DialogActions>*/}
              {/*      <Button*/}
              {/*        aria-label="Cancel"*/}
              {/*        title="Cancel"*/}
              {/*        className="link"*/}
              {/*        onClick={handleCloseAddCreditCard}*/}
              {/*      >*/}
              {/*        Cancel{' '}*/}
              {/*      </Button>*/}
              {/*      <Button*/}
              {/*        aria-label="Add Gift Card"*/}
              {/*        title="Add Gift Card"*/}
              {/*        type="submit"*/}
              {/*        className="link default"*/}
              {/*        autoFocus*/}
              {/*      >*/}
              {/*        Add Credit Card*/}
              {/*      </Button>*/}
              {/*    </DialogActions>*/}
              {/*  </DialogContent>*/}
              {/*</Dialog>*/}
              {/*<Grid container>*/}
              {/*  <Grid item xs={12} sm={12} md={12} lg={12}>*/}
              {/*    <Button*/}
              {/*      onClick={handleCloseAddCreditCard}*/}
              {/*      title="ADD CREDIT CARD"*/}
              {/*      className="label"*/}
              {/*    >*/}
              {/*      ADD Credit CARD*/}
              {/*    </Button>*/}
              {/*  </Grid>*/}
              {/*</Grid>*/}

              {allowedCards &&
                allowedCards.length &&
                allowedCards.filter((element: any) => {
                  return element.type === 'giftcard';
                }) && (
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Button
                        onClick={handleCloseAddGiftCard}
                        title="ADD GIFT CARD"
                        className="label"
                      >
                        ADD Gift CARD
                      </Button>
                    </Grid>
                  </Grid>
                )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/*column for space*/}
      <Grid item xs={0} sm={0} md={2} lg={2} />
    </Grid>
  );
});

export default PaymentInfo;
