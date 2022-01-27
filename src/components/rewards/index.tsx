import Map from '../../components/map';
import React from 'react';
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Divider from '@mui/material/Divider';

const Rewards = () => {
  const handler = () => {
    alert('hi');
  };
  return (
    <Grid container>
      <Grid item xs={1} sm={0.5} md={0.5} lg={0.5} xl={2}></Grid>

      <Grid item xs={10} sm={11} md={11} lg={11} xl={8}>
        <Typography variant="h4">APPLY REAWRDS</Typography>
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardActionArea>
                <Grid container>
                  <Grid item xs={6} md={6}>
                    <CardMedia
                      component="img"
                      image="https://mui.com/static/images/cards/live-from-space.jpg"
                      alt="Live from space album cover"
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <CardContent>
                      <Typography component="div" variant="h5">
                        Free Regular sized drink
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <Card>
              <CardActionArea>
                <Grid container>
                  <Grid item xs={6} md={6}>
                    <CardMedia
                      component="img"
                      image="https://mui.com/static/images/cards/live-from-space.jpg"
                      alt="Live from space album cover"
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <CardContent>
                      <Typography component="div" variant="h5">
                        Free Regular sized drink
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={1} sm={0.5} md={0.5} lg={0.5} xl={2}></Grid>
    </Grid>
  );
};

export default Rewards;
