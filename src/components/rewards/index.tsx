import React, { useState } from 'react';
import { Button, Card, Grid, RadioGroup, Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import drinks from '../../assets/imgs/drinks.svg';
import food from '../../assets/imgs/food.svg';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import './rewards.css';

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

  const [alignment, setAlignment] = React.useState('web');
  const onRewardSelect = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <Grid container>
      <Grid item xs={1} sm={0.5} md={0.5} lg={2} />

      {view && (
        <Grid container className="rewards">
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Button onClick={handler} title="VIEW REWARDS" className="label">
              VIEW REWARDS
            </Button>
          </Grid>
        </Grid>
      )}

      {!view && (
        <Grid item xs={10} sm={11} md={11} lg={8} className="choose-reward">
          <Typography variant="h4" title="APPLY REWARDS">
            APPLY REWARDS
          </Typography>
          <br/>
          <Grid container>
            <FormControl>
              {/*<RadioGroup row aria-labelledby="rewards" name="Rubio,s rewards">*/}
                {/*{rewardsArray.map((reward, index) => (*/}
                  {/*<Grid item xs={12} sm={12} md={6} key={reward.desc + index}>*/}
                    {/*<Card>*/}
                      {/*<FormControlLabel*/}
                        {/*value={reward.desc}*/}
                        {/*control={<Radio />}*/}
                        {/*label={reward.desc}*/}
                        {/*aria-label={reward.desc}*/}
                        {/*title={reward.desc}*/}
                      {/*/>*/}
                      {/*<img src={require('../../assets/imgs/taco-original-fish.jpg')} />*/}
                    {/*</Card>*/}
                  {/*</Grid>*/}
                {/*))}*/}
              {/*</RadioGroup>*/}
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={onRewardSelect}
                aria-labelledby="rewards"
              >
                {rewardsArray.map((reward, index) => (
                    <ToggleButton value={reward.desc} className="choose-btn">
                      <img src={reward.icon} />
                      <Typography>{reward.desc}</Typography>
                    </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </FormControl>
          </Grid>
        </Grid>
      )}

      <Grid item xs={1} sm={0.5} md={0.5} lg={2} />
    </Grid>
  );
};

export default Rewards;
