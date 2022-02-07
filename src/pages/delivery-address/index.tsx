import {
  Grid,
  Typography,
  Card,
  Button,
  CardContent,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 15px',
    maxWidth: '990px',
    boxSizing: 'border-box',
  },
  heading: {
    paddingBottom: '25px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
}));

const DeliveryAddress = () => {
  const classes = useStyles();
  return (
    <Fragment>
      <Grid container className={`${classes.root} delivery-address-container`}>
        <Typography variant="h4" className={classes.heading}>
          DELIVERY ADDRESSES
        </Typography>
        <Grid item xs={12}>
          <Card elevation={0} className="card-panel">
            <CardContent className="card-content">
              <Typography variant="body2" title="DEFAULT Stacey's Home">
                <b>DEFAULT</b> Stacey's Home
              </Typography>
              <Typography variant="body2" title="5326 Highway Ave.">
                5326 Highway Ave.
              </Typography>
              <Typography variant="body2" title="Apt 342">
                Apt 342
              </Typography>
              <Typography variant="body2" title="Carisbad, CA 34092-342387">
                Carisbad, CA 34092-342387
              </Typography>
              <Grid container>
                <Grid item xs={12} className="small-button-panel">
                  <Typography
                    variant="button"
                    aria-label="Delete"
                    title="Edit"
                    className="link"
                  >
                    EDIT
                  </Typography>
                  <Typography
                    variant="button"
                    aria-label="Delete"
                    title="DELETE"
                    className="link"
                  >
                    DELETE
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card elevation={0} className="card-panel">
            <CardContent className="card-content">
              <Typography variant="body2" title="DEFAULT Stacey's Home">
                <b>DEFAULT</b> Stacey's Home
              </Typography>
              <Typography variant="body2" title="5326 Highway Ave.">
                5326 Highway Ave.
              </Typography>
              <Typography variant="body2" title="Apt 342">
                Apt 342
              </Typography>
              <Typography variant="body2" title="Carisbad, CA 34092-342387">
                Carisbad, CA 34092-342387
              </Typography>
              <Grid container>
                <Grid item xs={12} className="small-button-panel">
                  <Typography
                    variant="button"
                    aria-label="Delete"
                    title="Edit"
                    className="link"
                  >
                    EDIT
                  </Typography>
                  <Typography
                    variant="button"
                    aria-label="Delete"
                    title="DELETE"
                    className="link"
                  >
                    DELETE
                  </Typography>
                  <Typography
                    variant="button"
                    aria-label="MAke Default"
                    title="Make Default"
                    className="link default"
                  >
                    MAKE DEFAULT
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Link
            to="/account/addDeliveryAddress"
            aria-label="Add delivery Address"
          >
            <Button
              aria-label="add address"
              title=" ADD ADDRESS"
              variant="contained"
              className="button-panel"
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
