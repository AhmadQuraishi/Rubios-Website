import {
  Switch,
  Grid,
  Typography,
  CardContent,
  TextField,
  Button,
  Card,
  Theme,
} from '@mui/material';
import './profile.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: '0px 15px 20px 15px',
    maxWidth: '990px',
    boxSizing: 'border-box',
  },
  heading: {
    paddingBottom: '5px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      fontSize: '25px !important',
    },
  },
}));

const Profile = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.heading}>
        Edit Profile
      </Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Grid container className="profile-section">
            <Grid item xs={12}>
              <TextField
                aria-label="email"
                label="Email"
                title="Email"
                sx={{ width: '100%' }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="first name"
                label="First Name"
                title="First Name"
                sx={{ width: '100%' }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                aria-label="last name"
                label="Last Name"
                title="Last Name"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="mobile phone "
                label="Mobile Phone"
                title="Mobile Phone"
                sx={{ width: '100%' }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="current password"
                label="Current Password"
                title="Current Password"
                sx={{ width: '100%' }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                className="body-text"
                title="your current password require to update your personal details"
                sx={{ width: '100%' }}
              >
                Your current password require to update your personal details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="new password"
                label="New Password"
                title="New Password"
                sx={{ width: '100%' }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body2"
                className="body-text"
                title="Password must be at least 8 characters."
                sx={{ width: '100%' }}
              >
                Password must be at least 8 characters.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="confirm password "
                label="Confirm Password"
                title="Confirm Password"
                sx={{ width: '100%' }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              {/*<TextField*/}
              {/*  disabled*/}
              {/*  aria-label="date of birth"*/}
              {/*  variant="outlined"*/}
              {/*  label="Birthday"*/}
              {/*  title="date of birth"*/}
              {/*  sx={{ width: '100%' }}*/}
              {/*/>*/}
              <Button
                disabled
                aria-label="date of birth"
                title="date of birth"
                sx={{ width: { xs: '100%' } }}
                className="birthday-button"
              >
                <span className="bday-text">Birthday</span>
                <span className="date">September 6, 2009</span>
                <span>
                  <LockOutlinedIcon
                    style={{ color: 'grey', paddingTop: '5px' }}
                  />
                </span>
              </Button>
            </Grid>

            <Grid item xs={12}>
              <TextField
                aria-label="enter your favorite location"
                label="Favorite Location"
                title="enter your favorite location"
                sx={{ width: '100%' }}
                variant="filled"
              />
            </Grid>
            <Grid item xs={12}>
              <Card className="card-border">
                <CardContent>
                  <Typography
                    variant="body2"
                    className="body-text"
                    title="Keep up to date on rewards, exclusive offers and new product
                      launches."
                    sx={{ width: '100%' }}
                  >
                    Keep up to date on rewards, exclusive offers and new product
                    launches.
                  </Typography>
                  <br />
                  <Grid container>
                    <Grid item xs={12} sm={6}>
                      <Switch aria-label="email notification" defaultChecked />
                      <Typography variant="caption" title="Email Notification">
                        Email Notification
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Switch aria-label="push notification" />
                      <Typography variant="caption" title="Push Notification">
                        Push Notification
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Button
                aria-label="submit"
                title="submit"
                variant="contained"
                sx={{ width: { xs: '100%', lg: '400px' } }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;
