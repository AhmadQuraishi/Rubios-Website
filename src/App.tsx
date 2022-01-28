import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
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
import { useLayoutEffect } from 'react';

function App(props: any) {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div id="wapper">
      <Header />
      <main>
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
          <Route
            path="/account/deliveryaddress"
            element={<DeliveryAddress />}
          />
          <Route path="/account/history" element={<AccountHistory />} />
          <Route path="/account/check-in" element={<CheckIn />} />
          <Route path="/account/invite" element={<Invite />} />
          <Route
            path="/account/payment-information"
            element={<PaymentInformation />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
