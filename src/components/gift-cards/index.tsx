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
        <Grid container>
          {giftcardsList.map((card, index) => (
            <Fragment key={card.title + index}>
              <Grid item xs={12} md={5}>
                <Card>
                  <Grid container>
                    <Grid item xs={4} md={4}>
                      <CardMedia
                        component="img"
                        width="24px"
                        image={card.icon}
                        alt="Gift card icon"
                        aria-label="Gift card icon"
                        title="Gift card icon"
                      />
                    </Grid>
                    <Grid item xs={8} md={8}>
                      <CardContent>
                        <Typography variant="body1" title={card.title}>
                          {card.title}
                        </Typography>
                        <Typography variant="body1" title={card.number}>
                          {card.number}
                        </Typography>
                        <Typography
                          variant="body1"
                          title={card.balance.toString()}
                        >
                          Balance:${card.balance}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={6} sm={8} md={5} lg={7} />
                    <Grid item xs={6} sm={4} md={7} lg={5}>
                      <Link
                        title="Edit"
                        aria-label="Edit card"
                        to="/account/updatepaymentcard"
                      >
                        Edit
                      </Link>
                      <Button title="Delete">Delete</Button>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={0} md={0.5} />
            </Fragment>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={6}>
        <Link
          title="ADD GIFT CARD"
          aria-label="Add gift card"
          to="/account/updatepaymentcard"
        >
          ADD GIFT CARD
        </Link>
      </Grid>

      <Grid item xs={6}></Grid>
    </Grid>
  );
};

export default GiftCards;
