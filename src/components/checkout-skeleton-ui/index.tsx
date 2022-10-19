import { Grid, Skeleton } from '@mui/material';

const CheckoutSkeletonUI = () => {
  return (
    <Grid
      container
    >
      <Grid lg={4} md={4} sm={4} xs={12}>
        <Skeleton
          variant="rectangular"sx={{height: { lg:'143px',md:'272px', sm: '339px', xs: '77px'},margin: {lg:'16px 16px 0px 0px',md:'16px 16px 0px 0px',sm:'16px 16px 0px 0px',xs:'16px 16px 0px 0px'} }}
        />
      </Grid>
      <Grid lg={4} md={4} sm={4} xs={12}>
        <Skeleton
          variant="rectangular"
          sx={{ height: { lg:'143px',md:'272px', sm: '339px', xs: '77px'},margin: {lg:'16px 16px 0px 0px',md:'16px 16px 0px 0px',sm:'16px 16px 0px 0px',xs:'16px 16px 0px 0px'} }}
        />
      </Grid>
      <Grid lg={4} md={4} sm={4} xs={12}>
        <Skeleton
          variant="rectangular"
          sx={{ height: { lg:'143px',md:'272px', sm: '339px', xs: '77px'},margin: {lg:'16px 16px 0px 0px',md:'16px 16px 0px 0px',sm:'16px 16px 0px 0px',xs:'16px 16px 0px 0px'} }}
        />
      </Grid>
      <Grid lg={4} md={4} sm={4} xs={12}>
        <Skeleton
          variant="rectangular"
          sx={{ height: { lg:'143px',md:'272px', sm: '339px', xs: '77px'},margin: {lg:'16px 16px 0px 0px',md:'16px 16px 0px 0px',sm:'16px 16px 0px 0px',xs:'16px 16px 0px 0px'}}}
        />
      </Grid>
      <Grid lg={4} md={4} sm={4} xs={12}>
        <Skeleton
          variant="rectangular"
          sx={{ height: { lg:'143px',md:'272px', sm: '339px', xs: '77px'},margin: {lg:'16px 16px 0px 0px',md:'16px 16px 0px 0px',sm:'16px 16px 0px 0px',xs:'16px 16px 0px 0px'} }}
        />
      </Grid>
      <Grid lg={4} md={4} sm={4} xs={12}>
        <Skeleton
          variant="rectangular"
          sx={{height: { lg:'143px',md:'272px', sm: '339px', xs: '77px'},margin: {lg:'16px 16px 0px 0px',md:'16px 16px 0px 0px',sm:'16px 16px 0px 0px',xs:'16px 16px 0px 0px'} }}
        />
      </Grid>
    </Grid>
  );
};

export default CheckoutSkeletonUI;
