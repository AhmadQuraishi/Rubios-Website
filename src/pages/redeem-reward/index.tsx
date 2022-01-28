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
    <>
      <Grid container>
        <Grid item xs={2}>
          <LeftMenuBar />
        </Grid>
        <Grid item xs={10} style={{ padding: '50px'}}>
          <Grid container>
            <Typography variant="h3">REDEEM YOUR REWARDS</Typography>
            <Typography variant="body1">
              click a reward to start your order
            </Typography>
            <FoodMenuCard menuItems={menuItems1} />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default RedeemRewards;
