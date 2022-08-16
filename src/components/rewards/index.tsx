import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Card,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import './rewards.css';
import { useDispatch, useSelector } from 'react-redux';
import { applyRewardOnBasketRequest } from '../../redux/actions/reward/checkout/apply';
import { displayToast } from '../../helpers/toast';
import { removeRewardFromBasketRequest } from '../../redux/actions/reward/checkout/remove';
import moment from 'moment';

const Rewards = (props: any) => {
  const objApplyReward = useSelector(
    (state: any) => state.applyRewardOnBasketReducer,
  );
  const objRemoveReward = useSelector(
    (state: any) => state.removeRewardFromBasketReducer,
  );
  const basketObj = useSelector((state: any) => state.basketReducer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { rewardsList } = props;
  const rewardsArray: any[] = rewardsList;

  const [actionClicked, setActionClicked] = useState(false);
  const [removedActionClicked, setRemovedActionClicked] = useState(false);
  const [selectedRewardID, setSelectedRewardID] = useState('');

  const [alignment, setAlignment] = React.useState('web');
  const onRewardSelect = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    if (
      basketObj &&
      basketObj.basket &&
      basketObj.basket.appliedrewards &&
      basketObj.basket.appliedrewards.length > 0
    ) {
      setSelectedRewardID(
        basketObj.basket.appliedrewards[0].reference.toString(),
      );
      setAlignment(basketObj.basket.appliedrewards[0].reference.toString());
    }
  }, []);

  useEffect(() => {
    if (objRemoveReward && objRemoveReward.basket && removedActionClicked) {
      setRemovedActionClicked(false);
      setSelectedRewardID('');
      displayToast('SUCCESS', 'Reward removed successfully.');
    }
  }, [objRemoveReward]);

  const applyReward = (membershipid: number, refID: string) => {
    setTimeout(() => {
      setAlignment(refID);
      const request = {
        membershipid: membershipid,
        references: [refID],
      };
      if (
        selectedRewardID === refID.toString() &&
        basketObj &&
        basketObj.basket &&
        basketObj.basket.appliedrewards &&
        basketObj.basket.appliedrewards.length > 0
      ) {
        setRemovedActionClicked(true);
        setSelectedRewardID(refID);
        dispatch(
          removeRewardFromBasketRequest(
            basketObj.basket.id,
            parseInt(basketObj.basket.appliedrewards[0].rewardid),
          ),
        );
      } else {
        setActionClicked(true);
        setSelectedRewardID(refID);
        dispatch(applyRewardOnBasketRequest(basketObj.basket.id, request));
      }
    }, 500);
  };
  useEffect(() => {
    if (
      objApplyReward &&
      (objApplyReward.basket || objApplyReward.error) &&
      actionClicked
    ) {
      setActionClicked(false);
      if (objApplyReward.basket) {
        displayToast('SUCCESS', 'Reward applied successfully.');
      }
      if (objApplyReward.error) {
        setAlignment('web');
      }
    }
  }, [objApplyReward]);

  return (
    <div style={{ position: 'relative' }}>
      {(actionClicked || removedActionClicked) && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            margin: 'auto',
            width: '100%',
            height: '100%',
            background: 'rgba(255, 255, 255, 0)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </div>
      )}
      {rewardsArray && rewardsArray.length > 0 && (
        <Grid container>
          <Grid item xs={0} sm={0} md={1} lg={1} />
          <Grid item xs={12} sm={12} md={10} lg={10} className="choose-reward">
            <Typography variant="h2" title="APPLY REWARDS">
              APPLY REWARDS
            </Typography>
            <br />
            <Grid id="reward-points-container" container>
              <Grid
                item
                xs={12}
                sx={{
                  marginBottom: { xs: '25px', md: '20px' },
                }}
              >
                <Grid container>
                  {rewardsArray.map((reward, index) => (
                    <Grid
                      role="button"
                      aria-lable={
                        reward.quantityavailable > 1
                          ? reward.quantityavailable + ' x ' + reward.label
                          : reward.label
                      }
                      item
                      xs={12}
                      sm={4}
                      sx={{ paddingTop: '16px', paddingRight: '16px' }}
                    >
                      <Card
                        className={`reward-point-merge-panel ${
                          alignment == reward.redeemable_id.toString()
                            ? 'selected'
                            : ''
                        }`}
                        onClick={() => {
                          applyReward(
                            reward.membershipid,
                            reward.redeemable_id.toString(),
                          );
                        }}
                      >
                        <div className="check-mark">
                          <div aria-hidden="true" className="checkmark">
                            L
                          </div>
                        </div>
                        {/*<Link to="/account/reward-new/detail">*/}
                        <Grid container className="content-panel">
                          <Grid
                            item
                            xs={12}
                            lg={5}
                            sx={{
                              display: { xs: 'none', sm: 'flex' },
                              alignItems: 'center',
                            }}
                            className="img-panel"
                          >
                            {reward.imageurl == null && (
                              <img
                                src={require('../../assets/imgs/punchh-icon-thumb.png')}
                                alt=""
                              />
                            )}
                            {reward.imageurl && (
                              <img src={reward.imageurl} alt="" />
                            )}
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            lg={7}
                            className="content-panel-desc"
                          >
                            <p
                              aria-label={
                                reward.quantityavailable > 1
                                  ? reward.quantityavailable +
                                    ' x ' +
                                    reward.label
                                  : reward.label
                              }
                              title={
                                reward.quantityavailable > 1
                                  ? reward.quantityavailable +
                                    ' x ' +
                                    reward.label
                                  : reward.label
                              }
                              className="title-heading"
                            >
                              {reward.localType === 'redemption' && (
                                <p className="points">
                                  {' '}
                                  {reward.points ? reward.points : 0} Points
                                </p>
                              )}
                              {reward.quantityavailable > 1
                                ? reward.quantityavailable +
                                  ' x ' +
                                  reward.label
                                : reward.label}
                              {reward.localType === 'redemption' && (
                                <p className="points mobile-p">
                                  {' '}
                                  {reward.points ? reward.points : 0} Points
                                </p>
                              )}
                              <p className="expire">
                                {' '}
                                {reward.expiring_at_tz && (
                                  <>
                                    Expires{' '}
                                    {moment(reward.expiring_at_tz).format(
                                      'MM/YY',
                                    )}
                                  </>
                                )}
                              </p>
                            </p>
                            <Typography
                              sx={{
                                display: {
                                  xs: 'none',
                                  lg: 'block',
                                },
                              }}
                              className="button hide-button-apply"
                            >
                              APPLY
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            className="hide-button-apply"
                            xs={12}
                            sx={{
                              display: {
                                xs: 'flex',
                                lg: 'none',
                              },
                            }}
                          >
                            <Typography className="button">APPLY</Typography>
                          </Grid>
                        </Grid>
                        {/*</Link>*/}
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              {/* <FormControl>
                <ToggleButtonGroup
                  className="apply-reward"
                  value={alignment}
                  exclusive
                  onChange={onRewardSelect}
                  aria-labelledby="rewards"
                >
                  {rewardsArray.map((reward, index) => (
                    <ToggleButton
                      onClick={() => {
                        applyReward(
                          reward.membershipid,
                          reward.redeemable_id.toString(),
                        );
                      }}
                      value={reward.redeemable_id.toString()}
                      className="choose-btn"
                    >
                      <Grid container className="align-item">
                        <Grid
                          item
                          xs={12}
                          sm={5}
                          sx={{ display: { xs: 'none', sm: 'flex' } }}
                        >
                          {reward.imageurl == null && (
                            <img
                              src={require('../../assets/imgs/punchh-icon-thumb.png')}
                              alt=""
                            />
                          )}
                          {reward.imageurl && (
                            <img src={reward.imageurl} alt="" />
                          )}
                        </Grid>
                        <Grid item xs={12} sm={7} className="icon-content">
                          {reward.localType === 'redemption' && (
                            <Typography className="points">
                              {reward.points ? reward.points : 0} Points
                            </Typography>
                          )}
                          <Typography
                            title={
                              reward.quantityavailable > 1
                                ? reward.quantityavailable +
                                  ' x ' +
                                  reward.label
                                : reward.label
                            }
                          >
                            {reward.quantityavailable > 1
                              ? reward.quantityavailable + ' x ' + reward.label
                              : reward.label}
                          </Typography>
                          <Typography className="expire">
                            {reward.expiring_at_tz && (
                              <>
                                Expires
                                {moment(reward.expiring_at_tz).format('MM/YY')}
                              </>
                            )}
                          </Typography>
                          <Typography className="apply-button">
                            {selectedRewardID ===
                            reward.redeemable_id.toString()
                              ? 'Remove'
                              : 'Apply'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </FormControl> */}
            </Grid>
          </Grid>
          <Grid item xs={0} sm={0} md={1} lg={1} />
        </Grid>
      )}
    </div>
  );
};

export default Rewards;
