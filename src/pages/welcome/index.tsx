import { makeStyles } from '@mui/styles';
import { Grid, Typography, CardMedia, Card, CardContent } from '@mui/material';
import CustomButton from '../../helpers/button/button';
import { Fragment } from 'react';

const useStyle = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  card: {
    marginTop: '40px',
    marginLeft: '40px',
  },
}));

const Welcome = () => {
  const classes = useStyle();
  return (
    <Fragment>
      <Grid container component="main" columns={16} className={classes.root}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={10}
          style={{ marginTop: '20px' }}
        >
          <Card>
            <Grid
              container
              style={{ justifyContent: 'center', marginTop: '20px' }}
            >
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Typography
                  variant="caption"
                  style={{ color: 'blue' }}
                  title="WELCOME"
                >
                  WELCOME
                </Typography>
                <Typography
                  fontWeight={500}
                  variant="h5"
                  style={{ color: '' }}
                  title="WELCOME BACK ALEXENDRA"
                >
                  WELCOME BACK ALEXENDRA!
                </Typography>
                <Typography
                  variant="caption"
                  style={{ color: 'blue' }}
                  title="LAST ORDER 11/01"
                >
                  LAST ORDER 11/01
                </Typography>
                <Card
                  elevation={0}
                  style={{ border: '1px solid black' }}
                  sx={{ display: 'flex' }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 120 }}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU"
                    alt="Live from space album cover"
                    aria-label="image"
                    title="Live from space album cover"
                  />
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="body2" title="1x California Burrito">
                      1x California Burrito
                    </Typography>
                    <Typography variant="body2" title="2x Fish Toca Plates">
                      2x Fish Toca Plates
                    </Typography>
                    <Typography variant="body2" title="1x Medium Drink">
                      1x Medium Drink...
                    </Typography>
                    <Typography
                      aria-label="edit order"
                      variant="button"
                      color="text.secondary"
                      title="EDIT ORDER"
                    >
                      EDIT ORDER
                    </Typography>{' '}
                    <Typography
                      aria-label="order"
                      variant="button"
                      color="blue"
                      title="order"
                    >
                      ORDER
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={7}
                style={{ marginLeft: '10px' }}
              >
                <Typography
                  variant="caption"
                  style={{ color: 'blue' }}
                  title="YOUR FAVORITE LOCATION"
                >
                  YOUR FAVORITE LOCATION
                </Typography>
                <Typography fontWeight={400} variant="h4" title="Broadway Blvd">
                  Broadway Blvd
                  <Typography variant="caption" title="change">
                    (change)
                  </Typography>
                </Typography>
                <Typography variant="h6" title="20212 North 59th Ave, Ste.465A">
                  20212 North 59th Ave, Ste.465A
                </Typography>
                <Typography variant="h6" title="San Diego, CA">
                  San Diego, CA
                </Typography>
                <Typography variant="h6" title="4.2 Mile Away">
                  4.2 Mile Away
                </Typography>
                <CustomButton
                  aria-label="pickup button"
                  variant="contained"
                  text="PICKUP"
                  title="PICKUP"
                />
                <br />
                <CustomButton
                  aria-label="curbside button"
                  variant="contained"
                  text="CURBSIDE"
                  title="CURBSIDE"
                />
                <br />
                <CustomButton
                  aria-label="delivery button"
                  variant="contained"
                  text="DELIVERY"
                  title="DELIVERY"
                />
                <br />
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Welcome;
