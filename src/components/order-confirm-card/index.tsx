import { Typography, Card } from '@mui/material';

const OrderConfirmedCard = (props: any) => {
  return (
    <>
      <Card style={{ backgroundColor: 'white' }}>
        <Typography variant="caption" className="label" title="ORDER CONFIRMED">
          ORDER CONFIRMED
        </Typography>
        <Typography variant="h1" title="WE'LL TAKE IT FROM HERE.">
          WE'LL TAKE IT FROM HERE.
        </Typography>
        <Typography variant="h1" title="SEE YOU SOON.">
          SEE YOU SOON.
        </Typography>
        <br />
        <Typography variant="caption" className="label" title="PICKUP LOCATION">
          PICKUP LOCATION
        </Typography>
        <Typography variant="h1" title="BROADWAY BLVD">
          BROADWAY BLVD
        </Typography>
        <Typography variant="h1" title="20212 North 59th Ave, Ste, 465A">
          20212 North 59th Ave, Ste, 465A
        </Typography>
        <Typography variant="h1" title="San Diago, CA">
          San Diago, CA
        </Typography>
        <Typography variant="h1" title="42 Miles Away">
          42 Miles Away
        </Typography>
        <br />
        <br />
        <Typography variant="caption" className="label" title="PICKUP TIME">
          PICKUP TIME
        </Typography>
        <Typography variant="h1" title="6:10 PM">
          6:10 PM
        </Typography>
      </Card>
    </>
  );
};

export default OrderConfirmedCard;
