import { Button, Grid, Theme, Typography, useTheme, useMediaQuery } from '@mui/material';
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
  const theme = useTheme();
  const [inviteCode, setInviteCode] = useState('');
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useEffect(() => {
    if (providerToken && providerToken.referral_code) {
      setInviteCode(providerToken.referral_code);
    }
  }, [providerToken]);
  const copy = async () => {
    await navigator.clipboard.writeText(inviteCode);
    if(!isMobile){
      displayToast('SUCCESS', 'Invite Code copied to clipboard.');
    }
  };
  // const linkElement = process.env.REACT_APP_RUBIOS_REWARD_ADDRESS
  const handleClick = () => {
    const linkElement = process.env.REACT_APP_RUBIOS_REWARD_ADDRESS
       let shareData = {
        title: 'Use My Rubio’s Rewards Invite Code and Save $5!',
        text: `Join Rubio's Rewards at ${linkElement} and use my code ${inviteCode} to get $5 off your next order!`,
        // url:  linkElement,
       }
    if (navigator.canShare && navigator.canShare(shareData)) {
      navigator
        .share(shareData)
        .then(() => {
          console.log('Successfully shared');
        })
        .catch((error) => {
          console.error('Something went wrong', error);
        });
    }else{
          displayToast("ERROR", 'This feature not supported for this browser')
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
                aria-label={`Tap to copy: ${inviteCode}`}
                title={`Tap to copy: ${inviteCode}`}
                sx={{ width: { xs: '100%' } }}
                className="tab-to-copy"
              >
                <span className="copy-text">Tap to copy:</span> {inviteCode}
              </Button>
            </Grid>
            <Grid sx={{ display: { md: 'flex' } }} item xs={12}>
            {/* <a style={{textDecoration: 'none'}} href = {`mailto: ?Subject= Use My Rubio’s Rewards Invite Code and Save $5!&body=Join Rubio's Rewards at ${linkElement} and use my code ${inviteCode} to get $5 off your next order!`}> */}
              <Button
                aria-label="invite"
                title="invite"
                variant="contained"
                onClick={handleClick}
                sx={{ width: { xs: '100%', sm: '400px' }}}
              >
                INVITE
              </Button>
              {/* </a> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Invite;
