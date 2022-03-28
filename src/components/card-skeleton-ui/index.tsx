import { Grid, Skeleton } from '@mui/material';

const CardSkeletonUI = () => {
  return (
    <Grid
      container
      sx={{
        padding: {
          xs: '10px 10px',
          md: '10px 10px',
          lg: '10px 10px 10px 10px',
        },
      }}
      spacing={3}
    >
      <Grid item xs={12}>
        <Skeleton variant="rectangular" width="300px" height="20px" />
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="rectangular" width="300px" height="100px" />
      </Grid>
    </Grid>
  );
};

export default CardSkeletonUI;
