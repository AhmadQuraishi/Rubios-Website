import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import './scan-to-redeem.css';
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
  const navigate = useNavigate();
  // const [qrCode, setQrCode] = useState('');
  const { redemption, reward_name } = useSelector(
    (state: any) => state.redemptionReducer,
  );

  // useEffect(() => {
  //   if (redemption && redemption.internal_tracking_code)
  //     setQrCode(
  //       `http://api.qrserver.com/v1/create-qr-code/?data=${
  //         redemption.internal_tracking_code
  //       }!&size=${2}`,
  //     );
  // }, []);

  const classes = useStyles();

  const copy = async (code: string) => {
    await navigator.clipboard.writeText(code);
  };
  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
        className={classes.heading}
        title="Redeem your rewards"
      >
        REDEEM YOUR REWARDS
      </Typography>
      {redemption && redemption !== null && reward_name !== '' && (
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
                <br/>
                Please note, you will need to add the appropriate free or discounted item to your order before redeeming the reward.
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
                        {/* <CardMedia
                          component="img"
                          title="QRcode"
                          image={qrCode}
                          alt="QRcode"
                          className="qrcode-img"
                        /> */}
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
              {/*<Typography*/}
                {/*variant="body2"*/}
                {/*className="body-text"*/}
                {/*title="Please be sure to add the appropriate free or discounted item to*/}
              {/*your order in order to redeem the reward."*/}
              {/*>*/}
                {/*Please be sure to add the appropriate free or discounted item to*/}
                {/*your order in order to redeem the reward.*/}
              {/*</Typography>*/}

              {/* <Grid item xs={12}>
                <Button
                  onClick={() => {
                    copy(redemption.internal_tracking_code);
                  }}
                  aria-label={`Tab to copy: ${redemption.internal_tracking_code}`}
                  title={`Tab to copy: ${redemption.internal_tracking_code}`}
                  sx={{ width: { xs: '100%' } }}
                  className="tab-to-copy"
                >
                  <span className="copy-text">Tab to copy.</span>{' '}
                  {redemption.internal_tracking_code}
                </Button>
              </Grid> */}
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
