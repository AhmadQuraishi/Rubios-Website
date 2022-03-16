import { Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FoodMenuCard from '../../components/food-menu-card';
import './redeem-reward.css';
import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRewards } from '../../redux/actions/reward';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 15px 20px 15px',
    maxWidth: '990px',
    boxSizing: 'border-box',
  },
  heading: {
    paddingBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
}));

const RedeemRewards = () => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { rewards, loading } = useSelector((state: any) => state.rewardReducer);
  useEffect(() => {
    dispatch(getRewards());
  }, []);

  useEffect(() => {
    if (rewards && rewards.rewards) {
      console.log('Redeem Rewards', rewards.rewards);
    }
  }, [rewards]);

  const menuItems1 = [
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Free Regular Sized',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Buy one Get one Free',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Free Regular Sized',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Buy one Get one Free',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Buy one Get one Free',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Buy one Get one Free',
    },
    {
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU',
      name: 'Buy one Get one Free',
    },
  ];
  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography
            variant="h4"
            className={classes.heading}
            title="REDEEM YOUR REWARDS"
          >
            REDEEM YOUR REWARDS
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            title="REDEEM YOUR REWARDS"
            className="body-text"
          >
            click a reward to start your order
          </Typography>
        </Grid>
        <Grid item xs={12} lg={10}>
          <FoodMenuCard menuItems={menuItems1} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default RedeemRewards;
