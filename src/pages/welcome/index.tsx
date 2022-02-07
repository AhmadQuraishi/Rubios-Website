import { makeStyles } from '@mui/styles';
import {
  Grid,
  Typography,
  CardMedia,
  Card,
  CardContent,
  Button,
  Link,
} from '@mui/material';
import { Fragment } from 'react';
import './welcome.css';

const useStyle = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  caption: {

  }
}));

const Welcome = () => {
  const classes = useStyle();
  return (
    <Fragment>
      <Grid container component="main" columns={16} className={classes.root}>
        <Grid item xs={12} className="welcome-wrapper">
            <Grid container className="welcome-content">
              <Grid item xs={12} md={6} lg={6} className="left-col">
                <Typography variant="caption" className="label" title="Welcome">WELCOME</Typography>
                <Typography variant="h4" title="WELCOME BACK ALEXENDRA">WELCOME BACK ALEXENDRA!</Typography>
                <Typography variant="caption" className="label" title="LAST ORDER 11/01">LAST ORDER 11/01</Typography>
                <Card elevation={0} className="product-card">
                  <CardMedia
                    component="img"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU"
                    alt="California Burrito"
                    aria-label="California Burrito"
                    title="California Burrito"
                  />
                  <CardContent>
                    <Typography variant="h6" title="1x California Burrito">1x California Burrito</Typography>
                    <Typography variant="h6" title="2x Fish Toca Plates">2x Fish Toca Plates</Typography>
                    <Typography variant="h6" title="1x Medium Drink">1x Medium Drink...</Typography>
                    <Link href="" aria-label="edit order" color="#a5a5a5" fontWeight={900} textTransform="uppercase" underline="none" title="EDIT ORDER">Edit Order</Link>
                    <Link href="" aria-label="re order" color="#0075bf" fontWeight={900} textTransform="uppercase" underline="none" title="order">Re Order</Link>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6} lg={6} className="right-col">
                <Typography variant="caption" className="label" title="YOUR FAVORITE LOCATION">YOUR FAVORITE LOCATION</Typography>
                <Typography variant="h5" title="Broadway Blvd">Broadway Blvd
                  <Typography variant="caption" className="caption-grey" title="change">(change)</Typography>
                </Typography>
                <Typography variant="h6" title="20212 North 59th Ave, Ste.465A">20212 North 59th Ave, Ste.465A</Typography>
                <Typography variant="h6" title="San Diego, CA">San Diego, CA</Typography>
                <Typography variant="h6" title="4.2 Mile Away">4.2 Mile Away</Typography>
                <Button aria-label="pickup button" variant="contained" title="PICKUP">PICKUP</Button>
                <Button aria-label="curbside button" variant="contained" title="CURBSIDE">CURBSIDE</Button>
                <Button aria-label="delivery button" variant="contained" title="DELIVERY">DELIVERY</Button>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Welcome;
