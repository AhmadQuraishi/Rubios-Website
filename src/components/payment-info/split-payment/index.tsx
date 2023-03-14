import React, { ChangeEvent, forwardRef } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  InputAdornment,
  useTheme,
  Button,
  // useMediaQuery,
} from '@mui/material';

// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { ResponseBasket } from '../../../types/olo-api';
import { useDispatch, useSelector } from 'react-redux';
import { displayToast } from '../../../helpers/toast';
import { updateBasketBillingSchemes } from '../../../redux/actions/basket/checkout';
import {
  getBillingSchemesStats,
  updatePaymentCardsAmount,
  remainingAmount,
} from '../../../helpers/checkout';
import DialogBox from '../../dialog-box';

const SplitPayment = forwardRef((props: any, _ref) => {
  const { setHideShow, displaySavedCards, diplayOnScreenCreditCardForm } = props;
  const dispatch = useDispatch();
  const theme = useTheme();
  const basketObj = useSelector((state: any) => state.basketReducer);
  const [basket, setBasket] = React.useState<ResponseBasket>();
  const [billingSchemes, setBillingSchemes] = React.useState<any>([]);
  const [openPopup, setOpenPopup] = React.useState<boolean>(false);
  const [removeData, setRemoveData] = React.useState<any>(null);

  React.useEffect(() => {
    if (basketObj.basket) {
      setBasket(basketObj.basket);
    }
  }, [basketObj.basket]);

  React.useEffect(() => {
    if (basketObj.payment && basketObj.payment.billingSchemes) {
      setBillingSchemes(basketObj.payment.billingSchemes);
    }
  }, [basketObj.payment]);

  const handleCheckBox = (
    e: ChangeEvent<HTMLInputElement>,
    localId: any,
    billingmethod: string,
  ) => {
    const billingSchemeStats = getBillingSchemesStats(billingSchemes);
    const totalCardsSelected =
      billingSchemeStats.selectedGiftCard +
      billingSchemeStats.selectedCreditCard;
    if (totalCardsSelected === 5 && e.target.checked) {
      if (billingmethod === 'creditcard') {
        let updatedBillingSchemes: any = billingSchemes.map((element: any) => {
          if (element.billingmethod === 'creditcard') {
            return {
              ...element,
              selected: element.localId === localId,
            };
          }
          return element;
        });
        updatedBillingSchemes = updatePaymentCardsAmount(
          updatedBillingSchemes,
          basket,
        );
        dispatch(updateBasketBillingSchemes(updatedBillingSchemes));
        return;
      } else {
        displayToast(
          'ERROR',
          'Maximum 5 payment methods can be used to make a payment',
        );
        return;
      }
    }
    if (
      billingSchemeStats.selectedGiftCard === 4 &&
      e.target.checked &&
      billingmethod === 'storedvalue'
    ) {
      displayToast('ERROR', 'Only 4 Gift Card can be used to make a payment');
      return;
    }
    if (
      billingSchemeStats.selectedCreditCard === 1 &&
      e.target.checked &&
      billingmethod === 'creditcard'
    ) {
      let updatedBillingSchemes: any = billingSchemes.map((element: any) => {
        if (element.billingmethod === 'creditcard') {
          return {
            ...element,
            selected: element.localId === localId,
          };
        }
        return element;
      });
      updatedBillingSchemes = updatePaymentCardsAmount(
        updatedBillingSchemes,
        basket,
      );
      dispatch(updateBasketBillingSchemes(updatedBillingSchemes));
      // displayToast('ERROR', 'Only 1 Credit Card can be used to make a payment');

      return;
    }
    // if (
    //   (billingSchemeStats.selectedCreditCard === 1 &&
    //     billingSchemeStats.selectedGiftCard === 0 &&
    //     !e.target.checked) ||
    //   (billingSchemeStats.selectedGiftCard === 1 &&
    //     billingSchemeStats.selectedCreditCard === 0 &&
    //     !e.target.checked)
    // ) {
    //   displayToast(
    //     'ERROR',
    //     'Minimum 1 payment method is required to make a payment',
    //   );
    //   return;
    // }

    const accountIndex = billingSchemes.findIndex(
      (element: any) => element.localId === localId,
    );
    if (accountIndex !== -1) {
      let updatedBillingSchemes: any = billingSchemes;
      if (e.target.checked) {
        updatedBillingSchemes[accountIndex].selected = e.target.checked;
        updatedBillingSchemes = updatePaymentCardsAmount(
          updatedBillingSchemes,
          basket,
        );
        dispatch(updateBasketBillingSchemes(updatedBillingSchemes));
      } else {
        setOpenPopup(true);
        setRemoveData({
          localId: localId,
          billingmethod: updatedBillingSchemes[accountIndex],
        });
      }
    }
  };

  const removeSingleBasketBillingSchemes = () => {
    if (removeData) {
      const selected = billingSchemes.filter(
        (element: any) => element.selected,
      );

      console.log('selected', selected);

      // if (selected && selected.length === 1) {
      //   if (selected[0].localId === removeData.localId) {
      //     displayToast(
      //       'ERROR',
      //       'Minimum 1 payment method is required to make a payment',
      //     );
      //     handleClosePopup();
      //     return;
      //   }
      // }
      let updatedBillingSchemes = billingSchemes.map((element: any) => {
        if (element.localId === removeData.localId) {
          return {
            ...element,
            selected: false,
          };
        } else {
          return element;
        }
      });

      updatedBillingSchemes = updatePaymentCardsAmount(
        updatedBillingSchemes,
        basket,
      );
      dispatch(updateBasketBillingSchemes(updatedBillingSchemes));
      displayToast('SUCCESS', 'Card Removed.');
    }
    handleClosePopup();
  };

  const handleAmountChanges = (event: any, localId: any) => {
    let newValue = event.target.value;
    newValue = newValue && newValue >= 0 ? parseFloat(newValue) : 0;
    newValue = +newValue.toFixed(2);
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

  const getCardImage = (account: any) => {
    let cardImage = '';
    if (account.billingmethod === 'creditcard') {
      if (account.billingaccountid) {
        cardImage = `${account.cardtype}.png`;
      } else {
        cardImage = `card_placeholder.png`;
      }
    } else {
      cardImage = 'gc-card-icon.png';
    }
    return (
      <img
        src={require(`../../../assets/imgs/${cardImage}`)}
        width={'45px'}
        alt="card image"
      />
    );
  };

  const handleClosePopup = () => {
    setOpenPopup(!openPopup);
    setRemoveData(null);
  };

  const showAddAnotherPaymentMessage = () => {
    const billingSchemeStats = getBillingSchemesStats(billingSchemes);
    return (
      billingSchemeStats.selectedGiftCard === 4 &&
      billingSchemeStats.creditCard === 0 &&
      remainingAmount(basket, billingSchemes) > 0
    );
  };

  return (
    <>
      <DialogBox
        open={openPopup}
        handleClose={handleClosePopup}
        message={'Do You Really Want To Remove This Card?'}
        handleDeleteFunction={() => removeSingleBasketBillingSchemes()}
      />
      {!diplayOnScreenCreditCardForm() && billingSchemes &&
        billingSchemes.length > 0 &&
        billingSchemes
          .filter((account: any) => account.selected)
          .map((account: any, index: any) => {
            return (
              <Grid key={account.localId} container spacing={1}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                  className="card-details"
                >
                  <Grid
                    item
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    sx={{ marginRight: '5px' }}
                  >
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
                            onKeyPress={(e: any) => {
                              if (e.key === 'Enter') {
                                handleCheckBox(
                                  e,
                                  account.localId,
                                  account.billingmethod,
                                );
                              }
                            }}
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
                      xs={1.5}
                      sm={1}
                      md={1.5}
                      lg={1.5}
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
                        paddingLeft: 5,
                      }}
                      alignItems="center"
                      justifyContent="flex-start"
                      xs={5.5}
                      sm={5}
                      md={5}
                      lg={5}
                    >
                      {account.billingmethod === 'creditcard' && (
                        <Typography variant="h6" sx={{fontFamily: "'Librefranklin-Regular' !important"}}>
                          {account.cardlastfour
                            ? `x-${account.cardlastfour}`
                            : 'Credit Card'}
                        </Typography>
                      )}
                      {account.billingmethod === 'storedvalue' && (
                        <>
                          <Typography variant="h6" sx={{fontFamily: "'Librefranklin-Regular' !important"}}>
                            {account.billingfields
                              ? `Gift Card x${giftCardLastFourDigits(account)}`
                              : account.cardlastfour
                              ? `Gift Card x${account.cardlastfour}`
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
                      sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: {
                          xs: '0px 15px 0px 0px',
                          sm: '0px 15px 0px 0px',
                          md: '0px',
                          lg: '0px',
                        },
                      }}
                      alignItems="center"
                      item
                      xs={1.5}
                      sm={2}
                      md={1.5}
                      lg={2}
                    >
                      <Typography
                        variant="h6"
                        fontFamily= "'Librefranklin-Regular' !important"
                      >
                        AMOUNT
                      </Typography>
                    </Grid>
                    <Grid
                      style={{ display: 'flex' }}
                      alignItems="center"
                      item
                      xs={3.5}
                      sm={3}
                      md={4}
                      lg={3}
                    >
                      <TextField
                        type="number"
                        onChange={(e) =>
                          handleAmountChanges(e, account.localId)
                        }
                        disabled={true}
                        value={account.amount.toFixed(2) || 0}
                        inputProps={{ shrink: false }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
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
                    justifyContent: 'flex-end',
                    zIndex: 1,
                  }}
                  xs={12}
                  sm={12}
                  md={12}
                  lg={12}
                >
                  {/*{billingSchemes && billingSchemes.length !== 1 && (*/}
                  {account.billingmethod === 'creditcard' &&
                    !account.billingaccountid && (
                      <Typography
                        onClick={() => {
                          setHideShow(true);
                        }}
                        onKeyPress={(e: any) => {
                          if (e.key === 'Enter') {
                            setHideShow(true);
                          }
                        }}
                        aria-label={'Edit Card'}
                        tabIndex={0}
                        style={{
                          cursor: 'pointer',
                          display: 'inline-block',
                          paddingRight: 10,
                        }}
                        align={'right'}
                        variant="h6"
                      >
                        EDIT
                      </Typography>
                    )}

                  {/* <Typography
                    onClick={() => {
                      setOpenPopup(true);
                      setRemoveData({
                        localId: account.localId,
                        billingmethod: account.billingmethod,
                      });
                    }}
                    onKeyPress={(e: any) => {
                      if (e.key === 'Enter') {
                        setOpenPopup(true);
                        setRemoveData({
                          localId: account.localId,
                          billingmethod: account.billingmethod,
                        });
                      }
                    }}
                    style={{ cursor: 'pointer', display: 'inline-block' }}
                    align={'right'}
                    variant="h6"
                    aria-label={'Remove Card'}
                    tabIndex={0}
                  >
                    REMOVE
                  </Typography> */}
                  {/*)}*/}
                </Grid>
              </Grid>
            );
          })}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography align={'center'} variant="h6" sx={{fontFamily: "'Librefranklin-Regular' !important"}}>
            Remaining Amount: $ {remainingAmount(basket, billingSchemes)}
          </Typography>
        </Grid>
      </Grid>
      {showAddAnotherPaymentMessage() && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Typography
              style={{ paddingTop: 10, color: 'red' }}
              align={'center'}
              variant="h6"
            >
              Please add another payment method to complete your purchase.
            </Typography>
          </Grid>
        </Grid>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          maxHeight: 282,
          overflow: 'auto',
          marginTop: 18,
        }}
      >
        {displaySavedCards &&
          billingSchemes &&
          billingSchemes.length > 0 &&
          billingSchemes
            .filter((account: any) => account.savedCard && !account.selected)
            .map((account: any, index: any) => {
              return (
                <>
                  <Grid key={account.localId} container spacing={1}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      // style={{ marginTop: 0, marginBottom: 15 }}
                      className="card-details"
                    >
                      <Grid
                        item
                        xs={1}
                        sm={1}
                        md={1}
                        lg={1}
                        sx={{ marginRight: '5px' }}
                      >
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
                                onKeyPress={(e: any) => {
                                  if (e.key === 'Enter') {
                                    handleCheckBox(
                                      e,
                                      account.localId,
                                      account.billingmethod,
                                    );
                                  }
                                }}
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
                          xs={1.5}
                          sm={1}
                          md={1.5}
                          lg={1.5}
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
                            paddingLeft: 5,
                          }}
                          alignItems="center"
                          justifyContent="flex-start"
                          xs={5.5}
                          sm={5}
                          md={5}
                          lg={5}
                        >
                          {account.billingmethod === 'creditcard' && (
                            <Typography variant="h6" sx={{fontFamily: "'Librefranklin-Regular' !important"}}>
                              {account.cardlastfour
                                ? `x-${account.cardlastfour}`
                                : 'Credit Card'}
                            </Typography>
                          )}
                          {account.billingmethod === 'storedvalue' && (
                            <>
                              <Typography variant="h6" sx={{fontFamily: "'Librefranklin-Regular' !important"}}>
                                {account.billingfields
                                  ? `Gift Card x${giftCardLastFourDigits(
                                      account,
                                    )}`
                                  : account.cardlastfour
                                  ? `Gift Card x${account.cardlastfour}`
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
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              );
            })}
      </div>
    </>
  );
});

export default SplitPayment;
