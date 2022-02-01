import React from 'react';
import {
  Box,
  Button,
  Card,
  FormLabel,
  Grid,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import OrderDetail from '../../components/order-detail';
import Tip from '../../components/tip';
import Rewards from '../../components/rewards';
import PaymentInfo from '../../components/payment-info';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import StoreInfoBar from '../../components/store-info-bar';

const Checkout = () => {
  const [time, setTime] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };
  return (
    <Box>
      <StoreInfoBar />
      <Grid container>
        <Grid item xs={1} sm={1} md={1} lg={1} />

        <Grid item xs={10} sm={10} md={10} lg={10}>
          <Card>
            <Grid container>
              <Grid item xs={1} sm={0.5} md={0.5} lg={1} xl={1} />
              <Grid item xs={10} sm={11} md={11} lg={10} xl={10}>
                <Grid container>
                  <Grid item xs={12} md={6} lg={6}>
                    <Grid
                      container
                      sx={{ justifyContent: 'center', alignItem: 'center' }}
                    >
                      <Grid item xs={12}>
                        <Typography variant="h6" title="WHO IS PICKING UP?">
                          WHO IS PICKING UP?
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4" title="PICK UP INFO">
                          PICK UP INFO
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          aria-label="Name"
                          label="Name"
                          aria-required="true"
                          title="Name"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <TextField
                          aria-label="Phone Number"
                          label="Phone Number"
                          aria-required="true"
                          title="Phone Number"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          aria-label="Email"
                          label="Email"
                          aria-required="true"
                          title="Email"
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label="send me emails with special offers and updates"
                            aria-label="send me emails with special offers and updates"
                            aria-required="true"
                            title="send me emails with special offers and updates"
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="h6" title="PICKUP TIME">
                          PICKUP TIME
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h4" title="THURSDAY SEPT.9TH">
                        THURSDAY SEPT.9TH
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Button aria-label="change" title="change">
                        (change)
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <FormControl>
                          <FormLabel
                            title="QUICKEST"
                            id="demo-row-radio-buttons-group-label"
                          >
                            QUICKEST
                          </FormLabel>
                          <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                          >
                            <Grid item lg={3} md={6} sm={6} xs={6}>
                              <FormControlLabel
                                value="6:10"
                                control={<Radio />}
                                label="6:10"
                                aria-label="6:10"
                                title="6:10"
                              />
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} xs={6}>
                              <FormControlLabel
                                value="6:20"
                                control={<Radio />}
                                label="6:20"
                                aria-label="6:20"
                              />
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} xs={6}>
                              <FormControlLabel
                                value="6:30"
                                control={<Radio />}
                                label="6:30"
                                aria-label="6:30"
                                title="6:30"
                              />
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} xs={6}>
                              <FormControlLabel
                                value="6:40"
                                control={<Radio />}
                                label="6:40"
                                aria-label="6:40"
                                title="6:40"
                              />
                            </Grid>
                          </RadioGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="select-more-times"
                          aria-label="More Times"
                          title="More Times"
                        >
                          MORE TIMES
                        </InputLabel>
                        <Select
                          id="select-label"
                          labelId="select-more-times"
                          value={time}
                          onChange={handleChange}
                          label="Select More times"
                          title="Select More times"
                        >
                          <MenuItem value={10} title="7:10">
                            7:10
                          </MenuItem>
                          <MenuItem value={20} title="8:10">
                            8:10
                          </MenuItem>
                          <MenuItem value={30} title="9:10">
                            9:10
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={1} sm={0.5} md={0.5} lg={1} xl={1} />
            </Grid>
            <Divider />
            {/*second section*/}
            <OrderDetail />
            <Divider />
            <Rewards />
            <Divider />
            <Tip />
            <Divider />
            <PaymentInfo />

            {/*second section ends here*/}
          </Card>
        </Grid>

        <Grid item xs={1} sm={1} md={1} lg={1} />
      </Grid>
    </Box>
  );
};

export default Checkout;
