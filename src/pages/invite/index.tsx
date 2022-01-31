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
    <Grid container spacing={0}>
      <Grid
        item
        xs={0}
        sm={3}
        lg={2}
        sx={{ display: { xs: 'none', sm: 'grid' } }}
      >
        <LeftMenuBar />
      </Grid>
      <Grid
        item
        xs={12}
        sm={9}
        lg={10}
        sx={{ padding: { xs: '30px 20px', sm: '30px 40px' } }}
      >
        <Grid container>
          <Grid item xs={12} md={8} lg={6}>
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h4">GIVE $5 , GET $5</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Earn $5 off when your friends use the invite code below to
                  Sign Up for Rubio's Rewards and make their first purchase.
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
      </Grid>
    </Grid>
  );
};

export default Invite;
