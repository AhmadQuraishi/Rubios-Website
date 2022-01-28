
import {
    Grid,
    Typography,
    Card,
    Divider
} from '@mui/material';


const OrderDetails = (props: any) =>{
    return (
        <>
          <Card>
                        <Typography fontWeight={500} variant='h6' style={{ color: 'blue' }}>ORDER DETAILS</Typography>
                        <Grid container>
                            <Grid item xs={10} sm={10} md={10} lg={11}>
                                <Typography>{props.name1}</Typography>
                                <Typography>{props.name2}</Typography>
                                <Typography>{props.reward}</Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={1}>
                                <Typography>{props.price1}</Typography>
                                <Typography>{props.price2}</Typography>
                                <Typography>{props.rewardPrice}</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container>
                            <Grid item xs={10} sm={10} md={10} lg={11}>
                                <Typography>{props.subTotal}</Typography>
                                <Typography>{props.tax}</Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={1}>
                                <Typography>{props.subTotalPrice}</Typography>
                                <Typography>{props.taxPrice}</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                        <Grid container>
                            <Grid item xs={10} sm={10} md={10} lg={11}>
                                <Typography>{props.total}</Typography>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} lg={1}>
                                <Typography>{props.totalPrice}</Typography>
                            </Grid>
                        </Grid>
                    </Card>
        </>
    )
}

export default OrderDetails