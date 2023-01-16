import React, { useEffect, Fragment, useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBillingAccount } from '../../redux/actions/user';
import LoadingBar from '../loading-bar';
import DialogBox from '../../components/dialog-box';
import { requestGiftCardBalance } from '../../services/user';

const GiftCards = ({ billingAccounts, loading }: any) => {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<any>(null);
  const [balanceLoading, setBalanceLoading] = useState(false);
  const [giftCards, setGiftCards] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateGiftCard = async () => {
      const gift = billingAccounts.filter(
        (cardType: any) =>
          cardType.accounttype !== 'creditcard' &&
          cardType.accounttype !== 'payinstore (cash)',
      );
      setBalanceLoading(true);
      const giftCardBalance = await getGiftCardBalance(gift);
      setBalanceLoading(false);

      setGiftCards(giftCardBalance);
    };
    if (billingAccounts && billingAccounts.length) {
      updateGiftCard();
    }
  }, [billingAccounts, loading]);

  const getGiftCardBalance = async (gift: any) => {
    const giftCardIds = gift.map((card: any) => {
      return card.accountidstring;
    });
    let balanceResponse = await requestGiftCardBalance(giftCardIds);

    if (balanceResponse.length) {
      let giftCardsBalance: any = gift.map((e: any, i: any) => {
        let temp: any = balanceResponse.find((element: any) => {
          const id = element.config.url.substring(
            element.config.url.lastIndexOf('/') + 1,
          );
          console.log('id', id);
          console.log('accountidstring', e.accountidstring);
          return id === e.accountidstring;
        });
        console.log('temp', temp);
        if (temp && temp.data.balance) {
          e.balance = temp.data.balance;
        }
        return e;
      });
      console.log('giftCardsBalance', giftCardsBalance);
      return giftCardsBalance;
    }
  };
  // useEffect(() => {
  //
  //   if (giftCards.length) {
  //     getGiftCardBalance();
  //   }
  // }, [giftCards]);

  const deleteBillingAccountHandler = (id: number) => {
    dispatch(deleteBillingAccount(id));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleDeleteFunction = () => {
    deleteBillingAccountHandler(deleteId);
    setOpen(false);
  };

  return (
    <Grid container>
      <DialogBox
        open={open}
        handleClose={handleClose}
        message={'Do you really want to delete this gift card?'}
        handleDeleteFunction={() => handleDeleteFunction()}
      />
      <Grid item xs={12}>
        <br/>
        <Typography variant="h6"  sx={{fontFamily: "'Libre Franklin' !important"}} title="To add a gift card to your account, place an order and enter the gift card information during checkout.">
          To add a gift card to your account, place an order and enter the gift card information during checkout.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3} className="gift-cards-panel">
          {loading || balanceLoading ? (
            <LoadingBar />
          ) : !loading &&
            !balanceLoading &&
            billingAccounts &&
            billingAccounts.length === 0 ? (
            <h6>No Gift Cards Found</h6>
          ) : null}
          {!loading &&
            !balanceLoading &&
            giftCards &&
            giftCards.length > 0 &&
            giftCards.map((card: any, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card className="card-panel">
                  <Grid container>
                    <Grid item xs={2}>
                      <img
                        src={require('../../assets/imgs/gc-card-icon.png')}
                        alt="Gift card icon"
                        title="Gift card icon"
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <CardContent className="panel">
                        <Typography variant="h6" title={card.accounttype}>
                          {card.accounttype}
                        </Typography>
                        <Typography variant="h6" title={card.description}>
                          {card.description}
                        </Typography>
                        <Typography
                          variant="h6"
                          title={
                            card.balance !== null
                              ? card.balance.toString()
                              : 'balance'
                          }
                        >
                          Balance:$
                          {card.balance !== null ? card.balance : '0'}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={6} sm={8} md={5} lg={7} />
                    <Grid item xs={12} className="order-Link">
                      {/* <Link
                      title="Edit"
                      aria-label="Edit card"
                      to="/account/updatepaymentcard/1"
                    >
                      Edit
                    </Link> */}
                      {card.removable ? (
                        <Button
                          title="Delete"
                          onClick={() => handleClickOpen(card.accountidstring)}
                        >
                          Delete
                        </Button>
                      ) : null}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          <Grid item xs={12}></Grid>
          {/* <Grid item xs={12} md={6} sx={{ paddingTop: '0px !important' }}>
            <Link
              title="Add Card"
              aria-label="Add payment card"
              to="/account/updatepaymentcard"
              className="button-add-card"
            >
              ADD GIFT CARD
            </Link>
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GiftCards;
