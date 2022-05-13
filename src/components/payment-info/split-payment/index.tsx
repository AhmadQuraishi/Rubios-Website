import React, { ChangeEvent, forwardRef } from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';

import { ResponseBasket } from '../../../types/olo-api';
import { useDispatch, useSelector } from 'react-redux';
import { displayToast } from '../../../helpers/toast';
import { updateBasketBillingSchemes } from '../../../redux/actions/basket/checkout';
import {
  getBillingSchemesStats,
  updatePaymentCardsAmount,
} from '../../../helpers/checkout';
import DialogBox from '../../dialog-box';

const SplitPayment = forwardRef((props, _ref) => {
  const dispatch = useDispatch();
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

  const removeSingleBasketBillingSchemes = () => {
    if (removeData) {
      if (removeData.billingmethod === 'creditcardtoken') {
        const checkLastCreditCard = billingSchemes.filter(
          (element: any) =>
            element.selected && element.billingmethod === 'creditcardtoken',
        );

        if (checkLastCreditCard && checkLastCreditCard.length === 1) {
          if (checkLastCreditCard[0].localId === removeData.localId) {
            displayToast(
              'ERROR',
              'Minimum 1 Credit Card is required to make a payment',
            );
            handleClosePopup();
            return;
          }
        }
      }
      let updatedBillingSchemes = billingSchemes.filter(
        (element: any) => element.localId !== removeData.localId,
      );

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
    if (account.billingmethod === 'creditcardtoken') {
      cardImage = `${account.cardtype}.png`;
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

  const remainingAmount = () => {
    if (basket && billingSchemes) {
      let amountSelected = billingSchemes.reduce((sum: any, account: any) => {
        if (account.selected) {
          sum = sum + account.amount;
        }
        return sum;
      }, 0);

      amountSelected = amountSelected.toFixed(2);
      amountSelected = parseFloat(amountSelected);

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

  const handleClosePopup = () => {
    setOpenPopup(!openPopup);
    setRemoveData(null);
  };

  return (
    <>
      <DialogBox
        open={openPopup}
        handleClose={handleClosePopup}
        message={'Do You Really Want To Delete This Card?'}
        handleDeleteFunction={() => removeSingleBasketBillingSchemes()}
      />
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
                        xs: '0px 20px 0px 0px',
                        sm: '0px 20px 0px 0px',
                        md: '0px',
                        lg: '0px',
                      },
                    }}
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
                    {console.log('new Value 4', account.amount )}
                    <TextField
                      type="number"
                      onChange={(e) => handleAmountChanges(e, account.localId)}
                      disabled={
                        !account.selected || billingSchemes.length === 1
                      }
                      value={account.amount.toString() || 0}
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
                  zIndex: 999,
                }}
                xs={12}
                sm={12}
                md={12}
                lg={12}
              >
                {billingSchemes && billingSchemes.length !== 1 && (
                  <Typography
                    onClick={() => {
                      setOpenPopup(true);
                      setRemoveData({
                        localId: account.localId,
                        billingmethod: account.billingmethod,
                      });
                    }}
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
    </>
  );
});

export default SplitPayment;
