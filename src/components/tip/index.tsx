import React from 'react';
import { Button, Grid, RadioGroup, TextField, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import './tip.css';

const Tip = () => {
  const Icon = () => (
    <Button aria-label="proceed">
      <ArrowRightAltIcon />
    </Button>
  );
  const [alignment, setAlignment] = React.useState('web');
  const onTipSelect = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Grid container className="tip-wrapper">
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={0} md={2} lg={2}/>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <Typography variant="h4">TIP</Typography>
            <Grid container>
              <FormControl>
                <ToggleButtonGroup
                  value={alignment}
                  exclusive
                  onChange={onTipSelect}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={4} sm={4} md={3} lg={3}>
                      <ToggleButton value="10%" className="selected-btn">
                        10%
                      </ToggleButton>
                    </Grid>
                    <Grid item xs={4} sm={4} md={3} lg={3}>
                      <ToggleButton value="20%" className="selected-btn">
                        20%
                      </ToggleButton>
                    </Grid>
                    <Grid item xs={4} sm={4} md={3} lg={3}>
                      <ToggleButton value="30%" className="selected-btn">
                        30%
                      </ToggleButton>
                    </Grid>
                  </Grid>
                </ToggleButtonGroup>
              </FormControl>
              <Grid item xs={12} md={9} lg={9}>
                <TextField
                  className="action-btn"
                  label="Custom Amount"
                  aria-label="custom amount"
                  InputProps={{ endAdornment: <Icon /> }}
                  title="Custom Amount"
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4} className="coupon-sec">
            <Grid container>
              <Typography variant="h4">COUPON CODE</Typography>
              <Grid item xs={12}>
                <TextField
                  className="action-btn"
                  label="Enter Code"
                  aria-label="Enter Code"
                  InputProps={{ endAdornment: <Icon /> }}
                  title="Enter Code"
                ></TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={0} md={2} lg={2}/>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Tip;
