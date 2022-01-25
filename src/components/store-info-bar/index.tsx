import { Grid, Typography, useTheme, List, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles({
  heading: {
    fontSize: '13px',
    color: '#fff',
    fontFamily: 'Poppins-Medium !important',
  },
});

const StoreInfoBar = () => {
  const theme = useTheme();
  const classes = useStyle();
  return (
    <Grid
      container
      spacing={0}
      sx={{
        backgroundColor: theme.palette.secondary.main,
        padding: { xs: '20px', sm: '35px' },
      }}
    >
      <Grid item xs={12}>
        <Grid container spacing={0} maxWidth={1090} margin="auto">
          <Grid
            item
            xs={12}
            sm={5}
            sx={{
              paddingRight: { xs: '0px', sm: '15px' },
              paddingBottom: { xs: '0px', sm: '0px' },
            }}
          >
            <Typography
              className={classes.heading}
              variant="body2"
              textTransform="uppercase"
            >
              Pick Up From
            </Typography>
            <Typography
              variant="body2"
              color="#fff"
              textTransform="uppercase"
              fontWeight={700}
              lineHeight={1.3}
              fontFamily="Poppins-Bold !important"
              sx={{ fontSize: { xs: 30, sm: 35, lg: 40 } }}
            >
              Broadway Blvd
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              paddingRight: { xs: '0px', sm: '15px' },
              paddingBottom: { xs: '15px', sm: '0px' },
              flexDirection: 'column',
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <Typography
              className={classes.heading}
              variant="body2"
              textTransform="uppercase"
            >
              Address
            </Typography>
            <Typography
              variant="body1"
              color="#fff"
              textTransform="uppercase"
              fontSize={11}
              paddingTop="8px"
            >
              2120 North 59th Ave Str. 56th. A34
              <br />
              San Diego, CA
              <br />
              4.2 Miles Away
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={3}
            sx={{
              flexDirection: 'column',
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <Typography
              className={classes.heading}
              variant="body1"
              textTransform="uppercase"
            >
              Hours
            </Typography>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <List
                  sx={{
                    padding: '5px 0 0 0',
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'background.paper',
                  }}
                >
                  <ListItem
                    sx={{
                      padding: '0 0 0 0',
                    }}
                  >
                    M-S
                  </ListItem>
                  <ListItem
                    sx={{
                      padding: '0 0 0 0',
                    }}
                  >
                    S
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={9}>
                <List
                  sx={{
                    padding: '5px 0 0 0',
                    fontSize: '12px',
                    fontWeight: '500',
                    color: 'background.paper',
                  }}
                >
                  <ListItem
                    sx={{
                      padding: '0 0 0 0',
                    }}
                  >
                    10AM - 9PM
                  </ListItem>
                  <ListItem
                    sx={{
                      padding: '0 0 0 0',
                    }}
                  >
                    10:30AM - 5:30PM
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StoreInfoBar;
