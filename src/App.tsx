import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import CategoryList from './pages/category';
import Location from './pages/location';
import Checkout from './pages/checkout';
import Welcome from './pages/welcome';
import Login from './pages/login';
import OrderConfirmation from './pages/order-confirmation';
import RewardConfirmation from './pages/reward-confirmation';
import Product from './pages/product';

function App(props: any) {
  return (
    <div id="wapper">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<CategoryList />}></Route>
          <Route path="/location" element={<Location />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route
            path="/orderconfirmation"
            element={<OrderConfirmation />}
          ></Route>
          <Route
            path="/rewardconfirmation"
            element={<RewardConfirmation />}
          ></Route>
          <Route path="/product" element={<Product />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
