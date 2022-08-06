import { Card, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './redeem-reward.css';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRewards } from '../../redux/actions/reward';
import RewardListSkeletonUI from '../../components/rewards-list-skeleton';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 20px 40px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 0px 40px 0px',
    },
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
}));

const RedeemRewards = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rewards, loading } = useSelector((state: any) => state.rewardReducer);
  useEffect(() => {
    dispatch(getRewards());
  }, []);

  const handler = (id: string, name: string) => {
    navigate(`/account/reward/details/${id}?name=${name}`);
  };

  return (
    <Fragment>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography
            variant="h1"
            className={classes.heading}
            title="REDEEM YOUR REWARDS"
          >
            REDEEM YOUR REWARDS
          </Typography>
        </Grid>

        <Grid item xs={12} className="redeem-sec">
          <Grid container spacing={2}>
            {(loading ) && <RewardListSkeletonUI />}
            {!loading && rewards && rewards.length == 0 && (
              <Grid item xs={12}>
                <Typography>
                  No rewards available. Keep checking in and we'll let you know
                  when it's time to be rewarded.
                </Typography>
              </Grid>
            )}
            {!loading && rewards && rewards.length > 0 && (
              <Grid item xs={12}>
                <Typography
                  variant="body2"
                  title="REDEEM YOUR REWARDS"
                  className="body-text"
                >
                  Click a reward below to redeem in restaurant. For online orders, you may select a reward during checkout.
                  <br/>
                  Please note, you will need to add the appropriate free or discounted item to your order before redeeming the reward.
                </Typography>
              </Grid>
            )}

            {!loading &&
              rewards &&
              rewards.length > 0 &&
              rewards.map((reward: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={Math.random() + index}>
                  <Card
                    className="reward-item"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      handler(reward.reward_id, reward.name);
                    }}
                  >
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
                      <Grid item xs={7} className="item-name">
                        <Typography
                          variant="caption"
                          title={reward.name || reward.description}
                        >
                          {reward.name || reward.description}
                        </Typography>
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