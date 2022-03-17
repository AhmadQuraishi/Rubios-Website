import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import './scan-to-redeem.css';
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

const ScanToRedeem = () => {
  const [code, setCode] = useState('');
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    setCode('12345678');
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${code}!&size=${2}`,
    );
  }, []);

  const classes = useStyles();
  const barcode = 'ABRAHAM12344';
  const copy = async () => {
    await navigator.clipboard.writeText(barcode);
  };
  return (
    <div className={classes.root}>
      <Typography
        variant="h4"
        className={classes.heading}
        title="Redeem your rewards"
      >
        REDEEM YOUR REWARDS
      </Typography>
      <Grid container className="invite-section">
        <Grid item xs={12} md={8} lg={6}>
          <Grid container>
            <Typography
              variant="body2"
              className="body-text"
              title=" Congratulations! Scan your reward at the register or copy the code
              and apply it to your order."
            >
              Congratulations! Scan your reward at the register or copy the code
              and apply it to your order.
            </Typography>
            <Grid item sm={2}></Grid>
            <Grid item xs={12} sm={8}>
              <Card elevation={0}>
                <CardContent>
                  <Grid container>
                    <Grid item xs={6}>
                      <CardMedia
                        component="img"
                        title="QRcode"
                        image={qrCode}
                        alt="QRcode"
                        className="qrcode-img"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">Free regular Sized</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item sm={2}></Grid>
            <Typography
              variant="body2"
              className="body-text"
              title="Please be sure to add the appropriate free or discounted item to
              your order in order to redeem the reward."
            >
              Please be sure to add the appropriate free or discounted item to
              your order in order to redeem the reward.
            </Typography>

            <Grid item xs={12}>
              <Button
                onClick={copy}
                aria-label={`Tab to copy: ${barcode}`}
                title={`Tab to copy: ${barcode}`}
                sx={{ width: { xs: '100%' } }}
                className="tab-to-copy"
              >
                <span className="copy-text">Tab to copy.</span> {barcode}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                aria-label="invite"
                title="invite"
                variant="contained"
                sx={{ width: { xs: '100%', sm: '400px' } }}
              >
                VIEW REWARDS
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ScanToRedeem;
