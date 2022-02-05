import { Grid, Typography, Card, Divider } from '@mui/material';
import './order-details.css';

const OrderDetails = (props: any) => {
  return (
    <>
    <Grid container>
      <Grid item lg={7} className="order-details">
        <Typography fontWeight={500} title="ORDER DETAILS" variant="h4">ORDER DETAILS</Typography>
        <br/>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" title={props.name1}>{props.name1}</Typography>
            <br/>
            <Typography variant="h6" title={props.name2}>{props.name2}</Typography>
            <br/>
            <Typography variant="h6" title={props.reward}>{props.reward}</Typography>
            <br/>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6" title={props.price1}>{props.price1}</Typography>
            <br/>
            <Typography variant="h6" title={props.price2}>{props.price2}</Typography>
            <br/>
            <Typography variant="h6" title={props.rewardPrice}>{props.rewardPrice}</Typography>
            <br/>
          </Grid>
        </Grid>
        <Divider />
        <br/>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" title={props.subTotal}>{props.subTotal}</Typography>
            <Typography variant="h6" title={props.tax}>{props.tax}</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6" title={props.subTotalPrice}>
              {props.subTotalPrice}
            </Typography>
            <Typography variant="h6" title={props.taxPrice}>{props.taxPrice}</Typography>
          </Grid>
        </Grid>
        <br/>
        <Divider />
        <br/>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h6" title={props.total}>{props.total}</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h6" title={props.totalPrice}>{props.totalPrice}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
};

export default OrderDetails;
