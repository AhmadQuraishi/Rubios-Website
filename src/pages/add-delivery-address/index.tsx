import { Switch, Grid, Typography,CardContent, TextField, Button, Card} from '@mui/material';
import LeftMenuBar from '../../components/left-menu-bar';

const AddDeliveryAddress = () => {
     return (
         <>
            <Grid container spacing={0}>
      <Grid
        item
        xs={0}
        sm={3}
        lg={2}
        sx={{ display: { xs: 'none', sm: 'grid' } }}
      >
        <LeftMenuBar />
      </Grid>
      <Grid item xs={8} sm={8} md={8} lg={6}>
         <Typography variant="h4">Delivery Address</Typography>
         <TextField aria-label='name' placeholder="Name" />
         <TextField aria-label='street address 1' placeholder="Street Address 1" />
         <TextField aria-label='street address 2' placeholder="Street Address 2" />
         <TextField aria-label='current password' placeholder="City, state" />
         <TextField aria-label='zip code' placeholder="Zip Code" /><br />
         <Button aria-label='add address' variant="outlined">Add Address</Button>
      </Grid>

      </Grid>``
         </>
     )
}

export default AddDeliveryAddress 