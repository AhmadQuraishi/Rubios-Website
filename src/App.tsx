import './App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import { Fragment, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import AppRoutes from './routes';
import { Grid } from '@mui/material';
import LeftMenuBar from './components/left-menu-bar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setPageStateRequest } from './redux/actions/page-state';
import { useDispatch, useSelector } from 'react-redux';
import NavigateApp from './components/navigate-app';

function App(props: any) {
  const location = useLocation();
  const [isAccountSection, setIsAccountSection] = useState(false);
  const [hideLoginPanel, setHideLoginPanel] = useState(true);
  const [hideLoginedPanel, setHideLoginedPanel] = useState(false);
  const dispatch = useDispatch();
  const { providerToken } = useSelector((state: any) => state.providerReducer);
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.href.toLocaleLowerCase().indexOf('/account') != -1) {
      if (providerToken == null || providerToken == undefined) {
        navigate('/login');
      }
    }
    if (
      window.location.href.toLocaleLowerCase().indexOf('/menu') != -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/checkout') != -1
    ) {
      setHideLoginPanel(false);
    } else {
      setHideLoginPanel(true);
    }
    if (
      window.location.href.toLocaleLowerCase().indexOf('/welcome') != -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/account') != -1
    ) {
      setHideLoginedPanel(true);
    } else {
      setHideLoginedPanel(false);
    }
  }, []);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.href.toLocaleLowerCase().indexOf('/account') != -1) {
      setIsAccountSection(true);
      if (providerToken == null || providerToken == undefined) {
        navigate('/login');
      }
    } else {
      setIsAccountSection(false);
    }
    if (
      window.location.href.toLocaleLowerCase().indexOf('/menu') != -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/checkout') != -1
    ) {
      setHideLoginPanel(false);
    } else {
      setHideLoginPanel(true);
    }
    if (
      window.location.href.toLocaleLowerCase().indexOf('/welcome') != -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/account') != -1
    ) {
      setHideLoginedPanel(true);
    } else {
      setHideLoginedPanel(false);
    }
    if (
      window.location.href.toLocaleLowerCase().indexOf('/login') != -1 ||
      window.location.href.toLocaleLowerCase().indexOf('/register') != -1
    ) {
      //dispatch(setPageStateRequest(undefined));
    } else {
      dispatch(
        setPageStateRequest(window.location.href.replace(/.*\/\/[^\/]*/, '')),
      );
    }
  }, [location.pathname]);

  return (
    <div id="wapper">
      <NavigateApp />
      <Header
        removeCartForLocation={
          window.location.href.toLocaleLowerCase().indexOf('/location') != -1
        }
        hideLoginPanel={hideLoginPanel}
        hideLoginedPanel={hideLoginedPanel}
        showUserName={isAccountSection}
        removeCart={
          isAccountSection ||
          window.location.href.toLocaleLowerCase().indexOf('/checkout') != -1 ||
          window.location.href.toLocaleLowerCase().indexOf('/welcome') != -1 ||
          window.location.href
            .toLocaleLowerCase()
            .indexOf('/order-confirmation') != -1
        }
      />
      <main>
        <ToastContainer />
        {isAccountSection ? (
          <Fragment>
            <Grid container spacing={0}>
              <Grid
                item
                xs={0}
                sm={3.5}
                lg={2.5}
                sx={{ display: { xs: 'none', sm: 'grid' } }}
              >
                <LeftMenuBar />
              </Grid>
              <Grid
                item
                xs={12}
                sm={8.5}
                lg={9}
                sx={{ padding: { xs: '30px 20px 10px', sm: '30px 40px' } }}
              >
                <AppRoutes />
              </Grid>
            </Grid>
          </Fragment>
        ) : (
          <AppRoutes />
        )}
      </main>
      <Footer />
    </div>
  );
}
export default App;
