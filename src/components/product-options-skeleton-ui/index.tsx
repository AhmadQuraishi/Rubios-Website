import { Grid, Skeleton } from '@mui/material';

const ProductOptionsSkeletonUI = () => {
  return (
    <Grid
      container
      sx={{
        padding: { xs: '30px 20px', md: '40px 30px', lg: '30px 40px 0px 40px' },
      }}
      spacing={3}
    >
      <Grid item xs={12}>
        <Skeleton variant="rectangular" width="60%" height="40px" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rectangular" height="200px" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rectangular" height="200px" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rectangular" height="200px" />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rectangular" width="60%" height="40px" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rectangular" height="200px" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rectangular" height="200px" />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Skeleton variant="rectangular" height="200px" />
      </Grid>
    </Grid>
  );
};

export default ProductOptionsSkeletonUI;
