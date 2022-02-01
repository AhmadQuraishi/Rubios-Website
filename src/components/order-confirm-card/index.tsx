import { Typography, Card } from '@mui/material';

const OrderConfirmedCard = (props: any) => {
  return (
    <>
      <Card style={{ backgroundColor: 'white' }}>
        <Typography
          variant="caption"
          style={{ color: 'blue' }}
          title="ORDER CONFIRMED"
        >
          ORDER CONFIRMED
        </Typography>
        <Typography variant="h5" title="WE'LL TAKE IT FROM HERE.">
          WE'LL TAKE IT FROM HERE.
        </Typography>
        <Typography variant="h5" title="SEE YOU SOON.">
          SEE YOU SOON.
        </Typography>
        <br />
        <Typography
          variant="caption"
          title="PICKUP LOCATION"
          style={{ color: 'blue' }}
        >
          PICKUP LOCATION
        </Typography>
        <Typography variant="h5" title="BROADWAY BLVD">
          BROADWAY BLVD
        </Typography>
        <Typography variant="caption" title="20212 North 59th Ave, Ste, 465A">
          20212 North 59th Ave, Ste, 465A
        </Typography>
        <br />
        <Typography variant="caption" title="San Diago, CA">
          San Diago, CA
        </Typography>
        <br />
        <Typography variant="caption" title="4.2 Miles Away">
          4.2 Miles Away
        </Typography>
        <br />
        <br />
        <Typography title="PICKUP TIME">PICKUP TIME</Typography>
        <Typography variant="h5" title="6:10 PM">6:10 PM</Typography>
      </Card>
    </>
  );
};

export default OrderConfirmedCard;
