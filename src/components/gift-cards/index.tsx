import React, { useEffect, Fragment, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import gc_icon from '../../assets/imgs/gift_card_icon.png';
import { Link } from 'react-router-dom';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBillingAccounts, deleteBillingAccount } from '../../redux/actions/user';
import LoadingBar from '../loading-bar';


const GiftCards = () => {
  const [giftCards, setGiftCards] = useState([]);
  const dispatch = useDispatch();
  const authtoken = useSelector((state: any) => state.TokensReducer.authtoken);
  const {userBillingAccounts, loading } =
    useSelector((state: any) => state.userReducer);
  useEffect(() => {
    dispatch(getAllBillingAccounts(authtoken));
  }, []);

  useEffect(() => {
    if (userBillingAccounts) {
      setGiftCards(userBillingAccounts.billingaccounts);
    }
  }, [userBillingAccounts, loading]);

  const deleteBillingAccountHandler = (id: number) => {
    dispatch(deleteBillingAccount(authtoken, id));
    setTimeout(() => {
      dispatch(getAllBillingAccounts(authtoken));
    }, 600);
  };
  const giftcardsList = [
    {
      icon: gc_icon,
      title: 'Happy Birthday Gift Card',
      number: '00-233-112',
      balance: 1234,
    },
    {
      icon: gc_icon,
      title: `Father's Day Gift card`,
      number: '00-233-112',
      balance: 1234,
    },
    {
      icon: gc_icon,
      title: 'Merry Christmas Gift Card',
      number: '00-233-112',
      balance: 1234,
    },
  ];
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={3} className="gift-cards-panel">
        {loading && <LoadingBar />}
        {!loading && giftCards.length < 1 && (
          <h6>No Gift Cards Found</h6>
        )}
          {!loading &&
          giftCards.length > 0 &&
          giftCards.filter((cardType: any) => cardType.accounttype !== "creditcard" && cardType.accounttype !== "payinstore (cash)").map((card: any, index) => (
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
                      <Typography variant="h6" title={card.balance !== null ? card.balance.toString() : "balance"}>
                        Balance:${card.balance !== null ? card.balance : "0"}
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
                     <Button title="Delete" 
                        onClick={() => deleteBillingAccountHandler(card.accountid)}
                        >Delete</Button>
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
