import { Box, Button, Grid, Typography } from '@mui/material';
import receipt from '../../assets/imgs/receipt.png';
import LeftMenuBar from '../../components/left-menu-bar';

const Invite = () => {
  const code = '1234566778';
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
        <Box>
          <Grid container>
            {/*column for space*/}
            <Grid item xs={1} sm={1} md={1} />

            <Grid item xs={10} sm={8} md={5}>
              <Typography variant="h4">GIVE $5 , GET $5</Typography>
              <Typography variant="body1">
                Earn $5 off when your friends use the invite code below to Sign
                Up for Rubio's Rewards and make their first purchase.
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
      </Grid>
    </Grid>
  );
};

export default Invite;
