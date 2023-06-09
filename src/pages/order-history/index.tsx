import React from 'react';
import { Grid, Theme, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';
import FavoriteOrders from '../../components/favorite-orders';
import RecentOrders from '../../components/recent-orders';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '30px 20px 40px 70px',
    [theme.breakpoints.down('lg')]: {
      padding: '30px 30px 40px 30px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '30px 20px 40px 20px',
    },
    maxWidth: '1100px',
    boxSizing: 'border-box',
  },
  heading: {
    paddingBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
  tabspanel: {
    fontFamily: 'Poppins-Medium !important',
    fontSize: '14px !important',
    color: theme.palette.secondary.main + ' !important',
  },
}));

const OrdersHistory = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography
          className={classes.heading}
          aria-label="your orders"
          variant="h4"
          title="your orders"
        >
          YOUR ORDERS
        </Typography>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="Order History tabs"
          title="Order History tabs"
          TabIndicatorProps={{
            style: {
              backgroundColor: '#79C043',
            },
          }}
        >
          <Tab
            aria-label="favorite orders"
            value="1"
            label="FAVORITES"
            title="favourite orders"
            className={classes.tabspanel}
          />
          <Tab
            aria-label="recent orders"
            value="2"
            label="RECENT"
            title="recent orders"
            className={classes.tabspanel}
          />
        </Tabs>
        <br />
        {value === '1' && <FavoriteOrders />}
        {value === '2' && <RecentOrders />}
        {/*{value === '2' && (*/}
        {/*  <Fragment>*/}
        {/*    <h1>Recent Orders</h1>*/}
        {/*  </Fragment>*/}
        {/*)}*/}
        {/*{orders.length > 0 && (*/}
        {/*  <Fragment>*/}
        {/*    {orders.map((order: any, index) => (*/}
        {/*      <h1 key={index}>{order.timeplaced}</h1>*/}
        {/*    ))}*/}
        {/*  </Fragment>*/}
        {/*)}*/}
      </Grid>
    </Grid>
  );
};

export default React.memo(OrdersHistory);
