import { Box, Button, Grid, Typography } from '@mui/material';
import receipt from '../../assets/imgs/receipt.png';
import LeftMenuBar from '../../components/left-menu-bar';
import React from 'react';

const Invite = () => {
  const barcode = '1234566778';
  const copy = async () => {
    await navigator.clipboard.writeText(barcode);
  };
  return (
    <Grid container>
      <Grid item xs={12} md={8} lg={6}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">GIVE $5 , GET $5</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Earn $5 off when your friends use the invite code below to Sign Up
              for Rubio's Rewards and make their first purchase.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={copy}>Tab to copy: {barcode}</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained">INVITE</Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button sx={{ display: { xs: 'flex', sm: 'none' } }}>back</Button>
      </Grid>
    </Grid>
  );
};

export default Invite;
