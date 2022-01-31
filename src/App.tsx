import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import { useLayoutEffect, useState } from 'react';
import AppRoutes from './routes';

function App(props: any) {
  const location = useLocation();
  const [isAccountSection, setIsAccountSection] = useState(false);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.href.toLocaleLowerCase().indexOf('/account') != -1) {
      setIsAccountSection(false);
    } else {
      setIsAccountSection(true);
    }
  }, [location.pathname]);

  return (
    <div id="wapper">
      <Header removeCart={!isAccountSection} />
      <main>{isAccountSection ? <AppRoutes /> : <AppRoutes />}</main>
      <Footer />
    </div>
  );
}
export default App;
