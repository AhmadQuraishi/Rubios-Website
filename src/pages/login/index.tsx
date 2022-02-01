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
                <Typography
                  variant="caption"
                  style={{ color: 'blue' }}
                  title="LOGIN"
                >
                  LOGIN
                </Typography>
                <Typography
                  variant="h4"
                  style={{ color: '' }}
                  title="SIGN IN TO RUBIO'S REWARDS"
                >
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
                    aria-label="email address"
                    title="email address"
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
                    aria-label="password"
                    title="password"
                  />
                  <br />
                  <Link href="#" variant="body2" title="Forgot password?">
                    Forgot password?
                  </Link>{' '}
                  <br />
                  <Link href="/order/account">
                    <Button
                      aria-label="sign in"
                      variant="contained"
                      style={{ marginLeft: '80px' }}
                      title="sign in"
                    >
                      SIGN IN
                    </Button>
                  </Link>
                </Box>
              </Grid>
              <Grid
                item
                xs={8}
                sm={8}
                md={8}
                lg={5}
                style={{ textAlign: 'center' }}
              >
                <Typography
                  variant="caption"
                  title="MORE OPTIONS"
                  style={{ color: 'blue' }}
                >
                  MORE OPTIONS
                </Typography>
                <br />
                <CustomButton
                  ariaLabel="sign in with facebbok"
                  variant="outlined"
                  text="SIGN IN WITH FACEBOOK"
                  title="SIGN IN WITH FACEBOOK"
                />
                <br />
                <CustomButton
                  ariaLabel="sign in with apple"
                  variant="outlined"
                  text="SIGN IN WITH APPLE"
                  title="SIGN IN WITH APPLE"
                />
                <br />
                <CustomButton
                  ariaLabel="sign in with google"
                  variant="outlined"
                  text="SIGN IN WITH GOOGLE"
                />
                <br />
                <CustomButton
                  ariaLabel="create account"
                  variant="contained"
                  text="CREATE ACCOUNT"
                  title="CREATE ACCOUNT"
                />
                <br />
                <Typography
                  variant="caption"
                  style={{ color: 'blue', textAlign: 'center' }}
                  title="CONTINUE AS GEUST"
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
