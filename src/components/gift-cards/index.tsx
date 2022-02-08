import React, { Fragment } from 'react';
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

const GiftCards = () => {
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
          {giftcardsList.map((card, index) => (
            <Grid item xs={12} md={6} key={card.title + index}>
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
                      <Typography variant="h6" title={card.title}>
                        {card.title}
                      </Typography>
                      <Typography variant="h6" title={card.number}>
                        {card.number}
                      </Typography>
                      <Typography variant="h6" title={card.balance.toString()}>
                        Balance:${card.balance}
                      </Typography>
                    </CardContent>
                  </Grid>
                  <Grid item xs={6} sm={8} md={5} lg={7} />
                  <Grid item xs={12} className="order-Link">
                    <Link
                      title="Edit"
                      aria-label="Edit card"
                      to="/account/updatepaymentcard/1"
                    >
                      Edit
                    </Link>
                    <Button title="Delete">Delete</Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12}></Grid>
          <Grid item xs={12} md={6} sx={{ paddingTop: '0px !important' }}>
            <Link
              title="Add Card"
              aria-label="Add payment card"
              to="/account/updatepaymentcard"
              className="button-add-card"
            >
              ADD GIFT CARD
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GiftCards;
