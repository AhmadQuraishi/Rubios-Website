import React from 'react';
import { Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import PersonalInfo from '../../components/personal-info';
import Page from '../../components/page-title';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 20px 40px 20px',
    maxWidth: '1260px',
    boxSizing: 'border-box',
    margin: 'auto',
  },
  heading: {
    paddingBottom: '5px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px !important',
    },
  },
  tabspanel: {
    fontFamily: "'grit_sansbold' !important",
    fontSize: '14px !important',
    color: theme.palette.secondary.main + ' !important',
  },
}));

const Profile = () => {
  const classes = useStyles();

  return (
    <Page title={'Profile'} className="">
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography
            className={classes.heading}
            aria-label="edit profile"
            variant="h1"
            title="Edit Profile"
            sx={{fontFamily: "'grit_sansbold' !important"}}
          >
            EDIT PROFILE
          </Typography>
          <PersonalInfo />
        </Grid>
      </Grid>
    </Page>
  );
};

export default React.memo(Profile);
