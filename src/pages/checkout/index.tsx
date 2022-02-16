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
  ToggleButtonGroup,
  ToggleButton
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
import StoreInfoBar from '../../components/restaurant-info-bar';
import './checkout.css';

const Checkout = () => {
  const [time, setTime] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setTime(event.target.value as string);
  };

  const [alignment, setAlignment] = React.useState('web');
  const onTimeSlotSelect = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Box className="checkout-wrapper">
      <StoreInfoBar />
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Card className="order">
            <Grid container>
              <Grid container>
                  <Grid item xs={12} md={6} lg={6} className="left-col">
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          variant="caption" className="label"
                          title="WHO IS PICKING UP?"
                        >
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
                            label="Send me emails with special offers and updates"
                            aria-label="Send me emails with special offers and updates"
                            aria-required="true"
                            title="Send me emails with special offers and updates"
                          />
                        </FormGroup>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6} lg={6} className="right-col">
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography variant="caption" title="PICKUP TIME" className="label">
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
                      <Button aria-label="change" title="change" className="caption-grey">
                        (change)
                      </Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container>
                        <FormControl>
                          <FormLabel className="slot-label"
                            title="QUICKEST"
                            id="demo-row-radio-buttons-group-label">
                            QUICKEST
                          </FormLabel>
                          <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={onTimeSlotSelect}
                          >
                            <ToggleButton value="06:10" className="selected-btn">
                              06:10
                            </ToggleButton>
                            <ToggleButton value="06:20" className="selected-btn">
                              06:20
                            </ToggleButton>
                            <ToggleButton value="06:30" className="selected-btn">
                              06:30
                            </ToggleButton>
                            <ToggleButton value="06:40" className="selected-btn">
                              06:30
                            </ToggleButton>
                          </ToggleButtonGroup>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl fullWidth className="time-slot">
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
            <br/>
            <Divider />
            <br/>
            <br/>
            {/*second section*/}
            <OrderDetail />
            <br/>
            <br/>
            <Divider />
            <br/>
            <br/>
            <Rewards />
            <br/>
            <br/>
            <Divider />
            <br/>
            <br/>
            <Tip />
            <br/>
            <br/>
            <Divider />
            <br/>
            <br/>
            <PaymentInfo />
            {/*second section ends here*/}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Checkout;
