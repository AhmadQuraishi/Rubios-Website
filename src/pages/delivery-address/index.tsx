import {
  Grid,
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Link,
  CardContent,
} from '@mui/material';
import LeftMenuBar from '../../components/left-menu-bar';

const DeliveryAddress = () => {
  return (
    <>
      <Grid container spacing={0}>
      <Grid
          item
          xs={0}
          sm={3}
          lg={2}
          sx={{ display: { xs: 'none', sm: 'grid' } }}
        >
          <LeftMenuBar />
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          lg={10}
          sx={{ padding: { xs: '30px 20px', sm: '30px 40px' } }}
        >
          <Grid container>
            <Typography variant="h5">DELIVERY ADDRESSES</Typography>
            <Grid item xs={10} sm={10} md={10} lg={4}>
              <Grid container marginTop="80px">
                <Card elevation={0} style={{ border: '1px solid blue' }}>
                  <CardContent>
                    <Typography variant="body2">
                      DEFAULT Stacey's Home
                    </Typography>
                    <Typography variant="body1"> 5326 Highway Ave. </Typography>
                    <Typography variant="body1"> Apt 342 </Typography>
                    <Typography variant="body1">
                      {' '}
                      Carisbad, CA 34092-342387{' '}
                    </Typography>
                    <Typography
                      textAlign="right"
                      variant="button"
                      color="text.secondary"
                    >
                      {' '}
                      EDIT{' '}
                    </Typography>{' '}
                    <Typography
                      textAlign="right"
                      variant="button"
                      color="text.secondary"
                    >
                      {' '}
                      DELETE{' '}
                    </Typography>
                  </CardContent>
                </Card>
                <Card elevation={0} style={{ border: '1px solid blue' }}>
                  <CardContent>
                    <Typography variant="body2">
                      DEFAULT Stacey's Home
                    </Typography>
                    <Typography variant="body1"> 5326 Highway Ave. </Typography>
                    <Typography variant="body1"> Apt 342 </Typography>
                    <Typography variant="body1">
                      {' '}
                      Carisbad, CA 34092-342387{' '}
                    </Typography>
                    <Typography
                      textAlign="right"
                      variant="button"
                      color="text.secondary"
                    >
                      {' '}
                      EDIT{' '}
                    </Typography>{' '}
                    <Typography
                      textAlign="right"
                      variant="button"
                      color="text.secondary"
                    >
                      {' '}
                      DELETE{' '}
                    </Typography>
                    <Typography textAlign="right" variant="button" color="blue">
                      {' '}
                      MARK DEFAULT{' '}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Button variant="contained" size="large">
                ADD ADDRESS
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default DeliveryAddress;
