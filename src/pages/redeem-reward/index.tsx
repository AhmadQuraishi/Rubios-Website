import { Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import FoodMenuCard from '../../components/food-menu-card';
import './redeem-reward.css';

const RedeemRewards = () => {
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
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" title="REDEEM YOUR REWARDS">
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
