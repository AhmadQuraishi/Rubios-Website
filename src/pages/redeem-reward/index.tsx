import { Card, CardContent, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './redeem-reward.css';
import { useEffect, Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRewards } from '../../redux/actions/reward';
import RewardListSkeletonUI from '../../components/rewards-list-skeleton';
import { useNavigate } from 'react-router-dom';
import {
  getRedemptionCode,
  setReward,
} from '../../redux/actions/reward/redemption';
import { displayToast } from '../../helpers/toast';

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
}));

const RedeemRewards = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isRedeem, setIsredeem] = useState(false);
  const [reward_name, setRewardName] = useState('');
  const { rewards, loading } = useSelector((state: any) => state.rewardReducer);
  const { redemption, error, loading1 } = useSelector(
    (state: any) => state.redemptionReducer,
  );
  useEffect(() => {
    dispatch(getRewards());
  }, []);

  const handler = (id: string, name: string) => {
    setRewardName(name);
    dispatch(getRedemptionCode(id));
    setIsredeem(true);
  };
  useEffect(() => {
    if (redemption !== null && !loading1 && isRedeem) {
      setIsredeem(false);
      dispatch(setReward(reward_name));
      navigate(`reward`);
      setTimeout(() => {
        dispatch(setReward(''));
      }, 86400000);
    } else if (error && error.message && !loading1 && isRedeem) {
      displayToast('ERROR', 'failed to redeem this reward');
      setIsredeem(false);
    }
  }, [redemption]);

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

        <Grid item xs={12} lg={10}>
          <Grid container spacing={2}>
            {loading && <RewardListSkeletonUI />}
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
                  click a reward to start your order
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
