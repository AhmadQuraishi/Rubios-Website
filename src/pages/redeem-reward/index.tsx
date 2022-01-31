import {
  Grid,
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Link,
  CardContent,
} from '@mui/material';
import { Fragment } from 'react';
import FoodMenuCard from '../../components/food-menu-card';
import LeftMenuBar from '../../components/left-menu-bar';

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
  ];
  return (
    <Fragment>
      <Grid container>
      <Grid
          item
          xs={0}
          sm={3}
          lg={2}
          sx={{ display: { xs: 'none', sm: 'grid' } }}
        >
          <LeftMenuBar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          lg={10}
          sx={{ padding: { xs: '30px 20px', sm: '30px 40px' } }}
        >
          <Grid container>
            <Typography variant="h3">REDEEM YOUR REWARDS</Typography>
            <Typography variant="body1">
              click a reward to start your order
            </Typography>
            <FoodMenuCard menuItems={menuItems1} />
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default RedeemRewards;
