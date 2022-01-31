import { makeStyles } from '@mui/styles';
import {
  Grid,
  Box,
  Typography,
  Card,
  TextField,
  Button,
  Link,
} from '@mui/material';
import CustomButton from '../../helpers/button/button';
import { Fragment } from 'react';

const useStyle = makeStyles(() => ({
  root: {
    minHeight: '100vh',
    backgroundImage: `url(https://www.pexels.com/photo/1640777/download/)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    justifyContent: 'center',
  },
  card: {
    marginTop: '40px',
    marginLeft: '40px',
  },
}));

const Login = () => {
  const classes = useStyle();
  return (
    <Fragment>
      <Grid container component="main" className={classes.root}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={10}
          style={{ marginTop: '20px', height: '60vh' }}
        >
          <Card>
            <Grid
              container
              style={{ justifyContent: 'center', marginTop: '20px' }}
            >
              <Grid item xs={8} sm={8} md={8} lg={5}>
                <Typography variant="caption" style={{ color: 'blue' }}>
                  LOGIN
                </Typography>
                <Typography variant="h4" style={{ color: '' }}>
                  SIGN IN TO RUBIO'S REWARDS
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    required
                    // fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <br />
                  <TextField
                    margin="normal"
                    required
                    // fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <br />
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>{' '}
                  <br />
                  <Button variant="contained" style={{ marginLeft: '80px' }}>
                    {' '}
                    SIGN IN
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={8} sm={8} md={8} lg={5} style={{textAlign: 'center'}}>
                <Typography variant="caption" style={{ color: 'blue' }}>
                  MORE OPTIONS
                </Typography>
                <br />
                <CustomButton variant="outlined" text="SIGN IN WITH FACEBOOK" />
                <br />
                <CustomButton variant="outlined" text="SIGN IN WITH APPLE" />
                <br />
                <CustomButton variant="outlined" text="SIGN IN WITH GOOGLE" />
                <br />
                <CustomButton variant="contained" text="CREATE ACCOUNT" />
                <br />
                <Typography
                  variant="caption"
                  style={{ color: 'blue', textAlign: 'center' }}
                >
                  CONTINUE AS GEUST
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Login;
