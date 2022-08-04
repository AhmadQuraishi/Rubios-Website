import { Card } from '@mui/material';
import Page from '../../../components/page-title';
import './index.css';

const RewardPointDeatil = () => {
  return (
    <Page title={'Reward Points Detail'} className="">
      <div style={{ paddingBottom: '40px'}}>
        <h1>$3 off your next entrée</h1>
        <p className="p-detail">
          Please scan the QR code below at the register to redeem your reward.
        </p>
        <Card className="reward-point-qr"></Card>
      </div>
    </Page>
  );
};
export default RewardPointDeatil;
