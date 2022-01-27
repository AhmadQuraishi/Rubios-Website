import { Typography, Card } from '@mui/material';

const OrderConfirmedCard = (props: any) => {
  return (
    <>
      <Card style={{ backgroundColor: 'white' }}>
        <Typography variant="caption" style={{ color: 'blue' }}>
          ORDER CONFIRMED
        </Typography>
        <Typography variant="h5">WE'LL TAKE IT FROM HERE.</Typography>
        <Typography variant="h5">SEE YOU SOON.</Typography>
        <br />
        <Typography variant="caption" style={{ color: 'blue' }}>
          PICKUP LOCATION
        </Typography>
        <Typography variant="h5">BROADWAY BLVD</Typography>
        <Typography variant="caption">
          20212 North 59th Ave, Ste, 465A
        </Typography>
        <br />
        <Typography variant="caption">San Diago, CA</Typography>
        <br />
        <Typography variant="caption">4.2 Miles Away</Typography>
        <br />
        <br />
        <Typography>PICKUP TIME</Typography>
        <Typography variant="h5">6:10 PM</Typography>
      </Card>
    </>
  );
};

export default OrderConfirmedCard;
