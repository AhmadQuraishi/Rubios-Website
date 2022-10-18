import { Grid, Skeleton } from '@mui/material';

const DeliveryAddressSkeletonUI = () => {
  return (
    <Grid
      container
    //   sx={{
    //     padding: { xs: '30px 20px', md: '40px 30px', lg: '30px 40px 0px 40px' },
    //   }}
      spacing={3}
      xs={12}
      lg={6}
      md={6}
      sm={9}
      sx={{marginRight: '40px', marginTop: '5px'}}
    >
      <Skeleton variant="rectangular" width={382} height={160} sx={{margin: '10px 0px 10px 25px'}}/>
      <Skeleton variant="rectangular" width={382} height={160} sx={{margin: '10px 0px 10px 25px'}}/>
      <Skeleton variant="rectangular" width={382} height={160} sx={{margin: '10px 0px 10px 25px'}}/>
      <Skeleton variant="rectangular" width={382} height={160} sx={{margin: '10px 0px 10px 25px'}}/>
      <Skeleton variant="rectangular" width={382} height={160} sx={{margin: '10px 0px 10px 25px'}}/>
      <Skeleton variant="rectangular" width={382} height={160} sx={{margin: '10px 0px 10px 25px'}}/>
      <Skeleton variant="rectangular" width={382} height={160} sx={{margin: '10px 0px 10px 25px'}}/>
      <Skeleton variant="rectangular" width={382} height={160} sx={{margin: '10px 0px 10px 25px'}}/>
    </Grid>
    
  );
};

export default DeliveryAddressSkeletonUI;