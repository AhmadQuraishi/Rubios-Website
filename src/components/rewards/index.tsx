import React, { useEffect, useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  useTheme, 
  useMediaQuery
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import './rewards.css';
import { useDispatch, useSelector } from 'react-redux';
import { applyRewardOnBasketRequest } from '../../redux/actions/reward/checkout/apply';
import { displayToast } from '../../helpers/toast';
import { removeRewardFromBasketRequest } from '../../redux/actions/reward/checkout/remove';

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

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


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
      setSelectedRewardID(basketObj.basket.appliedrewards[0].reference);
      setAlignment(basketObj.basket.appliedrewards[0].reference.toString());
    }
  }, []);

  useEffect(() => {
    if (objRemoveReward && objRemoveReward.basket && removedActionClicked) {
      setRemovedActionClicked(false);
      setSelectedRewardID('');
      if(!isMobile){
        displayToast('SUCCESS', 'Reward removed successfully.');
      }
    }
  }, [objRemoveReward]);

  const applyReward = (membershipid: number, refID: string) => {
    const request = {
      membershipid: membershipid,
      references: [refID],
    };
    if (
      selectedRewardID == refID &&
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
  };
  useEffect(() => {
    if (
      objApplyReward &&
      (objApplyReward.basket || objApplyReward.error) &&
      actionClicked
    ) {
      setActionClicked(false);
      if (objApplyReward.basket) {
        if(!isMobile){
          displayToast('SUCCESS', 'Reward applied successfully.');
        }
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
          <Grid item xs={0} sm={0} md={2} lg={2} />
          <Grid item xs={12} sm={12} md={8} lg={8} className="choose-reward">
            <Typography variant="h2" title="APPLY REWARDS">
              APPLY REWARDS
            </Typography>
            <br />
            <Grid container>
              <FormControl>
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
                        applyReward(reward.membershipid, reward.reference);
                      }}
                      value={reward.reference}
                      className="choose-btn"
                    >
                      <Grid container spacing={2} className="align-item">
                        <Grid item xs={12} sm={5} md={5} lg={5}>
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
                          sm={7}
                          md={7}
                          lg={7}
                          className="icon-content"
                        >
                          <Typography>
                            {reward.quantityavailable > 1
                              ? reward.quantityavailable + ' x ' + reward.label
                              : reward.label}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={0} sm={0} md={2} lg={2} />
        </Grid>
      )}
    </div>
  );
};

export default Rewards;
