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
import { useDispatch, useSelector } from 'react-redux';
import { displayToast } from '../../helpers/toast';
import { updateBasketBillingSchemes } from '../../redux/actions/basket/checkout';
import AddCreditCard from './add-credit-card';
import {
  getBillingSchemesStats,
  getCreditCardObj,
  getGiftCardObj,
  getUniqueId,
  updatePaymentCardsAmount,
} from '../../helpers/checkout';

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
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);

  // const [paymentMethod, setPaymentMethod] =
  //   React.useState<PaymentMethodResult | null>(null);

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

  const handleCheckBox = (
    e: ChangeEvent<HTMLInputElement>,
    localId: any,
    billingmethod: string,
  ) => {
    const billingSchemeStats = getBillingSchemesStats(billingSchemes);
    if (
      billingSchemeStats.selectedGiftCard === 1 &&
      e.target.checked &&
      billingmethod === 'storedvalue'
    ) {
      displayToast('ERROR', 'Only 1 Gift Card can be used to make a payment');
      return;
    }
    if (
      billingSchemeStats.selectedCreditCard === 2 &&
      e.target.checked &&
      billingmethod === 'creditcardtoken'
    ) {
      displayToast('ERROR', 'Only 2 Credit Card can be used to make a payment');
      return;
    }
    if (
      billingSchemeStats.selectedCreditCard === 1 &&
      !e.target.checked &&
      billingmethod === 'creditcardtoken'
    ) {
      displayToast(
        'ERROR',
        'Minimum 1 Credit Card is required to make a payment',
      );
      return;
    }

    const accountIndex = billingSchemes.findIndex(
      (element: any) => element.localId === localId,
    );
    if (accountIndex !== -1) {
      let updatedBillingSchemes: any = billingSchemes;
      updatedBillingSchemes[accountIndex].selected = e.target.checked;
      updatedBillingSchemes = updatePaymentCardsAmount(
        updatedBillingSchemes,
        basket,
      );
      dispatch(updateBasketBillingSchemes(updatedBillingSchemes));
    }
  };

  const handleCloseAddGiftCard = () => {
    setPinCheck(false);
    setOpenAddGiftCard(!openAddGiftCard);
  };

  const removeSingleBasketBillingSchemes = (
    localId: any,
    billingmethod: string,
  ) => {
    if (billingmethod === 'creditcardtoken') {
      const checkLastCreditCard = billingSchemes.filter(
        (element: any) =>
          element.selected && element.billingmethod === 'creditcardtoken',
      );

      if (checkLastCreditCard && checkLastCreditCard.length === 1) {
        displayToast(
          'ERROR',
          'Minimum 1 Credit Card is required to make a payment',
        );
        return;
      }
    }
    let updatedBillingSchemes = billingSchemes.filter(
      (element: any) => element.localId !== localId,
    );

    updatedBillingSchemes = updatePaymentCardsAmount(
      updatedBillingSchemes,
      basket,
    );

    dispatch(updateBasketBillingSchemes(updatedBillingSchemes));
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
              // const billingSchemeStats = getBillingSchemesStats(billingSchemes);

              let cardObj: any = getGiftCardObj(
                balanceResponse,
                billingSchemeId,
                body,
                billingSchemesNewArray,
              );

              Array.prototype.push.apply(billingSchemesNewArray, cardObj);

              billingSchemesNewArray = updatePaymentCardsAmount(
                billingSchemesNewArray,
                basket,
              );

              // console.log('billingSchemeStats', billingSchemeStats);
              // const cardObj = [
              //   {
              //     localId: getUniqueId(),
              //     selected: false,
              //     billingmethod: 'storedvalue',
              //     balance: balanceResponse.balance,
              //     amount: 0,
              //     tipportion: 0.0,
              //     billingschemeid: billingSchemeId,
              //     billingfields: [
              //       {
              //         name: 'number',
              //         value: body.cardnumber,
              //       },
              //     ],
              //   },
              // ];

              // if (
              //   billingSchemeStats.giftCard === 0 &&
              //   billingSchemeStats.creditCard === 1
              // ) {
              //   const giftCardAmount =
              //     cardObj[0].balance > basket.subtotal
              //       ? basket.subtotal
              //       : cardObj[0].balance;
              //   const creditCardAmount = (
              //     basket.total - giftCardAmount
              //   ).toFixed(2);
              //
              //   cardObj[0].amount = parseFloat(giftCardAmount);
              //   cardObj[0].selected = true;
              //
              //   const giftCardIndex = billingSchemesNewArray.findIndex(
              //     (account: any) => account.billingmethod === 'creditcardtoken',
              //   );
              //   if (giftCardIndex !== -1) {
              //     let updatedCreditCard = billingSchemesNewArray[giftCardIndex];
              //     updatedCreditCard.amount = parseFloat(creditCardAmount);
              //     updatedCreditCard.selected = true;
              //     billingSchemesNewArray[giftCardIndex] = updatedCreditCard;
              //   }
              // } else if (
              //   billingSchemeStats.giftCard === 0 &&
              //   billingSchemeStats.creditCard > 1
              // ) {
              //   const giftCardAmount =
              //     cardObj[0].balance > basket.subtotal
              //       ? basket.subtotal
              //       : cardObj[0].balance;
              //   let creditCardAmount: any = basket.total - giftCardAmount;
              //   creditCardAmount = creditCardAmount.toFixed(2) / 2;
              //
              //   cardObj[0].amount = parseFloat(giftCardAmount);
              //   cardObj[0].selected = true;
              //
              //   let count = 0;
              //
              //   billingSchemesNewArray = billingSchemesNewArray.map(
              //     (account: any) => {
              //       if (
              //         account.billingmethod === 'creditcardtoken' &&
              //         count < 2
              //       ) {
              //         account.amount = parseFloat(creditCardAmount);
              //         account.selected = true;
              //         count++;
              //       }
              //       return account;
              //     },
              //   );
              // }

              // if (body.pin && body.pin !== '') {
              //   cardObj[0].billingfields.push({
              //     name: 'pin',
              //     value: body.pin,
              //   });
              // }

              // Array.prototype.push.apply(billingSchemesNewArray, cardObj);
              dispatch(updateBasketBillingSchemes(billingSchemesNewArray));
              displayToast('SUCCESS', 'Gift Card Added');
              handleCloseAddGiftCard();
              setButtonDisabled(false);
            } else {
              displayToast('ERROR', `${balanceResponse.message}`);
              setButtonDisabled(false);
            }
          }
          console.log('balanceResponse', balanceResponse);
          setButtonDisabled(false);
        }
      }
    }
  };

  const handleAmountChanges = (event: any, localId: any) => {
    let newValue =
      event.target.value && event.target.value >= 0
        ? parseFloat(event.target.value)
        : 0;

    newValue = +newValue.toFixed(2);

    console.log('newValue', newValue);
    console.log('typeof', typeof newValue);

    const accountIndex = billingSchemes.findIndex(
      (element: any) => element.localId === localId,
    );
    if (accountIndex !== -1) {
      let updatedBillingSchemes: any = billingSchemes;
      updatedBillingSchemes[accountIndex].amount = newValue;
      dispatch(updateBasketBillingSchemes(updatedBillingSchemes));
    }
  };

  const giftCardLastFourDigits = (account: any) => {
    const giftCardNumber =
      (account &&
        account.billingfields &&
        account.billingfields.length &&
        account.billingfields[0].name === 'number' &&
        account.billingfields[0].value) ||
      '';
    if (giftCardNumber !== '') {
      return giftCardNumber.toString().slice(-3);
    } else {
      return '';
    }
  };

  const cardTypes: any = {
    amex: 'Amex',
    visa: 'Visa',
    discover: 'Discover',
    mastercard: 'Mastercard',
  };

  const getCardImage = (account: any) => {
    let cardImage = '';
    if (account.billingmethod === 'creditcardtoken') {
      cardImage = `${account.cardtype}.png`;
    } else {
      cardImage = 'gc-card-icon.png';
    }
    return (
      <img
        src={require(`../../assets/imgs/${cardImage}`)}
        width={'45px'}
        alt="card image"
      />
    );
  };

  const remainingAmount = () => {
    if (basket && billingSchemes) {
      console.log('billingSchemes', billingSchemes);
      const amountSelected = billingSchemes.reduce((sum: any, account: any) => {
        if (account.selected) {
          sum = sum + account.amount;
        }
        return sum;
      }, 0);

      console.log('amountSelected', amountSelected);

      let remainingAmount = (basket?.total - amountSelected).toFixed(2);

      if (remainingAmount !== 'NAN') {
        return remainingAmount;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  };

  return (
    <Grid container>
      {/*column for space*/}
      <Grid item xs={0} sm={0} md={2} lg={2} />

      <Grid item style={{ paddingBottom: 30 }} xs={12} sm={12} md={8} lg={8}>
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
                <Grid key={account.localId} container spacing={2}>
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
                              name={`${account.localId}`}
                              checked={account.selected}
                              onChange={(e) =>
                                handleCheckBox(
                                  e,
                                  account.localId,
                                  account.billingmethod,
                                )
                              }
                            />
                          }
                          label=""
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
                        {getCardImage(account)}
                      </Grid>
                      <Grid
                        item
                        style={{
                          display: 'flex',
                          flexDirection:
                            account.billingmethod === 'storedvalue'
                              ? 'column'
                              : 'inherit',
                          alignItems:
                            account.billingmethod === 'storedvalue'
                              ? 'flex-start'
                              : 'center',
                          paddingLeft: 20,
                        }}
                        alignItems="center"
                        justifyContent="flex-start"
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                      >
                        {account.billingmethod === 'creditcardtoken' && (
                          <Typography variant="h6">
                            {account.cardlastfour
                              ? `x-${account.cardlastfour}`
                              : ''}
                          </Typography>
                        )}
                        {account.billingmethod === 'storedvalue' && (
                          <>
                            <Typography variant="h6">
                              {account.billingfields
                                ? `Gift Card x${giftCardLastFourDigits(
                                    account,
                                  )}`
                                : ''}
                            </Typography>
                            <Typography
                              style={{
                                color: '#0069aa',
                                fontWeight: '600',
                                fontSize: 13,
                              }}
                              variant="h4"
                            >
                              BALANCE ${account.balance ? account.balance : 0}
                            </Typography>
                          </>
                        )}
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
                        <Typography
                          variant="h6"
                          fontFamily="Poppins-Bold !important"
                        >
                          AMOUNT
                        </Typography>
                      </Grid>
                      <Grid
                        style={{ display: 'flex' }}
                        alignItems="center"
                        item
                        xs={3}
                        sm={3}
                        md={3}
                        lg={3}
                      >
                        <TextField
                          // className="action-btn"
                          type="number"
                          onChange={(e) =>
                            handleAmountChanges(e, account.localId)
                          }
                          // label="Custom Amount"
                          // aria-label="custom amount"
                          // title="Custom Amount"
                          disabled={
                            !account.selected || billingSchemes.length === 1
                          }
                          value={account.amount || 0}
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
                  <Grid
                    item
                    style={{
                      paddingTop: 5,
                      display: 'flex',
                      justifyContent: 'end',
                      zIndex: 999,
                    }}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                  >
                    {billingSchemes && billingSchemes.length !== 1 && (
                      <Typography
                        onClick={() =>
                          removeSingleBasketBillingSchemes(
                            account.localId,
                            account.billingmethod,
                          )
                        }
                        style={{ cursor: 'pointer', display: 'inline-block' }}
                        align={'right'}
                        variant="h6"
                      >
                        REMOVE
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              );
            })}

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Typography align={'center'} variant="h6">
                Remaining Amount: $ {remainingAmount()}
              </Typography>
            </Grid>
          </Grid>

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
                        .min(10, 'Must be at least 10 digits')
                        .max(19, 'Must be at most 19 digits')
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
                            type="number"
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
                            disabled={buttonDisabled}
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

              {basket &&
                billingSchemes &&
                billingSchemes.length > 0 &&
                billingSchemes.length !== 5 &&
                billingSchemes.filter((element: any) => {
                  return element.type === 'creditcardtoken';
                }) &&
                allowedCards &&
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
