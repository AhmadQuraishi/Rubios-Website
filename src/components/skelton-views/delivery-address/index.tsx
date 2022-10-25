import { Grid, Skeleton } from '@mui/material';

const DeliveryAddressSkeltonUI = () => {
  return (
    <Grid
      container
      sx={{
        // padding: { xs: '10px 0px', sm: '10px 0px' },
        // margin: '20px auto',
      }}
    >
      <Grid
        item
        xs={12}
        sx={{ marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '50%' } }}
          height="15px"
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%' }, marginTop: 1 }}
          height="20px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ marginBottom: '10px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%' } }}
          height="50px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ marginBottom: '10px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%' } }}
          height="50px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%' } }}
          height="50px"
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ marginBottom: '20px' }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: { xs: '100%'} }}
          height="20px"
        />
      </Grid>
    </Grid>
  );
};

export default DeliveryAddressSkeltonUI;
