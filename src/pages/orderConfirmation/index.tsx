import { makeStyles } from '@mui/styles';
import {
    Grid,
    Typography,
    Card,
    TextField
} from '@mui/material';
import OrderDetails from '../../components/order_details';
import OrderConfirmedCard from '../../components/orderConfirmCard';


const useStyle = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        backgroundColor: 'blueviolet',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        justifyContent: 'center',
    },
    card: {
        marginTop: '40px',
        marginLeft: '40px',
    },
}));

const OrderConfirmation = () => {
    const classes = useStyle();
    return (
        <>
            <Grid container component="main" className={classes.root}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                           <OrderConfirmedCard />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <Card style={{ backgroundColor: 'blue' }}>
                                <Typography variant='caption' style={{ color: 'white' }}>EARN REWARDS</Typography>
                                <Typography variant='h5' style={{ color: 'white' }}>GET $5 OFF YOUR</Typography>
                                <Typography variant='h5' style={{color: 'white'}}>NEXT ORDER</Typography>
                                <Typography variant='caption' style={{color: 'white'}}>Join today for completing the form below</Typography>
                                <Grid container>
                                     <Grid item xs={12} sm={12} md={12} lg={6}>
                                          <TextField placeholder='Jhonathen'/>
                                     </Grid>
                                     <Grid item xs={12} sm={12} md={12} lg={6}>
                                          <TextField placeholder='Doe'/>
                                     </Grid>
                                     <Grid item xs={12} sm={12} md={12} lg={6}>
                                          <TextField placeholder='ilovetacos@email.com'/>
                                     </Grid>
                                     <Grid item xs={12} sm={12} md={12} lg={6}>
                                          <TextField placeholder='11/19/1993'/>
                                     </Grid>
                                     <Grid item xs={12} sm={12} md={12} lg={12}>
                                          <TextField fullWidth placeholder='#000 Broadway St.San Diego Ca.'/>
                                     </Grid>
                                     <Grid item xs={12} sm={12} md={12} lg={6}>
                                          <TextField placeholder='*****' type='password' />
                                     </Grid>
                                     <Grid item xs={12} sm={12} md={12} lg={6}>
                                     <TextField placeholder='*****' type='password' />
                                </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10}>
                  <OrderDetails 
                  name1="Maxicon street Corn Toca Plate"
                  price1="$12.50"
                  name2="Regular Mango Tea"
                  price2="$2.50"
                  reward=""
                  rewardPrice=""
                  subTotal="SUB TOTAL"
                  subTotalPrice="$15.00"
                  tax="TAX"
                  taxPrice="$1.53"
                  total="TOTAL"
                  totalPrice="$16.53"              
                      />
                </Grid>
            </Grid>

        </>
    );
};

export default OrderConfirmation;
