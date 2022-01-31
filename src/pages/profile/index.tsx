import {
  Switch,
  Grid,
  Typography,
  CardContent,
  TextField,
  Button,
  Card,
} from '@mui/material';
import { Fragment } from 'react';
import LeftMenuBar from '../../components/left-menu-bar';

const Profile = () => {
  return (
    <Fragment>
      <Typography variant="h4">Edit Profile</Typography>
      <TextField aria-label="email" placeholder="Email" />
      <TextField aria-label="first name" placeholder="First Name" />
      <TextField aria-label="last name" placeholder="Last Name" />
      <TextField aria-label="mobile phone " placeholder="Mobile Phone" />
      <TextField aria-label="current password" placeholder="Current Password" />
      <br />
      <Typography variant="caption">
        your current password require to update your personal details
      </Typography>
      <TextField aria-label="new password" placeholder="New Password" />
      <br />
      <Typography variant="caption">
        Password must be at least 8 characters.
      </Typography>
      <br />
      <TextField
        aria-label="confirm password "
        placeholder="Confirm Password"
      />
      <TextField
        disabled
        aria-label="date of birth"
        variant="outlined"
        placeholder="Birthday"
      />
      <TextField
        aria-label="enter your favorite location"
        placeholder="Favorite Location"
      />
      <Grid container>
        <Card>
          <CardContent>
            <Typography variant="body1">
              Keep up to date on rewards, exclusive offers and new product
              launches.
            </Typography>
            <br />
            <Switch aria-label="email notification" defaultChecked />{' '}
            <Typography variant="caption">Email Notification</Typography>
            <Switch aria-label="push notification" />{' '}
            <Typography variant="caption">Push Notification</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Button aria-label="submit" variant="outlined">
        Submit
      </Button>
    </Fragment>
  );
};

export default Profile;
