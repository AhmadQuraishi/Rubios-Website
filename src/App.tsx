import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/home';
import Location from "./pages/location";
import Checkout from "./pages/checkout";

function App(props: any) {
  return (
    <div id="wapper">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/location" element={<Location />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
