import './App.css';
import { useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import { Fragment, useLayoutEffect, useMemo, useState } from 'react';
import AppRoutes from './routes';
import { Grid } from '@mui/material';
import LeftMenuBar from './components/left-menu-bar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App(props: any) {
  const location = useLocation();
  const [isAccountSection, setIsAccountSection] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.href.toLocaleLowerCase().indexOf('/account') != -1) {
      setIsAccountSection(true);
    } else {
      setIsAccountSection(false);
    }
  }, [location.pathname]);

  return (
    <div id="wapper">
      <Header
        removeCartForLocation={
          window.location.href.toLocaleLowerCase().indexOf('/location') != -1
        }
        showUserName={isAccountSection}
        removeCart={
          isAccountSection ||
          window.location.href.toLocaleLowerCase().indexOf('/checkout') != -1
        }
      />
      <main>
        <ToastContainer />
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}
export default App;
