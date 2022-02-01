import { Grid, Typography, Card, Divider } from '@mui/material';

const OrderDetails = (props: any) => {
  return (
    <>
      <Card>
        <Typography
          fontWeight={500}
          title="ORDER DETAILS"
          variant="h6"
          style={{ color: 'blue' }}
        >
          ORDER DETAILS
        </Typography>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography title={props.name1}>{props.name1}</Typography>
            <Typography title={props.name2}>{props.name2}</Typography>
            <Typography title={props.reward}>{props.reward}</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography title={props.price1}>{props.price1}</Typography>
            <Typography title={props.price2}>{props.price2}</Typography>
            <Typography title={props.rewardPrice}>
              {props.rewardPrice}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography title={props.subTotal}>{props.subTotal}</Typography>
            <Typography title={props.tax}>{props.tax}</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography title={props.subTotalPrice}>
              {props.subTotalPrice}
            </Typography>
            <Typography title={props.taxPrice}>{props.taxPrice}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography title={props.total}>{props.total}</Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography title={props.totalPrice}>{props.totalPrice}</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default OrderDetails;
