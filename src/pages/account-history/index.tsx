import { Grid } from '@mui/material';
import LeftMenuBar from '../../components/left-menu-bar';
const AccountHistory = () => {
  return (
    <>
      <Grid container>
        <Grid item xs={2}>
          <LeftMenuBar />
        </Grid>
        <Grid item xs={10}></Grid>
      </Grid>
    </>
  );
};

export default AccountHistory;
