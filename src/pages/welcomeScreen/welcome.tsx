import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, CardMedia, Card, CardContent } from '@mui/material';
import CustomButton from '../../helpers/button/button';


const useStyle = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        justifyContent: 'center'
    },
    card: {
        marginTop: "40px",
        marginLeft: "40px"
    }
}))

const Welcome = () => {
    const classes = useStyle()
    return (
        <>
            <Grid container component="main" columns={16} className={classes.root}>
                <Grid item xs={12} sm={12} md={12}lg={10} style={{ marginTop: '20px', height: '60vh'}}>
                    <Card>
                        <Grid container style={{ justifyContent: 'center', marginTop: '20px'}}>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                <Typography variant="caption" style={{ color: 'blue' }}>WELCOME</Typography>
                                <Typography fontWeight={500} variant="h5" style={{ color: "" }}>WELCOME BACK ALEXENDRA!</Typography>
                                <Typography variant="caption" style={{ color: 'blue' }}>LAST ORDER 11/01</Typography>
                                <Card elevation={0} style={{ border: '1px solid black' }}  sx={{ display: 'flex' }}>
                                    {/* <Grid container style={{ border: '1px solid black' }}>
                                    <Grid item xs={12} sm={12} md={12} lg={3}> */}
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 120 }}
                                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU"
                                        alt="Live from space album cover"
                                    />
                                    {/* </Grid> */}
                                    {/* <Grid item xs={12} sm={12} md={12} lg={5}> */}
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography variant="body2"> 1x California Burrito </Typography>
                                            <Typography variant="body2"> 2x Fish Toca Plates </Typography>
                                            <Typography variant="body2"> 1x Medium Drink... </Typography>
                                            <Typography variant="button" color='text.secondary'> EDIT ORDER </Typography> <Typography variant="button" color='blue'> ORDER </Typography>
                                        </CardContent>
                                    {/* </Grid>
                                    </Grid> */}
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={7} style={{marginLeft: '10px'}}>
                            <Typography variant="caption" style={{ color: 'blue' }}>YOUR FAVORITE LOCATION</Typography>
                                <Typography fontWeight={400} variant="h4">Broadway Blvd <Typography variant="caption">(change)</Typography></Typography>
                                <Typography variant="h6">20212 North 59th Ave, Ste.465A</Typography>
                                <Typography variant="h6">San Diego, CA</Typography>
                                <Typography variant="h6">4.2 Mile Away</Typography>
                                <CustomButton variant="contained" text="PICKUP" /><br />
                                <CustomButton variant="contained" text="CURBSIDE" /><br />
                                <CustomButton variant="contained" text="DELIVERY" /><br />
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            {/* <Grid container component="main" columns={16} className={classes.root}>
                <Grid item xs={12} sm={12} md={12} lg={10}>
                    <Card>
                        <CardContent>
                            <Grid container xs={12} sm={12} md={12} lg={6}>
                                 <Grid item lg={6}>
                                <Typography variant="caption" style={{ color: 'blue' }}>WELCOME</Typography>
                                <Typography fontWeight={800} variant="h3" style={{ color: "" }}>WELCOME BACK ALEXENDRA!</Typography>
                                <Typography variant="caption" style={{ color: 'blue' }}>LAST ORDER 11/01</Typography>
                                <Card elevation={0} style={{ border: '1px solid black' }} sx={{ display: 'flex' }}>
                                    <CardMedia
                                        component="img"
                                        sx={{ width: 120 }}
                                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU"
                                        alt="Live from space album cover"
                                    />
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <CardContent sx={{ flex: '1 0 auto' }}>
                                            <Typography variant="body2"> 1x California Burrito </Typography>
                                            <Typography variant="body2"> 2x Fish Toca Plates </Typography>
                                            <Typography variant="body2"> 1x Medium Drink... </Typography>
                                            <Typography variant="button" color='text.secondary'> EDIT ORDER </Typography> <Typography variant="button" color='blue'> ORDER </Typography>
                                        </CardContent>
                                    </Box>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6}>
                                <Typography variant="caption" style={{ color: 'blue' }}>YOUR FAVORITE LOCATION</Typography>
                                <Typography fontWeight={400} variant="h4">Broadway Blvd <Typography variant="caption">(change)</Typography></Typography>
                                <Typography variant="h6">20212 North 59th Ave, Ste.465A</Typography>
                                <Typography variant="h6">San Diego, CA</Typography>
                                <Typography variant="h6">4.2 Mile Away</Typography>
                                <CustomButton variant="contained" text="PICKUP" /><br />
                                <CustomButton variant="contained" text="CURBSIDE" /><br />
                                <CustomButton variant="contained" text="DELIVERY" /><br />
                            </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid> */}
        </>
    )
}

export default Welcome