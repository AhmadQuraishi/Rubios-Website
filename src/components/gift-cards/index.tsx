import React, { useEffect, Fragment, useState } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBillingAccount } from '../../redux/actions/user';
import LoadingBar from '../loading-bar';
import DialogBox from '../../components/dialog-box';
import { requestGiftCardBalance } from '../../services/user';

const GiftCards = () => {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<any>(null);
  const [giftCards, setGiftCards] = useState([]);
  const dispatch = useDispatch();
  const { userBillingAccounts, loading } = useSelector(
    (state: any) => state.userReducer,
  );

  useEffect(() => {
    if (userBillingAccounts) {
      const gift = userBillingAccounts.billingaccounts.filter(
        (cardType: any) =>
          cardType.accounttype !== 'creditcard' &&
          cardType.accounttype !== 'payinstore (cash)',
      );
      setGiftCards(gift);
    }
  }, [userBillingAccounts, loading]);

  useEffect(() => {
    const getGiftCardBalance = async () => {
      const giftCardIds = giftCards.map((card: any) => {
        return card.accountidstring;
      });
      // giftCardIds.push('asdasd');
      let balacnceResponse = await requestGiftCardBalance(giftCardIds);

      if (balacnceResponse.length) {
        let giftCardsBalance: any = giftCards.map((e: any, i) => {
          let temp: any = giftCards.find(
            (element: any) => element.accountid === e.accountid
          );
          if (temp && temp.balance) {
            e.balance = temp.balance;
          }
          return e;
        });
        console.log('giftCardsBalance', giftCardsBalance);
        // setGiftCards(giftCardsBalance);

      }
    };
    if (giftCards.length) {
      getGiftCardBalance();
    }
  }, [giftCards]);

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
        message={'Do You Really Want To Delete This Gift Card?'}
        handleDeleteFunction={() => handleDeleteFunction()}
      />
      <Grid item xs={12}>
        <Grid container spacing={3} className="gift-cards-panel">
          {loading && <LoadingBar />}
          {!loading && giftCards.length < 1 && <h6>No Gift Cards Found</h6>}
          {!loading &&
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
