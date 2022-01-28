import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
// import Home from './pages/home';
import Location from "./pages/location";
import Checkout from "./pages/checkout";
import Welcome from './pages/welcomeScreen';
import Login from './pages/login';
import OrderConfirmation from './pages/orderConfirmation';
import RewardConfirmation from './pages/rewardConfirmation';
import FoodItem from './pages/foodItem';
import DeliveryAddress from './pages/deliveryAddress';
import RedeemRewards from './pages/RedeemReward';

function App(props: any) {
  return (
    <div id="wapper">
      <Header />
      <main>
        <Routes>
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route path="/location" element={<Location />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/orderConfirmation" element={<OrderConfirmation />}></Route>
          <Route path="/rewardConfirmation" element={<RewardConfirmation />}></Route>
          <Route path='/foodItem' element={<FoodItem />}></Route>
          <Route path="/deliveryAddress" element={<DeliveryAddress />}></Route>
          <Route path="/redeemReward" element={<RedeemRewards />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
