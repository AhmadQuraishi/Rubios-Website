import React, { Fragment } from 'react';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import card from '../../assets/imgs/card.png';
import { Link } from 'react-router-dom';
import './index.css';

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
        <Grid container spacing={3} className="credit-cards-panel">
          {creditcardsList.map((card, index) => (
            <Fragment key={index.toString()}>
              <Grid item xs={12} md={6}>
                <Card className="card-panel">
                  <Grid container>
                    <Grid item xs={2}>
                      <img
                        src={require('../../assets/imgs/cc-card-unselected.png')}
                        alt="Credit card icon"
                        title="Credit card icon"
                      />
                    </Grid>
                    <Grid item xs={10}>
                      <CardContent className="panel">
                        <Typography variant="h6" title={card.title}>
                          {card.default ? (
                            <Fragment>
                              <b>DEFAULT</b> {card.title}
                            </Fragment>
                          ) : (
                            `${card.title}`
                          )}
                        </Typography>
                        <Typography variant="h6" title={card.number}>
                          {card.number}
                        </Typography>
                        <Typography variant="h6" title={card.exp_date}>
                          {card.exp_date}
                        </Typography>
                      </CardContent>
                    </Grid>
                    <Grid item xs={12} className="order-Link">
                      <Link
                        title="Edit"
                        aria-label="Edit card"
                        to="/account/updatepaymentcard"
                      >
                        Edit
                      </Link>
                      <Button title="Delete">Delete</Button>
                      {!card.default && (
                        <Button title="Make default" className="default">
                          Make default
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Fragment>
          ))}
          <Grid item xs={12}></Grid>
          <Grid item xs={12} md={6} sx={{ paddingTop: '0px !important' }}>
            <Link
              title="Add Card"
              aria-label="Add payment card"
              to="/account/updatepaymentcard"
              className="button-add-card"
            >
              ADD CARD
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreditCards;
