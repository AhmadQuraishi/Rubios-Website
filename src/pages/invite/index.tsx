import { Button, Grid, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import './invite.css';
import { useSelector } from 'react-redux';
import { displayToast } from '../../helpers/toast';
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 20px 40px 20px',
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
  const [inviteCode, setInviteCode] = useState('');
  const { providerToken } = useSelector((state: any) => state.providerReducer);

  useEffect(() => {
    if (providerToken && providerToken.referral_code) {
      setInviteCode(providerToken.referral_code);
    }
  }, [providerToken]);
  const copy = async () => {
    await navigator.clipboard.writeText(inviteCode);
    displayToast('SUCCESS', 'Invite Code copied to clipboard.');
  };
  const handleClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Sign up Rubios and GET $5 OFF YOUR NEXT ORDER',
          text: "Here's the link to Join Us!",
          url: `/register?invite_code=${inviteCode}`,
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch((error) => {
          console.error('Something went wrong', error);
        });
    }
  };
  return (
    <div className={classes.root}>
      <Typography
        variant="h1"
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
                aria-label={`Tab to copy: ${inviteCode}`}
                title={`Tab to copy: ${inviteCode}`}
                sx={{ width: { xs: '100%' } }}
                className="tab-to-copy"
              >
                <span className="copy-text">Tab to copy.</span> {inviteCode}
              </Button>
            </Grid>
            <Grid sx={{ display: { lg: 'none', md: 'flex' } }} item xs={12}>
              <Button
                aria-label="invite"
                title="invite"
                variant="contained"
                onClick={handleClick}
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
