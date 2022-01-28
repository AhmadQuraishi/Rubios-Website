import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import receipt from '../../assets/imgs/receipt.png';
// import CopyToClipboard from 'react-copy-to-clipboard';

const Invite = () => {
  const code = '1234566778';
  return (
    <Box>
      <Grid container>
        {/*column for space*/}
        <Grid item xs={1} sm={1} md={1} />

        <Grid item xs={10} sm={8} md={5}>
          <Typography variant="h4">GIVE $5 , GET $5</Typography>
          <Typography variant="body1">
            Earn $5 off when your friends use the invite code below to Sign Up
            for Rubio's Rewards and make their first purchase.
          </Typography>
          {/*<CopyToClipboard text={code}>*/}
          {/*  <Button>Tab to copy : {code}</Button>*/}
          {/*</CopyToClipboard>*/}

          <Button variant="contained">INVITE</Button>
        </Grid>

        {/*column for space*/}
        <Grid item xs={1} sm={3} md={6} />
      </Grid>
    </Box>
  );
};

export default Invite;
