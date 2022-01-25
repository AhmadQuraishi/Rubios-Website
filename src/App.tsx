import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './pages/home';
import Login from './pages/login/login'
import Welcome from './pages/welcomeScreen/welcome';
import Location from "./pages/location";

function App(props: any) {
  return (
    <div id="wapper">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/welcome' element={<Welcome />}></Route>
          <Route path="/location" element={<Location />}></Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
