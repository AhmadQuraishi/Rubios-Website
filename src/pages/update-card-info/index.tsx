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
          <Grid item xs={12} sx={{ paddingTop: '20px' }}>
            <Grid
              container
              spacing={0}
              sx={{ flexDirection: { xs: 'column-reverse', lg: 'row' } }}
            >
              <Grid
                item
                xs={12}
                lg={8}
                sx={{ paddingRight: { xs: '0px', lg: '25px' } }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                    <TextField
                      aria-label="Card Nickname"
                      aria-required="true"
                      id="card_nickname"
                      label="Card Nickname"
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                    <TextField
                      aria-label="Name"
                      aria-required="true"
                      id="Name"
                      label="Name"
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                    <TextField
                      aria-label="Card Number"
                      aria-required="true"
                      id="card_number"
                      label="Card Number"
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                    <Grid container spacing={0} sx={{ paddingBottom: '20px' }}>
                      <Grid item xs={3}>
                        <TextField
                          aria-label="Card Expirey Month"
                          aria-required="true"
                          id="card_expirey_month"
                          label="MM"
                          variant="outlined"
                          sx={{ width: '90%' }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          aria-label="Card Expirey Year"
                          aria-required="true"
                          id="card_expirey_year"
                          label="YY"
                          variant="outlined"
                          sx={{ width: '90%' }}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TextField
                          aria-label="CVC"
                          aria-required="true"
                          id="cvc"
                          label="CVC"
                          variant="outlined"
                          sx={{ width: '90%' }}
                        />
                      </Grid>
                    </Grid>
                    <TextField
                      aria-label="Card Number"
                      aria-required="true"
                      id="card_number"
                      label="Card Number"
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                    <TextField
                      aria-label="Street Address 1"
                      aria-required="true"
                      id="street_Address"
                      label="Street Address 1"
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                    <TextField
                      aria-label="City & State"
                      aria-required="true"
                      id="city_state"
                      label="City, State"
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ paddingBottom: '20px' }}>
                    <TextField
                      aria-label="Zip Code"
                      aria-required="true"
                      id="zip_code"
                      label="Zip Code"
                      variant="outlined"
                      sx={{ width: '100%' }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} lg={4} sx={{ paddingBottom: { xs: '20px' } }}>
                <Card variant="outlined" sx={{ borderColor: 'primary.main' }}>
                  <Grid container spacing={0} sx={{ padding: '20px' }}>
                    <Grid item xs={3}>
                      <img
                        src={require('../../assets/imgs/card.png')}
                        alt="Card Image"
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body1">Credit Card</Typography>
                      <Typography variant="body1">Mastercard x-9087</Typography>
                      <Typography variant="body1">Exp 01/23</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'right' }}>
                      <Typography
                        variant="body1"
                        color="#999"
                        fontWeight="700"
                        component="a"
                      >
                        DELETE
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UpdatePaymentCard;
