import React from 'react';
import { Grid, Theme, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';
import PersonalInfo from '../../components/personal-info';
import Password from '../../components/password';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '30px 20px 40px 20px',
    maxWidth: '1260px',
    boxSizing: 'border-box',
    margin: 'auto',
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

const Profile = () => {
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
          aria-label="edit profile"
          variant="h4"
          title="Edit Profile"
        >
          EDIT PROFILE
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
            aria-label="personal info"
            value="1"
            label="personal info"
            title="Personal info"
            className={classes.tabspanel}
          />
          <Tab
            aria-label="password"
            value="2"
            label="Password"
            title="password"
            className={classes.tabspanel}
          />
        </Tabs>
        <br />
        {value === '1' && <PersonalInfo />}
        {value === '2' && <Password />}
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

export default React.memo(Profile);
