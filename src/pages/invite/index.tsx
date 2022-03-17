import { Button, Grid, TextField, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment } from 'react';
import './invite.css';
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

const Invite = () => {
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
        title="Give $5, Get $5"
      >
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
      </Grid>
    </div>
  );
};

export default Invite;
