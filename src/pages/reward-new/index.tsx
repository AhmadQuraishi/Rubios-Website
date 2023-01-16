import { useEffect, useState } from 'react';
import { Card, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link, useNavigate } from 'react-router-dom';
import Page from '../../components/page-title';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getRewards,
  getRewardsLocked,
  getRewardsNew,
} from '../../redux/actions/reward';
import moment from 'moment';
import RewardSkeletonUI from '../../components/rewards-list-skeleton/reward';

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
    textTransform: 'uppercase',
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px !important',
    },
  },
}));

const RewardNew = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [allRedeemables, setAllRedeemables] = useState(null);

  const [redeemables, setRedeemables] = useState<any>({
    400: [],
    700: [],
    1300: [],
  });
  const [points, setPoints] = useState(0);

  const { rewards, loading: loadingRewards } = useSelector(
    (state: any) => state.rewardReducer,
  );
  const { data, loading: loadingRedemptions } = useSelector(
    (state: any) => state.rewardReducerNew,
  );

  const { data: lockedRewards, loading: loadingLockedRewards } = useSelector(
    (state: any) => state.rewardLockedReducer,
  );

  useEffect(() => {
    dispatch(getRewardsNew());
    dispatch(getRewardsLocked());
    dispatch(getRewards());
  }, []);

  useEffect(() => {
    if (data && lockedRewards && !loadingRedemptions) {
      if (data && data.net_balance) {
        setPoints(data.net_balance);
      }
      if (data.redeemables && lockedRewards.redeemables) {
        const redeemablesAll = data.redeemables;
        console.log('working 999');
        if (lockedRewards.redeemables && lockedRewards.redeemables.length) {
          const lockedRedeemables: any = lockedRewards.redeemables.map(
            (redeem: any) => {
              const Index = redeemablesAll.findIndex(
                (allRedeem: any) => allRedeem.id === redeem.redeemable_id,
              );
              if (Index === -1) {
                return {
                  id: redeem.redeemable_id,
                  name: redeem.name,
                  points: redeem.points_required_to_redeem,
                  image: redeem.redeemable_image_url,
                };
              } else {
                return {};
              }
            },
          );
          Array.prototype.push.apply(redeemablesAll, lockedRedeemables);
        }

        let redeemObject: any = {
          400: [],
          700: [],
          1300: [],
        };
        redeemablesAll.forEach((redeem: any) => {
          switch (redeem.points) {
            case 400:
              redeemObject['400'].push(redeem);
              break;
            case 700:
              redeemObject['700'].push(redeem);
              break;
            case 1300:
              redeemObject['1300'].push(redeem);
              break;
            default:
              break;
          }
          console.log('redeemObject', redeemObject);
          setAllRedeemables(redeemablesAll);
          setRedeemables(redeemObject);
        });
      }
    }
  }, [data, lockedRewards, loadingRedemptions]);

  const onRedeemableClicked = (id: any, name: any, disable: any, type: any) => {
    if (!disable) {
      return;
    }
    navigate(`/account/reward/details/${id}?name=${name}&type=${type}`);
  };

  return (
    <Page title={'Reward Points'} className="">
      <Grid container className={classes.root} id="reward-points-container">
        <Grid item xs={12}>
          <Typography
            variant="h1"
            className={classes.heading}
            title="My Rewards"
            sx={{fontFamily: "'grit_sansbold' !important"}}

          >
            My Rewards
          </Typography>
        </Grid>
        {(loadingRedemptions || loadingRewards) && <RewardSkeletonUI />}
        {!loadingRewards && !loadingRedemptions && data && redeemables && (
          <>
            <Grid item xs={12}>
              <Card className="reward-point-panel">
                <p aria-label="you have got">You've Got</p>
                <p className="bold-title">
                  {data && data.net_balance ? data.net_balance : 0} Points
                </p>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h2"
                className="small-heading"
                title="Available Rewards"
              >
                Available Rewards{' '}
                <a href="#instructions">
                  <span aira-label="help Icon" className="help-icon">
                    ?
                  </span>
                </a>
              </Typography>
              {rewards && rewards.length > 0 && (
                <Typography variant="body2" className="body-text-bold-reward">
                  Click on a reward below only if you are redeeming in-store.
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Grid spacing={2} container>
                {rewards && rewards.length === 0 && (
                  <Grid item xs={12}>
                    <Typography>
                      No rewards available. Keep checking in and we'll let you
                      know when it's time to be rewarded.
                    </Typography>
                  </Grid>
                )}
                {rewards && rewards.length > 0 && (
                  <>
                    {rewards.map((reward: any) => {
                      return (
                        <Grid
                          key={`${reward.reward_id}`}
                          item
                          xs={6}
                          md={4}
                          lg={4}
                          sx={{ paddingTop: '10px' }}
                        >
                          <Card
                            role="button"
                            tabIndex={0}
                            aria-label={`${reward.name ? reward.name : ''}`}
                            onKeyPress={(e: any) => {
                              if (e.key === 'Enter') {
                                onRedeemableClicked(
                                  reward.reward_id,
                                  reward.name,
                                  true,
                                  'reward',
                                );
                              }
                            }}
                            className="reward-point-merge-panel"
                          >
                            <Grid container className="content-panel">
                              <Grid item xs={12} lg={5} className="img-panel">
                                <img
                                  src={
                                    reward.reward_image_url
                                      ? reward.reward_image_url
                                      : ''
                                  }
                                  alt="Reward Image"
                                />
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                lg={7}
                                className="content-panel-desc"
                              >
                                <p
                                  aria-label={`${
                                    reward.name ? reward.name : ''
                                  }`}
                                  title={`${reward.name ? reward.name : ''}`}
                                  className="title-heading"
                                >
                                  {reward.name ? reward.name : ''}
                                  <p className="expire">
                                    {' '}
                                    {reward.expiring_at_tz &&
                                    reward.expiring_at_tz !== ''
                                      ? `Expires ${moment(
                                          reward.expiring_at_tz,
                                        ).format('MM/DD/YY')}`
                                      : ''}
                                  </p>
                                </p>
                                <Typography
                                  sx={{ display: { xs: 'none', lg: 'block' } }}
                                  onClick={() =>
                                    onRedeemableClicked(
                                      reward.reward_id,
                                      reward.name,
                                      true,
                                      'reward',
                                    )
                                  }
                                  className="button"
                                >
                                  REDEEM IN RESTURANT
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xs={12}
                                sx={{
                                  display: {
                                    xs: 'flex',
                                    lg: 'none',
                                  },
                                }}
                              >
                                <p
                                  onClick={() =>
                                    onRedeemableClicked(
                                      reward.reward_id,
                                      reward.name,
                                      true,
                                      'reward',
                                    )
                                  }
                                  className="button"
                                >
                                  REDEEM IN RESTURANT
                                </p>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      );
                    })}
                  </>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <hr />
            </Grid>

            {/*{data.redeemables && data.redeemables.length > 0 && (*/}
            <>
              <Grid item xs={12} sx={{ marginTop: { xs: '30px', sm: '0px' } }}>
                <Typography
                  variant="h2"
                  className="small-heading"
                  title="Redeem Points"
                >
                  Redeem Points{' '}
                  <a href="#instructions">
                    <span aira-label="help Icon" className="help-icon">
                      ?
                    </span>
                  </a>
                </Typography>
              </Grid>
              {!allRedeemables && <RewardSkeletonUI />}
              {allRedeemables &&
                redeemables &&
                Object.keys(redeemables).length > 0 &&
                Object.keys(redeemables).map((key: any, index: any) => {
                  return (
                    <>
                      {redeemables[key].length > 0 && (
                        <>
                          <Grid style={{ paddingBottom: 10 }} item xs={12}>
                            <Typography
                              variant="h3"
                              className={`bold-title dd${
                                points >= key ? '' : ' disable'
                              }`}
                              title={`${key} Points`}
                            >
                              {key} Points
                            </Typography>
                            <Typography
                              variant="body2"
                              className={`body-text-bold-redeem ${
                                points >= key ? '' : ' disable'
                              }`}
                            >
                              Click on a reward below only if you are redeeming
                              in-store.
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sx={{
                              marginBottom: { xs: '25px', md: '20px' },
                            }}
                          >
                            <Grid spacing={2} container>
                              {redeemables[key].map((redeem: any) => {
                                return (
                                  <>
                                    {/*<Grid container>*/}
                                    <Grid item xs={6} md={4}>
                                      <Card
                                        role="button"
                                        tabIndex={0}
                                        aria-label={`${
                                          redeem.name ? redeem.name : ''
                                        }`}
                                        onKeyPress={(e: any) => {
                                          if (e.key === 'Enter') {
                                            onRedeemableClicked(
                                              redeem.id,
                                              redeem.name,
                                              points >= key,
                                              'redeemable',
                                            );
                                          }
                                        }}
                                        className="reward-point-merge-panel"
                                      >
                                        {/*<Link to="/account/reward-new/detail">*/}
                                        <Grid
                                          container
                                          className="content-panel"
                                        >
                                          <Grid
                                            item
                                            xs={12}
                                            lg={5}
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                            }}
                                            className="img-panel"
                                          >
                                            <img
                                              src={`${
                                                redeem.image ? redeem.image : ''
                                              }`}
                                              alt="Reward image"
                                            />
                                          </Grid>
                                          <Grid
                                            item
                                            xs={12}
                                            lg={7}
                                            className="content-panel-desc"
                                          >
                                            <p
                                              aria-label={
                                                redeem.name ? redeem.name : ''
                                              }
                                              title={
                                                redeem.name ? redeem.name : ''
                                              }
                                              className="title-heading"
                                            >
                                              <p className="points">
                                                {key} Points
                                              </p>
                                              {redeem.name ? redeem.name : ''}
                                              <p className="expire"></p>
                                            </p>
                                            <Typography
                                              sx={{
                                                display: {
                                                  xs: 'none',
                                                  lg: 'block',
                                                },
                                              }}
                                              onClick={() =>
                                                onRedeemableClicked(
                                                  redeem.id,
                                                  redeem.name,
                                                  points >= key,
                                                  'redeemable',
                                                )
                                              }
                                              className={`button${
                                                points >= key ? '' : ' disable'
                                              }`}
                                            >
                                              REDEEM IN RESTURANT
                                            </Typography>
                                          </Grid>
                                          <Grid
                                            item
                                            xs={12}
                                            sx={{
                                              display: {
                                                xs: 'flex',
                                                lg: 'none',
                                              },
                                            }}
                                          >
                                            <p
                                              onClick={() =>
                                                onRedeemableClicked(
                                                  redeem.id,
                                                  redeem.name,
                                                  points >= key,
                                                  'redeemable',
                                                )
                                              }
                                              className={`button${
                                                points >= key ? '' : ' disable'
                                              }`}
                                            >
                                              REDEEM IN RESTURANT
                                            </p>
                                          </Grid>
                                        </Grid>
                                        {/*</Link>*/}
                                      </Card>
                                    </Grid>
                                    {/*</Grid>*/}
                                  </>
                                );
                              })}
                            </Grid>
                          </Grid>
                        </>
                      )}

                      {index !== Object.keys(redeemables).length - 1 && (
                        <Grid item xs={12}>
                          <hr className="low" />
                        </Grid>
                      )}
                    </>
                  );
                })}
            </>
            {/*)}*/}
            <Grid item xs={12}>
              {/*<hr className="low" />*/}
              <div id="instructions" style={{ paddingTop: 80 }}></div>
            </Grid>

            <Grid item xs={12} lg={7} className="message-panel">
              <h3>HOW TO REDEEM YOUR REWARDS</h3>
              <p className="low-head">In-RESTAURANT ORDERS</p>
              <p>
                Click "Redeem in Restaurant" above and then scan the QR code at
                the register.
              </p>
              <p className="low-head" style={{ marginTop: '20px' }}>
                Online/App Orders
              </p>
              <p>
                Select from your Available Rewards on the checkout screen to
                apply the reward.
              </p>
              <p style={{ paddingTop: '5px' }}>
                <strong>NOTE:</strong> Please be sure to add the free menu item
                to your order before applying the reward.
              </p>
              <p className="back-link" onClick={(e) => window.scrollTo(0, 0)}>
                RETURN TO TOP
              </p>
            </Grid>
          </>
        )}
      </Grid>
    </Page>
  );
};
export default RewardNew;
