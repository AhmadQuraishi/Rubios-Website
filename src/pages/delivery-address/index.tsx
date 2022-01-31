import {
  Grid,
  Typography,
  Card,
  Button,
  CardContent,
} from '@mui/material';
import { Fragment } from 'react';
import LeftMenuBar from '../../components/left-menu-bar';
import {Link} from 'react-router-dom'

const DeliveryAddress = () => {
  return (
    <Fragment>
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
      <Grid item xs={1} sm={0.5} md={0.5} lg={1} />
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
                      aria-label='edit button'
                    >
                      {' '}
                      EDIT{' '}
                    </Typography>{' '}
                    <Typography
                      textAlign="right"
                      variant="button"
                      color="text.secondary"
                      aria-label='delete button'
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
                      aria-label='edit button'
                    >
                      {' '}
                      EDIT{' '}
                    </Typography>{' '}
                    <Typography
                      textAlign="right"
                      variant="button"
                      color="text.secondary"
                      aria-label='delete button'
                    >
                      {' '}
                      DELETE{' '}
                    </Typography>
                    <Typography aria-label='make default' textAlign="right" variant="button" color="blue">
                      {' '}
                      MARK DEFAULT{' '}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>          
              <Link to="/account/addDeliveryAddress">

              <Button aria-label='add address' variant="contained" size="large">
                ADD ADDRESS
              </Button>
          </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DeliveryAddress;
