import { Routes, Route } from 'react-router-dom';

import CategoryList from './pages/category';
import Location from './pages/location';
import Checkout from './pages/checkout';
import Welcome from './pages/welcome';
import Login from './pages/login';
import OrderConfirmation from './pages/order-confirmation';
import RewardConfirmation from './pages/reward-confirmation';
import DeliveryAddress from './pages/delivery-address';
import RedeemRewards from './pages/redeem-reward';
import Product from './pages/product';
import AccountHistory from './pages/account-history';
import CheckIn from './pages/check-in';
import Invite from './pages/invite';
import PaymentInformation from './pages/payment-information';
import UpdatePaymentCard from './pages/update-card-info';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoryList />} />
      <Route path="/product" element={<Product />} />
      <Route path="/location" element={<Location />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/orderconfirmation" element={<OrderConfirmation />} />
      <Route path="/rewardconfirmation" element={<RewardConfirmation />} />
      <Route path="/account" element={<RedeemRewards />} />
      <Route path="/account/deliveryaddress" element={<DeliveryAddress />} />
      <Route path="/account/history" element={<AccountHistory />} />
      <Route path="/account/checkin" element={<CheckIn />} />
      <Route path="/account/invite" element={<Invite />} />
      <Route
        path="/account/paymentinformation"
        element={<PaymentInformation />}
      />
      <Route
        path="/account/updatepaymentcard"
        element={<UpdatePaymentCard />}
      />
    </Routes>
  );
};

export default AppRoutes;
