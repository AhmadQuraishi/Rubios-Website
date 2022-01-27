import Map from '../../components/map';
import React from 'react';
import {
  Button,
  FormLabel,
  Grid,
  IconButton,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Divider from '@mui/material/Divider';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const Tip = () => {
  const Icon = () => (
    <Button sx={{ bgColor: 'black' }}>
      <ArrowRightAltIcon />
    </Button>
  );
  return (
    <Grid container>
      <Grid item xs={1} sm={0.5} md={0.5} lg={2} />

      <Grid item xs={10} sm={11} md={11} lg={8}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Typography variant="h4">TIP</Typography>
            <Grid container>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <Grid item xs={12}>
                    <FormControlLabel
                      value="10"
                      control={<Radio />}
                      label="10%"
                    />
                    <FormControlLabel
                      value="15"
                      control={<Radio />}
                      label="15%"
                    />
                    <FormControlLabel
                      value="20"
                      control={<Radio />}
                      label="20%"
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
              <Grid item xs={12}>
                <TextField
                  placeholder="Custom Amount"
                  aria-label="custom amount"
                  InputProps={{ endAdornment: <Icon /> }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container>
              <Typography variant="h4">COUPON CODE</Typography>
              <Grid item xs={12}>
                <TextField
                  placeholder="Enter Code"
                  aria-label="custom amount"
                  InputProps={{ endAdornment: <Icon /> }}
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={1} sm={0.5} md={0.5} lg={2} />
    </Grid>
  );
};

export default Tip;
