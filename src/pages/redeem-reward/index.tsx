import { Card, CardContent, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import FoodMenuCard from '../../components/food-menu-card';
import './redeem-reward.css';
import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRewards } from '../../redux/actions/reward';
import RewardListSkeletonUI from '../../components/rewards-list-skeleton';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 15px 20px 15px',
    // maxWidth: '990px',
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
          <Grid container spacing={2}>
            {loading && <RewardListSkeletonUI />}
            {!loading && rewards && rewards.length == 0 && (
              <Typography>You havn't earned any rewards yet!</Typography>
            )}
            {!loading &&
              rewards &&
              rewards.length > 0 &&
              rewards.map((reward: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={Math.random() + index}>
                  <Card className="reward-item">
                    <Grid container className="rewards">
                      <Grid item xs={5}>
                        {reward.reward_image_url ? (
                          <img
                            className="item-image"
                            src={reward.reward_image_url}
                            alt={reward.name}
                            title={reward.name}
                          />
                        ) : (
                          <img
                            className="item-image"
                            src={require('../../assets/imgs/default_img.png')}
                            alt={reward.name}
                            title={reward.name}
                          />
                        )}
                      </Grid>
                      <Grid item xs={7}>
                        <CardContent
                          sx={{
                            flex: '1 0 auto',
                            textAlign: 'left',
                            paddingLeft: '20px',
                          }}
                        >
                          <Typography
                            variant="caption"
                            title={reward.name || reward.description}
                            className="item-name"
                          >
                            {reward.name || reward.description}
                          </Typography>
                        </CardContent>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default RedeemRewards;
