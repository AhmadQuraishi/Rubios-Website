import React, { useState } from 'react';
import { Button, Card, Grid, RadioGroup, Typography } from '@mui/material';
import drinks from '../../assets/imgs/drinks.svg';
import food from '../../assets/imgs/food.svg';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';

const Rewards = () => {
  const rewardsArray = [
    {
      icon: drinks,
      desc: 'Free Regular Sized Drink',
    },
    {
      icon: food,
      desc: 'Buy One Get One Free',
    },
  ];
  const [view, setView] = useState(true);
  const handler = () => {
    setView(!view);
  };
  return (
    <Grid container>
      <Grid item xs={1} sm={0.5} md={0.5} lg={2} />

      {view && (
        <Grid item xs={10} sm={11} md={11} lg={8}>
          <Grid container>
            <Grid item xs={3} sm={4} md={4} lg={5} />
            <Grid item xs={6} sm={4} md={4} lg={3}>
              <Button onClick={handler}>VIEW REWARDS</Button>
            </Grid>
            <Grid item xs={3} sm={4} md={4} lg={5} />
          </Grid>
        </Grid>
      )}

      {!view && (
        <Grid item xs={10} sm={11} md={11} lg={8}>
          <Typography variant="h4">APPLY REWARDS</Typography>
          <Grid container>
            <FormControl>
              <RadioGroup row aria-labelledby="rewards" name="Rubio,s rewards">
                {rewardsArray.map((reward, index) => (
                  <Grid item xs={12} sm={12} md={6}>
                    <Card>
                      <FormControlLabel
                        value={reward.desc}
                        control={<Radio />}
                        label={reward.desc}
                        aria-label={reward.desc}
                      />
                    </Card>
                  </Grid>
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      )}

      <Grid item xs={1} sm={0.5} md={0.5} lg={2} />
    </Grid>
  );
};

export default Rewards;
