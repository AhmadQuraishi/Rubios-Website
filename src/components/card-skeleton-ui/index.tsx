import { Grid, Skeleton } from '@mui/material';

const CardSkeletonUI = () => {
  return (
    <Grid
      container
      sx={{
        padding: { xs: '30px 20px', md: '40px 30px', lg: '30px 40px 0px 40px' },
      }}
      spacing={3}
    >
      <Grid item xs={6}>
        <Skeleton variant="rectangular" width="300px" height="100px" />
      </Grid>
    </Grid>
  );
};

export default CardSkeletonUI;
