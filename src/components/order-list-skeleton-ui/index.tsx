import { Grid, Skeleton } from '@mui/material';

const OrderListSkeletonUI = () => {
  return (
    <Grid
      container
      sx={{
        padding: { xs: '10px 0px', sm: '10px 0px' },
        margin: 'auto',
      }}
    >
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="200px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="200px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="200px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="200px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="200px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        lg={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="200px"
        />
      </Grid>
    </Grid>
  );
};

export default OrderListSkeletonUI;
