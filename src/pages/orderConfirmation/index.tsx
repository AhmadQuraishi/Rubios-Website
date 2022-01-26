import { makeStyles } from '@mui/styles';
import {
    Grid,
    Box,
    Typography,
    Card,
    TextField,
    Button,
    Link,
    InputBase,
} from '@mui/material';


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
                            <Card style={{ backgroundColor: 'white' }}>
                                <Typography variant='caption' style={{ color: 'blue' }}>ORDER CONFIRMED</Typography>
                                <Typography variant='h5' >WE'LL TAKE IT FROM HERE.</Typography>
                                <Typography variant='h5'>SEE YOU SOON.</Typography>
                                <br />
                                <Typography variant='caption' style={{ color: 'blue' }}>PICKUP LOCATION</Typography>
                                <Typography variant='h5'>BROADWAY BLVD</Typography>
                                <Typography variant='caption'>20212 North 59th Ave, Ste, 465A</Typography><br />
                                <Typography variant='caption'>San Diago, CA</Typography><br />
                                <Typography variant='caption'>4.2 Miles Away</Typography><br />
                                <br />
                                <Typography>PICKUP TIME</Typography>
                                <Typography variant='h5'>6:10 PM</Typography>

                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={6}>
                            <Card style={{ backgroundColor: 'blue' }}>
                                <Typography variant='caption' style={{ color: 'white' }}>EARN REWARDS</Typography>
                                <Typography variant='h5' style={{ color: 'white' }}>GET $5 OFF YOUR</Typography>
                                <Typography variant='h5' style={{color: 'white'}}>NEXT ORDER</Typography>
                                <Typography variant='caption' style={{color: 'white'}}>Join today for completing the form below</Typography>
                                  
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10}>
                    <Card>
                        <Typography fontWeight={500} variant='h6' style={{ color: 'blue' }}>ORDER DETAILS</Typography>
                        <Typography component="div">
                            <Box textAlign="left">
                            Maxicon street Corn Toca Plate
                          <Typography textAlign='center'>$12.50</Typography>  
                            </Box>
                            <Box textAlign="left">
                            Regular Mango Tea
                            </Box>
                            <Box textAlign="center">
                            $2.50
                            </Box> 
                        </Typography>
                        {/* <Grid container>
                            <Grid item xs={6} sm={6} md={6} lg={5}>
                                <Typography>Maxicon street Corn Toca Plate</Typography><br />
                                <Typography>Regular Mango Tea</Typography><br />
                                <Typography>Rubios Reward</Typography><br />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={5}>
                                <Typography>$12.50</Typography><br />
                                <Typography>$2.50</Typography><br />
                                <Typography>-$2.50</Typography><br />
                            </Grid>
                        </Grid> */}
                        <hr></hr>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} lg={5}>
                                <Typography>SUB TOTAL</Typography><br />
                                <Typography>TAX</Typography><br />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={5}>
                                <Typography>$12.50</Typography><br />
                                <Typography>$1.50</Typography><br />
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Grid container>
                            <Grid item xs={6} sm={6} md={6} lg={5}>
                                <Typography>TOTAL</Typography><br />
                            </Grid>
                            <Grid item xs={6} sm={6} md={6} lg={5}>
                                <Typography>$14.50</Typography><br />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>

        </>
    );
};

export default OrderConfirmation;
