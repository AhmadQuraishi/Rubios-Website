import { Grid, Typography, Card, Button, CardContent } from '@mui/material';
import { Fragment } from 'react';
import LeftMenuBar from '../../components/left-menu-bar';
import { Link } from 'react-router-dom';

const DeliveryAddress = () => {
  return (
    <Fragment>
      <Grid container>
        {/*<Grid item xs={1} sm={0.5} md={0.5} lg={1} />*/}
        <Typography variant="h4">DELIVERY ADDRESSES</Typography>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} md={8} lg={4}>
              <Card elevation={0} style={{ border: '1px solid blue' }}>
                <CardContent>
                  <Typography variant="h6" title="DEFAULT Stacey's Home">
                    DEFAULT Stacey's Home
                  </Typography>
                  <Typography variant="h6" title="5326 Highway Ave.">
                    5326 Highway Ave.
                  </Typography>
                  <Typography variant="h6" title="Apt 342">
                    Apt 342
                  </Typography>
                  <Typography variant="h6" title="Carisbad, CA 34092-342387">
                    Carisbad, CA 34092-342387
                  </Typography>
                  <Typography
                    textAlign="right"
                    variant="button"
                    color="text.secondary"
                    aria-label="edit button"
                    title="Edit"
                  >
                    EDIT
                  </Typography>
                  <Typography
                    textAlign="right"
                    variant="button"
                    color="text.secondary"
                    aria-label="delete button"
                    title="DELETE"
                  >
                    DELETE
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4} lg={8}></Grid>
            <Grid item xs={12} md={8} lg={4}>
              <Card elevation={0} style={{ border: '1px solid blue' }}>
                <CardContent>
                  <Typography variant="h6" title="DEFAULT Stacey's Home">
                    DEFAULT Stacey's Home
                  </Typography>
                  <Typography variant="h6" title="5326 Highway Ave.">
                    5326 Highway Ave.
                  </Typography>
                  <Typography variant="h6" title="Apt 342">
                    Apt 342
                  </Typography>
                  <Typography variant="h6" title="Carisbad, CA 34092-342387">
                    Carisbad, CA 34092-342387
                  </Typography>
                  <Typography
                    textAlign="right"
                    variant="button"
                    color="text.secondary"
                    aria-label="edit button"
                    title="edit button"
                  >
                    EDIT
                  </Typography>
                  <Typography
                    textAlign="right"
                    variant="button"
                    color="text.secondary"
                    aria-label="delete button"
                    title="DELETE"
                  >
                    DELETE
                  </Typography>
                  <Typography
                    aria-label="make default"
                    textAlign="right"
                    variant="button"
                    color="blue"
                    title="MARK DEFAULT"
                  >
                    MARK DEFAULT
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Link
            to="/account/addDeliveryAddress"
            aria-label="Add delivery Address"
          >
            <Button
              aria-label="add address"
              title=" ADD ADDRESS"
              variant="contained"
              size="large"
            >
              ADD ADDRESS
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default DeliveryAddress;
