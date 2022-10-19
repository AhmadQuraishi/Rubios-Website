import { Grid, Skeleton } from '@mui/material';

const SalsaSkeletonUI = () => {
  return (
    <Grid
      container
      paddingRight={'20px'}
    >
      <Grid item xs={12} sm={12} md={12} lg={6} sx={{padding: '8px 0px 0px 8px'}}>
        <Skeleton variant="rectangular" height="150px" sx={{padding: '10px'}}/>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={6} sx={{padding: '8px 0px 0px 8px'}}>
        <Skeleton variant="rectangular" height="150px" sx={{padding: '10px'}}/>
      </Grid>
      <Grid item  xs={12} sm={12} md={12} lg={6} sx={{padding: '8px 0px 0px 8px'}}>
        <Skeleton variant="rectangular" height="150px" sx={{padding: '10px'}}/>
      </Grid>
      <Grid item  xs={12} sm={12} md={12} lg={6} sx={{padding: '8px 0px 0px 8px'}}>
        <Skeleton variant="rectangular" height="150px" sx={{padding: '10px'}}/>
      </Grid>
      <Grid item  xs={12} sm={12} md={12} lg={6} sx={{padding: '8px 0px 0px 8px'}}>
        <Skeleton variant="rectangular" height="150px" sx={{padding: '10px'}}/>
      </Grid>
      <Grid item  xs={12} sm={12} md={12} lg={6} sx={{padding: '8px 0px 0px 8px'}}>
        <Skeleton variant="rectangular" height="150px" sx={{padding: '10px'}}/>
      </Grid>
    </Grid>
  );
};

export default SalsaSkeletonUI;
