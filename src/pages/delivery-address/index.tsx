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
      <Grid container>
        <Grid item xs={2}>
          <LeftMenuBar />
        </Grid>
        <Grid item xs={10} sx={{ padding: '50px'}}>
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