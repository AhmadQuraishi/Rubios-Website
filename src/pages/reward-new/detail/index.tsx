import { Button, Card, Grid } from '@mui/material';
import Page from '../../../components/page-title';
import './index.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getRewardRedemptionCode,
  getRedeemableRedemptionCode,
} from '../../../redux/actions/reward/redemption';
import RewardListSkeletonUI from '../../../components/rewards-list-skeleton';
import { QRCodeSVG } from 'qrcode.react';

const RewardNewDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const name = query.get('name');
  const type = query.get('type');
  const { redemption, loading1, error } = useSelector(
    (state: any) => state.redemptionReducer,
  );

  useEffect(() => {
    if (id) {
      if (type === 'reward') {
        dispatch(getRewardRedemptionCode(id));
      } else if (type === 'redeemable') {
        dispatch(getRedeemableRedemptionCode(id));
      } else {
        navigate(`/account/reward-new`);
      }
    } else {
      navigate(`/account/reward-new`);
    }
  }, []);

  useEffect(() => {
    if (error && error.data && !loading1) {
      navigate(`/account/reward-new`);
    }
  }, [error]);

  return (
    <Page title={'Reward Points Detail'} className="">
      {loading1 && <RewardListSkeletonUI />}
      {redemption &&
        (redemption.internal_tracking_code ||
          redemption.redemption_tracking_code) &&
        name !== '' && (
          <>
            <div style={{ paddingBottom: '40px' }}>
              <h1>{name}</h1>
              <p className="p-detail">
                Please scan the QR code below at the register to redeem your
                reward.
              </p>
              <Card className="reward-point-qr">
                <QRCodeSVG
                  value={
                    type === 'reward'
                      ? redemption.internal_tracking_code
                      : redemption.redemption_tracking_code
                  }
                />
                <p className="p-number">
                  {redemption.internal_tracking_code ||
                    redemption.redemption_tracking_code}
                </p>
              </Card>
            </div>
            <Grid container>
              <Grid item xs={12} sm={8.5} md={8.5} lg={8.5}>
                <Button
                  aria-label="invite"
                  title="invite"
                  variant="contained"
                  sx={{
                    width: '100%',
                    background: '#0075bf',
                    fontSize: '15px',
                    marginTop: '20px',
                  }}
                  onClick={() => {
                    navigate('/account/reward-new');
                  }}
                >
                  VIEW REWARDS
                </Button>
              </Grid>
            </Grid>
          </>
        )}
    </Page>
  );
};
export default RewardNewDetail;
