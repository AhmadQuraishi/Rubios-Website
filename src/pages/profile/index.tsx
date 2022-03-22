import React from 'react';
import { Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PersonalInfo from '../../components/personal-info';

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
        <PersonalInfo />
      </Grid>
    </Grid>
  );
};

export default React.memo(Profile);
