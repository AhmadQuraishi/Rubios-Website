import {
  Button,
  Card,
  CardContent,
  Grid,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import './scan-to-redeem.css';
import { getRewardRedemptionCode } from '../../redux/actions/reward/redemption';
import RewardListSkeletonUI from '../../components/rewards-list-skeleton';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 20px 40px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 0px 0px 0px',
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

const ScanToRedeem = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const query = new URLSearchParams(useLocation().search);
  const reward_name = query.get('name');
  const { redemption, loading1, error } = useSelector(
    (state: any) => state.redemptionReducer,
  );

  useEffect(() => {
    if (id) {
      dispatch(getRewardRedemptionCode(id));
    }
  }, []);

  useEffect(() => {
    if (error && error.data && !loading1) {
      navigate(`/account/reward`);
    }
  }, [error]);

  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
        className={classes.heading}
        title="Redeem your rewards"
      >
        REDEEM YOUR REWARDS
      </Typography>
      {loading1 && <RewardListSkeletonUI />}
      {redemption && redemption.internal_tracking_code && reward_name !== '' && (
        <Grid container className="invite-section">
          <Grid item xs={12} md={8} lg={7}>
            <Grid container>
              <Typography
                variant="body2"
                className="body-text"
                title="Scan the QR code below at the register to redeem your reward.

Please note, you will need to add the appropriate free or discounted item to your order before redeeming the reward."
              >
                Scan the QR code below at the register to redeem your reward.
                <br />
                Please note, you will need to add the appropriate free or
                discounted item to your order before redeeming the reward.
              </Typography>
              <Grid item sm={2}></Grid>
              <Grid item xs={12} sm={8} className="scan-reward">
                <Card elevation={0}>
                  <CardContent>
                    <Grid
                      container
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        minHeight: '125px',
                      }}
                    >
                      <Grid item xs={6}>
                        <QRCodeSVG value={redemption.internal_tracking_code} />
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="h6">{reward_name}</Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sm={2}></Grid>
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
                    navigate('/account/reward');
                  }}
                >
                  VIEW REWARDS
                </Button>
                <Button
                  className="label back-btn"
                  onClick={() => {
                    navigate('/account/reward');
                  }}
                >
                  Back
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default ScanToRedeem;
