import { Grid, Typography, Card, TextField } from '@mui/material';
import LeftMenuBar from '../../components/left-menu-bar';

const UpdatePaymentCard = () => {
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
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              sx={{
                paddingBottom: '10px',
                color: 'secondary.main',
                fontWeight: 700,
                fontFamily: 'Poppins-Bold !important',
                textTransform: 'uppercase',
              }}
            >
              Edit Payment Information
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item sm={8}>
                <Grid container spacing={0}>
                  <Grid item xs={12}>
                    <TextField
                      aria-label="Card Nickname"
                      aria-required="true"
                      id="card_nickname"
                      label="Card Nickname"
                      variant="outlined"
                      sx={{ width: '90%'}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      aria-label="Name"
                      aria-required="true"
                      id="Name"
                      label="Name"
                      variant="outlined"
                      sx={{ width: '90%'}}
                    />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField
                      aria-label="Card Number"
                      aria-required="true"
                      id="card_number"
                      label="Card Number"
                      variant="outlined"
                      sx={{ width: '90%'}}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sm={4}>
                <Card>hello</Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UpdatePaymentCard;
