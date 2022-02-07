import { Button, Grid, TextField, Typography } from '@mui/material';
import { Fragment } from 'react';
import './invite.css';

const Invite = () => {
  const barcode = 'ABRAHAM12344';
  const copy = async () => {
    await navigator.clipboard.writeText(barcode);
  };
  return (
    <Fragment>
      <Typography variant="h4" title="Give $5, Get $5">
        GIVE $5 , GET $5
      </Typography>
      <Grid container className="invite-section">
        <Grid item xs={12} md={8} lg={6}>
          <Grid container>
            <Typography
              variant="body2"
              className="body-text"
              title="Earn $5 off when your friends use the invite code below to Sign Up
              for Rubio's Rewards and make their first purchase."
            >
              Earn $5 off when your friends use the invite code below to Sign Up
              for Rubio's Rewards and make their first purchase.
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
                INVITE
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ display: { xs: 'flex', sm: 'none' } }}
            aria-label="back"
            title="back"
          >
            back
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Invite;
