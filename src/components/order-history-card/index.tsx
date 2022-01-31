import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const OrderHistoryCard = (props: any) => {

  return (
    <Grid container>
      {props.orderHistory.map((ordersHistory: any) => (
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Card elevation={0} sx={{ border: "1px solid blue" }}>
            <Grid container>
              <Grid item xs={8} sm={8} md={8} lg={8}>
                <Typography variant='caption'>LAST ORDERED {ordersHistory.lastOrder}</Typography>
                <Typography variant="h6">{ordersHistory.name}</Typography>
              </Grid>
              <Grid item xs={4} sm={4} md={4} lg={4}>
                <FavoriteBorderIcon sx={{ backgroundColor: 'blue', color: 'whitesmoke', borderRadius: '50%' }} />
              </Grid>
            </Grid>
            <Grid container>
              <Grid item lg={4} sm={12} md={12} xs={12}>
                <CardMedia
                  component="img"
                  sx={{ width: 120 }}
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAKpRxf2AActPwZQg__oUrjxb7K2od0nJug0zkYc94NePv_wFW5suC8nIiXBNQRzYw3s&usqp=CAU"
                  alt="Live from space album cover"
                />
              </Grid>
              <Grid item lg={8} sm={12} md={12} xs={12}>
                <CardContent>
                  <Typography variant="body2"> 1x California Burrito </Typography>
                  <Typography variant="body2"> 2x Fish Toca Plates </Typography>
                  <Typography variant="body2"> 1x Medium Drink... </Typography>
                  <Typography variant="button" color='blue'> REORDER </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default OrderHistoryCard;
