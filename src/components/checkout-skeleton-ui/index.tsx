import { Grid, Skeleton, Typography } from '@mui/material';
import React from 'react';
import Divider from '@mui/material/Divider';

const CheckoutSkeletonUI = () => {
  return (
    <>
      <br />
      <br />
      <Divider />
      <br />
      <br />
      <br />
      <Grid container>
        <Grid item xs={0} sm={0} md={1} lg={1} />
        <Grid item xs={12} sm={12} md={10} lg={10} className="choose-reward">
          <Typography variant="h2" title="APPLY REWARDS">
            APPLY REWARDS
          </Typography>
          <br />
          <Grid id="reward-points-container" container>
            <Grid
              item
              xs={12}
              sx={{
                marginBottom: { xs: '25px', md: '20px' },
              }}
            >
              <Grid container>
                <Grid lg={4} md={4} sm={4} xs={12}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: {
                        lg: '143px',
                        md: '272px',
                        sm: '339px',
                        xs: '77px',
                      },
                      margin: {
                        lg: '16px 16px 0px 0px',
                        md: '16px 16px 0px 0px',
                        sm: '16px 16px 0px 0px',
                        xs: '16px 16px 0px 0px',
                      },
                    }}
                  />
                </Grid>
                <Grid lg={4} md={4} sm={4} xs={12}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: {
                        lg: '143px',
                        md: '272px',
                        sm: '339px',
                        xs: '77px',
                      },
                      margin: {
                        lg: '16px 16px 0px 0px',
                        md: '16px 16px 0px 0px',
                        sm: '16px 16px 0px 0px',
                        xs: '16px 16px 0px 0px',
                      },
                    }}
                  />
                </Grid>
                <Grid lg={4} md={4} sm={4} xs={12}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: {
                        lg: '143px',
                        md: '272px',
                        sm: '339px',
                        xs: '77px',
                      },
                      margin: {
                        lg: '16px 16px 0px 0px',
                        md: '16px 16px 0px 0px',
                        sm: '16px 16px 0px 0px',
                        xs: '16px 16px 0px 0px',
                      },
                    }}
                  />
                </Grid>
                <Grid lg={4} md={4} sm={4} xs={12}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: {
                        lg: '143px',
                        md: '272px',
                        sm: '339px',
                        xs: '77px',
                      },
                      margin: {
                        lg: '16px 16px 0px 0px',
                        md: '16px 16px 0px 0px',
                        sm: '16px 16px 0px 0px',
                        xs: '16px 16px 0px 0px',
                      },
                    }}
                  />
                </Grid>
                <Grid lg={4} md={4} sm={4} xs={12}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: {
                        lg: '143px',
                        md: '272px',
                        sm: '339px',
                        xs: '77px',
                      },
                      margin: {
                        lg: '16px 16px 0px 0px',
                        md: '16px 16px 0px 0px',
                        sm: '16px 16px 0px 0px',
                        xs: '16px 16px 0px 0px',
                      },
                    }}
                  />
                </Grid>
                <Grid lg={4} md={4} sm={4} xs={12}>
                  <Skeleton
                    variant="rectangular"
                    sx={{
                      height: {
                        lg: '143px',
                        md: '272px',
                        sm: '339px',
                        xs: '77px',
                      },
                      margin: {
                        lg: '16px 16px 0px 0px',
                        md: '16px 16px 0px 0px',
                        sm: '16px 16px 0px 0px',
                        xs: '16px 16px 0px 0px',
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CheckoutSkeletonUI;
