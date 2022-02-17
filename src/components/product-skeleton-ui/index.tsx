import { Grid, Skeleton } from '@mui/material';

const ProductSkeletonUI = () => {
  return (
    <Grid
      container
      sx={{
        padding: { xs: '30px 20px', sm: '40px 30px' },
        maxWidth: '1200px',
        width: { xs: '100%', sm: '80% !important' },
        margin: 'auto',
      }}
      spacing={3}
    >
      <Grid item xs={12} lg={6} sx={{ padding: '0px !important' }}>
        <Skeleton variant="rectangular" sx={{ width: '60%' }} height="20px" />
        <br />
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '90%' } }}
          height="60px"
        />
        <br />
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '90%' } }}
          height="150px"
        />
        <br />
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '50%' } }}
          height="30px"
        />
      </Grid>
      <Grid item xs={12} lg={6} sx={{ padding: '0px !important' }}>
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '90%' } }}
          height="350px"
        />
      </Grid>
    </Grid>
  );
};

export default ProductSkeletonUI;
