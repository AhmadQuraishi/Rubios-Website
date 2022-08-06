import { Grid, Skeleton } from '@mui/material';

const RewardSkeletonUI = () => {
  return (
    <Grid
      container
      sx={{
        padding: { xs: '10px 0px', sm: '10px 0px' },
        margin: '20px auto',
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        sx={{ paddingLeft: '10px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="100px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{ paddingLeft: '10px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '30%' } }}
          height="30px"
        />
      </Grid>
      <Grid
        item
        xs={6}
        sm={6}
        md={4}
        sx={{ paddingLeft: '10px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="140px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{ paddingLeft: '10px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="140px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{ paddingLeft: '10px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="140px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        sx={{ paddingLeft: '10px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '30%' } }}
          height="30px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{ paddingLeft: '10px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="140px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{ paddingLeft: '10px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="140px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        sx={{ paddingLeft: '10px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%', lg: '95%' } }}
          height="140px"
        />
      </Grid>
    </Grid>
  );
};

export default RewardSkeletonUI;
