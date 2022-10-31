import { Grid, Skeleton } from '@mui/material';

const PaymentListSkeletonUI = () => {
  return (
    <Grid
      container
      sx={{
        padding: { xs: '10px 0px', sm: '10px 0px' },
        marginTop: '20px',
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="160px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="160px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="160px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="160px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="160px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="160px"
        />
      </Grid>
    </Grid>
  );
};

export default PaymentListSkeletonUI;
