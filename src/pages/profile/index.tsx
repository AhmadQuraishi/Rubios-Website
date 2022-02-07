import {
  Switch,
  Grid,
  Typography,
  CardContent,
  TextField,
  Button,
  Card,
} from '@mui/material';
import './profile.css';
import { Fragment } from 'react';

const Profile = () => {
  return (
    // <Fragment>
    //   <Typography variant="h4">Edit Profile</Typography>
    //   <TextField aria-label="email" placeholder="Email" title="Email" />
    //   <TextField
    //     aria-label="first name"
    //     placeholder="First Name"
    //     title="First Name"
    //   />
    //   <TextField
    //     aria-label="last name"
    //     placeholder="Last Name"
    //     title="Last Name"
    //   />
    //   <TextField
    //     aria-label="mobile phone "
    //     placeholder="Mobile Phone"
    //     title="Mobile Phone"
    //   />
    //   <TextField
    //     aria-label="current password"
    //     placeholder="Current Password"
    //     title="Current Password"
    //   />
    //   <br />
    //   <Typography
    //     variant="caption"
    //     title="your current password require to update your personal details"
    //   >
    //     your current password require to update your personal details
    //   </Typography>
    //   <TextField
    //     aria-label="new password"
    //     placeholder="New Password"
    //     title="New Password"
    //   />
    //   <br />
    //   <Typography
    //     variant="caption"
    //     title="Password must be at least 8 characters."
    //   >
    //     Password must be at least 8 characters.
    //   </Typography>
    //   <br />
    //   <TextField
    //     aria-label="confirm password "
    //     placeholder="Confirm Password"
    //     title="Confirm Password"
    //   />
    //   <TextField
    //     disabled
    //     aria-label="date of birth"
    //     variant="outlined"
    //     placeholder="Birthday"
    //     title="date of birth"
    //   />
    //   <TextField
    //     aria-label="enter your favorite location"
    //     placeholder="Favorite Location"
    //     title="enter your favorite location"
    //   />
    //   <Grid container>
    //     <Card>
    //       <CardContent>
    //         <Typography
    //           variant="body1"
    //           title="Keep up to date on rewards, exclusive offers and new product
    //           launches."
    //         >
    //           Keep up to date on rewards, exclusive offers and new product
    //           launches.
    //         </Typography>
    //         <br />
    //         <Switch aria-label="email notification" defaultChecked />
    //         <Typography variant="caption" title="Email Notification">
    //           Email Notification
    //         </Typography>
    //         <Switch aria-label="push notification" />
    //         <Typography variant="caption" title="Push Notification">
    //           Push Notification
    //         </Typography>
    //       </CardContent>
    //     </Card>
    //   </Grid>
    //   <Button aria-label="submit" title="submit" variant="outlined">
    //     Submit
    //   </Button>
    // </Fragment>
    <Fragment>
      <Typography variant="h4">Edit Profile</Typography>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Grid container className="profile-section">
            <Grid item xs={12}>
              <TextField
                aria-label="email"
                label="Email"
                title="Email"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="first name"
                label="First Name"
                title="First Name"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="current password"
                label="Current Password"
                title="Current Password"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
                title="your current password require to update your personal details"
                sx={{ width: '100%' }}
              >
                your current password require to update your personal details
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="new password"
                label="New Password"
                title="New Password"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="caption"
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                aria-label="date of birth"
                variant="outlined"
                label="Birthday"
                title="date of birth"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                aria-label="enter your favorite location"
                label="Favorite Location"
                title="enter your favorite location"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Card className="notification-section">
                <CardContent>
                  <Typography
                    variant="body1"
                    title="Keep up to date on rewards, exclusive offers and new product
                      launches."
                    sx={{ width: '100%' }}
                  >
                    Keep up to date on rewards, exclusive offers and new product
                    launches.
                  </Typography>
                  <br />
                  <Switch aria-label="email notification" defaultChecked />
                  <Typography variant="caption" title="Email Notification">
                    Email Notification
                  </Typography>
                  <Switch aria-label="push notification" />
                  <Typography variant="caption" title="Push Notification">
                    Push Notification
                  </Typography>
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
    </Fragment>
  );
};

export default Profile;
