import { Grid, Typography, Card, Divider } from '@mui/material';

const OrderDetails = (props: any) => {
  return (
    <>
      <Card>
        <Typography title="ORDER DETAILS" variant="h4">
          ORDER DETAILS
        </Typography>
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5" title={props.name1}>
              {props.name1}
            </Typography>
            <Typography variant="h5" title={props.name2}>
              {props.name2}
            </Typography>
            <Typography variant="h5" title={props.reward}>
              {props.reward}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5" title={props.price1}>
              {props.price1}
            </Typography>
            <Typography variant="h5" title={props.price2}>
              {props.price2}
            </Typography>
            <Typography variant="h5" title={props.rewardPrice}>
              {props.rewardPrice}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5" title={props.subTotal}>
              {props.subTotal}
            </Typography>
            <Typography variant="caption" title={props.tax}>
              {props.tax}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5" title={props.subTotalPrice}>
              {props.subTotalPrice}
            </Typography>
            <Typography variant="caption" title={props.taxPrice}>
              {props.taxPrice}
            </Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Grid item xs={10} sm={10} md={10} lg={11}>
            <Typography variant="h5" title={props.total}>
              {props.total}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={1}>
            <Typography variant="h5" title={props.totalPrice}>
              {props.totalPrice}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default OrderDetails;
