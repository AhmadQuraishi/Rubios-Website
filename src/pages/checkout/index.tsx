import Map from '../../components/map';
import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import OrderDetail from '../../components/order_detail';
import Tip from '../../components/tip';
import Rewards from '../../components/rewards';

const Checkout = () => {
  return (
    <Box>
      <Grid container>
        <Grid item xs={1} sm={1} md={1} lg={1}></Grid>

        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Card>
            <Grid container>
              <Grid item xs={1} sm={0.5} md={0.5} lg={0.5} xl={1}></Grid>
              <Grid item xs={10} sm={11} md={11} lg={11} xl={10}>
                <Grid container>
                  <Grid item xs={12} md={6} lg={6}>
                    <Grid
                      container
                      sx={{ justifyContent: 'center', alignItem: 'center' }}
                    >
                      <Grid item xs={12}>
                        <Typography variant="h6">WHO IS PICKING UP?</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4">PICK UP INFO</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField placeholder="Name"></TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <TextField placeholder="Phone Number"></TextField>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField placeholder="Email"></TextField>
                      </Grid>

                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="send me emails with special offers and updates"
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h6">PICKUP TIME</Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h4">THURSDAY SEPT.9TH</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button>(change)</Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <Grid item lg={3} md={6} sm={6} xs={6}>
                          <Button variant="contained" key="two">
                            6:10
                          </Button>
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={6}>
                          <Button variant="contained" key="two">
                            6:20
                          </Button>
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={6}>
                          <Button variant="contained" key="two">
                            6:30
                          </Button>
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={6}>
                          <Button variant="contained" key="two">
                            6:40
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} sm={0.5} md={0.5} lg={0.5} xl={1}></Grid>
            </Grid>
            <Divider />
            {/*second section*/}
            <OrderDetail />
            <Divider />
            <Rewards />
            <Divider />
            <Tip />

            {/*second section ends here*/}
          </Card>
        </Grid>

        <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
