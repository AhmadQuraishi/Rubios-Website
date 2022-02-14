import { Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
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
import OrdersHistory from './pages/order-history';
import Profile from './pages/profile';
import AddDeliveryAddress from './pages/add-delivery-address';
import CategoryDetail from './pages/category-detail';
import PageNotFound from './pages/page-not-found';

const AppRoutes = () => {
  let x = 0;
  return (
    <Routes>
      <Route key = {x++} path="/" element={<CategoryList />} />
      <Route key = {x++} path="/category/:id" element={<CategoryDetail />} />
      <Route key = {x++} path="/product/:categoryID/:id" element={<Product />} />
      <Route key = {x++} path="/location" element={<Location />} />
      <Route key = {x++} path="/checkout" element={<Checkout />} />
      <Route key = {x++} path="/login" element={<Login />} />
      <Route key = {x++} path="/welcome" element={<Welcome />} />
      <Route key = {x++} path="/orderconfirmation" element={<OrderConfirmation />} />
      <Route key = {x++} path="/rewardconfirmation" element={<RewardConfirmation />} />
      <Route key = {x++} path="/account" element={<RedeemRewards />} />
      <Route key = {x++} path="/account/deliveryaddress" element={<DeliveryAddress />} />
      <Route key = {x++}
        path="/account/addDeliveryAddress"
        element={<AddDeliveryAddress />}
      />
      <Route key = {x++}
        path="/account/addDeliveryAddress/:id"
        element={<AddDeliveryAddress />}
      />
      <Route key = {x++} path="/account/history" element={<AccountHistory />} />
      <Route key = {x++} path="/account/checkin" element={<CheckIn />} />
      <Route key = {x++} path="/account/invite" element={<Invite />} />
      <Route key = {x++} path="/account/profile" element={<Profile />} />
      <Route key = {x++}
        path="/account/paymentinformation"
        element={<PaymentInformation />}
      />
      <Route key = {x++}
        path="/account/updatepaymentcard"
        element={<UpdatePaymentCard />}
      />
      <Route key = {x++}
        path="/account/updatepaymentcard/:id"
        element={<UpdatePaymentCard />}
      />
      <Route key = {x++} path="/account/orders" element={<OrdersHistory />} />
      <Route key = {x++} path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default React.memo(AppRoutes);
