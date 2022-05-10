import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import image from './assets/imgs/loading-logo.png';

const Login = lazy(() => import('./pages/login'));
const CategoryList = lazy(() => import('./pages/category'));
const Location = lazy(() => import('./pages/location'));
const Checkout = lazy(() => import('./pages/checkout'));
const Welcome = lazy(() => import('./pages/welcome'));
const Login2 = lazy(() => import('./pages/login2'));
const ForgotPassword = lazy(() => import('./pages/forgot-password'));
const ResetPassword = lazy(() => import('./pages/reset-password'));
const Register = lazy(() => import('./pages/register'));
const OrderConfirmation = lazy(() => import('./pages/order-confirmation'));
const RewardConfirmation = lazy(() => import('./pages/reward-confirmation'));
const DeliveryAddress = lazy(() => import('./pages/delivery-address'));
const RedeemRewards = lazy(() => import('./pages/redeem-reward'));
const Product = lazy(() => import('./pages/product'));
const AccountHistory = lazy(() => import('./pages/account-history'));
const CheckIn = lazy(() => import('./pages/check-in'));
const Invite = lazy(() => import('./pages/invite'));
const PaymentInformation = lazy(() => import('./pages/payment-information'));
const UpdatePaymentCard = lazy(() => import('./pages/update-card-info'));
const OrdersHistory = lazy(() => import('./pages/order-history'));
const Profile = lazy(() => import('./pages/profile'));
const AddDeliveryAddress = lazy(() => import('./pages/add-delivery-address'));
const CategoryDetail = lazy(() => import('./pages/category-detail'));
const PageNotFound = lazy(() => import('./pages/page-not-found'));
const ScanToRedeem = lazy(() => import('./pages/scan-to-redeem'));

const AppRoutes = () => {
  return (
    <>
      <Suspense
        fallback={
          <div
            style={{
              display: 'flex',
              height: 'calc(100vh - 30vh)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{
              backgroundImage:`url(${image})`,
              width: '100px',
              height: '100px',
              display: 'block'
            }} />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<CategoryList />} />
          <Route path="/login" element={<Login2 />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/login2" element={<Login />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/product/:id/:edit" element={<Product />} />
          <Route path="/location" element={<Location />} />
          <Route path="/menu/:store" element={<CategoryList />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="/order-confirmation/:id"
            element={<OrderConfirmation />}
          />
          <Route path="/rewardconfirmation" element={<RewardConfirmation />} />
          <Route path="/account" element={<RedeemRewards />} />
          <Route
            path="/account/deliveryaddress"
            element={<DeliveryAddress />}
          />
          <Route
            path="/account/addDeliveryAddress"
            element={<AddDeliveryAddress />}
          />
          <Route
            path="/account/addDeliveryAddress/:id"
            element={<AddDeliveryAddress />}
          />
          <Route path="/account/history" element={<AccountHistory />} />
          <Route path="/account/checkin" element={<CheckIn />} />
          <Route path="/account/invite" element={<Invite />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route
            path="/account/paymentinformation"
            element={<PaymentInformation />}
          />
          <Route
            path="/account/updatepaymentcard"
            element={<UpdatePaymentCard />}
          />
          <Route
            path="/account/updatepaymentcard/:id"
            element={<UpdatePaymentCard />}
          />
          <Route path="/account/reward" element={<ScanToRedeem />} />
          <Route path="/account/orders" element={<OrdersHistory />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default React.memo(AppRoutes);
