import { Grid, Skeleton } from '@mui/material';

const HistorySkeletonUI = () => {
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
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%' } }}
          height="40px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%' } }}
          height="40px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%' } }}
          height="40px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%' } }}
          height="40px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%' } }}
          height="40px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%' } }}
          height="40px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ paddingLeft: '0px !important', marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%' } }}
          height="40px"
        />
      </Grid>
    </Grid>
  );
};

export default HistorySkeletonUI;
