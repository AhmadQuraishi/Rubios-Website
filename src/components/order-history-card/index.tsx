import {
  Card,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import './index.css';

const OrderHistoryCard = (props: any) => {
  return (
    <Grid container spacing={3} className="order-history-card">
      {props.orderHistory.map((ordersHistory: any) => (
        <Grid item xs={12} lg={6}>
          <Card elevation={0} className="card-panel">
            <Grid container>
              <Grid item xs={8}>
                <Typography
                  variant="caption"
                  className="order-date"
                  title={`LAST ORDERED ${ordersHistory.lastOrder}`}
                >
                  LAST ORDERED {ordersHistory.lastOrder}
                </Typography>
                <Typography
                  variant="caption"
                  className="order-name"
                  title={ordersHistory.name}
                >
                  {ordersHistory.name}
                </Typography>
              </Grid>
              <Grid item xs={4} className="order-fav-icon">
                <img
                  src={require('../../assets/imgs/favrouite-icon.png')}
                  alt="Favrouite Order Icon"
                />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <CardMedia
                  component="img"
                  title="Live from space album cover"
                  image={require('../../assets/imgs/order-hidtory-icon.png')}
                  alt="Live from space album cover"
                  className="order-img"
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8}
                sx={{
                  padding: {
                    xs: '20px 10px 20px 10px',
                    sm: '0px 0px 10px 20px',
                  },
                }}
                className="order-detail-panel"
              >
                <Typography
                  className="order-detail"
                  variant="body2"
                  title="1x California Burrito"
                >
                  1x California Burrito
                </Typography>
                <Typography
                  className="order-detail"
                  variant="body2"
                  title="2x Fish Toca Plates"
                >
                  2x Fish Toca Plates
                </Typography>
                <Typography
                  className="order-detail"
                  variant="body2"
                  title="1x Medium Drink..."
                >
                  1x Medium Drink...
                </Typography>
                <Typography
                  className="order-Link"
                  variant="button"
                  title="Reorder"
                >
                  REORDER
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderHistoryCard;
