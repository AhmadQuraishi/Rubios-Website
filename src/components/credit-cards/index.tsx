import React, { Fragment } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import card from '../../assets/imgs/card.png';
import { Link } from 'react-router-dom';

const CreditCards = () => {
  const creditcardsList = [
    {
      icon: card,
      title: 'Company Card',
      number: 'Mastercard x-9345',
      exp_date: 'Exp 12/28',
      default: true,
    },
    {
      icon: card,
      title: `Personal Card`,
      number: 'Mastercard x-9345',
      exp_date: 'Exp 12/28',
      default: false,
    },
    {
      icon: card,
      title: 'Credit Card',
      number: 'Mastercard x-9345',
      exp_date: 'Exp 12/28',
      default: false,
    },
  ];
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          {creditcardsList.map((card, index) => (
            <Fragment key={index.toString()}>
              <Grid item xs={12} md={5}>
                <Card>
                  <Grid container>
                    <Grid item xs={4} md={4}>
                      <CardMedia
                        component="img"
                        width="24px"
                        image={card.icon}
                        alt="Gift card icon"
                        title="Gift card icon"
                      />
                    </Grid>
                    <Grid item xs={8} md={8}>
                      <CardContent>
                        <Typography variant="body1" title={card.title}>
                          {card.default ? (
                            <Fragment>
                              <span>DEFAULT</span> {card.title}
                            </Fragment>
                          ) : (
                            `${card.title}`
                          )}
                        </Typography>
                        <Typography variant="body1" title={card.number}>
                          {card.number}
                        </Typography>
                        <Typography variant="body1" title={card.exp_date}>
                          {card.exp_date}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={12}>
                      <Link to="/account/updatepaymentcard">
                        <Button title="Edit">Edit</Button>
                      </Link>
                      <Button title="Delete">Delete</Button>
                      {!card.default && (
                        <Button title="Make default">Make default</Button>
                      )}
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
        <Link aria-label="Add payment card" to="/account/updatepaymentcard">
          <Button variant="contained" title="Add Card">
            ADD CARD
          </Button>
        </Link>
      </Grid>

      <Grid item xs={6}></Grid>
    </Grid>
  );
};

export default CreditCards;
