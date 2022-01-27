import { makeStyles } from '@mui/styles';
import {
    Grid,
    Typography,
    Card,
    Button,
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

const RewardConfirmation = () => {
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
                                <Typography  style={{ color: 'white' }}>YOUR REWARDS</Typography>
                                <Typography style={{ color: 'white' }}> YOU EARNED 18 POINTS!</Typography>
                                <Typography style={{ color: 'white' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent velit neque, vehicula vel magna ultricies, eleifend bibendum ex. Donec id neque dui. Cras ac sodales risus. In at ante nec sapien dictum imperdiet. Pellentesque iaculis urna in porta elementum. Morbi rhoncus, turpis at bibendum aliquam, ex ipsum bibendum est, ut ultrices odio libero nec diam. Vestibulum auctor neque a leo rhoncus, ut mollis dui mattis.</Typography>
                            <Button variant='contained'>VIEW ACCOUNT</Button>
                            <br />
                            <br />
                            <br/>
                            <br/>
                            <br/>
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
                  reward="Rubios Reward"
                  rewardPrice="-$2.50"
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

export default RewardConfirmation;
